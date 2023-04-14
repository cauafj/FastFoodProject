import "../../styles/cadProds.css"
import { useState } from "react"
import ChanginMenu from "./changinMenu.jsx"
import api from "../../services/api"

export default function CadProds(props) {
    const [changingMenu, setChangingMenu] = useState(0)


    return (
        <div className="cadContainer">
            <h2>O que você deseja fazer?</h2>
            <div className="choiceOpt">
                <button onClick={() => setChangingMenu(1)}>Editar produto</button>
                <button onClick={() => setChangingMenu(2)}>Adicionar produto </button>
                <button onClick={() => setChangingMenu(3)}>Remover produto</button>
            </div>
            <ChanginMenu opt={changingMenu} render={setChangingMenu}></ChanginMenu>
        </div>
    )
}