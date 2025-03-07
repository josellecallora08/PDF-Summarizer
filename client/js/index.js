document.addEventListener("DOMContentLoaded", () => {
  const dropArea = document.getElementById("drop-area");
  const fileInput = document.getElementById("pdf-file");
  const fileNameDisplay = document.getElementById("file-name");
  const generateSummary = document.getElementById("generate-summary");

  document.getElementById("copy-btn").addEventListener("click", () => {
    const summaryText = document.getElementById("pdf-summary-content");
    summaryText.select();
    document.execCommand("copy");
  });
  // Drag-over effect
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("highlight");
  });

  // Drag-leave effect
  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("highlight");
  });

  // Drop event to accept file
  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("highlight");

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      fileInput.files = files; // Assign to input file
      updateFileName(files[0].name);
    } else {
      alert("Please upload a valid PDF file.");
    }
  });

  // Handle file selection via input
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      updateFileName(file.name);
    }
  });

  // Update file name display
  function updateFileName(name) {
    fileNameDisplay.textContent = name;
  }

  generateSummary.addEventListener("click", async () => {
    const fileInput = document.getElementById("pdf-file");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Ensure the field name is "file"

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      document.getElementById("pdf-summary-content").innerText =
        result.summary || "Error summarizing file.";
    } catch (error) {
      console.error("Upload failed", error);
    }
  });
});
