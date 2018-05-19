import React, { Component } from 'react';
import { connect } from 'react-redux';

const Chart = () => {
  return <div id="draw" />;
};

const mapStateToProps = ({ readings }, drawStuff) => {
  let scatterPoints = [];
  for (let i = 0; i < readings.length; i++) {
    scatterPoints.push([
      readings[i].createdAt,
      readings[i].degrees,
      readings[i].precentage
    ]);
  }
  console.log(scatterPoints);

  google.charts.load('current', { packages: ['corechart', 'scatter'] });
  google.charts.setOnLoadCallback(drawStuff);

  function drawStuff() {
    let button = document.getElementById('change-chart');
    let draw = document.getElementById('draw');

    let data = new google.visualization.DataTable();
    data.addColumn('string', 'TIME');
    data.addColumn('number', 'TEMP °C');
    data.addColumn('number', 'HUMIDITY %');

    data.addRows(scatterPoints);

    let materialOptions = {
      chart: {
        title: 'TEMP & HUMIDIY',
        subtitle: 'based on raspberry PI sensor'
      },
      width: 800,
      height: 500,
      series: {
        0: { axis: 'Temp' },
        1: { axis: 'Humidity' }
      },
      axes: {
        y: {
          Temp: { label: 'Temp' },
          humidty: { label: 'Humidity' }
        }
      }
    };

    let classicOptions = {
      width: 800,
      series: {
        0: { targetAxisIndex: 0 },
        1: { targetAxisIndex: 1 }
      },
      title: 'TEMP & HUMIDIY - based on raspberry PI sensor',

      vAxes: {
        // Adds titles to each axis.
        0: { title: 'TEMP °C' },
        1: { title: 'HUMIDITY %' }
      }
    };

    const drawMaterialChart = () => {
      var materialChart = new google.charts.Scatter(draw);
      materialChart.draw(
        data,
        google.charts.Scatter.convertOptions(materialOptions)
      );
      button.innerText = 'Change to Classic';
      button.onclick = drawClassicChart;
    };

    const drawClassicChart = () => {
      var classicChart = new google.visualization.ScatterChart(draw);
      classicChart.draw(data, classicOptions);
      button.innerText = 'Change to Material';
      button.onclick = drawMaterialChart;
    };

    drawMaterialChart();
  }

  return {
    drawStuff
  };
};

export default connect(mapStateToProps)(Chart);
