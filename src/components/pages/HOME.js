import React, { Component } from 'react'
import axios from 'axios'
import renderHTML from 'react-render-html'
import {TweenMax, TweenLite, TimelineLite, Power2} from 'gsap'
import '../plugins/MorphSVGPlugin'

import config from '../../config/config'
import { Language } from '../../config/language'

import Container from '../assets/Container'
import Loader from '../assets/Loader'
import { CheckLanguage } from '../assets/Sessions'

const svg_path_start = 'm-0.5,1080.5l-2421.0568,852.37141s2421.5568,-1932.87141 2445.75108,-878.45198c469.64406,46.90692 561.66275,-255.62705 1075.17573,-224.37127c513.51298,31.25578 134.30935,266.50318 902.05917,204.43143l-80.92918,46.02041l-1921,0z'
const svg_path_wave = 'm-0.5,1080.5l-864.68917,689.4304s865.18917,-1769.9304 1284.68917,-1471.99185c146.18046,452.82203 164.45115,-29.45473 681.13535,68.3965c516.68419,97.85123 207.49626,439.90354 953.0476,-75.65151l-133.18295,789.81646l-1921,0z'
const svg_path_end = 'm-0.5,1080.5l-1010.77422,-1074.82749s1011.27422,-5.67251 1445.63037,-35.65363c469.64406,46.90692 216.46659,-18.94118 729.97957,12.3146c513.51298,31.25578 7.53843,1.72403 775.28825,-60.34772l-19.12397,1158.51424l-1921,0z'

class HOME extends Component {

  state = {
    loading:false,
    language:null,
    projects:null,
    projectsCount:0,
    currentProject:0,
    navbar:false,
    pictureAnimation:false,
    projectLoading:false,
    singleProject:null
  }

  componentWillMount() {
    const language = CheckLanguage()
    this.setState({ language:language })
  }

  componentDidMount() {


    if (sessionStorage.getItem("projects") !== null && sessionStorage.getItem("projectsCount") !== null) {

      this.setState({
        projects: JSON.parse(sessionStorage.getItem("projects")),
        projectsCount: JSON.parse(sessionStorage.getItem("projectsCount"))
      })

      setTimeout( () => {
        this.captureEndOfVideo()
        this.hoverAnimation()
      }, 100)

    }else {

      this.setState({ loading:true })

      setTimeout( () => {


        axios.get(`${config.mainRoute}posts?_embed`)
        .then((response) => {

          this.setState({
            projects: response.data,
            projectsCount:Object.keys(response.data).length,
            loading:false
          })

          sessionStorage.setItem("projects", JSON.stringify(response.data))
          sessionStorage.setItem("projectsCount", Object.keys(response.data).length)

          this.captureEndOfVideo()
          this.hoverAnimation()

        })
        .catch(error => {
          console.log(error)
        })

      }, 2000)

    }

  }

  captureEndOfVideo = () => {
    const video = document.querySelector('video')
    if (video) {
      video.addEventListener('ended', this.goToNext)
    }
  }

  hoverAnimation = () => {
    const hover = document.querySelector('.hover')
    hover.addEventListener('mouseover', this.pauseVideo)
    hover.addEventListener('mouseout', this.playVideo)
  }

  playVideo = () => {
    const video = document.querySelector('video')
    if (video) {
      video.play()
    }
  }

  pauseVideo = () => {
    const video = document.querySelector('video')
    if (video) {
      video.pause()
    }
  }

  goToNext = () => {
    this.changeSlide('next')
  }

  goToPrev = () => {
    this.changeSlide('prev')
  }

  changeSlide = (direction) => {

    const video = document.querySelector('video')
    const picture = document.querySelector('.container-out')

    if (video) {
      video.removeEventListener('ended', this.goToNext)
    }

    const { currentProject, projectsCount } = this.state

    if (direction === 'next') {
      if (currentProject < projectsCount-1) {
        this.setState({ currentProject:currentProject+1 })
      }else {
        this.setState({ currentProject:0 })
      }
    }else if (direction === 'prev') {
      if (currentProject>0) {
        this.setState({ currentProject:currentProject-1 })
      }else {
        this.setState({ currentProject:projectsCount-1 })
      }
    }

    setTimeout( () => {
      const video = document.querySelector('video')
      if (video) {
        this.captureEndOfVideo()
        this.hoverAnimation()
      }
    }, 100)


  }

  toggleMenu = () => {

    const { navbar, project } = this.state
    const video = document.querySelector('video')

    if (navbar === true) {
      if (video && project === null) {
        video.play()
      }
    }else {
      if (video) {
        video.pause()
      }
    }

    this.setState({navbar:!this.state.navbar})

  }

  changeSingleProject = (direction) => {

    const { currentProject, projectsCount } = this.state
    let newProject = null

    if (direction === 'next') {
      if (currentProject < projectsCount-1) {
        newProject = currentProject+1
      }else {
        newProject = 0
      }
    }else if (direction === 'prev') {
      if (currentProject>0) {
        newProject = currentProject-1
      }else {
        newProject = projectsCount-1
      }
    }

    document.querySelector('.project h1').classList.add('opacity-0')
    document.querySelectorAll('.project > div *').forEach((element) => {
      element.classList.add('opacity-0')
    })

    this.setState({ currentProject:newProject })
    this.smoothScroll(document.documentElement.scrollTop, document.documentElement.scrollTop, newProject)

  }

  smoothScroll = (h, originTop, projectID) => {
    let i = h || 0
    if (i > 0) {
      setTimeout(() => {
        window.scrollTo(0, i)
        this.smoothScroll(i - 50, originTop, projectID)
      }, originTop/500)
    }else{

      document.querySelector('.container-out').style.overflow='hidden'
      this.setState({ projectLoading:true })
      document.querySelector('.project').classList.add('line-height')

      const { language } = this.state

      setTimeout( () => {
        axios.get(`${config.mainRoute}posts/${this.state.projects[Object.keys(this.state.projects)[projectID]].id}?_embed`)
        .then((response) => {

          this.setState({
            projectLoading:false,
            singleProject:{

              title:response.data.title.rendered,
              subtitle:response.data.acf[`subtitle_${language}`],
              content:response.data.acf[`content_${language}`],
              context:response.data.acf[`context_${language}`],
              picturesGallery: JSON.stringify(response.data.acf.pictures_gallery),
              links: JSON.stringify(response.data.acf.links),
              year:response.data.acf.year,
              picture:response.data.acf.picture
            }
          })

          setTimeout( () => {
            document.querySelector('.project h1').classList.remove('opacity-0')
            document.querySelectorAll('.project > div *').forEach((element) => {
              element.classList.remove('opacity-0')
            })
            document.querySelector('.project').classList.remove('line-height')

            const video = document.querySelector('video')
            if (video) {
              video.pause()
            }
            document.querySelector('.container-out').style.overflow='inherit'
          }, 100)

        })

      }, 3000)

    }

  }

  showProject = (id) => {

    const hover = document.querySelector('.hover')
    if (hover) {
      hover.removeEventListener('mouseover', this.pauseVideo)
      hover.removeEventListener('mouseout', this.playVideo)
    }

    const video = document.querySelector('video')
    if (video) {
      video.pause()
      video.removeEventListener('ended', this.goToNext)
    }

    document.querySelector('.slider-infos').classList.add('none')
    document.querySelector('.page-active').classList.add('none')
    document.querySelector('.author').classList.add('none')
    document.querySelector('.hover').classList.add('none')
    document.querySelector('.container-out').style.overflow='hidden'

    let animationTimeout = 0

    if (window.innerWidth > 1024) {
      animationTimeout = 1000
      document.querySelector('.home-animation').classList.remove('none')
      document.querySelector('#start').style.display='inline'
      TweenLite.to("#start", 1, {morphSVG:"#wave"})
      TweenLite.to("#start", 1, {morphSVG:"#end"}).delay(0.6)
    }

    setTimeout( () => {

      axios.get(`${config.mainRoute}posts/${id}?_embed`)
      .then((response) => {

        const { language } = this.state

        this.setState({
          singleProject: {
            title:response.data.title.rendered,
            subtitle:response.data.acf[`subtitle_${language}`],
            content:response.data.acf[`content_${language}`],
            context:response.data.acf[`context_${language}`],
            picturesGallery: JSON.stringify(response.data.acf.pictures_gallery),
            links: JSON.stringify(response.data.acf.links),
            year:response.data.acf.year,
            picture:response.data.acf.picture
          }
        })

        if (window.innerWidth > 1024) {
          document.querySelector('.home-animation').classList.add('none')
        }

        document.querySelector('.container-out').style.overflow='inherit'

        setTimeout( () => {
          document.querySelector('.project').classList.add('animation')
        }, 100)
      })
      .catch(error => {
        console.log(error)
      })
    }, animationTimeout)

  }

  hideProject = () => {

    let animationTimeout = 400

    if (window.innerWidth > 1024) {

      document.querySelector('.project').classList.remove('animation')
      document.querySelector('.project .description').classList.add('bg-white')
      document.querySelector('.project .pictures').classList.add('bg-white')

      animationTimeout = 1700

      setTimeout( () => {
        document.querySelector('.project').classList.add('none')
        document.querySelector('#start').setAttribute('d', svg_path_start)
        document.querySelector('#wave').setAttribute('d', svg_path_wave)
        document.querySelector('#end').setAttribute('d', svg_path_end)
        document.querySelector('.home-animation').classList.remove('none')
        document.querySelector('#end').style.display='inline'
        TweenLite.to("#end", 1, {morphSVG:"#wave"})
        TweenLite.to("#end", 1, {morphSVG:"#start"}).delay(0.4)
      }, animationTimeout)

    }else {

      window.scrollTo(0,0)

      setTimeout( () => {
        document.querySelector('.project').classList.remove('animation')
        document.querySelector('.project .description').classList.add('bg-white')
        document.querySelector('.project .pictures').classList.add('bg-white')
      }, 100)

    }

    setTimeout( () => {
      document.querySelector('.hover').classList.remove('none')
      document.querySelector('.project').classList.remove('none')

      this.setState({ singleProject:null })

      const hover = document.querySelector('.hover')
      hover.addEventListener('mouseover', this.pauseVideo)
      hover.addEventListener('mouseout', this.playVideo)

      if (window.innerWidth > 1024) {
        document.querySelector('.home-animation').classList.add('none')
      }

      const video = document.querySelector('video')
      if (video) {
        video.play()
        video.addEventListener('ended', this.goToNext)
      }

    }, animationTimeout+=1400)

    setTimeout( () => {
      document.querySelector('.slider-infos').classList.remove('none')
      document.querySelector('#start').setAttribute('d', svg_path_start)
      document.querySelector('#wave').setAttribute('d', svg_path_wave)
      document.querySelector('#end').setAttribute('d', svg_path_end)
      document.querySelector('#end').style.display='none'
    }, animationTimeout+=100)

  }

  render() {

    const { loading, language, navbar, projectsCount, currentProject, projects, singleProject, projectLoading } = this.state
    let project = null
    let title = null
    let subtitle = null
    let home_video = null
    let home_picture = null
    let onProject = false
    let picturesDOM = ""
    let linksDOM = ""

    if (loading) {

      return <Loader />

    }else {

      if (projects) {
        console.log('coucou');
        project = projects[Object.keys(projects)[currentProject]]
        title = project.title.rendered
        subtitle = project.acf[`subtitle_${language}`]
        console.log(subtitle);
        if (project.acf && project.acf.video) {
          home_video = project.acf.video
        }else {
          home_video = null
        }
        if (project.acf.picture) {
          home_picture = project.acf.picture
        }else {
          home_picture = null
        }
      }

      if (singleProject !== null) {
        onProject = true
        if (singleProject.picturesGallery) {
          const picturesGallery = JSON.parse(singleProject.picturesGallery)
          picturesGallery.forEach((picture) => {
            picturesDOM += `<img src="${picture.picture}" alt="" />`
          })
        }
        if (singleProject.links) {
          const links = JSON.parse(singleProject.links)
          links.forEach((l) => {

            if (language === 'en') {
              linksDOM += `<div><a class="btn-anim" href="${l.link}">${l.title_en}</a><img src=${require('../../img/arrow-right.png')} alt="" /></div>`
            }else {
              linksDOM += `<div><a class="btn-anim" href="${l.link}">${l.title_fr}</a><img src=${require('../../img/arrow-right.png')} alt="" /></div>`
            }

          })
        }
      }

      return (

        <Container
          onHome={true}
          menuVisible={navbar}
          toggleMenu={this.toggleMenu}
          numProjects={projectsCount}
          onProject={onProject}
          goToNext={this.goToNext}
          goToPrev={this.goToPrev}
          currentProject={currentProject+1}
          hideProject={this.hideProject}
          language={language}
          projectTitle={title} >

          <div className="home">

            {(home_video !== null) && (
              <video autoPlay src={home_video} type="video/mp4" />
            )}

            {(home_picture !== null && home_video === null) && (
              <img src={home_picture} alt=""/>
            )}

            <div className="hover" onMouseDown={() => this.showProject(project.id)}>
              <div className="description">
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
              </div>
              <div className="see-project">
                <button className="btn-anim" onMouseDown={() => this.showProject(project.id)}>{Language(language).see_project}</button>
                <img src={require('../../img/arrow-right-home-hover.png')} alt=""/>
              </div>
            </div>

          </div>

          <div className="home-animation none">
            <svg id="waveSVG" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
            <path id="start" d={svg_path_start}/>
            <path id="end" d={svg_path_end} />
            <path id="wave" d={svg_path_wave} />
          </svg>
        </div>

        {(projectLoading === true) && (
          <Loader mini="true" />
        )}

        {(singleProject !== null) && (
          <div className="project">

            <h1>{singleProject.title}</h1>
            <div className="description">
              <div className="text-container">
                <span className="label">{Language(language).the_project} : </span>
                <p className="text">{singleProject.content}</p>

                {(singleProject.links) && (
                  <div className="links">
                    {renderHTML(linksDOM)}
                  </div>
                )}

              </div>
              <div className="categories">
                <span className="label">Mission : </span>
                <p className="text">{singleProject.subtitle}</p>
                <span className="label">{Language(language).context} : </span>
                <p className="text">{singleProject.context}</p>
                <span className="label">{Language(language).year} : </span>
                <p className="text">{singleProject.year}</p>
              </div>
            </div>

            {(singleProject.picturesGallery) && (
              <div className="pictures">
                {renderHTML(picturesDOM)}
              </div>
            )}

            <div className="navigation">
              <div className="previous" onMouseDown={() => this.changeSingleProject('prev')}>
                <img src={require('../../img/arrow-left.png')} alt="" />
                <button className="btn-anim">{Language(language).previous}</button>
              </div>
              <div className="author">
                © {(new Date()).getFullYear()} Aurélie Marcuard
              </div>
              <div className="next" onMouseDown={() => this.changeSingleProject('next')}>
                <button className="btn-anim">{Language(language).next}</button>
                <img src={require('../../img/arrow-right.png')} alt="" />
              </div>
            </div>

          </div>
        )}



      </Container>

    )

  }

}

}

export default HOME;
