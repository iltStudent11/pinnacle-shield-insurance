// Hide forms on page load and hide other forms when one is shown
document.addEventListener('DOMContentLoaded', function () {
	var autoCard = document.querySelector('.auto-insurance-card');
	var homeCard = document.querySelector('.home-insurance-card');
	var lifeCard = document.querySelector('.life-insurance-card');
	var autoFormContainer = document.getElementById('autoInsuranceFormContainer');
	var homeFormContainer = document.getElementById('homeInsuranceFormContainer');
	var lifeFormContainer = document.getElementById('lifeInsuranceFormContainer');

	if (autoCard && autoFormContainer) {
		autoCard.addEventListener('click', function () {
			autoFormContainer.style.display = 'block';
			if (homeFormContainer) homeFormContainer.style.display = 'none';
			if (lifeFormContainer) lifeFormContainer.style.display = 'none';
			autoFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	}
	if (homeCard && homeFormContainer) {
		homeCard.addEventListener('click', function () {
			homeFormContainer.style.display = 'block';
			if (autoFormContainer) autoFormContainer.style.display = 'none';
			if (lifeFormContainer) lifeFormContainer.style.display = 'none';
			homeFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	}
	if (lifeCard && lifeFormContainer) {
		lifeCard.addEventListener('click', function () {
			lifeFormContainer.style.display = 'block';
			if (homeFormContainer) homeFormContainer.style.display = 'none';
			if (autoFormContainer) autoFormContainer.style.display = 'none';
			lifeFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	}

	// Home Insurance form validation
	var homeForm = document.getElementById('homeInsuranceForm');
	if (homeForm) {
		homeForm.addEventListener('submit', function (event) {
			// Custom ZIP code validation (5 digits)
			var zipInput = document.getElementById('homeZipCode');
			var zipValid = /^\d{5}$/.test(zipInput.value);
			if (!zipValid) {
				zipInput.setCustomValidity('Invalid');
			} else {
				zipInput.setCustomValidity('');
			}
			// Validate Full Name (min 2 chars)
			var nameInput = document.getElementById('homeFullName');
			if (nameInput.value.trim().length < 2) {
				nameInput.setCustomValidity('Invalid');
			} else {
				nameInput.setCustomValidity('');
			}
			// Validate Age (18-100)
			var ageInput = document.getElementById('homeAge');
			var age = parseInt(ageInput.value, 10);
			if (isNaN(age) || age < 18 || age > 100) {
				ageInput.setCustomValidity('Invalid');
			} else {
				ageInput.setCustomValidity('');
			}
			// Validate Home Value (>= 50000)
			var homeValueInput = document.getElementById('homeValue');
			var homeValue = parseInt(homeValueInput.value, 10);
			if (isNaN(homeValue) || homeValue < 50000) {
				homeValueInput.setCustomValidity('Invalid');
			} else {
				homeValueInput.setCustomValidity('');
			}
			// Validate Year Built (1900-2026)
			var yearBuiltInput = document.getElementById('yearBuilt');
			var yearBuilt = parseInt(yearBuiltInput.value, 10);
			if (isNaN(yearBuilt) || yearBuilt < 1900 || yearBuilt > 2026) {
				yearBuiltInput.setCustomValidity('Invalid');
			} else {
				yearBuiltInput.setCustomValidity('');
			}
			// Validate Square Footage (500-10000)
			var sqftInput = document.getElementById('squareFootage');
			var sqft = parseInt(sqftInput.value, 10);
			if (isNaN(sqft) || sqft < 500 || sqft > 10000) {
				sqftInput.setCustomValidity('Invalid');
			} else {
				sqftInput.setCustomValidity('');
			}
			// Validate Construction Type
			var constructionType = document.getElementById('constructionType');
			if (!constructionType.value) {
				constructionType.setCustomValidity('Invalid');
			} else {
				constructionType.setCustomValidity('');
			}
			// Validate Coverage Level (radio)
			var coverageRadios = document.getElementsByName('homeCoverageLevel');
			var coverageSelected = false;
			for (var i = 0; i < coverageRadios.length; i++) {
				if (coverageRadios[i].checked) coverageSelected = true;
			}
			if (!coverageSelected) {
				coverageRadios[0].setCustomValidity('Invalid');
			} else {
				coverageRadios[0].setCustomValidity('');
			}
			if (!homeForm.checkValidity()) {
				event.preventDefault();
				event.stopPropagation();
				// Collect all invalid fields, including radio groups
				var invalidFields = Array.from(homeForm.querySelectorAll(':invalid'));
				var seen = new Set();
				var messages = invalidFields.map(function(field) {
					// For radio/checkbox groups, only show one message per group
					var name = field.name || field.id;
					if ((field.type === 'radio' || field.type === 'checkbox') && name) {
						if (seen.has(name)) return null;
						seen.add(name);
					}
					var label = homeForm.querySelector('label[for="' + field.id + '"]');
					var labelText = label ? label.textContent : name;
					return '- ' + labelText;
				}).filter(Boolean);
				if (messages.length > 0) {
					alert('Please correct the following fields:\n' + messages.join('\n'));
				}
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
				nameInput.setCustomValidity('Invalid');
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
			var coverageSelected = false;
			for (var i = 0; i < coverageRadios.length; i++) {
				if (coverageRadios[i].checked) coverageSelected = true;
			}
			if (!coverageSelected) {
				coverageRadios[0].setCustomValidity('Invalid');
			} else {
				coverageRadios[0].setCustomValidity('');
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
				// Collect all invalid fields
				var invalidFields = Array.from(autoForm.querySelectorAll(':invalid'));
				var seen = new Set();
				var messages = invalidFields.map(function(field) {
					var name = field.name || field.id;
					if ((field.type === 'radio' || field.type === 'checkbox') && name) {
						if (seen.has(name)) return null;
						seen.add(name);
					}
					var label = autoForm.querySelector('label[for="' + field.id + '"]');
					var labelText = label ? label.textContent : name;
					return '- ' + labelText;
				}).filter(Boolean);
				if (messages.length > 0) {
					alert('Please correct the following fields:\n' + messages.join('\n'));
				}
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
				nameInput.setCustomValidity('Invalid');
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
			if (!smokerSelected) {
				smokerRadios[0].setCustomValidity('Invalid');
			} else {
				smokerRadios[0].setCustomValidity('');
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
			var coverageSelected = false;
			for (var i = 0; i < coverageRadios.length; i++) {
				if (coverageRadios[i].checked) coverageSelected = true;
			}
			if (!coverageSelected) {
				coverageRadios[0].setCustomValidity('Invalid');
			} else {
				coverageRadios[0].setCustomValidity('');
			}
			if (!lifeForm.checkValidity()) {
				event.preventDefault();
				event.stopPropagation();
				// Collect all invalid fields
				var invalidFields = Array.from(lifeForm.querySelectorAll(':invalid'));
				var seen = new Set();
				var messages = invalidFields.map(function(field) {
					var name = field.name || field.id;
					if ((field.type === 'radio' || field.type === 'checkbox') && name) {
						if (seen.has(name)) return null;
						seen.add(name);
					}
					var label = lifeForm.querySelector('label[for="' + field.id + '"]');
					var labelText = label ? label.textContent : name;
					return '- ' + labelText;
				}).filter(Boolean);
				if (messages.length > 0) {
					alert('Please correct the following fields:\n' + messages.join('\n'));
				}
			}
			lifeForm.classList.add('was-validated');
		}, false);
	}
});
