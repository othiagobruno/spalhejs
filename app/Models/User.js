/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');
const Env = use('Env');

class User extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
    this.addHook('afterSave', 'StatusChangeHook.send');
  }

  static get computed() {
    return ['avatar'];
  }

  static get hidden() {
    return ['password', 'created_at', 'updated_at', 'token'];
  }

  getAvatar({ avatar_file }) {
    if (!avatar_file) {
      return 'https://spalhe.s3-sa-east-1.amazonaws.com/no_content/usericon.png';
    }
    return `${Env.get('APP_URL')}/avatar/${avatar_file}`;
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }

  avatar() {
    return this.hasOne('App/Models/UserAvatar');
  }

  posts() {
    return this.hasMany('App/Models/Post');
  }

  moments() {
    return this.hasMany('App/Models/Moment');
  }

  followers() {
    return this.belongsToMany(
      'App/Models/User',
      'user_id',
      'followid'
    ).pivotTable('follows');
  }

  following() {
    return this.belongsToMany(
      'App/Models/User',
      'followid',
      'user_id'
    ).pivotTable('follows');
  }

  followed() {
    return this.hasOne('App/Models/Follow');
  }

  comments() {
    return this.hasMany('App/Models/Comment');
  }

  shares() {
    return this.hasMany('App/Models/Share');
  }
}

module.exports = User;
