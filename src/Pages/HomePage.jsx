import '../Styles/homePage.css'
import '../Styles/genreCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons/faAnglesDown';
import { useEffect, useState } from 'react';
import GenreCard from '../Components/genreCard';
import { genre } from '../Services/genreServices';


const HomePage = () => {

    const [genres, setGenre] = useState([])

    const fetchGenre = async ()=>{
        try {
            const response = await genre()
            setGenre(response.data)
            console.log(response.data);
              
        } catch (error) {
            console.error('error fetching genre name', error);
        }
    };

    useEffect(() => {
        fetchGenre()
    }, []);

    return ( 
        <>
        
        <header>
            <section className='heroHeader'>
                <div className='heroHeaderText'>
                    <span className='textHome'>Libérez votre créativité au service de mondes imaginaires dont vous êtes le créateur</span>
                </div>
           </section>
            <div className='headerText'>
                <span className='textHome'>
                    Lore Crafters vous permet de créer vos propres histoires, votre propre lore à destination du jeu de rôle. Création d’histoires, de personnages,de PNJ etc...
                </span>
            </div>
        </header>

        <main className='genreChoice'>
            <h4>Choisissez votre Univers</h4>
            <FontAwesomeIcon icon={faAnglesDown} size="2xl" className='arrowDown' /> 
            <div className='genreBanner'>
                <div className='genreCard'>
                    {genres.map((g) => (
                        <GenreCard key={g.genreName} genreName={g.genreName} genrePicture={g.genrePicture}/>
                    ))}
                </div>
            </div>
        </main>

        </>

    );
};
 
export default HomePage;