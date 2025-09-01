import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/genreCard.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Collapse } from 'react-bootstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';

const GenreCard = ({genreName, genrePicture, idGenre, genreDef, className=''}) => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const location = useLocation(); 
    const disabledCollapse = location.pathname.startsWith('/genreById');

    return (
    <>
        <div className={`genreCardUnique ${className}`}>

            <div className={`genreCardContent ${className}`} >
                <img src={`http://192.168.1.39:3000/pictures/${genrePicture}`}
                className={`pictureGenreCard ${className}`}
                alt={genreName} />
                <div onMouseOver={() => setOpen(true)}
                onMouseLeave = {() => setOpen(false)}
                id={`textGenreCard ${className}`} className={`overlay ${className}` }>
                    <div className={`titleGenreCard ${className}`}> 
                        <h2 
                            aria-controls="example-collapse-text"
                            aria-expanded={open}>
                                {genreName}
                        </h2>  
                        { !disabledCollapse && (
                            <>
                            <Collapse in={open}> 
                                <div className={!disabledCollapse && 'collapseText'} id="example-collapse-text">
                                    <span className={`spanGenreCard`}>
                                        Définition : 
                                    </span>
                                    {genreDef}
                                    <Button className='defButton'><FontAwesomeIcon className='defIcon' icon={faCircleRight} onClick={() => {navigate(`/genreById/${idGenre}`)}}/></Button>
                                </div>
                            </Collapse>  
                        </>  
                        )}                        
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
 
export default GenreCard;