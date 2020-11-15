const Drive = use('Drive');
const Env = use('Env');
const { v4: uuidV4 } = require('uuid');

module.exports = {
  local: async (fileSchema, folderName) => {
    return new Promise((resolve) => {
      const newFileName = `${uuidV4()}.${fileSchema.subtype}`;

      const newFilePath = `${folderName}/${newFileName}`;

      Drive.disk('local').put(newFilePath, fileSchema.stream);

      const url = `${Env.get('APP_URL')}/files/${newFilePath}`;

      const newFileSchemaToController = {
        key: newFileName,
        type: fileSchema.type,
        subtype: fileSchema.subtype,
        url,
      };

      resolve(newFileSchemaToController);
    });
  },
  s3: async (fileSchema, folderName) => {
    return new Promise((resolve) => {
      const newFileName = `${uuidV4()}.${fileSchema.subtype}`;

      const newFilePath = `${folderName}/${newFileName}`;

      Drive.disk('s3').put(newFilePath, fileSchema.stream, {
        ACL: 'public-read',
        ContentType: `${fileSchema.type}/${fileSchema.subtype}`,
      });

      const url = `${Env.get('APP_URL')}/files/${newFilePath}`;

      const newFileSchemaToController = {
        key: newFileName,
        type: fileSchema.type,
        subtype: fileSchema.subtype,
        url,
      };

      resolve(newFileSchemaToController);
    });
  },
};
