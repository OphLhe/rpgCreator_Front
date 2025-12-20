// import API from './api';

// export const createSpecies = (data) => API.post('/addSpecies', data)
// export const species = () => API.get('/species')
// export const updateSpecies = (id, data) => API.put(`/species/update/${id}`, data)
// export const deleteSpecies = (idUser) => API.delete(`/species/delete/${idUser}`)

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