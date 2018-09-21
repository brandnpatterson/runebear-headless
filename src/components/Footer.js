import React, { Component } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { blue, dark, light } from '../util/color';
import { mediumUp } from '../util/media';

class Footer extends Component {
  static propTypes = {
    footer: object
  };

  render() {
    const { footer } = this.props.pages;
    const __html = footer && footer.content && footer.content.rendered;

    const thisYear = new Date().getFullYear();

    return (
      <StyledFooter>
        <div className="content" dangerouslySetInnerHTML={{ __html }} />
        <a
          className="copyright"
          href="https://github.com/brandnpatterson"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy;
          {thisYear} Brandon Patterson. All Rights Reserved.
        </a>
      </StyledFooter>
    );
  }
}

const mapStateToProps = state => ({
  pages: state.pages
});

export default connect(mapStateToProps)(Footer);

const StyledFooter = styled.footer`
  background: ${dark};
  color: ${light};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 20px;

  a {
    color: ${blue};
  }

  p {
    color: ${light};
    font-size: 14px;
    max-width: 400px;
    padding: 30px 0 0 10px;
    width: 90%;

    @media ${mediumUp} {
      font-size: 18px;
      margin: 25px 0 0 40px;
      max-width: 500px;
      text-align: center;
      width: 530px;
    }
  }

  strong {
    color: ${light};
  }

  span {
    font-weight: bold;
  }

  .copyright {
    color: ${light};
    font-size: 14px;
    margin-left: 10px;
    text-align: left;
    @media ${mediumUp} {
      font-size: 18px;
      margin: 25px 0 50px 60px;
    }
  }

  .copyright:hover {
    color: ${blue};
  }
`;
