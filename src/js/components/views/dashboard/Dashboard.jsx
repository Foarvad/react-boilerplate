import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PageTitle from 'js/components/common/PageTitle';


const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Dashboard extends Component {
  static propTypes = {};

  render() {
    return <Wrapper><PageTitle>Dashboard</PageTitle></Wrapper>;
  }
}

export default Dashboard;

const Wrapper = styled.div`
  height: 3000px;
`;
