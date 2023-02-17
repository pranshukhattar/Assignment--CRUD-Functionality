# file-upload

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```




<!-- 
<template>
  <div>
    <input type="file" ref="fileInput" @change="uploadFile"/>
  </div>
</template>

<script>
import AWS from 'aws-sdk';
import mongoose from 'mongoose';

export default {
  methods: {
    uploadFile() {
      const file = this.$refs.fileInput.files[0];
      const fileName = file.name;
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      });

      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: file
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`File uploaded successfully. File URL: ${data.Location}`);

          const fileDetails = new mongoose.model('File')({
            name: fileName,
            url: data.Location,
            uploadedAt: new Date()
          });

          fileDetails.save((err, data) => {
            if (err) {
              console.error(err);
            } else {
              console.log('File details saved successfully.');
            }
          });
        }
      });
    }
  }
}
</script>
 -->
