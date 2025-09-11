import API from './api';

export const ability = () => API.get('/ability', {
     headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})
