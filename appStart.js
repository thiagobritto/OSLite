
const { app } = require('electron')

module.exports = ( createWindow ) => {
    app.whenReady().then(() => {
        createWindow()
            .setWidth(350)
            .setHeight(280)
            .setTitle('Login')
            .setMaximizable(false)
            .setResizable(false)
            .setCenter(true)
            .run()

        app.on('activate', function () {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow()
                    .setWidth(350)
                    .setHeight(280)
                    .setTitle('Login')
                    .setMaximizable(false)
                    .setResizable(false)
                    .setCenter(true)
                    .run()
            }
        })
    })

    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit()
    })
}
