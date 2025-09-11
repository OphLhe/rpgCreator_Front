import API from './api';

export const insertSkillsToClass = (idClass, data) => API.post(`/addSkillsToClass/${idClass}`, data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const skillsByClassId = (idClass) => API.get(`/skillsByClassId/${idClass}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})