import { getReportData } from "@db/plans/plansQueries";
import { checkRoleAuthentication } from "@services/pages";
import { generateReport } from "@services/pdf/generateReport";
import { ROLES } from "@types/user";
import * as fs from "fs";

async function handler(req, res) {
  try {
    return await checkRoleAuthentication({
      role: ROLES.TEACHER,
      req,
      res,
      cb: async (redirect, user) => {
        if (redirect) {
          return res.redirect(redirect);
        }

        const planId = req.query.plan_id;
    const reportData = await getReportData({ planId });
    const reportPath = await generateReport({ reportData, planId });

    var stat = fs.statSync(reportPath);
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Length": stat.size,
    });
    var readStream = fs.createReadStream(reportPath);

    readStream.on("error", (err) => {
      console.log(err);
    });
    readStream.on("finish", () => {
      fs.unlinkSync(reportPath);
    });
    readStream.pipe(res);
      },
    });
    
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
