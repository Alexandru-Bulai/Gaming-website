export let pageCount = 0;

export function moveMenu(add, sub) {
  if (add) {
    pageCount += 1;
  }
  if (sub) {
    pageCount -= 1;
  }
  if (pageCount < 0) {
    pageCount = 0;
  }
  if (add && sub) {
    throw new Error("Please select only one option at a time");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.querySelector(".highlight-foreward");
  const prevBtn = document.querySelector(".highlight-backward");
  const totalDivs = document.querySelectorAll(".highlight-container").length;

  function updateVisibility() {
    if (pageCount >= totalDivs) {
      pageCount = 0;
    } else {
      console.error("Index limit reached");
    }

    const highlightContainers = document.querySelectorAll(
      ".highlight-container",
    );
    highlightContainers.forEach((div, index) => {
      div.style.display = index === pageCount ? "block" : "none";
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      moveMenu(true, false);
      updateVisibility();
    });
  } else {
    console.error("Next button not found.");
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      moveMenu(false, true);
      updateVisibility();
    });
  } else {
    console.error("Previous button not found.");
  }

  updateVisibility();
});
