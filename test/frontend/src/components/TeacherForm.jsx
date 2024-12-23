import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, Upload, Space, Table, Select } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

const TeacherForm = ({ onSubmit, onClose }) => {
    const [form] = Form.useForm();

    const educationColumns = [
        {
            title: 'Bậc',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: 'Trường',
            dataIndex: 'school',
            key: 'school',
        },
        {
            title: 'Chuyên ngành',
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Tốt nghiệp',
            dataIndex: 'graduationYear',
            key: 'graduationYear',
        },
    ];

    const positionOptions = [
        { value: 'TTS', label: 'TTS - Thực tập sinh' },
        { value: 'GVBM', label: 'GVBM - Giáo viên bộ môn' },
        { value: 'TBM', label: 'TBM - Trưởng bộ môn' },
        { value: 'HT', label: 'HT - Hiệu trưởng' },
        { value: 'HP', label: 'HP - Hiệu phó' },
        { value: 'CBYT', label: 'CBYT - Cán bộ Y tế' }
    ];

    return (
        <Form
            form={form}
            layout="vertical"
            style={{ padding: '20px' }}
        >
            <div style={{ 
                display: 'flex', 
                gap: '40px',  
                maxWidth: '100%' 
            }}>
                {/* Cột trái - Avatar */}
                <div style={{ 
                    width: '300px', 
                    textAlign: 'center' 
                }}>
                    <Upload
                        listType="picture-card"
                        showUploadList={false}
                        style={{ width: '100%', height: '300px' }}
                    >
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Chọn ảnh</div>
                        </div>
                    </Upload>
                </div>

                {/* Cột phải - Thông tin */}
                <div style={{ flex: 1, maxWidth: '600px' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Thông tin cá nhân</h3>
                    <Form.Item
                        name="name"
                        label="Họ và tên"
                        required
                    >
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        required
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        name="idNumber"
                        label="Số CCCD"
                        required
                    >
                        <Input placeholder="Nhập số CCCD" />
                    </Form.Item>

                    <Form.Item
                        name="dob"
                        label="Ngày sinh"
                        required
                    >
                        <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày sinh" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        required
                    >
                        <Input placeholder="example@school.edu.vn" />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Địa chỉ"
                        required
                    >
                        <Input placeholder="Địa chỉ thường trú" />
                    </Form.Item>

                    <h3 style={{ 
                        fontSize: '18px', 
                        marginBottom: '24px',
                        marginTop: '32px' 
                    }}>Thông tin công tác</h3>
                    <Form.Item
                        name="positions"
                        label="Vị trí công tác"
                        required
                    >
                        <Select
                            mode="multiple"
                            placeholder="Chọn vị trí công tác"
                            options={positionOptions}
                            style={{ width: '100%' }}
                            optionFilterProp="label"
                        />
                    </Form.Item>

                    <h3 style={{ 
                        fontSize: '18px', 
                        marginBottom: '24px',
                        marginTop: '32px' 
                    }}>Học vị</h3>
                    <Table 
                        columns={educationColumns}
                        dataSource={[]}
                        pagination={false}
                        style={{ marginBottom: '24px' }}
                    />

                    <div style={{ 
                        marginTop: '32px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '12px'
                    }}>
                        <Button onClick={onClose}>Hủy</Button>
                        <Button type="primary">Lưu</Button>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default TeacherForm;
