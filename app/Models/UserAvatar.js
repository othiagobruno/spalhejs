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
    if (file != null) {
      return `${Env.get('APP_URL')}/files/${file}`;
    }
    return {
      url:
        'https://firebasestorage.googleapis.com/v0/b/spalhe-app.appspot.com/o/usericon.png?alt=media&token=2c333530-8c82-4d6f-a1ba-dca6410c2036',
      type: 'image',
    };
  }
}

module.exports = UserAvatar;
