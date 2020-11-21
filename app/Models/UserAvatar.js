/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Env = use('Env');

class UserAvatar extends Model {
  static get hidden() {
    return [
      'created_at',
      'updated_at',
      'file',
      'subtype',
      'name',
      'id',
      'user_id',
    ];
  }

  static get computed() {
    return ['url'];
  }

  getUrl({ file }) {
    return `${Env.get('APP_URL')}/files/${file}`;
  }
}

module.exports = UserAvatar;
