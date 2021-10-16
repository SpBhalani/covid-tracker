import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import numeral from 'numeral'

/**
* @author
* @function LineChart
**/

export const LineChart = ({ casesType = "cases" }) => {

    const [data, setData] = useState([]);
    // https://disease.sh​/v3​/covid-19​/historical​/all?lastdays=120

    const options = {
        plugins: false,
        tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0")
                },
            },
        },
        legend: {
            display: false
        },

        elements: {
            point: {
                radius: 0,
            },

        },

        maintainAspectRation: false,

        scales: {
            xAxes: [
                {
                    gridLines: {
                        display:false
                    },
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat: "ll",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display:false
                    },
                    tricks: {
                        callback: function (value, index, values) {
                            return numeral(value).format("0a");
                        },
                    },
                },
            ],
        },
    }

    const buildChartData = (data, casesType = "cases") => {
        const chartData = [];
        let lastData;

        for (const date in data[casesType]) {
            if (lastData) {
                let newEntry = {
                    x: date,
                    y: data[casesType][date] - lastData
                }
                chartData.push(newEntry);
            }
            lastData = data[casesType][date];
        }
        return chartData;
    }

    useEffect(() => {
        const getData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
                .then(res => res.json())
                .then(data => {
                    const chartData = buildChartData(data,casesType);
                    setData(chartData);
                    console.log(chartData);
                })
        }
        getData();
    }, [casesType])

    return (
        <div>

            {data?.length > 0 && (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                BackgroundColor: "#111111",
                                borderColor: "rgb(171 24 24)",
                                data: data,
                            }
                        ]
                    }}
                />
            )}

        </div>
    )

}