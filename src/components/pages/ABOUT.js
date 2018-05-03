import React, { Component } from 'react'
import axios from 'axios'
import renderHTML from 'react-render-html'

import config from '../../config/config'

import Container from '../assets/Container'

import _link from '../dom/_link'
import _h1 from '../dom/_h1'

class ABOUT extends Component {

  state = {
    navbar:false,
    title:null,
    content:null,
    picture:null
  }

  componentWillMount() {
    axios.get(`${config.mainRoute}pages/${config.aboutPageID}?_embed`)
    .then((response) => {
      this.setState({
        title:response.data.title.rendered,
        content:response.data.content.rendered,
        picture:response.data._embedded['wp:featuredmedia'][0].source_url
      })
      this.animatePage()
    })
    .catch(error => {
      alert(error)
    })
  }

  toggleMenu = () => {
    this.setState({navbar:!this.state.navbar})
  }

  animatePage = () => {
    setTimeout( () => {
      document.querySelector('.about h1').classList.add('animation')
      document.querySelector('.about').classList.add('animation')
      document.querySelector('.about div').classList.add('animation')
    }, 100)
    setTimeout( () => {
      document.querySelector('.about img').classList.add('animation')
    }, 500)
    setTimeout( () => {
      document.querySelector('.about').classList.add('animated')
    }, 1100)
  }

  remove = () => {
    document.querySelector('.about').classList.remove('animated')
    setTimeout( () => {
      document.querySelector('.about h1').classList.remove('animation')
      document.querySelector('.about').classList.remove('animation')
      document.querySelector('.about div').classList.remove('animation')
      document.querySelector('.about img').classList.remove('animation')
    }, 100)
  }

  render() {

    return (

      <Container onHome={false} menuVisible={this.state.navbar} toggleMenu={this.toggleMenu}>

        {(this.state.content !== null) && (
          <div className="about">

            <h1>{this.state.title}</h1>
            <div>
              {renderHTML(this.state.content)}
            </div>

            {(this.state.picture !== null) && (
              <img src={this.state.picture} alt=""/>
            )}

          </div>
        )}

    </Container>

  )

}

}

export default ABOUT;
