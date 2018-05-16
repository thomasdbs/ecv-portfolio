import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Language } from '../../config/language'
import { CheckLanguage } from '../assets/Sessions'

class NOT_FOUND extends Component {

  state = {
    language:null,
    redirect:false
  }

  componentWillMount() {
    const language = CheckLanguage()
    this.setState({ language:language })
  }

  componentDidMount() {

    setTimeout( () => {
      document.querySelector('.container').classList.add('animation')
    }, 500)

    setTimeout( () => {
      document.querySelectorAll('img').forEach((img) => {
        img.classList.add('animation')
      })
    }, 1500)

  }

  redirect = () => {

    document.querySelectorAll('img').forEach((img) => {
      img.classList.remove('animation')
    })

    setTimeout( () => {
      document.querySelector('.container').classList.remove('animation')
    }, 1000)

    setTimeout( () => {
      this.setState({ redirect:true })
    }, 2000)

  }

  render() {

    const { language, redirect } = this.state

    if (redirect) {

      return <Redirect to="/" />

    }else {

      return (

        <div className="not_found">

          <div className="container">

            <img src={require('../../img/cat-1-404@3x.png')} alt="" className="one" />

            <h1>404</h1>
            <p>{Language(language).not_found_text1}</p>
            <p>{Language(language).not_found_text2}</p>
            <button onClick={() => this.redirect()} className="btn-anim">{Language(language).not_found_link}</button>

            <img src={require('../../img/cat-2-404@3x.png')} alt="" className="two" />

          </div>

        </div>

      )

    }

  }

}

export default NOT_FOUND;
