// Zod Form Schema and Type initialisation for form
// master type for dropdown item mapping
export type DropdownItems = {
   value: string;
   label: string;
}

// Headers type for api key
export type Headers = {
   headers: {
      [key:string]: string;
   };
}

// Export listRequest from echo api
export interface ListRequest<T extends Identifiable> {
   data: T[]; // Array of objects of type T
   has_more: boolean;
   next: string | null;
}

// extend T to identifiable to make sure that T is restricted to a set type/object
interface Identifiable {
   id: string;
}

// Schedule class interface
export interface Schedule {
   captureQuality: string;               // Identifies the quality for the generated capture(s)
   daysOfWeek?: string[];                // (Optional) Days of the week on which recurring captures occur
   endDate?: string;                     // (Optional) The last date for the capture, in ISO 8601 format
   endTime: string;                      // End time for the capture (to the minute) in ISO 8601 Time format
   exclusionDates?: string[];            // (Optional) Dates on which captures will NOT occur
   externalId?: string | null;           // (Optional) User-provided ID for this Schedule
   guestPresenter?: string;              // (Optional) Name of any Guest Presenter
   id: string;                           // System identifier for the schedule
   input1: string;                       // Identifies the input being used as the primary visual input
   input2: string;                       // Identifies the input being used as the secondary visual input
   name?: string;                        // (Optional) Name for the capture(s)
   presenter?: SchedulePresenter;        // (Optional) The Presenter details for the Schedule
   sections?: ScheduleSection[];         // (Optional) Publish to multiple sections
   shouldAutoPublish?: boolean;          // (Optional) Whether the capture(s) should auto-publish
   shouldCaption?: boolean;              // (Optional) Whether to send the capture(s) for closed captioning
   shouldRecurCapture?: boolean;         // (Optional) Whether the capture(s) are recurring
   shouldStreamLive?: boolean;           // (Optional) Whether the capture(s) are streamed live
   startDate?: string;                   // (Optional) Start date for the capture in ISO 8601 Date format
   startTime: string;                    // Start time for the capture (to the minute) in ISO 8601 Time format
   streamQuality: string;                // Identifies the quality for the live stream
   venue: Venue;                 // The Venue object containing details of where the Schedule will capture
 }

 // // initialise type for schedule - CHANGED TO INTERFRACE LINKED ABOVE
// export type Schedule = {
//    id: string;
//    startDate: string;
//    startTime: string;
//    endDate: string | null;
//    endTime: string;
//    daysOfWeek: string | null;
//    exclusionDates: string | null;
//    sections: Section;
//    name: string;
//    externalId: string | null;
//    venue: Venue;
//    presenter: Presenter;
//    guestPresenter: Presenter | null;
//    shouldCaption: boolean;
//    shouldStreamLive: boolean;
//    shouldAutoPublish: boolean;
//    shouldRecurCapture: boolean;
//    input1: string;
//    input2: string | null;
//    captureQuality: string;
//    streamQuality: string | null;
// }

// Course type
export type Course = {
   courseIdentifier: string;
   departmentId: string;
   externalId: string;
   id: string;
   name: string;
   organizationId: string;
   sectionCount: number;
}

// Building type
export type Building = {
   campusId: string;
   externalId: string;
   id: string;
   name: string;
}

// Campus type
export type Campus = {
   externalId: string;
   id: string;
   name: string;
   timeZone: string;
   timeZoneOffsetMinutes: number;
}

export type Inputs = {
   input1: string | null;
   input2: string | null;
}

// user type is referenced as 'presenter' on the form.
export type User = {
   id: string;
   email: string;
   externalId: string;
   timeZone: string;
   timeZoneOffsetMinutes: number;
   firstName: string;
   lastName: string;
   phoneNumber: string | null;
   profileImageUrl: string | null;
   roles: string[];
   ssoId: string | null;
}

// initialise type pulled from api for rooms
export type Room = {
   id: string;
   buildingId: string;
   name: string;
   externalId: string | null;
   roomConfigurationId: string;
   deviceId: string;
   deviceType: string;
   deviceSoftwareVersion: string | null;
   createdAt: string;
   updatedAt: string;
}

// initialise type pulled from api for year - referred to in the echo360Api as class Term
export type Year = {
   id: string;
   name: string;
   externalId: string;
   session: Session[];
   exceptions: [];
   sectionCount: number;
}

export type Session = {
   startDate: string;
   endDate: string;
}

// initialise type pulled from api for section
export type Section = {
   id: string;
   courseId: string;
   courseExternalId: string | null;
   termId: string;
   termName: string | null;
   termExternalId: string | null;
   sectionId: string;
   sectionName: string;
   sectionExternalId: string | null;
   availability: Availability[] | null
   scheduleIds: string[] | null;
   sectionNumber: string | null;
   externalId: string | null;
   instructorId: string | null;
   description: string | null;
   lessonCount: number | null;
   userCount: string | null;
   secondaryInstructorIds: string[] | null;
   lmsCourseIds: string[] | null;
   lmsCourses: string[] | null;
}
export type ScheduleSection = {
   courseId: string;
   courseIdentifier: string;
   courseExternalId: string | null;
   termId: string;
   termName: string | null;
   termExternalId: string | null;
   sectionId: string;
   sectionName: string;
   sectionExternalId: string | null;
   availability: Availability | null
}

export type Availability = {
   availability: string;
   relativeDelay: number;
   concreteTime: string | null;
   unavailabilityDelay: number;
}


export type Venue = {
   campusId: string;
   campusName: string;
   campusExternalId: string | null;
   buildingId: string;
   buildingName: string;
   buildingExternalId: string | null;
   roomId: string;
   roomName: string;
   roomExternalId: string | null;
}

export type Presenter = {
   userId: string;
   userEmail: string;
   fullName: string | null;
   userExternalId: string | null;
}

export type SchedulePresenter = {
   fullName: string,
   userEmail: string,
   userExternalId: string | null,
   userId: string,
}

