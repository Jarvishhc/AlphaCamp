function toRoman(number) {
  // Store basic Roman numbers into an Object
  const ROAM_NUMBER = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M'
  }

  // Separate intervals based on the basic Roman numbers
  if (Object.keys(ROAM_NUMBER).some(item => item === number.toString())) {
    return ROAM_NUMBER[number]
  } else if (number > 1000 && number < 4000) {
    return calculateOverThousand(1000, 4000, number, ROAM_NUMBER)
  } else if (number > 500 && number < 1000) {
    return checkNine(500, 1000, number, ROAM_NUMBER)
  } else if (number > 100 && number < 500) {
    return checkFour(100, 500, number, ROAM_NUMBER)
  } else if (number > 50 && number < 100) {
    return checkNine(50, 100, number, ROAM_NUMBER)
  } else if (number > 10 && number < 50) {
    return checkFour(10, 50, number, ROAM_NUMBER)
  } else if (number > 5 && number < 10) {
    return checkNine(5, 10, number, ROAM_NUMBER)
  } else if (number > 1 && number < 5) {
    return checkFour(1, 5, number, ROAM_NUMBER)
  } else return ''
}

// Check if the number equals to 4. 
// If true, concatenate the Roam numbers of the interval.
// If false, adding 'I' repeatedly based on the quotient.
// Invoke toRoman() again and pass the remainder to it.
function checkFour(start, end, number, roamNumber) {
  let quotient = Math.floor(number / start)
  let remainder = number % start
  let result = ''

  if (quotient === 4) {
    result = roamNumber[start] + roamNumber[end]
  } else {
    for (let i = 0; i < quotient; i++) {
      result += roamNumber[start]
    }
  }
  result += toRoman(remainder)
  return result
}

// Check if the number equals to 9. 
// Purpose of "remainder % prevStart" is to ensure we only have a single digit of remainder
function checkNine(start, end, number, roamNumber) {
  let quotient = Math.floor(number / start)
  let remainder = number % start
  let prevStart = end / 10
  let result = ''

  if (Math.floor(remainder / prevStart) === 4) {
    result = roamNumber[prevStart] + roamNumber[end] + toRoman(remainder % prevStart)
  } else {
    for (let i = 0; i < quotient; i++) {
      result += roamNumber[start]
    }
    result += toRoman(remainder)
  }
  return result
}

// If the number is over one thousand, simply add 'M'repeatedly according to quotient.
// Invoke toRman() again for the rest of digits
function calculateOverThousand(start, end, number, roamNumber) {
  let quotient = Math.floor(number / start)
  let remainder = number % start
  let result = ''

  for (let i = 0; i < quotient; i++) {
    result += roamNumber[start]
  }
  result += toRoman(remainder)
  return result
}


//////// 以下是測試程式，請勿更動 /////////
const expect = (name, value, result) => {
  if (value === result) { return true; }

  throw new Error(`${name} failed successfully`);
};

expect('toRoman(1)', toRoman(1), 'I');
expect('toRoman(2)', toRoman(2), 'II');
expect('toRoman(3)', toRoman(3), 'III');
expect('toRoman(4)', toRoman(4), 'IV');
expect('toRoman(5)', toRoman(5), 'V');
expect('toRoman(6)', toRoman(6), 'VI');
expect('toRoman(9)', toRoman(9), 'IX');
expect('toRoman(27)', toRoman(27), 'XXVII');
expect('toRoman(48)', toRoman(48), 'XLVIII');
expect('toRoman(59)', toRoman(59), 'LIX');
expect('toRoman(93)', toRoman(93), 'XCIII');
expect('toRoman(141)', toRoman(141), 'CXLI');
expect('toRoman(163)', toRoman(163), 'CLXIII');
expect('toRoman(402)', toRoman(402), 'CDII');
expect('toRoman(575)', toRoman(575), 'DLXXV');
expect('toRoman(911)', toRoman(911), 'CMXI');
expect('toRoman(1024)', toRoman(1024), 'MXXIV');
expect('toRoman(3000)', toRoman(3000), 'MMM');

console.log('all pass!');