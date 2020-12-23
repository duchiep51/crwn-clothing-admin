import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Form, Input, InputNumber, Button, Upload, message, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { cloudstorage } from '../../firebase/firebase.utils';



const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

class ProductCreateForm extends React.Component {

  constructor() {
      super();

      this.state = {
          image: '',
          imageUrl: ''
      }
  }

  uploadImage = (file) => {
    if (!file) return;

    const uploadTask = cloudstorage.ref(`photos/${file.name}`).put(file);

    let downloadURL = null;

    uploadTask.on(
      "state_changed",
      null,
      error => {
        console.log(error);
      },
      () => {
        cloudstorage
        .ref('photos')
        .child(file.name)
        .getDownloadURL()
        .then(url => {
          downloadURL = this.setState({ imageUrl: url});
        })
      }
    );
  }

  onFinish = (values) => {
    values.imageUrl = this.state.imageUrl;

    axios({
      url: `${HEROKU_SERVER}/products/create`,
      method: 'post',
      data: {
        name: values.name,
        price: values.price,
        quantity: values.quantity,
        description: values.description,
        categoryId: '5fd6f8dee3cfb44e6c78c319',
        imageUrl: values.imageUrl
      }
    }).then(res => {
      alert(`Add new item successfully !!!`);
      
      this.props.history.push('/');
    }).catch(error => {
        // console.log('error: ', JSON.parse(error));
        alert('There was an error. \n Error code: ', error.message);
    });
  };

  handleChange = (event) => {
      if (event.fileList && event.fileList[0]) {
          let reader = new FileReader();
          reader.readAsDataURL(event.fileList[0].originFileObj);
          reader.onload = (e) => {
              this.setState({
                  image: reader.result
              })
          };
          this.uploadImage(event.fileList[0].originFileObj);
      };
  }

  render() {
    return (
        <Form {...layout} name="nest-messages" onFinish={this.onFinish} >
          <Form.Item
            name='name'
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='quantity'
            label="Quantity"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 99999,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name='price'
            label="Price"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 99999,
              },
            ]}
          >
                <InputNumber />
            </Form.Item>
          
            <Form.Item name='description' label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Image"> 
              <Upload 
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  onChange={this.handleChange}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              <Image width='200' src={this.state.image} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
      );
  }
  
};

export default withRouter(ProductCreateForm);

