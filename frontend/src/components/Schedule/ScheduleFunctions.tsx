import { toast } from '@/@/hooks/use-toast';
import axios, { AxiosResponse } from 'axios';
import { baseUrl, client, headers } from "../../lib/utils";
import type { Availability, Building, Campus, Course, DropdownItems, Headers, Inputs, ListRequest, Room, Schedule, SchedulePresenter, ScheduleSection, Section, User, Venue, Year } from '../../types';
import { formSchema } from './ScheduleUtils';

//Function to get course information
export async function getCourse(courseId: string, baseUrl: string, header: Headers): Promise<Course> {
   // make a call to course service in echo api
   const client = axios.create({
      baseURL: baseUrl,
   });

   // 
   const course = await client.get(`/courses/${courseId}`, header)
                              .then(function (response) {           
                                 const data = response.data;
                                 return data;
                              })
                              .catch(function (error) {
                                 console.log(error);
                              })
   return course;
}
// get rooms for form dropdown
// async call to populate dropdown list from api
export async function getRooms(): Promise<DropdownItems[]> {
   try {
      const searchResponse: AxiosResponse = await client.get(`/rooms`, headers);
      // convert response to array of dropdown items
      const foundRooms: Room[] = Object.values(searchResponse.data['data']);

      //map to state for dropdown menu
      const mapped: DropdownItems[] = foundRooms.map((item) => {
         return {
            value: item.id,
            label: item.name,
         }
      });
      return mapped;
   } catch(err) {
      throw new Error('Failed to fetch rooms ' + err);
   }
};

// get years for form dropdown
// call to get academic year / term data from echo API for dropdown
export async function getYears(): Promise<DropdownItems[]> {
   try {
      const searchResponse: AxiosResponse = await client.get(`/terms`, headers);
      // convert response to array of dropdown items
      const foundYears: Year[] = Object.values(searchResponse.data['data']);

      //map to state for dropdown menu
      const mapped: DropdownItems[] = foundYears.map((item) => {
         return {
            value: item.id,
            label: item.name,
         }
      });
      return mapped;
   } catch(err) {
      throw new Error('Failed to fetch years ' + err);
   }
};

// get sections for form dropdown
// get sections async call to backend api
export async function getSections(academicYear: string) {
   try {
      const searchResponse: AxiosResponse = await client.get(`/sections/year/${academicYear}`, headers);
      // convert section array to type dropdownItems array from response data object
      const foundSections: Section[] = Object.values(searchResponse.data['data']);

      // map sections to state for dropdown menu
      const mapped = foundSections.map((item) => {
         return {
            value: item.id,
            label: item.sectionNumber,
         }
      });
      return mapped;
   } catch(err) {
      throw new Error('Failed to fetch sections ' + err);
      
   }
};

// get users for presenter dropdown
// get sections async call to backend api
export async function getUsers(): Promise<DropdownItems[]> {
   try {
      const searchResponse: AxiosResponse = await client.get(`/users`, headers);
         // convert section array to type dropdownItems array from response data object
         const foundUser: User[] = Object.values(searchResponse.data['data']);

         // map User to state for dropdown menu
         const mapped: DropdownItems[] = foundUser.map((item) => {
         return {
            value: item.id,
               label: item.firstName + " " + item.lastName,
            }
         });
         return mapped;
      } catch(err) {
         console.log(err);
         throw new Error('Failed to fetch users ' + err);
      }
   };

//Function to get term / year information
export async function getTerm(termId: string, baseUrl: string, header: Headers ): Promise<Year> {
      // make a call to term service in echo api
      const client = axios.create({
         baseURL: baseUrl,
      });

      // 
      const term = await client.get(`/terms/${termId}`, header)
                                 .then(function (response) {
                                    const data = response.data;
                                    return data;
                                 })
                                 .catch(function (error) {
                                    console.log(error);
                                 })
      return term;
}
// Function to get sections 
export async function getSection(sectionId: string, baseUrl: string, header: Headers  ): Promise<ScheduleSection> {
   // make a call to section service in echo api
   const client = axios.create({
      baseURL: baseUrl,
   });

   // TODO use section data to return a ScheduleSection object
   const section = await client.get(`/sections/${sectionId}`, header)
                              .then(async function (response) {

                                 const data = response.data;
                                 return data;
                              })
                              .catch(function (error) {
                                 console.log(error);
                              });

   // const availability = [getAvailability(data.availability, data.availability_date, data.start_date)];
   // dummy data to test functionality
   const availability: Availability = {
      "availability": "Immediate",
      "relativeDelay": 0,
      "concreteTime": null,
      "unavailabilityDelay": 0
      };

   const course = await getCourse(section.courseId, baseUrl, header);
   const term = await getTerm(section.termId, baseUrl, header);
   const scheduleSection: ScheduleSection = {
      "courseId": section.courseId,
      "courseIdentifier": course.courseIdentifier,
      "courseExternalId": course.externalId,
      "termId": term.id,
      "termName": term.name,
      "termExternalId": term.externalId,
      "sectionId": section.id,
      "sectionName": section.sectionNumber,
      "sectionExternalId": section.externalId,
      "availability": availability,
   };

   return scheduleSection;
}

// Function to return the list of scheduled recordings from Echo360 API
export async function getSchedules(baseUrl: string, header: Headers): Promise<ListRequest<Schedule>> {
   
   // make a call to section service in echo api
   const client = axios.create({
      baseURL: baseUrl,
   });

   try {
      // call backend
      const axiosGet: AxiosResponse<ListRequest<Schedule>> = await client.get(`/schedules`, header);

      //  convert response to array of schedules and return
      const scheduleData: ListRequest<Schedule> = axiosGet.data;
      return scheduleData;
   } catch(err) {
      throw new Error('Error: failed to get list of scheduled recordings' + err);
      
   }

}

// Function to get venue
export async function getVenue(roomId: string, baseUrl: string, header: Headers): Promise<Venue> {
   // make a series of calls to get venue information - then build Venue object
   const room: Room = await getRoom(roomId, baseUrl, header);
   const building: Building = await getBuilding(room.buildingId, baseUrl, header);
   const campus: Campus = await getCampus(building.campusId, baseUrl, header);

   const venue: Venue = {
      buildingExternalId: building.externalId,
      buildingId: building.id,
      buildingName: building.name,
      campusExternalId: campus.externalId,
      campusId: campus.id,
      campusName: campus.name,
      roomExternalId: room.externalId,
      roomId: room.id,
      roomName: room.name,
   };
   return venue;

}

// Function to destructure inputs and return string values for input 1 and input 2
export function getInputs(input: string): Inputs {
   let input1 = null;
   let input2 = null;

   if (input == "[ADV] Audio/Display-1/Display-2") {
      input1 = "Display";
      input2 = "Video";
   }
   if (input == "[AV] Audio/Display-1") {
      input1 = "Video";
   }
   if (input == "[AD] Audio/Display-2") {
      input1 = "Display";
   }

   const inputs = {
      input1: input1,
      input2: input2,
   }
   return inputs;
}

// Function to get room info for getVenue call
export async function getRoom(roomId: string, baseUrl: string, header: Headers): Promise<Room> {
   const client = axios.create({
      baseURL: baseUrl,
   });



   const room = await client.get(`/rooms/${roomId}`, header)
                           .then(async function (response) {
                              const data = response.data;
                              return data;
                           })
                           .catch(function (error) {
                              console.log(error);
                           });
   return room;
}
// Function to get building info for getVenue call
export async function getBuilding(buildingId: string, baseUrl: string, header: Headers): Promise<Building> {
   const client = axios.create({
      baseURL: baseUrl,
   });


   const building = await client.get(`/buildings/${buildingId}`, header)
                           .then(async function (response) {
                              const data = response.data;
                              return data;
                           })
                           .catch(function (error) {
                              console.log(error);
                           });
   return building;
}
// Function to get campus info for getVenue call
export async function getCampus(campusId: string, baseUrl: string, header: Headers): Promise<Campus> {
   const client = axios.create({
      baseURL: baseUrl,
   });

   const campus = await client.get(`/campuses/${campusId}`, header)
                           .then(async function (response) {
                              const data = response.data;
                              return data;
                           })
                           .catch(function (error) {
                              throw new Error(error);
                           });
   return campus;
}

// Function to get presenter
export async function getPresenter(presenterId: string, baseUrl: string, header: Headers): Promise<SchedulePresenter> {
   const client = axios.create({
      baseURL: baseUrl,
   });

   const presenter = await client.get(`/users/${presenterId}`, header)
                           .then(async function (response) {
                              const data = response.data;
                              const schedulePresenter: SchedulePresenter = {
                                 fullName: data.firstName + " " + data.lastName,
                                 userEmail: data.email,
                                 userExternalId: data.externalId,
                                 userId: data.id,
                              }
                              return schedulePresenter;
                           })
                           .catch(function (error) {
                              
                              throw new Error(error);
                           });
   return presenter;
}



// Function to get date difference in days
export function getDateDifferenceInDays(date1: Date, date2: Date): number {
   // calculate the difference in milliseconds
   const differenceInMilliseconds = Math.abs(date1.getTime() - date2.getTime());

   // convert milliseconds to days
   const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
   return Math.floor(differenceInDays);
}

// function to create an array of set integers - for occasions dropdown
export const getRange = (max: number) => {
   const array = [];
   for (let i = 1;  i <= max; i++) {
      array.push(i);
   }
   return array;
}

export const subtractOneDayFromDate = () => {
   // A function to subtract one day from the current result of 'new Date()'
   // This is for the date setter in the form, to allow users to book in recordings on the same day
   // Here the date is rendered in milliseconds - 1 represents the day amount
   const date = new Date();
   const yesterday = date.getTime() - (1 * 24 * 60 * 60 * 1000);
   date.setTime(yesterday);
   return date;

}

export function removeSeconds(time: string): string {
   // split the string at colon character
   const timeElements = time.split(':');
   // Take the HH and MM and join them with a colon
   return timeElements.slice(0,2).join(':');
}

// function to format Date object and return string in "YYYY-MM-DD" format
export function convertDateToDateString(date: Date): string {

   const year = date.getFullYear();
   // padStart returns a double digit string - ie, January = '01'
   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1 to number
   const day = String(date.getDate()).padStart(2, '0');

   return `${year}-${month}-${day}`;
}

export function convertCaptureQuality(captureQuality: string) {
   let qualityString: string = "High";
   if (captureQuality == "Medium Quality") {
      qualityString = "Medium";
   }
   return qualityString;
}

// // Toast setup for form submission response
// const { toast } = useToast();

// a function to send the form data to create a new scheduled recording on echo360
export const createSchedule = async (data: z.infer < typeof formSchema > ) => {
   // console.log("-----createSchedule called--------");

   const section: ScheduleSection = await getSection(data.section, baseUrl, headers);
   const venue: Venue = await getVenue(data.room, baseUrl, headers);
   const presenter: SchedulePresenter = await getPresenter(data.presenter, baseUrl, headers);
   const startDate: string = convertDateToDateString(data.start_date);
   const startTime: string = removeSeconds(data.start_time);
   const endTime: string = removeSeconds(data.end_time);
   const inputs: Inputs = getInputs(data.input);
   const captureQuality: string = convertCaptureQuality(data.capture_quality);
   const dataBody = {
            "startTime": startTime,
            "startDate": startDate,
            "endTime": endTime,
            "sections": [section],
            "name": data.recording_title,
            "venue": venue,
            "presenter": presenter,
            "input1": inputs.input1,
            "input2": inputs.input2,
            "captureQuality": captureQuality,
            "shouldStreamLive": data.live_stream_toggle,
         };

   console.log(dataBody); 
   const request: AxiosResponse = await client.post(`/schedules/create`, dataBody, headers)
                                                .then(function (response) {
                                                   // convert 201 status to success if response is successful
                                                   const status = response.status == 201 ? "Success!" : response.status;
                                                   toast({
                                                      title: `Form submission status: ${status}`,
                                                      description: `${dataBody.name} - ${dataBody.startDate} - ${dataBody.startTime} - ${dataBody.endTime}`,
                                                      variant: "success"
                                                   })
                                                })
                                                .catch(function (error) {
                                                   console.log(error);
                                                   // convert 400 status to failed if response is unsuccessful
                                                   const status = error.status == 400 ? "Failed" : error.status;
                                                   toast({
                                                      title: `Form submission status: ${status}`,
                                                      description: `${error.code}: ${error.message}`,
                                                      variant: "destructive"
                                                   })
                                                });
   return request;
   
};