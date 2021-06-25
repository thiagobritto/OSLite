
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
    let hash = await bcrypt.hash( pass, randomInterval(10, 15))
    return hash
}

function randomInterval(init, limit){
    let num = Math.random() * limit
    if (num < init) num = randomInterval(init, limit)
    return Math.round(num)
}

module.exports = { checkPassword, passwordHash, randomInterval }