import { UserProfile } from "@components";
import { getSingleStudentProps } from "@services/pages/students";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";
import AppLayout from "@components/AppLayout";
import ButtonsRow from "@components/ButtonsRow";
import NewButton, { ButtonColors } from "@components/NewButton";
import TocIcon from '@mui/icons-material/Toc';
import DeleteIcon from '@mui/icons-material/Delete';
import testsService, { TestForExecution } from "@db/tests/testsService";
import logger from "@logger";
import Typography from '@mui/material/Typography';
import React, { useCallback } from "react";
import goBack from "@services/goBack";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from "@mui/system";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SaveIcon from '@mui/icons-material/Save';

interface TestExecutionProps {
  user: User;
  test: TestForExecution
}

const TestExecution: React.FC<TestExecutionProps> = ({ user, test }) => {
  const onSend = (e: React.FormEvent) => {
    const isSure = confirm("Вы уверены, что хотите отправить?");
    if (!isSure) {
      e.preventDefault();
      return;
    }
  }

  return (
    <AppLayout userRole={user.role} title={`Тест "${test.title}"`}>
      {test.description ? <Typography variant="subtitle1" display="block" gutterBottom style={{ marginBottom: '2em' }}>
        Описание: {test.description}
      </Typography> : null}

      {test.mark !== null ? (<>
        <Typography variant="h5" gutterBottom component="div">
          Вы уже прошли этот тест
        </Typography>
        <Typography variant="subtitle1" display="block" gutterBottom style={{ marginBottom: '2em' }}>
          Оценка: {test.mark}
        </Typography>
        <ButtonsRow>
          <NewButton onClick={goBack} text="Вернуться назад" icon={<ArrowBackIcon />} />
        </ButtonsRow>
      </>) : null}

      {test.mark === null ? (<form onSubmit={onSend} action="/api/students/checkTest" method="POST">
        <Typography variant="h4" gutterBottom component="div">
          Выполнение теста
        </Typography>

        {test.questions.map(question => {
          return <FormGroup key={question.id} style={{ marginTop: '1.5em' }}>
            <Typography variant="h6" gutterBottom component="div">
              {question.description}
            </Typography>
            {question.answers.map(answer => {
              return <Box key={answer.id}>
                <FormControlLabel control={<Checkbox name={`answer-${question.id}-${answer.id}`} defaultChecked={false} />} label={answer.description} />
              </Box>
            })}
          </FormGroup>
        })}

        <input type="hidden" name="testId" value={test.id} />

        <ButtonsRow style={{ marginTop: '2em' }}>
          <NewButton text="Отправить" color={ButtonColors.success} icon={<SaveIcon />} type="submit" />
        </ButtonsRow>
      </form>) : null}
    </AppLayout>
  );
};

const getServerSideProps = async ({ params, req }) => {
  return await checkRoleAuthentication({
    role: ROLES.STUDENT,
    req,
    cb: async (redirect, user) => {
      if (redirect || !user) {
        return handleRedirectError(new RedirectError(`Redirection to ${redirect}`, redirect ?? '/errors/403'));
      }

      const test = await testsService.getTestForExecution(params.id, user.id);
      logger.info('Test is:', test);

      if (!test) {
        return handleRedirectError(new RedirectError(`Redirection to /errors/404`, '/errors/404'));
      }

      return {
        props: {
          user,
          test
        }
      }
    },
  });
};

export { getServerSideProps };
export default TestExecution;
