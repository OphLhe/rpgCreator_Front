import '../Styles/spellsCard.css'
import { useEffect, useState } from "react";
import genreButtonsColors from "../Utils/genreButtonsColors";
import { Button } from "react-bootstrap";
import { spells } from "../Services/spellsServices";
import genreTextColors from "../Utils/genreTextColors";
import genreInputsColors from "../Utils/genreInputsColors";

const SpellsCard = ({ genre, spellsName, spellsRange, spellsDesc, spellsEffects}) => {

  const [showText, setShowText] = useState(false);
  const [genres, setGenre] = useState([]);

  const truncate = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const fetchGenreById = async () => {
    try {
      const response = await spells();
      setGenre(response.data)
      
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
        <div className="spellsCard">  
        <div className="spellsRecto"
          style={{ backgroundColor: inputColor, color: textColor }}
        >
          <h3>Sort</h3>
          <h4>{spellsName}</h4>
          <span>
            Portée du sort : {spellsRange}
          </span>
        </div>
        <div className="spellsVerso">
          <div className={`descSpan ${showText ? "expanded" : "collapsed"} `}>
            <span>{showText ? spellsDesc : truncate(spellsDesc)}</span>
          </div>
          
          {spellsEffects ? (
            <span>
              Effets : {spellsEffects}
            </span>
          ) : (
            <span>Effets : Sans effets particulier</span>
          )}

          {spellsDesc.length > 50 && (
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
}
 
export default SpellsCard;