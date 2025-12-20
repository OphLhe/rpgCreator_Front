// import API from './api';

// export const insertSkillsToClass = (data) => API.post(`/addSkillsToClass`, data)

// export const classSkillsById = (idClass) => API.get(`/classSkillsById/${idClass}`)

// export const classWithSkills = () => API.get(`/allClassesWithSkills`)

// export const updateSkillsToClass = (idClass, skillsIds) => API.put(`/updateSkillsToClass/${idClass}`, {skillsIds})

import API from './api';

export const insertSkillsToClass = (data) => API.post(`/addSkillsToClass`, data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const classSkillsById = (idClass) => API.get(`/classSkillsById/${idClass}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const classWithSkills = () => API.get(`/allClassesWithSkills`, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const updateSkillsToClass = (idClass, skillsIds) => API.put(`/updateSkillsToClass/${idClass}`, {skillsIds},{
        headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})
