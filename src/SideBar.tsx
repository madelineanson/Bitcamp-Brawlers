import "./SideBar.css";

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
const data = {
  list: [
    { state: "MD", incidentType: "Flood", date: "2018-05-27" },
    { state: "MD", incidentType: "Flood", date: "2018-05-27" },
    { state: "MD", incidentType: "Flood", date: "2016-07-30" },
    { state: "MD", incidentType: "Flood", date: "2011-09-06" },
    { state: "MD", incidentType: "Flood", date: "2011-09-06" },
    { state: "MD", incidentType: "Flood", date: "2011-09-06" },
    { state: "MD", incidentType: "Flood", date: "2011-09-06" },
    { state: "MD", incidentType: "Flood", date: "2011-09-06" },
    { state: "MD", incidentType: "Flood", date: "2011-09-06" },
    { state: "MD", incidentType: "Flood", date: "2011-09-06" },
  ],
};

function SideBar({ state = "Maryland", isOpen }: { state: string, isOpen:boolean}) {
    const stateCode = stateAbbreviations[state]
    const listIncidents = data.list
    return (
        <>
        <div className={"sidebar sidebar-" + (isOpen? "open" : "closed")}>
            <h2>Results for {state} </h2>
            {listIncidents.map((incident) => {
                return (
                    <div>
                        <h3>{incident.incidentType} on {incident.date}</h3>
                        <button>
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
