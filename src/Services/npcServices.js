// import API from './api';

// export const createNpc = (data) => API.post('/addNpc', data)

// export const npc = () => API.get('/npc')

// export const npcById = (idNpc) => API.get(`/npcById/${idNpc}`)

// export const updateNpc = (idNpc, data) => API.put(`/npc/update/${idNpc}`, data)

// export const deleteNpc = (idNpc) => API.delete(`/npc/delete/${idNpc}`)

import API from './api';

export const createNpc = (data) => API.post('/addNpc', data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const npc = () => API.get('/npc', {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const npcById = (idNpc) => API.get(`/npcById/${idNpc}`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const updateNpc = (idNpc, data) => API.put(`/npc/update/${idNpc}`, data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const deleteNpc = (idNpc) => API.delete(`/npc/delete/${idNpc}`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})