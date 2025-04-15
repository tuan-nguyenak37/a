document
  .getElementById("jobForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const fileInput = form.cv.files[0];

    if (!fileInput) {
      alert("Vui lòng chọn file CV.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async function () {
      const base64 = reader.result.split(",")[1];

      const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        dob: form.dob.value,
        position: form.position.value,
        cv: base64,
        filename: fileInput.name,
        mimeType: fileInput.type,
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxzVhbYotuN0p6oE3Z68TYbbTqm1Pj9zc6csA_xcInvITsqCmdlrnXMRyXwVyAT4EA/exec",
        {
          method: "POST",
          body: new URLSearchParams(formData),
        }
      );

      const result = await response.text();
      document.getElementById("result").textContent = result;
    };

    reader.readAsDataURL(fileInput);
  });
