const path = require('path');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./oslite.db"
  },
  useNullAsDefault: true
});

document.addEventListener("DOMContentLoaded", () => {

	document.getElementById("btn_en").onclick = (e) => {
		e.preventDefault();	// se não resolver -> e.stopPropagation();
		
		let name = fm.user.value;
		let pass = fm.pass.value;
		let user = knex.select("id","name","status")
					.table('user')
					.where({"name": name, "pass": pass});
		user.then(function(row){

			if (row.length > 0) {
				if(typeof(Storage) !== "undefined"){
					// Se Logar
					//localStorage.setItem('meuGato', 'Tom');
					//sessionStorage.setItem("user", JSON.stringify(row[0]));
				}
			} else {
				alert("Usuário ou senha invalidos!");
			}
		}).catch(function(err){
			alert("Algo errado com Banco de Dados!");
		});
		
	}

});
