import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class _link extends Component {

  render() {

    const { url, content } = this.props

    return (
      <Link to={url} className="_link">
        {content}
      </Link>
    )

  }

}

export default _link;
