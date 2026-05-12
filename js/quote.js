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
				nameInput.setCustomValidity('Invalid');
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
			var coverageSelected = false;
			for (var i = 0; i < coverageRadios.length; i++) {
				if (coverageRadios[i].checked) coverageSelected = true;
			}
			if (!coverageSelected && coverageRadios.length > 0) {
				coverageRadios[0].setCustomValidity('Invalid');
			}
			if (!homeForm.checkValidity()) {
				event.preventDefault();
				event.stopPropagation();
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
			}
			lifeForm.classList.add('was-validated');
		}, false);
	}
});
