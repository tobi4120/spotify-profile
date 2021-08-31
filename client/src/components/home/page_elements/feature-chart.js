import Chart from 'chart.js';
import React, { useEffect } from "react";

export default function FeatureChart(props) {
    useEffect(() => {
        createChart();
        console.log(props)
    }, [])

    const createChart = () => {
        const ctx = document.getElementById('chart');
        const labels = Object.keys(props.track.features);
        const data = Object.values(props.track.features);
  
        new Chart(ctx, {
          type: props.type,
          data: {
            labels,
            datasets: [
              {
                label: '',
                data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.3)',
                  'rgba(255, 159, 64, 0.3)',
                  'rgba(255, 206, 86, 0.3)',
                  'rgba(75, 192, 192, 0.3)',
                  'rgba(54, 162, 235, 0.3)',
                  'rgba(104, 132, 245, 0.3)',
                  'rgba(153, 102, 255, 0.3)',
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(104, 132, 245, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            aspectRatio: 1,
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              },
            },
            title: {
              display: true,
              text: `Audio Features`,
              fontSize: 18,
              fontColor: '#ffffff',
              padding: 30,
            },
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: 'rgba(255, 255, 255, 0.3)',
                  },
                  ticks: {
                    fontSize: 12,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    color: 'rgba(255, 255, 255, 0.3)',
                  },
                  ticks: {
                    beginAtZero: true,
                    fontSize: 12,
                  },
                },
              ],
            },
          },
        });
    };

    return (
        <canvas id="chart" />
    );
}