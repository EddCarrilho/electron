// console.log("Processo Principal")

const { app, BrowserWindow, nativeTheme, Menu, shell} = require('electron')

// janela principal
const createWindow = () => {
    //nativeTheme.themeSource = 'dark'
  const win = new BrowserWindow({
    width: 800, //largura
    height: 600, //altura
    icon: './src/public/img/pc.png'   
    //resizable: false, //evitar o redimensionamento
    //titleBarStyle: 'hidden' //esconder barra de título e menu
    //autoHideMenuBar: true //esconder o menu
  })

  // Iniciar a janela com o menu personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  win.loadFile('./src/views/index.html')
}

// janela sobre
const aboutWindow = () => {
  const about = new BrowserWindow({
    width: 360, //largura
    height: 220, //altura
    icon: './src/public/img/pc.png',   
    resizable: false, //evitar o redimensionamento
    autoHideMenuBar: true //esconder o menu
})

about.loadFile('./src/views/sobre.html')
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