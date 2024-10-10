function openSettingsModal() {
	document.getElementById("settingsModal").style.display = "block";
}

function closeSettingsModal() {
	document.getElementById("settingsModal").style.display = "none";
}

function togglePasswordFields() {
	const passwordFields = document.getElementById("passwordFields");
	passwordFields.style.display =
		passwordFields.style.display === "none" ? "block" : "none";
}

function updatePassword() {
	const currentPassword = document.getElementById("currentPassword").value;
	const newPassword = document.getElementById("newPassword").value;
	const confirmPassword = document.getElementById("confirmPassword").value;

	if (newPassword !== confirmPassword) {
		alert("New passwords do not match!");
		return;
	}

	// Here you would typically make an API call to update the password
	// For demonstration, we'll just show an alert
	alert("Password updated successfully!");
	togglePasswordFields();
}

// Handle sidebar navigation
document.querySelectorAll(".sidebar-item").forEach((item) => {
	item.addEventListener("click", function () {
		// Remove active class from all items and sections
		document
			.querySelectorAll(".sidebar-item")
			.forEach((i) => i.classList.remove("active"));
		document
			.querySelectorAll(".content-section")
			.forEach((s) => s.classList.remove("active"));

		// Add active class to clicked item
		this.classList.add("active");

		// Show corresponding section
		const sectionId = this.getAttribute("data-section");
		document.getElementById(sectionId).classList.add("active");
	});
});

// Close modal when clicking outside
window.onclick = function (event) {
	if (event.target == document.getElementById("settingsModal")) {
		closeSettingsModal();
	}
};
