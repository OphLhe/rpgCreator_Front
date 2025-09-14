import API from './api';

export const createSkills = (data) => API.post(`/addSkills`, data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const getSkills = () => API.get('/skills', {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const skillsById = (id) => API.get(`/skillsById/${id}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const updateSkills = (id, data) => API.put(`/skills/update/${id}`, data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const deleteSkills = (idUser) => API.delete(`/skills/delete/${idUser}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})