var fs = require("fs");
var bcrypt = require("bcryptjs");
const formidable = require("formidable");

const hashPassword = (password) => {
  var salt = bcrypt.genSaltSync(+process.env.BCRYPT_SALT);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};

const cookCreatedUserData = (req, schema) => {
  return new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
    });
    form.parse(req, async function (err, fields, files) {
      if (err) {
        return reject(err);
      }

      try {
        const columns = Object.keys(fields)
          .map((name) => {
            const value =
              name === schema.columns.password.name
                ? hashPassword(fields[name])
                : fields[name];

            console.log(value, name);

            return {
              name,
              value,
            };
          })
          .concat(
            Object.keys(files).map((name) => ({
              name,
              value: fs.readFileSync(files[name].filepath),
            }))
          );
        console.log(columns);

        resolve({
          columns,
        });
      } catch (err) {
        reject(err);
      }
    });
  });
};

module.exports = cookCreatedUserData;
