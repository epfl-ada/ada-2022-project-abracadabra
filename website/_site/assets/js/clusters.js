import * as THREE from "/assets/js/lib/three.module.js";
import { OrbitControls } from "/assets/js/lib/OrbitControls.js";
import { evaluate_cmap } from "/assets/js/lib/js-colormaps.module.js";

let renderer, scene, camera, controls;
let clustersMap;

function clusterToRGB(cluster_id, n_clusters, alpha = undefined) {
  if (cluster_id == -1) {
    return 0x000000;
  }

  const [r, g, b] = evaluate_cmap(cluster_id / n_clusters, COLORMAP, false);
  return alpha ? `rgb(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

function renderClusters(data, element_id) {
  // CSV processing
  const newspapers = data.map((p) => ({
    name: p.journal,
    cluster_id: parseInt(p.cluster_id),
    position: [parseFloat(p.x), parseFloat(p.y), parseFloat(p.z)],
  }));
  const cluster_count =
    new Set(newspapers.map((p) => p.cluster_id)).size - 1;
  const grouped = groupBy(newspapers, "cluster_id");

  // Scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  const parentElement = document.getElementById(element_id);
  parentElement.appendChild(renderer.domElement);
  const rect = parentElement.getBoundingClientRect();
  renderer.setSize(rect.width, rect.width);

  controls = new OrbitControls(camera, renderer.domElement);

  // Clusters
  const sprite = new THREE.TextureLoader().load("/assets/img/dot.png");

  const renderCluster = function (cluster_id, newspapers) {
    const cluster_id_int = parseInt(cluster_id);
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(newspapers.flatMap((np) => np.position));
    const material = new THREE.PointsMaterial({
      map: sprite,
      alphaTest: 0.19,
      transparent: true,
      size: 0.1,
    });
    material.color.set(clusterToRGB(cluster_id_int, cluster_count));
    const points = new THREE.Points(geometry, material);
    points.name = "Cluster " + cluster_id;
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    points.scale.set(4, 4, 4);
    return [cluster_id_int, points];
  };

  clustersMap = new Map(
    Object.entries(grouped)
      .filter((group) => group[0] != -1)
      .map((group) => renderCluster(...group))
  );

  Array.from(clustersMap.values()).forEach((cluster) => scene.add(cluster));

  camera.position.z = 5;
  animate();
}

function highlightOn(cluster_id) {
  for (const [id, points] of clustersMap.entries()) {
    if (id != cluster_id) {
      points.material.opacity = 0.2;
    } else {
      points.material.opacity = 1;
    }
    points.material.needsUpdate = true;
  }
}

function highlightOff() {
  for (const points of clustersMap.values()) {
    points.material.opacity = 1;
    points.material.needsUpdate = true;
  }
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

export { renderClusters, highlightOn, highlightOff, clusterToRGB };
