import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/api/", (c) => {
  return c.json({
    message: "Evento server is running",
    status: "success",
  });
});

app.get("/api/health", (c) => {
  return c.json({
    message: "API is healthy",
    status: "success",
  });
});

function getAllRoutes(app) {
  const routes = [];
  const honoRoutes = app._routes || [];
  honoRoutes.forEach((route) => {
    if (route.path && route.method) {
      routes.push({
        method: route.method,
        path: route.path,
      });
    }
  });

  return routes;
}

app.get("/endpoints", (c) => {
  const routes = getAllRoutes(app);
  return c.json({
    endpoints: routes,
    count: routes.length,
    status: "success",
  });
});

serve({ port: 3000, fetch: app.fetch }, (i) =>
  console.log(`listening on port ${i.port}`)
);
