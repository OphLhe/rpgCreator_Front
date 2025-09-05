import { useState } from "react";
import { Button, Form, Modal, NavLink } from "react-bootstrap";
import { forgotPassword } from "../Services/userServices";

const ResetPasswordModal = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
    const [email, setEmail] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        setEmail(formData.get('email'))

        forgotPassword({email})
        alert("un email a été envoyé à l'adresse e-mail renseignée" )
    }

  return (
    <>
      <NavLink className="forgotPassword" onClick={() => setShow(true)}>
        Mot de passe oublié?
      </NavLink>
      <Modal aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mot de passe oublié?</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="passwordInputModal"
              controlId="exampleForm.ControlInput1"
            >
            <Form.Label>
                Veuillez entrer votre adresse e-mail afin de réinitialiser votre mot de passe
            </Form.Label>
              <Form.Control
                type='email'
                placeholder='Adresse e-mail'
                name = 'email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
                Réinitaliser le mot de passe
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResetPasswordModal;
