import API from './api';

export const createProps = (idGenre, data) => API.post(`/addProps/${idGenre}`, data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const props = () => API.get('/props', {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const updateProps = (idProps, propsDatas) => API.put(`/props/update/${idProps}`, propsDatas,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const deleteProps = (idUser) => API.delete(`/props/delete/${idUser}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})