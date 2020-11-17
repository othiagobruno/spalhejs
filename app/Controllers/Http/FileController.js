const Drive = use('Drive');
const Env = use('Env');
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
      const file = await Drive.disk('s3').getObject('no_content/noimage.jpg');
      response.header('Content-type', file.ContentType);
      response.header('Content-length', file.ContentLength);
      response.header('Content-disposition', 'attachment');
      return response.send(file.Body);
    }
  }

  async showAvatar({ params, response }) {
    try {
      const { id } = params;
      const avatar = await UserAvatar.query().where({ user_id: id }).last();
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
      console.log(error);
      return response.send(file.Body);
    }
  }

  async avatar({ request, auth, response }) {
    try {
      if (request.files_array) {
        await request.files_array.map(async (file) => {
          await UserAvatar.create({
            file: file.file,
            name: file.name,
            type: file.type,
            subtype: file.subtype,
            user_id: auth.user.id,
          });
        });
        const url = `${Env.get('APP_URL')}/files/${
          request.files_array[0].file
        }`;
        return response.status(201).send(url);
      }
      return response
        .status(401)
        .send({ message: 'error when create avatar ' });
    } catch (error) {
      return response
        .status(401)
        .send({ message: 'error when create avatar ' });
    }
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
