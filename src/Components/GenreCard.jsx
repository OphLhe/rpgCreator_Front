import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/genreCard.css'

const GenreCard = ({genreName, genrePicture}) => {

    return (
    <>
        <div className='genreCardUnique'>
            <div className='genreCardContent'>
                <img src={`http://192.168.1.39:3000/pictures/${genrePicture}`}
                className='pictureGenreCard'
                alt="" />
                <span className='textGenreCard' id='overlay'>{genreName}</span>
            </div>
        </div>
    </>
    )
}
 
export default GenreCard;