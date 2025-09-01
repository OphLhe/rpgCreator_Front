import "../Styles/armourCard.css";

const ArrmourCard = ({armourName, armourDesc, armourClass, armourEffect}) => {
    return ( 
        <>
        <div className="armourCard">  
        <div className="armourRecto">
          <h2>Armure</h2>
          <h3>{armourName}</h3>
          <span>
            Classe d'armure : {armourClass}
          </span>
        </div>
        <div className="armourVerso">
          <span>
            Description : {armourDesc}
          </span>
          {armourEffect ? (
            <span>
              Effets : {armourEffect}
            </span>
          ) : (
            <span>Effets : Sans effets particulier</span>
          )}
        </div>
      </div>
        </>
     );
}
 
export default ArrmourCard;