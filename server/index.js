process.env.AWS_ACCESS_KEY_ID = "AKIA6NXJK32XHKRPSU5J"
process.env.AWS_SECRET_ACCESS_KEY = "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"


var express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const jsonServer = require('json-server');
const router = jsonServer.router('db.json');
const data = require('./db.json')
const fs = require('fs')

app.use(cors({
    origin: '*',
}));

app.use(express.json());
app.use('/api', router);

app.use(fileUpload());


const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')



function jsonReader(filePath, cb){
    fs.readFile(filePath, "utf-8", (err, fileData) => {
        if(err){
            return err && cb(err)
        }
        try {
            const dataObject = JSON.parse(fileData);
            // console.log('JsonREader Function:',dataObject)
            return cb && cb(null, dataObject)
        }
        catch{
            return err && cb(err)
        }
    })
}

function fileData(count, filename,url){
    console.log('Inside FileData')
    return {
        "fileId": count+1,
        "fileName": filename,
        "url" : url
    }
}

function createUser(email){
    console.log('Inside CreateUser')
    const obj ={}
    obj[email] ={
        "idCount":0,
        "files":[],
    }
    return obj
}

function addfile(email, data, filename, uri){
    console.log('Inside AddFile')
    const oldUser = email in data.users
    if(oldUser){
        console.log('Inside AddFileif')
        const count = data.users[email].idCount
        const files = data.users[email].files
        const newData = fileData(count, filename,uri)
        files.push(newData)
        console.log("files inside addfile",data)
        return data
    }  
    else{
        const newUser = createUser(email, uri)
        console.log(newUser)
        addfile(email, data, uri)
        return data
    }
}

function save_file(email, filename ,uri){
    jsonReader ('./db.json', (err,data) => {
        if(err){
            return err
        }
        else {
            // const ob = data.users
            // console.log('JsonReader CAllback : ' ,ob)
            const update = addfile(email, data, filename, uri)
            fs.writeFile("./db.json", JSON.stringify(data), err =>{
                if(err) console.log(err)
                console.log('Done Writing ---- Json file is updated')
            })
            console.log('File Added', update)
        }
    })
}
// const tryData ={
//     "id": 'hello',
//     "ksi" : 'bye'
// }
// fs.writeFile("./db.json", JSON.stringify(tryData), err =>{
//     if(err) console.log(err)
//     console.log('Done Writing ---- Json file is updated')
// })

// save_file("wertet@email", "vvvv")

app.get("/list", (req, res) => {
    jsonReader ('./db.json', (err,data) => {
        if(err){
            return err
        }
        else {
            // console.log('Get File dbData',data)
            res.send(data)
            // console.log('Data Sent')
        }
    })
    
});

app.post('/upload', (req, res) => {
    const params = {
        Bucket: 'pranshubucket99',
        Key: req.files.file.name,
        Body: req.files.file.data
    };
    fileName = req.files.file.name
    s3.upload(params, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error uploading file');
        }
        console.log('File uploaded successfully:', data.Location);
        res.send('File uploaded successfully');
        console.log("fileNAme", fileName)
        save_file(email_id, fileName, data.location)
    });
});

app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = req.body;
    user.id = id;
    router.db.get('users')
    .find({ id: id })
    .assign(user)
    .write();
    res.send(user);
});

app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    router.db.get('users')
            .remove({ id: id })
            .write();
            res.send('User deleted');
    });   
// console.log('Nodemon Server Restarted')

app.listen(5005, function () {
    console.log('Listening on Port || 5005!');
});

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')















// {
//     "user-email": "fghjkvbh@email",
//     "data": {
//         "id-count": 0,
//         "files" : {
//             "file-id": 1,
//             "url" : "qwertyuio"
//         } 
//     }
// }