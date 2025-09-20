import API from './api';

export const insertSkillsToClass = (data) => API.post(`/addSkillsToClass`, data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const skillsByClassId = (idClass) => API.get(`/skillsByClassId/${idClass}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const classWithSkills = () => API.get(`/allClassesWithSkills`, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})