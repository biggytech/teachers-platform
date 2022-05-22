import Head from "next/head";
import { FieldsProfile } from "@components";
import { useMemo } from "react";
import InfoList from "@components/InfoList";

const UserProfile = ({ pageType, data, mapData = null }) => {
  const items = useMemo(() => {
    return [
      {
        id: 'username',
        label: 'Имя пользователя',
        value: data.username
      },
      {
        id: 'firstname',
        label: 'Имя',
        value: data.firstname
      },
      {
        id: 'lastname',
        label: 'Фамилия',
        value: data.lastname
      }
    ]
  }, [data]);

  console.log(data);

  return (
    <>
      <div className="image overflow-hidden">
        {data.picture && (
          <img
            className="h-auto w-full mx-auto"
            src={`data:image/png;base64, ${data.picture}`}
            alt=""
            style={{ width: "25%" }}
          />
        )}
      </div>
      <InfoList items={items} />
    </>
  );
};

export default UserProfile;
