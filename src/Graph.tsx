import React from 'react'
import {useEffect, useState} from 'react'
import './Graph.css'
import { Chart } from "react-google-charts";

function Graph({state, date}) {

    const [dataList, setDataList ] = useState([])
    const [wallisTest, setWallisTest] = useState([])

    async function getData() {
        let link = "http://127.0.0.1:8000/mortgages/" + state + "/" + date
        let response = await fetch(link)
        let result = await response.json()
        result = JSON.parse(result)
        console.log(result)
        setDataList(result)

        let link2 = "http://127.0.0.1:8000/kruskal/" + state + "/" + date
        try {
            let response2 = await fetch(link2)
            let data = await response2.json()
            setWallisTest(data)
        } catch {
            setWallisTest([])
        }


        
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
                            title: "Mortgage Delinquency Rates",
                            subtitle: "in Percent (%)",
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
            <h3 style={{ color: getColor() }}>

                
                {wallisTest.length != 0 ? (p_val <= 0.05 ? 
                    `Kruskal-wallis test shows significant difference in disaster event and delinquency rates. p-value: ${p_val}` : `Kruskal-wallis test shows no significant difference calculated in mortgage \
                    delinquency rates before and after the disaster. p-value: ${p_val}`) : 'Not enough data to perform tests'}
                    
            </h3>
        </div>
        
    );
}

export default Graph;