import API from './api';

export const genre = (data) => API.get(`/genre`, data);
export const genreById = (idgenre) => API.get(`/genre/${idgenre}`, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
});