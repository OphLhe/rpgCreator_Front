import { Button } from 'react-bootstrap';
import '../index.css';
import { useState } from 'react';
import ReactBoxFlip from 'react-box-flip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { deletePlayerscharacter } from '../Services/playerscharacterServices';

const PlayerscharCard = ({
    idPlayersCharacter,
    firstName, 
    lastName, 
    nickname, 
    gender, 
    age, 
    biography,
    physic,
    level, 
    speciesName, 
    className,
    validatedSkills}) => {

    const [showText, setShowText] = useState(false);
    const truncate = (text, maxLength = 100) => {
        if (text && text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    const [showOtherText, setShowOtherText] = useState(false);
    const truncateOther = (text, maxLength = 100) => {
        if (text && text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };


    const [isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleDelete = async (idPlayersCharacter, userId) => {
        try {
            console.log(idPlayersCharacter);         
            await deletePlayerscharacter(idPlayersCharacter, userId)
            alert(`Player's character successfully deleted!`)
            location.reload();
        } catch (error) {
            console.error('Error while deleting players character', error);
            alert('error while deleting players character.')
        }
    }

    return ( 
        <>

            <div className="itemCard">
                <ReactBoxFlip isFlipped={isFlipped}>

                    <div className="cardRecto"
                    style={{backgroundColor: '#212121', color:'#fff'}}>
                        <h2>Personnage à jouer</h2>
                        <h3>{firstName} {lastName}</h3>
                        <h3>"{nickname}"</h3>
                        <span>Âge : {age} ans</span>
                        <span>Genre : {gender}</span>
                        <span>Niveau : {level}</span>
                        <span>Espèce : {speciesName}</span>
                        <span>Classe : {className}</span>

                        <div className="skillsTable">
                        {Array.isArray(validatedSkills) && validatedSkills.filter((skill) => skill.skillsName).length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Compétences</th>
                                        <th>Abilité associée</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {validatedSkills.map((skill, index) => (    
                                        <tr key={index}> 
                                            <td>{skill.skillsName}</td>
                                            <td>{skill.abilityName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <span>Aucune compétence disponible</span>
                        )}
                        </div>
                        <Button
                            onClick={handleFlip}
                            className="flipButton"
                            style={{ backgroundColor: '#fff', color: 'black' }}
                        >
                            <span className="sr-only">Retourner la carte</span>
                            <FontAwesomeIcon icon={faArrowRotateLeft} />
                        </Button>

                        <div className='cardFooter'>  
                            <Button className='modifyButton'>
                                <span className='sr-only'> Modifier le personnage {nickname}</span>
                                <FontAwesomeIcon icon={faPen} />
                            </Button>
                            <span>Recto</span>
                            <Button className='trashButton'
                                onClick={() => handleDelete(idPlayersCharacter)}>
                                <span className='sr-only'> Supprimer le Personnage {nickname}</span>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </Button>
                        </div>
                        
                    </div>    
                    
                    <div className="cardVerso"
                    style={{backgroundColor: '#212121', color:'#fff'}}>

                        <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}
                        >
                            <span>Biographie : </span>
                            <span>{showText ? biography : truncate(biography)}</span>
                            {biography && biography.length > 100  && (
                                <Button
                                    style={{ backgroundColor: '#56656dff', color: 'white' }}
                                    onClick={() => setShowText(!showText)}
                                    className="detailsButton"
                                >
                                {showText ? "Réduire" : "Détails"}
                                </Button>
                            )}
                        </div>

                        <div className={`descSpan ${showOtherText ? "expanded" : "collapsed"} `}>
                            <span>Physique : </span>
                            <span>{showOtherText ? physic : truncateOther(physic)}</span>
                            {physic && physic.length > 100 && (
                                <Button
                                    style={{ backgroundColor: '#56656dff', color: 'white' }}
                                    onClick={() => setShowOtherText(!showOtherText)}
                                    className="detailsButton"
                                >
                                {showOtherText ? "Réduire" : "Détails"}
                                </Button>
                            )}
                        </div>
                            
                        <Button
                            onClick={handleFlip}
                            className="flipButton"
                            style={{ backgroundColor: '#fff', color: 'black'}}
                        >
                            <FontAwesomeIcon icon={faArrowRotateLeft} />
                        </Button>
                        
                        <span>Verso</span>

                    </div>  

                </ReactBoxFlip> 

            </div>    
        </>
     );

}
 
export default PlayerscharCard;