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

// initialise type for schedule
export type Schedule = {
   id: string;
   startDate: string;
   startTime: string;
   endDate: string;
   endTime: string;
   daysOfWeek: string;
   exclusionDates: string;
   sections: Section;
   name: string;
   externalId: string | null;
   venue: Venue;
   presenter: Presenter;
   guestPresenter: Presenter | null;
   shouldCaption: boolean;
   shouldStreamLive: boolean;
   shouldAutoPublish: boolean;
   shouldRecurCapture: boolean;
   input1: string;
   input2: string;
   captureQuality: string;
   streamQuality: string;
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

