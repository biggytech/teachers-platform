import Head from "next/head";
import { FieldsProfile } from "@components";

const UserProfile = ({ pageType, data, mapData = null }) => {
  return (
    <>
      <Head>
        <title>
          {pageType} | {data.firstname} {data.lastname}
        </title>
      </Head>
      <div className="bg-gray-100">
        <div className="container mx-auto p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full">
              <div className="bg-white p-3 border-t-4 border-green-400">
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
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  {data.firstname} {data.lastname}
                </h1>
                <FieldsProfile data={data} mapData={mapData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
