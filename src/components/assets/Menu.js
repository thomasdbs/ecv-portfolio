import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Menu extends Component {

  componentDidMount() {

    setTimeout( () => {
      document.querySelector('.menu').classList.add('animation')
    }, 10)


    setTimeout(() => {
      document.querySelectorAll('.menu-link').forEach(i =>{
        i.classList.toggle('none')
      })
    }, 610)

    document.querySelector('body').style.overflow='hidden'
  }

  componentWillUnmount() {
    document.querySelector('body').style.overflow='auto'
  }

  render() {

    return (
      <div className="menu">
        <button className="menu-link none btn-anim" onMouseDown={() => this.props.redirect('/')}>
          Works
        </button>
        <button className="menu-link none btn-anim" onMouseDown={() => this.props.redirect('/about')}>
          About
        </button>
        <button className="menu-link none btn-anim" onMouseDown={() => this.props.redirect('/contact')}>
          Contact
        </button>
      </div>
    )

  }

}

export default Menu
