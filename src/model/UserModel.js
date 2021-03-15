class UserModel {

	constructor(name, pass, status) {
    	this.name   = name ? name : null;
    	this.pass   = pass ? pass : null;
    	this.status = status ? status : null;
	}

	setName(name) {
		this.name = name;
	}

	getName() {
		return this.name;		
	}

	setPass(pass) {
		this.pass = pass;
	}

	getPass() {
		return this.pass;		
	}

	setStatus(status) {
		this.status = status;
	}

	getStatus() {
		return this.status;		
	}

}

module.exports = UserModel;
