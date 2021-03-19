const { ipcRenderer } = require('electron')
const { connection } = require('../DAO')
const conn = connection()
require('../view/dist/materialize/js/materialize.min')

/* DEMOS */
//console.log(conn);
//ipcRenderer.invoke('login', objLogin).then((result) => {}).catch((err)=>{})

function selectUser() {
	let user = conn.select("id","name","status")
		.table('user')
		.where({
			"name": login.user.value, 
			"pass": login.user.value
		});
	return user
}

function verifyLogin(result) {
	if (result.length > 0) {
		ipcRenderer.invoke('logar', result[0])
	} else {
		var toastHTML = '<span>Usuário ou senha invalido!</span>';
		M.toast({html: toastHTML});
	}
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn_en").onclick = (e) => {
		e.preventDefault();	// se não resolver -> e.stopPropagation();
		selectUser().then((result) => {
			verifyLogin(result)
		}).catch((err) => {
			console.log(err);
		})
	}
});
