/*
	Fosscord: A FOSS re-implementation and extension of the Discord.com backend.
	Copyright (C) 2023 Fosscord and Fosscord Contributors
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published
	by the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.
	
	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import fs from "fs";
import { Config } from "@fosscord/util";
import { Router, Response, Request } from "express";
import { route, RouteOptions } from "@fosscord/api";

const router = Router();

const options: RouteOptions = {
	test: {
		response: {
			body: "GatewayBotResponse",
		},
	},
};
let websock = "";
if (fs.readFileSync("./tmp/PROT", { encoding: "utf8" }) == "https") {
	websock = "wss://" + fs.readFileSync("./tmp/HOST", { encoding: "utf8" });
} else if (fs.readFileSync("./tmp/PROT", { encoding: "utf8" }) == "http") {
	websock = "ws://" + fs.readFileSync("./tmp/HOST", { encoding: "utf8" });
} else {
	websock = "";
}
router.get("/", route(options), (req: Request, res: Response) => {
	const { endpointPublic } = Config.get().gateway;
	res.json({
		url: websock || process.env.GATEWAY || "ws://localhost:3001",
		shards: 1,
		session_start_limit: {
			total: 1000,
			remaining: 999,
			reset_after: 14400000,
			max_concurrency: 1,
		},
	});
});

export default router;
