const Drive = use('Drive');
const PostFile = use('App/Models/PostFile');
const UserAvatar = use('App/Models/UserAvatar');
class FileController {
  async show({ params, response }) {
    try {
      const name = params.file;
      const dir = params.directory;
      const path = `${dir}/${name}`;
      const file = await Drive.disk('s3').getObject(path);
      response.header('Content-type', file.ContentType);
      response.header('Content-length', file.ContentLength);
      response.header('Content-disposition', 'attachment');
      return response.send(file.Body);
    } catch (err) {
      return '';
    }
  }

  async showAvatar({ params, response }) {
    try {
      const { id } = params;
      const avatar = await UserAvatar.findOrFail({ user_id: id });
      const file = await Drive.disk('s3').getObject(avatar.file);
      response.header('Content-type', file.ContentType);
      response.header('Content-length', file.ContentLength);
      response.header('Content-disposition', 'attachment');
      return response.send(file.Body);
    } catch (error) {
      const file = await Drive.disk('s3').getObject('users/usericon.png');
      response.header('Content-type', file.ContentType);
      response.header('Content-length', file.ContentLength);
      response.header('Content-disposition', 'attachment');
      return response.send(file.Body);
    }
  }

  async avatar({ request, auth, response }) {
    let user;
    if (request.files_array) {
      request.files_array.map(async (file) => {
        user = await UserAvatar.create({
          file: file.file,
          name: file.name,
          type: file.type,
          subtype: file.subtype,
          user_id: auth.user.id,
        });
      });
      return response.status(201).send({ message: 'success', user });
    }
    return response.status(401).send({ message: 'error when create avatar ' });
  }

  async posts({ request, auth, response, params }) {
    const { id } = params;
    const isMy = await auth.user.posts().where({ id }).first();

    if (request.files_array && isMy) {
      request.files_array.map(async (file) => {
        await PostFile.create({
          file: file.file,
          name: file.name,
          type: file.type,
          subtype: file.subtype,
          post_id: id,
        });
      });
    }
    response.send({ post: isMy, uploads: request.files_array });
  }

  async message({ request }) {
    if (request.files_array) {
      // request.files_array.map(async (file) => {
      // await PostFile.create({
      //   file: file.file,
      //   name: file.name,
      //   type: file.type,
      //   subtype: file.subtype,
      //   post_id: id,
      // });
      // });
    }
  }

  async moment({ request }) {
    if (request.files_array) {
      // request.files_array.map(async (file) => {
      // await PostFile.create({
      //   file: file.file,
      //   name: file.name,
      //   type: file.type,
      //   subtype: file.subtype,
      //   post_id: id,
      // });
      // });
    }
  }
}

module.exports = FileController;
