import React from 'react'
import * as articleService from '$service/article'
import Detail from '$components/includes/detail'
import NoData from '$components/includes/nodata'
import showdown from 'showdown'
import {
  Button,
  Spin,
  notification
} from 'antd'

class Article extends React.Component {
  constructor (props) {
    super(props)
    this.converter = new showdown.Converter()
    this.state = {
      noData: false,
      article: {},
      spinning: false
    }
  }
  async componentWillMount () {
    const { params } = this.props
    this.setState({ spinning: true })
    try {
      const res = await articleService.get({ id: params.id }) || {}
      const reco = (res.data && res.data[0]) || {}
      const editFields = {
        title: reco.title,
        introduction: reco.introduction,
        type: reco.type,
        content: this.converter.makeHtml(reco.content)
      }
      this.setState({
        spinning: false,
        noData: !Object.keys(reco).length,
        article: editFields
      })
    } catch (e) {
      notification.error({
        message: e.message,
        duration: 6
      })
      this.setState({ spinning: false })
    }
  }

  render () {
    const { spinning, noData, article } = this.state
    return (
      <Spin spinning={spinning}>
        <Detail
          article={article}
        />
        <NoData visable={noData}/>
      </Spin>
    )
  }
}

export default Article
