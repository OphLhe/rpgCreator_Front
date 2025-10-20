import API from './api';

export const createPlayerscharacter = (data) => API.post('/addPlayerscharacter', data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const playerscharacter = () => API.get('/playerscharacter', {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const playerscharacterById = (idPlayersCharacter) => API.get(`/playerscharacterById/${idPlayersCharacter}`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const updatePlayerscharacter = (idPlayersCharacter, data) => API.put(`/playerscharacter/update/${idPlayersCharacter}`, data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const deletePlayerscharacter = (idPlayersCharacter) => API.delete(`/playerscharacter/delete/${idPlayersCharacter}`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})