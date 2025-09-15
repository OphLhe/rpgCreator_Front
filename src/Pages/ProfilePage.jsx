import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
import "../index.css";
import "../Styles/profilePage.css";
import { jwtDecode } from "jwt-decode";
import { verifyToken } from "../Services/tokenServices";
import { useEffect, useState } from "react";
import { genre } from "../Services/genreServices";
import { getUserProfile } from "../Services/userServices";
import { weapon } from "../Services/weaponServices";
import { armour } from "../Services/armourServices";
import { spells } from "../Services/spellsServices";
import { props } from "../Services/propsServices";
import { species } from "../Services/speciesServices";
import WeaponCard from "../Components/WeaponCard";
import ArmourCard from "../Components/ArmourCard";
import SpellsCard from "../Components/SpellsCard";
import PropsCard from "../Components/PropsCard";
import SpeciesCard from "../Components/SpeciesCard";
import { useNavigate } from "react-router";
import PasswordModal from "../Components/PasswordModal";

const ProfilePage = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let userName = "";
  const goodToken = verifyToken(token);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [showGenre, setShowGenre] = useState(false);
  const handleCloseGenre = () => setShowGenre(false);
  const handleShowGenre = () => setShowGenre(true);

  const [genres, setGenres] = useState([]);
  const fetchGenre = async () => {
    try {
      const response = await genre();
      setGenres(response.data);
    } catch (error) {
      console.error("error fetching genre by id", error);
    }
  };

  const [userProfile, setUserProfile] = useState({});
  const fetchUserDatas = async () => {
    try {
      const response = await getUserProfile();
      setUserProfile(response.data[0]);
    } catch (error) {
      console.error("error fetching user datas", error);
    }
  };

  const [getWeapons, setGetWeapon] = useState([]);
  const fetchGetWeapon = async () => {
    try {
      const response = await weapon();
      setGetWeapon(response.data);
    } catch (error) {
      console.error("error fetching weapon datas", error);
    }
  };

  const [getArmours, setGetArmour] = useState([]);
  const fetchGetArmour = async () => {
    try {
      const response = await armour();
      setGetArmour(response.data);
    } catch (error) {
      console.error("error fetching armour datas", error);
    }
  };

  const [getSpells, setGetSpells] = useState([]);
  const fetchGetSpells = async () => {
    try {
      const response = await spells();
      setGetSpells(response.data);
    } catch (error) {
      console.error("error fetching armour datas", error);
    }
  };

  const [getSpecies, setGetSpecies] = useState([]);
  const fetchGetSpecies = async () => {
    try {
      const response = await species();
      setGetSpecies(response.data);
    } catch (error) {
      console.error("error fetching armour datas", error);
    }
  };

  const [getProps, setGetProps] = useState([]);
  const fetchGetProps = async () => {
    try {
      const response = await props();
      setGetProps(response.data);
    } catch (error) {
      console.error("error fetching armour datas", error);
    }
  };

  useEffect(() => {
    fetchGenre();
    fetchUserDatas();
    fetchGetWeapon();
    fetchGetArmour();
    fetchGetSpells();
    fetchGetProps();
    fetchGetSpecies();
  }, []);

  if (goodToken) {
    userName = jwtDecode(token).nickname;
  } else {
    localStorage.removeItem("token");
  }

  const handleGenreChange = (e) => {
    const selectedId = e.target.value;
    if (selectedId) {
      navigate(`/genreById/${selectedId}`);
    }
  };

  return (
    <>
      <main className="mainProfile">

        <h2>Bienvenue sur votre profil {userName}</h2>
        
        <div className="tabsProfile">
          <Tabs defaultActiveKey="Inventaire"
            id="fill-tab-example"
            className="tabs"
            fill
          >
            <Tab eventKey="Informations Personnelles"
              title="Informations Personnelles"
              className="tab"
            >
              <div className="userForm">
                <ul>
                  <li className="infoUser">
                    Prénom :<span>{userProfile.firstName}</span>
                  </li>
                  <li className="infoUser">
                    Nom :<span>{userProfile.lastName}</span>
                  </li>
                  <li className="infoUser">
                    Surnom
                    <span>{userProfile.nickname}</span>
                  </li>
                  <li className="infoUser">
                    Date de naissance :<span>{userProfile.dateOfBirth}</span>
                  </li>
                  <li className="infoUser">
                    Email :<span>{userProfile.email}</span>
                  </li>
                  <li className="infoUser">
                    Mot de passe:
                    <PasswordModal show={show} onHide={handleClose} />
                  </li>
                  <li className="infoUser">
                    Date d'inscription:
                    <span>{userProfile.registerDate}</span>
                  </li>
                </ul>
                {/* <dl>
                  <div className="infoUser">
                    <dt>Prénom :</dt>
                    <dd>{userProfile.firstName}</dd>
                  </div>
                  <div className="infoUser">
                    <dt>Nom :</dt>
                    <dd>{userProfile.lastName}</dd>
                  </div>
                  <div className="infoUser">
                    <dt>Surnom :</dt>
                    <dd>{userProfile.nickname}</dd>
                  </div>
                  <div className="infoUser">
                    <dt>Date de naissance :</dt>
                    <dd>{userProfile.dateOfBirth}</dd>
                  </div>
                  <div className="infoUser">
                    <dt>Email :</dt>
                    <dd>{userProfile.email}</dd>
                  </div>
                  <div className="infoUser">
                    <dt>Mot de passe :</dt>
                    <dd><PasswordModal show={show} onHide={handleClose} /></dd>
                  </div>
                  <div className="infoUser">
                    <dt>Date d'inscription :</dt>
                    <dd>{userProfile.registerDate}</dd>
                  </div>
                </dl>
              </div> */}
              </div>
            </Tab>

            <Tab eventKey="Inventaire" title="Inventaire" className="tab">
              <Button className="Button" onClick={handleShowGenre}>
                Ajouter à l'inventaire
              </Button>
              <Modal centered
              show={showGenre} 
              onHide={handleCloseGenre}
              aria-labelledby="modal-genre-title">
                <Modal.Header closeButton>
                  <Modal.Title id="modal-genre-title">Dans quel genre voulez-vous ajouter un item?</Modal.Title>
                </Modal.Header>
                <Form.Select 
                  onChange={handleGenreChange}>
                  <option value="" >
                    Choisissez le genre
                  </option >
                  {genres.map((ge) => (
                    <option key={ge.idGenre} value={ge.idGenre}>
                      {ge.genreName}
                    </option>
                  ))}
                </Form.Select>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseGenre}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              <div className="flipCard">
                {getWeapons.map((w) => (
                  <WeaponCard
                    key={w.weaponName}
                    genre={w.genreName}
                    weaponName={w.weaponName}
                    weaponType={w.weaponType}
                    weaponEffects={w.weaponEffects}
                    weaponRange={w.weaponRange}
                    weaponDesc={w.weaponDesc}
                  />
                ))}

                {getArmours.map((a) => (
                  <ArmourCard
                    key={a.armourName}
                    genre={a.genreName}
                    armourName={a.armourName}
                    armourClass={a.armourClass}
                    armourEffects={a.armourEffects}
                    armourRange={a.armourRange}
                    armourDesc={a.armourDesc}
                  />
                ))}

                {getProps.map((p) => (
                  <PropsCard
                    key={p.propsName}
                    genre={p.genreName}
                    propsName={p.propsName}
                    propsEffect={p.propsEffect}
                    propsDesc={p.propsDesc}
                  />
                ))}

                {getSpecies.map((sp) => (
                  <SpeciesCard
                    key={sp.speciesName}
                    genre={sp.genreName}
                    speciesName={sp.speciesName}
                    speciesDesc={sp.speciesDesc}
                    speciesSpeed={sp.speciesSpeed}
                    strModifier={sp.strModifier}
                    dexModifier={sp.dexModifier}
                    conModifier={sp.conModifier}
                    intModifier={sp.intModifier}
                    wisModifier={sp.wisModifier}
                    chaModifier={sp.chaModifier}
                  />
                ))}

                {getSpells.map((s) => (
                  <SpellsCard
                    key={s.spellsName}
                    genre={s.genreName}
                    spellsName={s.spellsName}
                    spellsEffects={s.spellsEffects}
                    spellsRange={s.spellsRange}
                    spellsDesc={s.spellsDesc}
                  />
                ))}
              </div>
            </Tab>

            <Tab eventKey="Quêtes en cours"
              title="Quêtes en cours"
              className="tab"
            ></Tab>

          </Tabs>
        </div>

      </main>
    </>
  );
};

export default ProfilePage;
