import { useState } from "react";
import "../index.css";
import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import ReactBoxFlip from "react-box-flip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { deleteClass, updateClass } from "../Services/classServices";
import ClassSkillsUpdateForm from '../Components/ClassSkillsUpdateForm';

const ClassCard = ({
  idClass,
  className: initialClassName,
  classDesc: initialClassDesc,
  classPv: initialClassPv,
  skills: initialSkills,
  fetchGetClass,
}) => {
  const [showText, setShowText] = useState(false);
  const truncate = (text, maxLength = 100) => {
    if (text && text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const [localClass, setLocalClass] = useState({
    className: initialClassName,
    classDesc: initialClassDesc,
    classPv: initialClassPv,
    skills: initialSkills,
  });
  const [classDatas, setClassData] = useState({
    className: initialClassName,
    classDesc: initialClassDesc,
    classPv: initialClassPv,
    skills: initialSkills,
  });
  const handleUpdate = async (userId, idClass) => {
    try {
      const response2 = await updateClass(userId, idClass, classDatas);
      const updatedClass = response2.data;
      setLocalClass({
        className: updatedClass.className,
        classDesc: updatedClass.classDesc,
        classPv: updatedClass.classPv,
        skills: updatedClass.skills
      });
      alert("Class updated successfully");
      handleCloseModify();
      fetchGetClass();
    } catch (error) {
      console.error("Error while updating class");
      alert("Error while updating class");
    }
  };

  const handleDelete = async (idClass, userId) => {
    try {
      await deleteClass(idClass, userId);
      alert(`Class successfully deleted!`);
      handleClose();
      location.reload();
    } catch (error) {
      if (error.response.status === 403) {
        alert(error.response.data.message);
      } else {
        console.error("Error while deleting armour", error);
        alert("error while deleting armour.");
      }
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModify, setShowModify] = useState(false);
  const handleCloseModify = () => setShowModify(false);
  const handleShowModify = () => setShowModify(true);

  return (
    <>
      <div className="itemCard">
        <ReactBoxFlip isFlipped={isFlipped}>
          <div
            className="cardRecto"
            style={{ backgroundColor: "#212121", color: "#fff" }}
          >
            <h2>Classes</h2>
            <h3>{localClass.className}</h3>
            <span>Points de vie : {localClass.classPv}</span>
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
                  {localClass.skills &&
                  localClass.skills.filter((skill) => skill.skillsName).length >
                    0 ? (
                    localClass.skills.map((skill, index) => (
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
              <Button className="modifyButton" onClick={handleShowModify}>
                <span className="sr-only">
                  Modifier la classe' {localClass.className}
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
                  <Modal.Title>Modification de la classe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <FormLabel>Nom de la classe</FormLabel>
                      <Form.Control
                        type="text"
                        value={classDatas.className}
                        onChange={(e) =>
                          setClassData({
                            ...classDatas,
                            className: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Points de vie de la classe</FormLabel>
                      <Form.Control
                        type="number"
                        value={classDatas.classPv}
                        onChange={(e) =>
                          setClassData({
                            ...classDatas,
                            classPv: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormLabel>Description de la classe</FormLabel>
                      <Form.Control
                        as="textarea"
                        value={classDatas.classDesc}
                        onChange={(e) =>
                          setClassData({
                            ...classDatas,
                            classDesc: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <ClassSkillsUpdateForm
                          initialSkills={classDatas.skills}
                          onSkillsUpdate={(updatedSkills) => {
                          setClassData({ ...classDatas, skills: updatedSkills });
                          }}
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
                      handleUpdate(idClass, classDatas);
                    }}
                  >
                    Valider la modification de la classe {localClass.className}
                  </Button>
                </Modal.Footer>
              </Modal>

              <span>Recto</span>

              <Button onClick={handleShow} className="trashButton">
                <span className="sr-only">
                  Supprimer la classe {localClass.className}
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
                  <Modal.Title>Suppression de la classe</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>
                    Etes-vous sûr.e de vouloir supprimer "{localClass.className}
                    "?
                  </p>
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={handleClose} variant="secondary">
                    Annuler
                  </Button>
                  <Button
                    onClick={() => handleDelete(idClass)}
                    variant="danger"
                  >
                    Supprimer la Classe {localClass.className}
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>

          <div
            className="cardVerso"
            style={{ backgroundColor: "#212121", color: "#fff" }}
          >
            <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}>
              <span>
                {showText
                  ? localClass.classDesc
                  : truncate(localClass.classDesc)}
              </span>
              {localClass.classDesc.length > 100 && (
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
