import axios from 'axios';

const API_BASE = "http://localhost:8000";
const ANSWER_API = `${API_BASE}/api/answer`;

export const getAllAnswer = async () => {
    const response = await axios.get(`${ANSWER_API}/allAnswers`);
    return response.data;
}

export const getAnswerById = async (aid) => {
    const response = await axios.get(`${ANSWER_API}/${aid}`);
    return response.data;
}

export const saveAnswer = async (answer) => {
    const response = await axios.post(`${ANSWER_API}/saveAnswer`, answer);
    return response.data;
}

export const updateAnswer = async (data, aid) => {
    const response = await axios.put(`${ANSWER_API}/updateAnswer/${aid}`, data);
    return response.data;
}

export const deleteAnswer = async (aid) => {
    const response = await axios.delete(`${ANSWER_API}/deleteAnswer/${aid}`);
    return response.data;
}

export const getAnswersByQuestionId = async (qid) => {
    const response = await axios.get(`${ANSWER_API}/getAnswersByQuestionId/${qid}`);
    return response.data;
}