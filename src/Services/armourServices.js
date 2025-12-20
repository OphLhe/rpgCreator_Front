// import API from './api';

// export const createArmour = (idGenre, data) => API.post(`/addArmour/${idGenre}`, data)

// export const armour = () => API.get('/armour')

// export const updateArmour = (idArmour, armourDatas) => API.put(`/armour/update/${idArmour}`, armourDatas)

// export const deleteArmour = (idUser) => API.delete(`/armour/delete/${idUser}`)

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

export const updateArmour = (idArmour, armourDatas) => API.put(`/armour/update/${idArmour}`, armourDatas,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const deleteArmour = (idUser) => API.delete(`/armour/delete/${idUser}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
