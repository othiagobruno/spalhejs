'use strict';

const MomentFile = use('App/Models/MomentFile');

class MomentFileController {
  async store({ params, request, response }) {
    try {
      const file = request.files[0];

      if (file.type !== 'image') {
        return response
          .status(400)
          .json({ error: `${file.type} type is not allowed` });
      }

      await MomentFile.create({
        ...file,
        moment_id: params.id,
      });

      return response.status(201).send();
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'error when finalizing file upload' });
    }
  }
}

module.exports = MomentFileController;
