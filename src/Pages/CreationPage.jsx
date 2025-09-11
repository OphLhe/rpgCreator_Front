import { useEffect, useState } from "react";
import "../Styles/creationPage.css";
import { genreById } from "../Services/genreServices";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Tab, Tabs } from "react-bootstrap";
import GenreCard from "../Components/genreCard";
import SpeciesForm from "../Components/SpeciesForm";
import ArmourForm from "../Components/ArmourForm";
import WeaponForm from "../Components/WeaponForm";
import SpellsForm from "../Components/SpellsForm";
import PropsForm from "../Components/PropsForm";
import ClassForm from "../Components/ClassForm";
import SkillsForm from "../Components/SkillsForm";
import genreButtonsColors from "../Utils/genreButtonsColors";

const CreationPage = () => {

  const navigate = useNavigate();
  const [genres, setGenre] = useState([]);
  const { idGenre } = useParams();

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
  const buttonColor = genreButtonsColors[genreName] || "#D9D9D9";

  return (
    <>
    
      <div className="genreBannerCreation">
        <div className="genreCreationBanner">
          {genres.map((g) => (
            <GenreCard
              key={g.genreName}
              genreName={g.genreName}
              genrePicture={g.genrePicture}
              className="genreCardCreation"
            />
          ))}
        </div>
        <h2>Page de création </h2>
      </div>
      <main className="mainCreation">
        <div className="tabsCreation">
          <Tabs
            defaultActiveKey="classes"
            id="fill-tab-example"
            className="tabs"
            fill
          >
            <Tab eventKey="classes" title="Classes" className="tab">
              <ClassForm/>
            </Tab>

            <Tab eventKey="compétences" title="Compétences" className="tab">
              <SkillsForm/>
            </Tab>

            <Tab eventKey="espèces" title="Espèces" className="tab">
              <SpeciesForm />
            </Tab>

            <Tab eventKey="armes" title="Armes" className="tab">
              <WeaponForm />
            </Tab>

            <Tab eventKey="armures" title="Armures" className="tab">
              <ArmourForm />
            </Tab>

            <Tab eventKey="sorts" title="Sorts" className="tab">
              <SpellsForm />
            </Tab>

            <Tab eventKey="artefacts" title="Artefacts" className="tab">
              <PropsForm />
            </Tab>

            <Tab eventKey="PNJ" title="PNJ" className="tab">
              Tab content for Contact
            </Tab>
            <Tab eventKey="personnages" title="Personnages" className="tab">
              Tab content for Contact
            </Tab>
            <Tab eventKey="quêtes" title="Quêtes" className="tab">
              Tab content for Contact
            </Tab>
          </Tabs>
        </div>

        <div className="buttonForm">
          <Button
            style={{ backgroundColor: buttonColor, border: "none" }}
            className="profileButton"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profil
          </Button>

        </div>
      </main>
      
    </>
  );
};

export default CreationPage;
