/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Chat extends Model {
  messages() {
    return this.belongsTo('App/Models/Message', 'id', 'chat_id');
  }

  user_one() {
    return this.belongsTo('App/Models/User', 'id_received', 'id');
  }

  user_two() {
    return this.belongsTo('App/Models/User', 'id_send', 'id');
  }
}

module.exports = Chat;
