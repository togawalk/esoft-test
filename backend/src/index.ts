import cors from "cors";
import passport from "passport";
import { jwtStrategy } from "./config/passport";

const port = 3000;
import app from "./app";
app.use(passport.initialize());

app.use(cors());

passport.use("jwt", jwtStrategy);

import "./routes/v1/task.route";
import "./routes/v1/auth.route";
import "./routes/v1/subordinates.route";

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "You are authorized to access this resource" });
  },
);

app.post("/test", (req, res) => {
  res.json({ message: "TEST" });
});

app.listen(port, () =>
  console.log(`Server is running at: http://localhost:${port}`),
);
