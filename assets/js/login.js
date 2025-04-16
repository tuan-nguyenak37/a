// Hàm chuyển đổi giữa form Đăng nhập và Đăng ký sử dụng hiệu ứng của Anime.js
function toggleForm() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const formTitle = document.getElementById("formTitle");

  if (loginForm.style.display !== "none") {
    // Ẩn loginForm với hiệu ứng fade-out và slide sang trái
    anime({
      targets: loginForm,
      opacity: [1, 0],
      translateX: [0, -50],
      duration: 500,
      easing: "easeInOutQuad",
      complete: function () {
        loginForm.style.display = "none";
        // Hiển thị registerForm ở trạng thái ban đầu (ẩn hẳn bên phải)
        registerForm.style.display = "block";
        formTitle.innerText = "Đăng Ký";
        anime({
          targets: registerForm,
          opacity: [0, 1],
          translateX: [50, 0],
          duration: 500,
          easing: "easeInOutQuad",
        });
      },
    });
  } else {
    // Ẩn registerForm với hiệu ứng fade-out và slide sang phải
    anime({
      targets: registerForm,
      opacity: [1, 0],
      translateX: [0, 50],
      duration: 500,
      easing: "easeInOutQuad",
      complete: function () {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
        formTitle.innerText = "Đăng Nhập";
        anime({
          targets: loginForm,
          opacity: [0, 1],
          translateX: [-50, 0],
          duration: 500,
          easing: "easeInOutQuad",
        });
      },
    });
  }
}

function register() {
  const fullName = document.getElementById("regFullName").value.trim();
  const dob = document.getElementById("regDOB").value;
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("regConfirmPassword").value;

  if (!fullName || !dob || !username || !password || !confirmPassword) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu xác nhận không đúng!");
    return;
  }

  if (localStorage.getItem("user_" + username)) {
    alert("Tên đăng nhập đã tồn tại!");
    return;
  }

  const userData = {
    username: username,
    password: password,
    fullName: fullName,
    dob: dob,
  };

  localStorage.setItem("user_" + username, JSON.stringify(userData));
  localStorage.setItem("loggedInUser", username);
  showSuccess("Đăng ký và đăng nhập thành công!");
}

function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const userData = JSON.parse(localStorage.getItem("user_" + username));

  if (userData && password === userData.password) {
    localStorage.setItem("loggedInUser", username);
    showSuccess("Đăng nhập thành công!");
  } else {
    alert("Sai tên đăng nhập hoặc mật khẩu!");
  }
}

// Hiệu ứng thông báo thành công với Anime.js
function showSuccess(message) {
  const alertBox = document.getElementById("successAlert");
  alertBox.textContent = message;
  // Đưa thông báo về trạng thái ban đầu để thực hiện hiệu ứng
  alertBox.style.display = "block";
  alertBox.style.opacity = 0;
  alertBox.style.transform = "scale(0.5)";

  anime({
    targets: alertBox,
    opacity: [0, 1],
    scale: [0.5, 1],
    duration: 500,
    easing: "easeOutBack",
  });

  setTimeout(() => {
    anime({
      targets: alertBox,
      opacity: [1, 0],
      scale: [1, 0.5],
      duration: 500,
      easing: "easeInBack",
      complete: function () {
        alertBox.style.display = "none";
        // Sau khi thông báo ẩn, chuyển hướng về trang chủ (hoặc trang khác nếu cần)
        window.location.href = "index.html";
      },
    });
  }, 2500);
}
