import API from './api';

export const genre = (data) => API.get(`/genre`, data);