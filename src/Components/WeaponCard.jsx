import "../Styles/weaponCard.css";

const WeaponCard = ({ weaponName, weaponType, weaponDesc, weaponEffects, weaponRange }) => {

  return (
    <>
      <div className="weaponCard">
        <div className="weaponRecto">
          <h2>Arme</h2>
          <h3>{weaponName}</h3>
          <span>
            Type d'arme : {weaponType}
          </span>
          <span>
            Portée : {weaponRange}
          </span>
        </div>
        <div className="weaponVerso">
          <span>
            Description : {weaponDesc}
          </span>
          {weaponEffects ? (
            <span>
              Effets : {weaponEffects}
            </span>
          ) : (
            <span>Effets : Sans effets particulier</span>
          )}
        </div>
      </div>
    </>
  );
};

export default WeaponCard;
