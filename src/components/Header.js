import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dark, light } from '../util/color';
import { mediumUp } from '../util/media';

class Header extends Component {
  state = {
    isActive: false
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1023) {
        this.setState({
          isActive: false
        });
      }
    });
  }

  toggleActive = () => {
    // toggle active state only if screen is small
    if (window.innerWidth <= 1023) {
      this.setState({
        isActive: !this.state.isActive
      });
    }
  };

  renderHeader() {
    const { data } = this.props.pages;

    return data.filter(page => page.title.rendered !== 'Footer').map(page => {
      const pageTitle = page.title.rendered.toUpperCase();
      let location;
      // // home page
      if (pageTitle === 'HOME') {
        location = '';
        // any other page
      } else {
        location = pageTitle.toLowerCase().replace(/\s+/g, '-');
      }
      return (
        <div key={page.id} onClick={this.toggleActive} className="navbar-item">
          <Link to={'/' + location}>{pageTitle}</Link>
        </div>
      );
    });
  }

  render() {
    const { isActive } = this.state;

    return (
      <StyledHeader>
        <div>
          <nav className="navbar" aria-label="main navigation">
            <div
              onClick={this.toggleActive}
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
              <div className="navbar-items">{this.renderHeader()}</div>
            </div>
          </nav>
        </div>
      </StyledHeader>
    );
  }
}

const mapStateToProps = state => ({
  pages: state.pages
});

export default connect(
  mapStateToProps,
  {}
)(Header);

const StyledHeader = styled.header`
  .navbar {
    margin-bottom: 50px;
  }

  .navbar-menu {
    background: ${dark};
    position: relative;
    z-index: 2;
  }

  .navbar-burger {
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

  .navbar-items a:hover {
    color: ${light};
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
