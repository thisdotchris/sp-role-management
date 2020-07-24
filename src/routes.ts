import { app } from "./server";
import { UserRouter } from "./controllers/user.controller";
import { RoleRouter } from "./controllers/role.controller";
import { AccountRouter } from "./controllers/account.controller";
import accountMiddleware from "./middlewares/account.middleware";

app.use("/accounts", AccountRouter);
app.use(accountMiddleware);
app.use("/users", UserRouter);
app.use("/roles", RoleRouter);
