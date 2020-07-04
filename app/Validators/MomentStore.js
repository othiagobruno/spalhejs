'use strict';

class MomentStore {
  get rules() {
    return {
      type: 'required|string|keys:image,video',
      text: 'string',
    };
  }
}

module.exports = MomentStore;
