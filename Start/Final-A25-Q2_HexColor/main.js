(function () {
  // ========== Functions ==========
  // Check digits of Hex color code. Add a '0' in the beginning, if contains only 1 digit.
  function checkDigits(color) {
    if (color.length === 1) {
      color = '0' + color
    }
    return color
  }

  // ========== Declare variables ==========
  const rangeRed = document.querySelector('#rangeRed')
  const octalRed = rangeRed.nextElementSibling

  const rangeGreen = document.querySelector('#rangeGreen')
  const octalGreen = rangeGreen.nextElementSibling

  const rangeBlue = document.querySelector('#rangeBlue')
  const octalBlue = rangeBlue.nextElementSibling
  const body = document.querySelector('body')
  const displayHexCode = document.querySelector('.display-hex-code')

  let red = '00'
  let green = '00'
  let blue = '00'

  octalRed.innerHTML = rangeRed.value
  octalGreen.innerHTML = rangeGreen.value
  octalBlue.innerHTML = rangeBlue.value
  displayHexCode.innerHTML = `#${red}${green}${blue}`

  // ========== Event Listener ==========
  // Linsten to the range of red color.
  rangeRed.addEventListener('input', (event) => {
    octalRed.innerHTML = rangeRed.value
    // Convert the value to Hex number
    red = Number(rangeRed.value).toString(16)
    // Ensure the Hex color contains 2 digits in order to dispaly right color
    red = checkDigits(red)

    body.style.backgroundColor = `#${red}${green}${blue}`
    displayHexCode.innerHTML = `#${red}${green}${blue}`
  })

  // Linsten to the range of green color.
  rangeGreen.addEventListener('input', (event) => {
    octalGreen.innerHTML = rangeGreen.value
    // Convert the value to Hex number
    green = Number(rangeGreen.value).toString(16)
    // Ensure the Hex color contains 2 digits in order to dispaly right color
    green = checkDigits(green)

    body.style.backgroundColor = `#${red}${green}${blue}`
    displayHexCode.innerHTML = `#${red}${green}${blue}`
  })

  // Linsten to the range of blue color.
  rangeBlue.addEventListener('input', (event) => {
    octalBlue.innerHTML = rangeBlue.value
    // Convert the value to Hex number
    blue = Number(rangeBlue.value).toString(16)
    // Ensure the Hex color contains 2 digits in order to dispaly right color
    blue = checkDigits(blue)

    body.style.backgroundColor = `#${red}${green}${blue}`
    displayHexCode.innerHTML = `#${red}${green}${blue}`
  })
})();