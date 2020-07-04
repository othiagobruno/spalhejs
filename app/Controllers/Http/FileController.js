'use strict';

const Helpers = use('Helpers');

class FileController {
  async show({ params, response }) {
    const { dir, path } = params;
    return response.download(Helpers.tmpPath(`${dir}/${path}`));
  }
}

module.exports = FileController;
