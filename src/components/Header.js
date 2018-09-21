import React, { Component } from 'react';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeWeeklyPage } from '../actions';
import styled from 'styled-components';
import { dark, light } from '../util/color';
import { mediumUp } from '../util/media';

class Header extends Component {
  static propTypes = {
    pages: object,
    weekly: object
  };

  state = {
    _mounted: false,
    isActive: false
  };

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  toggleActive = () => {
    if (this.props.weekly.pageNumber !== 1) {
      this.props.changeWeeklyPage(1);
    }

    if (window.innerWidth <= 1023) {
      this.setState({
        isActive: !this.state.isActive
      });
    }
  };

  renderHeader() {
    const { pages } = this.props;

    if (this._mounted) {
      window.addEventListener('resize', () => {
        if (window.innerWidth > 1023) {
          this.setState({
            isActive: false
          });
        }
      });
    }

    const header = Object.keys(pages)
      .filter(page => page !== 'footer')
      .filter(page => page !== 'loading')
      .sort((a, b) => pages[a].id - pages[b].id);

    return header.map(page => {
      const location = page === 'home' ? '' : page;

      return (
        <div key={page} onClick={this.toggleActive} className="navbar-item">
          <Link to={'/' + location}>{page.toUpperCase()}</Link>
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
  pages: state.pages,
  weekly: state.weekly
});

const mapDispatchToProps = { changeWeeklyPage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
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
