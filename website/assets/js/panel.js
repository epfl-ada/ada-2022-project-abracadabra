import {
  highlightOn,
  highlightOff,
  clusterToRGB,
} from "/assets/js/clusters.js";

const SELECTOR_ID = "panel-selector";
const BTN_CLASS = "panel-btn";
const BTN_SELECTED_CLASS = `${BTN_CLASS} panel-btn-selected`;

let selected_button = null;
let selected_button_id = null;
let featureImportance = null;

export function initPanel(clusters, featureImportanceByCluster) {
  const panelSelector = document.getElementById(SELECTOR_ID);

  for (let cluster of clusters) {
    const button = makeButton(cluster, clusters.length);
    panelSelector.appendChild(button);
  }

  featureImportance = featureImportanceByCluster;
}



function makeButton(cluster, n_clusters) {
  const button = document.createElement("div");
  const color = clusterToRGB(cluster.cluster_id, n_clusters);
  button.className = BTN_CLASS;

  const iconStyle = `background-color: ${color}`;

  button.innerHTML = `
    <div class="btn-icon" style="${iconStyle}"></div>
    <div class="btn-label">${cluster.name}</div>
  `;


  button.onclick = () => {
    if (selected_button_id !== cluster.cluster_id) {
      if (selected_button !== null) {
        selected_button.className = BTN_CLASS;
        highlightOff();
      }

      button.className = BTN_SELECTED_CLASS;
      console.log(cluster.cluster_id)
      console.log(button)
      selected_button_id = cluster.cluster_id;
      selected_button = button;

      highlightOn(selected_button_id);
      setClusterInfo(cluster, n_clusters);
    } else {
      button.className = [BTN_CLASS];
      highlightOff();

      selected_button_id = null;
      selected_button = null;
      removeClusterInfo();
    }
  };

  return button;
}

function setClusterInfo(cluster, n_clusters) {
  const panel = document.getElementById("panel-cluster");
  panel.className = "panel-open";

  const panelTitle = document.getElementById("panel-cluster-title");
  const panelStats = document.getElementById("panel-cluster-stats");
  const panelFeatures = document.getElementById("panel-cluster-features");

  const title = makeClusterTitle(cluster, n_clusters);
  const journalTable = makeJournalTable(cluster.journals);
  const speakerTable = makeSpeakerTable(cluster.speakers);
  const features = makeFeatureImportances(cluster);

  panelTitle.innerHTML = title;
  panelStats.innerHTML = journalTable + speakerTable;
  panelFeatures.innerHTML = features;
}

function removeClusterInfo() {
  const panel = document.getElementById("panel-cluster");
  panel.className = "panel-closed";
}

function makeJournalTable(journals) {
  const header =
    "<tr><th colspan=2>Top journals</th></tr>" +
    "<tr><th>Rank</th><th>Name</th></tr>";
  const itemToString = (journal, index) =>
    `<td class="center">${parseInt(index) + 1}</td><td>${journal}</td>`;

  return makeTable(journals, header, itemToString);
}

function makeSpeakerTable(speakers) {
  const header =
    `<tr><th colspan=3>Most quoted speakers</th></tr>` +
    `<tr><th>%</th><th>Speakers</th><th>Description</th></tr>`;
  const itemToString = ([name, title, pct]) =>
    `<td class="center">${(100 * pct).toFixed(
      2
    )}<td>${name}</td><td class="table-overflow">${title}</td>`;

  return makeTable(speakers, header, itemToString);
}

function makeTable(items, header, itemToString = (x) => `<td>${x}</td>`) {
  let tableItems = `${header}`;
  for (let itemIdx in items) {
    tableItems += `<tr>${itemToString(items[itemIdx], itemIdx)}</tr>`;
  }

  return `<div class="panel-table"><table>${tableItems}</table></div>`;
}

function makeFeatureImportances(cluster) {
  const clusterFeatures = featureImportance[cluster.cluster_id];
  clusterFeatures.sort(([_1, w_1], [_2, w_2]) =>
    Math.abs(w_1) - Math.abs(w_2) < 0 ? 1 : -1
  );

  const maxAbsWeight = Math.abs(clusterFeatures[0][1]);
  //clusterFeatures.reduce(
  //  (max, [_, w]) => (Math.abs(w) > max ? Math.abs(w) : max),
  //  0
  //);

  let features = "";
  let labels = "";
  for (let [featureName, weight] of clusterFeatures.slice(0, 20)) {
    const [label, feature] = makeFeatureImportanceBar(
      featureName,
      weight,
      maxAbsWeight
    );

    labels += label;
    features += feature;
  }

  return `
    <div>
      <strong class="predictor-header">Top predictors for this cluster</strong>
      <div class="feature-container">
        <div class="feature-labels">${labels}</div>
        <div class="feature-importance">${features}</div>
      </div>
    </div>
  `;
}

function makeClusterTitle(cluster, n_clusters) {
  const color = clusterToRGB(cluster.cluster_id, n_clusters);
  const iconStyle = `background-color: ${color}`;

  return `
    <div class="cluster-icon" style="${iconStyle}"></div>
    <div><strong>${cluster.name}</strong></div>
  `;
}

function makeFeatureImportanceBar(featureName, weight, maxAbsWeight) {
  const width = (100 * Math.abs(weight)) / maxAbsWeight;

  const leftStyle = `
    width: ${weight < 0 ? width : 0}%;
  `;

  const rightStyle = `
    width: ${weight >= 0 ? width : 0}%;
  `;

  const leftNum = weight < 0 ? weight.toFixed(2) : "";
  const rightNum = weight >= 0 ? weight.toFixed(2) : "";

  return [
    `<div class="fi-label">${featureName}</div>`,
    `<div class="feature-importance-bar">
      <div class="feature-importance-halfbar">
        <div class="feature-importance-progress fip-left" style="${leftStyle}"></div>
        <div class="fip-num fip-num-right"><div>${rightNum}</div></div>
      </div>
      <div class="feature-importance-halfbar">
        <div class="feature-importance-progress fip-right" style="${rightStyle}"></div>
        <div class="fip-num fip-num-left"><div>${leftNum}</div></div>
      </div>
    </div>`,
  ];
}
