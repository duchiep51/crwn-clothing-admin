import React from 'react';
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';


import EditPage from '../../pages/edit/edit.component';
import CategoryTable from '../table/category-table.component';
import ProductPage from '../../pages/product/product-page.component';
import ProductCreateForm from '../../components/form/product-create.component';

const { Header, Content, Footer, Sider } = Layout;

class MyLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Router>
      
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" >
              <Link to='/'>
                Product
              </Link>
            </Menu.Item>
            <Menu.Item key="2" >
              <Link to='/categories'>
                Category
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{
                                                       padding: 0,
                                                        }} >
            <div style={{ position: 'relative'}}>
              <Avatar style={{ position: 'absolute',
                                top: 10,
                                right: 20}} size="large" icon={<UserOutlined />} />
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/* <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item> */ }
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div>
                <Switch>
                  <Route exact path='/' component={ProductPage} />
                  <Route exact path='/edit' component={EditPage} />
                  <Route exact path='/create-product' component={ProductCreateForm} />
                  <Route exact path='/categories' component={CategoryTable} />
                </Switch>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
      </Router>

    );
  }
}

export default MyLayout;