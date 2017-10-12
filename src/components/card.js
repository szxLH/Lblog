import React from 'react'
// import { format } from '$utility'
import { Link } from 'react-router'
import { type } from '$config'
import {
  Row,
  Col
  // Icon
} from 'antd'

class Card extends React.Component {
  render () {
    const { data } = this.props
    const category = type.find(row => row.id === data.type) || {}
    return (
      <div className='card'>
        <div className='card-content'>
          <Row className='card-head'>
            <Col span={8}>分类：<span className='card-source'>{category.name}</span></Col>
            {/* <Col span={16} className='card-time'>{format(data._create_at)}</Col> */}
          </Row>
          <Link to={`/article/${data._id}`}>
            <Row className='card-title'>{data.title}</Row>
            <Row className='card-body'>{data.introduction}</Row>
          </Link>
        </div>
        {/* <Row className='card-footer'>
          <Col span={8}>
            <Icon type="like" />
            <span>{data.stars}</span>
          </Col>
          <Col span={8}>
            <Icon type="message" />
            <span>{data.comments}</span>
          </Col>
          <Col span={8}>
            <Icon type="eye-o" />
            <span>{data.visits}</span>
          </Col>
        </Row> */}
      </div>
    )
  }
}

Card.propTypes = {
  data: React.PropTypes.object
}

export default Card
