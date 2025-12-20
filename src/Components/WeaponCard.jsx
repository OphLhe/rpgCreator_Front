import { useEffect, useState } from "react";
import ReactBoxFlip from "react-box-flip";
import "../index.css";
import genreButtonsColors from "../Utils/genreButtonsColors";
import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { deleteWeapon, updateWeapon, weapon } from "../Services/weaponServices";
import genreTextColors from "../Utils/genreTextColors";
import genreInputsColors from "../Utils/genreInputsColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { showErrorToast, showSuccessToast } from "../Utils/toastConfig";

const WeaponCard = ({
  idWeapon,
  genre,
  weaponName: initialWeaponName,
  weaponType: initialWeaponType,
  weaponDesc: initialWeaponDesc,
  weaponEffects: initialWeaponEffects,
  weaponRange: initialWeaponRange,
  fetchGetWeapon, 
}) => {
  const [genres, setGenre] = useState([]);
  const fetchGenreById = async () => {
    try {
      const response = await weapon();
      setGenre(response.data);
    } catch (error) {
      console.error("error fetching genre by id", error);
    }
  };

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

  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    fetchGenreById();
  }, []);

  const [localWeapon, setLocalWeapon] = useState({
    weaponName: initialWeaponName,
    weaponType: initialWeaponType,
    weaponDesc: initialWeaponDesc,
    weaponEffects: initialWeaponEffects,
    weaponRange: initialWeaponRange,
  });
  const [weaponDatas, setWeaponData] = useState({
    weaponName: initialWeaponName,
    weaponType: initialWeaponType,
    weaponDesc: initialWeaponDesc,
    weaponEffects: initialWeaponEffects,
    weaponRange: initialWeaponRange,
  });
  const handleUpdate = async (userId, idWeapon) => {
    try {
      const response = await updateWeapon(userId, idWeapon, weaponDatas);
      const updatedWeapon = response.data;
      setLocalWeapon({
        weaponName: updatedWeapon.weaponName,
        weaponType: updatedWeapon.weaponType,
        weaponDesc: updatedWeapon.weaponDesc,
        weaponEffects: updatedWeapon.weaponEffects,
        weaponRange: updatedWeapon.weaponRange,
      });
      showSuccessToast("item.updateSuccess");
      handleCloseModify();
      fetchGetWeapon();
    } catch (error) {
      console.error("Error while updating Weapon", error);
      showErrorToast("item.updateError");
    }
  };

  const handleDelete = async (idWeapon, userId) => {
    try {
      await deleteWeapon(idWeapon, userId);
      showSuccessToast("item.deleteSuccess");
      location.reload();
    } catch (error) {
      console.error("Error while deleting Weapon", error);
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
            <h2>Arme</h2>
            <h3>{localWeapon.weaponName}</h3>
            <span>Type d'arme : {localWeapon.weaponType}</span>
            <span>Portée : {localWeapon.weaponRange}</span>

            <Button
              onClick={handleFlip}
              className="flipButton"
              style={{ backgroundColor: buttonColor }}
            >
              <span className="sr-only">Retourner la carte</span>
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </Button>
            <div className="cardFooter">

              <Button className="modifyButton"
              onClick={handleShowModify}>
                <span className="sr-only">Modifier l'arme {localWeapon.weaponName}</span>
                <FontAwesomeIcon icon={faPen} />
              </Button>

              <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModify}
                onHide={handleCloseModify}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Modification de l'arme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <FormLabel>Nom de l'arme</FormLabel>
                      <Form.Control
                        type="text"
                        value={weaponDatas.weaponName}
                        onChange={(e) =>
                          setWeaponData({
                            ...weaponDatas,
                            weaponName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Type de l'arme</FormLabel>
                      <Form.Control
                        type="text"
                        value={weaponDatas.weaponType}
                        onChange={(e) =>
                          setWeaponData({
                            ...weaponDatas,
                            weaponType: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Portée de l'arme</FormLabel>
                      <Form.Control
                        type="text"
                        value={weaponDatas.weaponRange}
                        onChange={(e) =>
                          setWeaponData({
                            ...weaponDatas,
                            weaponRange: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Description de l'arme</FormLabel>
                      <Form.Control
                        type="text"
                        value={weaponDatas.weaponDesc}
                        onChange={(e) =>
                          setWeaponData({
                            ...weaponDatas,
                            weaponDesc: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Effets de l'arme</FormLabel>
                      <Form.Control
                        type="text"
                        value={weaponDatas.weaponEffects}
                        onChange={(e) =>
                          setWeaponData({
                            ...weaponDatas,
                            weaponEffects: e.target.value,
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
                      handleUpdate(idWeapon, weaponDatas);
                    }}
                  >
                    Valider la modification de l'armure {localWeapon.weaponName}
                  </Button>
                </Modal.Footer>
              </Modal>

              <span>Recto</span>

              <Button
                className="trashButton"
                onClick={handleShow}
              >
                <span className="sr-only">Supprimer l'arme {localWeapon.weaponName}</span>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>

              <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Suppression de l'arme</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>
                    Etes-vous sûr.e de vouloir supprimer "{localWeapon.weaponName}
                    "?
                  </p>
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={handleClose} variant="secondary">
                    Annuler
                  </Button>
                  <Button
                    onClick={() => handleDelete(idWeapon)}
                    variant="danger"
                  >
                    Supprimer l'artefact {localWeapon.weaponName}
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
                {showText? localWeapon.weaponDesc: localWeapon.weaponDesc? truncate(localWeapon.weaponDesc): "Aucune description"}
              </span>
              {localWeapon.weaponDesc && localWeapon.weaponDesc.length > 50 && (
                <Button
                  onClick={() => setShowText(!showText)}
                  className="detailsButton"
                  style={{ backgroundColor: buttonColor }}
                >
                  {showText ? "Réduire" : "Détails"}
                </Button>
              )}
            </div>

            {localWeapon.weaponEffects ? (
              <div
                className={`descSpan ${
                  showOtherText ? "expanded" : "collapsed"
                } `}
              >
                <span>
                  Effets :
                  {showOtherText ? localWeapon.weaponEffects : truncateOther(localWeapon.weaponEffects)}
                </span>
                {localWeapon.weaponEffects && localWeapon.weaponEffects.length > 50 && (
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
