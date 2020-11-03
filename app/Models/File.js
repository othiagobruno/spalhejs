'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class File extends Model {
  static get computed() {
    return ['url']
  }

  getUrl({ id }) {
    return `${Env.get('APP_URL')}/files/${id}`
  }

  posts() {
    return this.hasOne('App/Models/Post', 'key', 'key');
  }
}

module.exports = File;
