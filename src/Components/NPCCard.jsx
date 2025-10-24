import { Button } from 'react-bootstrap';
import '../index.css';
import { useState } from 'react';
import ReactBoxFlip from 'react-box-flip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { deleteNpc } from '../Services/npcServices';

const NPCCard = ({ 
    idNpc,
    npcFirstName, 
    npcLastName, 
    npcNickname, 
    npcGender, 
    npcAge, 
    npcBiography,
    npcPhysic,
    npcLevel, 
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
    
    const handleDelete = async (idNpc, userId) => {
        try {
            console.log(idNpc);
            await deleteNpc(idNpc, userId)
            alert('Npc successfully deleted!')
            location.reload();
        } catch (error) {
            console.error('Error while deleting NPC', error);
            alert('error while deleting npc.')
        }
    }

    return ( 
        <>

            <div className="itemCard">

                <ReactBoxFlip isFlipped={isFlipped}>

                    <div className="cardRecto"
                    style={{backgroundColor: '#212121', color:'#fff'}}>
                        <h2>PNJ</h2>
                        <h3>{npcFirstName} {npcLastName}</h3>
                        <h3>"{npcNickname}"</h3>
                        <span>Âge : {npcAge} ans</span>
                        <span>Genre : {npcGender}</span>
                        <span>Niveau : {npcLevel}</span>
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
                                <span className='sr-only'> Modifier le pnj {npcNickname}</span>
                                <FontAwesomeIcon icon={faPen} />
                            </Button>
                            <span>Recto</span>
                            <Button className='trashButton'
                            onClick={() => handleDelete(idNpc)}>
                                <span className='sr-only'> Supprimer le pnj {npcNickname}</span>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </Button>
                        </div>

                    </div>

                    <div className="cardVerso"
                    style={{backgroundColor: '#212121', color:'#fff'}}>

                        <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}
                        style={{borderBottom: '1px solid #D9D9D9'}}>
                            <span>Biographie : </span>
                            <span>{showText ? npcBiography : truncate(npcBiography)}</span>
                            {npcBiography && npcBiography.length > 50 && (
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
                            <span>{showOtherText ? npcPhysic : truncateOther(npcPhysic)}</span>
                            {npcPhysic && npcPhysic.length > 50 && (
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
 
export default NPCCard;