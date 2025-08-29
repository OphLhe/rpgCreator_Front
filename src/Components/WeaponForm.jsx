import { useEffect, useState } from "react";
import "../Styles/weaponForm.css";
import { genreById } from "../Services/genreServices";
import { useParams } from "react-router-dom";
import { Button, Form, FormControl } from "react-bootstrap";
import { createWeapon } from "../Services/weaponServices";
import genreInputsColors from "../Utils/genreInputsColors";
import genreButtonsColors from "../Utils/genreButtonsColors";
import genreTextColors from "../Utils/genreTextColors";

const WeaponForm = () => {
  const [genres, setGenre] = useState([]);
  const [weaponDatas, setWeaponData] = useState({
    weaponName: "",
    weaponType: "",
    weaponDesc: "",
    weaponEffect: "",
    weaponRange: "",
  });
  const { idGenre } = useParams();

  const handleAddWeapon = async (e) => {
    e.preventDefault();
    try {
      await createWeapon(idGenre, weaponDatas);
      alert("weapon created successfully");
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
        action="/addWeapon"
        onSubmit={handleAddWeapon}
        className="formWeapon"
      >
        <div className="infoWeapon">

          <label htmlFor="nom de l'arme">Nom de l'arme :</label>
          <input className="nameWeapon"
            style={{ backgroundColor: inputColor, color: textColor }}
            type="text"
            value={weaponDatas.weaponName}
            onChange={(e) =>
              setWeaponData({
                ...weaponDatas,
                weaponName: e.target.value,
              })
            }
            required
          />

          <div className="typeRangeWeapon">
            <div className="typeWeapon">
              <label htmlFor="Type d'arme">Type d'arme :</label>
              <input
                style={{ backgroundColor: inputColor, color: textColor }}
                type="text"
                value={weaponDatas.weaponType}
                onChange={(e) =>
                  setWeaponData({
                    ...weaponDatas,
                    weaponType: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="rangeWeapon">
              <label htmlFor="portée de l'arme">Portée de l'arme :</label>
              <input
                style={{ backgroundColor: inputColor, color: textColor }}
                type="text"
                value={weaponDatas.weaponRange}
                onChange={(e) =>
                  setWeaponData({
                    ...weaponDatas,
                    weaponRange: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <label htmlFor="descritpion de l'arme">Descritpion de l'arme :</label>
          <Form.Control
            style={{
              backgroundColor: inputColor,
              color: textColor,
              border: "none",
            }}
            className="inputTextarea"
            as="textarea"
            aria-label="With textarea"
            value={weaponDatas.weaponDesc}
            onChange={(e) =>
              setWeaponData({
                ...weaponDatas,
                weaponDesc: e.target.value,
              })
            }
            required
          />

          <label htmlFor=" Effet de l'arme">Effet de l'arme :</label>
          <FormControl
            className="inputTextarea"
            style={{
              backgroundColor: inputColor,
              color: textColor,
              border: "none",
            }}
            as="textarea"
            value={weaponDatas.weaponEffects}
            onChange={(e) =>
              setWeaponData({
                ...weaponDatas,
                weaponEffects: e.target.value,
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
            Créer Arme
          </Button>
        </div>
      </form>
    </>
  );
};

export default WeaponForm;
