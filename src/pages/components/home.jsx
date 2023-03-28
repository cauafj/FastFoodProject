import "../../styles/home.css"
import Sidebar from "./sideBar.jsx"
import products from "../../constants/products.json"
import Obsbar from "./obsbar.jsx"
import { useState } from "react"

export default function Home() {
    const [sideBarData, setSideBarData] = useState([])
    const attSideBarData = (data) => {
        setSideBarData(data)
    }

    const [sideBar, setSideBar] = useState(
        <Sidebar title="Nota Fiscal" prods={sideBarData}></Sidebar>
    )
    const attSideBar = () => {
        setSideBar(<Sidebar title="Nota Fiscal" prods={sideBarData}></Sidebar>)
    }

    const [obsBar, setObsBar] = useState(<Obsbar state={0}></Obsbar>)

    const obsBarWithProduct = (product) => setObsBar(
        <Obsbar state={1} product={product} childToParent={obsBarToHome}></Obsbar>
    )

    const obsBarToHome = (obsBarData) => {
        setObsBar(<Obsbar state={0}></Obsbar>)
        const productAtCart = sideBarData.find(element => element.name === obsBarData.name)
        console.log("obs em map")
        console.log(obsBarData.obs.map(e => e))

        const arrayProduct = {
            name: obsBarData.name,
            price: obsBarData.price,
            qtd: 1,
            obsses: (obsBarData.obs.sort().map(e => {return{obsName: e, obsQtd: 1}}))
        }

        console.log("arrayProduct")
        console.log(arrayProduct)

        if(arrayProduct.obsses.length > 1){
            const obsNames = arrayProduct.obsses.map(e => e.obsName)
            arrayProduct.obsses = [{obsName: obsNames.sort().join(" "), obsQtd: 1}]
        }

        if(productAtCart === undefined){
            sideBarData.push(arrayProduct)

        } else {
            const index = sideBarData.findIndex(e => e.name === arrayProduct.name)
            sideBarData[index].qtd += 1
            console.log("sideBar[index]")
            console.log(index)
            console.log(sideBarData[index])

            if(arrayProduct.obsses.length) {
                sideBarData[index].obsses.forEach(e => {
                    arrayProduct.obsses.forEach(el => {
                        if(el.obsName === e.obsName){
                            e.obsQtd+=1
                        } else if(sideBarData[index].obsses.find(e => e.obsName === el.obsName) === undefined || sideBarData[index].obsses === []){
                            console.log("julio")
                            sideBarData[index].obsses.push(el)

                        }
                    })
                })
            }
            if(!sideBarData[index].obsses.length) sideBarData[index].obsses.push(arrayProduct.obsses[0])
        }
        attSideBarData(sideBarData)
        attSideBar()
    }

    return (
        <div className="homeContainer">
            <div className="catsContainer">
                <div className="cat xis">
                    <h1>xis</h1>
                    <div>
                        {products.map(element => {
                            if(element.type === "xis") {
                                return (
                                <button key={element.name} onClick={() => obsBarWithProduct(element)}>
                                    {element.name} R${element.price.toFixed(2)}
                                </button>
                            )
                            } else return null
                        })}
                    </div>
                </div>
                
                <div className="cat hamburguer">
                    <h1>Hamburguer</h1>
                    <div>
                        {products.map(element => {
                            if(element.type === "hamburguer") {
                                return (
                                <button key={element.name} onClick={() => obsBarWithProduct(element)}>
                                    {element.name} R${element.price.toFixed(2)}
                                </button>
                            )
                            } else return null
                        })}
                    </div>
                </div>
                    
                <div className="cat hotdog">
                    <h1>HotDog</h1>
                    <div>
                        {products.map(element => {
                            if(element.type === "cachorroquente") {
                                return (
                                <button key={element.name} onClick={() => obsBarWithProduct(element)}>
                                    {element.name} R${element.price.toFixed(2)}
                                </button>
                            )
                            } else return null
                        })}
                    </div>
                </div>

                <div className="cat porcao">
                    <h1>Porção</h1>
                    <div>
                        {products.map(element => {
                            if(element.type === "porcao") {
                                return (
                                <button key={element.name} onClick={() => obsBarWithProduct(element)}>
                                    {element.name} R${element.price.toFixed(2)}
                                </button>
                            )
                            } else return null
                        })}
                    </div>
                </div>

                <div className="cat combo">
                    <h1>Combo</h1>
                    <div>
                        {products.map(element => {
                            if(element.type === "combo") {
                                return (
                                <button key={element.name} onClick={() => obsBarWithProduct(element)}>
                                    {element.name} R${element.price.toFixed(2)}
                                </button>
                            )
                            } else return null
                        })}
                    </div>
                </div>

                <div className="cat bebida">
                    <h1>Bebida</h1>
                    <div>
                        {products.map(element => {
                            if(element.type === "bebida") {
                                return (
                                <button key={element.name} onClick={() => obsBarWithProduct(element)}>
                                    {element.name} R${element.price.toFixed(2)}
                                </button>
                            )
                            } else return null
                        })}
                    </div>
                </div>
            </div>
            {obsBar}
            {sideBar}
        </div>
    )
}