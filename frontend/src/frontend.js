document.getElementById('addStudentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const enrollment_date = document.getElementById('enrollment_date').value;

    fetch('/.netlify/functions/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com",
          enrollment_date: "2025-03-18",
        }),
      })

    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('enrollStudentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const student_id = document.getElementById('student_id').value;
    const course_id = document.getElementById('course_id').value;
    const enrollment_date = document.getElementById('enrollment_date').value;

    fetch('http://localhost:5000/enrollStudent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            student_id,
            course_id,
            enrollment_date,
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});