const users = JSON.parse(localStorage.getItem("users")) || [];

function register() {
  const user = {
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value,
    onboarded: false
  };

  // 1. Validate fields
  if (!user.name || !user.email || !user.password) {
    alert("Please fill all fields");
    return;
  }

  // 2. Check if email exists
  if (users.find(u => u.email === user.email)) {
    alert("Email already exists");
    return;
  }

  // 3. Save user
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  // 4. Auto-login after registration
  localStorage.setItem("currentUser", JSON.stringify(user));

  // 5. Redirect based on role
  if (user.role === "vendor") {
    window.location = "vendor-setup.html";
  } else {
    window.location = "index.html";
  }
}

function completeOnboarding() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  currentUser.store = {
    name: storeName.value,
    category: storeCategory.value,
    phone: phone.value
  };
  currentUser.onboarded = true;

  const index = users.findIndex(u => u.email === currentUser.email);
  users[index] = currentUser;

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  window.location = "vendor.html";
}
