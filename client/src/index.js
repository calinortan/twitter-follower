import express from "express";
import proxy from "express-http-proxy";
import renderer from "helpers/renderer";
import createStore from "helpers/createStore";
import "regenerator-runtime/runtime";
import { matchRoutes } from "react-router-config";
import routesConfig from "client/routes/routesConfig";
import thunk from "redux-thunk";
import axios from "axios";

const API_HOST = process.env.API_HOST || "http://localhost:5000";

const app = express();

app.use("/api", proxy(API_HOST));
app.use(express.static("public"));
app.get("*", async (req, res) => {
  const serverAxios = axios.create({
    baseURL: API_HOST,
    headers: { cookie: req.get("cookie") || "" }
  });

  const store = createStore({
    middleware: [thunk.withExtraArgument(serverAxios)]
  });

  const promises = matchRoutes(routesConfig, req.path).map(
    ({ route: { loadSsrData } }) => loadSsrData && loadSsrData(store)
  );

  await Promise.all(promises);

  const context = {};
  const content = renderer(store, req.path, context);

  if (context.notFound) {
    res.status(404);
  }

  if (context.url) {
    res.status(301).redirect(context.url);
  }

  res.send(content);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
