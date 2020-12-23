import React from 'react';
import { Table, Space, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { HEROKU_SERVER } from '../../constants/urls';


class MyTable extends React.Component {

    constructor() {
        super();

        this.state = {
            data: [],
            isModalVisible: false
        }

        const confirm = ({ _id, name }) => {
          Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want to delete this product?',
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: () => {
              axios({
                url: `${HEROKU_SERVER}/products/${_id}`,
                method: 'delete',
              }).then(res => {
                alert(`Delete ${name} successfully !!!`);

                this.setState({ data: this.state.data.filter(item => item._id !== _id )})
              }).catch(error => {
                alert(`Fail to delete ${name}`);
              })
        
            }
          });
        }

        this.columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: text => <p>{text}</p>,
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
                <Space size='middle'>
                  <Link to={{
                    pathname: "/edit",
                    state: {
                      ...record
                    }
                  }}>
                    <Button type="primary">
                      Edit
                    </Button>
                  </Link>
                  <Button danger value={record} onClick={() => confirm(record)}>
                    Delete
                  </Button>
                </Space>
                
              ),
            },
        ];
    }

   

    async componentDidMount() {
        try {
            const response = await axios.get(`${HEROKU_SERVER}/products`);

            this.setState({ data: response.data.map(item => ({
              key: item._id,
              ...item
            })).filter((item) => item.isAvailable )});
            
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