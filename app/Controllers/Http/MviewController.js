const Mview = use('App/Models/Mview');

class MviewController {
  async show({ params }) {
    const { id } = params;
    const mview = await Mview.query()
      .where('moment_id', id)
      .with('user')
      .fetch();
    return mview;
  }

  async count({ params }) {
    const { id } = params;
    const mview = await Mview.query()
      .where('moment_id', id)
      .with('user')
      .getCount();
    return mview;
  }

  async store({ params, auth }) {
    const { id } = params;
    const { user } = auth.current;
    const mview = await Mview.query()
      .where('moment_id', id)
      .where('user_id', user.id)
      .first();

    if (!mview) {
      const data = await Mview.create({
        moment_id: id,
        user_id: auth.current.user.id,
      });
      return data;
    }
    return mview;

    // if (mview) {
    // 	return mview;
    // } else {
    //
    // }
  }
}

module.exports = MviewController;
