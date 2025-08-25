import API from './api';

export const createWeapon = (data) => API.post('/addWeapon', data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const weapon = () => API.get('/weapon', {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const updateWeapon = (data) => API.put('/weapon/update', data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const deleteWeapon = (idUser) => API.delete(`/weapon/delete/${idUser}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})