import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Language } from '../../config/language'

class Navbar extends Component {

  render() {

    return (
      <div className="navbar">

        <div className="nav-button" onClick={this.props.toggleMenu}>
          {(this.props.menuVisible === false) ?
            <div className="nav-icon">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            :
            <div className="nav-icon open">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          }

        </div>

        {(this.props.onProject === true) ?
          <div className="go-to-home">
            <img src={require('../../img/arrow-left.png')} alt="" />
            <button className="btn-anim" onClick={() => this.props.hideProject()}>
              {Language(this.props.language).works}
            </button>
          </div>
          :
          <div className="author">
            <span>Aurélie Marcuard</span>
          </div>
        }

        <div className="logo">
          <Link to="/"><img src={require('../../img/logo.png')} alt="" className="logo-picture" /></Link>
        </div>

        {(this.props.onHome === true && this.props.onProject === false) && (
          <div className="page-active">
            <span>{this.props.projectTitle}</span>
          </div>
        )}

        {(this.props.onHome === true && this.props.onProject === false) && (
          <div className="slider-infos">
            <button onClick={() => this.props.goToPrev()} className="home-slider-button">
              <img src={require('../../img/arrow-left.png')} alt="" className="slider-picture" />
            </button>
            <span>{this.props.currentProject} / {this.props.numProjects}</span>
            <button onClick={() => this.props.goToNext()} className="home-slider-button">
              <img src={require('../../img/arrow-right.png')} alt="" className="slider-picture" />
            </button>
          </div>
        )}

      </div>

    )

  }

}

export default Navbar
