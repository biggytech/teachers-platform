import { addUser } from "../../../db/users/index";
import dataTypes from "../../../db/dataTypes";
var fs = require("fs");

const formidable = require("formidable");

async function handler(req, res) {
  await new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
    });
    form.parse(req, async function (err, fields, files) {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }

      try {
        const columns = Object.keys(fields)
          .map((name) => ({
            name,
            value: fields[name],
          }))
          .concat(
            Object.keys(files).map((name) => ({
              name,
              value: fs.readFileSync(files[name].filepath),
            }))
          );

        await addUser({
          columns,
          role: dataTypes.role.data.teacher,
        });
        res.redirect("/teachers");
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
