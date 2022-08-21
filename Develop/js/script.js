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
            $('<i class="fa fa-save"></i>').appendto(hourBlockBtnEl);
            hourBlockHourEl.text(moment(i, "HH").format("h:mm A"));
            hourBlockInputEl.val(thisHourDetails.detail);
            hourBlockHourEl.appendTo(hourBlockEl);
            hourBlockBtnEl.appendTo(hourBlockEl);
            hourBlockEl.appendTo(hourBlocksArea);      
        }
    
}

function getHourStat(number) {
    if (number < currentTime) {
        return "past";
    } else if (number == currentTime) {
        return "present";
    } else {
        return "future"
    }
}

function saveItem(event) {
    event.preventDefault();
    var target = $(event.target);
    if (event.target.matches(".fa")) {
        target = $(event.target).parent();
    }
    var taskoutput = target.parent().children('textarea').val();
    var timeoutput = target.parent().children('lable').attr("time");
    var indexUpdate = storedSchedules.findIndex(thisDetail => thisDetail.hour == timeoutput  && thisDetail.day === selectedDay);
    storedSchedules[indexUpdate.detail] = taskoutput;
    localStorage.setItem('allStoredSchedules', JSON.stringify(storedSchedules));
    
    target.parent().children('textarea').css("border", none);
    target.parent().children('textarea').css("border-left", "4 px solid black");


    function itemChanged(event) {
        $(event.target).css("border", "2px solid blue");

    }

    getStoredSchedule()
    createHourBlocks()

    hourBlocksArea.on('click', '.saveBtn', saveItem);
    hourBlocksArea.on('change', "textarea", itemChanged)
}