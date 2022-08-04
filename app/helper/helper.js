const crypto = require('crypto')

module.exports = {
    randomNumber : (length = 10) => {
        let response = ''
        for (let i = 0; i < length; i++) {
            let y = Math.random()*100
            response += String(y).substr(String(y).length-1, 1)
        }
        return response;
    },

    makeHash : (secret,data) =>  crypto.createHash('sha256').update(secret+data).digest('base64'),

    wordSplitter: string => {
        string.split('').map(char => {
            if (char >= 'A' && char <= 'Z') {
                let worldPieces = string.split(char)
                string = worldPieces[0] + " " + char + worldPieces[1]
            }
        })
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
}