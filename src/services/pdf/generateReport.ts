import pdf from "pdf-creator-node";
import * as fs from "fs";
import * as path from "path";
import getConfig from "next/config";

namespace Utils {
  const { serverRuntimeConfig } = getConfig();

  export const getTemplatePath = () => {
    const templatePath = path.join(
      serverRuntimeConfig.PROJECT_ROOT,
      "./src/services/pdf/template.html"
    );
    return templatePath;
  };

  export const getOutputPath = (planId) => {
    const outputPath = path.join(
      serverRuntimeConfig.PROJECT_ROOT,
      `./src/services/pdf/temp/${planId}.pdf`
    );
    return outputPath;
  };
}

export const generateReport = async ({ reportData, planId }) => {
  const templatePath = Utils.getTemplatePath(),
    outputPath = Utils.getOutputPath(planId);

  var html = fs.readFileSync(templatePath, "utf8");

  var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
      height: "45mm",
      contents: '<div style="text-align: center;">Автор: Нелли Гарбузова</div>',
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

  await pdf.create(document, options);

  return outputPath;
};
