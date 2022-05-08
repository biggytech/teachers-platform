import { UserProfile, Header, LinkButton } from "@components";
import { getSingleStudentProps } from "@services/pages/students";
import { checkAuthentication } from "@services/pages";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";

const SingleStudent = ({ data, id, mapData }) => {
  if (!data) {
    return <div>not found</div>;
  }

  const callDelete = async () => {
    const result = confirm(
      "Вы уверены, что хотите удалить этого студента и все связанные с ним данные?"
    );
    if (result) {
      // TODO: make delete request
      await fetch("/api/students/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      window.location.replace("/students");
    }
  };

  return (
    <>
      <Header />

      <UserProfile pageType="Студент" data={data} mapData={mapData} />
      <div
        style={{
          alignSelf: "flex-start",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LinkButton link={`/plans?student_id=${id}`} text="Учебные планы" />
        <Button
          variant="contained"
          endIcon={<RemoveIcon />}
          onClick={callDelete}
        >
          Удалить
        </Button>
      </div>
    </>
  );
};

const getServerSideProps = async ({ params, req }) => {
  return await checkAuthentication({
    req,
    cb: () => {
      return {
        props: getSingleStudentProps({ id: +params.id }),
      };
    },
  });
};

export { getServerSideProps };
export default SingleStudent;
