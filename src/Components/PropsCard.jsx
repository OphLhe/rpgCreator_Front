import '../Styles/propsCard.css'

const PropsCard = ({propsName, propsDesc, propsEffect}) => {
    
    return ( 
        <>
        <div className="propsCard">  
        <div className="propsRecto">
          <h2>Artefact</h2>
          <h3>{propsName}</h3>
        </div>
        <div className="propsVerso">
           <span>
            Description : {propsDesc}
          </span>
          {propsEffect ? (
            <span>
              Effets : {propsEffect}
            </span>
          ) : (
            <span>Effets : Sans effets particulier</span>
          )}
        </div>
      </div>
        </>
     );
}
 
export default PropsCard;