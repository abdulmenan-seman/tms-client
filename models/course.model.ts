import {Temporal} from "@js-temporal/polyfill";

export interface Course {
    readonly id: string;
    title: string;
    capacity: number;
    startDate?: Temporal.PlainDate;
}
export type CourseStatus =
| {status: "DRAFT"; createdBy: string; createdAt: Temporal.Instant;}
| {status: "PUBLISHED"; publishedAt: Temporal.Instant; syllabus: string;}
|{ status: "ACTIVE"; enrolledCount: number; startDate: Temporal.PlainDate;}
| {status: "ARCHIVED"; archivedAt: Temporal.Instant; finalEnrollmentCount: number;}
| { status:"CANCELLED"; cancelledAt: Temporal.Instant; reason: string;};

export function describeCourseStatus(status: CourseStatus): string {
    switch(status.status){
        case "DRAFT":
            return `Course is in draft, created by ${status.createdBy}`;
        case "PUBLISHED":
            return `Course published on ${status.publishedAt}`;
        case "ACTIVE":
            return `Course is active with ${status.enrolledCount} students enrolled`;
        case "ARCHIVED":
            return `Course archived on ${status.archivedAt} with ${status.finalEnrollmentCount} total enrollments`;
        case "CANCELLED":
            return `Course cancelled on ${status.cancelledAt} with reason: ${status.reason}`;
        default:
            const _check: never = status;
            throw new Error(`Unhandled status: ${JSON.stringify(_check)}`);
    }
}