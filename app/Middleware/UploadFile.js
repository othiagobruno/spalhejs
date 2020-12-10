/* eslint-disable no-plusplus */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Env = use('Env');
const Config = use('Config');
const sharp = require('sharp');

class UploadFile {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request }, next, properties) {
    const [path] = properties;
    const validateOptions = {
      types: ['jpeg', 'jpg', 'png', 'mp4', 'mov', 'gif'],
      size: '25mb',
    };

    // eslint-disable-next-line no-var
    var filesArray = [];
    const enviroment = Env.get('NODE_ENV');

    const uploadTmp = async () => {
      const transform = sharp();
      await request.multipart.file('files[]', validateOptions, async (file) => {
        const upload = Config.get('upload.s3');
        if (file.type === 'image') {
          transform.jpeg({
            quality: 70,
          });
          await file.stream.pipe(transform).pipe(file.stream);
        }
        const res = await upload(file, `temp_${path}`);
        filesArray.push(res);
      });
      await request.multipart.process();
    };

    const uploadS3 = async () => {
      const transform = sharp();
      await request.multipart.file('files[]', validateOptions, async (file) => {
        const upload = Config.get('upload.s3');
        if (file.type === 'image') {
          const resize = transform.resize({ width: 400 }).jpeg({
            quality: 80,
            chromaSubsampling: '4:4:4',
          });
          await file.stream.pipe(transform).pipe(resize);
        }
        const res = await upload(file, path);
        filesArray.push(res);
      });
      await request.multipart.process();
    };

    if (enviroment === 'development') {
      await uploadTmp().catch((res) => console.log(res));
    } else {
      await uploadS3().catch((res) => console.log(res));
    }

    request.files_array = filesArray;
    await next();
  }
}

module.exports = UploadFile;
