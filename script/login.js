console.log("login hoise")


document.getElementById("login-btn").addEventListener("click", function () {
    // get username and password
    const inputUserName = document.getElementById("input-username");
    const userName = inputUserName.value;
    // console.log(userName)
    const inputPassword = document.getElementById("input-password");
    const userPassword = inputPassword.value;
    // console.log(userPassword)

    if (userName == "admin" && userPassword == "admin123") {
        alert("Login Success")
    }
    else {
        alert("Failed to Sign In");
        return
    }
});