import { Button, Form, Tab, Tabs } from "react-bootstrap";
import "../index.css";
import "../Styles/profilePage.css";
import { jwtDecode } from "jwt-decode";
import { verifyToken } from "../Services/tokenServices";
import { useEffect, useState } from "react";
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

const ProfilePage = () => {
  const token = localStorage.getItem("token");
  let userName = "";
  const goodToken = verifyToken(token);
  const [userProfile, setUserProfile] = useState({});
  const [getWeapons, setGetWeapon] = useState([]);
  const [getArmours, setGetArmour] = useState([]);
  const [getSpells, setGetSpells] = useState([]);
  const [getProps, setGetProps] = useState([]);
  const [getSpecies, setGetSpecies] = useState([]);

  const fetchUserDatas = async () => {
    try {
      const response = await getUserProfile();
      setUserProfile(response.data[0]);
    } catch (error) {
      console.error("error fetching user datas", error);
    }
  };

  const fetchGetWeapon = async () => {
    try {
      const response = await weapon();
      setGetWeapon(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error fetching weapon datas", error);
    }
  };

  const fetchGetArmour = async () => {
    try {
      const response = await armour();
      setGetArmour(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error fetching armour datas", error);
    }
  };

  const fetchGetSpells = async () => {
    try {
      const response = await spells();
      setGetSpells(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error fetching armour datas", error);
    }
  };

  const fetchGetSpecies = async () => {
    try {
      const response = await species();
      setGetSpecies(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error fetching armour datas", error);
    }
  };

  const fetchGetProps = async () => {
    try {
      const response = await props();
      setGetProps(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error fetching armour datas", error);
    }
  };

  useEffect(() => {
    fetchUserDatas();
    fetchGetWeapon();
    fetchGetArmour()
    fetchGetSpells()
    fetchGetProps()
    fetchGetSpecies()
  }, []);

  if (goodToken) {
    userName = jwtDecode(token).nickname;
  } else {
    localStorage.removeItem("token");
  }

  return (
    <>
      <main className="mainProfile">
        
          <h2>Bienvenue sur votre profil {userName}</h2>
          <div className="tabsProfile">
            <Tabs
              defaultActiveKey="Inventaire"
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
                      Nom :<span>{userProfile.email}</span>
                    </li>
                    <li className="infoUser">
                      Mot de passe:
                      <Button className="Button">
                        Modifier le mot de passe
                      </Button>
                    </li>
                    <li className="infoUser">
                      Date d'inscription:
                      <span>{userProfile.registerDate}</span>
                    </li>
                  </ul>
                </div>
              </Tab>

              <Tab eventKey="Inventaire" title="Inventaire" className="tab">
                <div className="flipCard">
                  {getWeapons.map((w) => (
                    <WeaponCard
                      key={w.weaponName}
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
                      propsName={p.propsName}
                      propsEffect={p.propsEffect}
                      propsDesc={p.propsDesc}
                    />
                  ))}
                  
                  {getSpecies.map((sp) => (
                    <SpeciesCard
                      key={sp.speciesName}
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
