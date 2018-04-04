import React from 'react'
import { Link } from 'react-router-dom'

// styles
import styled from 'styled-components'
import color from './styles/color';
import media from './styles/media';

const Header = ({ navbar }) => {
  const setNavbar = () => {
    let location
    return navbar.map((nav, i) => {
      // home page
      if (nav === 'HOME') {
        location = ''
      // promotional
      } else if (nav === 'QUARTERLY'.toUpperCase() || nav === 'WEEKLY'.toUpperCase()) {
        location = 'coming-soon'
      // any other page
      } else {
        location = nav.toLowerCase()
      }
      return (
        <div key={i} className="navbar-item">
          <Link to={location}>{nav}</Link>
        </div>
      )
    })
  }

  return (
    <StyledHeader>
      <nav className="navbar" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-burger is-large" data-target="navMenu">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="navbar-menu navbar-target" id="navMenu">
          <div className="navbar-items">
            {setNavbar()}
          </div>
        </div>
      </nav>
    </StyledHeader>
  )
}

const StyledHeader = styled.header `
  .navbar {
    margin-bottom: 50px;
  }

  .navbar-menu {
    background: ${color.$dark};
  }

  .navbar-burger.is-active {
    position: relative;
    z-index: 10;

    span {
      background: ${color.$lighter};
    }
  }

  .navbar-items {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
    max-width: 1100px;
    ${media.$mediumUp} {
      display: flex;
      margin: 0 auto;
    }

    .navbar-item {
      ${media.$mediumUp} {
        margin: 0 35px;
      }
    }

    a {
      color: ${color.$lighter};
      font-family: serif;
      font-size: 25px;

      &:hover {
        color: ${color.$lighter};
      }
    }
  }

  .navbar-target.is-active {
    padding-top: 20px;
    position: relative;
    top: -50px;
  }

  .runebear-logo.is-active {
    position: absolute;
    z-index: 1;
  }

  .navbar-end {
    position: absolute;
    right: 0;
    text-align: right;
    top: 60px;
  }
`
export default Header
