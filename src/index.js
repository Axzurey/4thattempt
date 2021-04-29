const {app, BrowserWindow, Tray, Menu, nativeImage} = require('electron')

function LoadWindowAsync() {
    Window = new BrowserWindow({
        width : 1000,
        height : 600,
        useContentSize : true,
        webPreferences : {
            nodeIntegration : true,
            contextIsolation : false,
            enableRemoteModule : true
        },
        title : "Maid",
        icon : "./maika.png",
        titlebarstyle : "hidden",
        darkTheme: true
    })

    Window.loadFile('./index.html')

    let activated = true

    let GameModeOn = false

    const ToggleGameMode = () => {
        GameModeOn = !GameModeOn
    }
    

    const hide = () => {
	
	}

    Window.on('close', (e) => {
		hide()
		e.preventDefault()
	})
}

app.whenReady().then(LoadWindowAsync)