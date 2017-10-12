import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router'
import App from './App'
import Article from './views/home/article'
import PageNotFound from './views/404'
import { menu } from './config'
import { getIdentity } from '$utility'
import './public/style/antd'
import './public/style/style'

const renderViews = menu.filter(category => category.admin === getIdentity() || !category.admin)

function renderRouter () {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        {
          renderViews.map((view, i) => {
            const View = require(`./views/${view.key}/index.js`)
            if (i === 0) {
              return ([
                <IndexRoute key={view.key} component={View.default} />,
                <Route key={view.key} path={view.key} component={View.default} />
              ])
            } else {
              return (
                <Route key={view.key} path={view.key} component={View.default} />
              )
            }
          })
        }
        <Route path='/article/:id' component={Article} />
      </Route>
      <Route path='/404' component={PageNotFound} />
      <Redirect from='*' to='/404' />
    </Router>
  )
}

render(renderRouter(), document.getElementById('app'))
