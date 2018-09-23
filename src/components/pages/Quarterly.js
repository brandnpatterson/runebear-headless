import React from 'react';
import { connect } from 'react-redux';

import { string } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';
const propTypes = {
  __html: string
};

const Quarterly = props => {
  document.title = 'Rune Bear';

  const __html =
    props.pages.quarterly && props.pages.quarterly.content.rendered;

  return <StyledQuarterly dangerouslySetInnerHTML={{ __html }} />;
};

Quarterly.propTypes = propTypes;

const mapStateToProps = state => ({
  pages: state.pages
});

export default connect(mapStateToProps)(Quarterly);

const StyledQuarterly = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;

  @media ${mediumUp} {
    flex-direction: row;
    margin: 128px auto 0;
    max-width: 800px;
  }

  .speech-bubble-wrapper {
    position: relative;
  }

  .speech-bubble {
    @media ${mediumUp} {
      margin-top: -120px;
    }
  }

  .coming-soon-text {
    left: 50px;
    position: absolute;
    top: 70px;

    @media ${mediumUp} {
      font-size: 30px;
      left: 110px;
      top: 25px;
    }
  }
`;
