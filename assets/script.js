document.addEventListener("DOMContentLoaded", function () {
  // Contact page form validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const successMessage = document.getElementById("successMessage");

    contactForm.addEventListener("submit", function (e) {
      if (!contactForm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        contactForm.classList.add("was-validated");
        return;
      }
      // Allow form to submit to Formspree
    });

    // Show success message after submission
    contactForm.addEventListener("submit", function (e) {
      setTimeout(() => {
        if (successMessage) {
          successMessage.classList.remove("d-none");
        }
        contactForm.reset();
        contactForm.classList.remove("was-validated");
      }, 500);
    });
  }

  // Hero modal form and appointment switching
  const heroForm = document.getElementById("heroContactForm");
  const heroModalEl = document.getElementById("heroContactModal");
  const modalOptions = document.getElementById("modalOptions");
  const appointmentView = document.getElementById("appointmentView");
  const calendarView = document.getElementById("calendarView");
  const contactUsBtn = document.getElementById("contactUsBtn");
  const bookAppointmentBtn = document.getElementById("bookAppointmentBtn");
  const backToOptionsBtns = document.querySelectorAll(
    "[id^='backToOptionsBtn']",
  );
  const backToTherapistsBtn = document.getElementById("backToTherapistsBtn");
  const therapistBtns = document.querySelectorAll(".therapist-btn");
  const selectedTherapistName = document.getElementById(
    "selectedTherapistName",
  );
  const heroSuccessMessage = document.getElementById("heroSuccessMessage");

  console.log("contactUsBtn:", contactUsBtn);
  console.log("bookAppointmentBtn:", bookAppointmentBtn);

  // Therapist calendar links
  const therapistLinks = {
    Tammy: "https://calendar.app.google/5qSv1xJ9kTd3Mou16",
    Aileen: "https://calendar.app.google/pf3DxSBx9nP5u9VN6", // Placeholder until link is provided
    Mandi: "https://calendar.app.google/eJnUmYkehdntmh447",
  };

  if (contactUsBtn && bookAppointmentBtn && heroForm && heroModalEl) {
    // Show Contact Form
    if (contactUsBtn) {
      contactUsBtn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("Contact Us clicked");
        modalOptions.classList.add("d-none");
        appointmentView.classList.add("d-none");
        heroForm.classList.remove("d-none");
      });
    }

    // Show Appointment View
    if (bookAppointmentBtn) {
      bookAppointmentBtn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("Book Appointment clicked");
        modalOptions.classList.add("d-none");
        appointmentView.classList.remove("d-none");
        calendarView.classList.add("d-none");
        heroForm.classList.add("d-none");
      });
    }

    // Back to Options
    backToOptionsBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("Back clicked");
        modalOptions.classList.remove("d-none");
        appointmentView.classList.add("d-none");
        calendarView.classList.add("d-none");
        heroForm.classList.add("d-none");
        if (heroSuccessMessage) {
          heroSuccessMessage.classList.add("d-none");
        }
        heroForm.classList.remove("was-validated");
        heroForm.reset();
      });
    });

    // Therapist selection
    therapistBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const therapist = btn.getAttribute("data-therapist");
        console.log("Selected therapist:", therapist);
        selectedTherapistName.textContent = therapist;
        
        // Update calendar link based on selected therapist
        const calendarLink = document.querySelector(
          "#calendarView a[target='_blank']"
        );
        if (calendarLink && therapistLinks[therapist]) {
          calendarLink.href = therapistLinks[therapist];
        }
        
        appointmentView.classList.add("d-none");
        calendarView.classList.remove("d-none");
      });
    });

    // Back to Therapists
    if (backToTherapistsBtn) {
      backToTherapistsBtn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("Back to therapists clicked");
        appointmentView.classList.remove("d-none");
        calendarView.classList.add("d-none");
      });
    }

    // Form validation
    heroForm.addEventListener("submit", function (e) {
      if (!heroForm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        heroForm.classList.add("was-validated");
        return;
      }
      // Allow form to submit to Formspree
    });

    // Show success message and close modal after submission
    heroForm.addEventListener("submit", function (e) {
      setTimeout(() => {
        if (heroSuccessMessage) {
          heroSuccessMessage.classList.remove("d-none");
        }
        heroForm.reset();
        heroForm.classList.remove("was-validated");

        // Close modal after showing success
        setTimeout(() => {
          const modalInstance =
            bootstrap.Modal.getInstance(heroModalEl) ||
            new bootstrap.Modal(heroModalEl);
          modalInstance.hide();
          if (heroSuccessMessage) {
            heroSuccessMessage.classList.add("d-none");
          }
          // Reset to options view
          modalOptions.classList.remove("d-none");
          heroForm.classList.add("d-none");
        }, 2000);
      }, 500);
    });

    // Reset modal when closed
    heroModalEl.addEventListener("hidden.bs.modal", function () {
      modalOptions.classList.remove("d-none");
      appointmentView.classList.add("d-none");
      calendarView.classList.add("d-none");
      heroForm.classList.add("d-none");
      if (heroSuccessMessage) {
        heroSuccessMessage.classList.add("d-none");
      }
      heroForm.classList.remove("was-validated");
      heroForm.reset();
    });
  } else {
    console.log("Modal elements not found:", {
      contactUsBtn,
      bookAppointmentBtn,
      heroForm,
      heroModalEl,
    });
  }
});
