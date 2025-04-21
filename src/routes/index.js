import express from "express";
const router = express.Router();

import slotRoute from "./slots.js";
import contactRoute from "./contact.js";
import newsLetterRoute from "./newsletter.js";
import admissionsRoute from "./admissions.js";

const routes = () => {
  router.use("/", slotRoute);
  router.use("/", contactRoute);
  router.use("/", newsLetterRoute);
  router.use("/", admissionsRoute);
  return router;
};

export default routes;
