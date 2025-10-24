import { useState } from "react";
import "../index.css";
import { Button } from "react-bootstrap";
import ReactBoxFlip from "react-box-flip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteClass } from "../Services/classServices";

const ClassCard = ({ idClass, className, classDesc, classPv, skills }) => {
  const [showText, setShowText] = useState(false);

  const truncate = (text, maxLength = 100) => {
    if (text && text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = async (idClass, userId) => {
    try {
      await deleteClass(idClass, userId);
      alert(`Player's character successfully deleted!`);
      location.reload();
    } catch (error) {
      console.error("Error while deleting players character", error);
      alert("error while deleting players character.");
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
            <h2>Classes</h2>
            <h3>{className}</h3>
            <span>Points de vie : {classPv}</span>
            <div className="skillsTable">
              <span>Compétences :</span>
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Abilité associée</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.filter((skill) => skill.skillsName).length > 0 ? (
                    skills.map((skill, index) => (
                      <tr key={index}>
                        <td>{skill.skillsName}</td>
                        <td>{skill.abilityName}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>Aucune compétence disponible</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
                <span className="sr-only">Modifier la classe' {className}</span>
                <FontAwesomeIcon icon={faPen} />
              </Button>
              <span>Recto</span>
              <Button
                className="trashButton"
                onClick={() => handleDelete(idClass)}
              >
                <span className="sr-only">Supprimer la classe {className}</span>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </div>
          </div>

          <div
            className="cardVerso"
            style={{ backgroundColor: "#212121", color: "#fff" }}
          >
            <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}>
              <span>{showText ? classDesc : truncate(classDesc)}</span>
              {classDesc.length > 100 && (
                <Button
                  onClick={() => setShowText(!showText)}
                  className="detailsButton"
                  style={{ backgroundColor: "#56656dff", color: "white" }}
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
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </Button>

            <span>Verso</span>
          </div>
        </ReactBoxFlip>
      </div>
    </>
  );
};

export default ClassCard;
