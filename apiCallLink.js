const date = document.getElementById("date");

const params = new URLSearchParams(window.location.search);

date.setAttribute("value", params.get('date'));
if(date.value == '') {
    let todays_date = new Date();
    todays_date.setHours(todays_date.getHours()-5);
    const the_date = todays_date.toISOString().split('T')[0];
    date.setAttribute('value', the_date);
}

let facilityName = params.get('SelectedFacility');

document.getElementById('SelectedFacility').selectedIndex = document.querySelector("option[value='" + facilityName + "']").index
let facilityId = document.querySelector("option[value='" + facilityName + "']").getAttribute('name');
const current_date_value = date.getAttribute('value');
let split = current_date_value.split('-');
const tomorrow_date_based_on_current_value = new Date(parseInt(split[0]), parseInt(split[1] - 1), parseInt(split[2]) + 1, 0,0,0,0).toISOString().split('T')[0];
console.log("Showing results from " + current_date_value + " to " + tomorrow_date_based_on_current_value);

const apiCallLink = `https://warrior.uwaterloo.ca/Facility/GetScheduleCustomAppointments?selectedId=${facilityId}&start=${current_date_value}T00%3A00%3A00-04%3A00&end=${tomorrow_date_based_on_current_value}T00%3A00%3A00-04%3A00`

async function getScheduleData() {
    try {
        let res = await fetch(apiCallLink);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderScheduleData() {
    let schedule = await getScheduleData();
    let html = '';
    schedule.forEach(scheduleElement => {
        let startingDate = new Date(scheduleElement.start);
        let endingDate = new Date(scheduleElement.end)
        let htmlSegment = 
        `
        <p> <b>${scheduleElement.title}</b>: 
           <br>  Start: ${startingDate.toLocaleString()}
           <br> End: ${endingDate.toLocaleString()} </p>
        
        `
        ;
        html += htmlSegment;
    });

    let container = document.querySelector('.scheduleData');
    container.innerHTML = html;
}

renderScheduleData();

