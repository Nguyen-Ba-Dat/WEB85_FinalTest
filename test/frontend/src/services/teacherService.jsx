import axios from 'axios';

const API_URL = 'http://localhost:5000/teachers';

export const getTeachers = async (page = 1, limit = 10) => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
};

export const createTeacher = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};
