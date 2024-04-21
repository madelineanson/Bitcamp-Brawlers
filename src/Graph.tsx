import React from 'react'
import {useEffect, useState} from 'react'

import { Chart } from "react-google-charts";

function Graph({state="MD", date="2015-08"}) {

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
        let response2 = await fetch(link2)
        let data = await response2.json()
        setWallisTest(data)
    }

    useEffect(() => {
        getData()
    }, [])

    const p_val: number = wallisTest[1]

    const getColor = () => {
        return p_val <= 0.05 ? 'red' : 'green'
    }

    return (
        <div>
            <Chart
                chartType="Line"
                width="500px"
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
                        }
                    }
                }}
            />
            <h3 style={{ color: getColor() }}>
                {wallisTest !== null ? (p_val <= 0.05 ? 
                    `Based on a kruskal wallis test, there IS a significant difference in \n mortgage delinquency rates between the period of a \
                    year before and after the disaster. p-value: ${p_val}}` : `No significant difference calculated in mortgage \
                    delinquency rates before and after the disaster. p-value: ${p_val}`) : 'Loading...'}
            </h3>
        </div>
        
    );
}

export default Graph;