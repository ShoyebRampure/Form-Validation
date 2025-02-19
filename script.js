// DOM elements
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const Cpassword = document.getElementById("confirm-password");
const submit = document.getElementById("btn");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("password-strength-text");

document.getElementById("togglePassword").addEventListener("click", function() {
    togglePasswordVisibility(password, this);
});

document.getElementById("toggleConfirmPassword").addEventListener("click", function() {
    togglePasswordVisibility(Cpassword, this);
});

function togglePasswordVisibility(inputField, icon) {
    if (inputField.type === "password") {
        inputField.type = "text";
        icon.textContent = "🔒";
        icon.style.opacity = "0.8";
    } else {
        inputField.type = "password";
        icon.textContent = "👁️";
        icon.style.opacity = "1";
    }

    inputField.style.borderColor = "#00c3ff";
    setTimeout(() => {
        if (!inputField.parentElement.parentElement.classList.contains('error')) {
            inputField.style.borderColor = "#1a1a50";
        }
    }, 300);
}


username.addEventListener("input", () => validateField(username));
email.addEventListener("input", () => validateField(email));
password.addEventListener("input", () => {
    validateField(password);
    checkPasswordStrength(password.value);

    if (Cpassword.value.trim() !== "") {
        validateField(Cpassword);
    }
});
Cpassword.addEventListener("input", () => validateField(Cpassword));


function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = "";
    
    if (password.length > 0) {
        if (password.length >= 8) {
            strength += 25;
        }
        
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        strengthBar.style.width = strength + "%";
        if (strength <= 25) {
            strengthBar.style.backgroundColor = "#ff4d4d";
            feedback = "Weak: Add numbers, symbols and capital letters";
        } else if (strength <= 50) {
            strengthBar.style.backgroundColor = "#ffa64d";
            feedback = "Fair: Add more variety of characters";
        } else if (strength <= 75) {
            strengthBar.style.backgroundColor = "#4da6ff";
            feedback = "Good: Consider a longer password";
        } else {
            strengthBar.style.backgroundColor = "#00ff88";
            feedback = "Strong: Great password!";
        }
    } else {
        strengthBar.style.width = "0";
        feedback = "";
    }
    
    strengthText.textContent = feedback;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    submit.innerHTML = '<span class="loading-text">Creating Account...</span>';
    submit.disabled = true;
    const isUsernameValid = validateField(username);
    const isEmailValid = validateField(email);
    const isPasswordValid = validateField(password);
    const isConfirmPasswordValid = validateField(Cpassword);
    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        setTimeout(() => {
            submit.innerHTML = "Account Created Successfully!";
            submit.style.backgroundColor = "#00ff88";
            submit.style.boxShadow = "0 0 15px rgba(0, 255, 136, 0.5)";
            submit.style.backgroundImage = "none";
            setTimeout(() => {
                form.reset();
                submit.disabled = false;
                submit.innerHTML = "Create Account";
                submit.style.background = "linear-gradient(to right, #00c3ff, #0063ff)";
                submit.style.boxShadow = "0 3px 10px rgba(0, 100, 255, 0.3)";
                document.querySelectorAll('.form-control').forEach(control => {
                    control.classList.remove('success', 'error');
                });
                document.querySelectorAll('.error').forEach(error => {
                    error.classList.remove('visible');
                    error.textContent = "";
                });
                strengthBar.style.width = "0";
                strengthText.textContent = "";
            }, 1500);
        }, 1000);
    } else {
        setTimeout(() => {
            submit.disabled = false;
            submit.innerHTML = "Create Account";
        }, 500);
    }
});

function validateField(element) {
    const value = element.value.trim();
    let isValid = false;
    
    switch(element.id) {
        case "username":
            if (value === "") {
                setError(element, "Username is required");
            } else if (value.length < 3) {
                setError(element, "Username must be at least 3 characters");
            } else {
                setSuccess(element);
                isValid = true;
            }
            break;
            
        case "email":
            if (value === "") {
                setError(element, "Email is required");
            } else if (!validateEmail(value)) {
                setError(element, "Please enter a valid email address");
            } else {
                setSuccess(element);
                isValid = true;
            }
            break;
            
        case "password":
            if (value === "") {
                setError(element, "Password is required");
            } else if (value.length < 8) {
                setError(element, "Password must be at least 8 characters");
            } else if (!/[A-Z]/.test(value)) {
                setError(element, "Include at least one uppercase letter");
            } else if (!/[0-9]/.test(value)) {
                setError(element, "Include at least one number");
            } else {
                setSuccess(element);
                isValid = true;
            }
            break;
            
        case "confirm-password":
            if (value === "") {
                setError(element, "Please confirm your password");
            } else if (value !== password.value.trim()) {
                setError(element, "Passwords do not match");
            } else {
                setSuccess(element);
                isValid = true;
            }
            break;
    }
    
    return isValid;
}
const setError = (element, message) => {
    const inputControl = element.parentElement.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    
    errorDisplay.innerText = message;
    errorDisplay.classList.add("visible");
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};
const setSuccess = (element) => {
    const inputControl = element.parentElement.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    
    errorDisplay.innerText = "";
    errorDisplay.classList.remove("visible");
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};

const validateEmail = (email) => {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        const label = input.parentElement.parentElement.querySelector('label');
        if (label) {
            label.style.color = '#00c3ff';
            label.style.textShadow = '0 0 8px rgba(0, 195, 255, 0.7)';
        }
    });
    
    input.addEventListener('blur', () => {
        const label = input.parentElement.parentElement.querySelector('label');
        if (label) {
            label.style.color = '#00c3ff';
            label.style.textShadow = '0 0 5px rgba(0, 195, 255, 0.3)';
        }
    });
});