import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { media } from 'js/constants/media';

import * as UIActions from 'js/actions/UIActions';

import PrivateRoute from 'js/components/common/PrivateRoute';
import Header from 'js/components/layout/Header';
import Dropdown from 'js/components/layout/Dropdown';
import Modal from 'js/components/modals/Modal';
import Profile from 'js/components/views/profile/Profile';
import Dashboard from 'js/components/views/dashboard/Dashboard';


const mapStateToProps = ({ UI }) => ({
  isMobileSidebarOpened: UI.get('isMobileSidebarOpened'),
  isDropdownOpened: UI.get('isDropdownOpened'),
  isModalOpened: UI.get('isModalOpened'),
});

const mapDispatchToProps = dispatch => ({
  openMobileSidebar() {
    dispatch(UIActions.openMobileSidebar());
  },
  hideMobileSidebar() {
    dispatch(UIActions.hideMobileSidebar());
  },
  showDropdown() {
    dispatch(UIActions.showDropdown());
  },
  hideDropdown() {
    dispatch(UIActions.hideDropdown());
  },
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Layout extends Component {
  static propTypes = {
    isMobileSidebarOpened: PropTypes.bool.isRequired,
    isDropdownOpened: PropTypes.bool.isRequired,
    isModalOpened: PropTypes.bool.isRequired,

    openMobileSidebar: PropTypes.func.isRequired,
    hideMobileSidebar: PropTypes.func.isRequired,
    showDropdown: PropTypes.func.isRequired,
    hideDropdown: PropTypes.func.isRequired,
  };

  handleToggleMobileSidebar = () => {
    const { isMobileSidebarOpened, hideMobileSidebar, openMobileSidebar } = this.props;
    if (isMobileSidebarOpened) {
      hideMobileSidebar();
    } else {
      openMobileSidebar();
    }
  };

  handleToggleDropdown = () => {
    const { isDropdownOpened, hideDropdown, showDropdown } = this.props;
    if (isDropdownOpened) {
      hideDropdown();
    } else {
      showDropdown();
    }
  };

  render() {
    const { isDropdownOpened, isModalOpened } = this.props;

    return (
      <MainWrapper>
        <Header
          handleToggleMobileSidebar={this.handleToggleMobileSidebar}
          handleToggleDropdown={this.handleToggleDropdown}
        />
        <Body>
          {isDropdownOpened && <Dropdown />}
          <Content>
            <Switch>
              <Route component={Dashboard} exact path="/" />
              <PrivateRoute component={Profile} path="/profile" />
            </Switch>
          </Content>
        </Body>
        {isModalOpened && <Modal />}
      </MainWrapper>
    );
  }
}

export default Layout;

const MainWrapper = styled.div`
  min-height: 100vh;
`;

const Body = styled.div`
  background: #f4f4f4;
  display: flex;
  flex: 1;
  justify-content: center;
`;

const Content = styled.div`
  min-width: 750px;
  padding: 40px 40px 25px 40px;
  box-shadow: 0 10px 21px 0 rgba(173, 182, 217, 0.3);
  background: #fff;
  ${media.xs} {
    padding: 30px;
  }
`;
