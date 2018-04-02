import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import color from './styles/color';
import media from './styles/media';

const routes = [
  { id: 1, to: '/', title: 'HOME' },
  { id: 2, to: '/submit', title: 'SUBMIT' },
  { id: 3, to: '/weekly', title: 'WEEKLY' },
  { id: 4, to: '/quarterly', title: 'QUARTERLY' },
  { id: 5, to: '/about', title: 'ABOUT' },
]

const Header = () => {
  const routesMarkup = () => {
    return routes.map(route => {
      return <div key={route.id} className="navbar-item">
        <Link to={route.to}> {route.title} </Link>
      </div>
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
            {routesMarkup()}
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
    margin: 20px 0;
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
