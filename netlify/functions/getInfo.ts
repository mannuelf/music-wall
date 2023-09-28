import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
	const { name = 'stranger' } = event.queryStringParameters;

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: `Hello, ${name}!`
		})
	};
};

export { handler };
