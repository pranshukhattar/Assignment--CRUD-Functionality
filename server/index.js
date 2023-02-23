require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const fs = require('fs')

// console.log(process.env.port)

app.use(cors({
    origin: '*',
}));

app.use(express.json());
app.use(fileUpload());

const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

function jsonReader(filePath, cb) {
    fs.readFile(filePath, "utf-8", (err, fileData) => {
        if (err) {
            return err && cb(err)
        }
        try {
            const dataObject = JSON.parse(fileData);
            return cb && cb(null, dataObject)
        }
        catch {
            return err && cb(err)
        }
    })
}

function fileData(count, url, filename) {
    return {
        "fileId": count + 1,
        "fileName": filename,
        "url": url
    }
}

function createUser() {
    return {
        "idCount": 0,
        "files": [],
    }
}

function addfile(email, uri, filename, data) {
    const dataObj = data
    const oldUser = email in data.users
    if (oldUser) {
        const count = dataObj["users"][email]["idCount"]
        const files = dataObj.users[email].files
        const newData = fileData(count, uri, filename)
        files.push(newData)
        dataObj["users"][email]["idCount"] = count + 1
        return data
    }
    else {
        const newUser = createUser()
        dataObj["users"][email] = newUser
        const data = addfile(email, uri, filename, dataObj)
        console.log('Came Back From adding File')
        return data
    }
}

function save_file(email, uri, filename) {
    jsonReader('./db.json', (err, data) => {
        if (err) {
            return err
        }
        else {
            const update = addfile(email, uri, filename, data)
            fs.writeFile("./db.json", JSON.stringify(update, null, 4), err => {
                console.log('Done Writing! ---------- Json file is updated')
                if (err) console.log(err)
            })
            console.log('File Added In JSON', update)
        }
    })
}

app.get("", (req, res) => {
    let email = req.query.email;
    jsonReader('./db.json', (err, data) => {
        if (err) {
            return err
        }
        else {
            let user_data = data.users[email];
            if(!user_data)
                user_data = [];
            res.send(user_data)
        }
    })

});

app.delete("", (req, res) => {
    let email = req.query.email;
    let id = req.query.file_id;
    jsonReader('./db.json', (err, data) => {
        if (err) {
            return err
        }
        else {
            let file_index = -1;
            for(let i =0 ; i<data.users[email].files.length; i++){
                let file = data.users[email].files[i]
                console.log(file.fileId)
                console.log(typeof(file.fileId))
                if(file.fileId == id){
                    file_index = i
                    break;
                }
            }
            const files = data.users[email].files
            console.log('Files Var',files)
            files.splice(file_index, 1)
            data.users[email].files = files
            fs.writeFile("./db.json", JSON.stringify(data, null, 4), err => {
                console.log('--------------------File Deleted ------------------------ ')
                if (err) console.log(err)
            })
            res.send('File Deleted')
        }
    })
})

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
        save_file(req.body.email, data.Location, fileName)
    });
});

app.listen(5005, function () {
    console.log('Listening on Port || 5005!');
});