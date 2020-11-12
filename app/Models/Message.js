/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Message extends Model {
  static boot() {
    super.boot();
    this.addHook('afterCreate', 'MessageHook.send');
    this.addHook('afterCreate', 'MessageHook.get');
  }

  user() {
    return this.hasOne('App/Models/User', 'id_send', 'id');
  }
}

module.exports = Message;
