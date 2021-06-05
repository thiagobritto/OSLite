
const bcrypt = require('bcrypt')

async function checkPassword(pass, hash){
    const match = await bcrypt.compare(pass, hash)
    if (match) {
        return true;
    } else {
        return false
    }
}

async function passwordHash(pass, peso){
    let hash = await bcrypt.hash(pass, peso ? peso : 12)
    return hash
}

module.exports = { checkPassword, passwordHash }