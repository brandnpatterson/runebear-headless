import React from 'react';
import { array } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

const propTypes = {
  pages: array.isRequired
};

const Quarterly = ({ pages }) => {
  const page = pages.filter(p => p.slug === 'quarterly')[0];

  return (
    <StyledQuarterly>
      <div
        className="quarterly-content"
        dangerouslySetInnerHTML={{ __html: page && page.content.rendered }}
      />
    </StyledQuarterly>
  );
};

const StyledQuarterly = styled.div`
  display: block;

  .quarterly-content {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media ${mediumUp} {
      flex-direction: row;
      margin: 8rem auto 0;
    }
  }

  .speech-bubble-wrapper {
    position: relative;
  }

  .speech-bubble {
    @media ${mediumUp} {
      margin-top: -7.5rem;
    }
  }

  .coming-soon-text {
    left: 3.125rem;
    position: absolute;
    top: 4.375rem;

    @media ${mediumUp} {
      font-size: 1.875rem;
      left: 6.875rem;
      top: 1.563rem;
    }
  }
`;

Quarterly.propTypes = propTypes;

export default Quarterly;
