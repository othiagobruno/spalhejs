const Helpers = use('Helpers');
const File = use('App/Models/File');
const Env = use('Env');
const uploadConfig = require('../../../config/upload');

class FileController {
  async index() {
    const file = await File.all();
    return file;
  }

  async show({ params, response }) {
    const file = await File.findOrFail(params.id);
    return response.download(Helpers.tmpPath(`uploads/${file.file}`));
  }

  async store({ params, request, response }) {
    const post_id = params.id;

    const storageType = Env.get('STORAGE_TYPES');

    const files = request.file('files');

    files.files.map(async (file) => {
      const resultUpload = await uploadConfig[storageType](file, 'posts');

      await File.create({ ...resultUpload, post_id });
    });

    return response.created();
  }
}

module.exports = FileController;
