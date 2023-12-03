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
export class EndpointConfiguration {
	endpointClient: string | null =
		fs.readFileSync("./tmp/PROT", { encoding: "utf8" }) +
			"://" +
			fs.readFileSync("./tmp/HOST", { encoding: "utf8" }) ||
		"http://localhost:3001";
	endpointPrivate: string | null =
		fs.readFileSync("./tmp/PROT", { encoding: "utf8" }) +
			"://" +
			fs.readFileSync("./tmp/HOST", { encoding: "utf8" }) ||
		"http://localhost:3001";
	endpointPublic: string | null =
		fs.readFileSync("./tmp/PROT", { encoding: "utf8" }) +
			"://" +
			fs.readFileSync("./tmp/HOST", { encoding: "utf8" }) ||
		"http://localhost:3001";
}
