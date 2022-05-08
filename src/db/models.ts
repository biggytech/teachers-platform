import Teachers from "@db/teachers/Teachers";
import Students from "@db/students/Students";
import Programs from "@db/programs/Programs";
import Plans from "@db/plans/Plans";
import Points from "@db/points/Points";
import Materials from "@db/materials/Materials";
import Tasks from "@db/tasks/Tasks";
import TasksPoints from "@db/tasks_points/TasksPoints";
import TaskMarks from "@db/task_marks/TaskMarks";

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
Plans.hasMany(TaskMarks, { foreignKey: "plan_id", as: "taskMarks" });

// Materials
Materials.belongsTo(Programs, { foreignKey: "program_id", as: "program" });

// Points
Points.belongsTo(Programs, { foreignKey: "program_id", as: "program" });
Points.belongsToMany(Tasks, { through: TasksPoints, foreignKey: 'point_id', as: 'tasks' });

// Tasks
Tasks.belongsToMany(Points, { through: TasksPoints, foreignKey: 'task_id', as: 'points' });
Tasks.hasMany(TaskMarks, { foreignKey: "task_id", as: "taskMarks" });

// TasksPoints

// TaskMarks
TaskMarks.belongsTo(Tasks, { foreignKey: "task_id", as: "task" });
TaskMarks.belongsTo(Plans, { foreignKey: "plan_id", as: "plan" });

export { Teachers, Students, Programs, Plans, Points, Materials, Tasks, TasksPoints, TaskMarks };
