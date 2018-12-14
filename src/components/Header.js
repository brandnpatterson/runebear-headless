import React, { Component } from 'react';
import { array, func, object } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { blue, dark, light } from '../util/color';
import { mediumUp, smallOnly } from '../util/media';

const propTypes = {
  changePage: func.isRequired,
  pages: array.isRequired,
  weekly: object
};

class Header extends Component {
  state = {
    isActive: false
  };

  render() {
    const { isActive } = this.state;

    const toggleActive = () => {
      this.props.changePage();

      if (window.innerWidth <= 1023) {
        this.setState({ isActive: !isActive });
      }
    };

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1023) {
        isActive === true && this.setState({ isActive: false });
      }
    });

    const Navigation = () => {
      return this.props.pages.map(page => {
        const location = page.slug === 'home' ? '' : page.slug;

        return (
          <Link
            key={page.id}
            onClick={toggleActive}
            className="navbar-item"
            to={'/' + location}
          >
            {page.slug.toUpperCase()}
          </Link>
        );
      });
    };

    return (
      <StyledHeader>
        <nav className="navbar" aria-label="main navigation">
          <div
            onClick={toggleActive}
            data-target="navMenu"
            className={
              'navbar-burger is-large ' + (isActive ? 'is-active' : '')
            }
          >
            <span />
            <span />
            <span />
          </div>
          <div
            id="navMenu"
            className={
              'navbar-menu navbar-target ' + (isActive ? 'is-active' : '')
            }
          >
            <div className="navbar-items">
              <Navigation />
            </div>
          </div>
        </nav>
      </StyledHeader>
    );
  }
}

const StyledHeader = styled.header`
  .navbar {
    margin-bottom: 3.125rem;

    @media ${smallOnly} {
      margin-top: -0.125rem;
    }
  }

  .navbar-menu {
    background: ${dark};
    z-index: 2;
  }

  .navbar-burger {
    padding-top: 0.75rem !important;
    margin-right: 0.75rem;
    position: relative;
    z-index: 3;
  }

  .navbar-burger.is-active {
    position: relative;
    z-index: 10;
  }

  .navbar-burger span {
    background: ${light};
  }

  .navbar-items {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 1.25rem 0;
    max-width: 68.75rem;

    @media ${mediumUp} {
      flex-direction: row;
      margin: 0 auto;
    }
  }

  .navbar-items a {
    color: ${light};
    font-family: serif;
    font-size: 1.5625rem;
  }

  .navbar-item:hover,
  .navbar-item:active {
    background: ${dark};
  }

  @media ${smallOnly} {
    .navbar-item:hover,
    .navbar-item:active {
      color: ${blue};
    }
  }

  .navbar-items .navbar-item {
    @media ${mediumUp} {
      margin: 0 2.1875rem;
    }
  }

  .navbar-target.is-active {
    padding-top: 1.25rem;
    position: relative;
    top: -3.125rem;
  }

  .runebear-logo.is-active {
    position: absolute;
    z-index: 1;
  }

  .navbar-end {
    position: absolute;
    right: 0;
    text-align: right;
    top: 3.75rem;
  }
`;

Header.propTypes = propTypes;

export default Header;
