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
export const updateClass = (data) => API.put('/class/update', data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const deleteClass = (idUser) => API.delete(`/class/delete/${idUser}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})