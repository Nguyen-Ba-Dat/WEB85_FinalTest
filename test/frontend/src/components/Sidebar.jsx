import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, SolutionOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        {
            key: 'teachers',
            icon: <UserOutlined />,
            label: <Link to="/teachers">Giáo viên</Link>,
        },
        {
            key: 'positions',
            icon: <SolutionOutlined />,
            label: <Link to="/positions">Vị trí công tác</Link>,
        }
    ];

    return (
        <Sider
            width={200}
            style={{
                background: '#fff',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }}
        >
            <Menu
                mode="inline"
                selectedKeys={[location.pathname.split('/')[1] || 'teachers']}
                style={{
                    height: '100%',
                    borderRight: 0,
                }}
                items={menuItems}
            />
        </Sider>
    );
};

export default Sidebar;