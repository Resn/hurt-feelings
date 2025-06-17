const blogPostsHandler = async (event, context) => {
  const WEBFLOW_SITE_ID = process.env.WEBFLOW_SITE_ID;
  const WEBFLOW_ACCESS_TOKEN = process.env.WEBFLOW_ACCESS_TOKEN;

  try {
    const collectionsResponse = await axios.get(
      `https://api.webflow.com/v2/sites/${WEBFLOW_SITE_ID}/collections`,
      {
        headers: {
          'Authorization': `Bearer ${WEBFLOW_ACCESS_TOKEN}`,
          'accept-version': '1.0.0',
          'Accept': 'application/json'
        }
      }
    );
    
    const collectionId = collectionsResponse.data.collections[0].id; // first collection for now (prototype)
    
    const itemsResponse = await axios.get(
      `https://api.webflow.com/v2/collections/${collectionId}/items`,
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
      body: JSON.stringify(itemsResponse.data)
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

exports.handler = withCors(blogPostsHandler);