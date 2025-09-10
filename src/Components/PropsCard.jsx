import { useEffect, useState } from "react";
import '../Styles/propsCard.css'
import genreButtonsColors from "../Utils/genreButtonsColors";
import { Button } from "react-bootstrap";
import { props } from "../Services/propsServices";
import genreTextColors from "../Utils/genreTextColors";
import genreInputsColors from "../Utils/genreInputsColors";

const PropsCard = ({ genre, propsName, propsDesc, propsEffect }) => {
  const [showText, setShowText] = useState(false);
  const [genres, setGenre] = useState([]);

  const truncate = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

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

  const genreName = genre;

  const buttonColor = genreButtonsColors[genreName] || "#D9D9D9";
  const inputColor = genreInputsColors[genreName] || "#D9D9D9";
  const textColor = genreTextColors[genreName] || "#D9D9D9";

  return (
    <>
      <div className="propsCard">
        <div
          className="propsRecto"
          style={{ backgroundColor: inputColor, color: textColor }}
        >
          <h3>Artefact</h3>
          <h4>{propsName}</h4>
        </div>
        <div className="propsVerso">
          <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}>
            <span>Descritpion : {showText ? propsDesc : truncate(propsDesc)}</span>
          </div>

          {propsEffect ? (
            <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}>
            <span>Effets : {showText ? propsEffect : truncate(propsEffect)}</span>
          </div>
          ) : (
            <span>Effets : Sans effets particulier</span>
          )}

          {propsDesc.length > 50 && (
            <Button
              onClick={() => setShowText(!showText)}
              className="detailsButton"
              style={{ backgroundColor: buttonColor }}
            >
              {showText ? "Réduire" : "Détails"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default PropsCard;
