import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <nav className="navbar" aria-label="main navigation">
      <div className="navbar brand">
        <div className="navbar-burger is-large" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="navbar-logo"></div>
        <div className="navbar-menu navbar-target" id="navMenu">
          <div className="navbar-center">
            <div className="navbar-item">
              <Link to="/"> Home </Link>
              <Link to="/submit"> Submit </Link>
              <Link to="/weekly"> Weekly </Link>
              <Link to="/quarterly"> Quarterly </Link>
              <Link to="/about"> About </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
)

export default Header
