import { useEffect, useState } from "react";
import "../Styles/classForm.css";
import { genreById } from "../Services/genreServices";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { createClass } from "../Services/classServices";
import genreInputsColors from "../Utils/genreInputsColors";
import genreButtonsColors from "../Utils/genreButtonsColors";
import genreTextColors from "../Utils/genreTextColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getSkills } from "../Services/skillsServices";
import { insertSkillsToClass } from "../Services/classSkillsServices";
import { classById } from "../Services/classServices";

const ClassForm = () => {
  const { idGenre } = useParams();

  // Pour bannière header
  const [genres, setGenre] = useState([]);
  const fetchGenreById = async () => {
    try {
      const response = await genreById(idGenre);
      setGenre(response.data);
    } catch (error) {
      console.error("error fetching genre by id", error);
    }
  };

  const [classDatas, setClassData] = useState({
    className: "",
    classDesc: "",
    classPv: "",
    strengthStat: "",
    dexterityStat: "",
    constitutionStat: "",
    intelligenceStat: "",
    wisdomStat: "",
    charismaStat: "",
    strModifier: "",
    dexModifier: "",
    conModifier: "",
    intModifier: "",
    wisModifier: "",
    chaModifier: "",
  });

  // pour skills.map dans le form.select
  const [skills, setSkills] = useState([]);
  const fetchSkills = async () => {
    try {
      const res = await getSkills();
      setSkills(res.data);
    } catch (error) {
      console.error("error fetching skill", error);
    }
  };

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSkillId, setSelectedSkillId] = useState("");

  // crée un tableau avec les skills à ajouter
  const tabSkills = () => {
    // récupère l'id de skills et le transforme en texte
    const skill = skills.find((s) => s.idSkills === parseInt(selectedSkillId));
    //  s'il y a Id de skill et qu'il n'est pas déjà contenu dans le tableau selectedSkills
    if (skill && !selectedSkills.includes(skill)) {
      // on ajoute le skill en gardant en mémoire les précédents ajoutés
      setSelectedSkills([...selectedSkills, skill]);
      // remise à 0 du select
      setSelectedSkillId("");
    } else {
      alert("Cette compétences a déjà été ajoutée");
    }
  };

  // crée une class puis crée classSkills avec les skills associé à la class créée
  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      //création de la class avec infos dans form
      const response1 = await createClass(classDatas);
      // on récupère l'id généré à la création de la class
      const insertedId = response1.data.insertId;
      // on recherche la class par son id
      const res = await classById(insertedId);

      // on map les skills du tableau seledctedSkills afin de récupérer chaque id
      const skillsIds = selectedSkills.map((skill) => skill.idSkills);
      // ajout des skills sous forme de tableau à la class défini par son id
      const res2 = await insertSkillsToClass({
        skillsIds,
        classId: insertedId,
      });
      console.log(res2.data);
      alert("class created successfully");
    } catch (error) {
      console.error(error);
      alert("CPT");
    }
  };

  useEffect(() => {
    fetchGenreById();
    fetchSkills();
  }, [selectedSkills]);

  const genreName = genres[0]?.genreName;
  const inputColor = genreInputsColors[genreName] || "#D9D9D9";
  const buttonColor = genreButtonsColors[genreName] || "#D9D9D9";
  const textColor = genreTextColors[genreName] || "#D9D9D9";

  const removeSkill = (id) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill.idSkills !== id));
  };

  return (
    <>
      <form action="/addClass" onSubmit={handleAddClass} className="formClass">
        <div className="infoClass">
          <label htmlFor="nom de la classe">Nom de la classe :</label>
          <input
            className="nameClassInput"
            style={{ backgroundColor: inputColor, color: textColor }}
            type="text"
            value={classDatas.className}
            onChange={(e) =>
              setClassData({
                ...classDatas,
                className: e.target.value,
              })
            }
            required
          />
          <label htmlFor="descritpion de l'espèce">
            Descritpion de la classe :
          </label>
          <Form.Control
            style={{
              backgroundColor: inputColor,
              border: "none",
              color: textColor,
            }}
            className="inputTextarea"
            as="textarea"
            aria-label="With textarea"
            value={classDatas.classDesc}
            onChange={(e) =>
              setClassData({
                ...classDatas,
                classDesc: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="pv">
          <label htmlFor="distance">Point de Vie :</label>
          <input
            style={{ backgroundColor: inputColor, color: textColor }}
            type="number"
            value={classDatas.classSpeed}
            onChange={(e) =>
              setClassData({
                ...classDatas,
                classPv: e.target.value,
              })
            }
            required
          />
        </div>

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
                value={classDatas.strengthStat}
                onChange={(e) =>
                  setClassData({
                    ...classDatas,
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
                value={classDatas.dexterityStat}
                onChange={(e) =>
                  setClassData({
                    ...classDatas,
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
                value={classDatas.constitutionStat}
                onChange={(e) =>
                  setClassData({
                    ...classDatas,
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
                value={classDatas.intelligenceStat}
                onChange={(e) =>
                  setClassData({
                    ...classDatas,
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
                value={classDatas.wisdomStat}
                onChange={(e) =>
                  setClassData({
                    ...classDatas,
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
                value={classDatas.charismaStat}
                onChange={(e) =>
                  setClassData({
                    ...classDatas,
                    charismaStat: e.target.value,
                  })
                }
                required
              />
            </div>
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
                value={classDatas.strModifier}
                onChange={(e) =>
                  setClassData({
                    ...classDatas,
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
                value={classDatas.dexModifier}
                onChange={(e) =>
                  setClassData({
                    ...classDatas,
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
                value={classDatas.conModifier}
                onChange={(e) =>
                  setClassData({
                    ...classDatas,
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
                value={classDatas.intModifier}
                onChange={(e) =>
                  setClassData({
                    ...classDatas,
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
                value={classDatas.wisModifier}
                onChange={(e) =>
                  setClassData({
                    ...classDatas,
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
                value={classDatas.chaModifier}
                onChange={(e) =>
                  setClassData({
                    ...classDatas,
                    chaModifier: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
        </div>

        <div className="insertSkills">
          <Form.Select
            className="selectSkills"
            name="skillsId"
            value={selectedSkillId}
            onChange={(e) => setSelectedSkillId(e.target.value)}
          >
            <option value="">
              Choisissez les compétences dont dispose la classe
            </option>
            {skills.map((skill) => (
              <option key={skill.idSkills} value={skill.idSkills}>
                {skill.skillsName}
              </option>
            ))}
          </Form.Select>
          <Button
            onClick={tabSkills}
            style={{ backgroundColor: buttonColor, border: "none" }}
            className="addSkills"
          >
            <FontAwesomeIcon icon={faCirclePlus} size="lg" />
          </Button>
        </div>

        <div className="tabSkills">
          {selectedSkills.length > 0 && (
            <table className="tableSkills table-bordered mt-3">
              <thead>
                <tr>
                  <th>Id de la compétence</th>
                  <th>Nom de la compétence</th>
                  <th>Descritpion de la compétence</th>
                  <th>Caractéristique associée</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selectedSkills.map((skill) => (
                  <tr key={skill.idSkills}>
                    <td>{skill.idSkills}</td>
                    <td>{skill.skillsName}</td>
                    <td>{skill.skillsDesc}</td>
                    <td>{skill.abilityName}</td>
                    <td>
                      <div
                        className="eraseIcon"
                        onClick={() => removeSkill(skill.idSkills)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="buttonForm">
          <Button
            style={{ backgroundColor: buttonColor }}
            type="submit"
            className="creationButton"
          >
            Créer Classe
          </Button>
        </div>
      </form>
    </>
  );
};

export default ClassForm;
