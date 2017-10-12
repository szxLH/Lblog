import React from 'react'
import { Link } from 'react-router'
import { bind } from 'decko'
import { menu } from '$config'
import { getIdentity } from '$utility'
import Login from './login/'
import {
  Affix,
  Menu,
  Icon
} from 'antd'
// import SearchInput from './searchInput'

class Header extends React.Component {
  constructor (props) {
    super(props)
    const renderViews = menu.filter(category => !category.admin)
    this.state = {
      renderViews,
      bAdmin: false
    }
  }

  @bind
  loginCallback (status) {
    const renderViews = menu.filter(category => category.admin === status || !category.admin)
    this.setState({bAdmin: status, renderViews})
  }
  
  render () {
    const { renderViews } = this.state
    return (
      <Affix className='global-nav'>
        <div className='wrap'>
          <div className='nav-right'>
            <Login loginCallback={this.loginCallback}/>
          </div>
          <Menu mode='horizontal' className='nav-left'>
            {
              renderViews.map(view => {
                return (
                  <Menu.Item key={view.key} >
                    <Link to={view.key} key={view.key} style={{color: '#fff'}}><Icon type={view.icon}/>{view.name}</Link>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </div>
      </Affix>
    )
  }
}

export default Header
