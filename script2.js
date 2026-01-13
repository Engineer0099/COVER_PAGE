// Module data with corresponding codes and lecturers
const moduleData = {
    "Web Development": { code: "CS401", lecturer: "Dr. Sarah Johnson" },
    "Data Structures": { code: "CS305", lecturer: "Prof. Michael Chen" },
    "Database Management": { code: "CS320", lecturer: "Dr. Emily Wilson" },
    "Software Engineering": { code: "CS410", lecturer: "Prof. David Brown" },
    "Machine Learning": { code: "CS550", lecturer: "Dr. Lisa Anderson" },
    "Networking": { code: "CS425", lecturer: "Prof. Robert Taylor" }
};

// Set default date to tomorrow
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
document.getElementById('submissionDate').valueAsDate = tomorrow;

// Auto-populate module code and lecturer when module is selected
document.getElementById('moduleName').addEventListener('change', function() {
    const moduleName = this.value;
    const moduleCode = document.getElementById('moduleCode');
    const lecturerName = document.getElementById('lecturerName');
    
    if (moduleName && moduleData[moduleName]) {
        moduleCode.value = moduleData[moduleName].code;
        lecturerName.value = moduleData[moduleName].lecturer;
    } else {
        moduleCode.value = '';
        lecturerName.value = '';
    }
    
    // Update preview
    updatePreview();
});

// Update preview on any input change
document.querySelectorAll('#coverForm input, #coverForm select').forEach(element => {
    element.addEventListener('input', updatePreview);
    element.addEventListener('change', updatePreview);
});

// Function to update the preview
function updatePreview() {
    document.getElementById('previewCourse').textContent = 
        document.getElementById('course').value || '-';
    
    document.getElementById('previewModuleName').textContent = 
        document.getElementById('moduleName').value || '-';
    
    document.getElementById('previewModuleCode').textContent = 
        document.getElementById('moduleCode').value || '-';
    
    document.getElementById('previewLecturerName').textContent = 
        document.getElementById('lecturerName').value || '-';
    
    document.getElementById('previewNatureOfWork').textContent = 
        document.getElementById('natureOfWork').value || '-';
    
    const submissionDate = document.getElementById('submissionDate').value;
    if (submissionDate) {
        const dateObj = new Date(submissionDate);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        document.getElementById('previewSubmissionDate').textContent = formattedDate;
    } else {
        document.getElementById('previewSubmissionDate').textContent = '-';
    }
    
    document.getElementById('previewStudentName').textContent = 
        document.getElementById('studentName').value || '-';
    
    document.getElementById('previewRegNo').textContent = 
        document.getElementById('regNo').value || '-';
    
    document.getElementById('previewStream').textContent = 
        document.getElementById('stream').value || '-';
}

// Generate button functionality
document.getElementById('generateBtn').addEventListener('click', function() {
    // Check if form is valid
    const form = document.getElementById('coverForm');
    if (!form.checkValidity()) {
        // Trigger validation messages
        form.reportValidity();
        return;
    }
    
    // Add animation to the button
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    this.disabled = true;
    
    // Simulate processing time
    setTimeout(() => {
        // Create a printable version of the cover page
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Assignment Cover Page</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; }
                    .header { text-align: center; margin-bottom: 40px; }
                    .header h1 { color: #2c3e50; border-bottom: 3px solid #6a11cb; padding-bottom: 10px; }
                    .field { margin-bottom: 15px; display: flex; border-bottom: 1px dashed #ddd; padding-bottom: 8px; }
                    .field label { font-weight: bold; width: 200px; }
                    .university { text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 30px; color: #6a11cb; }
                    .date { text-align: right; margin-top: 50px; font-style: italic; }
                </style>
            </head>
            <body>
                <div class="university">UNIVERSITY OF KNOWLEDGE</div>
                <div class="header">
                    <h1>ASSIGNMENT COVER PAGE</h1>
                </div>
                
                <div class="field">
                    <label>COURSE:</label>
                    <span>${document.getElementById('course').value}</span>
                </div>
                
                <div class="field">
                    <label>MODULE NAME:</label>
                    <span>${document.getElementById('moduleName').value}</span>
                </div>
                
                <div class="field">
                    <label>MODULE CODE:</label>
                    <span>${document.getElementById('moduleCode').value}</span>
                </div>
                
                <div class="field">
                    <label>LECTURER NAME:</label>
                    <span>${document.getElementById('lecturerName').value}</span>
                </div>
                
                <div class="field">
                    <label>NATURE OF WORK:</label>
                    <span>${document.getElementById('natureOfWork').value}</span>
                </div>
                
                <div class="field">
                    <label>SUBMISSION DATE:</label>
                    <span>${document.getElementById('previewSubmissionDate').textContent}</span>
                </div>
                
                <div class="field">
                    <label>STUDENT NAME:</label>
                    <span>${document.getElementById('studentName').value}</span>
                </div>
                
                <div class="field">
                    <label>REG NO:</label>
                    <span>${document.getElementById('regNo').value}</span>
                </div>
                
                <div class="field">
                    <label>STREAM:</label>
                    <span>${document.getElementById('stream').value}</span>
                </div>
                
                <div class="date">
                    Generated on: ${new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </div>
            </body>
            </html>
        `;
        
        // Open print window
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        
        // Reset button
        this.innerHTML = '<i class="fas fa-file-download"></i> Generate Cover Page';
        this.disabled = false;
        
        // Show success message
        alert("Cover page generated successfully! A print preview will open in a new window.");
        
        // Focus on the print window and trigger print after a short delay
        setTimeout(() => {
            printWindow.focus();
            printWindow.print();
        }, 500);
    }, 1000);
});

// Initialize the preview
updatePreview();
