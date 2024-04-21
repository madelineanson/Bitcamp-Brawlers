import React from 'react'
import {useEffect, useState} from 'react'

import { Chart } from "react-google-charts";

function Graph({state="MD", date="2015-08"}) {

    const [dataList, setDataList ] = useState([]);
    const [wallistTest, setWallisTest] = useState([])

    async function getData() {
        let link = "http://127.0.0.1:8000/mortgages/" + state + "/" + date
        let response = await fetch(link)
        let result = await response.json()
        result = JSON.parse(result)
        console.log(result)
        setDataList(result)
        setWallisTest(data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (

        <Chart
            chartType="LineChart"
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
    );
}

export default Graph;