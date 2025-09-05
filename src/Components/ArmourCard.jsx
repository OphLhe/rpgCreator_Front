import { useEffect, useState } from "react";
import "../Styles/armourCard.css";
import genreButtonsColors from "../Utils/genreButtonsColors";
import { Button } from "react-bootstrap";
import { armour } from "../Services/armourServices";
import genreTextColors from "../Utils/genreTextColors";
import genreInputsColors from "../Utils/genreInputsColors";

const ArrmourCard = ({ genre, armourName, armourDesc, armourClass, armourEffect }) => {
  const [showText, setShowText] = useState(false);
  const [genres, setGenre] = useState([]);

  const truncate = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const fetchGenreById = async () => {
    try {
      const response = await armour();
      setGenre(response.data);
    } catch (error) {
      console.error("error fetching genre by id", error);
    }
  };

  useEffect(() => {
    fetchGenreById();
  }, []);

  const genreName = genre;
  
  const buttonColor = genreButtonsColors[genreName] || "#D9D9D9";
  const inputColor = genreInputsColors[genreName] || "#D9D9D9";
  const textColor = genreTextColors[genreName] || "#D9D9D9";

  return (
    <>
      <div className="armourCard">
        <div className="armourRecto"
        style={{backgroundColor: inputColor, color:textColor}}
        >
          <h3>Armure</h3>
          <h4>{armourName}</h4>
          <span>Classe d'armure : {armourClass}</span>
        </div>
        <div className="armourVerso">
           <div className={`descSpan ${showText? "expanded":"collapsed"} `}>
            <span>{showText ? armourDesc : truncate(armourDesc)}</span>
          </div>
          
          {armourEffect ? (
            <span>Effets : {armourEffect}</span>
          ) : (
            <span>Effets : Sans effets particulier</span>
          )}

          {armourDesc.length > 50 && (
            <Button
              onClick={() => setShowText(!showText)}
              className="detailsButton"
              style={{ backgroundColor: buttonColor }}
            >
              {showText ? "Réduire" : "Détails"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ArrmourCard;
