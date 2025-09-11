import API from './api';

export const createSpecies = (data) => API.post('/addSpecies', data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const species = () => API.get('/species', {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const updateSpecies = (id, data) => API.put(`/species/update/${id}`, data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const deleteSpecies = (idUser) => API.delete(`/species/delete/${idUser}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})