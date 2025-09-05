import '../index.css'
import '../Styles/passwordModal.css'
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateUserPassword } from "../Services/userServices";
import PasswordChecklist from "react-password-checklist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const PasswordModal = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [formPassword, setFormPassword] = useState({oldPassword: "", newPassword: ""});
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      if (formPassword.oldPassword != formPassword.newPassword) {
        const response = await updateUserPassword(formPassword);
        console.log(response.data);
      } else {
        alert("password identical to old password!");
        location.reload
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  const handleShowPassword = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  const [newType, setTypeNew] = useState("password");
  const [iconNew, setIconNew] = useState(faEyeSlash);
  const handleShowNewPassword = () => {
    if (newType === "password") {
      setIconNew(faEye);
      setTypeNew("text");
    } else {
      setIconNew(faEyeSlash);
      setTypeNew("password");
    }
  };

  return (
    <>
      <Button className="Button" onClick={() => setShow(true)}>
        Modifier le mot de passe
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modification du mot de passe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdatePassword}>
            <Form.Group className="passwordInputModal" controlId="exampleForm.ControlInput1">
              <Form.Label>Ancien mot de passe</Form.Label>
              <Form.Control
                type={type}
                value={formPassword.oldPassword}
                onChange={(e) =>
                  setFormPassword({
                    ...formPassword,
                    oldPassword: e.target.value,
                  })
                }
                required
                autoFocus
              />
              <span className="eyeIconModal" onClick={handleShowPassword}>
                <FontAwesomeIcon icon={icon} />
              </span>
            </Form.Group>
            <Form.Group
              className="passwordInputModal"
            >
              <Form.Label>Nouveau mot de passe</Form.Label>
              <Form.Control
                type={newType}
                value={formPassword.newPassword}
                onChange={(e) =>
                  setFormPassword({
                    ...formPassword,
                    newPassword: e.target.value,
                  })
                }
                required
              />
              <span className="eyeNewIconModal" onClick={handleShowNewPassword}>
                <FontAwesomeIcon icon={iconNew} />
              </span>
              
              <PasswordChecklist
                    rules={["minLength", "specialChar", "number", "capital"]}
                    minLength={10}
                    value={formPassword.newPassword}
                    onChange={(isValid) => {}}
                    messages={{
                        minLength: "Votre mot de passe doit contenir plus de 10 caractères.",
                        specialChar: "Doit contenir au moins 1 caractère spéciales.",
                        number: "Doit contenir au moins 1 nombre.",
                        capital: "Doit contenir au moins 1 lettre capital.",
                    }}
                />

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PasswordModal;
