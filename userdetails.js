var employeeData;

let idData = localStorage.getItem('InLogID');
let idsData = JSON.parse(idData);
let getID = idsData.logids;

fetch('dummy.json')
    .then(response => response.json())
    .then(data => {
        employeeData = data;
        for (i = 0; i < employeeData.length; i++) {
            if (getID === employeeData[i].id) {
                document.getElementById('id').innerHTML = employeeData[i].id;
                document.getElementById('name').innerHTML = employeeData[i].name;
                document.getElementById('mobile').innerHTML = employeeData[i].mobile;
                document.getElementById('email').innerHTML = employeeData[i].email;
                document.getElementById('department').innerHTML = employeeData[i].department;
                document.getElementById('userImage').src = employeeData[i].image;
            }
        }
    })
    .catch(error => console.error('Error fetching data:', error));
// ===========================================================================================
function logout(){
    alert("Logout Successful");
    window.location.href = 'signup.html';
}
// ===========================================================================================
function changeProfile(){
    document.getElementById("profileChange").style.display = "block";
}

function saveProfile(){
    let diallogBoxElement = document.getElementById('profileDiallogBox');
    let successMsgElement = document.createElement('p');
    successMsgElement.style.margin = 0 + "px";

    let profileImage = document.getElementById('userImage');
    let imageInput = document.getElementById('imageInput');
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
        successMsgElement.innerHTML = "";
        successMsgElement.innerHTML = "Profile Changed Successfully";
        successMsgElement.style.color = "#fff"
        diallogBoxElement.style.marginTop = 50+"px";
        diallogBoxElement.style.backgroundColor = "#126086";
        document.getElementById("profileCloseButton").style.display = "block";
        diallogBoxElement.appendChild(successMsgElement);
        diallogBoxElement.showModal();
    }else{
        successMsgElement.innerHTML = "";
        successMsgElement.innerHTML = "No Image Selected";
        successMsgElement.style.color = "#fff"
        diallogBoxElement.style.marginTop = 50+"px";
        diallogBoxElement.style.backgroundColor = "orange";
        document.getElementById("profileCloseButton").style.display = "block";
        diallogBoxElement.appendChild(successMsgElement);
        diallogBoxElement.showModal();
    } 
}

function closeProfileDialog(){
    document.getElementById('profileDiallogBox').style.display = 'none';
    closeProfileModal();
}

function closeProfileModal(){
    document.getElementById("profileChange").style.display = "none";
}
// ======================================================================================
document.getElementById('oldPassword').addEventListener('input', function () {
    validation_oldPassword();
});
document.getElementById('newPassword').addEventListener('input', function () {
    validation_newPassword();
});
document.getElementById('confirmPassword').addEventListener('input', function () {
    validation_confirmPassword();
});

let errorO = document.getElementById('errorOld')
function validation_oldPassword(){
    let passwordData = localStorage.getItem('InLogpassword');
    let passwordsData = JSON.parse(passwordData);
    let passData = passwordsData.logpasswords;

    let oldPassword = document.getElementById('oldPassword').value
    if(passData===oldPassword){
        errorO.innerHTML = ''
    }else{
        errorO.innerHTML = '*Password does not Matched'
    }
}

let errorP = document.getElementById("errorNew")
function validation_newPassword(){
    let oldPassword = document.getElementById('oldPassword').value
    let password = document.getElementById('newPassword').value;
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
    }else if(oldPassword===password){
        errorP.innerHTML = '* Password should not be same as Old'
    }else{
        errorP.innerHTML = '';
    }
}
let errorC = document.getElementById('errorConfirm')
function validation_confirmPassword(){
    let nPassword = document.getElementById('newPassword').value;
    let cPassword = document.getElementById('confirmPassword').value;
    if(nPassword === cPassword){
        errorC.innerHTML = ''
    }else{
        errorC.innerHTML = '*Password does not Matched'
    }
}
// =========================================================================================
function changePassword(){
    document.getElementById("passwordChange").style.display = "block";
}

function savePassword(){
    if(errorO.innerHTML === '' && errorP.innerHTML === '' && errorC.innerHTML === ''){
        let newPassword = document.getElementById('newPassword').value;

        let passwordData = localStorage.getItem('InLogpassword');
        let passwordsData = JSON.parse(passwordData);
        passwordsData.logpasswords = newPassword;
        localStorage.setItem('InLogpassword', JSON.stringify(passwordsData));
        
        alert('Password Changed Succesfully! Please Signin');
        window.location.href = 'signin.html';
    }else{
        alert('Input credentials are not valid');
        window.location.href = 'userdetails.html';
    } 
}

function closePasswordDialog(){
    document.getElementById('passwordDiallogBox').style.display = 'none';
    closePasswordModal();
}

function closePasswordModal(){
    document.getElementById("passwordChange").style.display = "none";
}

