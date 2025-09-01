import { useEffect, useState } from "react";
import '../Styles/speciesForm.css'
import { genreById } from "../Services/genreServices";
import { useParams } from "react-router-dom";
import { Button, Form} from "react-bootstrap";
import { createSpecies } from "../Services/speciesServices";
import genreInputsColors from "../Utils/genreInputsColors";
import genreButtonsColors from "../Utils/genreButtonsColors";
import genreTextColors from "../Utils/genreTextColors";

const SpeciesForm = () => {
    
    const [genres, setGenre] = useState([]);
    const [speciesDatas, setSpeciesData] = useState({
        speciesName: "",
        speciesDesc: "",
        speciesSpeed: "",
        strModifier: "",
        dexModifier: "",
        conModifier: "",
        intModifier: "",
        wisModifier: "",
        chaModifier: "",
    });
    const { idGenre } = useParams();

    const handleAddSpecies = async (e) => {
        e.preventDefault();
        try {
        await createSpecies(speciesDatas);
        alert("species created successfully");
        } catch (error) {
        console.error(error);
        alert("CPT");
        }
    };

    const fetchGenreById = async () => {
        try {
        const response = await genreById(idGenre);
        setGenre(response.data);
        } catch (error) {
        console.error("error fetching genre by id", error);
        }
    };

    useEffect(() => {
        fetchGenreById();
    }, []);

    const genreName = genres[0]?.genreName;
    const inputColor = genreInputsColors[genreName] || "#D9D9D9";
    const buttonColor = genreButtonsColors[genreName] || "#D9D9D9";
    const textColor = genreTextColors[genreName] || "#D9D9D9";

    return ( 
        <>
            <form
              action="/addSpecies"
              onSubmit={handleAddSpecies}
              className="formSpecies"
            >

              <div className="infoSpecies">
                <label htmlFor="nom de l'espèce">Nom de l'espèces :</label>
                <input className="nameSpeciesInput"
                  style={{ backgroundColor: inputColor, color: textColor }}
                  type="text"
                  value={speciesDatas.speciesName}
                  onChange={(e) =>
                    setSpeciesData({
                      ...speciesDatas,
                      speciesName: e.target.value,
                    })
                  }
                  required
                />
                <label htmlFor="descritpion de l'espèce">
                  Descritpion de l'espèces :
                </label>
                <Form.Control
                  style={{ backgroundColor: inputColor, border: "none", color: textColor  }}
                  className="inputTextarea"
                  as="textarea"
                  aria-label="With textarea"
                  value={speciesDatas.speciesDesc}
                  onChange={(e) =>
                    setSpeciesData({
                      ...speciesDatas,
                      speciesDesc: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="modifAbility">
                <span>Modificateur d'abilité :</span>
                <div className="abilities">
                  <div className="labelInput">
                    <label htmlFor="force">Force :</label>
                    <input
                      style={{ backgroundColor: inputColor, color: textColor  }}
                      type="number"
                      min={-3}
                      max={3}
                      value={speciesDatas.strModifier}
                      onChange={(e) =>
                        setSpeciesData({
                          ...speciesDatas,
                          strModifier: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="labelInput">
                    <label htmlFor="dextérité">Dextérité :</label>
                    <input
                      style={{ backgroundColor: inputColor, color: textColor  }}
                      type="number"
                      min={-3}
                      max={3}
                      value={speciesDatas.dexModifier}
                      onChange={(e) =>
                        setSpeciesData({
                          ...speciesDatas,
                          dexModifier: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="labelInput">
                    <label htmlFor="constitution">Constitution :</label>
                    <input
                      style={{ backgroundColor: inputColor, color: textColor  }}
                      type="number"
                      min={-3}
                      max={3}
                      value={speciesDatas.conModifier}
                      onChange={(e) =>
                        setSpeciesData({
                          ...speciesDatas,
                          conModifier: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="labelInput">
                    <label htmlFor="intelligence">Intelligence :</label>
                    <input
                      style={{ backgroundColor: inputColor, color: textColor  }}
                      type="number"
                      min={-3}
                      max={3}
                      value={speciesDatas.intModifier}
                      onChange={(e) =>
                        setSpeciesData({
                          ...speciesDatas,
                          intModifier: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="labelInput">
                    <label htmlFor="sagesse">Sagesse :</label>
                    <input
                      style={{ backgroundColor: inputColor, color: textColor  }}
                      type="number"
                      min={-3}
                      max={3}
                      value={speciesDatas.wisModifier}
                      onChange={(e) =>
                        setSpeciesData({
                          ...speciesDatas,
                          wisModifier: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="labelInput">
                    <label htmlFor="charisme">Charisme :</label>
                    <input
                      style={{ backgroundColor: inputColor, color: textColor  }}
                      type="number"
                      min={-3}
                      max={3}
                      value={speciesDatas.chaModifier}
                      onChange={(e) =>
                        setSpeciesData({
                          ...speciesDatas,
                          chaModifier: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="speed">
                <label htmlFor="distance">Distance :</label>
                <input
                  style={{ backgroundColor: inputColor, color: textColor  }}
                  type="number"
                  value={speciesDatas.speciesSpeed}
                  onChange={(e) =>
                    setSpeciesData({
                      ...speciesDatas,
                      speciesSpeed: e.target.value,
                    })
                  }
                  required
                />{" "}
                mètres
              </div>
              
              <div className="buttonForm">
                <Button
                  style={{ backgroundColor: buttonColor }}
                  type="submit"
                  className="creationButton"
                >
                  Créer Espèces
                </Button>
              </div>
            </form>
        </>
    );
}
 
export default SpeciesForm;