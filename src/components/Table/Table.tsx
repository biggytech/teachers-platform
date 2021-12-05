import Link from "next/link";
import classnames from "classnames";

import { cookPagination } from "./utils";

type TableProps = {
  pathName?: string;
  columns: Array<any>;
  rows: Array<any>;
  totalRecords?: number;
  pageSize?: number;
  page?: number;
  isUsePagination?: boolean;
};

const Table = (props: TableProps) => {
  const {
    pathName,
    columns,
    rows,
    totalRecords,
    pageSize,
    page,
    isUsePagination = true,
  } = props;

  console.log(rows);

  let pagination = null;

  if (isUsePagination) {
    pagination = cookPagination({ page, totalRecords, pageSize });
  }

  return (
    <div className="bg-white shadow-md rounded">
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {columns.map(({ name, displayName }) => (
              <th key={name} className="py-3 px-6 text-left">
                {displayName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {rows.map((row) => {
            const content = (
              <tr className="cursor-pointer border-b border-gray-200 hover:bg-gray-100">
                {columns.map(({ name }) => (
                  <td
                    key={name}
                    className="py-3 px-6 text-left whitespace-nowrap"
                  >
                    {row[name].toString ? row[name].toString() : row[name]}
                  </td>
                ))}
              </tr>
            );

            if (pathName) {
              return (
                <Link key={row.id} href={`${pathName}/${row.id}`}>
                  {content}
                </Link>
              );
            } else {
              return content;
            }
          })}
        </tbody>
      </table>

      {isUsePagination ? (
        <>
          <div>
            <p className="text-sm leading-5 text-blue-700 text-right py-1 px-3">
              Showing <span className="font-medium">{pageSize}</span> of{" "}
              <span className="font-medium">{totalRecords}</span> results
            </p>
          </div>
          <div className="w-full flex justify-center border-t border-gray-100 py-2  items-center">
            <Link
              href={`${pathName}?page=${pagination.prev.page}&limit=${pageSize}`}
            >
              <svg
                className={classnames("h-6 w-6", {
                  "cursor-not-allowed": pagination.prev.isDisabled,
                  "cursor-pointer": !pagination.prev.isDisabled,
                })}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity={pagination.prev.isDisabled ? "0.4" : 1}>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 12C9 12.2652 9.10536 12.5196 9.29289 12.7071L13.2929 16.7072C13.6834 17.0977 14.3166 17.0977 14.7071 16.7072C15.0977 16.3167 15.0977 15.6835 14.7071 15.293L11.4142 12L14.7071 8.70712C15.0977 8.31659 15.0977 7.68343 14.7071 7.29289C14.3166 6.90237 13.6834 6.90237 13.2929 7.29289L9.29289 11.2929C9.10536 11.4804 9 11.7348 9 12Z"
                    fill={pagination.prev.isDisabled ? "#2C2C2C" : "#18A0FB"}
                  />
                </g>
              </svg>
            </Link>
            {pagination.pages.map((pg) => (
              <Link key={pg} href={`${pathName}?page=${pg}&limit=${pageSize}`}>
                <p
                  className={classnames(
                    "leading-relaxed cursor-pointer mx-2 text-blue-600 hover:text-blue-600 text-sm",
                    {
                      "font-bold": pg === page,
                    }
                  )}
                >
                  {pg}
                </p>
              </Link>
            ))}
            <Link href={`?page=${pagination.next.page}&limit=${pageSize}`}>
              <svg
                className={classnames("h-6 w-6", {
                  "cursor-not-allowed": pagination.next.isDisabled,
                  "cursor-pointer": !pagination.next.isDisabled,
                })}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity={pagination.next.isDisabled ? "0.4" : 1}>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15 12C15 11.7348 14.8946 11.4804 14.7071 11.2929L10.7071 7.2929C10.3166 6.9024 9.6834 6.9024 9.2929 7.2929C8.9024 7.6834 8.9024 8.3166 9.2929 8.7071L12.5858 12L9.2929 15.2929C8.9024 15.6834 8.9024 16.3166 9.2929 16.7071C9.6834 17.0976 10.3166 17.0976 10.7071 16.7071L14.7071 12.7071C14.8946 12.5196 15 12.2652 15 12Z"
                    fill={pagination.next.isDisabled ? "#2C2C2C" : "#18A0FB"}
                  />
                </g>
              </svg>
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Table;
