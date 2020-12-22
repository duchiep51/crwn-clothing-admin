import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Form, Input, InputNumber, Button, Image } from 'antd';

const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
};
  
const EditForm = ({ data: { _id, name, price, quantity, description, imageUrl}, history }) => {

    const onFinish = (values) => {
      console.log('values: ', values);
  
      axios({
          url: `products/${_id}`,
          method: 'patch',
          data: {
              name: values.name,
              price: values.price,
              quantity: values.quantity,
              description: values.description
          }
      }).then(res => {
        alert('succeed!');
        
        history.push('/');
      }).catch(error => {
          // console.log('error: ', JSON.parse(error));
          alert('There was an error. \n Error code: ', error.message);
      });
    };
  
    return (
      <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item
              name='name'
              label="Name"
              initialValue={name}
              rules={[
              {
                  required: true,
              },
              ]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              name='price'
              label="Price"
              initialValue={price}
              rules={[
              {
                  type: 'number',
                  min: 0,
                  max: 99,
              },
              ]}
          >
              <InputNumber />
          </Form.Item>
          <Form.Item
              name="quantity"
              label="Quantity"
              initialValue={quantity}
              rules={[
              {
                  type: 'number',
                  min: 0,
                  max: 99,
              },
              ]}
          >
              <InputNumber />
          </Form.Item>
          <Form.Item
              name='description'
              label="Description"
              initialValue={description}
              >
              <Input.TextArea />
          </Form.Item>
          <Form.Item
              name='imageUrl'
              label="Image"
              initialValue={description}
              >
              <Image width='200' src={imageUrl}/>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
              Submit
              </Button>
          </Form.Item>
      </Form>
    );
  };


export default withRouter(EditForm);