import { Button } from "react-bootstrap";
import { connexion } from "../Services/userServices";
import '../Styles/connexionPage.css'


const ConnexionPage = () => {
    return ( 

    <>
    <h1>page de Connexion</h1>
    <div className="formGroup">
    <div className="formConnexion">
        <h4>Connectez-vous</h4>
        <form action="/login" className="formLogin">
            <label for='email'>Email</label>
            <input type="email" id='email' placeholder="votre email" required/>
            <label for='password'>Mot de passe</label>
            <input type="password" id='password' placeholder="votre mot de passe" required/>
            <Button className='formButton' type="submit"> Se connecter</Button>
        </form>
    </div>
    <div className="formConnexion">
        <h4>Pas encore de compte? Inscrivez-vous</h4>
        <form action="/register" className="formRegister">
            <label for="">Prénom</label>
            <input type="text" required/>
            <label for="">Nom</label>
            <input type="text" required/>
            <label for="">Surnom</label>
            <input type="text" required/>
            <label for="">Date de Naissance</label>
            <input type="date" required/>
            <label for="">Email</label>
            <input type="email" required/>
            <label for="">Mot de passe</label>
            <input type="password" required/>
            <Button className='formButton' type="submit">Créer mon compte</Button>
        </form>
    </div>
    </div>
    </> 

    );
}
 
export default ConnexionPage;