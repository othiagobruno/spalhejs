'use strict';

const Helpers = use('Helpers')
const File = use('App/Models/File');

class FileController {

  async store({ request, response, params }) {
    try {
      const images = request.file('images', {
        types: ['image'],
        size: '12mb'
      })

      await images.moveAll(Helpers.tmpPath('uploads'))

      if (!images.movedAll()) {
        return images.errors()
      }

      await Promise.all(movedFiles.map((file) => {
        await File.create({ url, name: name + file.clientName, type: file.type, key: params.id })
      }))

      return response.status(200).send({ status: 'success' });
    } catch (err) {
      return response.status(400).send({
        error: 'não foi possivel enviar imagens'
      });
    }
  }
}

module.exports = FileController;
