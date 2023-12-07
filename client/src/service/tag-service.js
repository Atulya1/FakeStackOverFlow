import axios from 'axios';

const API_BASE = "http://localhost:8000";
const QUESTION_API = `${API_BASE}/api/question`;
const ANSWER_API = `${API_BASE}/api/answer`;
const TAG_API = `${API_BASE}/api/tag`;

export const getAllTags = async () => {
    const response = await axios.get(`${TAG_API}/allTags`);
    return response.data;
}

export const getTagById = async (tid) => {
    const response = await axios.get(`${TAG_API}/${tid}`);
    return response.data;
}

export const getTagByName = async (tagName) => {
    const response = await axios.get(`${TAG_API}/getTagByName/${tagName}`);
    return response.data;
}

export const saveTag = async (tag) => {
    const response = await axios.post(`${TAG_API}/saveTag`, tag);
    return response.data;
}

export const updateTag = async (data, tid) => {
    const response = await axios.put(`${TAG_API}/updateTag/${tid}`, data);
    return response.data;
}

export const deleteTag = async (tid) => {
    const response = await axios.delete(`${TAG_API}/deleteTag/${tid}`);
    return response.data;
}