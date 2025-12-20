import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Configuration par défaut pour tous les toasts
export const toastConfig = {
  position: "top-right",
  autoClose: 4000, 
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined, 
  theme: "dark", 
};

// Messages de toast prédéfinis
export const toastMessages = {
    user: {
        loginSuccess: "Connexion réussie !",
        loginError: "Échec de la connexion. Vérifiez vos identifiants.",
        registerPending: "En cours de création...",
        registerSuccess: "Inscription réussie ! Un email de confirmation vous a été envoyé.",
        registerError: "Échec de l'inscription. Veuillez réessayer."
    }, 
    logout: {
        success: "Déconnexion réussie !"
    }, 
    passwordReset: {
        emailSent: "Email de réinitialisation envoyé ! Vérifiez votre boîte de réception.",
        resetSuccess: "Mot de passe réinitialisé avec succès ! Vous pouvez maintenant vous connecter.",
        resetError: "Échec de la réinitialisation du mot de passe. Veuillez réessayer."
    }, 
    password: {
        updateSuccess: "Mot de passe mis à jour avec succès !",
        updateError: "Échec de la mise à jour du mot de passe. Veuillez réessayer.",
        identicalError: "Le nouveau mot de passe ne peut pas être identique à l'ancien."
    }, 
    item: {
        itempPending: "Création de l'élément en cours...",
        createSuccess: "Élément créé avec succès !",
        createError: "Échec de la création de l'élément. Veuillez réessayer.",
        updateSuccess: "Élément mis à jour avec succès !",
        updateError: "Échec de la mise à jour de l'élément. Veuillez réessayer.",
        deleteSuccess: "Élément supprimé avec succès !",
    }   

}

// fonction pour obtenir un message à partir d'une clé
const getMessages = (messagekey) => {
  const keys = messagekey.split('.');
  let message = toastMessages;
  for(const k of keys){
    message = message[k];
    if(!message) return 'Message introuvable';
  }
    return message;
}

// Fonction pour afficher un toast de succès
export const showSuccessToast = (messagekey) => {
  toast.success(getMessages(messagekey), toastConfig);
};

export const showCustomSuccess = (message) => {
  toast.success(message, toastConfig);
}

// Fonction pour afficher un toast d'erreur
export const showErrorToast = (messagekey) => {
  toast.error(getMessages(messagekey), toastConfig);
};

export const showCustomError = (message) => {
  toast.error(message, toastConfig);
}

// Fonction pour afficher un toast d'information
export const showInfoToast = (message) => {
  toast.info(message , toastConfig);
};

// Fonction pour afficher un toast d'avertissement
export const showWarningToast = (messagekey) => {
  toast.warning(getMessages(messagekey), toastConfig);
};

// Fonction pour afficher un toast personnalisé avec une promesse
export const showPromiseToast = (promise, pendingkey, successkey, errorkey) => {
  toast.promise(
    promise,
    {
      pending: getMessages(pendingkey),
      success: getMessages(successkey),
      error: getMessages(errorkey),
    },
    toastConfig
  );
};
