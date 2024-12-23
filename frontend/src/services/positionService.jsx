import axios from 'axios';

const API_URL = 'http://localhost:5000/teacher-positions';

export const getPositions = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createPosition = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};
