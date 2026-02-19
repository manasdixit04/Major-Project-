import { connctDB } from "./db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv";


dotenv.config({
  path: "./.env",
});

connctDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on PORT: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection error: ", error);
  });


