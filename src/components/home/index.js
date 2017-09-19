import React from 'react'
import * as articleService from '$service/article'
import List from '../includes/list'
import NoData from '$components/includes/nodata'

import {
  Spin,
  notification
} from 'antd'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: [],
      spinning: true
    }
  }

  async componentDidMount () {
    try {
      const res = await articleService.get() || {}
      res.return_code === 0 && this.setState({
        lists: res.data || [],
        spinning: false
      })
    } catch (e) {
      notification.error({
        message: e.message,
        duration: 6
      })
    }
  }

  render () {
    const { lists, spinning } = this.state
    return (
      <div className='list'>
        <Spin spinning={spinning}>
          <NoData visable={!lists.length}/>
          <List lists={lists}/>
        </Spin>
      </div>
    )
  }
}

export default Home
