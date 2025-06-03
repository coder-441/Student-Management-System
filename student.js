// Student Management System JavaScript

// Data Storage (Using arrays as simple database)
let students = [
    {
        id: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1-234-567-8901",
        grade: "Grade 10",
        address: "123 Main St, City, State"
    },
    {
        id: 2,
        name: "Emma Johnson",
        email: "emma.johnson@email.com",
        phone: "+1-345-678-9012",
        grade: "Grade 11",
        address: "456 Oak Ave, City, State"
    },
    {
        id: 3,
        name: "Michael Brown",
        email: "michael.brown@email.com",
        phone: "+1-456-789-0123",
        grade: "Grade 9",
        address: "789 Pine Rd, City, State"
    },
    {
        id: 3,
        name: "Rahul Pandey",
        email: "rahul.Pandey@email.com",
        phone: "+1-254-345-0568",
        grade: "Grade 12",
        address: "789 hola Rd, City, State"
    }
];

let attendance = [
    {
        id: 1,
        studentId: 1,
        date: "2023-05-15",
        status: "present"
    },
    {
        id: 2,
        studentId: 2,
        date: "2023-05-15",
        status: "present"
    },
    {
        id: 3,
        studentId: 3,
        date: "2023-05-15",
        status: "absent"
    },
    {
        id: 4,
        studentId: 4,
        date: "2023-05-15",
        status: "absent"
    }
];

let grades = [
    {
        id: 1,
        studentId: 1,
        subject: "Mathematics",
        grade: 85,
        date: "2023-05-10"
    },
    {
        id: 2,
        studentId: 1,
        subject: "Science",
        grade: 92,
        date: "2023-05-12"
    },
    {
        id: 3,
        studentId: 2,
        subject: "English",
        grade: 78,
        date: "2023-05-08"
    },
    {
        id: 4,
        studentId: 2,
        subject: "Geography",
        grade: 85,
        date: "2023-05-08"
    }
];

let messages = [
    {
        id: 1,
        recipientType: "students",
        subject: "Upcoming Exam",
        content: "Just a reminder about the upcoming Mathematics exam next week.",
        date: "2023-05-14T10:30:00"
    },
    {
        id: 2,
        recipientType: "parents",
        subject: "Parent-Teacher Meeting",
        content: "We would like to invite you to the parent-teacher meeting next Friday.",
        date: "2023-05-12T14:15:00"
    },
    {
        id: 3,
        recipientType: "students",
        subject: "Annual Sports Meet",
        content: "We would like to inform you that Annual Sports meet is going to happen in next week.",
        date: "2023-05-13T09:45:00"
    }
];

let activities = [
    {
        id: 1,
        type: "student",
        action: "added",
        name: "John Smith",
        time: "2023-05-15T09:00:00"
    },
    {
        id: 2,
        type: "grade",
        action: "updated",
        name: "Emma Johnson",
        time: "2023-05-14T11:30:00"
    },
    {
        id: 3,
        type: "attendance",
        action: "marked",
        name: "Michael Brown",
        time: "2023-05-14T08:45:00"
    }
];

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Set default date for attendance
    document.getElementById('attendanceDate').valueAsDate = new Date();
    
    // Load initial data
    loadDashboard();
    loadStudents();
    loadAttendance();
    loadGrades();
    loadMessages();
    loadActivities();
    
    // Form submissions
    document.getElementById('studentForm').addEventListener('submit', handleStudentForm);
    document.getElementById('gradeForm').addEventListener('submit', handleGradeForm);
    document.getElementById('messageForm').addEventListener('submit', handleMessageForm);
});

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelector(`a[onclick="showSection('${sectionId}')"]`).classList.add('active');
    
    // Refresh section data if needed
    switch(sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'students':
            loadStudents();
            break;
        case 'attendance':
            loadAttendance();
            break;
        case 'grades':
            loadGrades();
            break;
        case 'communication':
            loadMessages();
            break;
    }
}

// Dashboard Functions
function loadDashboard() {
    // Update stats
    document.getElementById('totalStudents').textContent = students.length;
    
    // Calculate attendance rate
    const presentCount = attendance.filter(a => a.status === 'present').length;
    const attendancePercentage = attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : 0;
    document.getElementById('attendanceRate').textContent = `${attendancePercentage}%`;
    
    // Calculate average grade
    const gradeSum = grades.reduce((sum, grade) => sum + grade.grade, 0);
    const averageGrade = grades.length > 0 ? Math.round(gradeSum / grades.length) : 0;
    document.getElementById('averageGrade').textContent = averageGrade;
    
    // Update messages count
    document.getElementById('totalMessages').textContent = messages.length;
}

function loadActivities() {
    const activitiesList = document.getElementById('recentActivities');
    activitiesList.innerHTML = '';
    
    // Sort activities by time (newest first)
    const sortedActivities = [...activities].sort((a, b) => new Date(b.time) - new Date(a.time));
    
    // Display only the 5 most recent activities
    sortedActivities.slice(0, 5).forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        const time = new Date(activity.time).toLocaleString();
        const actionText = `${activity.type} ${activity.action}`;
        
        activityItem.innerHTML = `
            <div class="time">${time}</div>
            <div>${actionText} - ${activity.name}</div>
        `;
        
        activitiesList.appendChild(activityItem);
    });
}

// Student Functions
function loadStudents() {
    const tableBody = document.getElementById('studentsTableBody');
    tableBody.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.grade}</td>
            <td>
                <button class="btn btn-primary" onclick="editStudent(${student.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteStudent(${student.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function searchStudents() {
    const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
    const tableRows = document.querySelectorAll('#studentsTableBody tr');
    
    tableRows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        const email = row.cells[2].textContent.toLowerCase();
        
        if (name.includes(searchTerm) || email.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function showStudentModal(studentId = null) {
    const modal = document.getElementById('studentModal');
    const form = document.getElementById('studentForm');
    
    if (studentId) {
        // Edit mode
        const student = students.find(s => s.id === studentId);
        if (student) {
            document.getElementById('studentId').value = student.id;
            document.getElementById('studentName').value = student.name;
            document.getElementById('studentEmail').value = student.email;
            document.getElementById('studentPhone').value = student.phone;
            document.getElementById('studentGrade').value = student.grade;
            document.getElementById('studentAddress').value = student.address;
            
            // Update modal title
            document.querySelector('#studentModal .modal-header h3').textContent = 'Edit Student';
        }
    } else {
        // Add mode
        form.reset();
        document.getElementById('studentId').value = '';
        document.querySelector('#studentModal .modal-header h3').textContent = 'Add Student';
    }
    
    modal.style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function handleStudentForm(e) {
    e.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const studentData = {
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        grade: document.getElementById('studentGrade').value,
        address: document.getElementById('studentAddress').value
    };
    
    if (studentId) {
        // Update existing student
        const index = students.findIndex(s => s.id === parseInt(studentId));
        if (index !== -1) {
            students[index] = { ...students[index], ...studentData };
            
            // Add to activities
            activities.push({
                id: activities.length + 1,
                type: 'student',
                action: 'updated',
                name: studentData.name,
                time: new Date().toISOString()
            });
        }
    } else {
        // Add new student
        const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        const newStudent = { id: newId, ...studentData };
        students.push(newStudent);
        
        // Add to activities
        activities.push({
            id: activities.length + 1,
            type: 'student',
            action: 'added',
            name: studentData.name,
            time: new Date().toISOString()
        });
    }
    
    // Refresh UI
    loadStudents();
    loadDashboard();
    loadActivities();
    
    // Close modal
    closeModal('studentModal');
}

function editStudent(studentId) {
    showStudentModal(studentId);
}

function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        const student = students.find(s => s.id === studentId);
        
        // Remove student
        students = students.filter(s => s.id !== studentId);
        
        // Remove related attendance and grades
        attendance = attendance.filter(a => a.studentId !== studentId);
        grades = grades.filter(g => g.studentId !== studentId);
        
        // Add to activities
        if (student) {
            activities.push({
                id: activities.length + 1,
                type: 'student',
                action: 'deleted',
                name: student.name,
                time: new Date().toISOString()
            });
        }
        
        // Refresh UI
        loadStudents();
        loadAttendance();
        loadGrades();
        loadDashboard();
        loadActivities();
    }
}

// Attendance Functions
function loadAttendance() {
    const tableBody = document.getElementById('attendanceTableBody');
    tableBody.innerHTML = '';
    
    attendance.forEach(record => {
        const student = students.find(s => s.id === record.studentId);
        if (!student) return;
        
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${record.date}</td>
            <td><span class="status-badge status-${record.status}">${record.status}</span></td>
            <td>
                <button class="btn btn-primary" onclick="editAttendance(${record.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteAttendance(${record.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function markAttendance() {
    const date = document.getElementById('attendanceDate').value;
    const grade = document.getElementById('attendanceClass').value;
    
    if (!date || !grade) {
        alert('Please select both date and class');
        return;
    }
    
    // Filter students by selected grade
    const gradeStudents = students.filter(s => s.grade === grade);
    
    if (gradeStudents.length === 0) {
        alert('No students found in the selected grade');
        return;
    }
    
    // Clear existing attendance for this date and grade
    attendance = attendance.filter(a => {
        const student = students.find(s => s.id === a.studentId);
        return !(a.date === date && student && student.grade === grade);
    });
    
    // Add new attendance records
    gradeStudents.forEach(student => {
        const status = confirm(`Mark attendance for ${student.name} (Present/Absent)?`) ? 'present' : 'absent';
        
        const newId = attendance.length > 0 ? Math.max(...attendance.map(a => a.id)) + 1 : 1;
        attendance.push({
            id: newId,
            studentId: student.id,
            date: date,
            status: status
        });
        
        // Add to activities
        activities.push({
            id: activities.length + 1,
            type: 'attendance',
            action: 'marked',
            name: student.name,
            time: new Date().toISOString()
        });
    });
    
    // Refresh UI
    loadAttendance();
    loadDashboard();
    loadActivities();
}

function editAttendance(attendanceId) {
    const record = attendance.find(a => a.id === attendanceId);
    if (!record) return;
    
    const student = students.find(s => s.id === record.studentId);
    if (!student) return;
    
    const newStatus = prompt(`Change attendance status for ${student.name} (current: ${record.status})`, record.status);
    
    if (newStatus && ['present', 'absent', 'late'].includes(newStatus.toLowerCase())) {
        record.status = newStatus.toLowerCase();
        
        // Add to activities
        activities.push({
            id: activities.length + 1,
            type: 'attendance',
            action: 'updated',
            name: student.name,
            time: new Date().toISOString()
        });
        
        // Refresh UI
        loadAttendance();
        loadDashboard();
        loadActivities();
    }
}

function deleteAttendance(attendanceId) {
    const record = attendance.find(a => a.id === attendanceId);
    if (!record) return;
    
    const student = students.find(s => s.id === record.studentId);
    
    if (confirm('Are you sure you want to delete this attendance record?')) {
        attendance = attendance.filter(a => a.id !== attendanceId);
        
        // Add to activities
        if (student) {
            activities.push({
                id: activities.length + 1,
                type: 'attendance',
                action: 'deleted',
                name: student.name,
                time: new Date().toISOString()
            });
        }
        
        // Refresh UI
        loadAttendance();
        loadDashboard();
        loadActivities();
    }
}

// Grade Functions
function loadGrades() {
    const tableBody = document.getElementById('gradesTableBody');
    tableBody.innerHTML = '';
    
    const subjectFilter = document.getElementById('gradeSubject').value;
    const classFilter = document.getElementById('gradeClass').value;
    
    let filteredGrades = [...grades];
    
    // Apply filters
    if (subjectFilter) {
        filteredGrades = filteredGrades.filter(g => g.subject === subjectFilter);
    }
    
    if (classFilter) {
        filteredGrades = filteredGrades.filter(g => {
            const student = students.find(s => s.id === g.studentId);
            return student && student.grade === classFilter;
        });
    }
    
    filteredGrades.forEach(grade => {
        const student = students.find(s => s.id === grade.studentId);
        if (!student) return;
        
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${grade.subject}</td>
            <td>${grade.grade}</td>
            <td>${grade.date}</td>
            <td>
                <button class="btn btn-primary" onclick="editGrade(${grade.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteGrade(${grade.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function showGradeModal(gradeId = null) {
    const modal = document.getElementById('gradeModal');
    const form = document.getElementById('gradeForm');
    
    // Populate student dropdown
    const studentSelect = document.getElementById('gradeStudent');
    studentSelect.innerHTML = '<option value="">Select Student</option>';
    
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.name} (${student.grade})`;
        studentSelect.appendChild(option);
    });
    
    if (gradeId) {
        // Edit mode
        const grade = grades.find(g => g.id === gradeId);
        if (grade) {
            document.getElementById('gradeId').value = grade.id;
            document.getElementById('gradeStudent').value = grade.studentId;
            document.getElementById('gradeSubjectInput').value = grade.subject;
            document.getElementById('gradeValue').value = grade.grade;
            document.getElementById('gradeDate').value = grade.date;
            
            // Update modal title
            document.querySelector('#gradeModal .modal-header h3').textContent = 'Edit Grade';
        }
    } else {
        // Add mode
        form.reset();
        document.getElementById('gradeId').value = '';
        document.querySelector('#gradeModal .modal-header h3').textContent = 'Add Grade';
    }
    
    modal.style.display = 'block';
}

function handleGradeForm(e) {
    e.preventDefault();
    
    const gradeId = document.getElementById('gradeId').value;
    const studentId = parseInt(document.getElementById('gradeStudent').value);
    const gradeData = {
        studentId: studentId,
        subject: document.getElementById('gradeSubjectInput').value,
        grade: parseInt(document.getElementById('gradeValue').value),
        date: document.getElementById('gradeDate').value
    };
    
    const student = students.find(s => s.id === studentId);
    
    if (gradeId) {
        // Update existing grade
        const index = grades.findIndex(g => g.id === parseInt(gradeId));
        if (index !== -1) {
            grades[index] = { ...grades[index], ...gradeData };
            
            // Add to activities
            activities.push({
                id: activities.length + 1,
                type: 'grade',
                action: 'updated',
                name: student ? student.name : 'Unknown',
                time: new Date().toISOString()
            });
        }
    } else {
        // Add new grade
        const newId = grades.length > 0 ? Math.max(...grades.map(g => g.id)) + 1 : 1;
        const newGrade = { id: newId, ...gradeData };
        grades.push(newGrade);
        
        // Add to activities
        activities.push({
            id: activities.length + 1,
            type: 'grade',
            action: 'added',
            name: student ? student.name : 'Unknown',
            time: new Date().toISOString()
        });
    }
    
    // Refresh UI
    loadGrades();
    loadDashboard();
    loadActivities();
    
    // Close modal
    closeModal('gradeModal');
}

function editGrade(gradeId) {
    showGradeModal(gradeId);
}

function deleteGrade(gradeId) {
    const grade = grades.find(g => g.id === gradeId);
    if (!grade) return;
    
    const student = students.find(s => s.id === grade.studentId);
    
    if (confirm('Are you sure you want to delete this grade?')) {
        grades = grades.filter(g => g.id !== gradeId);
        
        // Add to activities
        activities.push({
            id: activities.length + 1,
            type: 'grade',
            action: 'deleted',
            name: student ? student.name : 'Unknown',
            time: new Date().toISOString()
        });
        
        // Refresh UI
        loadGrades();
        loadDashboard();
        loadActivities();
    }
}

// Message Functions
function loadMessages(filter = 'all') {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';
    
    let filteredMessages = [...messages];
    
    // Apply filter
    if (filter !== 'all') {
        filteredMessages = filteredMessages.filter(m => m.recipientType === filter);
    }
    
    // Sort by date (newest first)
    filteredMessages.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    filteredMessages.forEach(message => {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        
        const date = new Date(message.date).toLocaleString();
        
        messageItem.innerHTML = `
            <div class="message-header">
                <div class="message-subject">${message.subject}</div>
                <div class="message-type">${message.recipientType}</div>
            </div>
            <div class="message-content">${message.content}</div>
            <div class="message-time">${date}</div>
        `;
        
        messagesList.appendChild(messageItem);
    });
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`.filter-btn[onclick="filterMessages('${filter}')"]`).classList.add('active');
}

function filterMessages(filter) {
    loadMessages(filter);
}

function showMessageModal() {
    const modal = document.getElementById('messageModal');
    const form = document.getElementById('messageForm');
    
    form.reset();
    modal.style.display = 'block';
}

function handleMessageForm(e) {
    e.preventDefault();
    
    const newMessage = {
        id: messages.length + 1,
        recipientType: document.getElementById('messageRecipient').value,
        subject: document.getElementById('messageSubject').value,
        content: document.getElementById('messageContent').value,
        date: new Date().toISOString()
    };
    
    messages.push(newMessage);
    
    // Add to activities
    activities.push({
        id: activities.length + 1,
        type: 'message',
        action: 'sent',
        name: `to ${newMessage.recipientType}`,
        time: new Date().toISOString()
    });
    
    // Refresh UI
    loadMessages();
    loadDashboard();
    loadActivities();
    
    // Close modal
    closeModal('messageModal');
}