class FileUpload {
  async handle({ request, response }, next, properties) {
    const [allowedFileType = 'all', numberFilesAllowed = 1] = properties;

    let validateOptions = {
      image: ['jpeg', 'png', 'gif'],
      video: ['mp4, mov'],
      all: ['jpeg', 'png', 'gif', 'mp4, mov'],
    };

    validateOptions = {
      types: validateOptions[allowedFileType],
      size: '15mb',
    };

    const files = request.file('files', validateOptions);

    if (files.files.length > numberFilesAllowed) {
      return response.badRequest({ error: 'Não pode' });
    }

    await files.runValidations();

    const errors = files.errors();

    const findErrorsInArray = errors.find((prop) => prop.message);

    if (findErrorsInArray) return response.badRequest(errors);

    await next();
  }
}

module.exports = FileUpload;
