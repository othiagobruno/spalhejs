const Drive = use('Drive');
const Env = use('Env');
const PostFile = use('App/Models/PostFile');
const UserAvatar = use('App/Models/UserAvatar');
class FileController {
  async getFileDownload(response, path) {
    try {
      const file = await Drive.disk('s3').getObject(path);
      response.header('Content-type', file.ContentType);
      response.header('Content-length', file.ContentLength);
      response.header('Content-disposition', 'attachment');
      return response.send(file.Body);
    } catch (error) {
      return '';
    }
  }

  async show({ params, response }) {
    try {
      const { file, directory } = params;
      const path = `${directory}/${file}`;
      const res = await this.getFileDownload(response, path);
      return res;
    } catch (err) {
      return this.getFileDownload(response, 'no_content/noimage.jpg');
    }
  }

  async showAvatar({ params, response }) {
    const { id } = params;
    const avatar = await UserAvatar.query().where({ user_id: id }).last();
    return this.getFileDownload(response, avatar.file);
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

  async moment({ request, response, auth }) {
    try {
      if (request.files_array) {
        request.files_array.map(async (file) => {
          auth.user.moments().create({
            file: file.file,
            name: file.name,
            type: file.type,
            subtype: file.subtype,
          });
        });
        response.send(request.files_array);
      }
    } catch (err) {
      return response
        .status(401)
        .send({ message: 'error when create file moment ' });
    }
  }
}

module.exports = FileController;
