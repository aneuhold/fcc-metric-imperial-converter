/*
*
*
*       Complete the handler logic below
*       
*       
*/

/**
* A class for converting things it seems like.
**/
function ConvertHandler() {
  
  const allowedUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
  
  /**
  * Extracts the number from the given value and unit combination.
  **/
  this.getNum = function(input) {
    let result;
    
    // Test if there are no numbers involved
    let numRegex = /[\d]/;
    if (!numRegex.test(input)) {
      return 1;
    }
    
    // Set double fraction testing regex
    let multiFrac = /\/[^\/]*\/+/;
    
    // Test if there are multiple fractions
    if (multiFrac.test(input)) {
      return 'invalid number';
    }
    
    // Set fraction testing regex
    let fracRegex = /(\d+,?)+\.?\d*\/(\d+,?)+\.?\d*/;
    
    // Test if there is a fraction
    if (fracRegex.test(input)) {
      
      // Extract the fraction
      let fractionString = input.match(fracRegex)[0];
      
      // Extract each number
      let fractionArray = fractionString.split('/');
      let numerator = fractionArray[0];
      let denominator = fractionArray[1];
      
      // Turn the fraction into a value
      result = numerator / denominator;
      
    } else {
      
      /* Set regex to some amount of numbers, optional decimal, then one or more numbers.
      Also just takes the first value of the array which is returned and assigns it to the result.*/
      result = input.match(/(\d+,?)+\.?\d*/)[0];
      
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    
    // Pull out the unit from the input
    let unitString = input.match(/[A-Za-z]+/)[0]
    
    // Check for the input unit to match one of the allowed units.
    if (allowedUnits.includes(unitString)) {
      return unitString;
    } else {
      return 'invalid unit';
    }
    
    return result;
  };
  
  //var input = ['gal','l','mi','km','lbs','kg'];
  //var expect = ['l','gal','km','mi','kg','lbs'];
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal': result = 'l'; break;
      case 'l': result = 'gal'; break;
      case 'mi': result = 'km'; break;
      case 'km': result = 'mi'; break;
      case 'lbs': result = 'kg'; break;
      case 'kg': result = 'lbs'; break;
      default: result = 'invalid input unit'
    }
    return result;
  };

  // let input = ['gal','l','mi','km','lbs','kg'];
  // let expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
  this.spellOutUnit = function(unit) {
    let result;
    switch (unit.toLowerCase()) {
      case 'gal': result = 'gallons'; break;
      case 'l': result = 'liters'; break;
      case 'mi': result = 'miles'; break;
      case 'km': result = 'kilometers'; break;
      case 'lbs': result = 'pounds'; break;
      case 'kg': result = 'kilograms'; break;
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initNum == 'invalid number' && initUnit == 'invalid unit') {
      return 'invalid input number and input unit';
    } else if (initNum == 'invalid number') {
      return 'invalid input number'
    } else if (initUnit == 'invalid unit') {
      return 'invalid input unit';
    }
    switch (initUnit.toLowerCase()) {
      case 'gal': result = initNum * galToL; break;
      case 'l': result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'mi': result = initNum * miToKm; break;
      case 'km': result = initNum / miToKm; break;
      default: result = 'invalid input unit or number';
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    if (initNum == 'invalid number' && initUnit == 'invalid unit') {
      result = 'Invalid unit and number'
    } else {
      
      // Return the number so that it has a fixed number of decimal places, up to 5.
      console.log(returnNum);
      let newReturnNum = Math.pow(10, -5) * Math.round(returnNum * Math.pow(10, 5));
      
      result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + newReturnNum + 
      ' ' + this.spellOutUnit(returnUnit);
    }
    return result;
  };
   
}

module.exports = ConvertHandler;
