import React from 'react'
import {useEffect, useState} from 'react'

import { Chart } from "react-google-charts";

export const data = [
    ["Date", "Texas"],
    [1, 2.4],
    [2, 2.7],
    [3, 3.5]
];

export const options = {
    chart: {
        title: "Mortgage Delinquency Rates",
        subtitle: "in Percent (%)"
    }
};

function Graph({state="MD", date="2015-08"}) {

    const [dataList, setDataList ] = useState([])

    async function getData() {
        let link = "http://127.0.0.1:8000/mortgages/" + state + "/" + date
        let response = await fetch(link)
        let result = await response.json()
        console.log(result)
        setDataList(result)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Chart
            chartType="Line"
            width="500px"
            height="400px"
            data={dataList}
            options={options}
        />
    );
}

export default Graph;