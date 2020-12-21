import React from 'react';
import { Table, Space, Modal, Button } from 'antd';

// import MyModal from '../modal/modal.component';
import MyForm from '../form/form.component';

import axios from 'axios';

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     add: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

class MyTable extends React.Component {

    columns = [];

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isModalVisible: false
        }

        const showModal = () => {
            this.setState({isModalVisible: true});
        };
        
        const handleOk = (values) => {
          console.log("Log: ",values)
          this.setState({isModalVisible: false});
        };
        
        const handleCancel = () => {
            this.setState({isModalVisible: false});
        };

        this.columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: text => <a>{text}</a>,
            },
            {
              title: 'Price',
              dataIndex: 'price',
              key: 'price',
            },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
              key: 'quantity',
            },
            {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={showModal}>
                        Edit
                    </Button>
                    <Modal 
                    title="Basic Modal" 
                    visible={this.state.isModalVisible} 
                    footer={[
                        <Button onClick={handleCancel}>Cancel</Button>,
                        <Button 
                          type="primary"
                          onClick={handleOk}
                          form="MyForm"
                          key="submit"
                          htmlType="submit"
                        >Submit</Button>,
                    ]}>
                        <MyForm
                          onFinish={handleOk}
                         { ...record }
                         />
                    </Modal>
                    <a>Delete</a>
                </Space>
              ),
            },
        ];
    }

    async componentDidMount() {
        try {
            const response = await axios.get('products');

            this.setState({ data: response.data });
            
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <Table columns={this.columns} dataSource={this.state.data} />
        )
    }
}

export default MyTable;