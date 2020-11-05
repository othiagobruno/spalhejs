const Notification = use('App/Models/Notification');

class NotificationController {
  async index({ auth }) {
    const { user } = auth.current;
    const notifications = await Notification.query()
      .where('my_userid', user.id)
      .orderBy('id', 'desc')
      .with('user')
      .with('followed', (builder) => {
        builder.where('followid', auth.user.id);
      })
      .pick(15);
    return notifications;
  }

  async update({ auth }) {
    const { user } = auth.current;
    await Notification.query()
      .where('my_userid', user.id)
      .update({ view: true });
    const ntf = await Notification.query().where('my_userid', user.id).fetch();
    return ntf;
  }

  async destroy({ auth }) {
    const { user } = auth.current;
    const notification = await Notification.query()
      .where('my_userid', user.id)
      .delete();
    return notification;
  }
}

module.exports = NotificationController;
