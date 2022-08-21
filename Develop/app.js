var currentDayEl = $('currentDay')
var hourBlocksArea = $('hourBlocks')

var currentDay = moment().format('dddd, mmmm, Do, yyyy');
var currentTime = moment().format('H');
var selectedDay = moment().format('MM/DD/YY')
var storedSchedules = [];

currentDayEl.text(currentDay);

function getStoredSchedule() {
    storedSchedules = JSON.parse(localStorage.getItem("allStoredSchedules"));
    if (!storedSchedules) {
        storedSchedules = [];
        createdBlankSchedule();
    }
}

function createdBlankSchedule() {
    storedSchedules.push({day: selectedDay, hour:8, detail: "" })
    storedSchedules.push({day: selectedDay, hour:9, detail: "" })
    storedSchedules.push({day: selectedDay, hour:10, detail: "" })
    storedSchedules.push({day: selectedDay, hour:11, detail: "" })
    storedSchedules.push({day: selectedDay, hour:12, detail: "" })
    storedSchedules.push({day: selectedDay, hour:13, detail: "" })
    storedSchedules.push({day: selectedDay, hour:14, detail: "" })
    storedSchedules.push({day: selectedDay, hour:15, detail: "" })
    storedSchedules.push({day: selectedDay, hour:16, detail: "" })
    localStorage.setItem("allStoredSchedules", JSON.stringify(storedSchedules))
}

function createHourBlocks() {
    var todaySchedules = storedSchedules.filter(schedules => {
        return schedules.day == selectedDay});
        if(!todaySchedules) {
            createdBlankSchedule();
            return createdHourBlocks();
        };
        for (var i = 8; i < 17; i++) {
            var thisHourDetails = todaySchedules.find(hourDetails => hourDetails.hour === i)
            var state = getHourState(i)
            var hourBlockEl = $('<lable>', {
                class: "col-2 hour",
            });
            var hourBlockInputEl = $('<textarea>',{
                class: "col " + state,
                placeholder: "Nothing Scheduled"
            });
            var hourBlockBtnEl = $('<button>', {
                class: "col-1 saveBtn"
            });
            
        }
    
}