import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/genreCard.css'
import { useNavigate } from 'react-router-dom';

const GenreCard = ({genreName, genrePicture, idGenre, className=''}) => {

    const navigate = useNavigate();

    return (
    <>
        <div className={`genreCardUnique ${className}`}
        onClick={() => (navigate(`/genreById/${idGenre}`))}>

            <div className={`genreCardContent ${className}`} >
                <img src={`http://192.168.1.39:3000/pictures/${genrePicture}`}
                className={`pictureGenreCard ${className}`}
                alt={genreName} />
                <span id={`textGenreCard ${className}`} className={`overlay ${className}`}>{genreName}</span>
            </div>

        </div>
    </>
    )
}
 
export default GenreCard;