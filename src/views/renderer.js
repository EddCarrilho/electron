/**
 * Processo de renderização do documento index.html
 */

console.log("Processo de renderização")

// vinculado ao preload.js
console.log(`Electron: ${api.verElectron()}`)
api.hello()

//função que é executada quando o botão for clicado
function sobre() {
    api.openAbout()
}