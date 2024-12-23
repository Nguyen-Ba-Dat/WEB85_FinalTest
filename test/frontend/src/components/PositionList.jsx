import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Space, Drawer } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import PositionForm from './PositionForm';

const PositionList = () => {
    const [positions, setPositions] = useState([]);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const columns = [
        {
            title: 'STT',
            key: 'index',
            width: '80px',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Mã',
            dataIndex: 'code',
            key: 'code',
            width: '120px',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'status',
            render: (isActive) => (
                <Tag color={isActive ? "success" : "error"} style={{ borderRadius: '12px' }}>
                    {isActive ? 'Hoạt động' : 'Ngưng hoạt động'}
                </Tag>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'des',
            key: 'des',
        },
    ];

    const fetchPositions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/teacher-positions');
            console.log('Response positions:', response.data);
            setPositions(response.data.data || []);
            setError(null);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách vị trí:', error);
            setError('Không thể tải danh sách vị trí');
            setPositions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPositions();
    }, []);

    return (
        <div>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                marginBottom: '16px',
                padding: '0 24px'
            }}>
                <Space>
                    <Button 
                        type="primary" 
                        icon={<ReloadOutlined />}
                        onClick={fetchPositions}
                    >
                        Làm mới
                    </Button>
                    <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        onClick={() => setIsDrawerVisible(true)}
                    >
                        Tạo
                    </Button>
                </Space>
            </div>

            <div style={{ padding: '24px' }}>
                <Table 
                    columns={columns} 
                    dataSource={positions}
                    rowKey="_id"
                    loading={loading}
                    pagination={{
                        total: positions.length,
                        pageSize: 10,
                        showTotal: (total) => `Tổng số: ${total} vị trí`
                    }}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                    }}
                />
                {error && <div style={{ color: 'red', padding: '0 24px' }}>{error}</div>}
            </div>

            <Drawer
                title="Tạo vị trí công tác"
                width={520}
                onClose={() => setIsDrawerVisible(false)}
                open={isDrawerVisible}
                styles={{
                    body: { padding: '24px' }
                }}
            >
                <PositionForm 
                    onClose={() => setIsDrawerVisible(false)}
                    onSuccess={() => {
                        setIsDrawerVisible(false);
                        fetchPositions();
                    }}
                />
            </Drawer>
        </div>
    );
};

export default PositionList;
