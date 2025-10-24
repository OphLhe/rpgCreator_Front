import { useEffect, useState } from "react";
import { useParams } from "react-router";
import genreInputsColors from "../Utils/genreInputsColors";
import genreButtonsColors from "../Utils/genreButtonsColors";
import genreTextColors from "../Utils/genreTextColors";
import { genreById } from "../Services/genreServices";
import "../Styles/NPCForm.css";
import { Button, Form } from "react-bootstrap";
import { species } from "../Services/speciesServices";
import { classWithSkills} from "../Services/classSkillsServices";
import { createNpc, npcById } from "../Services/npcServices";
import { addClassToNpc } from "../Services/npcClassServices";

const NPCForm = () => {
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

  const [npcDatas, setNpcData] = useState({
    npcFirstName: "",
    npcLastName: "",
    npcNickname: "",
    npcGender: "",
    npcAge: 0,
    npcBiography: "",
    npcPhysic: "",
    npcLevel: 0,
    speciesId: "",
  });

  const [npcClassDatas, setNpcClassDatas] = useState({
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

const handleAddNpc = async (e) => {
    e.preventDefault()

    if (!selectedClass || !selectedSpecies) {
        alert("Veuillez sélectionner une classe et une espèce pour le PNJ.");
        return;
    }

    try {
        // création pnj et récupération de son id
        const response = await createNpc(npcDatas)
        const insertedId = response.data.insertId
        await npcById(insertedId)
        
        // ajout de la classe au pnj avec nouvelles skills choisies
        const creation = await addClassToNpc({
            npcId: insertedId,
            speciesId:selectedSpecies.idSpecies,
            classId: selectedClass.idClass,
            skills: validatedSkills,
            strengthStat: npcClassDatas.strengthStat,
            dexterityStat: npcClassDatas.dexterityStat,
            constitutionStat: npcClassDatas.constitutionStat,
            intelligenceStat: npcClassDatas.intelligenceStat,
            wisdomStat: npcClassDatas.wisdomStat,
            charismaStat: npcClassDatas.charismaStat,
            strModifier: npcClassDatas.strModifier,
            dexModifier: npcClassDatas.dexModifier,
            conModifier: npcClassDatas.conModifier,
            intModifier: npcClassDatas.intModifier,
            wisModifier: npcClassDatas.wisModifier,
            chaModifier: npcClassDatas.chaModifier,
        })
        // remise à 0 du formulaire
        setNpcData({
            npcFirstname: "",
            npcLastname: "",
            npcNickname: "",
            npcGender: "",
            npcAge: 0,
            npcBiography: "",
            npcPhysic: "",
            npcLevel: 0,
            speciesId: "",
        })
        setNpcClassDatas("")
        setSelectedClass(null)
        setSpecies([])
        setSelectedSpecies(null)
        setSelectedSkills([])
        console.log(creation);
        alert('Npc créée avec succés')
    } catch (error) {
        console.error(error);
        alert("Error while creating Npc")
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
      <form className="formNpc"
      onSubmit={handleAddNpc}>
        <div className="selectClass">
            <label htmlFor="Classe du Pnj">Classe du Pnj</label>
            <Form.Select
                id="Classe du Pnj"
                onChange={handleClassChange}
                value={selectedClass ? selectedClass.idClass: ""}
            >
                <option value="">
                Choisissez la classe du PNJ
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
            <label htmlFor="Espèces du Pnj">Espèces du Pnj</label>
            <Form.Select name="speciesId"
                onChange={(e) => {
                    const selectedSpeciesId = e.target.value;
                    const selected = getSpecies.find((spe) => spe.idSpecies.toString() === selectedSpeciesId);
                    setSelectedSpecies(selected);
                    setNpcData({
                        ...npcDatas,
                        speciesId: selectedSpeciesId,
                    })
                }}
            >
                <option value="">
                Choisissez l'espèces du PNJ
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
                            value={npcClassDatas.strengthStat}
                            onChange={(e) =>
                            setNpcClassDatas({
                                ...npcClassDatas,
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
                            value={npcClassDatas.dexterityStat}
                            onChange={(e) =>
                            setNpcClassDatas({
                                ...npcClassDatas,
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
                            value={npcClassDatas.constitutionStat}
                            onChange={(e) =>
                            setNpcClassDatas({
                                ...npcClassDatas,
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
                            value={npcClassDatas.intelligenceStat}
                            onChange={(e) =>
                            setNpcClassDatas({
                                ...npcClassDatas,
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
                            value={npcClassDatas.wisdomStat}
                            onChange={(e) =>
                            setNpcClassDatas({
                                ...npcClassDatas,
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
                            value={npcClassDatas.charismaStat}
                            onChange={(e) =>
                            setNpcClassDatas({
                                ...npcClassDatas,
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
                                value={npcClassDatas.strModifier}
                                onChange={(e) =>
                                setNpcClassDatas({
                                    ...npcClassDatas,
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
                                value={npcClassDatas.dexModifier}
                                onChange={(e) =>
                                setNpcClassDatas({
                                    ...npcClassDatas,
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
                                value={npcClassDatas.conModifier}
                                onChange={(e) =>
                                setNpcClassDatas({
                                    ...npcClassDatas,
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
                                value={npcClassDatas.intModifier}
                                onChange={(e) =>
                                setNpcClassDatas({
                                    ...npcClassDatas,
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
                                value={npcClassDatas.wisModifier}
                                onChange={(e) =>
                                setNpcClassDatas({
                                    ...npcClassDatas,
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
                                value={npcClassDatas.chaModifier}
                                onChange={(e) =>
                                setNpcClassDatas({
                                    ...npcClassDatas,
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

        <div className="formInfosNpc">
            <div className="identityNpc">
            <label htmlFor="Prénom du Pnj">Prénom du Pnj :</label>
            <input
                className="nameNpcInput"
                style={{ backgroundColor: inputColor, color: textColor }}
                type="text"
                value={npcDatas.npcFirstName}
                onChange={(e) =>
                setNpcData({
                    ...npcDatas,
                    npcFirstName: e.target.value,
                })
                }
                required
            />
            <label htmlFor="Nom du Pnj">Nom du Pnj :</label>
            <input
                className="nameNpcInput"
                style={{ backgroundColor: inputColor, color: textColor }}
                type="text"
                value={npcDatas.npcLastName}
                onChange={(e) =>
                setNpcData({
                    ...npcDatas,
                    npcLastName: e.target.value,
                })
                }
            />
            <label htmlFor="Surnom du Pnj">Surnom du Pnj :</label>
            <input
                className="nameNpcInput"
                style={{ backgroundColor: inputColor, color: textColor }}
                type="text"
                value={npcDatas.npcNickname}
                onChange={(e) =>
                setNpcData({
                    ...npcDatas,
                    npcNickname: e.target.value,
                })
                }
            />
            </div>
            <div className="infosNpc">
                <label htmlFor="Genre du Pnj">Genre du Pnj :</label>
                <input
                    className="infoNpcInput"
                    style={{ backgroundColor: inputColor, color: textColor }}
                    type="text"
                    value={npcDatas.npcGender}
                    onChange={(e) =>
                    setNpcData({
                        ...npcDatas,
                        npcGender: e.target.value,
                    })
                    }
                />
                <div className="ageNpc">
                    <label htmlFor="Age du Pnj">Age du Pnj :</label>
                    <input
                        style={{ backgroundColor: inputColor, color: textColor }}
                        type="number"
                        min={0}
                        value={npcDatas.npcAge}
                        onChange={(e) =>
                        setNpcData({
                            ...npcDatas,
                            npcAge: e.target.value,
                        })
                        } 
                    /> ans
                </div>
                <div className="ageNpc">
                    <label htmlFor="Level du Pnj">Level du Pnj :</label>
                    <input
                        style={{ backgroundColor: inputColor, color: textColor }}
                        type="number"
                        min={0}
                        value={npcDatas.npcLevel}
                        onChange={(e) =>
                        setNpcData({
                            ...npcDatas,
                            npcLevel: e.target.value,
                        })
                        }
                        required
                    />
                </div>
            </div>
        </div>

        <div className="descriptionNpc">
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
                value={npcDatas.npcBiography}
                onChange={(e) =>
                setNpcData({
                    ...npcDatas,
                    npcBiography: e.target.value,
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
                value={npcDatas.npcPhysic}
                onChange={(e) =>
                setNpcData({
                    ...npcDatas,
                    npcPhysic: e.target.value,
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

export default NPCForm;
