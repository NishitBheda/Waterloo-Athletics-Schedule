const params = new URLSearchParams(window.location.search);
let date = document.getElementById("date");
date.setAttribute("value", params.get('date'));
let facilityName = params.get('SelectedFacility');

document.getElementById('SelectedFacility').selectedIndex = document.querySelector("option[value='" + facilityName + "']").index
let facilityId = document.querySelector("option[value='" + facilityName + "']").getAttribute('name');
const today = date.getAttribute('value');
let split = today.split('-');
const universal_date_format_tomorrow = new Date(parseInt(split[0]), parseInt(split[1] - 1), parseInt(split[2]) + 1, 0,0,0,0);
const tomorrow = universal_date_format_tomorrow.toISOString().split('T')[0];
console.log("Showing results from " + today + " to " + tomorrow);

const apiCallLink = `https://warrior.uwaterloo.ca/Facility/GetScheduleCustomAppointments?selectedId=${facilityId}&start=${today}T00%3A00%3A00-04%3A00&end=${tomorrow}T00%3A00%3A00-04%3A00`

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

// let scheduleData = callApi(apiCallLink);

// async function callApi(url) {
//     await fetch(url)
//         .then( response => response.json() )
//         .then( data => {
//             console.log(data)
//             return data;
//         });
// }
// // console.log(scheduleData);

