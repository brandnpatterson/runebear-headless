import React, { Component } from 'react';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { blue, dark, light } from '../util/color';
import { mediumUp, smallOnly } from '../util/media';

const propTypes = {
  routes: object,
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

    const renderHeader = () => {
      const { routes } = this.props;

      const header = Object.keys(routes)
        .filter(page => page !== 'footer')
        .filter(page => page !== 'loading')
        .sort((a, b) => routes[a].id - routes[b].id);

      return header.map(page => {
        const location = page === 'home' ? '' : page;

        return (
          <Link
            key={page}
            onClick={toggleActive}
            className="navbar-item"
            to={'/' + location}
          >
            {page.toUpperCase()}
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
            <div className="navbar-items">{renderHeader()}</div>
          </div>
        </nav>
      </StyledHeader>
    );
  }
}

const StyledHeader = styled.header`
  .navbar {
    margin-bottom: 50px;

    @media ${smallOnly} {
      margin-top: -2px;
    }
  }

  .navbar-menu {
    background: ${dark};
    z-index: 2;
  }

  .navbar-burger {
    padding-top: 12px !important;
    margin-right: 12px;
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
    margin: 20px 0;
    max-width: 1100px;

    @media ${mediumUp} {
      flex-direction: row;
      margin: 0 auto;
    }
  }

  .navbar-items a {
    color: ${light};
    font-family: serif;
    font-size: 25px;
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
      margin: 0 35px;
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
`;

Header.propTypes = propTypes;

export default Header;
