// import API from './api';

// export const addStory = (idGenre, data) => API.post(`/addStory/${idGenre}`, data)

// export const story = () => API.get('/story')

// export const storyById = (idStory) => API.get(`/storyById/${idStory}`)

// export const updateStory = (idStory, data) => API.put(`/story/update/${idStory}`, data)

// export const deleteStory = (idStory) => API.delete(`/story/delete/${idStory}`)

import API from './api';

export const addStory = (idGenre, data) => API.post(`/addStory/${idGenre}`, data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const story = () => API.get('/story', {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const storyById = (idStory) => API.get(`/storyById/${idStory}`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const updateStory = (idStory, data) => API.put(`/story/update/${idStory}`, data, {
    headers: {  
        Authorization: `${localStorage.getItem('token')}` 
    }
})

export const deleteStory = (idStory) => API.delete(`/story/delete/${idStory}`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
})