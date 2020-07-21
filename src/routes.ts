import { app } from "./server";
import { UserRouter } from "./controllers/user.controller";
import { RoleRouter } from "./controllers/role.controller";

app.use("/users", UserRouter);
app.use("/roles", RoleRouter);
