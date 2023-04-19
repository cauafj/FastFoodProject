import "../../styles/obsbar.css"
import obs from "../../constants/obs.json"
import { useState } from "react"    

export default function Obsbar(props) {
    const [obsChecks, setObssChecks] = useState([])
    const attObsChecks = (event) => {
        if(event.target.checked === true) {
            if(obsChecks.find(element => element === event.target.name) === undefined) {
                obsChecks.push(event.target.name)
                setObssChecks(obsChecks)
            } 

        } else {
            const index = obsChecks.indexOf(event.target.name)
            obsChecks.splice(index, 1)
            setObssChecks(obsChecks)
        }
    }

    let obsTxt = ""
    const attObsTxt = (event) => {
        obsTxt = event.target.value
    }

    let allObs = {}
    const sendAllData = () => {
        if(obsTxt !== "") obsChecks.push(obsTxt)

        allObs = {
                name: props.product.name,
                price: props.product.price,
                obs: obsChecks
        }
        props.childToParent(allObs)
        setObssChecks([])
    }

    switch (props.state){
        case 0:
            return (
                <div className="obsbarContainer">
                    <h1 style={{color: "brown"}}>Aguardando produto...</h1>
                </div>
            )
        case 1:
            const obsOpts = obs.map(element => {
                return (
                    <input type="checkbox" key={element} name={element} value={element} onChange={attObsChecks}></input>
                )
            })
            const obsLabels = obs.map(element => {
                return (
                    <label>{element}</label>
                )
            })
        

            return (
                <div className="obsbarContainer">
                    <div className="formObs">
                        <div className="checkboxes">
                            {obsOpts.map(element => {
                                return <div>{element} {obsLabels[obsOpts.findIndex(e => e === element)]}</div>
                            })}
                        </div>
                        <textarea key="obsTxt" name="txt" onChange={attObsTxt}/>
                        <button onClick={sendAllData}>Próximo</button>
                    </div>
                </div>
            )

        default:
            console.log("Nenhum case da obsbar encontrado")
    }
}