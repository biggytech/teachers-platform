const cookCreatedPlanData = ({ body }) => {
  const columns = [];
  const children = [];

  for (const key in body) {
    columns.push({
      name: key,
      value: body[key],
    });
  }
  return columns;
};

export default cookCreatedPlanData;
