const nFields = 4
let node_nominativo = document.querySelector("#nominativo")
let node_sesso = document.querySelector("#sesso")
let node_classe = document.querySelector("#classe")
let node_punteggio = document.querySelector("#punteggio")

let node_filtra_button = document.querySelector("#filtra")
let node_table = document.querySelector("#table")

let node_filtra_sesso = document.querySelector("#filtra_sesso")
let node_filtra_classe = document.querySelector("#filtra_classe")

let results = []

function addScore(){
    let nominativo = node_nominativo.value
    let sesso = node_sesso.value
    let classe = node_classe.value
    let punteggio = node_punteggio.value

    if(fieldsAreCorrect(nominativo,punteggio)){
        results.push({nominativo,sesso,classe,punteggio})
        node_nominativo.value = ""
        node_punteggio.value = ""
        localStorage.setItem("results", JSON.stringify(results))
    }else{
        alert("Compilare correttamente tutti i campi")
    }

    buildTable()
}

function createRow(nominativo,sesso,classe,punteggio){
    let tr = document.createElement("tr")
    
    let tdNome = document.createElement("td")
    tdNome.innerHTML = nominativo
    tr.appendChild(tdNome)

    let tdSesso = document.createElement("td")
    tdSesso.innerHTML = sesso
    tr.appendChild(tdSesso)
    
    let tdClasse = document.createElement("td")
    tdClasse.innerHTML = classe
    tr.appendChild(tdClasse)

    let tdPunteggio = document.createElement("td")
    tdPunteggio.innerHTML = punteggio
    tr.appendChild(tdPunteggio)

    return tr
}

function fieldsAreCorrect(nominativo,punteggio){
    if(nominativo.trim() === "")
        return false
    if(punteggio < 1 || punteggio > 40 || punteggio === "")
        return false
    return true
}

function filterData(){
    let filter_sesso = node_filtra_sesso.value
    let filter_classe = node_filtra_classe.value
    applyFilter(filter_sesso, filter_classe)
}

function buildTable(){
    node_table.innerHTML = ""
    buildTableHeader()

    for(let i=0; i<results.length; i++){
        let tr = createRow(results[i].nominativo, results[i].sesso, results[i].classe, results[i].punteggio)
        node_table.appendChild(tr)
    }
}

function applyFilter(filter_sesso,filter_classe){
    node_table.innerHTML = ""
    buildTableHeader()

    for(let i=0; i<results.length; i++){
        if((results[i].sesso === filter_sesso || filter_sesso == "") && (results[i].classe === filter_classe || filter_classe == "")){
            let tr = createRow(results[i].nominativo, results[i].sesso, results[i].classe, results[i].punteggio)
            node_table.appendChild(tr)
        }
    }

    node_filtra_button.setAttribute("onclick","removeFilter()")
    node_filtra_button.innerHTML = "Rimuovi filtri"
}

function buildTableHeader(){
    let tr = document.createElement("tr")
    let values = ["Nominativo", "Sesso", "Classe", "Punteggio"]

    for(let i=0; i<nFields; i++){
        let th = document.createElement("th")
        th.innerHTML = values[i]
        tr.appendChild(th)
    }

    node_table.appendChild(tr)
}

function removeFilter(){
    node_filtra_button.setAttribute("onclick", "filterData()")
    node_filtra_button.innerHTML = "Filtra"
    node_filtra_classe.value = ""
    node_filtra_sesso.value = ""
    buildTable()
}

function init(){
    results = JSON.parse(localStorage.getItem("results"))
    buildTable()
}
