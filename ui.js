const moduleData = {
    DS: { code: "CS201", lecturer: "Dr. A. John" },
    DB: { code: "CS305", lecturer: "Mr. M. David" },
    OS: { code: "CS310", lecturer: "Dr. S. Peter" }
};

document.getElementById("moduleName").addEventListener("change", e => {
    const m = moduleData[e.target.value];
    document.getElementById("moduleCode").value = m ? m.code : "";
    document.getElementById("lecturerName").value = m ? m.lecturer : "";
});

/* ===== VALIDATION ===== */
function getFormData() {
    const form = document.getElementById("coverForm");
    if (!form.checkValidity()) {
        alert("Please fill all required fields");
        return null;
    }

    const data = {};
    [...form.elements].forEach(el => {
        if (el.id) data[el.id] = el.value.trim().toUpperCase();
    });
    return data;
}

/* ===== PREVIEW ===== */
document.getElementById("previewBtn").onclick = () => {
    const data = getFormData();
    if (!data) return;

    let html = "";
    for (let key in data) {
        html += `<p><b>${key.replace(/([A-Z])/g," $1")}:</b> ${data[key]}</p>`;
    }
    document.getElementById("previewContent").innerHTML = html;
    document.getElementById("previewModal").style.display = "flex";
};

function closePreview() {
    document.getElementById("previewModal").style.display = "none";
}

/* ===== CONNECT TO PDF GENERATOR ===== */
document.getElementById("coverForm").onsubmit = e => {
    e.preventDefault();
    const data = getFormData();
    if (!data) return;

    // CALL YOUR EXISTING PDF FUNCTION
    //generatePDF(data);
};
