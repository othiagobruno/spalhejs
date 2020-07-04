'use strict';

class FileUpload {
  get data() {
    const requestBody = this.ctx.request.all();
    const files = this.ctx.request.file('files');
    const id = this.ctx.params.id;

    return Object.assign({}, requestBody, { id, files });
  }

  get rules() {
    return {
      id: 'required|integer|notExists:moments,id|exists:moment_files,moment_id',
      files: 'required',
    };
  }
}

module.exports = FileUpload;
