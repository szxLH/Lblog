import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './App'
import Article from '$components/home/article'
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
            const View = require(`./components/${view.key}/index.js`)
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
        <Route path='/article(/:id)' component={Article} />
      </Route>
    </Router>
  )
}

render(renderRouter(), document.getElementById('app'))
