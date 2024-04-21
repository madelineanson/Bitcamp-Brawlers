import React from 'react'
import {useEffect, useState} from 'react'
import { Chart } from "react-google-charts";

function Graph2({city="atlanta", date="2020-05"}) {

    const [dataList, setDataList ] = useState([])

    async function getData() {
        let link = "http://127.0.0.1:8000/foreclosures/" + city + "/" + date
        let response = await fetch(link)
        let result = await response.json()
        result = JSON.parse(result)
        console.log(result)
        setDataList(result)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="modal">
            <div className="modal-content">
                <Chart
                    chartType="Line"
                    width="700px"
                    height="400px"
                    data={dataList}
                    options={{
                        chart: {
                            title: "Foreclosure Rates",
                            subtitle: "in Number of Foreclosures",
                        }
                    
                    }}
                />
            </div>
        </div>
        
    );
}

export default Graph2;