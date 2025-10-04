import { useState } from "react";
import "../Styles/ClassCard.css";
import { Button } from "react-bootstrap";

const ClassCard = ({className, classDesc, classPv, skills}) => {
  console.log(skills);
  
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
              {skills.filter((skill) => skill.skillsName).length > 0 ? (
                skills.map((skill) => (
                    <tr key={skill.idSkills}> 
                    <td>{skill.skillsName}</td>
                    <td>{skill.abilityName}</td>
                    </tr>
                  ))
              ) : (
                <span>Aucune compétence disponible</span>
              )}
              </tbody>
            </table>
          </div>
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
