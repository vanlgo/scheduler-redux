# Interview Scheduler (Redux)

## Intro

A React App that allows a user to book, cancel, and peruse interviews. This simple application allows users to cycle through a set of days to seek out the appropriate interview time slot to book—or if need be—delete an unneeded appointment.

This is a front-end only app designed to illustrate the single page capabilities of the React framework, as well as sufficient understanding of api calls.

This app requires the companion [api server](https://github.com/vanlgo/scheduler-api). 

## What You Are Initially Greeted with

![Initial Example](https://github.com/vanlgo/scheduler-redux/blob/master/public/images/Screenshot%20from%202022-04-03%2005-02-00.png)
- User is immediate shown a simple app that can be navigated through the week for time slots

![Chooseing a different day](https://github.com/vanlgo/scheduler-redux/blob/master/public/images/Screenshot%20from%202022-04-03%2005-02-29.png)
- Cycle through five different days to see the interview schedule each day
- Choose between five time slots from 12pm - 4pm to book an interview


## Adding A New Appointment

![Adding a new Appointment](https://github.com/vanlgo/scheduler-redux/blob/master/public/images/Screenshot%20from%202022-04-03%2005-02-09.png)
- Add the student's name and choose between current available interviewers for that date

![New Appointment Saved](https://github.com/vanlgo/scheduler-redux/blob/master/public/images/Screenshot%20from%202022-04-03%2005-02-14.png)
- Once saved, the new appointment is added to the time slot display

## Deleting An Unwanted Appointment

![Appointment deletion requesting confirmation](https://github.com/vanlgo/scheduler-redux/blob/master/public/images/Screenshot%20from%202022-04-03%2005-02-22.png)
- Delete unwanted appointments easily
- Application will prompt to confirm decision—making sure the decision is not accident