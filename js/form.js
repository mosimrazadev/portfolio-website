export function initContactForm() {
  const form = document.querySelector('#contactForm');
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form); // capture data immediately

    // ✅ Show toast instantly
    Toastify({
      text: "✅ Message sent successfully!",
      duration: 3000,
      gravity: "top",
      position: "right",
      className: "custom-toast",
      style: {
        background: document.body.classList.contains("dark") ? "#1f2937" : "#141414",
        borderRadius: "8px",
        padding: "16px 20px",
        fontSize: "14px",
        fontFamily: "Arial, sans-serif"
      },
      close: true,
    }).showToast();

    // ✅ Send FormData to FormSubmit
    fetch("https://formsubmit.co/ajax/mosimraza.webdev@gmail.com", {
      method: "POST",
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        console.error("❌ Submission error:", data);
      }
    })
    .catch(err => {
      console.error("❌ Network error:", err);
    });

    // ⏱ Delay reset slightly to avoid issues
    setTimeout(() => {
      form.reset();
    }, 500); // 0.5s delay
  });
}
