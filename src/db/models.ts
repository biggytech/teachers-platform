import Teachers from "@db/teachers/Teachers";
import Students from "@db/students/Students";
import Programs from "@db/programs/Programs";
import Plans from "@db/plans/Plans";
import Points from "@db/points/Points";
import Materials from "@db/materials/Materials";
import Tasks from "@db/tasks/Tasks";
import TasksPoints from "@db/tasks_points/TasksPoints";
import TaskMarks from "@db/task_marks/TaskMarks";
import Tests from "@db/tests/Tests";
import TestsPoints from "@db/tests_points/TestsPoints";
import Questions from "@db/questions/Questions";
import Answers from "@db/answers/Answers";

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
Points.belongsToMany(Tests, { through: TestsPoints, foreignKey: 'point_id', as: 'tests' });

// Tasks
Tasks.belongsToMany(Points, { through: TasksPoints, foreignKey: 'task_id', as: 'points' });
Tasks.hasMany(TaskMarks, { foreignKey: "task_id", as: "taskMarks" });

// TasksPoints

// TaskMarks
TaskMarks.belongsTo(Tasks, { foreignKey: "task_id", as: "task" });
TaskMarks.belongsTo(Plans, { foreignKey: "plan_id", as: "plan" });

// Tests
Tests.belongsToMany(Points, { through: TestsPoints, foreignKey: 'test_id', as: 'points' });
Tests.hasMany(Questions, { foreignKey: "test_id", as: "questions" });

// TestsPoints

// Questions
Questions.belongsTo(Tests, { foreignKey: "test_id", as: "test" });
Questions.hasMany(Answers, { foreignKey: "question_id", as: "answers" });

// Answers
Answers.belongsTo(Questions, { foreignKey: "question_id", as: "question" });

export { Teachers, Students, Programs, Plans, Points, Materials, Tasks, TasksPoints, TaskMarks, Tests, TestsPoints, Questions, Answers };
