import { useEffect, useState } from "react";
import "../Styles/spellsForm.css";
import { genreById } from "../Services/genreServices";
import { useParams } from "react-router-dom";
import { Button, Form, FormControl } from "react-bootstrap";
import { createSpells } from "../Services/spellsServices";
import genreInputsColors from "../Utils/genreInputsColors";
import genreButtonsColors from "../Utils/genreButtonsColors";
import genreTextColors from "../Utils/genreTextColors";

const SpellsForm = () => {
  const [genres, setGenre] = useState([]);
  const [spellsDatas, setSpellsData] = useState({
    spellsName: "",
    spellsDesc: "",
    spellsEffects: "",
    spellsRange: "",
  });
  const { idGenre } = useParams();

  const handleAddSpells = async (e) => {
    e.preventDefault();
    try {
      await createSpells(idGenre, spellsDatas);
      alert("Spells created successfully");
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
      <form
        action="/addSpells"
        onSubmit={handleAddSpells}
        className="formSpells"
      >
        <div className="infoSpells">
          <div className="nameRangeSpells">
            <div className="nameSpells">
                <label htmlFor="nom du sort">Nom du sort :</label>
                <input 
                    style={{ backgroundColor: inputColor, color: textColor }}
                    type="text"
                    value={spellsDatas.spellsName}
                    onChange={(e) =>
                    setSpellsData({
                        ...spellsDatas,
                        spellsName: e.target.value,
                    })
                    }
                    required
                />
            </div>
            <div className="rangeSpells">
              <label htmlFor="portée de l'arme">Portée du sort :</label>
              <input
                style={{ backgroundColor: inputColor, color: textColor }}
                type="text"
                value={spellsDatas.spellsRange}
                onChange={(e) =>
                  setSpellsData({
                    ...spellsDatas,
                    spellsRange: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <label htmlFor="descritpion de l'arme">Descritpion du sort :</label>
          <Form.Control
            style={{
              backgroundColor: inputColor,
              color: textColor,
              border: "none",
            }}
            className="inputTextarea"
            as="textarea"
            aria-label="With textarea"
            value={spellsDatas.spellsDesc}
            onChange={(e) =>
              setSpellsData({
                ...spellsDatas,
                spellsDesc: e.target.value,
              })
            }
            required
          />

          <label htmlFor=" Effet de l'arme">Effet du sort :</label>
          <FormControl
            className="inputTextarea"
            style={{
              backgroundColor: inputColor,
              color: textColor,
              border: "none",
            }}
            as="textarea"
            value={spellsDatas.spellsEffects}
            onChange={(e) =>
              setSpellsData({
                ...spellsDatas,
                spellsEffects: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="buttonForm">
          <Button
            style={{ backgroundColor: buttonColor }}
            type="submit"
            className="creationButton"
          >
            Créer Sort
          </Button>
        </div>
      </form>
    </>
  );
};

export default SpellsForm;