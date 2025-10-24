import { useEffect, useState } from "react";
import { useParams } from "react-router";
import genreInputsColors from "../Utils/genreInputsColors";
import genreButtonsColors from "../Utils/genreButtonsColors";
import genreTextColors from "../Utils/genreTextColors";
import { genreById } from "../Services/genreServices";
import "../Styles/playerscharForm.css";
import { Button, Form } from "react-bootstrap";
import { species } from "../Services/speciesServices";
import { classWithSkills} from "../Services/classSkillsServices";
import { createPlayerscharacter, playerscharacterById } from "../Services/playerscharacterServices";
import { addClassToPlayersChar } from "../Services/playersCharClassServices";

const playerscharForm = () => {
  const { idGenre } = useParams();

  // for genreColors
  const [genres, setGenre] = useState([]);
  const fetchGenreById = async () => {
    try {
      const response = await genreById(idGenre);
      setGenre(response.data);
    } catch (error) {
      console.error("error fetching genre by id", error);
    }
  };

  const [playerscharDatas, setPlayerscharData] = useState({
    firstName: "",
    lastName: "",
    nickname: "",
    gender: "",
    age: 0,
    biography: "",
    physic: "",
    level: 0,
    speciesId: "",
  });

  const [playerscharClassDatas, setPlayerscharClassDatas] = useState({
    strengthStat:0,
    dexterityStat:0,
    constitutionStat:0,
    intelligenceStat:0,
    wisdomStat:0,
    charismaStat:0,
    strModifier:0,
    dexModifier:0,
    conModifier:0,
    intModifier:0,
    wisModifier:0,
    chaModifier:0,
  })

  const [getSpecies, setSpecies] = useState([]);
  const fetchSpecies = async () => {
    try {
        const response = await species();
        setSpecies(response.data);
    } catch (error) {
        console.error('error fetching species ', error);
    }
  }

//   Pour afficher les infos de species une fois sélectionné
  const [selectedSpecies, setSelectedSpecies] = useState(null);

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

const handleAddplayerschar = async (e) => {
    e.preventDefault()

    if (!selectedClass || !selectedSpecies) {
        alert("Veuillez sélectionner une classe et une espèce pour le PNJ.");
        return;
    }

    try {
        // création du perso de joueur et récupération de son id
        const response = await createPlayerscharacter(playerscharDatas)
        const insertedId = response.data.insertId 
        await playerscharacterById(insertedId)
        
        // ajout de la classe au pnj avec nouvelles skills choisies
        const creation = await addClassToPlayersChar({
            playersCharacterId: insertedId,
            speciesId:selectedSpecies.idSpecies,
            classId: selectedClass.idClass,
            skills: validatedSkills,
            strengthStat: playerscharClassDatas.strengthStat,
            dexterityStat: playerscharClassDatas.dexterityStat,
            constitutionStat: playerscharClassDatas.constitutionStat,
            intelligenceStat: playerscharClassDatas.intelligenceStat,
            wisdomStat: playerscharClassDatas.wisdomStat,
            charismaStat: playerscharClassDatas.charismaStat,
            strModifier: playerscharClassDatas.strModifier,
            dexModifier: playerscharClassDatas.dexModifier,
            conModifier: playerscharClassDatas.conModifier,
            intModifier: playerscharClassDatas.intModifier,
            wisModifier: playerscharClassDatas.wisModifier,
            chaModifier: playerscharClassDatas.chaModifier,
        })
        // remise à 0 du formulaire
        setPlayerscharData({
            firstName: "",
            lastName: "",
            nickname: "",
            gender: "",
            age: 0,
            biography: "",
            physic: "",
            level: 0,
            speciesId: "",
        })
        setPlayerscharClassDatas("")
        setSelectedClass(null)
        setSpecies([])
        setSelectedSpecies(null)
        setSelectedSkills([])
        console.log(creation);
        alert('playerscharacter créée avec succés')
    } catch (error) {
        console.error(error);
        alert("Error while creating playerschar")
    }
}

  useEffect(() => {
    fetchGenreById();
    fetchSpecies();
    fetchClasses();
  }, []); 

  const genreName = genres[0]?.genreName;
  const inputColor = genreInputsColors[genreName] || "#D9D9D9";
  const buttonColor = genreButtonsColors[genreName] || "#D9D9D9";
  const textColor = genreTextColors[genreName] || "#D9D9D9";

  return (
    <>
      <form className="formPlayerschar"
      onSubmit={handleAddplayerschar}>
        <div className="selectClass">
            <label htmlFor="Classe du Personnage">Classe du Personnage</label>
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
                    style={{border: `1px solid ${buttonColor}`}}
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
                        <Button style={{ backgroundColor: buttonColor }}
                            onClick={handleValidateSkills}
                            className="creationButton"
                        >
                                Valider les compétences
                        </Button>
                    </div>
                </div>
            )}
        </div>

        <div className="selectSpecies">
            <label htmlFor="Espèces du Pnj">Espèces du Personnage</label>
            <Form.Select name="speciesId"
                onChange={(e) => {
                    const selectedSpeciesId = e.target.value;
                    const selected = getSpecies.find((spe) => spe.idSpecies.toString() === selectedSpeciesId);
                    setSelectedSpecies(selected);
                    setPlayerscharData({
                        ...playerscharDatas,
                        speciesId: selectedSpeciesId,
                    })
                }}
            >
                <option value="">
                Choisissez l'espèces du Personnage
                </option>
                {getSpecies.map((spe) => (
                <option key={spe.idSpecies} value={spe.idSpecies}>
                    {spe.speciesName}
                </option>
                ))}
            </Form.Select>
            {selectedSpecies && (
            <div className="speciesDetails"
                style={{border: `1px solid ${buttonColor}`}}
            >
              <h4>{selectedSpecies.speciesName}</h4>
              <p><strong>Description :</strong> {selectedSpecies.speciesDesc}</p>
              <p><strong>Vitesse :</strong> {selectedSpecies.speciesSpeed}</p>
            </div>
          )}
        </div>
        
        <div className="selectAbility">
          {selectedClass && selectedSpecies && (
            <div className="ability">
                <span>Caractéristiques :</span>
                <div className="abilities">
                    <div className="labelInput">
                        <label htmlFor="force">Force :</label>
                        <input
                            style={{ backgroundColor: inputColor, color: textColor }}
                            type="number"
                            min={0}
                            max={20}
                            value={playerscharClassDatas.strengthStat}
                            onChange={(e) =>
                            setPlayerscharClassDatas({
                                ...playerscharClassDatas,
                                strengthStat: e.target.value,
                            })
                            }
                            required
                        />
                    </div>
                    <div className="labelInput">
                        <label htmlFor="dextérité">Dextérité :</label>
                        <input
                            style={{ backgroundColor: inputColor, color: textColor }}
                            type="number"
                            min={0}
                            max={20}
                            value={playerscharClassDatas.dexterityStat}
                            onChange={(e) =>
                            setPlayerscharClassDatas({
                                ...playerscharClassDatas,
                                dexterityStat: e.target.value,
                            })
                            }
                            required
                        />
                    </div>
                    <div className="labelInput">
                        <label htmlFor="constitution">Constitution :</label>
                        <input
                            style={{ backgroundColor: inputColor, color: textColor }}
                            type="number"
                            min={0}
                            max={20}
                            value={playerscharClassDatas.constitutionStat}
                            onChange={(e) =>
                            setPlayerscharClassDatas({
                                ...playerscharClassDatas,
                                constitutionStat: e.target.value,
                            })
                            }
                            required
                        />
                    </div>
                    <div className="labelInput">
                        <label htmlFor="intelligence">Intelligence :</label>
                        <input
                            style={{ backgroundColor: inputColor, color: textColor }}
                            type="number"
                            min={0}
                            max={20}
                            value={playerscharClassDatas.intelligenceStat}
                            onChange={(e) =>
                            setPlayerscharClassDatas({
                                ...playerscharClassDatas,
                                intelligenceStat: e.target.value,
                            })
                            }
                            required
                        />
                    </div>
                    <div className="labelInput">
                        <label htmlFor="sagesse">Sagesse :</label>
                        <input
                            style={{ backgroundColor: inputColor, color: textColor }}
                            type="number"
                            min={0}
                            max={20}
                            value={playerscharClassDatas.wisdomStat}
                            onChange={(e) =>
                            setPlayerscharClassDatas({
                                ...playerscharClassDatas,
                                wisdomStat: e.target.value,
                            })
                            }
                            required
                        />
                    </div>
                    <div className="labelInput">
                        <label htmlFor="charisme">Charisme :</label>
                        <input
                            style={{ backgroundColor: inputColor, color: textColor }}
                            type="number"
                            min={0}
                            max={20}
                            value={playerscharClassDatas.charismaStat}
                            onChange={(e) =>
                            setPlayerscharClassDatas({
                                ...playerscharClassDatas,
                                charismaStat: e.target.value,
                            })
                            }
                            required
                        />
                    </div>
                </div>
                <div className="modifAbility">
                    <span>Modificateur de caractéristiques :</span>
                    <div className="abilities">
                        <div className="labelInput">
                            <label htmlFor="force">Force :</label>
                            <input
                                style={{ backgroundColor: inputColor, color: textColor }}
                                type="number"
                                min={-4}
                                max={5}
                                value={playerscharClassDatas.strModifier}
                                onChange={(e) =>
                                setPlayerscharClassDatas({
                                    ...playerscharClassDatas,
                                    strModifier: e.target.value,
                                })
                                }
                                required
                            />
                        </div>
                        <div className="labelInput">
                            <label htmlFor="dextérité">Dextérité :</label>
                            <input
                                style={{ backgroundColor: inputColor, color: textColor }}
                                type="number"
                                min={-4}
                                max={5}
                                value={playerscharClassDatas.dexModifier}
                                onChange={(e) =>
                                setPlayerscharClassDatas({
                                    ...playerscharClassDatas,
                                    dexModifier: e.target.value,
                                })
                                }
                                required
                            />
                        </div>
                        <div className="labelInput">
                            <label htmlFor="constitution">Constitution :</label>
                            <input
                                style={{ backgroundColor: inputColor, color: textColor }}
                                type="number"
                                min={-4}
                                max={5}
                                value={playerscharClassDatas.conModifier}
                                onChange={(e) =>
                                setPlayerscharClassDatas({
                                    ...playerscharClassDatas,
                                    conModifier: e.target.value,
                                })
                                }
                                required
                            />
                        </div>
                        <div className="labelInput">
                            <label htmlFor="intelligence">Intelligence :</label>
                            <input
                                style={{ backgroundColor: inputColor, color: textColor }}
                                type="number"
                                min={-4}
                                max={5}
                                value={playerscharClassDatas.intModifier}
                                onChange={(e) =>
                                setPlayerscharClassDatas({
                                    ...playerscharClassDatas,
                                    intModifier: e.target.value,
                                })
                                }
                                required
                            />
                        </div>
                        <div className="labelInput">
                            <label htmlFor="sagesse">Sagesse :</label>
                            <input
                                style={{ backgroundColor: inputColor, color: textColor }}
                                type="number"
                                min={-4}
                                max={5}
                                value={playerscharClassDatas.wisModifier}
                                onChange={(e) =>
                                setPlayerscharClassDatas({
                                    ...playerscharClassDatas,
                                    wisModifier: e.target.value,
                                })
                                }
                                required
                            />
                        </div>
                        <div className="labelInput">
                            <label htmlFor="charisme">Charisme :</label>
                            <input
                                style={{ backgroundColor: inputColor, color: textColor }}
                                type="number"
                                min={-4}
                                max={5}
                                value={playerscharClassDatas.chaModifier}
                                onChange={(e) =>
                                setPlayerscharClassDatas({
                                    ...playerscharClassDatas,
                                    chaModifier: e.target.value,
                                })
                                }
                                required
                            />
                        </div>
                    </div>
                </div>
            </div> 
            )}
        </div>  

        <div className="formInfosPlayerschar">
            <div className="identityPlayerschar">
            <label htmlFor="Prénom du Pnj">Prénom du Pnj :</label>
            <input
                className="namePlayerscharInput"
                style={{ backgroundColor: inputColor, color: textColor }}
                type="text"
                value={playerscharDatas.playerscharFirstName}
                onChange={(e) =>
                setPlayerscharData({
                    ...playerscharDatas,
                    firstName: e.target.value,
                })
                }
                required
            />
            <label htmlFor="Nom du Pnj">Nom du Pnj :</label>
            <input
                className="namePlayerscharInput"
                style={{ backgroundColor: inputColor, color: textColor }}
                type="text"
                value={playerscharDatas.playerscharLastName}
                onChange={(e) =>
                setPlayerscharData({
                    ...playerscharDatas,
                    lastName: e.target.value,
                })
                }
            />
            <label htmlFor="Surnom du Pnj">Surnom du Pnj :</label>
            <input
                className="namePlayerscharInput"
                style={{ backgroundColor: inputColor, color: textColor }}
                type="text"
                value={playerscharDatas.playerscharNickname}
                onChange={(e) =>
                setPlayerscharData({
                    ...playerscharDatas,
                    nickname: e.target.value,
                })
                }
            />
            </div>
            <div className="infosPlayerschar">
                <label htmlFor="Genre du Pnj">Genre du Pnj :</label>
                <input
                    className="infoPlayerscharInput"
                    style={{ backgroundColor: inputColor, color: textColor }}
                    type="text"
                    value={playerscharDatas.playerscharGender}
                    onChange={(e) =>
                    setPlayerscharData({
                        ...playerscharDatas,
                        gender: e.target.value,
                    })
                    }
                />
                <div className="agePlayerschar">
                    <label htmlFor="Age du Pnj">Age du Pnj :</label>
                    <input
                        style={{ backgroundColor: inputColor, color: textColor }}
                        type="number"
                        min={0}
                        value={playerscharDatas.playerscharAge}
                        onChange={(e) =>
                        setPlayerscharData({
                            ...playerscharDatas,
                            age: e.target.value,
                        })
                        } 
                        required
                    /> ans
                </div>
                <div className="agePlayerschar">
                    <label htmlFor="Level du Pnj">Level du Pnj :</label>
                    <input
                        style={{ backgroundColor: inputColor, color: textColor }}
                        type="number"
                        min={0}
                        value={playerscharDatas.playerscharLevel}
                        onChange={(e) =>
                        setPlayerscharData({
                            ...playerscharDatas,
                            level: e.target.value,
                        })
                        }
                        required
                    />
                </div>
            </div>
        </div>

        <div className="descriptionPlayerschar">
            <label htmlFor="Biographie du PNJ">Biographie du PNJ :</label>
            <Form.Control
                style={{
                backgroundColor: inputColor,
                border: "none",
                color: textColor,
                }}
                className="inputTextarea"
                as="textarea"
                aria-label="With textarea"
                value={playerscharDatas.playerscharBiography}
                onChange={(e) =>
                setPlayerscharData({
                    ...playerscharDatas,
                    biography: e.target.value,
                })
                }
            />
            <label htmlFor="Physique du PNJ">Physique du PNJ :</label>
            <Form.Control
                style={{
                backgroundColor: inputColor,
                border: "none",
                color: textColor,
                }}
                className="inputTextarea"
                as="textarea"
                aria-label="With textarea"
                value={playerscharDatas.playerscharPhysic}
                onChange={(e) =>
                setPlayerscharData({
                    ...playerscharDatas,
                    physic: e.target.value,
                })
                }
            />
        </div>
        
        <div className="buttonForm">
          <Button
            style={{ backgroundColor: buttonColor }}
            type="submit"
            className="creationButton"
          >
            Créer Pnj
          </Button>
        </div>

      </form>
    </>
    );
};

export default playerscharForm;
