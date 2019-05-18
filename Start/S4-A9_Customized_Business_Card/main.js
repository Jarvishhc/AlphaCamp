// Define a new object with default key and value
function inputInfo() {
  this.field = '',
    this.feedback = '',
    this.valid = false
}

const form = document.forms[0]
const bizCard = document.querySelector('.biz-card')
const themeChoice = document.querySelectorAll('input[name="theme-choice"]')

let name = new inputInfo();
let avatar = new inputInfo();
let bio = new inputInfo();

name.field = document.querySelector('#name')
name.feedback = name.field.nextElementSibling
avatar.field = document.querySelector('#avatar')
avatar.feedback = avatar.field.nextElementSibling
bio.field = document.querySelector('#bio')
bio.feedback = bio.field.nextElementSibling

// Detect whether any input event occurs
form.addEventListener('input', function (event) {
  const charLimit = 200

  // Display how many words are available
  if (event.target.id === 'bio') {
    if (event.target.value.length > charLimit) {
      bio.feedback.innerHTML = `${bio.field.value.length} words.`
      bio.feedback.classList.add('text-invalid')
    } else {
      bio.feedback.innerHTML = ` ${charLimit - event.target.value.length} words remain`
      bio.feedback.classList.remove('text-invalid')
    }
  }
})

// Detect whether submit button is clicked
form.addEventListener('submit', function (event) {
  event.preventDefault()

  // Assign a default image
  let imgSource = 'https://via.placeholder.com/150'

  // Check whether Name is typed. 
  if (name.field.value === '') {
    name.feedback.innerHTML = `Required!`
    name.feedback.classList.add('text-invalid')
    name.field.classList.add('error')
    name.valid = false
  } else {
    name.feedback.innerHTML = ''
    name.field.classList.remove('error')
    name.valid = true
  }

  // Display the image that user provided
  if (avatar.field.value !== '') {
    imgSource = avatar.field.value
  }

  // Check whether Bio is empty or has more than 200 words
  if (bio.field.value === '') {
    bio.feedback.innerHTML = `Required!`
    bio.feedback.classList.add('text-invalid')
    bio.field.classList.add('error')
    bio.valid = false
  } else if (bio.field.value.length > 200) {
    bio.feedback.innerHTML = `${bio.field.value.length} words. Must be less than 200 words!`
    bio.feedback.classList.add('text-invalid')
    bio.field.classList.add('error')
    bio.valid = false
  } else {
    bio.feedback.innerHTML = ''
    bio.field.classList.remove('error')
    bio.valid = true
  }

  // Check whether the data provided in Name and Bio is valid
  if (name.valid && bio.valid) {
    // Determine which theme is selected. 
    // Note: theme[0] = light-theme, theme[1] = dark-theme
    for (let i = 0; i < themeChoice.length; i++) {
      if (themeChoice[i].checked) {
        if (themeChoice[i].value === 'light-theme') {
          bizCard.classList.add('light-theme')
          bizCard.classList.remove('dark-theme')
        } else {
          bizCard.classList.add('dark-theme')
          bizCard.classList.remove('light-theme')
        }
      }
    }

    // If all data are valid, display the customized business card
    bizCard.innerHTML = `
      <img src=${imgSource} alt="avatar" class="squareimg float-right rounded5">
      <h2>${name.field.value}</h2>
      <p>${bio.field.value}</p>
    `
    // clear all fileds
    name.field.value = ''
    avatar.field.value = ''
    bio.field.value = ''
  } else { // clear the result if the form has been submitted again with invalid Name/Bio data
    bizCard.innerHTML = ''
    bizCard.classList.remove('light-theme')
    bizCard.classList.remove('dark-theme')
  }
})