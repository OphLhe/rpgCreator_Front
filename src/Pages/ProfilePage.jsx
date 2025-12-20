// import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
// import "../index.css";
// import "../Styles/profilePage.css";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { genre } from "../Services/genreServices";
// import { getUserProfile } from "../Services/userServices";
// import { weapon } from "../Services/weaponServices";
// import { armour } from "../Services/armourServices";
// import { spells } from "../Services/spellsServices";
// import { props } from "../Services/propsServices";
// import { species } from "../Services/speciesServices";
// import { classWithSkills } from "../Services/classSkillsServices";
// import { allNpcWithClasses } from "../Services/npcClassServices";
// import { allPlayersCharWithClasses } from "../Services/playersCharClassServices";
// import { story } from "../Services/storyServices";
// import WeaponCard from "../Components/WeaponCard";
// import ArmourCard from "../Components/ArmourCard";
// import SpellsCard from "../Components/SpellsCard";
// import PropsCard from "../Components/PropsCard";
// import SpeciesCard from "../Components/SpeciesCard";
// import ClassCard from "../Components/ClassCard";
// import PasswordModal from "../Components/PasswordModal";
// import NPCCard from "../Components/NPCCard";
// import PlayerscharCard from "../Components/PlayerscharCard";
// import StoryCard from "../Components/StoryCard";
// import { showInfoToast } from "../Utils/toastConfig";

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   let userName = "";
//   const goodToken = verifyToken(token);

//    if (goodToken) {
//     userName = jwtDecode(token).nickname;
//   } else {
//     localStorage.removeItem("token");
//   }

//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);

//   const [showGenre, setShowGenre] = useState(false);
//   const handleCloseGenre = () => setShowGenre(false);
//   const handleShowGenre = () => setShowGenre(true);

//   const [genres, setGenres] = useState([]);
//   const fetchGenre = async () => {
//     try {
//       const response = await genre();
//       setGenres(response.data);
//     } catch (error) {
//       console.error("error fetching genre by id", error);
//     }
//   };

//   const [userProfile, setUserProfile] = useState({});
//   const fetchUserDatas = async () => {
//     try {
//       const response = await getUserProfile();
//       setUserProfile(response.data.user);
//       console.log(response.data.user);
//     } catch (error) {
//       console.error("error fetching user datas", error);
//     }
//   };

//   const [getWeapons, setGetWeapon] = useState([]);
//   const fetchGetWeapon = async () => {
//     try {
//       const response = await weapon();
//       setGetWeapon(response.data);
//     } catch (error) {
//       console.error("error fetching weapon datas", error);
//     }
//   };

//   const [getArmours, setGetArmour] = useState([]);
//   const fetchGetArmour = async () => {
//     try {
//       const response = await armour();
//       setGetArmour(response.data);
//     } catch (error) {
//       console.error("error fetching armour datas", error);
//     }
//   };

//   const [getSpells, setGetSpells] = useState([]);
//   const fetchGetSpells = async () => {
//     try {
//       const response = await spells();
//       setGetSpells(response.data);
//     } catch (error) {
//       console.error("error fetching armour datas", error);
//     }
//   };

//   const [getSpecies, setGetSpecies] = useState([]);
//   const fetchGetSpecies = async () => {
//     try {
//       const response = await species();
//       setGetSpecies(response.data);
//     } catch (error) {
//       console.error("error fetching armour datas", error);
//     }
//   };

//   const [getProps, setGetProps] = useState([]);
//   const fetchGetProps = async () => {
//     try {
//       const response = await props();
//       setGetProps(response.data);
//     } catch (error) {
//       console.error("error fetching armour datas", error);
//     }
//   };

//   const [getClass, setGetClass] = useState([]);
//   const fetchGetClass = async () => {
//     try {
//       const response = await classWithSkills();
//       setGetClass(response.data);
//     } catch (error) {
//       console.error("error fetching class datas", error);
//     }
//   };

//   const [getNpc, setGetNpc] = useState([]);
//   const fetchGetNpc = async () => {
//     try {
//       const response = await allNpcWithClasses();
//       setGetNpc(response.data.result);
//     } catch (error) {
//       console.error("error fetching npc datas", error);
//     }
//   };

//   const [getPlayerschar, setGetPlayerschar] = useState([]);
//   const fetchGetPlayerschar = async () => {
//     try {
//       const response = await allPlayersCharWithClasses();
//       setGetPlayerschar(response.data.result);
//     } catch (error) {
//       console.error("error fetching  player's character datas", error);
//     }
//   };

//   const [getStory, setGetStory] = useState([]);
//   const fetchGetStory = async () => {
//     try {
//       const response = await story();
//       setGetStory(response.data.result);
//     } catch (error) {
//       console.error("error fetching story datas", error);
//     }
//   };

//   useEffect(() => {
//     fecthUser();
//     fetchGenre();
//     fetchUserDatas();
//     fetchGetWeapon();
//     fetchGetArmour();
//     fetchGetSpells();
//     fetchGetProps();
//     fetchGetSpecies();
//     fetchGetClass();
//     fetchGetNpc();
//     fetchGetPlayerschar();
//     fetchGetStory();
//   }, [navigate]);

//   const handleGenreChange = (e) => {
//     const selectedId = e.target.value;
//     if (selectedId) {
//       navigate(`/genreById/${selectedId}`);
//     }
//   };

//   return (
//     <>
//       <main className="mainProfile">
//         <h1>Bienvenue sur votre profil {user?.nickname || "Utilisateur"}</h1>

//         <div className="tabsProfile">
//           <Tabs
//             defaultActiveKey="Inventaire"
//             id="fill-tab-example"
//             className="tabs"
//             fill
//           >
//             <Tab
//               eventKey="Informations Personnelles"
//               title="Informations Personnelles"
//               className="tab"
//             >
//               <div className="userForm">
//                 <ul>
//                   <li className="infoUser">
//                     Prénom :<span>{userProfile.firstName}</span>
//                   </li>
//                   <li className="infoUser">
//                     Nom :<span>{userProfile.lastName}</span>
//                   </li>
//                   <li className="infoUser">
//                     Surnom
//                     <span>{userProfile.nickname}</span>
//                   </li>
//                   <li className="infoUser">
//                     Date de naissance :<span>{userProfile.dateOfBirth}</span>
//                   </li>
//                   <li className="infoUser">
//                     Email :<span>{userProfile.email}</span>
//                   </li>
//                   <li className="infoUser">
//                     Mot de passe:
//                     <PasswordModal show={show} onHide={handleClose} />
//                   </li>
//                   <li className="infoUser">
//                     Date d'inscription:
//                     <span>{userProfile.registerDate}</span>
//                   </li>
//                 </ul>
//               </div>
//             </Tab>

//             <Tab eventKey="Inventaire" title="Inventaire" className="tab">
//               <Button className="Button" onClick={handleShowGenre}>
//                 Ajouter à l'inventaire
//               </Button>
//               <Modal
//                 centered
//                 show={showGenre}
//                 onHide={handleCloseGenre}
//                 aria-labelledby="modal-genre-title"
//               >
//                 <Modal.Header closeButton>
//                   <Modal.Title id="modal-genre-title">
//                     Dans quel genre voulez-vous ajouter un item?
//                   </Modal.Title>
//                 </Modal.Header>
//                 <Form.Select onChange={handleGenreChange}>
//                   <option value="">Choisissez le genre</option>
//                   {genres.map((ge) => (
//                     <option key={ge.idGenre} value={ge.idGenre}>
//                       {ge.genreName}
//                     </option>
//                   ))}
//                 </Form.Select>
//                 <Modal.Footer>
//                   <Button variant="secondary" onClick={handleCloseGenre}>
//                     Close
//                   </Button>
//                 </Modal.Footer>
//               </Modal>

//               <div className="flipCard">
//                 {getWeapons.map((w) => (
//                   <WeaponCard
//                     key={w.idWeapon}
//                     idWeapon={w.idWeapon}
//                     genre={w.genreName}
//                     weaponName={w.weaponName}
//                     weaponType={w.weaponType}
//                     weaponEffects={w.weaponEffects}
//                     weaponRange={w.weaponRange}
//                     weaponDesc={w.weaponDesc}
//                     fetchGetWeapon={fetchGetWeapon}
//                   />
//                 ))}

//                 {getArmours.map((a) => (
//                   <ArmourCard
//                     key={a.idArmour}
//                     idArmour={a.idArmour}
//                     genre={a.genreName}
//                     armourName={a.armourName}
//                     armourClass={a.armourClass}
//                     armourEffects={a.armourEffects}
//                     armourRange={a.armourRange}
//                     armourDesc={a.armourDesc}
//                     fetchGetArmour={fetchGetArmour}
//                   />
//                 ))}

//                 {getProps.map((p) => (
//                   <PropsCard
//                     key={p.idProps}
//                     idProps={p.idProps}
//                     genre={p.genreName}
//                     propsName={p.propsName}
//                     propsEffect={p.propsEffect}
//                     propsDesc={p.propsDesc}
//                     fetchGetProps={fetchGetProps}
//                   />
//                 ))}

//                 {getSpecies.map((sp) => (
//                   <SpeciesCard
//                     key={sp.idSpecies}
//                     idSpecies={sp.idSpecies}
//                     genre={sp.genreName}
//                     speciesName={sp.speciesName}
//                     speciesDesc={sp.speciesDesc}
//                     speciesSpeed={sp.speciesSpeed}
//                   />
//                 ))}

//                 {getSpells.map((s) => (
//                   <SpellsCard
//                     key={s.idSpells}
//                     idSpells={s.idSpells}
//                     genre={s.genreName}
//                     spellsName={s.spellsName}
//                     spellsEffects={s.spellsEffects}
//                     spellsRange={s.spellsRange}
//                     spellsDesc={s.spellsDesc}
//                     fetchGetSpells={fetchGetSpells}
//                   />
//                 ))}

//                 {getClass.map((c) => (
//                   <ClassCard
//                     key={c.idClass}
//                     idClass={c.idClass}
//                     className={c.className}
//                     classDesc={c.classDesc}
//                     skills={c.skills}
//                     classPv={c.classPv}
//                     fetchGetClass={fetchGetClass}
//                   />
//                 ))}

//                 {getNpc.map((n) => (
//                   <NPCCard
//                     key={n.idNpcClass}
//                     idNpc={n.idNpc}
//                     npcFirstName={n.npcFirstName}
//                     npcLastName={n.npcLastName}
//                     npcNickname={n.npcNickname}
//                     npcGender={n.npcGender}
//                     npcAge={n.npcAge}
//                     npcBiography={n.npcBiography}
//                     npcPhysic={n.npcPhysic}
//                     npcLevel={n.npcLevel}
//                     speciesName={n.speciesName}
//                     className={n.className}
//                     validatedSkills={n.validatedSkills}
//                   />
//                 ))}

//                 {getPlayerschar.map((pc) => (
//                   <PlayerscharCard
//                     key={pc.idPlayerscharClass}
//                     idPlayersCharacter={pc.idPlayersCharacter}
//                     firstName={pc.firstName}
//                     lastName={pc.lastName}
//                     nickname={pc.nickname}
//                     gender={pc.gender}
//                     age={pc.age}
//                     biography={pc.biography}
//                     physic={pc.physic}
//                     level={pc.level}
//                     idSpecies={pc.speciesId}
//                     speciesName={pc.speciesName}
//                     className={pc.className}
//                     validatedSkills={pc.validatedSkills}
//                     fetchGetPlayerschar={fetchGetPlayerschar}
//                   />
//                 ))}

//                 {getStory.map((st) => (
//                   <StoryCard
//                     key={st.idStory}
//                     idStory={st.idStory}
//                     genre={st.genreName}
//                     title={st.title}
//                     synopsis={st.synopsis}
//                     creationDate={st.creationDate}
//                     exposition={st.exposition}
//                     risingAction={st.risingAction}
//                   />
//                 ))}
//               </div>
//             </Tab>

//             <Tab
//               eventKey="Quêtes en cours"
//               title="Quêtes en cours"
//               className="tab"
//             ></Tab>
//           </Tabs>
//         </div>
//       </main>
//     </>
//   );
// };

// export default ProfilePage;

import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
import "../index.css";
import "../Styles/profilePage.css";
import { jwtDecode } from "jwt-decode";
import { verifyToken } from "../Services/tokenServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { genre } from "../Services/genreServices";
import { getUserProfile } from "../Services/userServices";
import { weapon } from "../Services/weaponServices";
import { armour } from "../Services/armourServices";
import { spells } from "../Services/spellsServices";
import { props } from "../Services/propsServices";
import { species } from "../Services/speciesServices";
import { classWithSkills } from "../Services/classSkillsServices";
import { allNpcWithClasses } from "../Services/npcClassServices";
import { allPlayersCharWithClasses } from "../Services/playersCharClassServices";
import { story } from "../Services/storyServices";
import WeaponCard from "../Components/WeaponCard";
import ArmourCard from "../Components/ArmourCard";
import SpellsCard from "../Components/SpellsCard";
import PropsCard from "../Components/PropsCard";
import SpeciesCard from "../Components/SpeciesCard";
import ClassCard from "../Components/ClassCard";
import PasswordModal from "../Components/PasswordModal";
import NPCCard from "../Components/NPCCard";
import PlayerscharCard from "../Components/PlayerscharCard";
import StoryCard from "../Components/StoryCard";

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

  const [getClass, setGetClass] = useState([]);
  const fetchGetClass = async () => {
    try {
      const response = await classWithSkills();
      setGetClass(response.data);
    } catch (error) {
      console.error("error fetching class datas", error);
    }
  }

  const [getNpc, setGetNpc] = useState([]);
  const fetchGetNpc = async () => {
    try {
      const response = await allNpcWithClasses(); 
      setGetNpc(response.data.result);
    } catch (error) {
      console.error("error fetching npc datas", error);  
    }
  }

  const [getPlayerschar, setGetPlayerschar] = useState([]);
  const fetchGetPlayerschar = async () => {
    try {
      const response = await allPlayersCharWithClasses(); 
      setGetPlayerschar(response.data.result);
    } catch (error) {
      console.error("error fetching  player's character datas", error);  
    }
  }

  const [getStory, setGetStory] = useState([]);
  const fetchGetStory = async () => {
    try {
      const response = await story();
      setGetStory(response.data.result);  
    } catch (error) {
      console.error("error fetching story datas", error);   
    }
  }

  useEffect(() => {
    fetchGenre();
    fetchUserDatas();
    fetchGetWeapon();
    fetchGetArmour();
    fetchGetSpells();
    fetchGetProps();
    fetchGetSpecies();
    fetchGetClass();
    fetchGetNpc();
    fetchGetPlayerschar();
    fetchGetStory();
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

        <h1>Bienvenue sur votre profil {userName}</h1>
        
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
                    key={w.idWeapon}
                    idWeapon={w.idWeapon}
                    genre={w.genreName}
                    weaponName={w.weaponName}
                    weaponType={w.weaponType}
                    weaponEffects={w.weaponEffects}
                    weaponRange={w.weaponRange}
                    weaponDesc={w.weaponDesc}
                    fetchGetWeapon={fetchGetWeapon}
                  />
                ))}

                {getArmours.map((a) => (
                  <ArmourCard
                    key={a.idArmour}
                    idArmour={a.idArmour}
                    genre={a.genreName}
                    armourName={a.armourName}
                    armourClass={a.armourClass}
                    armourEffects={a.armourEffects}
                    armourRange={a.armourRange}
                    armourDesc={a.armourDesc}
                    fetchGetArmour={fetchGetArmour}
                  />
                ))}

                {getProps.map((p) => (
                  <PropsCard
                    key={p.idProps}
                    idProps={p.idProps}
                    genre={p.genreName}
                    propsName={p.propsName}
                    propsEffect={p.propsEffect}
                    propsDesc={p.propsDesc}
                    fetchGetProps={fetchGetProps}
                  />
                ))}

                {getSpecies.map((sp) => (
                  <SpeciesCard
                    key={sp.idSpecies}
                    idSpecies={sp.idSpecies}
                    genre={sp.genreName}
                    speciesName={sp.speciesName}
                    speciesDesc={sp.speciesDesc}
                    speciesSpeed={sp.speciesSpeed}
                  />
                ))}

                {getSpells.map((s) => (
                  <SpellsCard
                    key={s.idSpells}
                    idSpells={s.idSpells}
                    genre={s.genreName}
                    spellsName={s.spellsName}
                    spellsEffects={s.spellsEffects}
                    spellsRange={s.spellsRange}
                    spellsDesc={s.spellsDesc}
                    fetchGetSpells={fetchGetSpells}
                  />
                ))}

                {getClass.map((c) => (
                  <ClassCard
                    key={c.idClass}
                    idClass={c.idClass}
                    className={c.className}
                    classDesc={c.classDesc}
                    skills={c.skills}
                    classPv={c.classPv}
                    fetchGetClass={fetchGetClass}
                  />
                ))}

                {getNpc.map((n) => (
                  <NPCCard
                    key={n.idNpcClass}
                    idNpc={n.idNpc}
                    npcFirstName={n.npcFirstName}
                    npcLastName={n.npcLastName}
                    npcNickname={n.npcNickname}
                    npcGender={n.npcGender}
                    npcAge={n.npcAge}
                    npcBiography={n.npcBiography}
                    npcPhysic={n.npcPhysic}
                    npcLevel={n.npcLevel}
                    speciesName={n.speciesName}
                    className={n.className}
                    validatedSkills={n.validatedSkills}
                  />
                ))}

                {getPlayerschar.map((pc) => (
                  <PlayerscharCard
                    key={pc.idPlayerscharClass}
                    idPlayersCharacter={pc.idPlayersCharacter}
                    firstName={pc.firstName}
                    lastName={pc.lastName}
                    nickname={pc.nickname}
                    gender={pc.gender}
                    age={pc.age}
                    biography={pc.biography}
                    physic={pc.physic}
                    level={pc.level}
                    idSpecies={pc.speciesId}
                    speciesName={pc.speciesName}
                    className={pc.className}
                    validatedSkills={pc.validatedSkills}
                    fetchGetPlayerschar={fetchGetPlayerschar}
                  />
                ))}

                {getStory.map((st) => (
                  <StoryCard
                    key={st.idStory}
                    idStory={st.idStory}
                    genre={st.genreName}
                    title={st.title}
                    synopsis={st.synopsis}
                    creationDate={st.creationDate}
                    exposition={st.exposition}
                    risingAction={st.risingAction}
                  />
                ))}

              </div>
            </Tab>

            <Tab eventKey="Quêtes en cours"
              title="Quêtes en cours"
              className="tab"
            >

            </Tab>

          </Tabs>
        </div>

      </main>
    </>
  );
};

export default ProfilePage;