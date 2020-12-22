import React from 'react';
import { Button } from 'antd';
import MyTable from '../../components/table/table.component';
import { Link } from 'react-router-dom';

class ProductPage extends React.Component {

    render() {
        return (
            <div>
                <Link to='/create-product'>
                    <Button type='primary' style={{marginBottom: 30}}>
                        Create product
                    </Button>
                </Link>
                <MyTable/>
            </div>
        )
    }
}

export default ProductPage;