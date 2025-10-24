import { useEffect, useState } from "react";
import ReactBoxFlip from "react-box-flip";
import "../index.css";
import genreButtonsColors from "../Utils/genreButtonsColors";
import { Button } from "react-bootstrap";
import { deleteWeapon, weapon } from "../Services/weaponServices";
import genreTextColors from "../Utils/genreTextColors";
import genreInputsColors from "../Utils/genreInputsColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const WeaponCard = ({
  idWeapon,
  genre,
  weaponName,
  weaponType,
  weaponDesc,
  weaponEffects,
  weaponRange,
}) => {
  const [showText, setShowText] = useState(false);
  const truncate = (text, maxLength = 50) => {
    if (!text) return "Aucune description";
    return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
  };

  const [showOtherText, setShowOtherText] = useState(false);
  const truncateOther = (text, maxLength = 50) => {
    if (text && text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const [genres, setGenre] = useState([]);
  const fetchGenreById = async () => {
    try {
      const response = await weapon();
      setGenre(response.data);
    } catch (error) {
      console.error("error fetching genre by id", error);
    }
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    fetchGenreById();
  }, []);

  const handleDelete = async (idWeapon, userId) => {
    try {
      await deleteWeapon(idWeapon, userId);
      alert(`Player's character successfully deleted!`);
      location.reload();
    } catch (error) {
      console.error("Error while deleting players character", error);
      alert("error while deleting players character.");
    }
  };

  const genreName = genre;

  const buttonColor = genreButtonsColors[genreName] || "#D9D9D9";
  const inputColor = genreInputsColors[genreName] || "#D9D9D9";
  const textColor = genreTextColors[genreName] || "#D9D9D9";

  return (
    <>
      <div className="itemCard">
        <ReactBoxFlip isFlipped={isFlipped}>
          <div
            className="cardRecto"
            style={{ backgroundColor: inputColor, color: textColor }}
          >
            <h2>Arme</h2>
            <h3>{weaponName}</h3>
            <span>Type d'arme : {weaponType}</span>
            <span>Portée : {weaponRange}</span>

            <Button
              onClick={handleFlip}
              className="flipButton"
              style={{ backgroundColor: buttonColor }}
            >
              <span className="sr-only">Retourner la carte</span>
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </Button>
            <div className="cardFooter">
              <Button className="modifyButton">
                <span className="sr-only">Modifier l'arme {weaponName}</span>
                <FontAwesomeIcon icon={faPen} />
              </Button>
              <span>Recto</span>
              <Button
                className="trashButton"
                onClick={() => handleDelete(idWeapon)}
              >
                <span className="sr-only">Supprimer l'arme {weaponName}</span>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </div>
          </div>

          <div
            className="cardVerso"
            style={{ backgroundColor: inputColor, color: textColor }}
          >
            <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}>
              <span>
                {showText
                  ? weaponDesc
                  : weaponDesc
                  ? truncate(weaponDesc)
                  : "Aucune description"}
              </span>
              {weaponDesc && weaponDesc.length > 50 && (
                <Button
                  onClick={() => setShowText(!showText)}
                  className="detailsButton"
                  style={{ backgroundColor: buttonColor }}
                >
                  {showText ? "Réduire" : "Détails"}
                </Button>
              )}
            </div>

            {weaponEffects ? (
              <div
                className={`descSpan ${
                  showOtherText ? "expanded" : "collapsed"
                } `}
              >
                <span>
                  Effets :{" "}
                  {showOtherText ? weaponEffects : truncateOther(weaponEffects)}
                </span>
                {weaponEffects && weaponEffects.length > 50 && (
                  <Button
                    onClick={() => setShowOtherText(!showOtherText)}
                    className="detailsButton"
                    style={{ backgroundColor: buttonColor }}
                  >
                    {showOtherText ? "Réduire" : "Détails"}
                  </Button>
                )}
              </div>
            ) : (
              <span>Effets : Sans effets particulier</span>
            )}

            <Button
              onClick={handleFlip}
              className="flipButton"
              style={{ backgroundColor: buttonColor }}
            >
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </Button>
            <span>Verso</span>
          </div>
        </ReactBoxFlip>
      </div>
    </>
  );
};

export default WeaponCard;
