import API from "./api";

export const register = (data) => API.post(`/register`, data);
export const login = (data) => API.post(`/login`, data);
export const getUserProfile = () => API.get(`/profile`, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
export const updateUserProfile = (data) => API.put(`/profile/update`, data, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
export const updateUserPassword = (data) => API.put(`profile/updatePassword`, data, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });

export const forgotPassword = (data) => API.post(`/forgotPassord`, data);
export const resetPassword = (data, tokenReset) => API.post("/resetPassword", data, tokenReset, {
    headers: {
      Authorization: tokenReset,
    },
  });
export const deleteUserAccount = (idUser) => API.delete(`/profile/${idUser}`, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
