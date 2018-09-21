import React, { Component } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { changeWeeklyPage, fetchWeeklyPage } from '../actions';

export default ChildComponent => {
  class ComposedComponent extends Component {
    static propTypes = {
      pages: object
    };

    state = {
      page: {}
    };

    componentDidMount() {
      const pages = this.props.pages;

      Object.keys(pages).forEach(page => {
        if (
          this.props.match.path === '/' ||
          this.props.match.path.substring(1) === page
        ) {
          this.setState({ page: pages[page] });
        }
      });
    }

    render() {
      const { changeWeeklyPage, fetchWeeklyPage } = this.props;
      const { content } = this.state.page;
      const weeklyPage = this.state.page.slug === 'weekly';

      return (
        <ChildComponent
          __html={content && content.rendered}
          page={this.state.page}
          changeWeeklyPage={weeklyPage && changeWeeklyPage}
          fetchWeeklyPage={weeklyPage && fetchWeeklyPage}
          weeklyError={weeklyPage && this.props.weekly.error}
          weekly={weeklyPage && this.props.weekly}
          weeklyLoading={weeklyPage && this.props.weekly.loading}
          weeklyCurrentPage={weeklyPage && this.props.weekly.pageNumber}
        />
      );
    }
  }

  const mapStateToProps = state => ({
    pages: state.pages
  });

  const mapDispatchToProps = { changeWeeklyPage, fetchWeeklyPage };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ComposedComponent);
};
