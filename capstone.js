console.log("capstone.js is loaded");

const firebaseConfig = {
    apiKey: "AIzaSyDUeBT0g4-UrRyYu8zglQonJjJ_IZ__2AM",
    authDomain: "pythonproject743-a31fb.firebaseapp.com",
    projectId: "pythonproject743-a31fb",
    storageBucket: "pythonproject743-a31fb.appspot.com",  // Corrected the storageBucket value
    messagingSenderId: "72528510772",
    appId: "1:72528510772:web:0126603fbfe1a2a387ef61",
    measurementId: "G-1ES660BK9H"
};


const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
const auth = firebase.auth(app);


function FetchUserdata() {
    console.log("inside FetchUserdata");
    // Get the values from the input fields
    const fullName = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const mobile = document.getElementById('mobile').value;

    // Prepare the data to be sent
    const data = {
        full_name: fullName,
        email: email,
        username: username,
        password: password,
        confirm_password: confirmPassword,  // Match key with Flask
        mobile: mobile
    };

    console.log("Sending data:", data);

    // Send the data using Fetch API
    fetch('http://127.0.0.1:5000/register', {  // Change to '/register'
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
          window.location.href = "Login.html";
        } else {
            alert('FAILED: ' + data.message);
        }
    })
    .catch((error) => {

        alert('An error occurred. Please try again.');
    });
}


function validateUser(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    const username = document.querySelector("input[name='username']").value;
    const password = document.querySelector("input[name='password']").value;

    console.log(username)
    console.log(password)

    // Make sure both fields are filled in
    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    // Send AJAX POST request to the server to validate the user
    fetch('http://127.0.0.1:5000/validate_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect to a success page or dashboard if login is successful
            window.location.href = "FirstViewPage.html";  // Change to your actual success route
        } else {
            // Display an error message if validation fails
            alert(data.message || "Invalid username or password.");
        }
    })
    .catch(error => console.error("Error:", error));
}


// sending reset link function
 document.addEventListener("DOMContentLoaded", function() {
   document.getElementById("forgot-password-form").addEventListener("submit", function(event) {
     console.log("Inside password reset function");
          event.preventDefault();
          const email = document.getElementById("email").value;
          console.log(email);

          fetch('http://127.0.0.1:5000/send_reset_link', {
              method: "POST",
              headers: {
                  "Content-Type": "application/json" },
              body: JSON.stringify({ email: email })
          })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                window.location.href = "Login.html";
              } else {
                  alert('FAILED: ' + data.message);
              }
          })
          .catch((error) => {

              alert('An error occurred. Please try again.');
          });
      });
    });

// password reset function
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("resetPasswordForm").addEventListener("submit", function(event) {
        console.log("Inside password reset page");
        event.preventDefault();
        const email = document.getElementById("email").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        console.log(email);
        console.log(newPassword);
        console.log(confirmPassword);

        fetch('http://127.0.0.1:5000/password_update', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email:email, newPassword: newPassword, confirmPassword: confirmPassword })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "Login.html";
            } else {
                alert('FAILED: ' + data.message);
            }
        })
        .catch((error) => {
            alert('An error occurred. Please try again.');
        });
    });
});


// sending otp

// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById("mobile").addEventListener("submit", function(event) {
//       console.log("inside sendOtp function")
//         event.preventDefault();
//         const mobileNumber = document.getElementById("mobile").value;
//         console.log(mobileNumber)
//
//         fetch('http://127.0.0.1:5000/send_otp', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ mobileNumber:mobile })
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 window.location.href = "Login.html";
//             } else {
//                 alert('FAILED: ' + data.message);
//             }
//         })
//         .catch((error) => {
//             alert('An error occurred. Please try again.');
//         });
//     });
// });



// Sending OTP function
function sendOtp() {
            const mobileNumber = document.getElementById("mobile").value;
            console.log("Inside sendOtp function");

            if (!mobileNumber) {
                alert("Please enter your mobile number.");
                return;
            }

            // Call the backend to generate and send OTP
            fetch('http://127.0.0.1:5000/send_otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobile: mobileNumber })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('OTP sent successfully. Check your mobile.');
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error calling /send_otp:', error);
                alert("Error contacting server. Try again.");
            });
        }
