import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// styles
import color from '../util/color'
import { mediumUp } from '../util/media'

class Header extends Component {
  constructor() {
    super()
    this.state = {
      active: false
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1023) {
        this.setState({
          active: false
        })
      }
    })
  }
  
  setHeader = () => {
    let { header } = this.props
    let location
    return header.map((headerItem, i) => {
      headerItem = headerItem.toUpperCase()

      // home page
      if (headerItem === 'HOME') {
        location = ''
      // any other page
      } else {
        location = headerItem.toLowerCase().replace(/\s+/g, '-')
      }
      return (
        <div key={i} onClick={this.toggleActive} className="navbar-item">
          <Link to={location}>{headerItem}</Link>
        </div>
      )
    })
  }

  toggleActive = () => {
    // toggle active state only if screen is small
    if (window.innerWidth <= 1023) {
      this.setState({
        active: !this.state.active
      })
    }
  }

  render() {
    let { active } = this.state

    return (
      <StyledHeader>
        <nav className="navbar" aria-label="main navigation">
          <div
            onClick={this.toggleActive}
            className={'navbar-burger is-large ' + (active ? 'is-active' : '')}
            data-target="navMenu"
          >
            <span />
            <span />
            <span />
          </div>
          <div 
            className={'navbar-menu navbar-target ' + (active ? 'is-active' : '')} 
            id="navMenu"
          >
            <div className="navbar-items">
              {this.setHeader()}
            </div>
          </div>
        </nav>
      </StyledHeader>
    )
  }
}

let StyledHeader = styled.header `
  .navbar {
    margin-top: -2px;
    margin-bottom: 50px;
  }

  .navbar-menu {
    background: ${color.dark};
  }

  .navbar-burger.is-active {
    position: relative;
    z-index: 10;

    span {
      background: ${color.lighter};
    }
  }

  .navbar-items {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 20px 0;
    max-width: 1100px;
    @media ${mediumUp} {
      flex-direction: row;
      margin: 0 auto;
    }

    .navbar-item {
      @media ${mediumUp} {
        margin: 0 35px;
      }
    }

    a {
      color: ${color.lighter};
      font-family: serif;
      font-size: 25px;

      &:hover {
        color: ${color.lighter};
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
