import React, { Component } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Dashboard extends Component {
  static propTypes = {};

  render() {
    return <div>Dashboard</div>;
  }
}

export default Dashboard;
