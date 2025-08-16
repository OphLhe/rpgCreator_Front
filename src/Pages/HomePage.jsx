import '../Styles/homePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons/faAnglesDown';

const HomePage = () => {


    return ( 
        <>
        <header>
            <section className='heroHeader'>
                <div className='heroHeaderText'>
                    <span>Libérez votre créativité au service de mondes imaginaires dont vous êtes le créateur</span>
                </div>
           </section>
            <div className='headerText'>
                <span>
                    RPG Creator vous permet de créer vos propres histoires, votre propre lore à destination du jeu de rôle. Création d’histoires, de personnages,de PNJ etc...
                </span>
            </div>
        </header>

        <main className='genreChoice'>
            <h4>Choisissez votre Univers</h4>
            <FontAwesomeIcon icon={faAnglesDown} size="2xl" className='arrowDown' />   
        </main>

        </>

     );
}
 
export default HomePage;