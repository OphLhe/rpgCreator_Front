import API from './api';

export const createArmour = (idGenre, data) => API.post(`/addArmour/${idGenre}`, data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const armour = () => API.get('/armour', {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const updateArmour = (id, data) => API.put(`/armour/update/${id}`, data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const deleteArmour = (idUser) => API.delete(`/armour/delete/${idUser}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

