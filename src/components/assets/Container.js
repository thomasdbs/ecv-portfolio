import React, { Component } from 'react'
import Navbar from './Navbar'
import Menu from './Menu'
import { Redirect } from 'react-router'

class Container extends Component {

  state = {
    redirect:false
  }

  toggleMenu = () => {

    if (this.props.menuVisible === true) {

      this.hideMenu()

      setTimeout( () => {
        if (this.props.onProject === true) {
          document.querySelector('.container-in').style.opacity='1'
        }
        this.props.toggleMenu()
      }, 700)

    }else {

      if (this.props.onProject === true) {
        document.querySelector('.container-in').style.opacity='0'
      }
      this.props.toggleMenu()

    }

  }

  hideMenu = () => {
    document.querySelectorAll('.menu-link').forEach(i =>{
      i.classList.add('none')
    })


    setTimeout( () => {
      document.querySelector('.menu').classList.remove('animation')
    }, 100)
  }

  redirect = (url) => {

    document.querySelector('.container-in').classList.add('none')

    this.hideMenu()

    setTimeout( () => {
      this.setState({ redirect:url })
    }, 700)

  }

  render() {

    const { onHome, hideProject, onProject, menuVisible, toggleMenu, children, numProjects, currentProject, projectTitle, goToNext, goToPrev } = this.props
    const { redirect } = this.state

    if (redirect === false) {
      return (

        <div className="container-out">

          <Navbar
            onHome={onHome}
            menuVisible={menuVisible}
            toggleMenu={() => this.toggleMenu()}
            numProjects={numProjects}
            currentProject={currentProject}
            projectTitle={projectTitle}
            goToNext={goToNext}
            goToPrev={goToPrev}
            onProject={onProject}
            hideProject={hideProject}
          />

          {(menuVisible === true) && (<Menu redirect={this.redirect} />)}

          <div className="container-in">


            {children}

          </div>

        </div>

      )
    }else {
      return (<Redirect to={redirect} />)
    }



  }

}

export default Container;
