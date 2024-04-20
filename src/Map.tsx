import React from "react";
import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import SideBar from './SideBar'
import "./Map.css";


const fire_data = {"RI":1,"KS":20,"TX":1229,"OR":149,"FL":277,"CA":460,"SD":27,"WA":201,"UT":38,"ID":53,"HI":27,"MT":150,"NM":140,"NV":79,"CO":151,"WY":27,"AZ":89,"OK":217,"AK":31,"GA":17,"NC":10,"TN":24,"KY":41,"NH":2,"NE":11,"SC":5,"LA":16,"NJ":24,"VA":11,"MA":4,"ND":1,"MN":13,"AL":11,"WV":24,"MO":1,"NY":64,"MI":1,"GU":1,"ME":2,"WI":1,"MH":1,"FM":1,"PR":5}

const hurricane_data = 
{"GA":937,"HI":22,"FL":1268,"SC":587,"PR":1024,"CT":96,"DE":22,"MS":745,"NY":284,"PA":274,"NC":1304,"NJ":193,"LA":1364,"MD":151,"AL":611,"TX":1303,"RI":43,"CA":64,"VI":53,"AS":25,"VA":877,"OH":90,"MA":108,"DC":6,"NH":50,"WV":141,"ME":50,"VT":42,"AR":168,"GU":1,"MT":56,"WI":73,"NE":93,"ID":44,"NV":17,"MN":87,"AZ":15,"IA":99,"IN":92,"KS":105,"MO":115,"IL":102,"NM":33,"MI":83,"OK":77,"TN":95,"KY":120}

const flood_data = {
  CO: 159,
  VT: 123,
  MT: 141,
  KY: 493,
  FL: 73,
  NV: 24,
  CA: 448,
  AZ: 81,
  WV: 297,
  IL: 317,
  AK: 59,
  MO: 521,
  MN: 686,
  WA: 290,
  PR: 361,
  VA: 280,
  NH: 57,
  TN: 267,
  LA: 362,
  HI: 13,
  ND: 673,
  WI: 205,
  WY: 24,
  UT: 77,
  NY: 217,
  OR: 126,
  OK: 224,
  SD: 423,
  IA: 728,
  PA: 348,
  NM: 94,
  MI: 155,
  TX: 502,
  AR: 270,
  ID: 89,
  OH: 158,
  NE: 375,
  MD: 63,
  IN: 207,
  MS: 124,
  SC: 53,
  NC: 62,
  KS: 185,
  MA: 41,
  AL: 103,
  GA: 61,
  ME: 105,
  NJ: 69,
  CT: 16,
  DE: 2,
  MH: 5,
  VI: 6,
  FM: 0,
  AS: 4,
  MP: 0,
};
const stateAbbreviations = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

function getColor(disasters: number, disaster: "fire" | "flood" | "hurricane") {
  let colorList: string[] = [];
  if (disaster == "fire") {
    colorList = [
      "#F5D6D6",
      "#F5ACAC",
      "#F55F5F",
      "#E80909",
      "#A90707",
      "#6D0505",
      "#3D0303",
    ];
  } else if (disaster == "flood") {
    colorList = [
      "#A8C1F1",
      "#95B5F2",
      "#6897F1",
      "#407DF1",
      "#1561F0",
      "#034CD5",
      "#043BA2",
    ];
  } else if (disaster == "hurricane") {
    colorList = ["#DEC4EB", "#CE8AF0", "#B958EA", "#A72BE5", "#880AC7", "#701D99", "#460A64"]
  }
  let color = "";
  if (disasters < 50) {
    color = colorList[0];
  } else if (disasters < 100) {
    color = colorList[1];
  } else if (disasters < 200) {
    color = colorList[2];
  } else if (disasters < 300) {
    color = colorList[3];
  } else if (disasters < 400) {
    color = colorList[4];
  } else if (disasters < 500) {
    color = colorList[5];
  } else {
    color = colorList[6];
  }
  return color;
}

const Map = ({ disaster = "hurricane" }: { disaster: "fire" | "flood"| "hurricane" }) => {
  const [hovered, setHovered] = useState("")
  const [state, setState] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
  let data = []
  if (disaster == "hurricane") {
    data = hurricane_data
  } else if (disaster == "fire") {
    data = fire_data
  } else {
    data = flood_data
  }

  function handleClick(state:string) {
    setState(state)
    setIsOpen(true)
  }

  return (
    <div className="map-container">
      
        <div className="tooltip">{hovered && "" + hovered}</div>
      
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {/* Render each state */}
              {geographies.map((geo) => (
                <Geography
                  onClick={() => handleClick(geo.properties.name)}
                  key={geo.rsmKey}
                  geography={geo}
                  className={disaster + "-state"}
                  fill={getColor(data[stateAbbreviations[geo.properties.name]], disaster)}
                  strokeWidth={0.5}
                  onMouseEnter={() => setHovered(geo.properties.name)}
                  onMouseLeave={() => setHovered(null)}
                />
              ))}
            </>
          )}
        </Geographies>
      </ComposableMap>
    
        <button onClick={() => setIsOpen(false)} className={"sidebar-button button-" + (isOpen? "open" : "closed")}>Close Panel</button>
        <SideBar isOpen={isOpen} state={state}></SideBar> 
      
    </div>
    
  );
};

export default Map;
