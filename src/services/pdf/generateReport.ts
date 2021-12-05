import pdf from "pdf-creator-node";
import * as fs from "fs";
import * as path from "path";
import getConfig from "next/config";

export const generateReport = async ({ reportData, planId }) => {
  const { serverRuntimeConfig } = getConfig();
  const templatePath = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    "./src/services/pdf/template.html"
  );
  const outputPath = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    `./src/services/pdf/temp/${planId}.pdf`
  );

  var html = fs.readFileSync(templatePath, "utf8");

  var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
      height: "45mm",
      contents: '<div style="text-align: center;">Author: Neli Harbuzava</div>',
    },
    footer: {
      height: "28mm",
      contents: {
        first: "Cover page",
        2: "Second page", // Any page number is working. 1-based index
        default:
          '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        last: "Last Page",
      },
    },
  };

  var document = {
    html: html,
    data: {
      plan: reportData.plan,
      points: reportData.points,
      tasksMarks: reportData.tasksMarks,
    },
    path: outputPath,
    type: "",
  };
  // npm link phantomjs-prebuilt
  // ? npm link html-pdf

  await pdf.create(document, options);

  return outputPath;
};
