import { getReportData } from "@db/plans/plansQueries";
import { generateReport } from "@services/pdf/generateReport";
import * as fs from "fs";

async function handler(req, res) {
  try {
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
