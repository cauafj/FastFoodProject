import api from "../../services/api.js"
import { useState, useEffect } from "react"

export default function ChangingMenu(props) {
    const opt = props.opt
    const [editedProd, setEditedProd] = useState()
    const [prods, setProds] = useState([])

    useEffect(() => {
        api.get("products").then((res) =>{
            setProds(res.data)
        })
    }, [])

    const sendNewProd = (product) => {
        api.post("addProd", product)
        props.render(0)
    }

    const removeProd = (product) => {
        api.post("deleteProd", product)
        props.render(0)
    }

    const editProd = (product) => {
        api.post("editProd", product)
        props.render(0)
    }

    const prodForm = (product) => {
        return (
            <div className="changeContainer">
                    <label>
                       Nome: <input type="text" defaultValue={product.name} onChange={(e) => product.name = e.target.value}/>
                    </label>
                    <label>
                       Preço: <input type="text" defaultValue={product.price} onChange={(e) => product.price = e.target.value}/>
                    </label>
                    <select defaultValue={product.type} onChange={(e) => product.type = e.target.value}>
                        <option value="xis">Xis</option>
                        <option value="hamburguer">Hamburguer</option>
                        <option value="cachorroquente">Cachorro quente</option>
                        <option value="porcao">Porção</option>
                        <option value="combo">Combo</option>
                        <option value="bebida">Bebida</option>
                    </select>
                    <button onClick={() => editProd(product)}>Enviar</button>
            </div>
        )
    } 

    switch(opt){
        case 0:
            return <div className="changeContainer"></div>

        case 1: //editar
            return (
                <div className="changeContainer">
                {prods.map(e => {
                    return (
                        <button onClick={() => setEditedProd(prodForm(e))}>{e.name}</button>
                    )
                })}
        
                {editedProd}

                </div>
            )


        case 2: //adicionar
            const produc = {
                name: "",
                price: 0,
                type: ""
            }

            return (
                <div className="changeContainer">
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
                    <button onClick={() => sendNewProd(produc)}>Enviar</button>
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
    }

}