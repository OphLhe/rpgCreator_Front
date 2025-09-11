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
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const ClassForm = () => {
  const [genres, setGenre] = useState([]);
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
  const { idGenre } = useParams();

  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      await createClass(classDatas);
      alert("class created successfully");
    } catch (error) {
      console.error(error);
      alert("CPT");
    }
  };

  const fetchGenreById = async () => {
    try {
      const response = await genreById(idGenre);
      setGenre(response.data);
    } catch (error) {
      console.error("error fetching genre by id", error);
    }
  };

  useEffect(() => {
    fetchGenreById();
  }, []);

  const genreName = genres[0]?.genreName;
  const inputColor = genreInputsColors[genreName] || "#D9D9D9";
  const buttonColor = genreButtonsColors[genreName] || "#D9D9D9";
  const textColor = genreTextColors[genreName] || "#D9D9D9";
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
          name="abilityId"
          required
        >
          <option value="">
            Choisissez l'abilité correspondante à la compétence
          </option>
        </Form.Select>
        <Button 
          style={{backgroundColor: buttonColor,
            border:'none'}}
          className="addSkills"> 
          <FontAwesomeIcon icon={faCirclePlus} size="lg"/>
        </Button>
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
