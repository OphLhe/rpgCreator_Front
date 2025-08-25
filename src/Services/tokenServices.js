import { jwtDecode } from "jwt-decode";

export const verifyToken = (token) => {
    
    if(!token){
        return false
    }

    const decoded = jwtDecode(token);
    const expiredTime = decoded.exp * 1000;

    if (expiredTime > Date.now()) {
        return true
    }else if (expiredTime < Date.now()) {
        return false
    }
}