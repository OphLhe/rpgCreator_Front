import API from './api';

// export const CheckNpcClassAssociation = (npcId, classId) => API.get (`checkNpcClassAssociation/${npcId}/${classId}`, {
//     headers: {
//         Authorization: `${localStorage.getItem('token')}`
//     }
// })

export const addClassToNpc = (data) => API.post('/addClassToNPC', data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const NpcByClassId = (idClass) => API.get(`/npcByClassId/${idClass}`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const allNpcWithClasses = () => API.get('/allNpcWithClasses', {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const updateNpcClass = (npcClassId, data) => API.put(`/updateNpcClass/${npcClassId}`, data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})