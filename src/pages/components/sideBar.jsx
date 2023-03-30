import "../../styles/sideBar.css"
import { useState } from "react"

export default function Sidebar(props) {
    const returnProdObs = (prodObs) => {
        prodObs = prodObs.filter(e => e !== undefined)
        console.log("prodObs")
        console.log(prodObs)
        if(prodObs.length) {
            return prodObs.map(e => {
                return (
                    <p className="obsP">{e.obsName} x{e.obsQtd}</p>
                )
            })

        } else return null
    }

    const fullPrice = props.prods !== undefined ? props.prods.reduce((start, e) => start + e.price*e.qtd,0) : 0

    const screenDivs = props.prods.map(e => {return (<div className="productDiv"><h3>{e.name} x{e.qtd} - R${e.price*e.qtd}</h3>{returnProdObs(e.obsses, e)}</div>)})
    
    const [payMeth, setPayMeth] = useState("Forma de pagamento")

    let txtArea = ""
    const attTxtArea = (event) => {
        txtArea = event.target.value
        console.log(txtArea)
    }

    return (
        <div className="sidebar">
            <div className="head"><h1>{props.title}</h1><button>imprimir</button></div>
            <div id="underTitle">
                <div className="productsArray">
                    {screenDivs}
                </div>
                <div className="fixedDiv">
                    <h3>R${fullPrice.toFixed(2)}</h3>
                    <div className="obsNote">
                        <textarea onChange={attTxtArea}></textarea>
                    </div>
                    <h3 className="payment">{(payMeth[0].toUpperCase() + payMeth.substring(1)).replace("ta", "tã")}</h3>
                    <div className="paymentChoice">
                        <button onClick={() => setPayMeth("cartao")}>Cartão</button>
                        <button onClick={() => setPayMeth("dinheiro")}>Dinheiro</button>
                        <button onClick={() => setPayMeth("pix")}>PIX</button>
                    </div>
                </div>
            </div>
        </div>
    )
}