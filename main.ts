// @deno-types="npm:@types/express"
import express from "express";
import { load } from "dotenv";
import mongoose from "mongoose";
import logger from "./middlewares/logger.ts";
import getAllPersonas from "./resolvers/getAllPersonas.ts";
import getPersona from "./resolvers/getPersona.ts";
import getAllPlanetas from "./resolvers/getAllPlanetas.ts";
import getPlaneta from "./resolvers/getPlaneta.ts";
import getAllDimensiones from "./resolvers/getAllDimensiones.ts";
import getDimension from "./resolvers/getDimension.ts";
import addPersona from "./resolvers/addPersona.ts";
import addPlaneta from "./resolvers/addPlaneta.ts";
import addDimension from "./resolvers/addDimension.ts";
import deletePersona from "./resolvers/deletePersona.ts";
import deleteDimension from "./resolvers/deleteDimension.ts";
import editPersona from "./resolvers/editPersona.ts";
import editPlaneta from "./resolvers/editPlaneta.ts";
import deletePlaneta from "./resolvers/deletePlaneta.ts";

const env = await load();

const mongoUri = env.MONGO || Deno.env.get("MONGO");
if (!mongoUri) {
  console.error("No se ha podido obtener la uri de mongo.");
  Deno.exit();
}

await mongoose.connect(mongoUri);

const app = express();
app.use(express.json());
app.use(logger);

app
  .get("/api/personas", getAllPersonas)
  .post("/api/personas", addPersona)
  .get("/api/personas/:id", getPersona)
  .delete("/api/personas/:id", deletePersona)
  .put("/api/personas/:id", editPersona)
  .post("/api/planetas", addPlaneta)
  .get("/api/planetas", getAllPlanetas)
  .get("/api/planetas/:id", getPlaneta)
  .put("/api/planetas/:id", editPlaneta)
  .delete("/api/planetas/:id", deletePlaneta)
  .get("/api/dimensiones", getAllDimensiones)
  .post("/api/dimensiones", addDimension)
  .get("/api/dimensiones/:id", getDimension)
  .delete("/api/dimensiones/:id", deleteDimension);

app.listen(8080, () => {
  console.log("Server running");
});
