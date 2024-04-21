import React from 'react'
import {useEffect, useState} from 'react'
import './Graph.css'
import { Chart } from "react-google-charts";

function Foreclosure({state="Atlanta", date}) {

    const [dataList, setDataList ] = useState([])
    const [wallisTest, setWallisTest] = useState([])

    async function getData() {
        const date_split = date.split("-")
        console.log(date_split)
        const new_date = date_split[0] + "-" + date_split[1]
        console.log(new_date)
        let link = "http://127.0.0.1:8000/foreclosures/" + state + "/" + new_date
        let response = await fetch(link)
        let result = await response.json() 
        result = JSON.parse(result)
        setDataList(result)
    }

    useEffect(() => {
        getData()
    }, [])

    const p_val: number = wallisTest[1]

    const getColor = () => {
        return p_val <= 0.05 ? 'blue' : 'green'
    }

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
                            title: "Number of Foreclosures",
                        
                            pointSize: 30,
                            series: {
                                1: {
                                pointSize: 20
                                }
                            },
                        
                        }
                    
                    }}
                />
            </div>
        </div>
        
    );
}

export default Foreclosure;