import studentsService, { Course } from "@db/students/studentsService";
import RedirectError from "@lib/RedirectError";
import { ROLES, User } from "@projectTypes/user";
import { checkRoleAuthentication } from "@services/pages";
import handleRedirectError from "@services/pages/handleRedirectError";
import AppLayout from "@components/AppLayout";
import InfoList from "@components/InfoList";
import { useMemo } from "react";
import NewButton from "@components/NewButton";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BallotIcon from '@mui/icons-material/Ballot';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SchoolIcon from '@mui/icons-material/School';
import ButtonsRow from "@components/ButtonsRow";


interface SingleCourseProps {
  user: User;
  course: Course
}

const SingleCourse: React.FC<SingleCourseProps> = ({ user, course }) => {
  const items = useMemo(() => {
    return [
      {
        id: 'startDate',
        label: 'Дата начала',
        value: course.startDate
      },
      {
        id: 'endDate',
        label: 'Дата окончания',
        value: course.endDate
      },
      {
        id: 'teacher',
        label: 'Инструктор',
        value: course.teacher
      }
    ]
  }, [course]);

  return <AppLayout userRole={user.role} title={`Курс: "${course.name}"`}>
    <InfoList items={items} />
    <ButtonsRow>
      <NewButton link={`/students/courses/materials/${course.id}`} text="Учебные материалы" icon={<AutoStoriesIcon />} />
      <NewButton link={`/students/courses/tasks/${course.id}`} text="Задания" icon={<BorderColorIcon />} />
      <NewButton link={`/students/courses/tests/${course.id}`} text="Тесты" icon={<BallotIcon />} />
      <NewButton link={`/students/courses/marks/${course.id}`} text="Мои оценки" icon={<SchoolIcon />} />
    </ButtonsRow>
  </AppLayout>
};

export const getServerSideProps = async ({ req, params }) => {
  return await checkRoleAuthentication({
    req,
    role: ROLES.STUDENT,
    cb: async (redirect, user) => {
      try {
        if (redirect) {
          throw (new RedirectError(`Redirection to ${redirect}`, redirect))
        }

        const course = await studentsService.getSingleCourse(params.id);
        if (!course) {
          throw new RedirectError('Redirection to /errors/404', '/errors/404')
        }

        return {
          props: {
            user,
            course
          }
        }

      } catch (err) {
        return handleRedirectError(err)
      }

    }
  })
};
export default SingleCourse;