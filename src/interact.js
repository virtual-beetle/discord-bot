const {debug,OPEN_CURRENCY_CONVENTOR_API_KEY} = require('../config/setting');
const axios = require('axios');

class Interact {
    constructor() {
        // default reply option
        this.replyOnMessage = true;
        // default currency list
        this.currList = ['ars','usd','cny','hkd','cad','ntd','jpy'];
        this.outCurrList = ['CNY','USD','ARS'];
        
        
        this.currs = "(";
        this.currList.forEach(elem => {
            this.currs += "("+elem+")|";
        });

        this.currs = this.currs.substring(0,this.currs.length-1);
        this.currs += ")";
        this.currency = new RegExp("(?<=\\d)"+this.currs+"$",'i');
        this.amount = new RegExp("\\d+(?="+this.currs+"$)",'i');
        if (debug) {
            console.log(this.currency);
            console.log(this.amount);
        }
    }
    
    static respondMessage({msg, wordDic}) {
        let msgctn = msg.content.replace("\n", "");
        if (debug) console.log(msgctn);
    
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

    async currencyConventor({msg,command}) {
        let amount = command.match(this.amount)[0];
        let curr = command.match(this.currency)[0].toUpperCase();
        const endpoint = "https://free.currconv.com/api/v7/convert?compact=ultra&apiKey="+OPEN_CURRENCY_CONVENTOR_API_KEY+"&";
        let q1 = "q=";
        let q2 = "q=";
        let curconv = new Map();
        let outconv = [];

        this.outCurrList.forEach(elem=> {
            if (curr!=elem) {
                curconv.set(elem,curr+"_"+elem);
            }
        })

        let iter = curconv.entries();
        for (let i=0;i<2;i++) {
            q1 +=iter.next().value[1]+",";
        }
        q1 = q1.substring(0,q1.length-1);

        if (curconv.size>2) {
            q2 += iter.next().value[1];
        }

        try {
            if (debug) console.log(endpoint+q1);
            let response = await axios.get(endpoint+q1);
            Object.entries(response.data).forEach(entry => {
                outconv.push(entry[1]*amount);
            });

            if (curconv.size>2) {
                if(debug) console.log(endpoint+q2);
                let response = await axios.get(endpoint+q2);
                Object.entries(response.data).forEach(entry => {
                    outconv.push(entry[1]*amount);
                });
            }

            if(debug) console.log(outconv);
            iter = curconv.entries();
            let output = "";
            for (let val in outconv) {
                output += outconv[val].toFixed(2)+" "+iter.next().value[0]+"\n";
            }
            msg.channel.send(output);

        } catch (e) {
            console.error(e);
        }
        return;
    }

    async commandProcess(msg) {
        let command = msg.content.replace(/!|！/,"");

        if (command.match(/^(toggle)|^(tg)$/i)) {
            this.replyOnMessage = !this.replyOnMessage;
            if (debug) console.log('Reply to message has been '+this.replyOnMessage?'enabled':'disabled');
            return;
        } else if (OPEN_CURRENCY_CONVENTOR_API_KEY.length>1) {
            if (this.amount.exec(command)) this.currencyConventor({msg,command});
            else if (command.match(/^(ccusage)/i)) {
                let response = await axios.get("https://free.currconv.com/others/usage?apiKey="+OPEN_CURRENCY_CONVENTOR_API_KEY);
                // console.log(response.data);
                msg.channel.send(`Now it is \`${response.data.usage}/1000\` this hour.`);

                return;
            }
            return;
        } else return;
    }
}

module.exports = Interact;