import { Button } from 'react-bootstrap';
import '../Styles/NPCCard.css';
import { useState } from 'react';

const PlayerscharCard = ({
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

    return ( 
        <>

            <div className="npcCard">
                <div className="npcRecto"
                >
                    <h3>Personnage à jouer</h3>
                    <h4>{firstName} {lastName}</h4>
                    <h4>"{nickname}"</h4>
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
                </div>    
                <div className="npcVerso">
                    <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}
                    style={{borderBottom: '1px solid #D9D9D9'}}>
                        <span>Biographie : </span>
                        <span>{showText ? biography : truncate(biography)}</span>
                    </div>
                    <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}>
                        <span>Physique : </span>
                        <span>{showText ? physic : truncate(physic)}</span>
                    </div>
                    {((biography && biography.length > 50) || (physic && physic.length > 50)) && (
                        <Button
                            onClick={() => setShowText(!showText)}
                            className="detailsButton"
                        >
                        {showText ? "Réduire" : "Détails"}
                        </Button>
                    )}
                </div>        
            </div>    
        </>
     );

}
 
export default PlayerscharCard;