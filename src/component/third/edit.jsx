import React, { Component } from 'react'
import { Form, Input, Button,notification } from 'antd';
import { get } from '../../service/index';
export default class Edit extends Component {
    formRef = React.createRef();
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        get(`/token/${this.props.match.params.app_id}`, {method:"GET"}).then((data)=>{
            this.formRef.current.setFieldsValue(data)
        }).catch((e)=>{
            console.log(e);
        })
    }
    onFinish(val){
        
        get(`/token/${this.props.match.params.app_id}`,{method:'PUT'},val).then(()=>{
            notification.success({
                message: '操作成功,即将返回',
                placement: 'topRight',
                duration: 3,
            });
            setTimeout(()=>{
                this.props.history.goBack(-1)
            },2000)
        }).catch((e)=>{})
    }
    render() {
        return (
            <div>
                <Form 
                    layout="inline"
                    name="basic"
                    onFinish={this.onFinish.bind(this)}
                    ref={this.formRef}
                >
                    <Form.Item
                        label='应用名称'
                        name="app_name"
                        rules={[{ required: true, message: 'Please input the short-url!' }]}
                    >
                        <Input style={{ width: 200}} />
                    </Form.Item>
                    <Form.Item
                        label='域名白名单'
                        name="blank_list"
                        rules={[{ required: true, message: '白名单不能为空！' }]}
                    >
                        <Input style={{ width: 600}}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
