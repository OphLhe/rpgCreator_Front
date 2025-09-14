import API from './api';

export const createClass = (data) => API.post('/addClass', data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const allClass = () => API.get('/class', {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const classById = (idClass) => API.get(`/classById/${idClass}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const updateClass = (id, data) => API.put(`/class/update/${id}`, data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const deleteClass = (idUser) => API.delete(`/class/delete/${idUser}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})