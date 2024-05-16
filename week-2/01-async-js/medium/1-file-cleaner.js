// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

var fs = require('fs')

let readData;

function fileReading(){
    let p = new Promise(function(resolve){
        fs.readFile('file.txt', 'utf-8', (err, data) => {
        readData = data;
        resolve()
    })
    })
    return p;
}

function fileWriting(){
    return new Promise(function(resolve){
        fs.writeFile('file.txt', readData, (err) => {
            if(err){
                throw err
            }
            console.log('updated file successfully!')
            resolve();
        })
    })
}

async function onDoneReading(){
    // read file
    await fileReading();
    // remove spaces from 
    readData = readData.split(" ").filter(data => {
        if(data.length === 0){
            return false
        }
        else{
            return true
        }
    }).join(" ")
    // write file
    await fileWriting()
    // again reADING FILE
    await fileReading()
    console.log('data after updation - ', readData);
}

onDoneReading();