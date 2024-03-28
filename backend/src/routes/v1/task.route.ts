import { router } from "../../app";

router.get("/tasks", (req, res) => {
  res.send('Task');
});

