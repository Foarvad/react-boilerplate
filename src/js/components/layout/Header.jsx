import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { media } from 'js/constants/media';

import MenuIcon from 'img/svg/menu.svg';
import UserIcon from 'img/svg/user.svg';


const mapStateToProps = ({ Auth }) => ({
  isAuthorized: Auth.get('isAuthorized'),
});

@withRouter
@connect(mapStateToProps)
class Header extends Component {
  static propTypes = {
    isAuthorized: PropTypes.bool.isRequired,

    handleToggleMobileSidebar: PropTypes.func.isRequired,
    handleToggleDropdown: PropTypes.func.isRequired,
  };

  render() {
    const { handleToggleMobileSidebar, handleToggleDropdown, isAuthorized } = this.props;

    return (
      <Wrapper>
        <HeaderLeft>
          <MobileSidebarButton onClick={handleToggleMobileSidebar}>
            <StyledMenuIcon />
          </MobileSidebarButton>
          <LogoWithLink to="/">REACT BOILERPLATE</LogoWithLink>
        </HeaderLeft>
        <HeaderRight>
          <UserProfile onClick={handleToggleDropdown}>
            {isAuthorized ? 'Profile' : 'Authorization'}
            <StyledUserIcon />
          </UserProfile>
        </HeaderRight>
      </Wrapper>
    );
  }
}

export default Header;

export const Wrapper = styled.div`
  height: 53px;
  min-height: 53px;
  background: #112d7b;
  display: flex;
  justify-content: space-between;
  ${media.xs} {
    height: 45px;
    min-height: 45px;
  }
`;

const StyledMenuIcon = styled(MenuIcon)`
  width: 22px;
  height: 22px;
`;

const StyledUserIcon = styled(UserIcon)`
  width: 30px;
  height: 30px;
  margin-left: 10px;
`;

const MobileSidebarButton = styled.div`
  display: none;
  ${media.xs} {
    width: 45px;
    min-width: 45px;
    border: 0;
    height: 100%;
    background: #112d7b;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    display: flex;
  }
`;

const UserProfile = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 15px;
  height: 100%;
  cursor: pointer;
  user-select: none;

  width: 250px;
  border-left: 1px solid #0d215a;
  border-right: 1px solid #0d215a;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const LogoWithLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  color: #fff;
  text-decoration: none;
  padding-left: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.08em;
`;
