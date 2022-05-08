import { checkAuthentication } from "@services/api";
import studentsService from "@db/students/studentsService";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        await studentsService.delete(JSON.parse(req.body).id);
        res.status(200).end();
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}
export default handler;
