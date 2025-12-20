import { useEffect, useState } from "react";
import '../Styles/StoryForm.css';
import { genreById } from "../Services/genreServices";
import { useParams } from "react-router";
import genreInputsColors from "../Utils/genreInputsColors";
import genreButtonsColors from "../Utils/genreButtonsColors";
import genreTextColors from "../Utils/genreTextColors";
import { Button, Form } from "react-bootstrap";
import { addStory } from "../Services/storyServices";
import { showPromiseToast, showErrorToast } from "../Utils/toastConfig";

const StoryForm = () => {
    const { idGenre } = useParams();

    // for genreColors
    const [genres, setGenre] = useState([]);
    const fetchGenreById = async () => {
    try {
      const response = await genreById(idGenre);
      setGenre(response.data);
    } catch (error) {
      console.error("error fetching genre by id", error);
    }
    };

    const [storyDatas, setStoryDatas] = useState({
    title: "",
    synopsis: "",
    exposition: "",
    risingAction: "",
    climax: "",
    fallingAction: "",
    resolution: "",
    creationDate: new Date().toISOString().split('T')[0]    
    })

    const handleAddStory = async (e) => {
        e.preventDefault();
        try {
            await showPromiseToast(
                async () => {
                    await addStory(idGenre,storyDatas); 
                },
                "item.createPending",
                "item.createSuccess",
                "item.createError"
            );
            setStoryDatas({
                title: "",
                synopsis: "",
                exposition: "",
                risingAction: "",
                climax: "",
                fallingAction: "",
                resolution: "",
                creationDate: new Date().toISOString().split('T')[0]    
            });
        } catch (error) {
            console.error(error);
            showErrorToast("item.createError"); 
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
            action="/addStory"
            onSubmit={handleAddStory}
            className="formStory"
        >
            <div className="infosStory">
                <label htmlFor="storyTitle">Titre de la quête</label>
                <Form.Control id="storyTitle"
                    style={{ backgroundColor: inputColor, border: "none", color: textColor  }}
                    className="inputText"
                    type="text"
                    value={storyDatas.title}
                    onChange={(e) =>
                    setStoryDatas({
                        ...storyDatas,
                        title: e.target.value,
                    })
                }
                required
                />
                <label htmlFor="storySynopsis">Résumé de la quête</label>
                <Form.Control id="storySynopsis"
                    style={{ backgroundColor: inputColor, border: "none", color: textColor  }}
                    className="inputTextarea"
                    as="textarea"
                    aria-label="With textarea"
                    value={storyDatas.synopsis}
                    onChange={(e) =>
                    setStoryDatas({
                        ...storyDatas,
                        synopsis: e.target.value,
                    })
                }
                required
                />
            </div>

            <div className="schema">
                <label htmlFor="storyExposition">Situation Initiale :</label>
                <Form.Control id="storyExposition"
                    style={{ backgroundColor: inputColor, border: "none", color: textColor  }}
                    className="inputTextarea"
                    as="textarea"
                    aria-label="With textarea"
                    value={storyDatas.exposition}
                    onChange={(e) =>
                    setStoryDatas({
                        ...storyDatas,
                        exposition: e.target.value,
                    })
                }
                required
                />
                <label htmlFor="storyRisingAction">Eléments déclencheur :</label>
                <Form.Control id="storyRisingAction"
                    style={{ backgroundColor: inputColor, border: "none", color: textColor  }}
                    className="inputTextarea"
                    as="textarea"
                    aria-label="With textarea"
                    value={storyDatas.risingAction}
                    onChange={(e) =>
                    setStoryDatas({
                        ...storyDatas,
                        risingAction: e.target.value,
                    })
                }
                required
                />
            </div>

            <div className="buttonForm">
                <Button
                    style={{ backgroundColor: buttonColor, border: "none" }}
                    className="profileButton"
                    type="submit"
                >
                    Créer la quête
                </Button>
            </div>
            
        </form>
        
        </>
     );
}
 
export default StoryForm;