let userAccount = null;
let calculatedAge = null;
const placeholderProfilePic = "https://placehold.co/120x120/E2E8F0/475569?text=Profile";

document.addEventListener('DOMContentLoaded', () => {

    const loginView = document.getElementById('loginView');
    const registrationView = document.getElementById('registrationView');
    const profileView = document.getElementById('profileView');
    const forgotView = document.getElementById('forgotView');

    const showRegisterButton = document.getElementById('showRegisterButton');
    const showLoginButton = document.getElementById('showLoginButton');
    const showForgotButton = document.getElementById('showForgotButton');
    const backToLoginButton = document.getElementById('backToLoginButton');

    const loginForm = document.getElementById('loginForm');
    const loginUsername = document.getElementById('loginUsername');
    const loginPassword = document.getElementById('loginPassword');
    const loginError = document.getElementById('loginError');
    
    const forgotForm = document.getElementById('forgotForm');
    const forgotEmail = document.getElementById('forgotEmail');
    const forgotError = document.getElementById('forgotError');
    const forgotSuccess = document.getElementById('forgotSuccess');

    const profileForm = document.getElementById('profileForm');
    
    const profileImage = document.getElementById('profileImage');
    const firstName = document.getElementById('firstName');
    const middleName = document.getElementById('middleName');
    const lastName = document.getElementById('lastName');
    const dob = document.getElementById('dob');
    const gender = document.getElementById('gender');
    const cellNum = document.getElementById('cellNum');
    const nationality = document.getElementById('nationality');
    
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const profileImageError = document.getElementById('profileImageError');
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const dobError = document.getElementById('dobError');
    const genderError = document.getElementById('genderError');
    const cellNumError = document.getElementById('cellNumError');
    const nationalityError = document.getElementById('nationalityError');

    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    const profilePic = document.getElementById('profilePic');
    const profileDisplayName = document.getElementById('profileDisplayName');
    const profileFullName = document.getElementById('profileFullName');
    const profileUsername = document.getElementById('profileUsername');
    const profileEmail = document.getElementById('profileEmail');
    const profileCellNum = document.getElementById('profileCellNum');
    const profileDob = document.getElementById('profileDob');
    const profileAge = document.getElementById('profileAge');
    const profileGender = document.getElementById('profileGender');
    const profileNationality = document.getElementById('profileNationality');
    const logoutButton = document.getElementById('logoutButton');

    const successModal = document.getElementById('successModal');
    const closeModalButton = document.getElementById('closeModalButton');

    
    function showError(inputEl, errorEl, message) {
        if (inputEl) inputEl.classList.add('input-error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.remove('hidden');
        }
    }

    function clearError(inputEl, errorEl) {
        if (inputEl) inputEl.classList.remove('input-error');
        if (errorEl) errorEl.classList.add('hidden');
    }

    function validateEmailRegex(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhoneRegex(phone) {
        const re = /^\+?[0-9]{10,15}$/;
        return re.test(String(phone));
    }

    function calculateAge(dobString) {
        const today = new Date();
        const birthDate = new Date(dobString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function showLoginView() {
        loginView.classList.remove('hidden');
        registrationView.classList.add('hidden');
        profileView.classList.add('hidden');
        forgotView.classList.add('hidden');
    }

    function showRegistrationView() {
        loginView.classList.add('hidden');
        registrationView.classList.remove('hidden');
        profileView.classList.add('hidden');
        forgotView.classList.add('hidden');
    }
    
    function showForgotView() {
        loginView.classList.add('hidden');
        registrationView.classList.add('hidden');
        profileView.classList.add('hidden');
        forgotView.classList.remove('hidden');
    }

    function showProfileView() {
        loginView.classList.add('hidden');
        registrationView.classList.add('hidden');
        profileView.classList.remove('hidden');
        forgotView.classList.add('hidden');
        populateProfileData();
    }

    function populateProfileData() {
        if (!userAccount) return; 
        
        profilePic.src = userAccount.profileImageURL || placeholderProfilePic;
        profileDisplayName.textContent = `${userAccount.firstName} ${userAccount.lastName}`;
        profileFullName.textContent = `${userAccount.firstName} ${userAccount.middleName || ''} ${userAccount.lastName}`;
        profileUsername.textContent = userAccount.username;
        profileEmail.textContent = userAccount.email;
        profileCellNum.textContent = userAccount.cellNum;
        profileDob.textContent = userAccount.dob;
        profileAge.textContent = userAccount.age;
        profileGender.textContent = userAccount.gender;
        profileNationality.textContent = userAccount.nationality;
    }

    function validateProfileImage() {
        clearError(profileImage, profileImageError);
        const file = profileImage.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                showError(profileImage, profileImageError, 'File must be an image (PNG, JPG, etc.).');
                return false;
            }
        }
        return true;
    }

    function validateFirstName() {
        const value = firstName.value.trim();
        if (value === '') {
            showError(firstName, firstNameError, 'First Name is required.');
            return false;
        }
        clearError(firstName, firstNameError);
        return true;
    }
    
    function validateLastName() {
        const value = lastName.value.trim();
        if (value === '') {
            showError(lastName, lastNameError, 'Last Name is required.');
            return false;
        }
        clearError(lastName, lastNameError);
        return true;
    }

    function validateDob() {
        const value = dob.value.trim();
        if (value === '') {
            showError(dob, dobError, 'Date of Birth is required.');
            return false;
        }
        const age = calculateAge(value);
        if (age < 0 || isNaN(age)) {
            showError(dob, dobError, 'Please enter a valid date.');
            return false;
        }
        if (age < 13) {
            showError(dob, dobError, 'You must be at least 13 years old.');
            return false;
        }
        calculatedAge = age;
        clearError(dob, dobError);
        return true;
    }
    
    function validateGender() {
        const value = gender.value;
        if (value === '') {
            showError(gender, genderError, 'Please select a gender.');
            return false;
        }
        clearError(gender, genderError);
        return true;
    }

    function validateCellNum() {
        const value = cellNum.value.trim();
        if (value === '') {
            showError(cellNum, cellNumError, 'Cell Number is required.');
            return false;
        }
        if (!validatePhoneRegex(value)) {
            showError(cellNum, cellNumError, 'Please enter a valid number (e.g., +1234567890).');
            return false;
        }
        clearError(cellNum, cellNumError);
        return true;
    }

    function validateNationality() {
        const value = nationality.value.trim();
        if (value === '') {
            showError(nationality, nationalityError, 'Nationality is required.');
            return false;
        }
        clearError(nationality, nationalityError);
        return true;
    }

    function validateUsername() {
        const value = username.value.trim();
        if (value === '') {
            showError(username, usernameError, 'Username is required.');
            return false;
        }
        if (value.length < 3) {
            showError(username, usernameError, 'Username must be at least 3 characters long.');
            return false;
        }
        clearError(username, usernameError);
        return true;
    }

    function validateEmail() {
        const value = email.value.trim();
        if (value === '') {
            showError(email, emailError, 'Email is required.');
            return false;
        }
        if (!validateEmailRegex(value)) {
            showError(email, emailError, 'Please enter a valid email address.');
            return false;
        }
        clearError(email, emailError);
        return true;
    }

    function validatePassword() {
        const value = password.value.trim();
        if (value === '') {
            showError(password, passwordError, 'Password is required.');
            return false;
        }
        if (value.length < 8) {
            showError(password, passwordError, 'Password must be at least 8 characters long.');
            return false;
        }
        clearError(password, passwordError);
        return true;
    }

    function validateConfirmPassword() {
        const value = confirmPassword.value.trim();
        if (value === '') {
            showError(confirmPassword, confirmPasswordError, 'Please confirm your password.');
            return false;
        }
        if (value !== password.value.trim()) {
            showError(confirmPassword, confirmPasswordError, 'Passwords do not match.');
            return false;
        }
        clearError(confirmPassword, confirmPasswordError);
        return true;
    }


    showRegisterButton.addEventListener('click', showRegistrationView);
    showLoginButton.addEventListener('click', showLoginView);
    showForgotButton.addEventListener('click', showForgotView);
    backToLoginButton.addEventListener('click', showLoginView);

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const validations = [
            validateProfileImage(),
            validateFirstName(),
            validateLastName(),
            validateDob(),
            validateGender(),
            validateCellNum(),
            validateNationality(),
            validateUsername(),
            validateEmail(),
            validatePassword(),
            validateConfirmPassword()
        ];
        
        const isFormValid = validations.every(Boolean);

        if (isFormValid) {
            const saveUserData = (imageUrl) => {
                userAccount = {
                    profileImageURL: imageUrl,
                    firstName: firstName.value.trim(),
                    middleName: middleName.value.trim() || null,
                    lastName: lastName.value.trim(),
                    dob: dob.value.trim(),
                    age: calculatedAge,
                    gender: gender.value,
                    cellNum: cellNum.value.trim(),
                    nationality: nationality.value.trim(),
                    username: username.value.trim(),
                    email: email.value.trim(),
                    password: password.value.trim()
                };

                successModal.classList.remove('modal-hidden');
                successModal.classList.add('modal-visible');
                profileForm.reset();
            };

            const file = profileImage.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    saveUserData(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                saveUserData(null);
            }

        } else {
            console.log('Registration form is invalid. Please check errors.');
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const loginIdentifier = loginUsername.value.trim();
        const loginPass = loginPassword.value.trim();
        clearError(loginUsername, loginError);

        if (!userAccount) {
            showError(loginUsername, loginError, 'No account found. Please register.');
            return;
        }

        if (
            (userAccount.username === loginIdentifier || userAccount.email === loginIdentifier) && 
            userAccount.password === loginPass
        ) {
            showProfileView(); 
            loginForm.reset();
        } else {
            showError(loginUsername, loginError, 'Invalid credentials.');
        }
    });

    forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailVal = forgotEmail.value.trim();
        clearError(forgotEmail, forgotError);
        forgotSuccess.classList.add('hidden');

        if (!validateEmailRegex(emailVal)) {
            showError(forgotEmail, forgotError, 'Please enter a valid email.');
            return;
        }

        if (userAccount && userAccount.email === emailVal) {
            forgotSuccess.classList.remove('hidden');
            forgotForm.reset();
        } else {
            showError(forgotEmail, forgotError, 'No account found with that email.');
        }
    });


    logoutButton.addEventListener('click', () => {
        profilePic.src = placeholderProfilePic;
        showLoginView();
    });

    closeModalButton.addEventListener('click', () => {
        successModal.classList.add('modal-hidden');
        successModal.classList.remove('modal-visible');
        showLoginView();
    });

});

