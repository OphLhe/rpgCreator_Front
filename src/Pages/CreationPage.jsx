import { useEffect, useState } from 'react';
import '../index.css'
import '../Styles/genreCard.css'
import { genreById } from '../Services/genreServices';
import { useParams } from 'react-router-dom';
import GenreCard from '../Components/genreCard';


const CreationPage = () => {

    const [genres, setGenre] = useState([])
    const {idGenre} = useParams(); 

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
     );
}
 
export default CreationPage;