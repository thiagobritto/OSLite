
class UserDAO {

	constructor (conn) {
    	this._conn = conn
	}

	checkInUser (name, pass) {
		return (
			this._conn.select()
				.table('user')
				.where({
					"name": name,
					"pass": pass
				})
		)
	}
	
	verifyLogin (result) {
		if (!result.length > 0)
			throw "Usuário ou senha invalido!"
		return result[0]
	}

}

module.exports = { UserDAO } 