import React, { Component } from 'react'
import axios from 'axios'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'

import config from '../../config/config'
import { CheckLanguage } from '../assets/Sessions'
import { Language } from '../../config/language'
import Container from '../assets/Container'

class ABOUT extends Component {

  state = {
    navbar:false,
    title:null,
    content:null,
    picture:null,
    language:null,
    cv:null
  }

  componentWillMount() {
    const language = CheckLanguage()
    this.setState({ language:language })
  }

  componentDidMount() {

    axios.get(`${config.mainRoute}pages/${config.aboutPageID}?_embed`)
    .then((response) => {
      this.setState({
        title:response.data.title.rendered,
        content:response.data.acf[`content_${this.state.language}`],
        cv:response.data.acf.url_cv,
        picture:response.data._embedded['wp:featuredmedia']
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
      document.querySelector('.about .container').classList.add('animation')
    }, 100)
    setTimeout( () => {
      const picture = document.querySelector('.about img')
      if (picture) {
        picture.classList.add('animation')
      }else {
        document.querySelector('.about .no_picture').classList.add('animation')
      }
    }, 500)
    // setTimeout( () => {
    //   document.querySelector('.about').classList.add('animated')
    // }, 1100)
  }

  remove = () => {
    document.querySelector('.about').classList.remove('animated')
    setTimeout( () => {
      document.querySelector('.about h1').classList.remove('animation')
      document.querySelector('.about').classList.remove('animation')
      document.querySelector('.about .container').classList.remove('animation')
      const picture = document.querySelector('.about img')
      if (picture) {
        picture.classList.remove('animation')
      }else {
        document.querySelector('.about .no_picture').classList.remove('animation')
      }
    }, 100)
  }

  render() {

    const { navbar, content, title, picture, cv, language } = this.state

    let show = false

    if (content !== null) {
      show = true
    }

    return (

      <Container
        show={show}
        onHome={false}
        menuVisible={navbar}
        path={this.props.location.pathname}
        toggleMenu={this.toggleMenu}>

        {(content !== null) && (
          <div className="about">

            {(picture) ?
              <img src={picture[0].source_url} alt=""/>
              :
              <div className="no_picture"></div>
            }

            <h1>{title}</h1>
            <div className="container">
              {renderHTML(content)}

              {(cv) && (
                <div>
                  <a className="btn-anim" href={cv} target="_blank">{Language(language).download_resume} </a>
                  <img src={require('../../img/arrow-right.png')} alt="" />
                </div>
              )}
            </div>

          </div>
        )}

      </Container>

    )


  }

}

export default ABOUT;
