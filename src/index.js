const {app, BrowserWindow, Tray, Menu, nativeImage} = require('electron')

/*
<script src="https://preview.babylonjs.com/babylon.js"></script>
        <script src="https://preview.babylonjs.com/loaders/babylonjs.loaders.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/babylon-vrm-loader@^1.4/dist/index.js"></script>
*/

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
        titlebarstyle : "hidden",
        darkTheme: true
    })

    Window.loadFile('./src/index.html')

}

app.whenReady().then(LoadWindowAsync)