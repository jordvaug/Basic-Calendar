# About

The basic calendar is just that, an interactive calendar that allows you to
input events and allows your users to swipe through the calendar and select 
days. It outputs the id's of all events for the selected days so that you
can process that in whatever way you want.

See the calendar in action at:

www.vetexpeditions.com

<hr />

## Format
You should include google API's mat icon link in your index.html
<link type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

Basic Calendar *Input*:

- *events* (Array)
- *title*
- *iconPath*
- *Output function*

-Events is an array of objects that contain at a minimum: unique field 'id' and 'scheduled_Date' in for "year-month-day". 

-Title is also required and an optional 'iconPath' which is a link or path to an image displayed in the top right.

Basic Calendar *Output*:
id's using an event emitter when a day containing events is clicked. 

*This can be used to route to a page or popup a dialog containing those events on the parent.*


## Demo

https://stackblitz.com/edit/basic-calendar-demo
