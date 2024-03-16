export default defineEventHandler(async (event) => {
  const query = getQuery(event) as { id: string | undefined };

  if (!query?.id || typeof query?.id !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Request must have an id query string',
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    return {
      url: 'https://pbxt.replicate.delivery/YXbcLudoHBIYHV6L0HbcTx5iRzLFMwygLr3vhGpZI35caXbE/out-0.png',
    };
  }

  const response = (await $fetch(
    `https://api.replicate.com/v1/predictions?id=${query.id}`,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  )) as { results: [{ output: string[] }] };

  return {
    url: response.results[0].output[0],
  };
});
