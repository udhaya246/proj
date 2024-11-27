document.addEventListener("DOMContentLoaded", function() {
    const eventForm = document.getElementById("event-form");
    const plannerTableBody = document.querySelector(".planner-table tbody");

    // Fetch existing events on page load
    fetch('/api/events')
        .then(response => response.json())
        .then(events => {
            events.forEach(event => addEventToTable(event));
        })
        .catch(error => console.error('Error fetching events:', error));

    eventForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const day = document.getElementById("day").value;
        const shift = document.getElementById("shift").value;
        const startTime = document.getElementById("start-time").value;
        const endTime = document.getElementById("end-time").value;
        const description = document.getElementById("description").value;
        const reminderTime = document.getElementById("reminder-time").value;

        const eventData = { day, shift, startTime, endTime, description, reminderTime };

        // Send data to the backend API
        fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        })
        .then(response => response.json())
        .then(newEvent => {
            addEventToTable(newEvent);
            eventForm.reset(); // Reset the form after submission
        })
        .catch(error => console.error('Error adding event:', error));
    });

    function addEventToTable(event) {
        const newRow = document.createElement("tr");

        const dayCell = document.createElement("td");
        dayCell.textContent = event.day;
        newRow.appendChild(dayCell);

        const shiftCell = document.createElement("td");
        shiftCell.textContent = event.shift;
        newRow.appendChild(shiftCell);

        const startTimeCell = document.createElement("td");
        startTimeCell.textContent = event.startTime;
        newRow.appendChild(startTimeCell);

        const endTimeCell = document.createElement("td");
        endTimeCell.textContent = event.endTime;
        newRow.appendChild(endTimeCell);

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = event.description;
        newRow.appendChild(descriptionCell);

        const reminderTimeCell = document.createElement("td");
        reminderTimeCell.textContent = event.reminderTime;
        newRow.appendChild(reminderTimeCell);

        plannerTableBody.appendChild(newRow);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/employees')
        .then(response => response.json())
        .then(employees => {
            const scheduleBody = document.getElementById('schedule-body');
            employees.forEach(employee => {
                const row = document.createElement('tr');
                
                const nameCell = document.createElement('td');
                nameCell.textContent = employee.name;
                row.appendChild(nameCell);
                
                employee.shifts.forEach(shift => {
                    const cell = document.createElement('td');
                    cell.textContent = shift;
                    row.appendChild(cell);
                });

                scheduleBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching employee schedules:', error));
});
document.getElementById('mark-attendance-btn').addEventListener('click', function () {
    const today = new Date().toLocaleDateString();
    const attendanceList = document.getElementById('attendance-history-list');
    const listItem = document.createElement('li');
    listItem.textContent = `Present on ${today}`;
    attendanceList.appendChild(listItem);
    alert('Attendance marked for today!');
});
document.getElementById('reschedule-btn').addEventListener('click', function () {
    const day = document.getElementById('shift-day').value;
    const time = document.getElementById('shift-time').value;
    const rescheduledList = document.getElementById('rescheduled-shift-list');

    if (day && time) {
        const listItem = document.createElement('li');
        listItem.textContent = `Shift Re-Scheduled to ${day} at ${time}`;
        rescheduledList.appendChild(listItem);
        alert('Shift Re-Scheduled Successfully!');
    } else {
        alert('Please select both date and time.');
    }
});
document.getElementById('apply-leave-btn').addEventListener('click', function () {
    const startDate = document.getElementById('leave-start').value;
    const endDate = document.getElementById('leave-end').value;
    const reason = document.getElementById('leave-reason').value;
    const leaveList = document.getElementById('leave-list');

    if (startDate && endDate && reason) {
        const listItem = document.createElement('li');
        listItem.textContent = `Leave from ${startDate} to ${endDate} for ${reason}`;
        leaveList.appendChild(listItem);
        alert('Leave Application Submitted!');
    } else {
        alert('Please fill all fields.');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    const eventTableBody = document.getElementById('eventTable').getElementsByTagName('tbody')[0];

    let events = [];

    // Function to add a new event to the event list
    function addEventToTable(event) {
        const row = eventTableBody.insertRow();

        // Insert cells for event details
        const eventNameCell = row.insertCell(0);
        const eventDateCell = row.insertCell(1);
        const eventTimeCell = row.insertCell(2);
        const eventLocationCell = row.insertCell(3);
        const actionCell = row.insertCell(4);

        eventNameCell.textContent = event.name;
        eventDateCell.textContent = event.date;
        eventTimeCell.textContent = event.time;
        eventLocationCell.textContent = event.location;

        // Add a delete button
        actionCell.innerHTML = `<button class="delete-btn">Delete</button>`;

        // Add event listener for delete button
        row.querySelector('.delete-btn').addEventListener('click', () => deleteEvent(row, event));
    }

    // Function to delete an event
    function deleteEvent(row, event) {
        if (confirm('Are you sure you want to delete this event?')) {
            row.remove();
            events = events.filter(e => e !== event);
        }
    }

    // Handle form submission to schedule a new event
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;
        const eventLocation = document.getElementById('eventLocation').value;

        const event = {
            name: eventName,
            date: eventDate,
            time: eventTime,
            location: eventLocation
        };

        // Add the event to the events array and update the table
        events.push(event);
        addEventToTable(event);

        // Clear the form inputs
        eventForm.reset();
    });
});
