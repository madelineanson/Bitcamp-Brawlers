import "./SideBar.css";
import { useState, useEffect } from 'react'
import Graph from './Graph'

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

function SideBar({ state, isOpen, listIncidents}: { disaster: "flood" | "hurricane" | "fire",state: string, isOpen:boolean, listIncidents: any []}) {

    const [isShowGraph, setIsShowGraph] = useState(false)
    const [selectedDate, setSelectedDate] = useState("")

    useEffect( () => {
        const sidebar = document.getElementById("top-sidebar")
        sidebar.scroll({top:0,behavior:'smooth'})
        window.scroll({top:0,behavior:'smooth'})
    },[])


    function showGraph(date: string) {
        const sidebar = document.getElementById("top-sidebar")
        sidebar.scroll({top:0,behavior:'smooth'})
        window.scroll({top:0,behavior:'smooth'})
        const date_split = date.split("-")
        const  new_date = date_split[0] + "-" + date_split[1]
        setSelectedDate(new_date)
        setIsShowGraph(true)
    }
    function filterDuplicatesByDate(objects) {
        const uniqueDates = new Set();
        return objects.filter(obj => {
            const date = obj.date;
            if (uniqueDates.has(date)) {
                return false; // Duplicate found
            } else {
                uniqueDates.add(date);
                return true; // Not a duplicate
            }
        });
    }
    return (
        <>
        <div id="top-sidebar" className={"sidebar sidebar-" + (isOpen? "open " : "closed ")}>
            {listIncidents.length > 0? <h2>Results for {state} </h2>: <h2>No results for {state}</h2>}

            {isShowGraph? <Graph key={selectedDate} date={selectedDate} state={stateAbbreviations[state]}></Graph>: null}
            {filterDuplicatesByDate(listIncidents).sort((a, b)=>{return new Date(b.date) - new Date(a.date)}).map((incident, index) => {
                return (
                    <div>
                        <h3>{incident.incidentType} on {incident.date}</h3>
                        <button key={index} onClick={() => showGraph(incident.date)}>
                            Show data for event
                        </button>
                    </div>
                );
            })}

        </div>
        </>
    );
}

export default SideBar;
