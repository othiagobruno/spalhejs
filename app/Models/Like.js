/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Like extends Model {
  static get visible() {
    return ['user_id'];
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Like;
