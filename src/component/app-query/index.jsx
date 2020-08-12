import React, { Component } from 'react'
import { Form, Input, Button,Divider,Table,Typography } from 'antd';
const { Paragraph } = Typography;
export default class Index extends Component {
    dataSource = [
        {
            key:'1',
            edit:'编辑',
            short: "https://d.imgo.tv/U", 
            url: "http://www.mgtv.com/imexpireURL", 
            user_id:'test',
            app_name:'name'
        }
    ]
    columns = [
        {
          title: '操作',
          dataIndex: 'edit',
          key: 'edit',
        },

        {
            title: '短链',
            dataIndex: 'short',
            key: 'short',
            render:(val)=>{
                return(
                <Paragraph copyable>{val}</Paragraph>

                )
            }
        },
        {
          title: 'URL',
          dataIndex: 'url',
          key: 'url',
        },
        {
            title: '用户',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: '应用',
            dataIndex: 'app_name',
            key: 'app_name',
        },
    ];
    render() {
        return (
            <div>
                <Form 
                    layout="inline"
                    name="basic"
                >
                    <Form.Item
                        name="AppToken"
                        rules={[{ required: true, message: 'Please input your app token!' }]}
                    >
                        <Input style={{ width: 600}} placeholder='App Token'/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Form.Item>
                </Form>
                <Divider orientation='left'>查询结果</Divider>
                <Table dataSource={this.dataSource} columns={this.columns} />
            </div>
        )
    }
}
