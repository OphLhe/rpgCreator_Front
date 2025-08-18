import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/genreCard.css'
import genreInputs from '../Utils/genreInputsColors'

const GenreCard = ({genreName}) => {

    const color = genreInputs[genreName] || '#D9D9D9'

    return (
    <>
        <div className='genreCard'
        style={{backgroundColor:color}}>{genreName}</div>
    </>
    )
}
 
export default GenreCard;