import '../Styles/spellsCard.css'

const SpellsCard = ({spellsName, spellsRange, spellsDesc, spellsEffects}) => {
    
    return ( 
        <>
        <div className="spellsCard">  
        <div className="spellsRecto">
          <h2>Sort</h2>
          <h3>{spellsName}</h3>
          <span>
            Portée du sort : {spellsRange}
          </span>
        </div>
        <div className="spellsVerso">
          <span>
            Description : {spellsDesc}
          </span>
          {spellsEffects ? (
            <span>
              Effets : {spellsEffects}
            </span>
          ) : (
            <span>Effets : Sans effets particulier</span>
          )}
        </div>
      </div>
        </>
     );
}
 
export default SpellsCard;