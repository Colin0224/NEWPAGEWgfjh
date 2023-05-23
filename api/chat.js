const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  const { message } = req.body;
  const openaiResponse = await axios.post( 
    'https://api.openai.com/v1/completions',
    {
      prompt: `The inputs are a list of attributes, with those inputs, produce an estimate of the annual salary of the induvidual as well as the job title they hold: ${message}\n\nAnswer:`,
      model: 'text-davinci-003',
      max_tokens: 3000,
      n: 1,
      temperature: 1.0,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  res.status(200).json(openaiResponse.data.choices[0].text.trim());
};
