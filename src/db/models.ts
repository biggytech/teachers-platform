import Teachers from "@db/teachers/Teachers";
import Students from "@db/students/Students";
import Programs from "@db/programs/Programs";
import Plans from "@db/plans/Plans";
import Points from "@db/points/Points";
import Materials from "@db/materials/Materials";

// Teachers
Teachers.hasMany(Students, { foreignKey: "teacher_id", as: "students" });
Teachers.hasMany(Programs, { foreignKey: "owner_id", as: "programs" });

// Students
Students.belongsTo(Teachers, { foreignKey: "teacher_id", as: "teacher" });
Students.hasMany(Plans, { foreignKey: "student_id", as: "plans" });

// Programs
Programs.belongsTo(Teachers, { foreignKey: "owner_id", as: "teacher" });
Programs.hasMany(Plans, { foreignKey: "program_id", as: "plans" });
Programs.hasMany(Materials, { foreignKey: "program_id", as: "materials" });
Programs.hasMany(Points, { foreignKey: "program_id", as: "points" });

// Plans
Plans.belongsTo(Students, { foreignKey: "student_id", as: "student" });
Plans.belongsTo(Programs, { foreignKey: "program_id", as: "program" });

// Materials
Materials.belongsTo(Programs, { foreignKey: "program_id", as: "program" });

// Points
Points.belongsTo(Programs, { foreignKey: "program_id", as: "program" });

export { Teachers, Students, Programs, Plans, Points, Materials };
