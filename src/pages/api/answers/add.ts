import answersService from "@db/answers/answersService";
import { checkRoleAuthentication, cookSimpleBodyData } from "@services/pages";
import { ROLES } from "@projectTypes/user";

async function handler(req, res) {
  try {
    return await checkRoleAuthentication({
      role: ROLES.TEACHER,
      req,
      res,
      cb: async (redirect, user) => {
        if (redirect) {
          return res.redirect(redirect);
        }
        await answersService.add({
          description: req.body.description,
          question_id: req.body.question_id,
          is_correct: Object.prototype.hasOwnProperty.call(
            req.body,
            "is_correct"
          ),
        });
        res.redirect(`/answers?question_id=${req.body.question_id}`);
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
