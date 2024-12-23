import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import axios from 'axios';

const PositionForm = ({ onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            await axios.post('http://localhost:5000/teacher-positions', values);
            onSuccess?.();
            form.resetFields();
        } catch (error) {
            console.error('Lỗi khi tạo vị trí:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <div style={{ flex: 1, maxWidth: '600px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Thông tin vị trí</h3>
                
                <Form.Item
                    name="code"
                    label="Mã"
                    required
                >
                    <Input placeholder="Nhập mã vị trí" />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Tên"
                    required
                >
                    <Input placeholder="Nhập tên vị trí" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                    required
                >
                    <Input.TextArea 
                        rows={4} 
                        placeholder="Nhập mô tả chi tiết về vị trí" 
                    />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Trạng thái"
                    required
                >
                    <Radio.Group>
                        <Radio value="active">Hoạt động</Radio>
                        <Radio value="inactive">Ngưng</Radio>
                    </Radio.Group>
                </Form.Item>

                <div style={{ 
                    marginTop: '32px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '12px'
                }}>
                    <Button onClick={onClose}>Hủy</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>Lưu</Button>
                </div>
            </div>
        </Form>
    );
};

export default PositionForm;
