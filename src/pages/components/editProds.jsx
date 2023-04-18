import "../../styles/editProds.css"
import { useState } from "react"
import ChanginMenu from "./changingMenu.jsx"
import api from "../../services/api.js"


export default function CadProds() {
    const [changingMenu, setChangingMenu] = useState(0)
    const [prods, setProds] = useState([])
    const att = (state) => {
        api.get("products").then(res => {
            setProds(res.data)
        })
        setChangingMenu(state)
    }

    return (
        <div className="cadContainer">
            <h2>O que você deseja fazer?</h2>
            <div className="choiceOpt">
                <button onClick={() => att(1)}>Editar produto</button>
                <button onClick={() => att(2)}>Adicionar produto </button>
                <button onClick={() => att(3)}>Remover produto</button>
            </div>
            <ChanginMenu opt={changingMenu} render={setChangingMenu} prods={prods}></ChanginMenu>
        </div>
    )
}