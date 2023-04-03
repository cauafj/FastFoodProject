import "../../styles/sideBar.css"
import { useState, useEffect } from "react"

export default function Sidebar(props) {
    const prods = props.prods

    const returnProdObs = (prodObs) => {
        prodObs = prodObs.filter(e => e !== undefined)
        if(prodObs.length) {
            return prodObs.map(e => {
                return (
                    <p className="obsP">{e.obsName} x{e.obsQtd}</p>
                )
            })

        } else return null
    }

    const attProduct = (type, productType, event) => {
        if(productType === "baseProduct") {
            const index = prods.findIndex(e => e.name === event.target.name)
            if(type === 0){
                prods[index].qtd = prods[index].qtd - 1
            } else {
                prods[index].qtd = prods[index].qtd + 1
            }

        } else {

        } 
        props.attSideBarData(prods)
        setScreenDivs(prods.map(e => {return (<div className="productDiv"><h3>{e.name} x{e.qtd} - R${e.price*e.qtd}<button name={e.name} onClick={(e) => attProduct(0, "baseProduct", e)}>-</button><button name={e.name} onClick={(e) => attProduct(1, "baseProduct", e)}>+</button></h3>{returnProdObs(e.obsses, e)}</div>)}))
    }

    const [screenDivs, setScreenDivs] = useState(prods.map(e => {return (<div className="productDiv"><h3>{e.name} x{e.qtd} - R${e.price*e.qtd}<button name={e.name} onClick={(e) => attProduct(0, "baseProduct", e)}>-</button><button name={e.name} onClick={(e) => attProduct(1, "baseProduct", e)}>+</button></h3>{returnProdObs(e.obsses, e)}</div>)}))
    
    const attScreenDivs = () => {
        setScreenDivs(prods.map(e => {return (<div className="productDiv"><h3>{e.name} x{e.qtd} - R${e.price*e.qtd}<button name={e.name} onClick={(e) => attProduct(0, "baseProduct", e)}>-</button><button name={e.name} onClick={(e) => attProduct(1, "baseProduct", e)}>+</button></h3>{returnProdObs(e.obsses, e)}</div>)}))
        console.log("bagualou")
    }

    const fullPrice = prods !== undefined ? prods.reduce((start, e) => start + e.price*e.qtd,0) : 0

    const [payMeth, setPayMeth] = useState("Forma de pagamento")

    let txtArea = ""
    const attTxtArea = (event) => {
        txtArea = event.target.value
    }

    useEffect(() => {
        attScreenDivs()
    }, [props])

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