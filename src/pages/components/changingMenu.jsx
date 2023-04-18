import api from "../../services/api.js"
import { useState } from "react"
import "../../styles/changingMenu.css"

export default function ChangingMenu(props) {
    const { opt, prods } = props
    const [editedProd, setEditedProd] = useState()
    const [produc, setProduc] = useState({
        id: 0,
        name: "",
        price: 0,
        type: "xis"
    })

    const sendNewProd = () => {
        setProduc(produc)
        api.post("addProd", produc)
        setProduc({
            id: 0,
            name: "",
            price: 0,
            type: "xis"
        })
        props.render(0)
    }

    const removeProd = (product) => {
        api.post("deleteProd", product)
        props.render(0)
    }

    const editProd = (product) => {
        api.post("editProd", product)
        setEditedProd()
        props.render(0)
    }

    const prodForm = (product) => {
        let productTypes = ["xis", "hamburguer", "cachorroquente", "porcao", "bebida", "combo"]
        productTypes = productTypes.filter(e => e !== product.type)
        const selectType = (
            <select defaultValue={product.type} onChange={(e) => product.type = e.target.value}>
                <option value={product.type}>{product.type[0].toUpperCase() + product.type.substring(1)}</option>
                {productTypes.map(e => {
                    return (
                        <option value={e}>{e[0].toUpperCase() + e.substring(1)}</option>
                    )
                })}
            </select>
        )

        return (
            <div className="formContainer">
                    <label>
                       Nome: <input type="text" defaultValue={product.name} onChange={(e) => product.name = e.target.value}/>
                    </label>
                    <label>
                       Preço: <input type="text" defaultValue={product.price} onChange={(e) => product.price = e.target.value}/>
                    </label>
                    {selectType}
                    <button onClick={() => editProd(product)}>Enviar</button>
            </div>
        )
    } 

    switch(opt){
        case 0:
            console.log("aqui")
            break

        case 1: //editar
            return (
                <div className="editContainer">
                <div className="changeContainer ">
                    {prods.map(e => {
                        return (
                            <button onClick={() => setEditedProd(prodForm(e))}>{e.name}</button>
                        )
                    })}
                </div>
        
                {editedProd}

                </div>
            )

        case 2: //adicionar
            return (
                <div className="formContainer">
                    <label>
                       Nome: <input type="text" onChange={(e) => produc.name = e.target.value}/>
                    </label>
                    <label>
                       Preço: <input type="text" onChange={(e) => produc.price = e.target.value}/>
                    </label>
                    <select onChange={(e) => produc.type = e.target.value}>
                        <option value="xis">Xis</option>
                        <option value="hamburguer">Hamburguer</option>
                        <option value="cachorroquente">Cachorro quente</option>
                        <option value="porcao">Porção</option>
                        <option value="combo">Combo</option>
                        <option value="bebida">Bebida</option>
                    </select>
                    <button onClick={() => sendNewProd()}>Enviar</button>
                </div>
            )

        case 3: //remover   
            return (
                <div className="changeContainer">
                    {prods.map(e => {
                        return (
                            <button onClick={() => removeProd(e)}>{e.name}</button>
                        )
                    })}
                </div>
            )
        default:
            console.log("Não foi enviado o state que determina qual deverá ser o menu de escolha para edição de produto.")
    }

}