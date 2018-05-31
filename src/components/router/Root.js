import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import HOME from '../pages/HOME'
import CONTACT from '../pages/CONTACT'
import ABOUT from '../pages/ABOUT'
import NOT_FOUND from '../pages/NOT_FOUND'

const Root = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HOME} />
        <Route exact path="/about" component={ABOUT} />
        <Route exact path="/contact" component={CONTACT} />
        <Route component={NOT_FOUND} />
      </Switch>
    </HashRouter>
  )
}

export default Root;
