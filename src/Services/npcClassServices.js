import API from './api';

export const addClassToNpc = (data) => API.post('/addClassToNPC', data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const npcClassByIdNpc = (npcId) => API.get(`/npcClassByIdNpc/${npcId}`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const allNpcWithClasses = () => API.get('/allNpcWithClasses', {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const updateNpcClass = (idNpcClass, data) => API.put(`/updateNpcClass/${idNpcClass}`, data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})