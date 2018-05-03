import React, { Component } from 'react'
import Container from '../assets/Container'
import _link from '../dom/_link'
import _h1 from '../dom/_h1'

class NOT_FOUND extends Component {

  render() {

    return (

      <Container>
        <_h1 content="NOT FOUND" />
        <_link url="/" content="Go to home" />
      </Container>

    )

  }

}

export default NOT_FOUND;
