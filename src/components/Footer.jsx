import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer>
    <p>
      <span>Rune Bear</span>
      is always looking for submissions from new and established writers. Check out our
        <Link to="/submit"> SUBMIT </Link>
      section for our rules about how to send your prose or poetry.
      </p>
    <br />
    <a class="copyright" href="http://brandnpatterson.com">&copy;2018 Brandon Patterson. All Rights Reserved.</a>
  </footer>
)

export default Footer
