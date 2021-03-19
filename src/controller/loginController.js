const { ipcRenderer } = require('electron')
//const { connection } = require('../DAO')
//const conn = connection()
//console.log(conn);

require('../view/dist/materialize/js/materialize.min.js')

// code

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("btn_en").onclick = (e) => {
		e.preventDefault();	// se não resolver -> e.stopPropagation();
		let objLogin = {name: login.user.value, pass: login.pass.value}
        ipcRenderer.invoke('login', objLogin).then((result) => {
			if (result.length > 0) {
				ipcRenderer.invoke('logar', result[0])
			} else {
				//console.log('u inv');
				var toastHTML = '<span>Usuário ou senha invalido!</span>';
    			M.toast({html: toastHTML});
			}
		}).catch((err)=>{
			//console.log(err)
		})
	}

});
