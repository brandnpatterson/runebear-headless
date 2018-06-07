import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'
import { blue, dark, light } from '../util/color'
import { mediumUp } from '../util/media'

let propTypes = {
  footer: string.isRequired
}

let Footer = ({ footer }) => {
  let thisYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <div className="content" dangerouslySetInnerHTML={{
        __html: footer
      }} />
      <a className="copyright" href="https://github.com/brandnpatterson" target="_blank">
        &copy;{thisYear} Brandon Patterson. All Rights Reserved.
      </a>
    </StyledFooter>
  )
}

let StyledFooter = styled.footer `
  background: ${dark};
  color: ${light};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

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
      max-width: 500px;
      margin: 25px 0 0 40px;
      text-align: center;
      width: 530px;
    }

    strong {
      color: ${light};
    }

    span {
      font-weight: bold;
    }
  }

  .copyright {
    color: ${light};
    font-size: 14px;
    margin-left: 10px;
    text-align: left;

    &:hover {
      color: ${blue}
    }

    @media ${mediumUp} {
      font-size: 18px;
      margin: 25px 0 50px 60px;
    }
  }
`

Footer.propTypes = propTypes

export default Footer
