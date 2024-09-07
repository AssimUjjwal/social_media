import { Express, Request, Response } from "express";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createUserController } from "./controller/user.controller";
import { createSessionSchema } from "./schema/session.schema";
import { createSessionController } from "./controller/session.controller";
import requireUser from "./middleware/requireUser";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";
import { createProductController } from "./controller/product.controller";

function routes(
    app: Express,
    userController: ReturnType<typeof createUserController>,
    sessionController: ReturnType<typeof createSessionController>,
    productController: ReturnType<typeof createProductController>
) {
    // app.get("/helthcheck", (req: Request, res: Response) => res.sendStatus(200));

    // ----------------------------------- user Routes --------------------------------------------
    app.post("/api/users", 
        validateResource(createUserSchema), 
        userController.createUserHandler
    );

    // ----------------------------------- session Routes --------------------------------------------
    app.post("/api/sessions", 
        validateResource(createSessionSchema), 
        sessionController.createUserSessionHandler
    );
    app.get("/api/sessions", 
        requireUser, 
        sessionController.getUserSessionsHandler
    );
    app.delete("/api/sessions", 
        requireUser, 
        sessionController.deleteSessionHandler
    );

    // ----------------------------------- product Routes --------------------------------------------
    app.post(
        "/api/products",
        [requireUser, validateResource(createProductSchema)],
        productController.createProductHandler
    );

    app.put(
        "/api/products/:productId",
        [requireUser, validateResource(updateProductSchema)],
        productController.updateProductHandler
    );

    app.get(
        "/api/products/:productId",
        validateResource(getProductSchema),
        productController.getProductHandler
    );

    app.delete(
        "/api/products/:productId",
        [requireUser, validateResource(deleteProductSchema)],
        productController.deleteProductHandler
    );
}

export default routes;