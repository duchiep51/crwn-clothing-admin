import React from 'react';
import { Spin } from 'antd';

import EditForm from '../../components/form/edit-form.coponent';

class EditPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        const data = this.props.location.state;
        this.setState({data: data});
    }

    render() {
        return (
            <>
            {
                this.state.data.name ? <EditForm data={this.state.data} /> : <Spin/>
            }
            </>
        )
    }
}

export default EditPage;