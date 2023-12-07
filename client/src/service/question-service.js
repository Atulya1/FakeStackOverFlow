import axios from 'axios';

const API_BASE = "http://localhost:8000";
const QUESTION_API = `${API_BASE}/api/question`;

export const getAllQuestion = async (sortType) => {
    const response = await axios.get(`${QUESTION_API}/allQuestions/${sortType}`);
    return response.data;
}

export const getQuestionById = async (qid) => {
    const response = await axios.get(`${QUESTION_API}/${qid}`);
    return response.data;
}

export const saveQuestion = async (question) => {
    const response = await axios.post(`${QUESTION_API}/saveQuestion`, question);
    return response.data;
}

export const addAnswerId = async (aid, qid) => {
    const response = await axios.post(`${QUESTION_API}/addAnswerId/${qid}`, {answerId: aid});
    return response.data;
}
export const updateQuestion = async (data, qid) => {
    const response = await axios.put(`${QUESTION_API}/updateQuestion/${qid}`, data);
    return response.data;
}

export const deleteQuestion = async (qid) => {
    const response = await axios.delete(`${QUESTION_API}/deleteQuestion/${qid}`);
    return response.data;
}

export const incrementView = async (qid) => {
    const response = await axios.put(`${QUESTION_API}/updateQuestionView/${qid}`, qid);
}
/**
 * tag
 * {
 *     "name" : "android-studio"
 * }
 */
export const getFilteredQuestionsByTag = async (tag, sortType) => {
    const response = await axios.post(`${QUESTION_API}/getFilteredQuestionsByTag/${sortType}`, {name: tag});
    return response.data;
}

/**
 * searchParams
 * {
 *     "tagParams" : ["javascript"],
 *     "searchParams" : ["bottom", "animation", "activity"]
 * }
 */
export const getFilteredQuestions = async (searchParams, sortType) => {
    const response = await axios.post(`${QUESTION_API}/getFilteredQuestions/${sortType}`, searchParams);
    return response.data;
}