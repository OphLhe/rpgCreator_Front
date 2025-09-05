import { useState } from "react";
import "../Styles/speciesCard.css";
import { Button } from "react-bootstrap";

const SpeciesCard = ({  speciesName,  speciesDesc,  speciesSpeed,  strModifier,  dexModifier,  conModifier,  intModifier,  wisModifier,  chaModifier,}) => {
  
  const [showText, setShowText] = useState(false);

  const truncate = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <>
      <div className="speciesCard">

        <div className="speciesRecto">
          <h3>Espèces</h3>
          <h4>{speciesName}</h4>
          <span>Vitesse de déplacement : {speciesSpeed}</span>
        </div>

        <div className="speciesVerso">
          <div className={`descSpan ${showText? "expanded":"collapsed"} `}>
            <span>{showText ? speciesDesc : truncate(speciesDesc)}</span>
          </div>

          {speciesDesc.length > 200 && (
            <Button
              onClick={() => setShowText(!showText)}
              className="detailsButton"
            >
              {showText ? "Réduire" : "Détails"}
            </Button>
          )}

          {/* <span>Force : {strModifier}</span>
          <span>Dextérité : {dexModifier}</span>
          <span>Constitution : {conModifier}</span>
          <span>Intelligence : {intModifier}</span>
          <span>Sagesse : {wisModifier}</span>
          <span>Charisme : {chaModifier}</span> */}
        </div>
      </div>
    </>
  );
};

export default SpeciesCard;
