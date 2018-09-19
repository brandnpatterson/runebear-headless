import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPages } from '../actions';

class Header extends Component {
  componentDidMount() {
    this.props.fetchPages();
  }

  renderPages() {
    return this.props.pages.map(page => {
      return <li key={page.id}>{page.title.rendered}</li>;
    });
  }

  render() {
    return (
      <div>
        <h1>Header</h1>
        <ul>{this.renderPages()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pages: state.pages
});

const mapDispatchToProps = { fetchPages };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
