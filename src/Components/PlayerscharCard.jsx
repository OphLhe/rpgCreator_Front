import { Button, Form, FormLabel, Modal } from 'react-bootstrap';
import '../index.css';
import { useEffect, useState } from 'react';
import ReactBoxFlip from 'react-box-flip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { deletePlayerscharacter, updatePlayerscharacter } from '../Services/playerscharacterServices';
import {species} from '../Services/speciesServices'
import { classWithSkills } from '../Services/classSkillsServices';
import { showSuccessToast, showErrorToast } from '../Utils/toastConfig';

const PlayerscharCard = ({
    idPlayersCharacter,
    firstName: initialFirstName, 
    lastName: initialLastName,  
    nickname: initialNickname, 
    gender: initialGender, 
    age: initialAge,
    biography: initialBiography,
    physic: initialPhysic,
    level: initialLevel,
    speciesId: initialSpeciesId, 
    speciesName: initialSpeciesName,
    classId: initialClassId,
    className: initialClassName,
    validatedSkills: initialValidatedSkills,
    fetchGetPlayerschar}) => {


    const [getSpecies, setSpecies] = useState([]);
    const fetchSpecies = async () => {
        try {
            const response = await species();
            setSpecies(response.data);
        } catch (error) {
            console.error('error fetching species ', error);
        }
    }

    const [classes, setClasses] = useState([]);
      const fetchClasses = async () => {
        try {
            const response = await classWithSkills();
            setClasses(response.data);
        } catch (error) {
            console.error('error fetching classes ', error);    
        }
      }
      
      const [selectedClass, setSelectedClass] = useState(null);
      const [selectedSkills, setSelectedSkills] = useState([]);
    
      const handleClassChange = async (e) => {
        const classId = e.target.value;
        const selected = classes.find((cls) => cls.idClass == classId);
        setSelectedClass(selected);
      }
    
      const handleSkillChange = (skillId) => {
        setSelectedSkills((prevSelectedSkills) => 
          prevSelectedSkills.includes(skillId)
          ? prevSelectedSkills.filter((id) => id !== skillId)
          : [...prevSelectedSkills, skillId]
        );
      }
    
      const [validatedSkills, setValidatedSkills] = useState([])
      
      const handleValidateSkills = (e) => {
      e.preventDefault();
      console.log(selectedSkills);
      setValidatedSkills(selectedSkills)
      alert(`Compétences validées pour ${selectedClass.className}`)
    };

    const [showText, setShowText] = useState(false);
    const truncate = (text, maxLength = 100) => {
        if (!text) return "";
        return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
    };

    const [showOtherText, setShowOtherText] = useState(false);
    const truncateOther = (text, maxLength = 100) => {
        if (!text) return "";
        return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
    };

    const [isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModify, setShowModify] = useState(false);
    const handleCloseModify = () => setShowModify(false);
    const handleShowModify = () => setShowModify(true);

    const [localPlayers, setLocalPlayers] = useState({
        firstName: initialFirstName, 
        lastName: initialLastName,  
        nickname: initialNickname, 
        gender: initialGender, 
        age: initialAge,
        biography: initialBiography,
        physic: initialPhysic,
        level: initialLevel,
        speciesId: initialSpeciesId,
        speciesName:initialSpeciesName, 
        classId: initialClassId,
        className: initialClassName,
        validatedSkills: initialValidatedSkills,
  });

  const [playersDatas, setPlayersData] = useState({
    firstName: initialFirstName, 
    lastName: initialLastName,  
    nickname: initialNickname, 
    gender: initialGender, 
    age: initialAge,
    biography: initialBiography,
    physic: initialPhysic,
    level: initialLevel,
    speciesId: initialSpeciesId, 
    speciesName:initialSpeciesName,
    classId: initialClassId,
    className: initialClassName,
    validatedSkills: initialValidatedSkills,
  });

  const handleUpdate = async (userId, idPlayersCharacter) => {

      try {
        const response2 = await updatePlayerscharacter(userId, idPlayersCharacter, playersDatas);
        const updatedPlayer = response2.data
        setLocalPlayers({
            firstName: updatedPlayer.firstName,
            lastName: updatedPlayer.lastName,
            nickname: updatedPlayer.nickname,
            gender: updatedPlayer.gender,
            age: updatedPlayer.age,
            biography: updatedPlayer.biography,
            physic: updatedPlayer.physic,
            level: updatedPlayer.level,
            speciesId: updatedPlayer.speciesId,
            speciesName: updatedPlayer.speciesName,
            classId: updatedPlayer.classId,
            className: updatedPlayer.className,
            validatedSkills: updatedPlayer.validatedSkills,
        })
        showSuccessToast('item.updateSuccess');
        handleCloseModify();
        fetchGetPlayerschar();
      } catch (error) {
        console.error("Error while updating players");
        showErrorToast('item.updateError');
      }
    };

    const handleDelete = async (idPlayersCharacter, userId) => {
        try {
            console.log(idPlayersCharacter);         
            await deletePlayerscharacter(idPlayersCharacter, userId)
            showSuccessToast('item.deleteSuccess');
            location.reload();
        } catch (error) {
            console.error('Error while deleting players character', error);
            showErrorToast('item.deleteError');
        }
    }

    useEffect(() =>{
        fetchSpecies();
        fetchClasses()
    }, [])

    return ( 
        <>

            <div className="itemCard">
                <ReactBoxFlip isFlipped={isFlipped}>

                    <div className="cardRecto"
                    style={{backgroundColor: '#212121', color:'#fff'}}>

                        <h2>Personnage à jouer</h2>
                        <h3>{localPlayers.firstName} {localPlayers.lastName}</h3>
                        <h3>"{localPlayers.nickname}"</h3>
                        <span>Âge : {localPlayers.age} ans</span>
                        <span>Genre : {localPlayers.gender}</span>
                        <span>Niveau : {localPlayers.level}</span>
                        <span>Espèce : {localPlayers.speciesName}</span>
                        <span>Classe : {localPlayers.className}</span>

                        <div className="skillsTable">
                        {Array.isArray(localPlayers.validatedSkills) && localPlayers.validatedSkills.filter((skill) => skill.skillsName).length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Compétences</th>
                                        <th>Abilité associée</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {localPlayers.validatedSkills.map((skill, index) => (    
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
                            <Button className='modifyButton' onClick={handleShowModify}>
                                <span className='sr-only'> Modifier le personnage {localPlayers.nickname}</span>
                                <FontAwesomeIcon icon={faPen} />
                            </Button>

                             <Modal
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                show={showModify}
                                onHide={handleCloseModify}
                            >
                                <Modal.Header closeButton>
                                <Modal.Title>Modification du personnage</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <Form>
                                        <Form.Group>
                                            <FormLabel>Prénom du personnage</FormLabel>
                                            <Form.Control
                                            type="text"
                                            value={playersDatas.firstName}
                                            onChange={(e) =>
                                            setPlayersData({
                                                ...playersDatas,
                                                firstName: e.target.value,
                                            })
                                            }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <FormLabel>Nom du personnage</FormLabel>
                                            <Form.Control
                                            type="text"
                                            value={playersDatas.lastName}
                                            onChange={(e) =>
                                            setPlayersData({
                                                ...playersDatas,
                                                lastName: e.target.value,
                                            })
                                            }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <FormLabel>Surnom du personnage</FormLabel>
                                            <Form.Control
                                            type="text"
                                            value={playersDatas.nickname}
                                            onChange={(e) =>
                                            setPlayersData({
                                                ...playersDatas,
                                                nickname: e.target.value,
                                            })
                                            }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <FormLabel>Age du personnage</FormLabel>
                                            <Form.Control
                                            type="number"
                                            value={playersDatas.age}
                                            onChange={(e) =>
                                            setPlayersData({
                                                ...playersDatas,
                                                age: e.target.value,
                                            })
                                            }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <FormLabel>Genre du personnage</FormLabel>
                                            <Form.Control
                                            type="text"
                                            value={playersDatas.gender}
                                            onChange={(e) =>
                                            setPlayersData({
                                                ...playersDatas,
                                                gender: e.target.value,
                                            })
                                            }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <FormLabel>Niveau du personnage</FormLabel>
                                            <Form.Control
                                            type="number"
                                            value={playersDatas.level}
                                            onChange={(e) =>
                                            setPlayersData({
                                                ...playersDatas,
                                                level: e.target.value,
                                            })
                                            }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <FormLabel>Biographie du personnage</FormLabel>
                                            <Form.Control
                                            as="textarea"
                                            value={playersDatas.biography}
                                            onChange={(e) =>
                                            setPlayersData({
                                                ...playersDatas,
                                                biography: e.target.value,
                                            })
                                            }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <FormLabel>Physique du personnage</FormLabel>
                                            <Form.Control
                                            as="textarea"
                                            value={playersDatas.physic}
                                            onChange={(e) =>
                                            setPlayersData({
                                                ...playersDatas,
                                                physic: e.target.value,
                                            })
                                            }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <FormLabel>Espèces du personnage</FormLabel>
                                            <Form.Select
                                            value={playersDatas.speciesId}
                                            onChange={(e) => {
                                                setPlayersData({
                                                    ...playersDatas,
                                                    speciesId: e.target.value
                                                })
                                            }}
                                        >
                                            <option value="">Choisissez l'espèce du personnage</option>
                                            {getSpecies.map((spe) => (
                                                <option key={spe.idSpecies} value={spe.idSpecies}>
                                                    {spe.speciesName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        </Form.Group>
                                        <Form.Group>
                                            <FormLabel htmlFor="Classe du Personnage">Classe du Personnage</FormLabel>
                                            <Form.Select
                                                id="Classe du Personnage"
                                                onChange={handleClassChange}
                                                value={selectedClass ? selectedClass.idClass: ""}
                                            >
                                                <option value="">
                                                Choisissez la classe du Personnage
                                                </option>
                                                {classes.map((cls) => (
                                                <option key={cls.idClass} value={cls.idClass}>
                                                    {cls.className}
                                                </option>
                                                ))}
                                            </Form.Select>  
                                            {selectedClass && (
                                                <div className="classDetails"
                                                    style={{border: `1px solid white`}}
                                                >
                                                    <h4>{selectedClass.className}</h4>
                                                    <p><strong>Description :</strong> {selectedClass.classDesc}</p>
                                                    <p><strong>Point de vie :</strong>{selectedClass.classPv}</p>
                                                    <div>
                                                        <h5>Compétences associées :</h5>
                                                        {selectedClass.skills.map((skill) => (
                                                            <div key={skill.idSkills} className="skillCheckbox">
                                                                <label>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedSkills.includes(skill.idSkills)}
                                                                        onChange={() => handleSkillChange(skill.idSkills)}
                                                                    />
                                                                    {skill.skillsName} / {skill.skillsDesc} / {skill.abilityName}
                                                                </label>
                                                            </div>
                                                        ))}
                                                        <Button style={{ backgroundColor: 'white' }}
                                                            onClick={handleValidateSkills}
                                                            className="creationButton"
                                                        >
                                                                Valider les compétences
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>

                                <Modal.Footer>
                                <Button onClick={handleCloseModify} variant="secondary">
                                    Annuler
                                </Button>
                                <Button variant="danger"
                                    onClick={() => {
                                    handleUpdate(idPlayersCharacter, playersDatas);
                                    }}
                                >
                                    Modifier le personnage {localPlayers.firstName}
                                </Button>
                                </Modal.Footer>
                            </Modal>

                            <span>Recto</span>

                            <Button className='trashButton'
                                onClick={handleShow}>
                                <span className='sr-only'> Supprimer le Personnage {localPlayers.nickname}</span>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </Button>                            

                             <Modal
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                show={show}
                                onHide={handleClose}
                            >
                                <Modal.Header closeButton>
                                <Modal.Title>Suppression du personnage</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                <p>
                                    Etes-vous sûr.e de vouloir supprimer "{localPlayers.firstName}
                                    "?
                                </p>
                                </Modal.Body>

                                <Modal.Footer>
                                <Button onClick={handleClose} variant="secondary">
                                    Annuler
                                </Button>
                                <Button
                                    onClick={() => handleDelete(idPlayersCharacter)}
                                    variant="danger"
                                >
                                    Supprimer le personnage {localPlayers.firstName}
                                </Button>
                                </Modal.Footer>
                            </Modal>

                        </div>
                        
                    </div>    
                    
                    <div className="cardVerso"
                    style={{backgroundColor: '#212121', color:'#fff'}}>

                        <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}
                        >
                            <span>Biographie : </span>
                            <span>{showText ? localPlayers.biography : truncate(localPlayers.biography)}</span>
                            {localPlayers.biography && localPlayers.biography.length > 100  && (
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
                            <span>{showOtherText ? localPlayers.physic : truncateOther(localPlayers.physic)}</span>
                            {localPlayers.physic && localPlayers.physic.length > 100 && (
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