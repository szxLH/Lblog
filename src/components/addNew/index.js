import React from 'react'
import {
  Button,
  Spin
} from 'antd'
import * as articleService from '$service/article'
import Detail from '$components/includes/detail'
import { bind } from 'decko'
import showdown from 'showdown'
import ContentEdit from './contentEdit'
import co from 'co'

class AddNew extends React.Component {
  constructor (props) {
    super(props)
    this.converter = new showdown.Converter()
    this.state = {
      editFields: {},
      saveLoading: false,
      spinning: false,
      noData: false,
      mode: 1 // mode = 1  新增文章， mode = 2 添加文章时的预览
    }
  }

  // async componentWillMount () {
  //   const { params } = this.props
  //   if (params && params.id) {
  //     this.setState({ spinning: true })
  //     try {
  //       const res = await articleService.get({ id: params.id }) || {}
  //       const reco = (res.data && res.data[0]) || {}
  //       const editFields = {
  //         title: reco.title,
  //         introduction: reco.introduction,
  //         type: reco.type,
  //         content: this.converter.makeHtml(reco.content)
  //       }
  //       this.setState({
  //         spinning: false,
  //         editFields,
  //         noData: !Object.keys(reco).length,
  //         article: reco
  //       })
  //     } catch (e) {
  //       notification.error({
  //         message: e.message,
  //         duration: 6
  //       })
  //       this.setState({ spinning: false })
  //     }
  //   } else {
  //     // 新增文章
  //     this.setState({ mode: 2 })
  //   }
  // }

  @bind
  toggleEdit () {
    const { mode } = this.state
    if ([1].includes(mode)) {  // 由编辑=>预览
      const { getFieldsValue } = this.refs.contentEdit
      const values = getFieldsValue()
      const editFields = {
        title: values.title,
        introduction: values.introduction,
        type: values.type,
        content: this.converter.makeHtml(values.content)
      }
      this.setState({
        mode: 2,
        editFields
      })
    } else {
      console.log('cdsfasfd====')
      this.setState({
        mode: 1,
        editFields: {}
      })
    }
  }

  @bind
  handleSave () {
    const ctx = this
    const { validateFields } = this.refs.contentEdit
    validateFields(function (errors, values) {
      if (errors) return
      ctx.setState({ saveLoading: true })
      const body = {
        title: values.title,
        introduction: values.introduction || '',
        type: values.type,
        content: ctx.converter.makeHtml(values.content)
      }
      co(function * () {
        yield articleService.update(null, body)
        ctx.setState({ saveLoading: false })
        ctx.toggleEdit()
      })
    })
  }

  render () {
    const { mode, editFields, saveLoading, spinning, noData } = this.state
    return (
      <Spin spinning={spinning}>
        <div className={noData ? 'hide' : ''}>
          <ContentEdit
            ref='contentEdit'
            visable={[1].includes(mode)}
            editFields={editFields}
          />
          <div className={[1].includes(mode) ? 'hide' : ''}>
            <Detail article={editFields}/>
          </div>
          <Button
            style={{marginTop: '20px'}}
            onClick={this.toggleEdit}
            type='primary'
          >{[1].includes(mode) ? 'Preview' : 'Edit'}</Button>
          <Button
            style={{margin: '20px 0 0 20px'}}
            className={[1].includes(mode) ? '' : 'hide'}
            loading={saveLoading}
            type='primary'
            onClick={this.handleSave}
          >Save</Button>
        </div>
      </Spin>
    )
  }
}

export default AddNew
