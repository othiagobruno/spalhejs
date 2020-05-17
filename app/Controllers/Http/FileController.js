'use strict';

const Drive = use('Drive');
const File = use('App/Models/File');

class FileController {
	async store({ request, response }) {
		try {
			const validationOptions = {
				types: [ 'jpeg', 'jpg', 'png' ],
				size: '15mb'
			};
			request.multipart.file('image', validationOptions, async (file) => {
				// set file size from stream byteCount, so adonis can validate file size
				file.size = file.stream.byteCount;
				// run validation rules
				await file.runValidations();
				// catches validation errors, if any and then throw exception
				const error = file.error();
				if (error.message) {
					throw new Error(error.message);
				}
				// upload file to s3
				await Drive.put(`teste/${file.clientName}`, file.stream, {
					ContentType: file.headers['content-type'],
					ACL: 'public-read'
				});
			});

			// You must call this to start processing uploaded file
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
