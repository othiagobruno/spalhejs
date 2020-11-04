'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Env = use('Env');
const Drive = use('Drive');

const Helpers = use('Helpers');
const { v4: uuidV4 } = require('uuid');

class UploadFile {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next, properties) {
    try {
      const [pathName, amount = 1] = properties;

      const validateOptions = {
        types: ['jpeg', 'jpg', 'png', 'mp4', 'mov', 'gif'],
        size: '15mb',
      };

      const files = request.file(`files`, validateOptions);

      await files.runValidations();
      const errors = files.errors();

      if (errors[0].message) {
        return response.status(400).json(errors);
      }

      let filesArray = [];
      const enviroment = Env.get('NODE_ENV');

      enviroment === 'development' || enviroment === 'testing'
        ? await handleUploadTmp()
        : await handleUploadS3();

      async function handleUploadTmp() {
        await files.moveAll(Helpers.tmpPath(pathName), (file) => {
          const keyName = `${uuidV4()}.${file.subtype}`;
          const url = `${Env.get('APP_URL')}/files/${pathName}/${keyName}`;

          const newObjectFile = {
            name: file.clientName,
            key: keyName,
            url,
            type: file.type,
          };

          filesArray.push(newObjectFile);
          return {
            name: keyName,
          };
        });
      }

      async function handleUploadS3() {
        for (let i = 0; i < amount; i++) {
          const file = request.multipart.file(`image[${i}]`, validationOptions);

          if (!file) {
            request.multipart.files = filesArray;
            return await next();
          }

          const keyName = `${uuidV4()}.${file.subtype}`;
          const pathS3 = `${pathName}/${keyName}`;

          const url = await Drive.put(pathS3, file.stream, {
            ContentType: file.headers['content-type'],
            ACL: 'public-read',
          });

          const newObjectFile = {
            name: file.clientName,
            key: keyName,
            url,
            type: file.type,
          };
          await request.multipart.process();
          filesArray.push(newObjectFile);
        }
      }

      request.multipart.files = filesArray;
      request.multipart.proccess();
      await next();
    } catch (error) {
      return response.status(500).send({
        error: 'error when uploading file',
      });
    }
  }
}

module.exports = UploadFile;
