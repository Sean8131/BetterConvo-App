    export default async (request, response) => {
        if (request.method === "GET") {
            response.json({ message: "Hello GET"});
        } else {
            response.json({ message:
                `You used ${request.method}`
            });
        }
      };

