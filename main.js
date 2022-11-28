import AvailabilitiesEvent from './event.js'

const availabilitiesEvent = new AvailabilitiesEvent()
let startDate = new Date(2016,6,1,10,30); // July 1st, 10:30
let endDate = new Date(2016,6,1,14); // July 1st, 14:00

availabilitiesEvent.setAvailabilities({opening:true, recurring:true, startDate, endDate})
new AvailabilitiesEvent(true, true, startDate, endDate); // weekly recurring opening in calendar

startDate = new Date(2016,6,8,11,30); // July 8th 11:30
endDate = new Date(2016,6,8,12,30); // July 8th 12:30

availabilitiesEvent.setAvailabilities({opening:false, recurring:false, startDate, endDate})

let fromDate = new Date(2016,6,4,10);// July 4th 10:00
let toDate = new Date(2016,6,10,10);// July 10th 10:00

availabilitiesEvent.availabilities(fromDate, toDate);

fromDate = new Date(2016,6,9,10);// July 4th 10:00
toDate = new Date(2016,6,20,10);// July 10th 10:00

availabilitiesEvent.availabilities(fromDate, toDate);

/*
 * Answer should be : 
 * I'm available from July 8th, at 10:30, 11:00, 12:30, 13:00, and 13:30
 * I'm not available any other time !
 */