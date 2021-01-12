import React, {useState, useEffect} from 'react'
import {Line} from "react-chartjs-2";
import { borderColor } from '@material-ui/system';
import { numericLiteral } from '@babel/types';
import numeral from "numeral";

// Gathered from Chart.JS, conveys line graph.
const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
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
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

// Determines data represented on X-Y coordinates in line graph.
  const buildChartData = (data, casesType="cases") => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  /**  Fetches data from disease.sh API to represent line graph
   *  containing an influx of new COVID-19 cases over time.
   */
function LineGraph({ casesType="cases", ...props }) {
    const [data, setData] = useState({});
  
    useEffect(() => {
      const fetchData = async () => {
        await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let chartData = buildChartData(data, casesType);
            setData(chartData);
            console.log(chartData);
            // buildChart(chartData);
          });
      };
  
      fetchData();
    }, [casesType]);

   
  return (
    <div className = {props.className}>
      {data && data.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;