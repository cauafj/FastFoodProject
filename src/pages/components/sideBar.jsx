import "../../styles/sideBar.css"
import { useState, useEffect } from "react"

export default function Sidebar(props) {
    const prods = props.prods
    console.log("obsses")
    console.log(prods[0])

    const attProduct = (type, productType, event) => {
        const productIndex = prods.findIndex(e => e.name === event.target.name)
        if(productType === "baseProduct") {
            if(type === 0){
                prods[productIndex].qtd = prods[productIndex].qtd - 1
            } else {
                prods[productIndex].qtd = prods[productIndex].qtd + 1
            }

        } else {
            const obsIndex = prods[productIndex].obsses.findIndex(e => e.obsName === event.target.id)
            if(type === 0){
                prods[productIndex].obsses[obsIndex].obsQtd = prods[productIndex].obsses[obsIndex].obsQtd - 1
                prods[productIndex].qtd = prods[productIndex].qtd - 1
            } else {
                prods[productIndex].obsses[obsIndex].obsQtd = prods[productIndex].obsses[obsIndex].obsQtd + 1
                prods[productIndex].qtd = prods[productIndex].qtd + 1
            }

            if(prods[productIndex].obsses[obsIndex].obsQtd === 0) {
                prods[productIndex].obsses.splice(obsIndex, 1)
            }
        } 

        if(prods[productIndex].qtd === 0) {
            prods.splice(productIndex, 1)
        }

        props.attSideBarData(prods)
        setScreenDivs(prods.map(e => {return (<div className="productDiv"><h3>{e.name} x{e.qtd} - R${e.price*e.qtd}<button name={e.name} onClick={(e) => attProduct(0, "baseProduct", e)}>-</button><button name={e.name} onClick={(e) => attProduct(1, "baseProduct", e)}>+</button></h3>{returnProdObs(e.obsses, e.name)}</div>)}))
    }

    const returnProdObs = (prodObs, productName) => {
        prodObs = prodObs.filter(e => e !== undefined)
        if(prodObs.length) {
            return prodObs.map(e => {
                return (
                    <p className="obsP">{e.obsName} x{e.obsQtd}<button name={productName} id={e.obsName} onClick={(e) => attProduct(0, "productObs", e)}>-</button><button name={productName} id={e.obsName} onClick={(e) => attProduct(1, "productObs", e)}>+</button></p>
                )
            })

        } else return null
    }

    const [screenDivs, setScreenDivs] = useState(prods.map(e => {return (<div className="productDiv"><h3>{e.name} x{e.qtd} - R${e.price*e.qtd}<button name={e.name} onClick={(e) => attProduct(0, "baseProduct", e)}>-</button><button name={e.name} onClick={(e) => attProduct(1, "baseProduct", e)}>+</button></h3>{returnProdObs(e.obsses, e.name)}</div>)}))
    
    const attScreenDivs = () => {
        setScreenDivs(prods.map(e => {return (<div className="productDiv"><h3>{e.name} x{e.qtd} - R${e.price*e.qtd}<button name={e.name} onClick={(e) => attProduct(0, "baseProduct", e)}>-</button><button name={e.name} onClick={(e) => attProduct(1, "baseProduct", e)}>+</button></h3>{returnProdObs(e.obsses, e.name)}</div>)}))
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