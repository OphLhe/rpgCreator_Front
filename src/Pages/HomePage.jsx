import '../Styles/homePage.css'
import '../Styles/genreCard.css'
import '../index.css'
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons/faAnglesDown';
import { useEffect, useState } from 'react';
import { genre } from '../Services/genreServices';
import { useNavigate } from 'react-router-dom';
import GenreCard from '../Components/genreCard';


const HomePage = () => {
    const navigate = useNavigate();
    const [genres, setGenre] = useState([])

    const fetchGenre = async ()=>{
        try {
            const response = await genre()
            setGenre(response.data)  
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
                        <h1 className='textHome'>Libérez votre créativité au service de mondes imaginaires dont vous êtes le maître</h1>
                    </div>
                </section>
            </header>

            <main className='mainHome'>
                <section className='headerText'>
                    <span>
                        Devenez "Lore Crafters": créez vos propres histoires, vos propres lore à destination du jeu de rôle. Avec Lore Crafters, vous ne faites pas que suivre les règles d'un jeu, vous vous les approppriez pour créer un univers qui vous ressemble.
                    </span>
                        
                </section>
                <section className='textSection'>
                    <span>Explorez, créez, partagez et jouez dans des univers uniques. Que vous soyez un maître du jeu chevronné ou un novice enthousiaste, Lore Crafters est votre plateforme pour donner vie à vos idées les plus folles.</span>
                </section>
            
                <article className='genreChoice'>
                    <h2>Choisissez votre Univers</h2>
                    <FontAwesomeIcon icon={faAnglesDown} size="2xl" className='arrowDown' /> 
                    <div className='genreBanner'>
                        <Nav.Link className='genreCard'>
                            {genres.map((g) => (
                                <GenreCard key={g.genreName}
                                idGenre={g.idGenre}
                                genreName={g.genreName} 
                                genreDef = {g.genreDef}
                                genrePicture={g.genrePicture}
                                className='genreCardHome'/>
                            ))}
                        </Nav.Link>
                    </div>
                </article>
            </main>

        </>

    );
};
 
export default HomePage;