import { useEffect, useState } from "react";
import "../Styles/skillsForm.css";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { genreById } from "../Services/genreServices";
import { createSkills } from "../Services/skillsServices";
import { ability } from "../Services/abilityServices";
import genreInputsColors from "../Utils/genreInputsColors";
import genreButtonsColors from "../Utils/genreButtonsColors";
import genreTextColors from "../Utils/genreTextColors";

const SkillsForm = () => {
  const { idGenre } = useParams();

  const [skillsDatas, setSkillsData] = useState({
    skillsName: "",
    skillsDesc: "",
    abilityId: "",
  });
  const handleAddSkills = async (e) => {
    e.preventDefault();
    try {
      await createSkills(skillsDatas);
      alert("Skills created successfully");
    } catch (error) {
      console.error(error);
      alert("CPT");
    }
  };

  const [genres, setGenre] = useState([]);
  const fetchGenreById = async () => {
    try {
      const response = await genreById(idGenre);
      setGenre(response.data);
    } catch (error) {
      console.error("error fetching genre by id", error);
    }
  };

  const [abilities, setAbility] = useState([]);
  const fetchAbility = async () => {
    try {
      const response = await ability();
      setAbility(response.data);
    } catch (error) {
      console.error("error fetching ability", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSkillsData({
      ...skillsDatas,
      [name]: value, 
    });
    console.log(value);
    
  };

  useEffect(() => {
    fetchGenreById();
    fetchAbility();
  }, []);

  const genreName = genres[0]?.genreName;
  const inputColor = genreInputsColors[genreName] || "#D9D9D9";
  const buttonColor = genreButtonsColors[genreName] || "#D9D9D9";
  const textColor = genreTextColors[genreName] || "#D9D9D9";

  return (
    <>
      <form
        action="/addSkills"
        onSubmit={handleAddSkills}
        className="formSkills"
      >
        <div className="infoSkills">
          <div className="nameSkills">
            <label htmlFor="nom du sort">Nom de la compétence :</label>
            <input
              style={{ backgroundColor: inputColor, color: textColor }}
              type="text"
              value={skillsDatas.skillsName}
              onChange={(e) =>
                setSkillsData({
                  ...skillsDatas,
                  skillsName: e.target.value,
                })
              }
              required
            />
          </div>

          <label htmlFor="descritpion de l'arme">
            Descritpion de la compétence :
          </label>
          <Form.Control
            style={{
              backgroundColor: inputColor,
              color: textColor,
              border: "none",
            }}
            className="inputTextarea"
            as="textarea"
            aria-label="With textarea"
            value={skillsDatas.skillsDesc}
            onChange={(e) =>
              setSkillsData({
                ...skillsDatas,
                skillsDesc: e.target.value,
              })
            }
            required
          />
          <Form.Select
            className="selectAbility"
            name="abilityId"
            onChange={handleChange}
            value={skillsDatas.abilityId}
            required
          >
            <option value="">
              Choisissez l'abilité correspondante à la compétence
            </option>
            {abilities.map((ab) => (
              <option key={ab.idAbility} value={ab.idAbility}>
                {ab.abilityName}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="buttonForm">
          <Button
            style={{ backgroundColor: buttonColor }}
            type="submit"
            className="creationButton"
          >
            Créer Compétences
          </Button>
        </div>
      </form>
    </>
  );
};

export default SkillsForm;
