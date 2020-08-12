import React, { Component } from 'react'
import { Form, Input, Button,Divider,Table,Typography,notification } from 'antd';
import {FormOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router'
import { get } from '../../service/index';
import {formatData} from '../../assets/js/formatData'
const { Paragraph } = Typography;
class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataSource: [],
            page:{
                index: 1, 
                pageSize: 10, 
                total: 56, 
                pageTotal: 6
            },
            loading: true
        }
        this.loadData()
    }

    loadData(){
        get(`/short/?pageIndex=1&pageSize=10`, {method:"GET"}).then((data)=>{
            let renderData = formatData(data.data)
            this.setState({dataSource:renderData,page:data.page,loading:false})
        }).catch((e)=>{
            this.setState({loading: false})
        })
    }
    goto(href){
        this.props.history.push(href)  
    }
    columns = [
        {
            title: '操作',
            key:"edit",
            dataIndex: 'edit',
            width:150,
            align:'center',
            render:(_, record)=>{
                let Href = [this.props.location.pathname, record.id].join("/");
                
                return (
                    <div>
                        <Button icon={<FormOutlined />} type="link" onClick={()=>{this.goto(Href,record)}}>编辑</Button>
                    </div>
                )
            }
        },
        {
            title: '短链',
            dataIndex: 'short',
            key: 'short',
            width:300,
            align:'center',
            render:(val,record,index)=>{
                return(
                <Paragraph copyable>{val}</Paragraph>

                )
            }
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            ellipsis: true,
        },
        {
            title: '用户',
            dataIndex: 'user_id',
            key: 'user_id',
            width:150,
            align:'center'
        },
        {
            title: '应用',
            dataIndex: 'app_name',
            key: 'app_name',
            width:150,
            align:'center'
        },
    ];
    OnChange(e){
        console.log(e);
        get(`/short/?pageIndex=${e.current}&pageSize=${e.pageSize}`, {method:"GET"}).then((data)=>{
            let renderData = formatData(data.data)
            this.setState({dataSource:renderData,page:data.page,loading:false})
        }).catch((e)=>{
            console.log(e);
        })

    }
    add(content){
        get(`/short`, {method:"POST"}, content).then(()=>{
            notification.success({
                message: '操作成功',
                placement: 'topRight',
                duration: 3,
            });
            this.loadData()
        })
    }
    onFinish(val){
        this.add(val)
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
                        label="URL"
                        name="URL"
                        rules={[{ required: true, message: 'Please input the url!' }]}
                    >
                        <Input style={{ width: 600}} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            生成
                        </Button>
                    </Form.Item>
                </Form>
                <Divider orientation='left'>生成短链列表</Divider>
                <Table 
                    loading={this.state.loading}
                    dataSource={this.state.dataSource} 
                    columns={this.columns} 
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        total: this.state.page.total,
                        pageSizeOptions:[10, 20, 50]
                    }}
                    onChange={this.OnChange.bind(this)}
                />
            </div>
        )
    }
}
export default withRouter(Index)