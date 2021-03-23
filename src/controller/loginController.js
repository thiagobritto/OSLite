const { ipcRenderer } = require('electron')
const { connection  } = require('../DAO')
const { UserDAO     } = require('../DAO/UserDAO')
const userDAO = new UserDAO(connection())
require('../view/dist/materialize/js/materialize.min')

/* DEMOS */
//ipcRenderer.invoke('login', objLogin).then((result) => {}).catch((err)=>{})

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("btn_en").onclick = async e => {
		e.preventDefault();	// se não resolver -> e.stopPropagation();
		try {
			const stmt = await userDAO.checkInUser(login.user.value, login.pass.value)
			const user = await userDAO.verifyLogin(stmt)
			ipcRenderer.invoke('logar', user)
		} catch (error) {
			let toastHTML = `<span>${error}</span>`
			M.toast({ html: toastHTML })
		}
	}
});
