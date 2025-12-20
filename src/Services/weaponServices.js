// import API from './api';

// export const createWeapon = (idGenre, data) => API.post(`/addWeapon/${idGenre}`, data)
// export const weapon = () => API.get('/weapon')
// export const updateWeapon = (idWeapon, weaponDatas) => API.put(`/weapon/update/${idWeapon}`, weaponDatas)
// export const deleteWeapon = (idUser) => API.delete(`/weapon/delete/${idUser}`)

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
export const updateWeapon = (idWeapon, weaponDatas) => API.put(`/weapon/update/${idWeapon}`, weaponDatas,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const deleteWeapon = (idUser) => API.delete(`/weapon/delete/${idUser}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})