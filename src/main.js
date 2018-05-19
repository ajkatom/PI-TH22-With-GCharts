import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { reading } from './store';
import Chart from './chart';

class Main extends Component {
  componentDidMount() {
    const { reading } = this.props;
    reading();
    setInterval(() => {
      reading();
    }, 15000);
  }
  render() {
    let show = false;
    return (
      <div>
        <button id="change-chart">Change to Classic</button>
        <Router>
          <Route path="/" render={() => <Chart show={show} />} />
        </Router>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    reading: () => {
      dispatch(reading());
    }
  };
};

export default connect(null, mapDispatchToProps)(Main);
