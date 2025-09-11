import API from './api';

export const createWeapon = (idGenre, data) => API.post(`/addWeapon/${idGenre}`, data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const weapon = () => API.get('/weapon', {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const updateWeapon = (id, data) => API.put(`/weapon/update/${id}`, data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const deleteWeapon = (idUser) => API.delete(`/weapon/delete/${idUser}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})