import { useEffect, useState } from "react";
import ReactBoxFlip from "react-box-flip";
import "../index.css";
import { deleteStory, story } from "../Services/storyServices";
import genreButtonsColors from "../Utils/genreButtonsColors";
import genreInputsColors from "../Utils/genreInputsColors";
import genreTextColors from "../Utils/genreTextColors";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { showErrorToast, showSuccessToast } from "../Utils/toastConfig";

const StoryCard = ({
  idStory,
  genre,
  title,
  synopsis,
  creationDate,
  exposition,
  risingAction,
}) => {
  const [showText, setShowText] = useState(false);
  const truncate = (text, maxLength = 100) => {
    if (text && text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const [showOtherText, setShowOtherText] = useState(false);
  const truncateOther = (text, maxLength = 100) => {
    if (text && text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const [genres, setGenre] = useState([]);
  const fetchGenreById = async () => {
    try {
      const response = await story();
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

  const handleDelete = async (idStory, userId) => {
    try {
      await deleteStory(idStory, userId);
      showSuccessToast("item.deleteSuccess");
      location.reload();
    } catch (error) {
      console.error("Error while deleting players character", error);
      showErrorToast("item.deleteError");
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
            <h2>Quête</h2>
            <h3>{title}</h3>
            <span>Résumé : {synopsis}</span>
            <span>Date de création : {creationDate}</span>
            <Button
              onClick={handleFlip}
              className="flipButton"
              style={{ backgroundColor: buttonColor, color: textColor }}
            >
              <span className="sr-only">Retourner la carte</span>
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </Button>

            <div className="cardFooter">
              <Button className="modifyButton">
                <span className="sr-only">Modifier la quête {title}</span>
                <FontAwesomeIcon icon={faPen}/>
              </Button>
              <span>Recto</span>
              <Button
                className="trashButton"
                onClick={() => handleDelete(idStory)}
              >
                <span className="sr-only">Supprimer la quête {title}</span>
                <FontAwesomeIcon icon={faTrashCan}/>
              </Button>
            </div>

          </div>

          <div
            className="cardVerso"
            style={{ backgroundColor: inputColor, color: textColor }}
          >
            <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}>
              <span>{showText ? exposition : truncate(exposition)}</span>
              {exposition && exposition.length > 50 && (
                <Button
                  onClick={() => setShowText(!showText)}
                  className="detailsButton"
                  style={{ backgroundColor: buttonColor }}
                >
                  {showText ? "Réduire" : "Détails"}
                </Button>
              )}
            </div>

            <div
              className={`descSpan ${
                showOtherText ? "expanded" : "collapsed"
              } `}
            >
              <span>
                {showOtherText ? risingAction : truncateOther(risingAction)}
              </span>
              {risingAction && risingAction.length > 50 && (
                <Button
                  onClick={() => setShowOtherText(!showOtherText)}
                  className="detailsButton"
                  style={{ backgroundColor: buttonColor }}
                >
                  {showText ? "Réduire" : "Détails"}
                </Button>
              )}
            </div>

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

export default StoryCard;
