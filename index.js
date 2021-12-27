const readlineSync = require("readline-sync");

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const username = readlineSync.question("求めたいユーザーの名前を入力してください: ");

let result;
let result2;
const getAgent = (id) => {
    const req2 = new XMLHttpRequest();
    const url = "https://scratchdb.lefty.one/v3/project/info/" + id;
    req2.open("GET",url);
    req2.responseType = "json";
    req2.send();
    req2.onload = () => {
        result2 = JSON.parse(req2.responseText);
        try {
            console.log("このユーザーのユーザーエージェントは " + result2.metadata.user_agent + "です");
        } catch(e) {
            console.log("何らかの問題が発生したため、取得ができませんでした")
        }
    };
}


const req = new XMLHttpRequest();
const url = "https://api.scratch.mit.edu/users/" + username + "/projects"
req.open("GET",url);
req.responseType = "json";
req.send();
req.onload = () => {
    result = JSON.parse(req.responseText);
    try {
        getAgent(result[0].id)
    } catch(e) {
        console.log("何らかの問題が発生したため、取得できませんでした")
    }
};
