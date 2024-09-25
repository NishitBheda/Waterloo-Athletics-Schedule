const basketball_facilities = {
    "CIF Gym 1": "a26cd06f-2f4e-4ec7-b946-0985984ba255",
    "CIF Gym 2": "bfddec09-d9a6-4915-8aac-f97b28f95d0d",
    "CIF Gym 3": "3df2fa09-2866-49e3-8526-6705450be265",
    "PAC Main Gym": "a3e9c00d-5aa7-45ea-ad73-f62c293856a8"
};

let apiCallLinks = [];
function updateApiCallLinks() {
    apiCallLinks = Object.values(basketball_facilities).map(facilityId => {
        return `https://warrior.uwaterloo.ca/Facility/GetScheduleCustomAppointments?selectedId=${facilityId}&start=${current_date_value}T00%3A00%3A00-04%3A00&end=${tomorrow_date_based_on_current_value}T00%3A00%3A00-04%3A00`
    })
}
updateApiCallLinks();

async function getBasketballTimes() {
    basketball_results = []
    for (const link of apiCallLinks) {
        const data = await getScheduleData(link);
        basketball_results.push(data);
    }
    renderBasketballData(basketball_results);
}

async function renderBasketballData(data) {
    let html = '';
    const facilities = Object.keys(basketball_facilities);
    data.forEach((facilitySchedule, facilityIndex) => {
        facilitySchedule.forEach(scheduleElement => {
            if(String(scheduleElement.title).toLocaleUpperCase().includes("OPEN REC BASKETBALL")) {
                let startingDate = new Date(scheduleElement.start);
                let endingDate = new Date(scheduleElement.end);
                let facilityName = facilities[facilityIndex];
                let htmlSegment = 
                `
                <p> <b>${facilityName} - Open Rec Basketball</b>:
                   <br>  Start: ${startingDate.toLocaleString()}
                   <br> End: ${endingDate.toLocaleString()} 
                </p>
                
                `
                ;
                html += htmlSegment;
            }
        });
    })

    let container = document.querySelector('.scheduleData');
    container.innerHTML = html;
}


