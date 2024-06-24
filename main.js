const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain} = require('electron')

// relacionado ao preload.js (path é o caminho)
const path = require('node:path')

// janela principal
const createWindow = () => {
    //nativeTheme.themeSource = 'dark'
  const win = new BrowserWindow({
    width: 800, //largura
    height: 600, //altura
    icon: './src/public/img/pc.png',
    //resizable: false, //evitar o redimensionamento
    //titleBarStyle: 'hidden' //esconder barra de título e menu
    //autoHideMenuBar: true //esconder o menu
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Iniciar a janela com o menu personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  win.loadFile('./src/views/index.html')
}

// janela sobre
let about // Resolver BUG de abertura de várias janelas

const aboutWindow = () => {
      // se a janela about não estiver aberta (BUG 1) abrir
      if (!about) {
            about = new BrowserWindow({
                  width: 360, //largura
                  height: 220, //altura
                  icon: './src/public/img/pc.png',   
                  resizable: false, //evitar o redimensionamento
                  autoHideMenuBar: true //esconder o menu
              })
      }
      about.loadFile('./src/views/sobre.html')
      // BUG 2 (reabrir a janela se estiver fechada)
      about.on('closed', () => {
            about = null
      })
}

// Janela secundária
const childWindow = () => {
      // a linha abaixo obtém a janela pai (principal)
      const father = BrowserWindow.getFocusedWindow()
      if(father) {
            const child = new BrowserWindow({
                  width: 640,
                  height: 450,
                  icon: './src/public/img/pc.png',
                  autoHideMenuBar: true,
                  resizable: false,
                  parent: father, //estabelece a relação parent-child
                  modal: true //manter o foco do usuário na janela
            })
            child.loadFile('./src/views/child.html') 
      }
}     

// Executar de forma assíncrona a aplicação
app.whenReady().then(() => {
  createWindow()
})

//  template do menu personalizado

const template = [
  {
      label: 'Arquivo',
      submenu: [
        {
            label: 'Janela secundária',
            click: () => childWindow()
        },
        {
              label: 'Sair',
              click: () => app.quit(),
              accelerator: 'Alt+F4'
        }
      ]
  },
  {
      label: 'Exibir',
      submenu: [
        {
              label: 'Recarregar',
              role: 'reload'
        },
        {
              label: 'Ferramentas do desenvolvedor',
              role: 'toggleDevTools'
        },
        {
              type: 'separator'
        },
        {
              label: 'Aplicar zoom',
              role: 'zoomIn'
        },
        {
              label: 'Reduzir',
              role: 'zoomOut'
        },
        {
              label: 'Restaurar o zoom padrão',
              role: 'resetZoom'
        }
      ]
  },
  {
      label: 'Ajuda',
      submenu: [
        {
              label: 'docs',
              accelerator: 'Alt+F1',
              click: () => shell.openExternal('https://www.electronjs.org/docs/latest/')
        },
        {
              type: 'separator'
        },
        {
              label: 'Sobre',
              click: () => aboutWindow()
        }
      ]
  }
]

// Processos
console.log("Processo Principal")
//exemplo 1: Comando que só funciona no node.js
console.log(`Electron: ${process.versions.electron}`)
//exmeplo 2: Recebimento de uma mensagem do renderer
ipcMain.on('send-message', (event, message) => {
      console.log(`Processo principal recebeu uma mensagem: ${message}`)
})
//exemplo 3: Recebimento do renderer de uma ação a ser executada
ipcMain.on('open-about', () => {
      aboutWindow()
})
