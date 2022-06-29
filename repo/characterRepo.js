let fs = require("fs");

const FILE_NAME = "./repo/veteran.json";
// let data = fs.readFile("liana.json", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   let character = JSON.parse(data);
//   console.log(character);
// });


let repo = {
    get: function(resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if (err){
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        })
    }
}

module.exports = repo;
