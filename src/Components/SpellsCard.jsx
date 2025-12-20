import { useEffect, useState } from "react";
import ReactBoxFlip from "react-box-flip";
import "../index.css";
import genreButtonsColors from "../Utils/genreButtonsColors";
import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { deleteSpells, spells, updateSpells } from "../Services/spellsServices";
import genreTextColors from "../Utils/genreTextColors";
import genreInputsColors from "../Utils/genreInputsColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { showErrorToast, showSuccessToast } from "../Utils/toastConfig";

const SpellsCard = ({
  idSpells,
  genre,
  spellsName: initialSpellsName,
  spellsRange: initialSpellsRange,
  spellsDesc: initialSpellsDesc,
  spellsEffects: initialSpellsEffects,
  fecthGetSpells,
}) => {
  const [genres, setGenre] = useState([]);
  const fetchGenreById = async () => {
    try {
      const response = await spells();
      setGenre(response.data);
    } catch (error) {
      console.error("error fetching genre by id", error);
    }
  };

  const [showText, setShowText] = useState(false);
  const truncate = (text, maxLength = 50) => {
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

  const [localSpells, setLocalSpells] = useState({
    spellsName: initialSpellsName,
    spellsRange: initialSpellsRange,
    spellsDesc: initialSpellsDesc,
    spellsEffects: initialSpellsEffects,
  });
  const [spellsDatas, setSpellsData] = useState({
    spellsName: initialSpellsName,
    spellsRange: initialSpellsRange,
    spellsDesc: initialSpellsDesc,
    spellsEffects: initialSpellsEffects,
  });
  const handleUpdate = async (idSpells, userId) => {
    try {
      const response = await updateSpells(idSpells, userId, spellsDatas);
      const updatedSpells = response.data;
      setLocalSpells({
        spellsName: updatedSpells.spellsName,
        spellsRange: updatedSpells.spellsRange,
        spellsDesc: updatedSpells.spellsDesc,
        spellsEffects: updatedSpells.spellsEffects,
      });
      showSuccessToast("item.updateSuccess");
      handleCloseModify();
      fecthGetSpells();
    } catch (error) {
      console.error("Error while updating spell");
      showErrorToast("item.updateError");
    }
  };

  useEffect(() => {
    fetchGenreById();
  }, []);

  const handleDelete = async (idSpells, userId) => {
    try {
      await deleteSpells(idSpells, userId);
      showSuccessToast("item.deleteSuccess");
      location.reload();
    } catch (error) {
      console.error("Error while deleting spell", error);
      showErrorToast("item.deleteError");
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModify, setShowModify] = useState(false);
  const handleCloseModify = () => setShowModify(false);
  const handleShowModify = () => setShowModify(true);
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
            <h2>Sort</h2>
            <h3>{localSpells.spellsName}</h3>
            <span>Portée du sort : {localSpells.spellsRange}</span>
            <Button
              onClick={handleFlip}
              className="flipButton"
              style={{ backgroundColor: "#fff", color: "black" }}
            >
              <span className="sr-only">Retourner la carte</span>
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </Button>

            <div className="cardFooter">
              <Button className="modifyButton" onClick={handleShowModify}>
                <span className="sr-only">
                  Modifier le sort {localSpells.spellsName}
                </span>
                <FontAwesomeIcon icon={faPen} />
              </Button>
              <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModify}
                onHide={handleCloseModify}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Modification du sort</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <FormLabel>Nom du sort</FormLabel>
                      <Form.Control
                        type="text"
                        value={spellsDatas.spellsName}
                        onChange={(e) =>
                          setSpellsData({
                            ...spellsDatas,
                            spellsName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Portée du sort</FormLabel>
                      <Form.Control
                        type="text"
                        value={spellsDatas.spellsRange}
                        onChange={(e) =>
                          setSpellsData({
                            ...spellsDatas,
                            spellsRange: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Description du sort</FormLabel>
                      <Form.Control
                        as="textarea"
                        value={spellsDatas.spellsDesc}
                        onChange={(e) =>
                          setSpellsData({
                            ...spellsDatas,
                            spellsDesc: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Effets du sort</FormLabel>
                      <Form.Control
                        as="textarea"
                        value={spellsDatas.spellsEffects}
                        onChange={(e) =>
                          setSpellsData({
                            ...spellsDatas,
                            spellsEffects: e.target.value,
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
                      handleUpdate(idSpells, spellsDatas);
                    }}
                  >
                    Valider la modification de l'armure {localSpells.spellsName}
                  </Button>
                </Modal.Footer>
              </Modal>

              <span>Recto</span>

              <Button className="trashButton" onClick={handleShow}>
                <span className="sr-only">
                  Supprimer le sort {localSpells.spellsName}
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
                  <Modal.Title>Suppression du sort</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>
                    Etes-vous sûr.e de vouloir supprimer "
                    {localSpells.spellsName}
                    "?
                  </p>
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={handleClose} variant="secondary">
                    Annuler
                  </Button>
                  <Button
                    onClick={() => handleDelete(idSpells)}
                    variant="danger"
                  >
                    Supprimer le sort {localSpells.spellsName}
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>

          <div
            className="cardVerso"
            style={{ backgroundColor: inputColor, color: textColor }}
          >
            <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}>
              <span>
                {showText
                  ? localSpells.spellsDesc
                  : truncate(localSpells.spellsDesc)}
              </span>
              {localSpells.spellsDesc.length > 50 && (
                <Button
                  onClick={() => setShowText(!showText)}
                  className="detailsButton"
                  style={{ backgroundColor: buttonColor }}
                >
                  {showText ? "Réduire" : "Détails"}
                </Button>
              )}
            </div>
            {localSpells.spellsEffects ? (
              <div
                className={`descSpan ${
                  showOtherText ? "expanded" : "collapsed"
                } `}
              >
                <span>
                  Effets :{" "}
                  {showOtherText
                    ? localSpells.spellsEffects
                    : truncateOther(localSpells.spellsEffects)}
                </span>
                {localSpells.spellsEffects &&
                  localSpells.spellsEffects.length > 50 && (
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

export default SpellsCard;
