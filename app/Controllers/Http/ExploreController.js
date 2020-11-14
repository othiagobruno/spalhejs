const _ = require('lodash');

const Post = use('App/Models/Post');
const Database = use('Database');
const subDays = require('date-fns/subDays');

class ExploreController {
  async index() {
    const json = await Post.query()
      .with('files')
      .whereHas('files', (builder) => {
        builder.where('type', 'image');
      })
      .orderBy(Database.raw('RAND()'))
      .where('created_at', '>', subDays(new Date(), 3))
      .limit(16)
      .with('user', (builder) => {
        builder.select('id', 'name', 'username', 'avatar');
      })
      .has('likes')
      .withCount('likes')
      .withCount('comments')
      .fetch();

    const posts = json.toJSON();
    const totalExplores = _.orderBy(posts, '__meta__.likes_count', 'desc');
    return totalExplores;
  }
}

module.exports = ExploreController;
