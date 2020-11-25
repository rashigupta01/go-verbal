
window.addEventListener('load', () => {
    const preload = document.querySelector('.preload');
    preload.classList.add('preload-finish');
});

function checkPassword() {
    const password1 = document.getElementById('password').value;
    const password2 = document.getElementById('confirm_password').value;

    if (password1 == '')
        alert("Please enter Password");

    else if (password2 == '')
        alert("Please enter confirm password");

    else if (password1 != password2) {
        alert("\nPassword did not match: Please try again...")
        return false;
    }

    else {
        alert("Password Match: Welcome to Vedantu")
        return true;
    }
}

function validateForm() {
    const x = document.getElementById('fname').value;

    if (x == '')
        alert("please enter name");
    else
        return true;


}

function validatephone() {
    const y = document.getElementById('phonenu').value;
    var q = /^\d{10}$/;
    if (y.match(q))
        return true;
    else
        alert("please enter correct number")
    return false;

}

