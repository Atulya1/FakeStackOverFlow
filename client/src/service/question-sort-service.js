import axios from 'axios';

const API_BASE = "http://localhost:8000";
const QUESTION_API = `${API_BASE}/api/question`;

/**
 * {
 *     "tagParams" : ["javascript", "react"],
 *     "searchParams" : ["bottom", "animation", "activity"]
 * }
 */
export const getFilteredQuestions = async (data, sortType) => {
    const response = await axios.get(`${QUESTION_API}/getFilteredQuestions/${sortType}`, data);
    return response.data;
}

/**
 * {
 *     "name" : "react"
 * }
 */
export const getFilteredQuestionsByTag = async (data, sortType) => {
    const response = await axios.get(`${QUESTION_API}/getFilteredQuestionsByTag${sortType}`, data);
    return response.data;
}