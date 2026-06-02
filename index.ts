import { Temporal } from "@js-temporal/polyfill";
import {Student, isStudent, parseStudent} from "./models/student.model";
import { AssessmentItem, calculateGrade } from "./models/assessment.model";
import { EnrollmentStatus, describeEnrollment } from "./models/enrollment.model";
import { Course, CourseStatus, describeCourseStatus } from "./models/course.model";
import { ApiResponse, renderResponse } from "./models/api-response.model";
const student: Student = {
    id: "STU-001",
    name: "Hana Tadesse",
    enrollmentDate: Temporal.Now.instant(),
};
//student.id = "STU-999"; // Error: Cannot assign to 'id' because it is a read-only property.
// console.log(student.gpa.toFixed(2)); // Output: "NaN" (since gpa is undefined)
// console.log(student.gpa.toFixed(2) ?? "Not yet graded"); // Output: "Not yet graded"
function processStudent(raw: unknown) {
    if (isStudent(raw)) {
        const gpaDisplay = raw.gpa?.toExponential(2) ?? "Not yet graded";
        console.log(`Student ${raw.name} has a GPA of ${gpaDisplay}.`);
    }
    else {
        console.log("Invalid student data received.");
    }
}
processStudent({id: "STU-001", name: "Hana", gpa: 3.7}); 
processStudent(42);
console.log(parseStudent({id: "STU-001", name: "Hana"}));
// parseStudent({id: 42, name: "test"})
const quiz: AssessmentItem = {
    id: "QUIZ-001",
    kind: "quiz",
    title: "SQL Basics",
    correctAnswers: 8,
    totalQuestions: 10,
};
const lab: AssessmentItem = {
    id: "LAB-001",
    kind: "lab",
    title: "RAEST API Project",
    functionalityScore: 85,
    codeQualityScore: 90,
};
console.log(`Quiz grade: ${calculateGrade(quiz)}%`); // Output: "Quiz grade: 80%"
console.log(`Lab grade: ${calculateGrade(lab)}%`); // Output: "Lab grade: 87%"
// quiz.id = "QUIZ-002"; // Error: Cannot assign to 'id' because it is a read-only property.
const pending: EnrollmentStatus = {
    status: "PENDING",
    requestedAt: Temporal.Now.instant(),
    studentId: "STU-001",
    courseCode: "CRS-101",
};
console.log(describeEnrollment(pending));
const webDev: CourseStatus = {
    status: "ACTIVE",
    enrolledCount: 28,
    startDate: Temporal.PlainDate.from("2026-09-01"),
};
console.log(describeCourseStatus(webDev));
const studentRes: ApiResponse<Student> = {
    status: "success",
    data: {
        id: "STU-001",
        name: "Dawit Bekele",
        enrollmentDate: Temporal.Now.instant(),
        gpa: 3.4,
    },
    fetchedAt: Temporal.Now.instant(),
};
console.log(renderResponse(studentRes, (s) => `${s.name} (GPA: ${s.gpa ?? "N/A"})`));
//now tes with different data type
const courseListRes: ApiResponse<Course[]> = {
    status: "success",
    data: [
        {
            id: "CRS-101",
            title: "Web Development Fundamentals",
            capacity: 30,
            startDate: Temporal.PlainDate.from("2026-09-01"),
        },
    ],
    fetchedAt: Temporal.Now.instant(),
};
console.log(renderResponse(courseListRes, (courses) => courses.map((c) => c.title).join(", ")));
const approvedAt = Temporal.Now.instant();
console.log(`Approved at (UTC): ${approvedAt}`);
// Display in local time zone
const addisTime = approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");
const londonTime = approvedAt.toZonedDateTimeISO("Europe/London");
console.log(`Addis: ${addisTime.toPlainTime()}`);
console.log(`London: ${londonTime.toPlainTime()}`);


const courseStart = Temporal.PlainDate.from("2026-09-01");
const today = Temporal.Now.plainDateISO();
const daysUntilStart = today.until(courseStart).total({ unit: "days" });
console.log(`${Math.floor(daysUntilStart)} days until course starts`);

const deadline = Temporal.PlainDate.from("2026-12-15");
const remaining = today.until(deadline);
console.log(
`${remaining.total({ unit: "days" })} days until assignment is due`,
);