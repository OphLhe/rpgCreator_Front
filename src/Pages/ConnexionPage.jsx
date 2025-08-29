import { Button } from "react-bootstrap";
import { login , register } from "../Services/userServices";
import '../Styles/connexionPage.css'
import '../index.css'
import { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";


const ConnexionPage = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({email:'', firstName:'', lastName:'',nickname:'', dateOfBirth:'', password:'' })
    const [userLogin, setUserLogin] = useState({email:'', password:''})
    const [passwordAgain, setPasswordAgain] = useState('');
    const [type, setType] = useState('password'); 
    const [icon, setIcon] = useState(faEyeSlash)
    const [typeAgain, setTypeAgain] = useState('password'); 
    const [iconAgain, setIconAgain] = useState(faEyeSlash)
    const [typeLogin, setTypeLogin] = useState('password'); 
    const [iconLogin, setIconLogin] = useState(faEyeSlash)

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(userData)
            alert('user registered successfully')
        } catch (error) {
            console.error(error);
            alert('CPT')
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await login(userLogin)
            localStorage.setItem('token', response.data.token)
            navigate('/')
            alert('user logged in')
        }catch(error){
            console.error(error);
            alert('CPT')   
        }
    }

    const handleShowPassword = () => {
        if(type === 'password'){
            setIcon(faEye); 
            setType('text')
        }else{
            setIcon(faEyeSlash)
            setType('password')
        }
    }

    const handleShowPasswordAgain = () => {
        if(typeAgain === 'password'){
            setIconAgain(faEye); 
            setTypeAgain('text')
        }else{
            setIconAgain(faEyeSlash)
            setTypeAgain('password')
        }
    }

    const handleShowPasswordLogin = () => {
        if(typeLogin === 'password'){
            setIconLogin(faEye); 
            setTypeLogin('text')
        }else{
            setIconLogin(faEyeSlash)
            setTypeLogin('password')
        }
    }

    return ( 

    <>
    <div className="formGroup">

        <div className="formConnexion">
            <h4>Connectez-vous</h4>
            <form action="/login" onSubmit={handleLogin} className="formLogin">
                <label >Email</label>
                <input type="email" 
                    value={userLogin.email}
                    onChange={(e) => setUserLogin({...userLogin, email:e.target.value})}
                    required
                />
                <label >Mot de passe</label>
                <div className="passwordInput">
                    <input className="inputPassword"
                        type={typeLogin} 
                        name="password"
                        value={userLogin.password}
                        onChange={(e) => setUserLogin({...userLogin, password:e.target.value})}
                        required
                    />
                    <span className='eyeIcon' onClick={handleShowPasswordLogin}>
                        <FontAwesomeIcon icon={iconLogin}/>
                    </span>
                </div>
                <Button className='formButton' type="submit"> Se connecter</Button>
            </form>
            {/* <a href="">Mot de passe oublié?</a> */}
        </div>

        <div className="formConnexion">
            <h4>Pas encore de compte? Inscrivez-vous</h4>
            <form action="/register" onSubmit={handleRegister} className="formRegister">
                <label htmlFor="prénom">Prénom</label>
                <input type="text" 
                    value={userData.firstName}
                    onChange={(e) => setUserData({...userData, firstName:e.target.value})}
                    required
                />
                <label htmlFor="nom">Nom</label>
                <input type="text"
                    value={userData.lastName}
                    onChange={(e) => setUserData({...userData, lastName:e.target.value})} 
                    required
                />
                <label htmlFor="surnom">Surnom</label>
                <input type="text" 
                    value={userData.nickname}
                    onChange={(e)=> setUserData({...userData, nickname:e.target.value})}
                    required
                />
                <label htmlFor="dateNaissance">Date de Naissance</label>
                <input type="date" 
                    value={userData.dateOfBirth}
                    onChange={(e)=> setUserData({...userData, dateOfBirth:e.target.value})}
                    required
                />
                <label htmlFor="email">Email</label>
                <input type="email" 
                    value={userData.email}
                    onChange={(e)=> setUserData({...userData, email:e.target.value})}
                    required
                />
                <label htmlFor="password">Mot de passe</label>
                <div className="passwordInput">
                    <input className="inputPassword"
                    type={type}
                    name="password"
                    value={userData.password} 
                    onChange={e => setUserData ({...userData, password:e.target.value})} 
                    required/>
                    <span className='eyeIcon' onClick={handleShowPassword}>
                        <FontAwesomeIcon icon={icon}/>
                    </span>
                </div>
                <label htmlFor="password">Confirmer votre mot de passe</label>
                <div className="passwordInput">
                    <input className="inputPassword"
                    type={typeAgain}
                    name="password"
                    value={passwordAgain} 
                    onChange={e => setPasswordAgain (e.target.value)} 
                    required/>
                    <span className='eyeIcon' onClick={handleShowPasswordAgain}>
                        <FontAwesomeIcon icon={iconAgain}/>
                    </span>
                </div>
                <PasswordChecklist
                    rules={["minLength", "specialChar", "number", "capital", "match"]}
                    minLength={10}
                    value={userData.password}
                    valueAgain={passwordAgain}
                    onChange={(isValid) => {}}
                    messages={{
                        minLength: "Votre mot de passe doit contenir plus de 10 caractères.",
                        specialChar: "Doit contenir au moins 1 caractère spéciales.",
                        number: "Doit contenir au moins 1 nombre.",
                        capital: "Doit contenir au moins 1 lettre capital.",
                        match: "Les mots de passe correpondent.",
                    }}
                />
                <Button className='formButton' type="submit">Créer mon compte</Button>
            </form>
        </div>

    </div>
    </> 

    );
}
 
export default ConnexionPage;