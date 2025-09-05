import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useParams } from "react-router";
import { resetPassword } from "../Services/userServices";
import { Button } from "react-bootstrap";
import PasswordChecklist from "react-password-checklist";

const ResetPassword = () => {
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

  const [password, setPassword] = useState("");
  const tokenReset = useParams().resetToken;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setPassword(formData.get("password"));

    // Simulate sending a password reset request
    console.log("Réinitialisation du mot de passe:", password);
    console.log("Token de réinitialisation:", tokenReset);

    // Here you would typically call a service to handle the password reset
    resetPassword({ password }, tokenReset);
  };

  const [passwordAgain, setPasswordAgain] = useState("");
  const [typeAgain, setTypeAgain] = useState("password");
  const [iconAgain, setIconAgain] = useState(faEyeSlash);
  const handleShowPasswordAgain = () => {
    if (typeAgain === "password") {
      setIconAgain(faEye);
      setTypeAgain("text");
    } else {
      setIconAgain(faEyeSlash);
      setTypeAgain("password");
    }
  };

  return (
    <>
      <div className="formGroup">
        <h2>Réinitialiser votre mot de passe</h2>
        <div className="formConnexion">
          <form onSubmit={handleSubmit} className="formLogin">

            <div className="passwordInput">
              <input
                className="inputPassword"
                type={type}
                placeholder="Nouveau mot de passe"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eyeIcon" onClick={handleShowPassword}>
                <FontAwesomeIcon icon={icon} />
              </span>
            </div>

            <div className="passwordInput">
              <input
                className="inputPassword"
                type={typeAgain}
                placeholder="Confirmer le mot de passe"
                name="password"
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
                required
              />
              <span className="eyeIcon" onClick={handleShowPasswordAgain}>
                <FontAwesomeIcon icon={iconAgain} />
              </span>
            </div>

            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={10}
              value={password}
              valueAgain={passwordAgain}
              onChange={(isValid) => {}}
              messages={{
                minLength:
                  "Votre mot de passe doit contenir plus de 10 caractères.",
                specialChar: "Doit contenir au moins 1 caractère spéciales.",
                number: "Doit contenir au moins 1 nombre.",
                capital: "Doit contenir au moins 1 lettre capital.",
                match: "Les mots de passe correspondent.",
              }}
            />
            <Button className="formButton" type="submit">
              Réinitialiser le mot de passe
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
