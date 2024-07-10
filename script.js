const sunButton = document.querySelector('.sun-button');
const moonButton = document.querySelector('.moon-button');
const instagram = document.querySelector(".instagram");
const github = document.querySelector(".github");
const whatsapp = document.querySelector(".whatsapp");
const addBtu = document.querySelector(".add");
// ------------------------------------------------

const eventName = document.querySelector(".event-name");
const eventOrganizer = document.querySelector(".organizer-name");
const eventDate = document.querySelector(".event-date");

// ------------------------------------------
// Start Change the light of the website 
const body = document.body;
moonButton.addEventListener("click", ()=> {
    moonButton.style.display = "none"
    body.classList.add('dark-mode');
    sunButton.style.display = 'block';
    body.classList.remove("light-mode");
})

sunButton.addEventListener("click", ()=> {
    sunButton.style.display = "none";
    body.classList.add("light-mode");
    moonButton.style.display = 'block';
    body.classList.remove("dark-mode")
})
// End Change the light of the website 

// --------------------------------------

// About social media 
// Go to instagram
instagram.addEventListener("click", ()=> {
    const link = "https://www.instagram.com/mustafakobesy/";
    window.open(link, "_blank")
})

// Go to github 
github.addEventListener("click" , ()=> {
    const link = "https://github.com/Kobesy0"
    window.open(link , "_blank")
})

// Go to whatsapp
whatsapp.addEventListener("click", ()=> {
    const message = "Hello Mostafa"
    const link = `https://wa.me/01152274612?text=${message}!`;
    window.open(link , "_blank")
})
// End social media 
// -----------------------------------------


// Make Add Event Function
let currentEditIndex = null;

function addevent() {
    // Get the values front the inputs and remove the Distances 
    const eventNameValue = eventName.value.trim();
    const eventDateValue = eventDate.value.trim();
    const eventOrganizerValue = eventOrganizer.value.trim();
    
    // make sure that each input has a value
    let isValid = true;
    
    if (!eventNameValue) {
        document.querySelector('.eventNameError').textContent = "Please fill out this field.";
        isValid = false;
    } else {
        document.querySelector('.eventNameError').textContent = "";
    }

    if (!eventOrganizerValue) {
        document.querySelector('.eventOrganizerError').textContent = "Please fill out this field.";
        isValid = false;
    } else {
        document.querySelector('.eventOrganizerError').textContent = "";
    }
    if (!eventDateValue) {
        document.querySelector('.eventDateError').textContent = "Please fill out this field.";
        isValid = false;
    } else {
        document.querySelector('.eventDateError').textContent = "";
    }
    
    if (!isValid) {
        return;
    }

    const eventTimeStamp = new Date(eventDateValue).getTime();

    const event = {
        name: eventNameValue,
        date: eventDateValue,
        organizer: eventOrganizerValue,
        timeStamp: eventTimeStamp,
    }

    const events = JSON.parse(localStorage.getItem('events')) || [];

    if (currentEditIndex !== null) {
        // Edit the current event
        events[currentEditIndex] = event;
        currentEditIndex = null;
    } else {
        // Add new event 
        events.push(event);
    }

    localStorage.setItem("events", JSON.stringify(events));
    
    // Remove the fileds after Add of Edit the Event-Card
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => { input.value = '' });
    
    displayEvent();
}
addBtu.addEventListener("click", addevent);

function getMinDate(){
    let  today = new Date().toISOString().split("T")[0];
    let eventDate = document.querySelector(".event-date");
    eventDate.setAttribute("min", today);
    
    eventDate.addEventListener("input", ()=> {
        if(eventDate.value < today){
            eventDate.value = today
        }
    })
}
getMinDate()

// function to show the card evnet 
function displayEvent(){
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let eventsList = document.querySelector(".events");
    eventsList.innerHTML = '';
    events.forEach((event,index)=>{
        const now = new Date().getTime();
        const timeLeft = event.timeStamp - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        const hours = Math.floor(timeLeft % (1000 * 60 *60 * 24) / (1000 * 60 * 60 ));
        const minutes = Math.floor(timeLeft % (1000 * 60 * 60) / (1000 * 60));
        const seconds = Math.floor(timeLeft % (1000 * 60) / (1000))
        const downCount = `${days}D ${hours}H ${minutes}M ${seconds}S` 
        
        eventsList.innerHTML += `
        <div class="event">
        <div class="event2">
        <h3>${event.name}</h3>
        <p><span>By</span> ${event.organizer}</p>
        <p><span>On</span> ${event.date}</p>
        <p><span>Time Left</span> ${downCount}</p>
        <div class="buttons"><button title="Edit" onclick="editEvent(${index})" class="edit"><i class="fa-solid fa-edit"></i></button>
        <button title="Delete" onclick="deleteEvent(${index})" class="delete"><i class="fa-solid fa-trash"></i></button></div>
        </div>
        </div>`;
    });
}
displayEvent(); 
// Edit Event function
function editEvent(index) {
    const events = JSON.parse(localStorage.getItem("events"));
    const event = events[index];
    
    // Fill the fields with the current values ​​of the event
    eventName.value = event.name;
    eventOrganizer.value = event.organizer;
    eventDate.value = event.date;
    
    // Store the current index for modification
    currentEditIndex = index;
}

// Delete Evetn Function
function deleteEvent(index){
    const events = JSON.parse(localStorage.getItem("events"));
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    displayEvent();
}
setInterval(() => {displayEvent()}, 1000);