import "../../styles/sideBar.css"
import { useState } from "react"

export default function Sidebar(props) {
    
    /* props.prods.forEach(element => {
        if(pDivs.find(e => e.name === element.name) === undefined){
            pDivs.push(
                <div>
                    <h3>{element.name}-R${element.price}</h3>
                    {element.obs.map(el => {return (<p>{el}</p>)})}
                </div>
            )

        } else {

        }
    }) */

    const returnProdObs = (prodObs, completeProd) => {
        if(prodObs !== undefined) {
            console.log("cu")
            return prodObs.map(e => {
                return (
                    <div>{e.obsName}/{e.obsQtd}/id:{completeProd.qtd}</div>
                )
            })

        } else return null
    }

    const screenDivs = props.prods.map(e => {return (<div>{e.name}/{e.qtd}/{e.price}/{returnProdObs(e.obsses, e)}</div>)})


    console.log("props.prods da sidebar")
    console.log(props.prods)

    return (
        <div className="sidebar">
            <h1>{props.title}</h1>
            <div className="productsArray">
                {screenDivs}
            </div>
        </div>
    )
}