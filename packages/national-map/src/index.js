import "./style.css";
import App from "./js/app";

function scaffoldHtml() {
  const html = `
    <div id="map" class="map"></div>
    <div class="panel flow">
      <div class="ui stack">
        <div class="ui__control flow">
          <label>Population</label>
          <select id="population">
            <option value="Residents">Residents</option>
            <option value="Staff">Staff</option>
            <option disabled value="Total">Total</option>
          </select>
        </div>
        <div class="ui__control flow">
          <label>Count Type</label>
          <select id="type">
            <option value="Confirmed">Confirmed Cases</option>
            <option disabled value="Active">Active Cases</option>
            <option value="Deaths">Deaths</option>
            <option value="Tested">Tested</option>
            <option value="Recovered">Recovered</option>
          </select>
        </div>
      </div>
      <div class="legend">
        <svg viewBox="0,0,108,64" width="108" height="64">
          <circle cx="32" cy="32" r="32" fill="rgba(255,0,0,0.4)" stroke-width="1" stroke="#fff" />
          <circle cx="32" cy="48" r="16" fill="rgba(255,0,0,0.4)" stroke-width="1" stroke="#fff" />
          <circle cx="32" cy="60" r="4" fill="rgba(255,0,0,0.4)" stroke-width="1" stroke="#fff" />
          <path d="M 32,16 h 44" stroke-width="1"  stroke-dasharray="3 3" stroke="rgba(0,0,0,0.5)"/>
          <path d="M 32,44 h 44" stroke-width="1" stroke-dasharray="3 3" stroke="rgba(0,0,0,0.5)"/>
          <path d="M 32,60 h 44" stroke-width="1" stroke-dasharray="3 3" stroke="rgba(0,0,0,0.5)"/>
          <text id="largeCount" x="80" y="20">3</text>
          <text id="mediumCount" x="80" y="48">2</text>
          <text id="smallCount" x="80" y="64">1</text>
        </svg>
      </div>
    </div>`;

  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = html;

  return element;
}

document.body.appendChild(scaffoldHtml());
App();
