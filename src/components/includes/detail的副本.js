import React from 'react'
import { type } from '$config'
import cn from 'classnames'

class ContentShow extends React.Component {
  render () {
    const { visable, editFields } = this.props
    const fields = editFields || {}
    let id = fields.type
    const category = type.find(row => row.id === id)
    const style = cn({
      hide: !visable,
      article: true
    })
    return (
      <div className={style}>
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
  visable: React.PropTypes.bool,
  editFields: React.PropTypes.obj
}

export default ContentShow
