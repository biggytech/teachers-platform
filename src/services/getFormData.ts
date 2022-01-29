const formidable = require("formidable");

export default function getFormData<
  Fields extends object,
  Files extends object
>(req) {
  return new Promise<{
    fields: Fields;
    files: {
      [F in keyof Files]: {
        filepath: string;
      };
    };
  }>(function (resolve, reject) {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
    });
    form.parse(req, async function (err, fields, files) {
      if (err) {
        return reject(err);
      }

      resolve({
        fields,
        files,
      });
    });
  });
}
