'use strict';

const Drive = use('Drive');
const File = use('App/Models/File');

class FileController {
	async store({ request, response, params }) {
		try {
			const validationOptions = {
				types: [ 'jpeg', 'jpg', 'png' ],
				size: '15mb'
			};
			request.multipart.file('image[]', validationOptions, async (file) => {
				file.size = file.stream.byteCount;
				await file.runValidations();
				const error = file.error();
				if (error.message) {
					throw new Error(error.message);
				}
				// UPLOAD FILE TO S3
				const url = await Drive.put(`posts/${params.id + '-' + file.clientName}`, file.stream, {
					ContentType: file.headers['content-type'],
					ACL: 'public-read'
				});

				// GARAVA NO BANCO DE DADOS
				File.create({ url, name: file.clientName, type: file.type, key: params.id });
			});
			// PROCESSA O ENVIO
			await request.multipart.process();

			//final
		} catch (err) {
			return response.json({
				error: 'não foi possivel'
			});
		}
	}

	// UPLOAD PROFILE
	async profile({ response, auth, request }) {
		//
	}
}

module.exports = FileController;
