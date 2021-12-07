export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Kyle API Demo",
            version: "0.1.0",
            description: "Kyle API Demo",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html"
            },
            contact: {
                name: "Kyle Sterger",
                email: "h332142@gmail.com"
            }
        },
        servers: [
            { url: "http://localhost:5000/" },
            { url: "https://kyle-iceberg-backend.herokuapp.com/" }
        ],
        security: {
            app_id: []
        }
    },
    apis: ["src/swagger/schemas/*.yaml", "src/swagger/*.yaml"]
}
