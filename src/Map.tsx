import React from "react";
import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import SideBar from './SideBar'
import "./Map.css";

let response = await fetch("http://127.0.0.1:8000/combined_data/")
let data = await response.json()
console.log(data)

let fire_data = data["Fire"]
let flood_data = data["Flood"]
let hurricane_data = data["Hurricane"]

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

const Map = ({ disaster = "fire" }: { disaster: "fire" | "flood"| "hurricane" }) => {
  const [hovered, setHovered] = useState("")
  const [stateName, setStateName] = useState("")
  const [state, setState] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [listIncidents, setListIncidents] = useState({})

  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
  let data = []
  if (disaster == "hurricane") {
    data = hurricane_data
  } else if (disaster == "fire") {
    data = fire_data
  } else {
    data = flood_data
  }

  async function handleClick(state:string) {
    const response = await fetch("http://127.0.0.1:8000/" + stateAbbreviations[state] + "/" + disaster[0].toUpperCase() + disaster.slice(1))
    const data = await response.json()
    console.log(data)
    setListIncidents(data.list)
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
                  onMouseLeave={() => setHovered("")}
                />
              ))}
            </>
          )}
        </Geographies>
      </ComposableMap>
    
        <button onClick={() => setIsOpen(false)} className={"sidebar-button button-" + (isOpen? "open" : "closed")}>Close Panel</button>
        {isOpen? <SideBar listIncidents={listIncidents} disaster={disaster} isOpen={isOpen} state={state}></SideBar> : null }
      
    </div>
    
  );
};

export default Map;
