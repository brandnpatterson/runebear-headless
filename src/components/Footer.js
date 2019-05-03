import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { blue, dark, light } from "../util/color";
import { mediumDown, mediumUp } from "../util/media";

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        <strong>Rune Bear</strong> is always looking for submissions from new
        and established writers. Check out our <Link to="/submit"> SUBMIT</Link>{" "}
        page for rules about how to send your prose or poetry.
      </p>
      <a
        className="copyright"
        href="http://www.brandnpatterson.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        &copy;
        {new Date().getFullYear()} Brandon Patterson. All Rights Reserved.
      </a>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  background: ${dark};
  color: ${light};
  display: flex;
  flex-direction: column;
  margin-top: 1.25rem;

  @media ${mediumDown} {
    padding-bottom: 1.875rem;
  }

  a {
    color: ${blue};
  }

  p {
    color: ${light};
    font-size: 0.875rem;
    max-width: 25rem;
    padding: 1.875rem 0 0 0.625rem;
    text-align: left;
    width: 90%;

    @media ${mediumUp} {
      font-size: 1.125rem;
      margin: 1.563rem 0 0 2.188rem;
      max-width: 31.25rem;
      width: 33.13rem;
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
    font-size: 0.875rem;
    margin-left: 0.625rem;
    text-align: left;

    @media ${mediumUp} {
      font-size: 1.125rem;
      margin: 1.563rem 0 3.125rem 2.813rem;
    }
  }

  .copyright:hover {
    color: ${blue};
  }
`;

export default Footer;
