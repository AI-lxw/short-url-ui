import React, { Component } from 'react'
import { Form, Input, Button,Divider,Table,Select,notification,InputNumber,Popconfirm } from 'antd';
import { get } from '../../service/index';
import {DeleteOutlined} from '@ant-design/icons';
const { Option } = Select;
export default class Edit extends Component {
    formRef = React.createRef();
    constructor(props){
        super(props)
        this.state = {
            dataSource:{},
            list:[],
        }
        this.loadList()
    }
    componentDidMount(){
        this.loadData()

    }
    loadList(){
        get(`/short/${this.props.match.params.id}/tag`, {method:"GET"}).then((data)=>{
            data.forEach(item=>{
                item.key = item.id
            })
            this.setState({list:data})
        }).catch((e)=>{
            console.log(e);
        })
    }
    loadData(){
        let id = this.props.match.params.id
        get(`/short/${id}`, {method:"GET"}).then((data)=>{
            this.formRef.current.setFieldsValue(data)
        }).catch((e)=>{
            console.log(e);
        })
    }
    del(id){
        get(`/short/${this.props.match.params.id}/tag/${id}`,{ method: "DELETE" }).then(()=>{
            notification.success({
                message: '操作成功',
                placement: 'topRight',
                duration: 3,
            });
            this.loadList()
        })
    }
    columns = [
        {
            title: '描述',
            key:"desc",
            dataIndex: 'desc',
            align:'center'
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
        },
        {
          title: '比例',
          dataIndex: 'proportion',
          key: 'proportion',
          align:'center'
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render:(_,record)=>{
                return(
                    <Popconfirm placement="topLeft" title="确认删除?" onConfirm={()=>{this.del(record.id)}} okText="Yes" cancelText="No">
                        <Button danger icon={<DeleteOutlined />} type="link"  >删除</Button>
                    </Popconfirm>
                )
            },
            align:'center'
        },

    ];
    onFinish(val){
        let id = this.props.match.params.id
        switch(val.params){
            case '禁用':
                val.params = ''
                break;
            case 'UserAgent':
                val.params = 'ua'
                break;
            default:
                val.params = 'ip'
                break;
            
        }
        let v = {
            id:id,
            url:val.url,
            params:val.params,
            status: true
        }
        get(`/short/${id}`,{method:'PUT'},v).then(()=>{
            notification.success({
                message: '操作成功',
                placement: 'topRight',
                duration: 3,
            });
        }).catch((e)=>{

        })
    }

    descFinish(val){
        get(`/short/${this.props.match.params.id}/tag`,{method:'POST'},val).then(()=>{
            notification.success({
                message: '操作成功',
                placement: 'topRight',
                duration: 3,
            });
            this.loadList()
        }).catch((e)=>{

        })

    }
    deploy(){
        get(`/short/${this.props.match.params.id}/deploy`, {method:"GET"}).then(()=>{
            notification.success({
                message: '操作成功',
                placement: 'topRight',
                duration: 3,
            });
        }).catch((e)=>{
            console.log(e);
        }) 
    }
    render() {
        return (
            <div>
                <Form 
                    layout="inline"
                    name="basic"
                    onFinish={this.onFinish.bind(this)}
                    ref={this.formRef}
                    initialValues={this.state.dataSource}
                >
                    <Form.Item
                        name="short"
                        rules={[{ required: true, message: 'Please input the short-url!' }]}
                    >
                        <Input style={{ width: 200}} readOnly="readonly" />
                    </Form.Item>
                    <Form.Item
                        name="url"
                        rules={[{ required: true, message: 'Please input the url!' }]}
                    >
                        <Input style={{ width: 600}} />
                    </Form.Item>
                    <Form.Item  label='分流' rules={[{ required: true }]} name='params'>
                    <Select
                        placeholder="Select"
                        style={{ width: 120, margin: '0 8px' }}
                    >
                        <Option value="禁用" >禁用</Option>
                        <Option value="ip">IP</Option>
                        <Option value="UserAgent">UserAgent</Option>
                    </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={()=>{this.deploy()}}>
                            应用
                        </Button>
                    </Form.Item>
                </Form>
                <Divider></Divider>
                <Form 
                    layout="inline"
                    name="basic"
                    onFinish={this.descFinish.bind(this)}
                >
                    <Form.Item
                        name="desc"
                        rules={[{ required: true, message: 'Please make some descriptions!' }]}
                    >
                        <Input style={{ width: 200}} placeholder='描述'/>
                    </Form.Item>
                    <Form.Item
                        name="url"
                        rules={[{ required: true, message: 'Please input the url!' }]}
                    >
                        <Input style={{ width: 300}} placeholder='url' />
                    </Form.Item>
                    <Form.Item
                        name="proportion"
                    >
                       <InputNumber
                            min={0}
                            max={100}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
                <Divider></Divider>
                <Table dataSource={this.state.list} columns={this.columns} />
            </div>
        )
    }
}
