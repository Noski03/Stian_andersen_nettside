// Funksjon for å bytte steg
function changeStep(currentStep, nextStep) {
  // Validering før vi går videre
  if (nextStep > currentStep) {
    const currentContainer = document.querySelector(
      `.step[data-step="${currentStep}"]`,
    );
    const inputs = currentContainer.querySelectorAll("input[required]");

    let allValid = true;
    inputs.forEach((input) => {
      if (!input.value) {
        allValid = false;
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "#333";
      }
    });

    if (!allValid) return; // Stopper hvis ikke utfylt
  }

  // Skjul nåværende, vis neste
  document
    .querySelector(`.step[data-step="${currentStep}"]`)
    .classList.remove("active");
  document
    .querySelector(`.step[data-step="${nextStep}"]`)
    .classList.add("active");

  // Oppdater visuelle prikker (dots)
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === nextStep - 1);
  });
}

// Håndtering av innsending
document
  .getElementById("multi-step-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".btn-finish");
    submitBtn.innerText = "SENDER SØKNAD...";
    submitBtn.disabled = true;

    // Her ville du integrert EmailJS som i forrige prosjekt
    // Men for nå simulerer vi en suksess:
    setTimeout(() => {
      alert("Søknad mottatt! Vi tar kontakt innen 24 timer.");
      this.reset();
      changeStep(3, 1);
      submitBtn.innerText = "SEND SØKNAD";
      submitBtn.disabled = false;
    }, 2000);
  });

// Konfigurasjon for observatøren
const revealOptions = {
  threshold: 0.15, // 15% av elementet må være synlig før det trigges
  rootMargin: "0px 0px -50px 0px", // Trigg litt før det kommer helt inn i bildet
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Legg til 'active' klassen når elementet er i bildet
      entry.target.classList.add("active");
      // Slutt å observere elementet (vi vil bare at det skal skje én gang)
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

// Finn alle elementer med 'reveal' klassen og start observasjon
document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});
