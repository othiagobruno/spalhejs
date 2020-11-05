/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Share extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  post() {
    return this.belongsTo('App/Models/Post', 'post_id', 'id');
  }
}

module.exports = Share;
