import React from 'react'
import styled from 'styled-components'

// styles
import color from '../util/color'
import { mediumUp } from '../util/media'

let Footer = ({ footer }) => {
  let thisYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <div className="content" dangerouslySetInnerHTML={{
        __html: footer
      }} />
      <a className="copyright" href="http://brandnpatterson.com">
        &copy;{thisYear} Brandon Patterson. All Rights Reserved.
      </a>
    </StyledFooter>
  )
}

let StyledFooter = styled.footer `
  background: ${color.dark};
  color: ${color.lighter};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  a { 
    color: ${color.blue}; 
  }

  p {
    color: ${color.lighter};
    font-size: 14px;
    max-width: 400px;
    padding: 30px 0 0 10px;
    width: 90%;

    @media ${mediumUp} {
      font-size: 18px;
      margin-bottom: 50px;
      max-width: 500px;
      margin: 25px 0 0 40px;
      text-align: center;
      width: 530px;
    }

    strong {
      color: ${color.lighter};
    }

    span {
      font-weight: bold;
    }
  }

  .copyright {
    color: ${color.lighter};
    font-size: 14px;
    margin-left: 10px;
    text-align: left;

    &:hover {
      color: ${color.blue}
    }

    @media ${mediumUp} {
      font-size: 18px;
      margin: 25px 0 50px 60px;
    }
  }
`

export default Footer
