import { Router, Request, Response } from "express";
import { route } from "@fosscord/api";
import { Config } from "@fosscord/util";
import { config } from "dotenv"
const router = Router();

router.get("/",route({}), async (req: Request, res: Response) => {
    const { cdn, gateway } = Config.get();
    
    const IdentityForm = {
        cdn: cdn.endpointPublic || process.env.HTTP_HOST_PORT,
        gateway: process.env.WS_HOST_PORT
    };

	res.json(IdentityForm);
});

export default router;
