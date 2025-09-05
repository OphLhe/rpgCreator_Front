import "../Styles/weaponCard.css";
import { useEffect, useState } from "react";
import genreButtonsColors from "../Utils/genreButtonsColors";
import { Button } from "react-bootstrap";
import { weapon } from "../Services/weaponServices";
import genreTextColors from "../Utils/genreTextColors";
import genreInputsColors from "../Utils/genreInputsColors";


const WeaponCard = ({
  genre,
  weaponName,
  weaponType,
  weaponDesc,
  weaponEffects,
  weaponRange,
}) => {
  const [showText, setShowText] = useState(false);
  const [genres, setGenre] = useState([]);

  const truncate = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const fetchGenreById = async () => {
    try {
      const response = await weapon();
      setGenre(response.data);
      
    } catch (error) {
      console.error("error fetching genre by id", error);
    }
  };

  useEffect(() => {
    fetchGenreById();
  }, []);

  const genreName = genre

  const buttonColor = genreButtonsColors[genreName] || "#D9D9D9";
  const inputColor = genreInputsColors[genreName] || "#D9D9D9";
  const textColor = genreTextColors[genreName] || "#D9D9D9";

  return (
    <>
      <div className="weaponCard">
        <div
          className="weaponRecto"
          style={{ backgroundColor: inputColor, color: textColor }}
        >
          <h3>Arme</h3>
          <h4>{weaponName}</h4>
          <span>Type d'arme : {weaponType}</span>
          <span>Portée : {weaponRange}</span>
        </div>
        <div className="weaponVerso">
          <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}>
            <span>{showText ? weaponDesc : truncate(weaponDesc)}</span>
          </div>

          {weaponEffects ? (
            <span>Effets : {weaponEffects}</span>
          ) : (
            <span>Effets : Sans effets particulier</span>
          )}

          {weaponDesc.length > 50 && (
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

export default WeaponCard;
