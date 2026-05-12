// Hide forms on page load and hide other forms when one is shown
document.addEventListener('DOMContentLoaded', function () {
					// Auto-select insurance type if set in localStorage (from homepage)
					var selectedType = localStorage.getItem('selectedInsuranceType');
					if (selectedType) {
						// Remove after reading so it doesn't persist
						localStorage.removeItem('selectedInsuranceType');
						setTimeout(function() {
							if (selectedType === 'auto' && document.querySelector('.auto-insurance-card')) {
								document.querySelector('.auto-insurance-card').click();
							} else if (selectedType === 'home' && document.querySelector('.home-insurance-card')) {
								document.querySelector('.home-insurance-card').click();
							} else if (selectedType === 'life' && document.querySelector('.life-insurance-card')) {
								document.querySelector('.life-insurance-card').click();
							}
						}, 200); // Delay to ensure DOM is ready
					}
				// Utility to hide invalid-feedback and alert for a field
				function hideFeedbackForField(field) {
					if (!field) return;
					// For regular fields
					var feedback = field.parentElement.querySelector('.invalid-feedback');
					if (feedback) {
						feedback.classList.remove('d-block');
						feedback.classList.add('d-none');
					}
					field.classList.remove('is-invalid');
					field.classList.remove('is-valid');
					// Remove custom validity so browser validation is updated
					if (typeof field.setCustomValidity === 'function') {
						field.setCustomValidity('');
					}
					// Also remove is-invalid from parent radio group if present
					var group = field.closest('.form-radio-group');
					if (group) group.classList.remove('is-invalid');
				}

				// For all forms, add event listeners to remove invalid-feedback and alert on input/change
				var allForms = ['autoInsuranceForm', 'homeInsuranceForm', 'lifeInsuranceForm'];
				allForms.forEach(function(formId) {
					var form = document.getElementById(formId);
					if (!form) return;
					// For all input, select, textarea
					var fields = form.querySelectorAll('input, select, textarea');
					fields.forEach(function(field) {
						// For text, number, select, etc.
						field.addEventListener('input', function() {
							hideFeedbackForField(field);
						});
						field.addEventListener('change', function() {
							hideFeedbackForField(field);
						});
					});
					// For radio groups (including coverage and smoker)
					var radioGroups = form.querySelectorAll('.form-radio-group');
					radioGroups.forEach(function(group) {
						var radios = group.querySelectorAll('input[type="radio"]');
						radios.forEach(function(radio) {
							radio.addEventListener('change', function() {
								// Hide feedback for the group
								var feedback = group.querySelector('.invalid-feedback');
								if (feedback) {
									feedback.classList.remove('d-block');
									feedback.classList.add('d-none');
								}
								radios.forEach(function(r) {
									r.classList.remove('is-invalid');
									r.classList.remove('is-valid');
								});
								group.classList.remove('is-invalid');
							});
						});
					});
					// For smoker radio group (life insurance)
					var smokerRadios = form.querySelectorAll('input[name="lifeSmoker"]');
					if (smokerRadios.length > 0) {
						smokerRadios.forEach(function(radio) {
							radio.addEventListener('change', function() {
								var smokerGroup = radio.closest('.row') || radio.parentElement.parentElement;
								var smokerFeedback = null;
								if (smokerGroup) {
									smokerFeedback = smokerGroup.querySelector('.invalid-feedback');
								}
								if (!smokerFeedback) {
									smokerFeedback = radio.parentElement.querySelector('.invalid-feedback');
								}
								if (smokerFeedback) {
									smokerFeedback.classList.remove('d-block');
									smokerFeedback.classList.add('d-none');
								}
								smokerRadios.forEach(function(r) {
									r.classList.remove('is-invalid');
									r.classList.remove('is-valid');
								});
							});
						});
					}
				});
			// Utility to clear a form and its feedback
			function clearFormAndFeedback(form) {
				if (!form) return;
				form.reset();
				form.classList.remove('was-validated');
				// Remove custom validity and feedback for all inputs/selects
				var elements = form.querySelectorAll('input, select, textarea');
				elements.forEach(function(el) {
					el.setCustomValidity && el.setCustomValidity('');
					el.classList.remove('is-invalid');
					el.classList.remove('is-valid');
				});
				// Hide any .invalid-feedback
				var feedbacks = form.querySelectorAll('.invalid-feedback');
				feedbacks.forEach(function(fb) {
					fb.classList.remove('d-block');
					fb.classList.add('d-none');
				});
				// Remove is-invalid from custom radio groups
				var groups = form.querySelectorAll('.form-radio-group, .is-invalid');
				groups.forEach(function(g) { g.classList.remove('is-invalid'); });
			}
		// Progress bar stepper logic
		function setProgressStep(step) {
			const steps = document.querySelectorAll('.progressbar-wrapper .step .circle');
			const connectors = document.querySelectorAll('.progressbar-wrapper .progress-connector');
			steps.forEach((circle, idx) => {
				if (idx < step) {
					circle.style.background = '#0d6efd';
				} else {
					circle.style.background = '#6c757d';
				}
			});
			connectors.forEach((conn, idx) => {
				if (idx < step - 1) {
					conn.style.background = '#0d6efd';
				} else {
					conn.style.background = '#6c757d';
				}
			});
		}

		// Step 1: Select Type (default)
		setProgressStep(1);

		// When a card is clicked, move to Step 2
		var autoCard = document.querySelector('.auto-insurance-card');
		var homeCard = document.querySelector('.home-insurance-card');
		var lifeCard = document.querySelector('.life-insurance-card');
		if (autoCard) autoCard.addEventListener('click', function () { setProgressStep(2); });
		if (homeCard) homeCard.addEventListener('click', function () { setProgressStep(2); });
		if (lifeCard) lifeCard.addEventListener('click', function () { setProgressStep(2); });

		// When any form is submitted and valid, move to Step 3
		function advanceToStep3OnValid(form) {
			if (!form) return;
			form.addEventListener('submit', function (event) {
				if (form.checkValidity()) {
					setProgressStep(3);
				}
			});
		}
		advanceToStep3OnValid(document.getElementById('autoInsuranceForm'));
		advanceToStep3OnValid(document.getElementById('homeInsuranceForm'));
		advanceToStep3OnValid(document.getElementById('lifeInsuranceForm'));
	var autoCard = document.querySelector('.auto-insurance-card');
	var homeCard = document.querySelector('.home-insurance-card');
	var lifeCard = document.querySelector('.life-insurance-card');
	var autoFormContainer = document.getElementById('autoInsuranceFormContainer');
	var homeFormContainer = document.getElementById('homeInsuranceFormContainer');
	var lifeFormContainer = document.getElementById('lifeInsuranceFormContainer');

	if (autoCard && autoFormContainer) {
		autoCard.addEventListener('click', function () {
			autoFormContainer.style.display = 'block';
			if (homeFormContainer) {
				homeFormContainer.style.display = 'none';
				clearFormAndFeedback(document.getElementById('homeInsuranceForm'));
			}
			if (lifeFormContainer) {
				lifeFormContainer.style.display = 'none';
				clearFormAndFeedback(document.getElementById('lifeInsuranceForm'));
			}
			clearFormAndFeedback(document.getElementById('autoInsuranceForm'));
			autoFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	}
	if (homeCard && homeFormContainer) {
		homeCard.addEventListener('click', function () {
			homeFormContainer.style.display = 'block';
			if (autoFormContainer) {
				autoFormContainer.style.display = 'none';
				clearFormAndFeedback(document.getElementById('autoInsuranceForm'));
			}
			if (lifeFormContainer) {
				lifeFormContainer.style.display = 'none';
				clearFormAndFeedback(document.getElementById('lifeInsuranceForm'));
			}
			clearFormAndFeedback(document.getElementById('homeInsuranceForm'));
			homeFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	}
	if (lifeCard && lifeFormContainer) {
		lifeCard.addEventListener('click', function () {
			lifeFormContainer.style.display = 'block';
			if (homeFormContainer) {
				homeFormContainer.style.display = 'none';
				clearFormAndFeedback(document.getElementById('homeInsuranceForm'));
			}
			if (autoFormContainer) {
				autoFormContainer.style.display = 'none';
				clearFormAndFeedback(document.getElementById('autoInsuranceForm'));
			}
			clearFormAndFeedback(document.getElementById('lifeInsuranceForm'));
			lifeFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	}

	// Home Insurance form validation
	var homeForm = document.getElementById('homeInsuranceForm');
	if (homeForm) {
		homeForm.addEventListener('submit', function (event) {
			// Always clear all custom validity first
			var zipInput = document.getElementById('homeZipCode');
			var nameInput = document.getElementById('homeFullName');
			var ageInput = document.getElementById('homeAge');
			var homeValueInput = document.getElementById('homeValue');
			var yearBuiltInput = document.getElementById('yearBuilt');
			var sqftInput = document.getElementById('squareFootage');
			var constructionType = document.getElementById('constructionType');
			var coverageRadios = document.getElementsByName('homeCoverageLevel');
			[zipInput, nameInput, ageInput, homeValueInput, yearBuiltInput, sqftInput, constructionType].forEach(function(field) {
				if (field) field.setCustomValidity('');
			});
			for (var i = 0; i < coverageRadios.length; i++) {
				coverageRadios[i].setCustomValidity('');
			}
			// Custom ZIP code validation (5 digits)
			var zipValid = /^\d{5}$/.test(zipInput.value);
			if (!zipValid) {
				zipInput.setCustomValidity('Invalid');
			}
			// Validate Full Name (min 2 chars)
			if (nameInput.value.trim().length < 2) {
				nameInput.setCustomValidity('Full name must be at least 2 characters.');
			} else if (/[^a-zA-Z\s'-]/.test(nameInput.value.trim())) {
				nameInput.setCustomValidity('Full name cannot contain numbers or special characters.');
			}
			// Validate Age (18-100)
			var age = parseInt(ageInput.value, 10);
			if (isNaN(age) || age < 18 || age > 100) {
				ageInput.setCustomValidity('Invalid');
			}
			// Validate Home Value (>= 50000)
			var homeValue = parseInt(homeValueInput.value, 10);
			if (isNaN(homeValue) || homeValue < 50000) {
				homeValueInput.setCustomValidity('Invalid');
			}
			// Validate Year Built (1900-2026)
			var yearBuilt = parseInt(yearBuiltInput.value, 10);
			if (isNaN(yearBuilt) || yearBuilt < 1900 || yearBuilt > 2026) {
				yearBuiltInput.setCustomValidity('Invalid');
			}
			// Validate Square Footage (500-10000)
			var sqft = parseInt(sqftInput.value, 10);
			if (isNaN(sqft) || sqft < 500 || sqft > 10000) {
				sqftInput.setCustomValidity('Invalid');
			}
			// Validate Construction Type
			if (!constructionType.value) {
				constructionType.setCustomValidity('Invalid');
			}
			// Validate Coverage Level (radio)
			var coverageGroup = document.getElementById('coverageLevelGroup');
			var coverageSelected = false;
			for (var i = 0; i < coverageRadios.length; i++) {
				if (coverageRadios[i].checked) coverageSelected = true;
			}
			var feedback = coverageGroup ? coverageGroup.querySelector('.invalid-feedback') : null;
			if (!coverageSelected && coverageRadios.length > 0) {
				coverageRadios[0].setCustomValidity('Invalid');
				if (coverageGroup) coverageGroup.classList.add('is-invalid');
				if (feedback) { feedback.classList.remove('d-none'); feedback.classList.add('d-block'); }
			} else if (coverageRadios.length > 0) {
				for (var i = 0; i < coverageRadios.length; i++) {
					coverageRadios[i].classList.remove('is-invalid');
				}
				if (coverageGroup) coverageGroup.classList.remove('is-invalid');
				if (feedback) { feedback.classList.remove('d-block'); feedback.classList.add('d-none'); }
			}
			if (!homeForm.checkValidity()) {
				event.preventDefault();
				event.stopPropagation();
				// Show feedback for invalid fields
				var invalidFields = homeForm.querySelectorAll(':invalid');
				invalidFields.forEach(function(field) {
					field.classList.add('is-invalid');
					var feedback = field.parentElement.querySelector('.invalid-feedback');
					if (feedback) {
						feedback.classList.remove('d-none');
						feedback.classList.add('d-block');
					}
				});
			}
			homeForm.classList.add('was-validated');
		}, false);
	}

	// Auto Insurance form validation
	var autoForm = document.getElementById('autoInsuranceForm');
	if (autoForm) {
		autoForm.addEventListener('submit', function (event) {
			// Custom ZIP code validation (5 digits)
			var zipInput = document.getElementById('zipCode');
			var zipValid = /^\d{5}$/.test(zipInput.value);
			if (!zipValid) {
				zipInput.setCustomValidity('Invalid');
			} else {
				zipInput.setCustomValidity('');
			}
			// Validate Full Name (min 2 chars)
			var nameInput = document.getElementById('fullName');
			if (nameInput.value.trim().length < 2) {
				nameInput.setCustomValidity('Full name must be at least 2 characters.');
			} else if (/[^a-zA-Z\s'-]/.test(nameInput.value.trim())) {
				nameInput.setCustomValidity('Full name cannot contain numbers or special characters.');
			} else {
				nameInput.setCustomValidity('');
			}
			// Validate Age (16-100)
			var ageInput = document.getElementById('age');
			var age = parseInt(ageInput.value, 10);
			if (isNaN(age) || age < 16 || age > 100) {
				ageInput.setCustomValidity('Invalid');
			} else {
				ageInput.setCustomValidity('');
			}
			// Validate Vehicle Year (1990-2026)
			var vehicleYearInput = document.getElementById('vehicleYear');
			var vehicleYear = parseInt(vehicleYearInput.value, 10);
			if (isNaN(vehicleYear) || vehicleYear < 1990 || vehicleYear > 2026) {
				vehicleYearInput.setCustomValidity('Invalid');
			} else {
				vehicleYearInput.setCustomValidity('');
			}
			// Validate Vehicle Make
			var vehicleMake = document.getElementById('vehicleMake');
			if (!vehicleMake.value) {
				vehicleMake.setCustomValidity('Invalid');
			} else {
				vehicleMake.setCustomValidity('');
			}
			// Validate Vehicle Model
			var vehicleModel = document.getElementById('vehicleModel');
			if (!vehicleModel.value.trim()) {
				vehicleModel.setCustomValidity('Invalid');
			} else {
				vehicleModel.setCustomValidity('');
			}
			// Validate Driving Record
			var drivingRecord = document.getElementById('drivingRecord');
			if (!drivingRecord.value) {
				drivingRecord.setCustomValidity('Invalid');
			} else {
				drivingRecord.setCustomValidity('');
			}
			// Validate Coverage Level (radio)
			var coverageRadios = document.getElementsByName('coverageLevel');
			var coverageGroup = document.getElementById('coverageLevelGroup');
			var coverageSelected = false;
			for (var i = 0; i < coverageRadios.length; i++) {
				if (coverageRadios[i].checked) coverageSelected = true;
			}
			var feedback = coverageGroup ? coverageGroup.querySelector('.invalid-feedback') : null;
			if (!coverageSelected && coverageRadios.length > 0) {
				coverageRadios[0].setCustomValidity('Invalid');
				if (coverageGroup) coverageGroup.classList.add('is-invalid');
				if (feedback) { feedback.classList.remove('d-none'); feedback.classList.add('d-block'); }
			} else if (coverageRadios.length > 0) {
				for (var i = 0; i < coverageRadios.length; i++) {
					coverageRadios[i].classList.remove('is-invalid');
				}
				if (coverageGroup) coverageGroup.classList.remove('is-invalid');
				if (feedback) { feedback.classList.remove('d-block'); feedback.classList.add('d-none'); }
			}
			// Validate Annual Mileage
			var annualMileage = document.getElementById('annualMileage');
			if (!annualMileage.value) {
				annualMileage.setCustomValidity('Invalid');
			} else {
				annualMileage.setCustomValidity('');
			}
			if (!autoForm.checkValidity()) {
				event.preventDefault();
				event.stopPropagation();
				// Show feedback for invalid fields
				var invalidFields = autoForm.querySelectorAll(':invalid');
				invalidFields.forEach(function(field) {
					field.classList.add('is-invalid');
					var feedback = field.parentElement.querySelector('.invalid-feedback');
					if (feedback) {
						feedback.classList.remove('d-none');
						feedback.classList.add('d-block');
					}
				});
			}
			autoForm.classList.add('was-validated');
		}, false);
	}

	// Life Insurance form validation
	var lifeForm = document.getElementById('lifeInsuranceForm');
	if (lifeForm) {
		lifeForm.addEventListener('submit', function (event) {
			// Custom ZIP code validation (5 digits)
			var zipInput = document.getElementById('lifeZipCode');
			var zipValid = /^\d{5}$/.test(zipInput.value);
			if (!zipValid) {
				zipInput.setCustomValidity('Invalid');
			} else {
				zipInput.setCustomValidity('');
			}
			// Validate Full Name (min 2 chars)
			var nameInput = document.getElementById('lifeFullName');
			if (nameInput.value.trim().length < 2) {
				nameInput.setCustomValidity('Full name must be at least 2 characters.');
			} else if (/[^a-zA-Z\s'-]/.test(nameInput.value.trim())) {
				nameInput.setCustomValidity('Full name cannot contain numbers or special characters.');
			} else {
				nameInput.setCustomValidity('');
			}
			// Validate Age (18-85)
			var ageInput = document.getElementById('lifeAge');
			var age = parseInt(ageInput.value, 10);
			if (isNaN(age) || age < 18 || age > 85) {
				ageInput.setCustomValidity('Invalid');
			} else {
				ageInput.setCustomValidity('');
			}
			// Validate Gender
			var gender = document.getElementById('lifeGender');
			if (!gender.value) {
				gender.setCustomValidity('Invalid');
			} else {
				gender.setCustomValidity('');
			}
			// Validate Smoker (radio)
			var smokerRadios = document.getElementsByName('lifeSmoker');
			var smokerSelected = false;
			for (var i = 0; i < smokerRadios.length; i++) {
				if (smokerRadios[i].checked) smokerSelected = true;
			}
			if (!smokerSelected && smokerRadios.length > 0) {
				smokerRadios[0].setCustomValidity('Invalid');
				for (var i = 0; i < smokerRadios.length; i++) {
					smokerRadios[i].classList.add('is-invalid');
				}
			} else if (smokerRadios.length > 0) {
				for (var i = 0; i < smokerRadios.length; i++) {
					smokerRadios[i].classList.remove('is-invalid');
				}
			}
			// Validate Coverage Amount
			var coverageAmount = document.getElementById('lifeCoverageAmount');
			if (!coverageAmount.value) {
				coverageAmount.setCustomValidity('Invalid');
			} else {
				coverageAmount.setCustomValidity('');
			}
			// Validate Exercise Frequency
			var exercise = document.getElementById('lifeExercise');
			if (!exercise.value) {
				exercise.setCustomValidity('Invalid');
			} else {
				exercise.setCustomValidity('');
			}
			// Validate Coverage Level (radio)
			var coverageRadios = document.getElementsByName('lifeCoverageLevel');
			var coverageGroup = document.getElementById('coverageLevelGroup');
			var coverageSelected = false;
			for (var i = 0; i < coverageRadios.length; i++) {
				if (coverageRadios[i].checked) coverageSelected = true;
			}
			var feedback = coverageGroup ? coverageGroup.querySelector('.invalid-feedback') : null;
			if (!coverageSelected && coverageRadios.length > 0) {
				coverageRadios[0].setCustomValidity('Invalid');
				if (coverageGroup) coverageGroup.classList.add('is-invalid');
				if (feedback) { feedback.classList.remove('d-none'); feedback.classList.add('d-block'); }
			} else if (coverageRadios.length > 0) {
				for (var i = 0; i < coverageRadios.length; i++) {
					coverageRadios[i].classList.remove('is-invalid');
				}
				if (coverageGroup) coverageGroup.classList.remove('is-invalid');
				if (feedback) { feedback.classList.remove('d-block'); feedback.classList.add('d-none'); }
			}
			if (!lifeForm.checkValidity()) {
				event.preventDefault();
				event.stopPropagation();
				// Show feedback for invalid fields
				var invalidFields = lifeForm.querySelectorAll(':invalid');
				invalidFields.forEach(function(field) {
					field.classList.add('is-invalid');
					var feedback = field.parentElement.querySelector('.invalid-feedback');
					if (feedback) {
						feedback.classList.remove('d-none');
						feedback.classList.add('d-block');
					}
				});
			}
			lifeForm.classList.add('was-validated');
		}, false);
	}
});
