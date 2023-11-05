export default {
    options: {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Train Booking",
                version: "1.0.0",
                description: "API for train booking project",
            },
            servers: [
                {
                    url: "http://localhost:4000",
                },
            ],
        },
        apis: ["../src/routes/*.routes.ts"],
    }
};