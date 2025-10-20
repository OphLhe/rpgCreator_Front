import API from './api'

export const addSkillToNpcClass = (data) => API.post('/addSkillToNpcClass', data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const SkillsByNpcClassId = (npcClassId) => API.get(`npcClassSkills/${npcClassId}`, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    },
})

export const removeSkillFromNpcClass = (npcClassSkillId) => API.delete(`/npcClassSkills/delete/${npcClassSkillId}`, data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const removeAllSkillsFromNpcClass = (npcClassId) => API.delete(`/npcClassSkills/deleteAll/${npcClassId}`, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})