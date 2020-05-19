'use strict';

const Drive = use('Drive');
const File = use('App/Models/File');

class FileController {
	// BUSCA AS IMAGENS NO BANCO DE DADOS
	async index({ request, response }) {
		const files = await File.query().with('posts').with('posts.user').fetch();
		return files.toJSON();
	}

	// ARMAZAENA AS IMAGENS NO S3
	async store({ request, response, params }) {
		try {
			const validationOptions = {
				types: [ 'jpeg', 'jpg', 'png' ],
				size: '15mb'
			};
			for (let i = 0; i < 7; i++) {
				const name = (Math.random() * 100).toString(32);
				request.multipart.file(`image[${i}]`, validationOptions, async (file) => {
					file.size = file.stream.byteCount;
					await file.runValidations();
					const error = file.error();
					if (error.message) {
						throw new Error(error.message);
					}
					// UPLOAD FILE TO S3
					const url = await Drive.put(`posts/${params.id}.${name + file.clientName}`, file.stream, {
						ContentType: file.headers['content-type'],
						ACL: 'public-read'
					});

					// GARAVA NO BANCO DE DADOS
					File.create({ url, name: name + file.clientName, type: file.type, key: params.id });
				});
			}
			// PROCESSA O ENVIO
			await request.multipart.process();

			//final
		} catch (err) {
			return response.json({
				error: 'não foi possivel'
			});
		}
	}
}

module.exports = FileController;
