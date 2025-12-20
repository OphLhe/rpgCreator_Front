import { useState } from "react";
import ReactBoxFlip from "react-box-flip";
import "../index.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteSpecies } from "../Services/speciesServices";
import { showErrorToast, showSuccessToast, showCustomError } from "../Utils/toastConfig";

const SpeciesCard = ({ idSpecies, speciesName, speciesDesc, speciesSpeed }) => {
  const [showText, setShowText] = useState(false);
  const truncate = (text, maxLength = 250) => {
    if (text && text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = async (idSpecies, userId) => {
    try {
      await deleteSpecies(idSpecies, userId);
      showSuccessToast("item.deleteSuccess");
      location.reload();
    } catch (error) {
      if(error.response.status === 403){
        showCustomError(error.response.data.message); 
      }else{
        console.error("Error while deleting species", error);
        showErrorToast("item.deleteError");
      }
    }
  };

  return (
    <>
      <div className="itemCard">
        <ReactBoxFlip isFlipped={isFlipped}>
          <div
            className="cardRecto"
            style={{ backgroundColor: "#212121", color: "#fff" }}
          >
            <h2>Espèces</h2>
            <h3>{speciesName}</h3>
            <span>Vitesse de déplacement : {speciesSpeed}</span>

            <Button
              onClick={handleFlip}
              className="flipButton"
              style={{ backgroundColor: "#fff", color: "black" }}
            >
              <span className="sr-only">Retourner la carte</span>
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </Button>

            <div className="cardFooter">
              <Button className="modifyButton">
                <span className="sr-only">Modifier l'espèces {speciesName}</span>
                <FontAwesomeIcon icon={faPen} />
              </Button>
              <span>Recto</span>
              <Button
                className="trashButton"
                onClick={() => handleDelete(idSpecies)}
              >
                <span className="sr-only">
                  Supprimer l'espèces {speciesName}
                </span>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </div>
            
          </div>

          <div
            className="cardVerso"
            style={{ backgroundColor: "#212121", color: "#fff" }}
          >
            <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}>
              <span>{showText ? speciesDesc : truncate(speciesDesc)}</span>
              {speciesDesc.length > 250 && (
                <Button
                  style={{
                    backgroundColor: "#56656dff",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => setShowText(!showText)}
                  className="detailsButton"
                >
                  {showText ? "Réduire" : "Détails"}
                </Button>
              )}
            </div>

            <Button
              onClick={handleFlip}
              className="flipButton"
              style={{ backgroundColor: "#fff", color: "black" }}
            >
              <span className="sr-only">Retourner la carte</span>
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </Button>
            <span>Verso</span>
          </div>
        </ReactBoxFlip>
      </div>
    </>
  );
};

export default SpeciesCard;
