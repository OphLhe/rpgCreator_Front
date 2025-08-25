import { useEffect, useState } from 'react';
import '../index.css'
import '../Styles/genreCard.css'
import '../Styles/creationPage.css'
import { genreById } from '../Services/genreServices';
import { useNavigate, useParams } from 'react-router-dom';
import GenreCard from '../Components/genreCard';
import { Alert, Button } from 'react-bootstrap';

const CreationPage = () => {

    const navigate = useNavigate()
    const [genres, setGenre] = useState([])
    const {idGenre} = useParams(); 
    const token = localStorage.getItem('token')
    const fetchGenreById = async ()=>{

        try {
            const response = await genreById(idGenre)
            setGenre(response.data)
            console.log(response.data);
              
        } catch (error) {
            console.error('error fetching genre by id', error); 
        }
    };

    useEffect(() => {
        fetchGenreById()    
    }, []);

    return ( 

        <>

            <h1>Création page </h1>
            {token? (
                <>
                    <div className='genreBannerCreation'>
                        <div className='genreCreationBanner'>
                            {genres.map((g) => (
                                <GenreCard key={g.genreName}
                                genreName={g.genreName}
                                genrePicture={g.genrePicture}
                                className='genreCardCreation'
                                />
                            ))}
                        </div>
                    </div>
                </>
            ): <div className='noTokenCreation'>
                    <Alert >
                        <Alert.Heading>Bienvenue sur la page de création</Alert.Heading>
                            <p>
                                Veuillez vous connecter pour accéder à la page de création de contenu.
                            </p>
                            <hr />
                            <Button onClick={() => {navigate('/register')}}>
                                Aller sur la page de connexion
                            </Button>
                        </Alert>
                    </div>}
        </>
     );
}
 
export default CreationPage;