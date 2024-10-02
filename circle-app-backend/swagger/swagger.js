const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  // autoHeaders: false,
});

const doc = {
  info: {
    title: "API CIRCLE",
    description: "API Documentation for Circle-App",
  },
  host: "localhost:5000",
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    "@schemas": {
      registerSchema: {
        type: "object",
        properties: {
          fullname: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
      },
      loginSchema: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
      },
      createThreadSchema: {
        type: "object",
        properties: {
          content: {
            type: "string",
          },
          image: {
            type: "string",
          },
        },
      },
      createReplySchema: {
        type: "object",
        properties: {
          content: {
            type: "string",
          },
          image: {
            type: "string",
          },
        },
      },
      likeSchema: {
        type: "object",
        properties: {
          threadId: {
            type: "integer",
          },
        },
      },
      followSchema: {
        type: "object",
        properties: {
          followersId: {
            type: "integer",
          },
        },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/index.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
