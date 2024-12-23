import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import TeachersPage from './pages/TeachersPage';
import PositionsPage from './pages/PositionsPage';
import Sidebar from './components/Sidebar';

const { Content } = Layout;

const App = () => {
    return (
        <Router>
            <Layout>
                <Sidebar />
                <Layout style={{ marginLeft: 200 }}>
                    <Content style={{ 
                        padding: '24px',
                        minHeight: '100vh',
                        background: '#fff'
                    }}>
                        <Routes>
                            <Route path="/" element={<TeachersPage />} />
                            <Route path="/teachers" element={<TeachersPage />} />
                            <Route path="/positions" element={<PositionsPage />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};

export default App;
