import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const Chart = () => {
  return <div id="draw" />;
};

const mapStateToProps = ({ readings }, drawStuff) => {
  let scatterPoints = [];
  if (readings.length) {
    for (let i = 0; i < readings.length; i++) {
      scatterPoints.push([
        moment(readings[i].createdAt).format('hh:mm:ss'),
        readings[i].degrees,
        readings[i].precentage
      ]);
    }
  }

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
          Humidity: { label: 'Humidity' }
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
        0: { title: 'TEMP °C', format: '##.##' },
        1: { title: 'HUMIDITY %', format: '##.##' }
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
