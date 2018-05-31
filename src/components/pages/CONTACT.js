import React, { Component } from 'react'
import axios from 'axios'
import renderHTML from 'react-render-html'
import { Redirect } from 'react-router'

import config from '../../config/config'
import { Language } from '../../config/language'
import { CheckLanguage } from '../assets/Sessions'

import Container from '../assets/Container'

class ABOUT extends Component {

  state = {
    navbar:false,
    title:null,
    introduction:null,
    social_media_presentation:null,
    social_media:null,
    picture:null,
    language:null,
    form_name:'',
    form_email:'',
    form_message:'',
    sended:false,
    redirect:false
  }

  componentWillMount() {
    const language = CheckLanguage()
    this.setState({ language:language })
  }

  componentDidMount() {

    const { language } = this.state

    axios.get(`${config.mainRoute}pages/${config.contactPageID}?_embed`)
    .then((response) => {
      this.setState({
        title:response.data.acf[`title_${language}`],
        introduction:response.data.acf[`introduction_${language}`],
        social_media_presentation:response.data.acf[`social_media_presentation_${language}`],
        social_media:JSON.stringify(response.data.acf.social_media),
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
      document.querySelector('.contact h1').classList.add('animation')
      document.querySelector('.contact').classList.add('animation')
      document.querySelector('.contact .container').classList.add('animation')
    }, 500)
    setTimeout( () => {
      const picture = document.querySelector('.contact .absolute-picture')
      if (picture) {
        picture.classList.add('animation')
      }else {
        document.querySelector('.contact .no_picture').classList.add('animation')
      }
    }, 100)
  }

  remove = () => {
    setTimeout( () => {
      document.querySelector('.contact h1').classList.remove('animation')
      document.querySelector('.contact').classList.remove('animation')
      document.querySelector('.contact .container').classList.remove('animation')
      const picture = document.querySelector('.contact absolute-picture')
      if (picture) {
        picture.classList.remove('animation')
      }else {
        document.querySelector('.contact .no_picture').classList.remove('animation')
      }
    }, 100)
  }

  submitForm = (e) => {
    e.preventDefault()

    axios.defaults.headers.post['Content-Type'] = 'application/json';

    axios.post('https://www.enformed.io/yzg7x0s/', {
      name:this.state.form_name,
      email:this.state.form_email,
      message:this.state.form_message
    })
    .then(response => console.log('mail ok'))
    .catch(error => console.log('mail ko'))


    this.setState({ sended: true })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sended === false && this.state.sended === true) {
      setTimeout( () => {
        document.querySelector('.modal').classList.add('animation')
      }, 100)
      setTimeout( () => {
        document.querySelector('.text-container').classList.add('animation')
      }, 600)
      setTimeout( () => {
        document.querySelector('.text-container > img').classList.add('animation')
      }, 1300)
    }
  }

  redirect = () => {

    document.querySelector('.text-container > img').classList.remove('animation')

    setTimeout( () => {
      document.querySelector('.text-container').classList.remove('animation')
    }, 600)

    setTimeout( () => {
      document.querySelector('.modal').classList.remove('animation')
    }, 1300)

    setTimeout( () => {
      this.setState({ redirect:true })
    }, 2000)

  }

  render() {

    const { navbar, title, redirect, introduction, social_media_presentation, social_media, picture, language, form_name, form_email, form_message, sended } = this.state

    let show = false

    if (title !== null) {
      show = true
    }

    let linksDOM = ""

    if (social_media) {
      const links = JSON.parse(social_media)
      if (links) {
        links.forEach((l) => {
          linksDOM += `<a class="btn-anim" href="${l.social_media_url}">${l.social_media_name}</a>`
        })
      }
    }

    if (redirect) {
      return <Redirect to="/" />
    }else {

      return (

        <Container
          show={show}
          onHome={false}
          menuVisible={navbar}
          path={this.props.location.pathname}
          className={(window.innerWidth < 1025) ? 'responsive' : ''}
          toggleMenu={this.toggleMenu}>

          {(title !== null) && (
            <div className="contact">

              {(picture) ?
                <img src={picture[0].source_url} alt="" className="absolute-picture" />
                :
                <div className="no_picture"></div>
              }

              {(sended === true) && (
                <div className="modal">
                  <div className="modal-container">
                    <div className="text-container">
                      <h2>{Language(language).mail_sended_h2}</h2>
                      <p>{Language(language).mail_sended_p1}</p>
                      <p>{Language(language).mail_sended_p2}</p>
                      <div>
                        <button onClick={() => this.redirect()} className="btn-anim">{Language(language).not_found_link}</button>
                        <img src={require('../../img/arrow-right.png')} alt="" />
                      </div>
                      <img src={require('../../img/cat-merci@3x.png')} alt="" />
                    </div>
                  </div>
                </div>
              )}

              <h1>{title}</h1>
              <div className="container">
                <p>{introduction}</p>

                <form onSubmit={this.submitForm} >
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder={Language(language).form_placeholder_name}
                    value={form_name}
                    onChange={(e) => this.setState({ form_name: e.target.value })}
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder={Language(language).form_placeholder_email}
                    value={form_email}
                    onChange={(e) => this.setState({ form_email: e.target.value })}
                  />
                  <textarea
                    required
                    rows="2"
                    name="message"
                    placeholder={Language(language).form_placeholder_message}
                    value={form_message}
                    onChange={(e) => this.setState({ form_message: e.target.value })}
                  />

                  <div className="submit">
                    <button type="submit" className="btn-anim" >{Language(language).form_placeholder_submit}</button>
                    <img src={require('../../img/arrow-right.png')} alt="" />
                  </div>

                </form>

                <p>{social_media_presentation}</p>

                {(linksDOM !== "") && (
                  <div>
                    {renderHTML(linksDOM)}
                  </div>
                )}

              </div>

            </div>
          )}


        </Container>

      )

    }

  }

}

export default ABOUT;
