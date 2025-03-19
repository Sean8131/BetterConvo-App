    export default async (request, response) => {
        if (request.method === "GET") {
            response.json({ message: "Hello GET"});
        } else {
            response.json({ message:
                `You used ${request.method}`
            });
        }
        // Your serverless function logic goes here
        // Example: Return a simple response
        // response.status(200).json({ message: 'Hello from Vercel Function!' });
      };

