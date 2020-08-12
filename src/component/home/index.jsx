import React, { Component } from 'react'
import { Layout, Menu} from 'antd';
import {
  FileTextOutlined,
  SearchOutlined,
  EditOutlined,
  KeyOutlined

} from '@ant-design/icons';
import Short from '../short/'
import {Route, Switch, Link, withRouter} from 'react-router-dom';
import ShortQuery from '../short-query'
import AppQuery from '../app-query'
import Third from '../third'
import Edit from '../short/edit'
import ThirdEdit from '../third/edit'
import './index.scss'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class Index extends Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider>
                    <div className="logo"><img src={require('../../assets/images/logo.png')} alt=''/></div>
                    <Menu 
                        theme="dark" 
                        defaultSelectedKeys={['1']} 
                        mode="inline" 
                    >
                        <Menu.Item key="short" icon={<FileTextOutlined />}>
                            <Link to='/short'>短链生成</Link>
                        </Menu.Item>
                        <Menu.Item key="short-query" icon={<EditOutlined />}>
                            <Link to='/short-query'>短链查询与修改</Link>
                        </Menu.Item>
                        
                        <Menu.Item key="app-query" icon={<SearchOutlined />}>
                            <Link to='/app-query'>应用生成短链查询</Link>
                        </Menu.Item>
                        <Menu.Item key="third" icon={<KeyOutlined />}>
                            <Link to='/third'>第三方API Token申请</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Menu mode="horizontal" theme="dark" style={{float:"right"}}>
                        <SubMenu title="注销">
                        </SubMenu>
                    </Menu>
                    </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Switch>
                                <Route exact path='/short' component={Short} />
                                <Route exact path='/short/:id' component={Edit} />
                                <Route exact path='/short-query' component={ShortQuery} />
                                <Route exact path='/app-query' component={AppQuery} />
                                <Route exact path='/third' component={Third} />
                                <Route exact path='/third/:app_id' component={ThirdEdit} />
                                
                            </Switch>
                            </div>
                        </Content>
                    <Footer style={{ textAlign: 'center' }}> MGTV</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default withRouter(Index)
