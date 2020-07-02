const {debug} = require('../config/setting');

class Interact {
    constructor() {
        this.replyOnMessage = true;
    }
    
    static respondMessage({msg, wordDic}) {
        let msgctn = msg.content.replace("\n", "");
    
        for (let keyword in wordDic) {
            // if (debug) console.log(keyword);
            let re = new RegExp(keyword, 'i');
            if (msgctn.match(re)) {
                msg.channel.send(wordDic[keyword]);
                break;
            }
        }

        return;
    }

    commandProcess(msg) {
        let command = msg.content.replace("!","");
        if (command.match(/^(toggle)|(tg)$/)) {
            this.replyOnMessage = !this.replyOnMessage;
            if (debug) console.log('Reply to message has been '+this.replyOnMessage?'enabled':'disabled');
            return;
        } else {
            return;
        }
    }
}

module.exports = Interact;