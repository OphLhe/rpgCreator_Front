import { useEffect, useState } from "react";
import ReactBoxFlip from "react-box-flip";
import "../index.css";
import genreButtonsColors from "../Utils/genreButtonsColors";
import { Button, Form, FormLabel } from "react-bootstrap";
import { armour, deleteArmour, updateArmour } from "../Services/armourServices";
import genreTextColors from "../Utils/genreTextColors";
import genreInputsColors from "../Utils/genreInputsColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRotateLeft, faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { showSuccessToast, showErrorToast } from "../Utils/toastConfig";

const ArmourCard = ({
  idArmour,
  genre,
  armourName: initialArmourName,
  armourDesc: initialArmourDesc,
  armourClass: initialArmourClass,
  armourEffect: initialArmourEffect,
  fetchGetArmour,
}) => {
  const [genres, setGenre] = useState([]);
  const fetchGenreById = async () => {
    try {
      const response = await armour();
      setGenre(response.data);
    } catch (error) {
      console.error("error fetching genre by id", error);
    }
  };

  const [showText, setShowText] = useState(false);
  const truncate = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const [showOtherText, setShowOtherText] = useState(false);
  const truncateOther = (text, maxLength = 100) => {
    if (text && text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = async (idArmour, userId) => {
    try {
      await deleteArmour(idArmour, userId);
      showSuccessToast('item.deleteSuccess');
      handleClose();
      location.reload();
    } catch (error) {
        console.error("Error while deleting armour", error);
        showErrorToast('item.deleteError');
      }
    }

  const [localArmour, setLocalArmour] = useState({
    armourName: initialArmourName,
    armourDesc: initialArmourDesc,
    armourClass: initialArmourClass,
    armourEffect: initialArmourEffect,
  });

  const [armourDatas, setArmourData] = useState({
    armourName: initialArmourName,
    armourDesc: initialArmourDesc,
    armourClass: initialArmourClass,
    armourEffect: initialArmourEffect,
  });
  
  const handleUpdate = async (idArmour, userId) => {
    try {
      const response = await updateArmour(idArmour, userId, armourDatas);
      const updatedArmour = response.data;
      setLocalArmour({
        armourName: updatedArmour.armourName,
        armourDesc: updatedArmour.armourDesc,
        armourClass: updatedArmour.armourClass,
        armourEffect: updatedArmour.armourEffect,
      });
      showSuccessToast('item.updateSuccess');
      handleCloseModify();
      fetchGetArmour();
    } catch (error) {
      console.error("Error while updating armour");
      showErrorToast('item.updateError');
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModify, setShowModify] = useState(false);
  const handleCloseModify = () => setShowModify(false);
  const handleShowModify = () => setShowModify(true);

  useEffect(() => {
    fetchGenreById();
  }, []);

  const genreName = genre;

  const buttonColor = genreButtonsColors[genreName] || "#D9D9D9";
  const inputColor = genreInputsColors[genreName] || "#D9D9D9";
  const textColor = genreTextColors[genreName] || "#D9D9D9";

  return (
    <>
      <div className="itemCard">
        <ReactBoxFlip isFlipped={isFlipped}>

          <div className="cardRecto"
            style={{ backgroundColor: inputColor, color: textColor }}
          >
            <h2>Armure</h2>
            <h3>{localArmour.armourName}</h3>
            <span>Classe d'armure : {localArmour.armourClass}</span>

            <Button
              className="flipButton"
              onClick={handleFlip}
              style={{ backgroundColor: buttonColor, color: textColor }}
            >
              <span className="sr-only">Retourner la carte</span>
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </Button>

            <div className="cardFooter">
              <Button className="modifyButton" onClick={handleShowModify}>
                <span className="sr-only">
                  Modifier l'armure' {localArmour.armourName}
                </span>
                <FontAwesomeIcon icon={faPen} />
              </Button>
              <Modal
                aria-labelledby="contained-modal-title-center"
                centered
                show={showModify}
                onHide={handleCloseModify}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Modification de l'armure</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <FormLabel>Nom de l'armure</FormLabel>
                      <Form.Control
                        type="text"
                        value={armourDatas.armourName}
                        onChange={(e) =>
                          setArmourData({
                            ...armourDatas,
                            armourName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Classe d'armure</FormLabel>
                      <Form.Control
                        type="number"
                        value={armourDatas.armourClass}
                        onChange={(e) =>
                          setArmourData({
                            ...armourDatas,
                            armourClass: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Description de l'armure</FormLabel>
                      <Form.Control
                        as="textarea"
                        value={armourDatas.armourDesc}
                        onChange={(e) =>
                          setArmourData({
                            ...armourDatas,
                            armourDesc: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Effets de l'armure</FormLabel>
                      <Form.Control
                        as="textarea"
                        value={armourDatas.armourEffect}
                        onChange={(e) =>
                          setArmourData({
                            ...armourDatas,
                            armourEffect: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModify}>
                    Annuler
                  </Button>
                  <Button
                    onClick={() => {
                      handleUpdate(idArmour, armourDatas);
                    }}
                  >
                    Valider la modification de l'armure {localArmour.armourName}
                  </Button>
                </Modal.Footer>
              </Modal>

              <span>Recto</span>

              <Button className="trashButton" onClick={handleShow}>
                <span className="sr-only">
                  Supprimer l'armure {localArmour.armourName}
                </span>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>

              <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Suppression de l'armure</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>
                    Etes-vous sûr.e de vouloir supprimer "
                    {localArmour.armourName}"?
                  </p>
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={handleClose} variant="secondary">
                    Annuler
                  </Button>
                  <Button
                    onClick={() => handleDelete(idArmour)}
                    variant="danger"
                  >
                    Supprimer l'armure {localArmour.armourName}
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>

          </div>

          <div className="cardVerso"
            style={{ backgroundColor: inputColor, color: textColor }}
          >
            <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}>
              <span>
                Description : {" "}
                {showText
                  ? localArmour.armourDesc
                  : truncate(localArmour.armourDesc)}
              </span>
              {localArmour.armourDesc &&
                localArmour.armourDesc.length > 150 && (
                  <Button
                    onClick={() => setShowText(!showText)}
                    className="detailsButton"
                    style={{ backgroundColor: buttonColor, color: textColor }}
                  >
                    {showText ? "Réduire" : "Détails"}
                  </Button>
                )}
            </div>

            {localArmour.armourEffect ? (
              <div
                className={`descSpan ${
                  showOtherText ? "expanded" : "collapsed"
                } `}
              >
                <span>
                  Effets : {" "}
                  {showOtherText
                    ? localArmour.armourEffect
                    : truncateOther(localArmour.armourEffect)}
                </span>
                {localArmour.armourEffect &&
                  localArmour.armourEffect.length > 50 && (
                    <Button
                      onClick={() => setShowOtherText(!showOtherText)}
                      className="detailsButton"
                      style={{ backgroundColor: buttonColor, color: textColor }}
                    >
                      {showOtherText ? "Réduire" : "Détails"}
                    </Button>
                  )}
              </div>
            ) : (
              <span>Effets : Sans effets particulier</span>
            )}

            <Button
              className="flipButton"
              onClick={handleFlip}
              style={{ backgroundColor: buttonColor, color: textColor }}
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
export default ArmourCard;
