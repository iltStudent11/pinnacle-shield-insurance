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
			} else {
				// Calculate home insurance quote and show summary card
				event.preventDefault();
				var nameInput = document.getElementById('homeFullName');
				var homeValueInput = document.getElementById('homeValue');
				var yearBuiltInput = document.getElementById('yearBuilt');
				var homeValue = parseInt(homeValueInput.value, 10);
				var yearBuilt = parseInt(yearBuiltInput.value, 10);
				// Monthly base rate: Home Value x 0.003 / 12
				var baseRate = (homeValue * 0.003) / 12;
				// Year Built factor
				var yearBuiltFactor = 1.0;
				if (yearBuilt < 1970) {
					yearBuiltFactor = 1.4;
				} else if (yearBuilt >= 1970 && yearBuilt <= 1999) {
					yearBuiltFactor = 1.1;
				} else if (yearBuilt >= 2000) {
					yearBuiltFactor = 1.0;
				}
				// Construction factor
				var constructionType = document.getElementById('constructionType');
				var constructionFactor = 1.0;
				if (constructionType && constructionType.value) {
					if (constructionType.value === 'Wood') {
						constructionFactor = 1.2;
					} else if (constructionType.value === 'Brick') {
						constructionFactor = 1.0;
					} else if (constructionType.value === 'Concrete') {
						constructionFactor = 0.9;
					} else if (constructionType.value === 'Steel') {
						constructionFactor = 0.85;
					}
				}
				// Size factor: $0.01 per square foot per month
				var sqftInput = document.getElementById('squareFootage');
				var sqft = parseInt(sqftInput.value, 10) || 0;
				var sizeFactor = sqft * 0.01;
				// Security Discount: if security system selected, x0.95
				var securitySystem = document.getElementById('securitySystem');
				var securityDiscount = 1.0;
				if (securitySystem && securitySystem.value && securitySystem.value.toLowerCase() === 'yes') {
					securityDiscount = 0.95;
				}
				// Sprinkler Discount: if sprinklers present, x0.92
				var sprinklerSystem = document.getElementById('sprinklerSystem');
				var sprinklerDiscount = 1.0;
				if (sprinklerSystem && sprinklerSystem.value && sprinklerSystem.value.toLowerCase() === 'yes') {
					sprinklerDiscount = 0.92;
				}
				// Coverage Level factor
				var coverageRadios = document.getElementsByName('homeCoverageLevel');
				var coverageLevelFactor = 1.0;
				for (var i = 0; i < coverageRadios.length; i++) {
					if (coverageRadios[i].checked) {
						if (coverageRadios[i].value === "Basic") {
							coverageLevelFactor = 0.8;
						} else if (coverageRadios[i].value === "Standard") {
							coverageLevelFactor = 1.0;
						} else if (coverageRadios[i].value === "Premium") {
							coverageLevelFactor = 1.4;
						}
					}
				}
				var monthly = ((((baseRate * yearBuiltFactor * constructionFactor) + sizeFactor) * securityDiscount) * sprinklerDiscount) * coverageLevelFactor;
				var annual = monthly * 12;
				var customerName = nameInput.value.trim();
				// Remove any previous summary card
				var oldCard = document.getElementById('home-quote-summary-card');
				if (oldCard) oldCard.remove();
				// Create card
				var card = document.createElement('div');
				card.id = 'home-quote-summary-card';
				card.className = 'card shadow-lg my-4';
				card.style.maxWidth = '400px';
				card.style.margin = '0 auto';
				card.innerHTML = `
					<div class="card-header bg-primary text-white text-center">
						<h5 class="mb-0">Quote Summary</h5>
					</div>
					<div class="card-body text-center">
						<p class="mb-2"><strong>Customer:</strong> ${customerName}</p>
						<p class="mb-2"><strong>Insurance Type:</strong> Home</p>
						<p class="mb-2"><strong>Monthly Premium:</strong> <span style="font-size:1.2em;color:#0d6efd;">${monthly.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span></p>
						<p class="mb-2"><strong>Annual Premium:</strong> <span style="font-size:1.2em;color:#198754;">${annual.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span></p>
					</div>
				`;
				// Insert after the form
				homeForm.parentNode.insertBefore(card, homeForm.nextSibling);
				card.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
			homeForm.classList.add('was-validated');
		}, false);
	}

	// Auto Insurance form validation and quote calculation
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
						} else {
								// Calculate quote and show summary card
								event.preventDefault();
								var baseRate = 75;
								var ageFactor = 1.0;
								if (age < 25) {
									ageFactor = 1.5;
								} else if (age > 65) {
									ageFactor = 1.3;
								}

								// Vehicle age factor
								var vehicleYearInput = document.getElementById('vehicleYear');
								var vehicleYear = parseInt(vehicleYearInput.value, 10);
								var currentYear = new Date().getFullYear();
								var vehicleAge = currentYear - vehicleYear;
								var vehicleAgeFactor = 1.0;
								if (vehicleAge < 3) {
								    vehicleAgeFactor = 1.3;
								} else if (vehicleAge <= 10) {
								    vehicleAgeFactor = 1.0;
								} else if (vehicleAge > 10) {
								    vehicleAgeFactor = 0.8;
								}

								// Determine mileage factor
								var mileageValue = annualMileage.value;
								var mileageFactor = 1.0;
								if (mileageValue === "Under 5,000") {
									mileageFactor = 0.8;
								} else if (mileageValue === "5,000–10,000") {
									mileageFactor = 1.0;
								} else if (mileageValue === "10,001–15,000") {
									mileageFactor = 1.1;
								} else if (mileageValue === "15,001–20,000") {
									mileageFactor = 1.3;
								} else if (mileageValue === "Over 20,000") {
									mileageFactor = 1.5;
								}
								// Determine driving record factor
								var drivingRecordValue = drivingRecord.value;
								var drivingRecordFactor = 1.0;
								if (drivingRecordValue === "Clean") {
									drivingRecordFactor = 1.0;
								} else if (drivingRecordValue === "1 Ticket") {
									drivingRecordFactor = 1.2;
								} else if (drivingRecordValue === "2+ Tickets") {
									drivingRecordFactor = 1.5;
								} else if (drivingRecordValue === "Accident in Last 3 Years") {
									drivingRecordFactor = 1.8;
								}
								// Determine coverage level factor
								var coverageRadios = document.getElementsByName('coverageLevel');
								var coverageLevelFactor = 1.0;
								for (var i = 0; i < coverageRadios.length; i++) {
									if (coverageRadios[i].checked) {
										if (coverageRadios[i].value === "Basic") {
											coverageLevelFactor = 0.8;
										} else if (coverageRadios[i].value === "Standard") {
											coverageLevelFactor = 1.0;
										} else if (coverageRadios[i].value === "Premium") {
											coverageLevelFactor = 1.4;
										}
									}
								}
								var monthly = baseRate * ageFactor * vehicleAgeFactor * mileageFactor * drivingRecordFactor * coverageLevelFactor;
								var annual = monthly * 12;
								var customerName = nameInput.value.trim();
								// Remove any previous summary card
								var oldCard = document.getElementById('auto-quote-summary-card');
								if (oldCard) oldCard.remove();
								// Create card
								var card = document.createElement('div');
								card.id = 'auto-quote-summary-card';
								card.className = 'card shadow-lg my-4';
								card.style.maxWidth = '400px';
								card.style.margin = '0 auto';
								card.innerHTML = `
									<div class="card-header bg-primary text-white text-center">
										<h5 class="mb-0">Quote Summary</h5>
									</div>
									<div class="card-body text-center">
										<p class="mb-2"><strong>Customer:</strong> ${customerName}</p>
										<p class="mb-2"><strong>Insurance Type:</strong> Auto</p>
										<p class="mb-2"><strong>Monthly Premium:</strong> <span style="font-size:1.2em;color:#0d6efd;">${monthly.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span></p>
										<p class="mb-2"><strong>Annual Premium:</strong> <span style="font-size:1.2em;color:#198754;">${annual.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span></p>
									</div>
								`;
								// Insert after the form
								autoForm.parentNode.insertBefore(card, autoForm.nextSibling);
								card.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
