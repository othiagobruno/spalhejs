'use strict';

const Drive = use('Drive');
const File = use('App/Models/File');

class FileController {
	async store({ request, response, params }) {
		try {
			request.multipart
				.file('image', {}, async (file) => {
					const ContentType = file.headers['content-type'];
					const ACL = 'public-read';
					const Key = `${(Math.random() * 100).toString(32)}-${file.clientName}`;
					const url = await Drive.put(`posts/${Key}`, file.stream, {
						ContentType,
						ACL
					});
					await File.create({
						name: file.clientName,
						type: ContentType,
						post_id: params.id,
						key,
						url
					});
					return response.json({
						sucess: url
					});
				})
				.process();
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
