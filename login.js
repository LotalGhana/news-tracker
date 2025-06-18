 // Login function
    document.getElementById("loginBtn").addEventListener("click", function () {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          window.location.href = "dashboard.html";
        })
        .catch(error => alert("Login error: " + error.message));
    });

    // Register function
    document.getElementById("registerLink").addEventListener("click", function () {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!email || !password) {
        alert("Please enter email and password before registering.");
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert("Registered successfully! Now you can login.");
        })
        .catch(error => alert("Registration error: " + error.message));
    });