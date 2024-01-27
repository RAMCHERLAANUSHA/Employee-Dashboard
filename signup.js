var employeeData;

fetch('dummy.json')
    .then(response => response.json())
    .then(data => {
        employeeData = data;
    })
    .catch(error => console.error('Error fetching data:', error));

document.getElementById('id').addEventListener('input', function () {
    validation_id();
});
document.getElementById('name').addEventListener('input', function () {
    validation_name();
});
document.getElementById('mobile').addEventListener('input', function () {
    validation_mobile();
});
document.getElementById('department').addEventListener('input', function () {
    validation_department();
});
document.getElementById('role').addEventListener('input', function () {
    validation_role();
});
document.getElementById('email').addEventListener('input', function () {
    validation_email();
});
document.getElementById('password').addEventListener('input', function () {
    validation_password();
});
document.getElementById('confirmPassword').addEventListener('input', function () {
    validation_confirmPassword();
});

let errorI = document.getElementById("errorI")
function validation_id() {
    let id = document.getElementById("id").value;
    let isvalid = false;
    for (i = 0; i < employeeData.length; i++) {
        if (id === employeeData[i].id) {
            isvalid = true
        }
        if (isvalid === true) {
            errorI.innerHTML = '';
        } else {
            errorI.innerHTML = "*Enter a valid Employee ID"
        }
    }
}

let errorN = document.getElementById("errorN")
function validation_name() {
    let name = document.getElementById('name').value;
    let lettersOnly = /^[A-Za-z\s]+$/;
    if (name === '') {
        errorN.innerHTML = '*Name should not be Empty'
    } else if (isFinite(name)) {
        errorN.innerHTML = '*Name does not allow numbers'
    } else if (lettersOnly.test(name)) {
        errorN.innerHTML = ''
    } else {
        errorN.innerHTML = '*Special Charecters are not allowed for name'
    }
}

let errorM = document.getElementById("errorM")
function validation_mobile() {
    let mobile = document.getElementById('mobile').value;
    if ((mobile.length !== 10) && (mobile !== '')) {
        errorM.innerHTML = '*Enter a valid mobile number';
    }
    else if (mobile === '') {
        errorM.innerHTML = '*Mobile is mandatory';
    } else {
        errorM.innerHTML = '';
    }
}

let errorD = document.getElementById("errorD");
function validation_department() {
    let department = document.getElementById('department').value;
    if (department === "") {
        errorD.innerHTML = '*Department should not be Empty';
    } else {
        errorD.innerHTML = ''
    }
}

let errorR = document.getElementById('errorR');
function validation_role() {
    let id = document.getElementById('id').value;
    let role = document.getElementById('role').value;
    for (i = 0; i < employeeData.length; i++) {
        if (id === employeeData[i].id) {
            if (role === employeeData[i].role) {
                errorR.innerHTML = ''
            } else {
                errorR.innerHTML = 'Role does not matched'
            }
        }
    }
}

let errorE = document.getElementById("errorE");
function validation_email() {
    let id = document.getElementById('id').value;
    let email = document.getElementById('email').value;
    for (i = 0; i < employeeData.length; i++) {
        if (id === employeeData[i].id) {
            if (email === employeeData[i].email) {
                errorE.innerHTML = ''
            } else {
                errorE.innerHTML = 'Email does not matched with entered Employee Id'
            }
        }
    }
}

let errorP = document.getElementById("errorP")
function validation_password() {
    let password = document.getElementById('password').value;
    if (password === '') {
        errorP.innerHTML = '* Password should not be empty';
    }else if (password.length < 4) {
        errorP.innerHTML = '* Password must be at least 4 characters long';
    }else if (password.length > 16) {
        errorP.innerHTML = '* Password should not contain more than 16 characters';
    }else if (!/[A-Z]/.test(password)) {
        errorP.innerHTML = '* Password must contain at least one uppercase letter';
    }else if (!/[a-z]/.test(password)) {
        errorP.innerHTML = '* Password must contain at least one lowercase letter';
    }else if (!/\d/.test(password)) {
        errorP.innerHTML = '* Password must contain at least one digit';
    }else if (!/[$@$!%*?&]/.test(password)) {
        errorP.innerHTML = '* Password must contain at least one special character ($@$!%*?&)';
    }else{
        errorP.innerHTML = '';
    }
}

let errorC = document.getElementById("errorC")
function validation_confirmPassword(){
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    if (password === confirmPassword){
        errorC.innerHTML = '';
    }else{
        errorC.innerHTML = 'Password does not matched';
    }
}


function signup() {
    if (errorI.innerHTML === '' && errorN.innerHTML === '' && errorM.innerHTML === '' && errorD.innerHTML === '' && errorR.innerHTML === '' && errorE.innerHTML === '' && errorP.innerHTML === '' && errorC.innerHTML === '') {
        alert("SignUp Successful Please SignIn");
        window.location.href = "signin.html";
    }
    let emails = document.getElementById('email').value;
    let data3 = { logemails : emails};
    localStorage.setItem('InLogemail', JSON.stringify(data3));

    let passwords = document.getElementById('password').value;
    let data4 = { logpasswords : passwords};
    localStorage.setItem('InLogpassword', JSON.stringify(data4));

    let id = document.getElementById("id").value;
    let data = {logids : id};
    localStorage.setItem('InLogID', JSON.stringify(data));
}
document.getElementById('signup').addEventListener('click', function() {
    signup();
});

