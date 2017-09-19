import React from 'react'
import {
  Form,
  Input,
  Select
} from 'antd'
import { type } from '$config'
import { bind } from 'decko'
const FormItem = Form.Item
const Option = Select.Option

class ContentEdit extends React.Component {
  @bind
  requiredProps (propName, initialValue, isRequired, type) {
    const { getFieldProps } = this.props.form
    return getFieldProps(propName, {
      initialValue,
      rules: [
        { required: isRequired, whitespace: false, type }
      ]
    })
  }

  render () {
    const { visable, editFields } = this.props
    const fields = editFields || {}
    return (
      <Form
        horizontal
        className={visable ? '' : 'hide'}
      >
        <FormItem label='title'>
          <Input {...this.requiredProps('title', fields.title, true)}/>
        </FormItem>
        <FormItem label='introduction'>
          <Input {...this.requiredProps('introduction', fields.introduction, false)}/>
        </FormItem>
        <FormItem label='type'>
          <Select {...this.requiredProps('type', fields.type || type[type.length - 1].id, true)}>
            {
              type.map((row, i) => {
                return <Option key={i} value={row.id}>{row.name}</Option>
              })
            }
          </Select>
        </FormItem>
        <FormItem label='content'>
          <Input
            type='textarea'
            autosize={{ minRows: 30, maxRows: 30 }}
            {...this.requiredProps('content', fields.content, true)}
          />
        </FormItem>
      </Form>
    )
  }
}

ContentEdit.propTypes = {
  form: React.PropTypes.any,
  visable: React.PropTypes.bool,
  editFields: React.PropTypes.obj
}

const content = Form.create()(ContentEdit)

export default content
