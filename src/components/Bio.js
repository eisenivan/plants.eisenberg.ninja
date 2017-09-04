import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <p
        style={{
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Ivan Eisenberg`}
          style={{
            float: 'left',
            marginRight: rhythm(1 / 4),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        Ivan Eisenberg is a computer programmer that wants to teach his daughter
        about nature. He plays in <a href="http://paythedevil.us">a band</a> and
        has a <a href="https://twitter.com/ivaneisenberg">Twitter account</a>.
      </p>
    )
  }
}

export default Bio
