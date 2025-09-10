import { useEffect, useState } from "react";
import "../Styles/propsForm.css";
import { genreById } from "../Services/genreServices";
import { useParams } from "react-router-dom";
import { Button, Form, FormControl } from "react-bootstrap";
import { createProps } from "../Services/propsServices";
import genreInputsColors from "../Utils/genreInputsColors";
import genreButtonsColors from "../Utils/genreButtonsColors";
import genreTextColors from "../Utils/genreTextColors";

const PropsForm = () => {
  const [genres, setGenre] = useState([]);
  const [propsDatas, setPropsData] = useState({
    propsName: "",
    propsDesc: "",
    propsEffect: "",
  });
  const { idGenre } = useParams();

  const handleAddProps = async (e) => {
    e.preventDefault();
    try {
      await createProps(idGenre, propsDatas);
      alert("Props created successfully");
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
        action="/addProps"
        onSubmit={handleAddProps}
        className="formProps"
      >
        <div className="infoProps">
          
            <div className="nameProps">
                <label htmlFor="nom du sort">Nom de l'artefact :</label>
                <input 
                    style={{ backgroundColor: inputColor, color: textColor }}
                    type="text"
                    value={propsDatas.propsName}
                    onChange={(e) =>
                    setPropsData({
                        ...propsDatas,
                        propsName: e.target.value,
                    })
                    }
                    required
                />
            </div>
         
          <label htmlFor="descritpion de l'arme">Descritpion de l'artefact :</label>
          <Form.Control
            style={{
              backgroundColor: inputColor,
              color: textColor,
              border: "none",
            }}
            className="inputTextarea"
            as="textarea"
            aria-label="With textarea"
            value={propsDatas.propsDesc}
            onChange={(e) =>
              setPropsData({
                ...propsDatas,
                propsDesc: e.target.value,
              })
            }
            required
          />

          <label htmlFor=" Effet de l'arme">Effet de l'artefact :</label>
          <FormControl
            className="inputTextarea"
            style={{
              backgroundColor: inputColor,
              color: textColor,
              border: "none",
            }}
            as="textarea"
            value={propsDatas.propsEffect}
            onChange={(e) =>
              setPropsData({
                ...propsDatas,
                propsEffect: e.target.value,
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
            Créer Artefact
          </Button>
        </div>
      </form>
    </>
  );
};

export default PropsForm;