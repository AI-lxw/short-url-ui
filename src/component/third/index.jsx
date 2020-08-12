import React, { Component } from 'react'
import { Form, Input, Button,Divider,Table, notification } from 'antd';
import {get} from '../../service/index'
import {FormOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router'
class Index extends Component {
    constructor(props){
        super(props)
        this.state={
            dataSource:[],
            page:{
                
            },
            loading:true
        }
        this.loadData()
    }
    columns = [
        {
          title: '应用名称',
          dataIndex: 'app_name',
          key: 'app_name',
          align:'center'
        },
        {
          title: 'Token',
          dataIndex: 'token',
          key: 'token',
        },
        {
          title: '域名白名单',
          dataIndex: 'blank_list',
          key: 'blank_list',
          align:'center'
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render:(_, record)=>{
                let Href = [this.props.location.pathname, record.id].join("/");
                return (
                    <div>
                        <Button icon={<FormOutlined />} type="link" onClick={()=>{this.goto(Href,record)}}>编辑</Button>
                    </div>
                )
            },
            align:'center'
        },
    ];
    goto(href,record){
        this.props.history.push(href)  
    }
    loadData(){
        get(`/token`, {method:"GET"}).then((data)=>{
            let tokenList = data.data
            tokenList.forEach(item=>{
                item.key = item.id
            })

            this.setState({dataSource:tokenList,page:data.page,loading:false})
        }).catch((e)=>{
            console.log(e);
        })
    }
    onFinish(val){
        get(`/token`,{method:'POST'},val).then(()=>{
            notification.success({
                message: '操作成功',
                placement: 'topRight',
                duration: 3,
            });
            this.loadData()
        }).catch((e)=>{

        })
    }
    render() {
        return (
            <div>
                <Form 
                    layout="inline"
                    name="basic"
                    onFinish={this.onFinish.bind(this)}
                >
                    <Form.Item
                        name="app_name"
                        rules={[{ required: true, message: 'Please input your AppName!' }]}
                    >
                        <Input style={{ width: 200}} placeholder='应用名称' />
                    </Form.Item>
                    <Form.Item
                        name="blank_list"
                        rules={[{ required: true, message: 'Please input your URL!' }]}
                    >
                        <Input style={{ width: 600}} placeholder='长链域名白名单 多个用逗号 , 分开，非白名单域名禁止生成短链,如: m.mgtv.com'/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            生成
                        </Button>
                    </Form.Item>
                </Form>
                <Divider orientation='left'>应用列表</Divider>
                <Table 
                    loading={this.state.loading}
                    dataSource={this.state.dataSource} 
                    columns={this.columns} 
                />
            </div>
        )
    }
}
export default withRouter(Index)