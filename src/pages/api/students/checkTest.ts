import testsService, { UserAnswers } from "@db/tests/testsService";
import logger from "@logger";
import { ROLES } from "@projectTypes/user";
import { checkRoleAuthentication } from "@services/pages";

async function checkTest(req, res) {
  try {
    return await checkRoleAuthentication({
      role: ROLES.STUDENT,
      req,
      cb: async (redirect, user) => {
        if (redirect || !user) {
          return res.redirect(redirect ?? '/errors/403');
        }

        logger.info('Body is:', req.body);

        const testId = req.body.testId;
        const userAnswers: UserAnswers = {};

        const keys = Object.keys(req.body);
        keys.forEach(key => {
          const [prefix, questionId, answerId] = key.split('-');
          if (prefix === 'answer') {
            if (!userAnswers[questionId]) {
              userAnswers[questionId] = [];
            }
            userAnswers[questionId].push(Number(answerId));
          }
        });

        logger.info('User answers are:', userAnswers);

        const result = await testsService.checkTestResult(testId, user.id, userAnswers);
        if (!result) {
          return res.redirect('/errors/404');
        }

        res.redirect(`/students/tests/tempResult?totalQuestions=${result.totalQuestions}&right=${result.right}&mark=${result.mark}&testId=${testId}`);
      }
    });



  } catch (err) {
    logger.err(err.message);
    return res.status(400).send(err.message);
  }
}

export default checkTest;
