import React from 'react'
import { Link } from 'react-router'
import { menu } from '$config'
import { getIdentity } from '$utility'
import {
  Affix,
  Menu,
  Icon
} from 'antd'
// import SearchInput from './searchInput'

class Header extends React.Component {
  constructor (props) {
    super(props)
    const renderViews = menu.filter(category => category.admin === getIdentity() || !category.admin)
    this.state = {
      renderViews
    }
  }

  render () {
    const { renderViews } = this.state
    return (
      <Affix className='global-nav'>
        <div className='wrap'>
          {/* <div className='nav-right'>
            <SearchInput
              style={{width: 250}}
              size='large'
              placeholder='input what you want'
              onSearch={this.onSearch}
            />
          </div> */}
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
