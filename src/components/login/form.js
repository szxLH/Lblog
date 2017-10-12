import React from 'react'
import { bind } from 'decko'
import {
  Form,
  Input,
  Button,
  message
} from 'antd'
import { getMD5 } from '$utility'
import { login } from '$service/user'
import co from 'co'

class LoginForm extends React.Component {
  @bind
  handleSubmit (e) {
    const ctx = this
    e.preventDefault()
    const { resetFields } = this.props.form
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      values.password = getMD5(values.password)
      co(function * () {
        const res = yield login(values)
        ctx.props.handleSucc(res.data)
        resetFields()
      }).catch(err => {
        message.error('登录出错', 5)
      })
    })
  }

  render () {
    const { getFieldProps } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          label='用戶名'
        >
          <Input placeholder="请输入账户名"
            {...getFieldProps('name', {
              rules: [
                {required: true},
                {/* { required: true, min: 5, message: '用户名至少为 5 个字符' } */}
              ]
            })}
          />
        </Form.Item>
        <Form.Item
          label='密码'
        >
          <Input type="password" placeholder="请输入密码"
            {...getFieldProps('password', {
              rules: [
                {required: true},
                {/* { required: true, min: 5, whitespace: true, message: '密码至少为5个字符' } */}
              ]
            })}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form>
    )
  }
}

LoginForm.propTypes = {
  form: React.PropTypes.any,
  handleSucc: React.PropTypes.func
}

export default Form.create()(LoginForm)
