import { useState } from "react";
import "../Styles/ClassCard.css";
import { Button } from "react-bootstrap";

const ClassCard = ({className, classDesc, classPv}) => {

  const [showText, setShowText] = useState(false);

  const truncate = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <>
      <div className="classCard">
        <div className="classRecto">
          <h3>Classes</h3>
          <h4>{className}</h4>
          <span>Point de vie : {classPv}</span>
        </div>

        <div className="classVerso">
          <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}>
            <span>{showText ? classDesc : truncate(classDesc)}</span>
          </div>

          {classDesc.length > 100 && (
            <Button
              onClick={() => setShowText(!showText)}
              className="detailsButton"
            >
              {showText ? "Réduire" : "Détails"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassCard;
