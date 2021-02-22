import { Request, Response, Router } from "express";
import { GuildModel, MemberModel } from "fosscord-server-util";
import { HTTPError } from "lambert-server";
import { instanceOf, Length } from "../../../../../../util/instanceOf";
import { PublicMemberProjection } from "../../../../../../util/Member";

const router = Router();

// TODO: not allowed for user -> only allowed for bots with privileged intents
// TODO: send over websocket
router.get("/", async (req: Request, res: Response) => {
	const guild_id = BigInt(req.params.id);
	const guild = await GuildModel.findOne({ id: guild_id }).exec();
	if (!guild) throw new HTTPError("Guild not found", 404);

	try {
		instanceOf({ $limit: new Length(Number, 1, 1000), $after: BigInt }, req.query, {
			path: "query",
			req,
			ref: { obj: null, key: "" },
		});
	} catch (error) {
		return res.status(400).json({ code: 50035, message: "Invalid Form Body", success: false, errors: error });
	}

	// @ts-ignore
	if (!req.query.limit) req.query.limit = 1;
	const { limit, after } = (<unknown>req.query) as { limit: number; after: bigint };
	const query = after ? { id: { $gt: after } } : {};

	var members = await MemberModel.find({ guild_id, ...query }, PublicMemberProjection)
		.limit(limit)
		.populate("user")
		.exec();

	return res.json(members);
});

router.get("/:member", async (req: Request, res: Response) => {
	const guild_id = BigInt(req.params.id);
	const user_id = BigInt(req.params.member);

	const member = await MemberModel.findOne({ id: user_id, guild_id }).populate("user").exec();
	if (!member) throw new HTTPError("Member not found", 404);
	console.log(member.user);

	return res.json(member);
});

export default router;
