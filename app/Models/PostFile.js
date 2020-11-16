/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Env = use('Env');

class PostFile extends Model {
  static get computed() {
    return ['url'];
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  getUrl({ file }) {
    return `${Env.get('APP_URL')}/files/${file}`;
  }

  posts() {
    return this.hasOne('App/Models/Post');
  }
}

module.exports = PostFile;
