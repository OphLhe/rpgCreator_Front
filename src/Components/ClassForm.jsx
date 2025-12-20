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
import { showPromiseToast, showErrorToast } from "../Utils/toastConfig";

const ClassForm = () => {
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

  const [classDatas, setClassData] = useState({
    className: "",
    classDesc: "",
    classPv: "",
  });

  // for skills.map in the select menu
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

  // to create an array with skills to add
  const tabSkills = () => {
    
    const skill = skills.find((s) => s.idSkills === parseInt(selectedSkillId));
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSelectedSkillId("");
    } else {
      alert("Cette compétences a déjà été ajoutée");
    }
  };

  //create a class then create classSkills with the skills associated to the created class
  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      await showPromiseToast(
        async () => {
          const response1 = await createClass(classDatas);
          const insertedId = response1.data.insertId;
          await classById(insertedId);
          const skillsIds = selectedSkills.map((skill) => skill.idSkills);
          await insertSkillsToClass({
            skillsIds,
            classId: insertedId,
          });
        },
        "item.createPending",
        "item.createSuccess",
        "item.createError"
      );
    } catch (error) {
      console.error(error);
      showErrorToast("item.createError");
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
      <form onSubmit={handleAddClass} className="formClass">
        <div className="infoClass">
          <label htmlFor="nom de la classe">Nom de la classe* :</label>
          <input className="nameClassInput"
            id="nom de la classe"
            style={{ border: `0.3rem solid ${buttonColor}`,  color: textColor }}
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
            Descritpion de la classe* :
          </label>
          <Form.Control
            style={{
              backgroundColor: inputColor,
              border: "none",
              color: textColor,
            }}
            id="description de l'espèce"
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
          <label htmlFor="distance">Point de Vie* :</label>
          <input
            id="distance"
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

        <div className="insertSkills">
          <Form.Select className="selectSkills"
            name="skillsId"
            value={selectedSkillId}
            onChange={(e) => setSelectedSkillId(e.target.value)}
          >
            <option value="">
              Choisissez les compétences dont dispose la classe*
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
                  <th>Nom de la compétence</th>
                  <th>Descritpion de la compétence</th>
                  <th>Caractéristique associée</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selectedSkills.map((skill) => (
                  <tr key={skill.idSkills}>
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
