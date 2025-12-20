import { useEffect, useState } from "react";
import ReactBoxFlip from "react-box-flip";
import "../index.css";
import genreButtonsColors from "../Utils/genreButtonsColors";
import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { deleteProps, props, updateProps } from "../Services/propsServices";
import genreTextColors from "../Utils/genreTextColors";
import genreInputsColors from "../Utils/genreInputsColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRotateLeft, faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { showSuccessToast, showErrorToast } from "../Utils/toastConfig";

const PropsCard = ({
  idProps,
  genre,
  propsName: initialPropsName,
  propsDesc: initialPropsDesc,
  propsEffect: initialPropsEffect,
  fetchGetProps,
}) => {
  const [genres, setGenre] = useState([]);
  const fetchGenreById = async () => {
    try {
      const response = await props();
      setGenre(response.data);
    } catch (error) {
      console.error("error fetching genre by id", error);
    }
  };

  useEffect(() => {
    fetchGenreById();
  }, []);

  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const [localProps, setLocalProps] = useState({
    propsName: initialPropsName,
    propsDesc: initialPropsDesc,
    propsEffect: initialPropsEffect,
  });
  const [propsDatas, setPropsData] = useState({
    propsName: initialPropsName,
    propsDesc: initialPropsDesc,
    propsEffect: initialPropsEffect,
  });
  const handleUpdate = async (userId, idProps) => {
    try {
      const response = await updateProps( userId, idProps, propsDatas);
      const updatedProps = response.data;
      setLocalProps({
        propsName: updatedProps.propsName,
        propsDesc: updatedProps.propsDesc,
        propsEffect: updatedProps.propsEffect,
      });
      showErrorToast("item.updateSuccess");
      handleCloseModify();
      fetchGetProps();
    } catch (error) {
      console.error("Error while updating class");
      showErrorToast("item.updateError");
    }
  };

  const handleDelete = async (idProps, userId) => {
    try {
      await deleteProps(idProps, userId);
      showSuccessToast("item.deleteSuccess");
      location.reload();
    } catch (error) {
        console.error("Error while deleting armour", error);
        showErrorToast("item.deleteError");
    }
  };

  const [showText, setShowText] = useState(false);
  const truncate = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const [showOtherText, setShowOtherText] = useState(false);
  const truncateOther = (text, maxLength = 100) => {
    if (text && text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
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
            <h2>Artefact</h2>
            <h3>{localProps.propsName}</h3>
            <Button
              onClick={handleFlip}
              className="flipButton"
              style={{ backgroundColor: buttonColor, color: textColor }}
            >
              <span className="sr-only">Retourner la carte</span>
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </Button>

            <div className="cardFooter">
              <Button className="modifyButton" onClick={handleShowModify}>
                <span className="sr-only">
                  Modifier l'artefact {localProps.propsName}
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
                  <Modal.Title>Modification de l'artefact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <FormLabel>Nom de l'artefact</FormLabel>
                      <Form.Control
                        type="text"
                        value={propsDatas.propsName}
                        onChange={(e) =>
                          setPropsData({
                            ...propsDatas,
                            propsName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Description de l'artefact</FormLabel>
                      <Form.Control
                        as="textarea"
                        value={propsDatas.propsDesc}
                        onChange={(e) =>
                          setPropsData({
                            ...propsDatas,
                            propsDesc: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Effets de l'artefact</FormLabel>
                      <Form.Control
                        as="textarea"
                        value={propsDatas.propsEffect}
                        onChange={(e) =>
                          setPropsData({
                            ...propsDatas,
                            propsEffect: e.target.value,
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
                      handleUpdate(idProps, propsDatas);
                    }}
                  >
                    Valider la modification de l'armure {localProps.propsName}
                  </Button>
                </Modal.Footer>
              </Modal>

              <span>Recto</span>

              <Button className="trashButton" onClick={handleShow}>
                <span className="sr-only">
                  Supprimer l'artefact {localProps.propsName}
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
                  <Modal.Title>Suppression de l'artefact</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>
                    Etes-vous sûr.e de vouloir supprimer "{localProps.propsName}
                    "?
                  </p>
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={handleClose} variant="secondary">
                    Annuler
                  </Button>
                  <Button
                    onClick={() => handleDelete(idProps)}
                    variant="danger"
                  >
                    Supprimer l'artefact {localProps.propsName}
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
                Descritpion :{" "}
                {showText ? localProps.propsDesc : truncate(localProps.propsDesc)}
              </span>
              {localProps.propsDesc && localProps.propsDesc.length > 100 && (
                <Button
                  onClick={() => setShowText(!showText)}
                  className="detailsButton"
                  style={{ backgroundColor: buttonColor }}
                >
                  {showText ? "Réduire" : "Détails"}
                </Button>
              )}
            </div>

            {localProps.propsEffect ? (
              <div
                className={`descSpan ${
                  showOtherText ? "expanded" : "collapsed"
                } `}
              >
                <span>
                  Effets :{" "}
                  {showOtherText
                    ? localProps.propsEffect
                    : truncateOther(localProps.propsEffect)}
                </span>
                {localProps.propsEffect &&
                  localProps.propsEffect.length > 100 && (
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

export default PropsCard;
