import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

export default function pdfGenerator(prods, fullPrice, txtArea, payMeth) {
    console.log("txtArea")
    console.log(prods)
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    if(payMeth === "Forma de pagamento") {
        alert("forma de pagamento não definida")
    } else {
        const reportTitle = [
            {
                text: "Pedido",
                fontSize: 30,
                bold: true,
                marginBottom: 15
            }
        ]
    
        const reportProds = prods.map(e => {
            return {
                text: `${e.name} x${e.qtd} - R$${e.price.toFixed(2)}\n${
                            (e.obsses.length) ? e.obsses.map(el => {return (`${el.obsName} x${el.obsQtd}\n`)}) : ""
                        }`.replace(',', ""),
    
                marginBottom: 10
            }
        })
    
        const reportFullPrice = [
            {
                text: "Preço Total:",
                fontSize: 20,
                bold: true
            },
            {
                text: `R$${fullPrice.toFixed(2)}`,
                fontSize: 15,
                marginBottom: 15
            }
        ]
    
        const reportObs = [
            {
                text: "Observações",
                fontSize: 20,
                bold: true
            },
            {
                text: txtArea,
                maringLeft: 10,
                marginBottom: 15
            }
        ]
        
    
        const reportPayMeth = [
            {
                text: "Pagamento",
                fontSize: 20,
                bold: true
            },
            {
                text: (payMeth[0].toUpperCase() + payMeth.substring(1)).replace("ta", "tã"),
                fontSize: 15
            }
        ]
    
        const docDef = {
            pageSize: {width: 164, height : "auto"},
            pageMargins: [2, 2, 2, 2],
            content: [reportTitle, reportProds, reportFullPrice, reportObs, reportPayMeth]
        }
    
        pdfMake.createPdf(docDef).open()
    }


}