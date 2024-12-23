import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Space, Drawer, Tag } from 'antd';
import { SearchOutlined, PlusOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import TeacherForm from '../components/TeacherForm';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const fetchTeachers = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/teachers?page=${page}&limit=${pageSize}`);
      console.log('Response from API:', response.data);
      const { data, pagination: paginationData } = response.data;
      setTeachers(data);
      setDataSource(Array.isArray(data) ? data : []);
      setPagination({
        current: paginationData.currentPage,
        pageSize: pageSize,
        total: paginationData.totalItems
      });
      setError(null);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu giáo viên:', error);
      setError('Không thể tải dữ liệu giáo viên');
      setDataSource([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleTableChange = (newPagination) => {
    fetchTeachers(newPagination.current, newPagination.pageSize);
  };

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
      width: '100px',
    },
    {
      title: 'Giáo viên',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId) => (
        <Space key={userId._id}>
          <img 
            src={userId.avatar} 
            alt={userId.name}
            style={{ width: 40, height: 40, borderRadius: '50%' }}
          />
          <div>
            <div>{userId.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{userId.email}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{userId.phoneNumber}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Trình độ (cao nhất)',
      dataIndex: 'degrees',
      key: 'degrees',
      render: (degrees) => {
        if (!degrees || degrees.length === 0) return null;
        const highestDegree = degrees[degrees.length - 1];
        return (
          <div>
            <div>{highestDegree.type}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Trường: {highestDegree.school}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Chuyên ngành: {highestDegree.major}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Năm: {highestDegree.year}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Vị trí công tác',
      dataIndex: 'positions',
      key: 'positions',
      render: (positions) => (
        <div>
          {positions?.map((position, index) => (
            <Tag key={position._id || index} color="blue">
              {position.name || 'Chưa cập nhật'} ({position.code})
              <div style={{ fontSize: '12px', color: '#666' }}>
                {position.des || ''}
              </div>
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'userId',
      key: 'address',
      render: (userId) => userId?.address || 'Chưa cập nhật',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'status',
      render: (isActive) => (
        <Tag color={isActive ? 'success' : 'error'} style={{ borderRadius: '12px' }}>
          {isActive ? 'Đang công tác' : 'Ngưng công tác'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button icon={<EyeOutlined />} type="text">Chi tiết</Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1>Thông tin giáo viên</h1>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <Space>
          <Input
            placeholder="Tìm kiếm thông tin"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Button 
            type="primary" 
            icon={<ReloadOutlined />}
            onClick={fetchTeachers}
          >
            Tải lại
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={showDrawer}
          >
            Tạo mới
          </Button>
        </Space>
      </div>

      <Table 
        columns={columns}
        dataSource={dataSource}
        rowKey="_id"
        loading={loading}
        pagination={{
          ...pagination,
          showTotal: (total) => `Tổng: ${total}`,
        }}
        onChange={handleTableChange}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <Drawer
        title="Thêm giáo viên mới"
        width={1000}
        onClose={closeDrawer}
        open={isDrawerVisible}
        styles={{
          body: { padding: '24px' }
        }}
      >
        <TeacherForm onClose={closeDrawer} />
      </Drawer>
    </div>
  );
};

export default TeachersPage;
