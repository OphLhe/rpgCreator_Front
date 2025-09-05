import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import '../Styles/footer.css'
import { useNavigate } from 'react-router';

const Footer = () => {

    const navigate = useNavigate()

    return ( 
        <>
        <footer>
            <section className='footerNav'>
                <ul>    
                    <li onClick={()=> {navigate('/')}}>Accueil</li>
                    <li onClick={()=> {navigate('/profile')}}>Profil</li>
                    <li onClick={()=> {navigate('/')}}>Lancé de dès</li>
                </ul>
                <ul>
                    <li onClick={()=> {navigate('/')}}>Comment fonctionne le jeu de rôles</li>
                    <li onClick={()=> {navigate('/')}}>Créations de la communauté</li>
                    <li onClick={()=> {navigate('/')}}>Packs découvertes</li>
                </ul>
                <ul>
                    <li onClick={()=> {navigate('/')}}>A propos</li>
                    <li onClick={()=> {navigate('/')}}>Contact</li>
                    <li onClick={()=> {navigate('/')}}>Mentions légales</li>
                </ul>
            </section>

            <section className='rgpd'>
                <ul>
                    <li onClick={()=> {navigate('/')}}>Conditions d'utilisations</li>
                    <li onClick={()=> {navigate('/')}}>CGVU</li>
                    <li onClick={()=> {navigate('/')}}>Politique de confidentialité</li>
                    <li onClick={()=> {navigate('/')}}>Cookies</li>
                    <li onClick={()=> {navigate('/')}}>Code de conduite</li>
                </ul>
            </section>

            <section className='droits'>
                <span className='spanFooter'>&copy; 2025-Lore Crafters. Tous droit réservés. </span>
                <span className='spanFooter'>Créé et conçu par : <a className='linkedin' href="https://www.linkedin.com/in/ophelie-lhermitte-846931154/">Lhermitte Ophélie</a>. </span>
            </section>
        </footer>
        </>
     )
     
     ;
}
 

export default Footer;
<>

</>