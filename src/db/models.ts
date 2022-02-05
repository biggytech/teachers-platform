import Teachers from "@db/teachers/Teachers";
import Students from "@db/students/Students";
import Programs from "@db/programs/Programs";
import Points from "@db/points/Points";

// Teachers
Teachers.hasMany(Students, { foreignKey: "teacher_id", as: "students" });
Teachers.hasMany(Programs, { foreignKey: "owner_id", as: "programs" });

// Students
Students.belongsTo(Teachers, { foreignKey: "teacher_id", as: "teacher" });

// Programs
Programs.belongsTo(Teachers, { foreignKey: "owner_id", as: "teacher" });

// Points

export { Teachers, Students, Programs, Points };
