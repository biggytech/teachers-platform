import answersService from "@db/answers/answersService";
import { cookSimpleBodyData } from "@services/pages";
import { checkAuthentication } from "@services/api";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        await answersService.add({
          description: req.body.description,
          question_id: req.body.question_id,
          is_correct: Object.prototype.hasOwnProperty.call(
            req.body,
            "is_correct"
          ),
        });
        res.redirect("/programs");
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
