const Drive = use('Drive');
const { v4: uuidV4 } = require('uuid');

module.exports = {
  local: async (fileSchema, folderName) => {
    const newFileName = `${uuidV4()}.${fileSchema.subtype}`;
    const newFilePath = `${folderName}/${newFileName}`;
    Drive.disk('local').put(newFilePath, fileSchema.stream);
    const newFileSchemaToController = {
      file: newFilePath,
      type: fileSchema.type,
      subtype: fileSchema.subtype,
      name: fileSchema.clientName,
    };
    return newFileSchemaToController;
  },
  s3: async (fileSchema, folderName) => {
    const newFileName = `${uuidV4()}.${fileSchema.subtype}`;
    const newFilePath = `${folderName}/${newFileName}`;
    await Drive.disk('s3').put(newFilePath, fileSchema.stream, {
      ACL: 'public-read',
      ContentType: `${fileSchema.type}/${fileSchema.subtype}`,
    });

    const newFileSchemaToController = {
      file: newFilePath,
      type: fileSchema.type,
      subtype: fileSchema.subtype,
      name: fileSchema.clientName,
    };
    return newFileSchemaToController;
  },
};
