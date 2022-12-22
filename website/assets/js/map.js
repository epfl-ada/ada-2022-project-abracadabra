const COLORMAP = "hsv";
const UNCLUSTERED_COLOR = "#888888";
const NOCLUSTER_ID = "No cluster";
const MAP_ZOOM = 5;

/* ==============================================================
 * Main rendering functions
 * ============================================================== */

/**
 * Main map rendering function, called from `main.js` with the `cluster_locations.csv` data as argument
 * @param {Array<{cluster_id: string, journal: string, lat: number, lon: number }>} clusters
 * @parma {}
 */
function renderMap(clusters, cluster_info) {
  // Initial preprocessing, cast cluster_id to integer or
  for (let i = 0; i < clusters.length; i++) {
    const cid =
      clusters[i].cluster_id == -1
        ? NOCLUSTER_ID
        : Math.round(clusters[i].cluster_id);

    clusters[i].cluster_id = `${cid}`;
  }

  clusters = clusters.filter((x) => x.cluster_id !== NOCLUSTER_ID);

  const cluster_names = cluster_info.reduce((acc, { cluster_id, name }) => {
    return { ...acc, [cluster_id]: name };
  }, {});

  // Compute number of clusters, not including unclustered points
  const cluster_ids = Array.from(
    clusters.reduce((acc, x) => acc.add(x.cluster_id), new Set())
  );
  const n_clusters = cluster_ids.filter((x) => x != NOCLUSTER_ID).length;

  // Create marker icons for each cluster_id
  const icons = {};
  for (let cluster_id of cluster_ids) {
    icons[cluster_id] = createIcon(cluster_id, n_clusters, cluster_names);
  }

  // Group cluster markers by cluster_id
  const markers = clusters.reduce(
    (mks, c) => createMarker(c, mks, icons, cluster_names),
    {}
  );

  initMap(n_clusters, markers, cluster_names);
}

/**
 * Initialises map with its base tiling layers. Adds markers as a layer per `cluster_id`
 * @param {number} n_clusters Total number of clusters excluding unclustered points
 * @param {Object<string, L.marker>} markers Dictionary mapping `cluster_id` to a list of `L.marker`
 * @param {Object<string, string>} cluster_names Dictionary mapping `cluster_id` to its cluster name
 * @returns {Leaflet.map} a new, configured, map object
 */
function initMap(n_clusters, markers, cluster_names) {
  // Create base layers
  const baseLayer = new L.StamenTileLayer("toner");
  const lightLayer = new L.StamenTileLayer("terrain");

  // Generate marker aggregation layer and add each cluster as a sub layer
  const clusterLayers = {};
  const markerAggerator = L.markerClusterGroup({
    iconCreateFunction: (x) => clusterIconMaker(x, n_clusters),
  });

  for (let cluster_id in markers) {
    const cluster = markers[cluster_id];
    const layer = L.featureGroup.subGroup(markerAggerator, cluster);
    clusterLayers[createLayerIcon(cluster_id, n_clusters, cluster_names)] =
      layer;
  }

  // Create map and add layers
  const map = new L.Map("map", {
    center: new L.LatLng(46.5191, 6.5668),
    zoom: MAP_ZOOM,
    layers: [baseLayer, markerAggerator, ...Object.values(clusterLayers)],
  });

  L.control
    .layers({ Base: baseLayer, Terrain: lightLayer }, clusterLayers, {
      collapsed: false,
    })
    .addTo(map);

  return map;
}

/* ==============================================================
 * Interactive components
 * ============================================================== */

/**
 * Creates a Leaflet marker object for the journal entry. Adds this new marker to the `markers` dictionary. Returns the modified dictionary
 * Markers are created with a custom color based on `cluster_id`, and have a popup displaying their journal name and cluster_id
 * Only creates a marker if the latitude and longitue exist
 * @param {cluster_id: string, journal: string, lat: number, lon: number } journalEntry the transformed journal entry obtained in the data file
 * @param {Object<string, L.marker>} markers Dictionary mapping `cluster_id` to a list of `L.marker`
 * @param {Object<string, L.divIcon>} icons Dictionary mapping `cluster_id` to a list of `L.divIcon`
 * @returns {Object<string, L.marker>} the old `markers` with `journalEntry` added to its appropriate dictionary entry
 */
function createMarker(
  { cluster_id, journal, lat, lon },
  markers,
  icons,
  clusterNames
) {
  // Only allow if lat/lon are not null, undefined, or NaN
  if ((lat || lat === 0) && (lon || lon === 0)) {
    // Create marker object
    const marker = L.marker([lat, lon], {
      icon: icons[cluster_id],
      title: journal,
    }).bindPopup(createPopup(cluster_id, journal, clusterNames));

    // Save cluster_id in marker for future use
    marker.cluster_id = cluster_id;

    // Add to marker map
    if (!(cluster_id in markers)) {
      markers[cluster_id] = [];
    }
    markers[cluster_id].push(marker);
  }

  return markers;
}

/* ==============================================================
 * Visual components
 * ============================================================== */

/**
 * Maps a cluster_id to a given color on the color map.
 * Unclustered points are always mapped to a dark color
 * @param {string} cluster_id ID of the cluster
 * @param {number} n_clusters Total number of clusters excluding unclustered points
 * @returns {string} a CSS "rgb(r,g,b)" string
 */
function clusterToRGB(cluster_id, n_clusters) {
  if (cluster_id == NOCLUSTER_ID) {
    return UNCLUSTERED_COLOR;
  }

  [r, g, b] = evaluate_cmap(cluster_id / n_clusters, COLORMAP, false);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Creates the HTML popup for a journal marker
 * @param {string} cluster_id ID of the cluster for that journal
 * @param {string} journal URL of the journal
 * @param {Object<string, string>} cluster_names Dictionary mapping `cluster_id` to its cluster name
 * @returns {Leaflet.popup}
 */
function createPopup(cluster_id, journal, cluster_names) {
  const popupContent = `<div style="padding-top: 10px;">
      <strong>Journal:</strong> ${journal}</br>
      <strong>Cluster:</strong> <em>${
        cluster_id === NOCLUSTER_ID ? cluster_id : cluster_names[cluster_id]
      }</em>
    </div>`;

  const popup = L.popup();
  popup.setContent(popupContent);

  return popup;
}

/**
 * Creates a Leaflet div icon to represent a journal marker
 * The color of the icon is based on the cluster_id
 * @param {string} cluster_id : ID of the cluster
 * @param {number} n_clusters : Total number of clusters excluding unclustered points
 * @returns {Leaflet.divIcon} the new Leaflet.divIcon for this journal marker
 */
function createIcon(cluster_id, n_clusters) {
  const markerHtmlStyles = `
  background-color: ${clusterToRGB(cluster_id, n_clusters)};
  width: 1rem;
  height: 1rem;
  display: block;
  left: -0.5rem;
  top:  0.5rem;
  position: relative;
  border-radius: 1rem 1rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;

  return L.divIcon({
    className: `cluster-${cluster_id}-icon`,
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -20],
    html: `<div style="${markerHtmlStyles}"></div>`,
  });
}

/**
 * Creates an HTML icon to be displayed in the layer selection pane
 * @param {string} cluster_id : ID of the cluster
 * @param {number} n_clusters : Total number of clusters excluding unclustered points
 * @param {Object<string, string>} cluster_names Dictionary mapping `cluster_id` to its cluster name
 */
function createLayerIcon(cluster_id, n_clusters, cluster_names) {
  const color = clusterToRGB(cluster_id, n_clusters);
  const circleStyle = `
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${color};
    display: inline-block;
    margin-right: 2px;
  `;

  const circle = `<div style="${circleStyle}"></div>`;
  let cluster_name =
    cluster_id !== NOCLUSTER_ID ? cluster_names[cluster_id] : cluster_id;

  const n = 17;
  cluster_name =
    cluster_name.length > n
      ? cluster_name.substr(0, n - 1) + "&hellip;"
      : cluster_name;

  return `<span>${circle}${cluster_name}</span>`;
}

/**
 * Creates a Leaflet div icon to represent a cluster of journal markers
 * The color of the icon is based on the most frequent cluster_id
 * @param {int} cluster_id : ID of the cluster
 * @param {int} n_clusters : Total number of clusters excluding unclustered points
 * @returns the new Leaflet.divIcon
 */
function clusterIconMaker(cluster, n_clusters) {
  // Find most frequent cluster_id in marker cluster

  const counts = {};
  for (let marker of cluster.getAllChildMarkers()) {
    const cluster_id = marker.cluster_id;
    counts[cluster_id] = counts[cluster_id] ? counts[cluster_id] + 1 : 1;
  }

  const cluster_id_most_freq = Object.keys(counts).reduce(
    (iMax, i) => (counts[i] > counts[iMax] ? i : iMax),
    Object.keys(counts)[0]
  );

  // Generate icon corresponding to mode of cluster_id
  const markerHtmlStyles = `
    background-color: ${clusterToRGB(cluster_id_most_freq, n_clusters)};
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1rem;
    top:  1rem;
    position: relative;
    border-radius: 2rem 2rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`;

  const innerTextStyles = `
    text-align: center;
    font-size: 1rem;
    color: white;
    width: 2rem;
    height: 2rem;
    left: -1rem;
    top:  -0.7rem;
    position: relative;`;

  return L.divIcon({
    className: `cluster-${cluster_id_most_freq}-icon`,
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `
      <div>
        <div style="${markerHtmlStyles}"></div>
        <div style="${innerTextStyles}">${cluster.getChildCount()}</div>
      </div>`,
  });
}
