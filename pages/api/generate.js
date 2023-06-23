import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt",
      }
    });
    return;
  }

  try {
    console.log("Here 1");
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.log("Here");
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.log("Here 2");
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(inquiry) {
  return `Choose the correct ZTNA Product 
      
      You must choose from the following options:
      - ZTNA Connector
      - Service Connection
      - Colo Connector 
  
      Question: How do I access Server Initiated traffic ?
      Answer: Service Connection
      
      Question: I have Overlapped Networks and want Automated Tunnels 
      Answer: ZTNA Connector
      
      Question: I want to perform user-id redistribution to Prisma Access 
      Answer : Service Connection

      Question: I have partnership with Equinix and have a Colo Facility 
      Answer : Colo Connector 

      Question: I want to support Server Initiated Traffic 
      Answer : Service Connection 

      Question: I want to Support 1Gbps Traffic 
      Answer : ZTNA Connector or Service Connection 

      Question: I want to use VoIP or SMB
      Answer : Service Connection 

      Question: I want application visibility and Autoscaling
      Answer : ZTNA Connector 

      Question: I want to support On-prem AD
      Answer : Service Connection

      Question: I need 20Gbps Bandwidth
      Answer: Colo Connector

      Question: I need Automated Connectivity 
      Answer: ZTNA Connector 
      
      Question: ${inquiry}
      Answer:`;
}

