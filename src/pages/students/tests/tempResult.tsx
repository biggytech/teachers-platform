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
import { Id } from "@projectTypes/database";

interface TempTestResultnProps {
  user: User;
  totalQuestions: number;
  right: number;
  mark: number;
  testId: Id;
}

const TempTestResult: React.FC<TempTestResultnProps> = ({ user, totalQuestions, right, mark, testId }) => {

  return (
    <AppLayout userRole={user.role} title="Результаты теста">
      <Typography variant="subtitle1" display="block" gutterBottom>
        Всего вопросов: {totalQuestions}
      </Typography>
      <Typography variant="subtitle1" display="block" gutterBottom>
        Правильных ответов: {right}
      </Typography>
      <Typography variant="subtitle1" display="block" gutterBottom>
        Оценка: {mark}
      </Typography>

      <ButtonsRow style={{ marginTop: '2em' }}>
        <NewButton link={`/students/tests/${testId}`} text="Вернуться к тесту" icon={<ArrowBackIcon />} />
      </ButtonsRow>
    </AppLayout>
  );
};

const getServerSideProps = async ({ query, req }) => {
  return await checkRoleAuthentication({
    role: ROLES.STUDENT,
    req,
    cb: async (redirect, user) => {
      if (redirect || !user) {
        return handleRedirectError(new RedirectError(`Redirection to ${redirect}`, redirect ?? '/errors/403'));
      }

      const { totalQuestions, right, mark, testId } = query;

      return {
        props: {
          user,
          totalQuestions, right, mark,
          testId
        }
      }
    },
  });
};

export { getServerSideProps };
export default TempTestResult;
