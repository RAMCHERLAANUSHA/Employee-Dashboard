var employeeData;

fetch('dummy.json')
    .then(response => response.json())
    .then(data => {
        employeeData = data;
    })
    .catch(error => console.error('Error fetching data:', error));

document.getElementById('logEmail').addEventListener('input', function () {
    validation_email();
});
document.getElementById('logPassword').addEventListener('input', function () {
    validation_password();
});

let errorE = document.getElementById('errorLE');
function validation_email(){
    let email = document.getElementById('logEmail').value;
    let emailData = localStorage.getItem('InLogemail');
    let emailsData = JSON.parse(emailData);
    let getemail = emailsData.logemails
    if(email !== getemail){
        errorE.innerHTML = "*Email does not Matched"
    }else{
        errorE.innerHTML = ''
    }
}

let errorP = document.getElementById('errorLP');
function validation_password(){
    let logpassword = document.getElementById('logPassword').value;
    let passwordData = localStorage.getItem('InLogpassword');
    let passwordsData = JSON.parse(passwordData);
    let getpassword = passwordsData.logpasswords;
    if(logpassword !== getpassword){
        errorP.innerHTML = "*Password does not Matched"
    }else{
        errorP.innerHTML = ''
    }
}

function loginbtn(){
    if (errorE.innerHTML === '' && errorP.innerHTML === ''){
        let email = document.getElementById('logEmail').value;
        alert('Login Successfull');
        for (i = 0; i < employeeData.length; i++) {
            if (email === employeeData[i].email) {
                if(employeeData[i].role === 'User'){
                    window.location.href = 'userdetails.html'
                }else{
                    window.location.href = 'dashboard.html'
                }
            }
        }
    }
}
document.getElementById('signin').addEventListener('click', function() {
    loginbtn();
});
