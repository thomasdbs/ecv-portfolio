import React, { Component } from 'react'

class Loader extends Component {

    render() {

      const { mini } = this.props

      let className = "loader"
      if (mini) {
        className += " mini"
      }

        return (
          <div className={className}>
            <div className="background">
              <div className="inner"></div>
            </div>
          </div>
        )

    }

}

export default Loader
