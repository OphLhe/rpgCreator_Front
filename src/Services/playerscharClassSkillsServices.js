import API from './api'

export const addSkillToPlayerscharClass = (data) => API.post('/addSkillToPlayerscharClass', data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const SkillsByPlayerscharClassId = (playerscharClassId) => API.get(`playerscharClassSkills/${playerscharClassId}`, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    },
})

export const removeSkillFromPlayerscharClass = (playerscharClassSkillId) => API.delete(`/playerscharClassSkills/delete/${playerscharClassSkillId}`, data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const removeAllSkillsFromPlayerscharClass = (playerscharClassId) => API.delete(`/playerscharClassSkills/deleteAll/${playerscharClassId}`, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})