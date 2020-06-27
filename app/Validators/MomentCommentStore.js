'use strict';

class MomentComment {
  get data() {
    const requestBody = this.ctx.request.all();
    const moment_id = this.ctx.params.id;

    return Object.assign({}, requestBody, { moment_id });
  }

  get rules() {
    return {
      moment_id: 'required|integer|exists:moments,id',
      text: 'required|string',
    };
  }
}

module.exports = MomentComment;
