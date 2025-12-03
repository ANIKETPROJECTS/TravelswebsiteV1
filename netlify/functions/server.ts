import type { Handler } from "@netlify/functions";
import express from "express";
import { createServer } from "../../../server/index";

const app = express();
const server = createServer(app);

export const handler: Handler = async (event, context) => {
  // Handle requests through Express
  return new Promise((resolve) => {
    const req = {
      method: event.httpMethod,
      headers: event.headers,
      url: event.path,
      body: event.body,
    } as any;

    const res = {
      statusCode: 200,
      headers: {},
      body: "",
      send: function(data: any) {
        this.body = data;
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: this.body,
        });
      },
    } as any;

    server(req, res);
  });
};
