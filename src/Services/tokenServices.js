import { jwtDecode } from "jwt-decode";

export const verifyToken = (token) => {
    if (!token) {
        return false;
    }

    try {
        const decoded = jwtDecode(token);
        // Vérifie que le token a un champ 'exp'
        if (!decoded.exp) {
            return false;
        }
        const expiredTime = decoded.exp * 1000;
        return expiredTime > Date.now();
    } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        return false;
    }
};
