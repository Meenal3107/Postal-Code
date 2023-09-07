

$(document).ready(function() {
  const usRegex = /^\d{5}(?:-\d{4})?$/;  
  const canadaRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;

  const countries = ["Afghanistan","Åland Islands","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Aruba","Ascension Island","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bonaire, Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Brazil","British Antarctic Territory","British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo (Brazzaville)","Congo, Democratic Republic","Cook Islands","Costa Rica","Côte d'Ivoire (Ivory Coast)","Croatia","Cuba","Curaçao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","El Salvador","Egypt","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern and Antarctic Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Heard and McDonald Islands","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea, North","Korea, South","Kosovo","Kuwait","Kyrgyzstan","Latvia","Laos","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Maldives","Malaysia","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Martinique","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn Islands","Poland","Portugal","Puerto Rico","Qatar","Réunion","Romania","Russia","Saint Barthélemy","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","South Korea","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tokelau","Tonga","Trinidad and Tobago","Tristan da Cunha","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","U.S. Virgin Islands","Uzbekistan","Vanuatu","Vatican","Venezuela","Vietnam","Wallis and Futuna","Yemen","Zambia","Zimbabwe"];
  
  const countrySelect = $("#country-select");

  const placeholderOption = $("<option>").val("").text("Select Country");
  countrySelect.append(placeholderOption);
  
  countries.forEach(country => {
    const option = $("<option>").val(country.replace(" ", "-")).text(country);
    countrySelect.append(option);
  });

  var xy = true;
  
  $("#postal-form").submit(function(event) {
    event.preventDefault();

    if (xy) {
      var postalCode = $("#postal-code").val();
      var selectedCountry = $("#country-select").val();

      console.log("Selected Country:", selectedCountry);

      if (usRegex.test(postalCode) || canadaRegex.test(postalCode)) {
        $("#country-dropdown").hide();
        alert("Valid postal code.");
        this.submit(); 
      } else {
        xy = false;
        // alert("Invalid postal code. Please select your country");
        $("#country-dropdown").show();
      }
    }
  });

  // Handle the form submission when xy is false
  $("#postal-form").submit(function(event) {
    if (!xy) {
      validatePostalCode();
      event.preventDefault(); // Prevent the default form submission
    }
  });

  function validatePostalCode() {
    var postalCode = $("#postal-code").val();
    var selectedCountry = $("#country-select").val();
  
    if (selectedCountry === "") {
      alert("Invalid postal code. Please select your country");
      return; // Prevent further execution
    }
  
    $.ajax({
      url: "/validate-postal.php",
      type: "GET",
      data: {
        postal: postalCode,
        country: selectedCountry
      },
      async: true,
      success: function(response) {
        console.log("Response from validate-postal.php:", response);
  
        if (response === "valid") {
          console.log("Form should be submitted now.");
          alert("Valid postal code for the selected country.");
          $("#postal-form").get(0).submit();
        } else {
          alert("Postal code is not valid for the selected country.");
        }
      },
      error: function() {
        alert("An error occurred while validating the postal code.");
      }
    });
  }
});






















