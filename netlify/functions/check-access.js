const axios = require('axios');
const { withCors } = require('./util/cors');

const checkAccessHandler = async (event, context) => {
  const WEBFLOW_SITE_ID = process.env.WEBFLOW_SITE_ID;
  const WEBFLOW_ACCESS_TOKEN = process.env.WEBFLOW_ACCESS_TOKEN;

  try {
    const response = await axios.get(
      'https://api.webflow.com/v2/sites',
      {
        headers: {
          'Authorization': `Bearer ${WEBFLOW_ACCESS_TOKEN}`,
          'accept-version': '1.0.0',
          'Accept': 'application/json'
        }
      }
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Webflow API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

exports.handler = withCors(checkAccessHandler);