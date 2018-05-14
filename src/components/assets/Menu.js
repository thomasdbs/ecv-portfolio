import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CheckLanguage } from './Sessions'
import { Language } from '../../config/language'

class Menu extends Component {

  state = {
    language:null
  }

  componentWillMount() {
    const language = CheckLanguage()
    this.setState({ language:language })
  }

  componentDidMount() {

    const { language } = this.state
    document.querySelector(`.menu button[data-language="${language}"]`).style.fontFamily='GTWalsheimProBold'

    const onProject = document.querySelector('.go-to-home')
    if (onProject) {
      onProject.classList.add('none')
    }

    setTimeout( () => {
      document.querySelector('.menu').classList.add('animation')
    }, 10)


    setTimeout(() => {
      document.querySelectorAll('.menu-link').forEach(i =>{
        i.classList.toggle('none')
      })
      document.querySelector('.languages').classList.remove('none')
    }, 610)

    document.querySelector('body').style.overflow='hidden'
  }

  componentWillUnmount() {
    document.querySelector('body').style.overflow='auto'
  }

  changeLanguage = (language) => {
    localStorage.setItem('language', language)
    window.location.reload()
  }

  render() {

    const { language } = this.state

    return (
      <div className="menu">

        <div className="languages none">
          <button data-language="fr" className="btn-anim" onMouseDown={() => this.changeLanguage('fr')}>FR</button>
          <span>/</span>
          <button data-language="en" className="btn-anim" onMouseDown={() => this.changeLanguage('en')}>EN</button>
        </div>

        <button className="menu-link none btn-anim" onMouseDown={() => this.props.redirect('/')}>
          {Language(language).nav_works}
        </button>
        <button className="menu-link none btn-anim" onMouseDown={() => this.props.redirect('/about')}>
        {Language(language).nav_about}
        </button>
        <button className="menu-link none btn-anim" onMouseDown={() => this.props.redirect('/contact')}>
        {Language(language).nav_contact}
        </button>
      </div>
    )

  }

}

export default Menu
