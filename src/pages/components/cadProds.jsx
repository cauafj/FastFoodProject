import "../../styles/cadProds.css"

export default function CadProds(props) {
    let name
    const attName = (event) => {
        name = event.target.value
    }

    let price
    const attPrice = (event) => {
        price = event.target.value
    }

    let type
    const attType = (event) => {
        type = event.target.value
    }

    const addProduct = () => {
        
    }

    return (
        <div className="cadContainer">
            <form className="monitor">
                <input required type="text" id="nameInput" onChange={() => attName()}/>
                <input required type="text" id="priceInput" onChange={() => attPrice()}/>
                <select required name="type" id="selectType" onChange={() => attType()}>
                    <option value="xis">Xis</option>
                    <option value="hamburguer">Hamburguer</option>
                    <option value="cachorroquente">Cachorro Quente</option>
                    <option value="porcao">Porcao</option>
                    <option value="combo">Combo</option>
                    <option value="bebida">Bebida</option>
                </select>
                <button>Aidicionar produto</button>
            </form>
        </div>
    )
}