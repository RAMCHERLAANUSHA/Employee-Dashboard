var employeeData;
let editedEmployeeIndex;

let diallogBoxElement = document.getElementById('diallogBox');
let successMsgElement = document.createElement('p');
successMsgElement.style.margin = 0 + "px";

let editDiallogBoxElement = document.getElementById('editDiallogBox');
let editSuccessMsgElement = document.createElement('p');
editSuccessMsgElement.style.margin = 0 + "px";

let idData = localStorage.getItem('InLogID');
let idsData = JSON.parse(idData);
let getID = idsData.logids;

fetch('dummy.json')
    .then(response => response.json())
    .then(data => {
        employeeData = data;
        for (i = 0; i < employeeData.length; i++) {
            if (getID === employeeData[i].id) {
                document.getElementById('userImage').src = employeeData[i].image;
            }
        }
        renderTable();
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
// ==========================================================================================

var itemsPerPage = 5;
var currentPage = 1;
var totalPages = 1;
    
function renderTable() {
    var tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = '';
    
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    var currentData = employeeData.slice(startIndex, endIndex);

    currentData.forEach(function (employee) {
        var row = tableBody.insertRow();
        row.insertCell(0).textContent = employee.id;
        row.insertCell(1).textContent = employee.name;
        row.insertCell(2).textContent = employee.mobile;
        row.insertCell(3).textContent = employee.email;
        row.insertCell(4).textContent = employee.department;

        var actionsCell = row.insertCell(5);

        actionsCell.innerHTML = '<i class="fas fa-edit" onclick="editEmployee(' + employeeData.indexOf(employee) + ')"></i> ' +
    '<i class="fas fa-trash-alt" style="color: red;" onclick="deleteEmployee(' + employeeData.indexOf(employee) + ')"></i>';    
    });
    updatePagination();
}

// ===================================================================================================
function updatePagination() {
    totalPages = Math.ceil(employeeData.length / itemsPerPage);

    var pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    var liPrev = document.createElement('li');
    liPrev.classList.add('page-item');
    var aPrev = document.createElement('a');
    aPrev.classList.add('page-link');
    aPrev.href = '#';
    aPrev.innerHTML = '&laquo;';
    aPrev.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });
    liPrev.appendChild(aPrev);
    pagination.appendChild(liPrev);

    for (var i = 1; i <= totalPages; i++) {
        var li = document.createElement('li');
        li.classList.add('page-item');
        var a = document.createElement('a');
        a.classList.add('page-link');
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', function (event) {
            currentPage = parseInt(event.target.textContent);
            renderTable();
        });
        li.appendChild(a);
        pagination.appendChild(li);
    }

    var liNext = document.createElement('li');
    liNext.classList.add('page-item');
    var aNext = document.createElement('a');
    aNext.classList.add('page-link');
    aNext.href = '#';
    aNext.innerHTML = '&raquo;';
    aNext.addEventListener('click', function () {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });
    liNext.appendChild(aNext);
    pagination.appendChild(liNext);
}
// =========================================================================================
let addModal;
function openAddModal() {
    addModal = document.getElementById('addModal');
    addModal.style.display = 'block';
}

function closeAddModal() {
    addModal = document.getElementById('addModal');
    addModal.style.display = 'none';
}

let addedName;
let addedEmail;
let addedEmployee;
let addedMobile;
let addedDepartment;

document.getElementById("employeeName").addEventListener('input', function () {
    addedName = validate_name();
});

document.getElementById('emailID').addEventListener('input',function(){
    addedEmail = validate_email();
});
document.getElementById('employeeID').addEventListener('input',function(){
    addedEmployee = validate_employeeId();
});
document.getElementById('mobileNo').addEventListener('input',function(){
    addedMobile = validate_mobileNo();
});

let errorName = document.getElementById('errorName')
function validate_name() {
    let name = document.getElementById('employeeName').value;
    let lettersOnly = /^[A-Za-z\s]+$/;
    if (name === '') {
        errorName.innerHTML = '*Name should not be Empty'
    } else if (isFinite(name)) {
        errorName.innerHTML = '*Name does not allow numbers'
    } else if (lettersOnly.test(name)) {
        errorName.innerHTML = ''
    } else {
        errorName.innerHTML = '*Special Charecters are not allowed for name'
    }
}

let errorID = document.getElementById('errorID')
function validate_employeeId() {
    let employeeId = document.getElementById("employeeID").value;
    let validFormat = /^TS\d{3}$/;
    if (!validFormat.test(employeeId)) {
      errorID.innerHTML = '* Enter a valid Employee Id e.g., TS0000.';
    } else {
      errorID.innerHTML = '';
    }
}

let errorEmail = document.getElementById("errorEmail")
function validate_email() {
    let mail = document.getElementById('emailID').value;
    if (!(/^[a-z0-9_]+@gmail.com+$/.test(mail)) && (mail !== '')){
        errorEmail.innerHTML = '* enter a valid email id.';
    }else if (mail === ''){
        errorEmail.innerHTML = '* email is mandatory.';
    }else{
        errorEmail.innerHTML = '';
    }
}

let errorMobile = document.getElementById('errorMobile')
function validate_mobileNo() {
    var mobile = document.getElementById('mobileNo').value;
    if ((mobile.length !== 10) && (mobile !== '')) {
        errorMobile.innerHTML = '* enter a valid mobile number.';
    }else if (mobile === ''){
        errorMobile.innerHTML = '* mobile is mandatory.';
    }else{
        errorMobile.innerHTML = '';
    }
}

// ===========================================================================================
let editedName;
let editedMobile;

document.getElementById("editEmployeeName").addEventListener('input', function () {
    editedName = validate_edit_name();
});
document.getElementById('editMobileNo').addEventListener('input',function(){
    editedMobile = validate_edit_mobileNo();
});

let errorN = document.getElementById('errorN')
function validate_edit_name() {
    let name = document.getElementById('editEmployeeName').value;
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

let errorM = document.getElementById('errorM')
function validate_edit_mobileNo() {
    var mobile = document.getElementById('editMobileNo').value;
    if ((mobile.length !== 10) && (mobile !== '')) {
        errorM.innerHTML = '* enter a valid mobile number.';
    }
    else if (mobile === ''){
        errorM.innerHTML = '* mobile is mandatory.';
    }
    errorM.innerHTML = '';
}

// ============================================================================================
let newEmployee;
function addEmployee() {
    if (errorID.innerHTML==='' && errorName.innerHTML==='' && errorMobile.innerHTML==='' && errorEmail.innerHTML===''){
        newEmployee = {
            id: document.getElementById('employeeID').value,
            name: document.getElementById('employeeName').value,
            mobile: document.getElementById('mobileNo').value,
            email: document.getElementById('emailID').value,
            department: document.getElementById('department').value
        };
        successMsgElement.innerHTML = "";
        successMsgElement.innerHTML = "Added Successfully";
        successMsgElement.style.color = "#fff"
        diallogBoxElement.style.marginTop = 50+"px";
        diallogBoxElement.style.backgroundColor = "green";
        document.getElementById("closeButton").style.display = "block";
        diallogBoxElement.appendChild(successMsgElement);
        diallogBoxElement.showModal();
        
        employeeData.push(newEmployee);
        renderTable();
        clearForm();
        setTimeout(function() {
            diallogBoxElement.close();
            
          }, 3000);
    }else{
        successMsgElement.innerHTML = "";
        successMsgElement.innerHTML = "Invalid Credentials!";
        successMsgElement.style.color = "#fff";
        diallogBoxElement.style.backgroundColor = "red";
        document.getElementById("closeButton").style.display = "block";
        diallogBoxElement.appendChild(successMsgElement);
        diallogBoxElement.showModal();
    }
    
}

function closeDialog(){
    
    diallogBoxElement.close();
}
function clearForm() {
    document.getElementById('employeeID').value = '';
    document.getElementById('employeeName').value = '';
    document.getElementById('mobileNo').value = '';
    document.getElementById('emailID').value = '';
    document.getElementById('department').value = '';
}

// ======================================================================================================
var editModal;
function editEmployee(index) {
    var employee = employeeData[index];
    document.getElementById('editEmployeeID').value = employee.id;
    document.getElementById('editEmployeeName').value = employee.name;
    document.getElementById('editMobileNo').value = employee.mobile;
    document.getElementById('editEmailID').value = employee.email;
    document.getElementById('editDepartment').value = employee.department;
    editModal = document.getElementById('editModal');
    editModal.style.display = 'block';
    editedEmployeeIndex = index;
}

function saveEditedEmployee() {
    if (errorN.innerHTML==='' && errorM.innerHTML==='') {
        editSuccessMsgElement.innerHTML = "";
        editSuccessMsgElement.innerHTML = "Edited Successfully";
        editSuccessMsgElement.style.color = "#fff";
        editDiallogBoxElement.style.marginTop = 50+"px";
        editDiallogBoxElement.style.backgroundColor = "green";
        document.getElementById("editCloseButton").style.display = "none";
        editDiallogBoxElement.appendChild(editSuccessMsgElement);
        editDiallogBoxElement.showModal();

        setTimeout(function() {
            editDiallogBoxElement.close();
        }, 3000);
        var editedEmployee = {
            id: document.getElementById('editEmployeeID').value,
            name: document.getElementById('editEmployeeName').value,
            mobile: document.getElementById('editMobileNo').value,
            email: document.getElementById('editEmailID').value,
            department: document.getElementById('editDepartment').value
        };        
        employeeData.splice(editedEmployeeIndex, 0, editedEmployee);
        employeeData.splice(editedEmployeeIndex + 1, 1);
        renderTable();
    }
    else if (editedName==false || editedMobile==false){
        editSuccessMsgElement.innerHTML = "";
        editSuccessMsgElement.innerHTML = "Invalid Changes";
        editSuccessMsgElement.style.color = "#fff";
        editDiallogBoxElement.style.marginTop = 50+"px";
        editDiallogBoxElement.style.backgroundColor = "red";
        document.getElementById("editCloseButton").style.display = "block";
        editDiallogBoxElement.appendChild(editSuccessMsgElement);
        editDiallogBoxElement.showModal();


    }

    else {
        editSuccessMsgElement.innerHTML = "";
        editSuccessMsgElement.innerHTML = "No Changes added";
        editSuccessMsgElement.style.color = "#fff";
        editDiallogBoxElement.style.marginTop = 50+"px";
        editDiallogBoxElement.style.backgroundColor = "orange";
        document.getElementById("editCloseButton").style.display = "none";
        editDiallogBoxElement.appendChild(editSuccessMsgElement);
        editDiallogBoxElement.showModal();

        setTimeout(function() {
            editDiallogBoxElement.close();
        }, 3000);
    }
}
function closeEditDialog() {
    editDiallogBoxElement.close();
}
function closeEditModal() {
    editModal.style.display = 'none';
}
// ==============================================================================================
function deleteEmployee(index) {
    employeeData.splice(index, 1);
    renderTable();
}