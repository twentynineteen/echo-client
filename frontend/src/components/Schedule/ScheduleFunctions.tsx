import axios, { AxiosResponse } from 'axios';
import * as React from 'react';
import type { Availability, Presenter, ScheduleSection, Venue } from '../../types';

// Function to get sections 
export const getSection: ScheduleSection = async (sectionId: string, baseUrl: string, header: string ) => {
   // make a call to section service in echo api
   // Section section = section.get(sectionId)
   const client = axios.create({
      baseURL: baseUrl,
   });

   const config = {
      headers: {
         'X-API-KEY': header,
      }
   };

   const section: AxiosResponse<ScheduleSection> = await client.get(`/sections/${sectionId}`, config)
                                             .then(function (response) {
                                                console.log(response.status);
                                                const section: ScheduleSection = {
                                                   "name": response.data.name
                                                }
                                                return response.data;
                                             })
                                             .catch(function (error) {
                                                console.log(error);
                                             });
   return section;
   // return an array containing the section data
                  // {
               //    "courseId": "dc729433-4e65-4570-91f8-7685a448ed2f",
               //    "courseIdentifier": "WBSAPITEST",
               //    "courseExternalId": null,
               //    "termId": "ca144d8d-8650-4b18-bb52-2aa83641d770",
               //    "termName": "2024-25",
               //    "termExternalId": null,
               //    "sectionId": "86ba99b6-3a1b-49cc-8e15-5b7d4b0c68cc",
               //    "sectionName": "(2024/25) echo-client app streams",
               //    "sectionExternalId": null,
               //    "availability": {
               //       "availability": "Immediate",
               //       "relativeDelay": 0,
               //       "concreteTime": null,
               //       "unavailabilityDelay": 0
               //    }
               // }
}
// Function to get availability
export const getAvailability: Availability = (availability, availabilityDate) => {

}
// Function to get venue
export const getVenue: Venue = () => {

}
// Function to get presenter
export const getPresenter: Presenter = (presenterId) => {

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
