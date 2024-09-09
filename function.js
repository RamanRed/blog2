document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("Add-blog");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Get values from the form fields
        const author = document.getElementById("Author").value;
        const idea = document.getElementById("Idea").value;
        const link = document.getElementById("Link").value;
        const description = document.getElementById("Description").value;
        const fileInput = document.getElementById("fileUpload");

        // Create HTML elements dynamically
        const he2 = document.createElement("h2"); 
        const p2 = document.createElement("p"); 
        const img2 = document.createElement("img"); 
        const descrip = document.createElement("p");

        he2.textContent = author; 
        p2.textContent = idea; 
        descrip.textContent = description;

        // Create buttons and details element
        const btn1 = document.createElement("button"); 
        const btn2 = document.createElement("button"); 
        btn1.textContent = "*";
        btn2.textContent = "Open";

        const a = document.createElement("a");
        a.href = "/read"; 
        a.textContent = "Open";

        const detail = document.createElement("details");
        const summary = document.createElement("summary");
        const innerContainer = document.createElement("div");
        innerContainer.setAttribute("class", "blogger");

        // Set image source from file upload or fallback to the provided link
        if (fileInput.files.length > 0) {
            img2.src = URL.createObjectURL(fileInput.files[0]); 
        } else {
            img2.src = link;    
        }

        // Append elements to the inner container
        innerContainer.appendChild(he2);
        summary.appendChild(p2);
        detail.appendChild(summary);
        innerContainer.appendChild(img2);
        detail.appendChild(descrip);
        detail.appendChild(btn1);
        detail.appendChild(a);
        innerContainer.appendChild(detail);
        document.getElementById("blog").appendChild(innerContainer);

        // Create FormData and submit it via POST
        const formData = new FormData(form);
        await fetch('/add', {
            method: 'POST',
            body: formData,
        });
    });
});
