import API from './api';

export const checkPlayersCharClassAssociation = (playersCharacterId, classId) => API.get(`checkPlayersCharClassAssociation/${playersCharacterId}/${classId}`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const addClassToPlayersChar = (data) => API.post('/addClassToPlayersChar', data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const playersCharByClassId = (idClass) => API.get(`/playersCharByClassId/${idClass}`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const allPlayersCharWithClasses = () => API.get('/allPlayersCharWithClasses', {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const updatePlayersCharClass = (idPlayersCharacterClass, data) => API.put(`/updateClassOnPlayersChar/${idPlayersCharacterClass}`, data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})