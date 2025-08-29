import { useEffect, useState } from "react";
import '../Styles/armourForm.css'
import { genreById } from "../Services/genreServices";
import { useParams } from "react-router-dom";
import { Button, Form, FormControl} from "react-bootstrap";
import { createArmour } from "../Services/armourServices";
import genreInputsColors from "../Utils/genreInputsColors";
import genreButtonsColors from "../Utils/genreButtonsColors";
import genreTextColors from "../Utils/genreTextColors";

const ArmourForm = () => {
    
    const [genres, setGenre] = useState([]);
    const [armourDatas, setArmourData] = useState({
        armourName: "",
        armourDesc: "",
        armourClass: "",
        armourEffect: ""
    });
    const { idGenre } = useParams();

    const handleAddArmour = async (e) => {
        e.preventDefault();
        try {
        await createArmour(idGenre,armourDatas);
        alert("armour created successfully");
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
            action="/addArmour"
            onSubmit={handleAddArmour}
            className="formArmour"
        >

            <div className="infoArmour">
                <div className="nameClassArmour">
                    <div className="nameArmour">
                        <label htmlFor="nom de l'armure">Nom de l'armure :</label>
                        <input
                        style={{ backgroundColor: inputColor, color: textColor }}
                        type="text"
                        value={armourDatas.armourName}
                        onChange={(e) =>
                            setArmourData({
                            ...armourDatas,
                            armourName: e.target.value,
                            })}
                        required
                        />
                    </div>
                    <div className="classArmour">
                        <label htmlFor="Classe d'armure">
                            Classe d'armure :
                        </label>
                        <input className="classArmourInput"
                            style={{ backgroundColor: inputColor, color: textColor }}
                            type="number"
                            value={armourDatas.armourClass}
                            onChange={(e) =>
                            setArmourData({
                            ...armourDatas,
                            armourClass: e.target.value,
                            })}
                            required
                        />
                    </div>
                </div>                
                <label htmlFor="descritpion de l'armure">
                  Descritpion de l'armure :
                </label>
                <Form.Control
                  style={{ backgroundColor: inputColor, color: textColor, border: "none" }}
                  className="inputTextarea"
                  as="textarea"
                  aria-label="With textarea"
                  value={armourDatas.armourDesc}
                  onChange={(e) =>
                    setArmourData({
                      ...armourDatas,
                      armourDesc: e.target.value,
                    })}
                  required
                />
                
                <label htmlFor=" Effet de l'armure">
                  Effet de l'armure :
                </label>
                <FormControl className="inputTextarea"
                  style={{ backgroundColor: inputColor, color: textColor, border: "none" }}
                  as= 'textarea'
                  value={armourDatas.armourEffect}
                  onChange={(e) =>
                    setArmourData({
                        ...armourDatas,
                        armourEffect: e.target.value,
                    })}
                  required
                />
                
            </div>
              
            <div className="buttonForm">
                <Button
                  style={{ backgroundColor: buttonColor}}
                  type="submit"
                  className="creationButton"
                >
                  Créer Armure
                </Button>
            </div>

        </form>
        </>
    );
}
 
export default ArmourForm;