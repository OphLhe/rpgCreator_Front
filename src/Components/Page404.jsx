import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import '../Styles/page404.css'

const Page404 = () => {

    const navigate = useNavigate()
    return ( 
    <>
    <header className="header404">
        <span className="echecCritique"></span>
        <h1>Page innaccessible</h1>
        <span>Désolé, cette page est en cours de construction</span>
        <Button className="Button" onClick={() => {navigate('/')}}> Retour à l'Accueil</Button>
    </header>
    </> 
    );
}
 
export default Page404;