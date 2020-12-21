import { Form, Input, InputNumber, Button } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const MyForm = (props) => {

  const { name, quantity, price, description, imageUrl } = props;

  const onFinish = (values) => {
    console.log('Props: ', props)
    props.onFinish(values)
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} >
      <Form.Item
        id="itemForm"
        name='itemForm'
        initialValue={name}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input value={name}/>
      </Form.Item>
      <Form.Item
        name='quantity'
        label="Quantity"
        initialValue={quantity}
        rules={[
          {
            type: 'number',
            min: 0,
            max: 1000
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
            max: 1000,
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
      {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */ }
    </Form>
  );
};

export default MyForm;