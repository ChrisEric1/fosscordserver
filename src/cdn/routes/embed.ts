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

import { Request, Response, Router } from "express";
import FileType from "file-type";
import fs from "fs/promises";
import { HTTPError } from "lambert-server";
import { join } from "path";

const defaultAvatarHashMap = new Map([
	["0", "823a3de61c4dc2415cc4dbc38fca4299"],
	["1", "e56a89224be0b2b1f7c04eca975be468"],
	["2", "0c8138dcc0dfe2689cdd73f7952c2475"],
	["3", "5ac2728593bb455250d11b848a0c36c6"],
	["4", "addd2f3268df46459e1d6012ad8e75bd"],
	["5", "c4e0c8300fa491d94acfd2a1fb26cea8"],
]);

const router = Router();

async function getFile(path: string) {
	try {
		return fs.readFile(path);
	} catch (error) {
		try {
			const files = await fs.readdir(path);
			if (!files.length) return null;
			return fs.readFile(join(path, files[0]));
		} catch (error) {
			return null;
		}
	}
}

router.get("/avatars/:id", async (req: Request, res: Response) => {
	let { id } = req.params;
	id = id.split(".")[0]; // remove .file extension
	const hash = defaultAvatarHashMap.get(id);
	if (!hash) throw new HTTPError("not found", 404);
	const path = join(process.cwd(), "assets", "public", `${hash}.png`);

	const file = await getFile(path);
	if (!file) throw new HTTPError("not found", 404);
	const type = await FileType.fromBuffer(file);

	res.set("Content-Type", type?.mime);
	res.set("Cache-Control", "public, max-age=31536000");

	return res.send(file);
});

export default router;
