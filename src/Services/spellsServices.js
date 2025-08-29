import API from './api';

export const createSpells = (idGenre, data) => API.post(`/addSpells/${idGenre}`, data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const spells = () => API.get('/spells', {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const updateSpells = (data) => API.put('/spells/update', data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const deleteSpells = (idUser) => API.delete(`/spells/delete/${idUser}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})