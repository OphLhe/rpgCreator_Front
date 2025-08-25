import API from './api';

export const createArmour = (data) => API.post('/addArmour', data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const armour = () => API.get('/armour', {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const updateArmour = (data) => API.put('/armour/update', data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const deleteArmour = (idUser) => API.delete(`/armour/delete/${idUser}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

