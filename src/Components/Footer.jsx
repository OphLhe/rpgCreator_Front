import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import '../Styles/footer.css'

const Footer = () => {

    return ( 
        <>
        <footer>
            <section className='footerNav'>
                <ul>
                    <li> <a href="" alt=''>A propos</a></li>
                    <li> <a href="">Contact</a></li>
                    <li> <a href="">Mentions légales</a></li>
                </ul>
                <ul>    
                    <li> <a href="">Accueil</a></li>
                    <li> <a href="">Profil</a></li>
                    <li> <a href="">Un café?</a></li>
                </ul>
                <ul>
                    <li> <a href="">Créations de la communauté</a></li>
                    <li> <a href="">Comment fonctionnele jeu de rôles</a></li>
                    <li> <a href="">Packs découvertes</a></li>
                </ul>
            </section>

            <section className='rgpd'>
                <ul>
                    <li><a href="">Conditions d'utilisations</a></li>
                    <li><a href="">CGVU</a></li>
                    <li><a href="">Politique de confidentialité</a></li>
                    <li><a href="">Cookies</a></li>
                    <li><a href="">Code de conduite</a></li>
                    <li><a href="">Service client</a></li>
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