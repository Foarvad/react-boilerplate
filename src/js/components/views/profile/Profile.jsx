import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';

import PrivateRoute from 'js/components/common/PrivateRoute';
import Settings from 'js/components/views/profile/Settings';


const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Profile extends Component {
  static propTypes = {};

  render() {
    return (
      <Switch>
        <PrivateRoute component={Settings} exact path="/profile/settings" />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default Profile;
