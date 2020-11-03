'use strict';

const Helpers = use('Helpers')
const File = use('App/Models/File');

class FileController {

  async show({ params, response }) {
    const file = await File.findOrFail(params.id)
    return response.download(Helpers.tmpPath('uploads/' + file.file))
  }

  async store({ request, response, params }) {
    try {
      const images = request.file('file', {
        types: ['image', 'video'],
        size: '50mb'
      })
      await images.moveAll(Helpers.tmpPath('uploads'), (file) => {
        return {
          name: `${new Date().getTime()}.${file.subtype}`
        }
      })
      if (!images.movedAll()) {
        return images.errors()
      }
      const movedFiles = images.movedList()
      movedFiles.map(async (file) => {
        await File.create({ name: file.clientName, type: file.type, key: params.id })
      })

      return response.status(200).send(movedFiles);
    } catch (err) {
      return response.status(400).send({
        error: 'não foi possivel enviar imagens'
      });
    }
  }
}

module.exports = FileController;
