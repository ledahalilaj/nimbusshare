document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("uploadForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const fileInput = document.getElementById("fileInput");
        const descriptionInput = document.getElementById("descriptionInput");

        const file = fileInput.files[0];
        const description = descriptionInput.value;

        if (!file || !description) {
            alert("Please choose a file and enter a description.");
            return;
        }

        const metadata = {
            filename: file.name,
            description: description
        };

        try {
            const response = await fetch("https://prod-17.uksouth.logic.azure.com:443/workflows/cbfffdeba49f42308ee7eb371927a232/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=L9gP7uJuIS7IGgrd-TE1UjQCO4M1A16DDPfvQO1O-4M", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(metadata)
            });

            if (response.ok) {
                alert("File uploaded and metadata stored!");
                window.location.href = "index.html"; // go back to homepage
            } else {
                const errorText = await response.text();
                alert("Upload failed: " + errorText);
            }
        } catch (err) {
            alert("Error uploading: " + err.message);
        }
    });
});
