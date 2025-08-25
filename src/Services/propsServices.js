import API from './api';

export const createProps = (data) => API.post('/addProps', data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const props = () => API.get('/props', {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const updateProps = (data) => API.put('/props/update', data,{
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
export const deleteProps = (idUser) => API.delete(`/props/delete/${idUser}`, {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

