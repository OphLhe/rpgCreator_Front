// import API from './api';

// export const addClassToPlayersChar = (data) => API.post('/addClassToPlayerschar', data)

// export const playersCharClassById = (playersCharacterId) => API.get(`/playerscharClassById/${playersCharacterId}`)

// export const allPlayersCharWithClasses = () => API.get('/allPlayerscharWithClasses')

// export const updatePlayersCharClass = (idPlayersCharacterClass, data) => API.put(`/updatePlayerscharClass/${idPlayersCharacterClass}`)

import API from './api';

export const addClassToPlayersChar = (data) => API.post('/addClassToPlayerschar', data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const playersCharClassById = (playersCharacterId) => API.get(`/playerscharClassById/${playersCharacterId}`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const allPlayersCharWithClasses = () => API.get('/allPlayerscharWithClasses', {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const updatePlayersCharClass = (idPlayersCharacterClass, data) => API.put(`/updatePlayerscharClass/${idPlayersCharacterClass}`, data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})