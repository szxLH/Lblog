import React from 'react'
import { type } from '$config'

class ContentShow extends React.Component {
  render () {
    const { article } = this.props
    const fields = article || {}
    let id = fields.type
    const category = type.find(row => row.id === id)
    return (
      <div className='article'>
        <p>
          <span style={{marginRight: '20px'}}>标题：{fields.title}</span>
          <span>分类：{category && category.name}</span>
        </p>
        <div
          className='content'
          dangerouslySetInnerHTML={{__html: fields.content}}
        ></div>
      </div>
    )
  }
}

ContentShow.propTypes = {
  article: React.PropTypes.obj
}

export default ContentShow
