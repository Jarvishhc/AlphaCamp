(function () {
  const BASE_URL = "https://lighthouse-user-api.herokuapp.com"
  const INDEX_URL = BASE_URL + "/api/v1/users/"
  const data = []
  const dataPanel = document.querySelector('#data-panel')
  let displayTag = {
    home: true,
    favorite: false,
    male: false,
    female: false
  }

  const navBar = document.querySelector('nav')
  const navFavorite = document.querySelector('.nav-favorite')
  const REGULAR_HEART_ICON = "far fa-heart"
  const SOLID_HEART_ICON = "fas fa-heart"
  let myFavorite = []

  const searchInput = document.querySelector('#search-input')
  const searchBtn = document.querySelector('#submit-search')

  const pagination = document.querySelector('.pagination')
  const INITIAL_PAGE = 1
  const ITEM_PER_PAGE = 20
  let paginationData = []

  const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || []
  // const favoriteId = JSON.parse(localStorage.getItem('favoriteId')) || []

  const maleBtn = document.querySelector('.male-btn')
  const femaleBtn = document.querySelector('.female-btn')
  let maleList = []
  let femaleList = []

  // Execution starts fomr here 
  axios
    .get(INDEX_URL)
    .then(response => {
      data.push(...response.data.results)
      getTotalPages(data)
      getPageData(INITIAL_PAGE, data)
    }).catch(error => console.log(error))

  // Event Listener: show modal
  dataPanel.addEventListener('click', event => {
    if (event.target.matches('.figure-img') || event.target.matches('.figure-caption')) {
      showPersonalInfo(event.target.dataset.id)
    }
  })

  // ==================== Event Linstener ===================
  // Event Listener: set user to myFavorite
  dataPanel.addEventListener('click', event => {
    let targetId = event.target.dataset.id

    // Checked if the heart icon is clicked
    if (event.target.matches('.fa-heart')) {
      if (event.target.matches('.far')) {   // If it's a regular heart icon
        event.target.classList.replace('far', 'fas')
        toggleFavorite(targetId)

      } else if (event.target.matches('.fas')) {  // If it's a solid heart icon
        event.target.classList.replace('fas', 'far')

        // If the current page is 'Favorite', remove the user immediately when dislike 
        if (displayTag.favorite) {
          let currentPage = 0


          if (displayTag.male) {
            maleList.forEach((item, index) => {
              if (item.id === Number(targetId)) {
                currentPage = Math.ceil(index / ITEM_PER_PAGE)
              }
            })
            toggleFavorite(targetId)
            maleList = favoriteList.filter(item => item.gender === 'male')
            getTotalPages(maleList)
            getPageData(currentPage, maleList)

          } else if (displayTag.female) {
            femaleList.forEach((item, index) => {
              if (item.id === Number(targetId)) {
                currentPage = Math.ceil(index / ITEM_PER_PAGE)
              }
            })
            toggleFavorite(targetId)
            femaleList = favoriteList.filter(item => item.gender === 'female')
            getTotalPages(femaleList)
            getPageData(currentPage, femaleList)
          } else {
            favoriteList.forEach((item, index) => {
              if (item.id === Number(targetId)) {
                currentPage = Math.ceil(index / ITEM_PER_PAGE)
              }
            })
            toggleFavorite(targetId)
            getTotalPages(favoriteList)
            getPageData(currentPage, favoriteList)
          }
        }
      }
    }
  })

  // Event Listener: display 'Favorite' page
  navBar.addEventListener('click', event => {
    // If 'Favorite' page is clicked, display favorite list
    if (event.target.matches('.nav-favorite')) {
      displayTag.favorite = true
      displayTag.home = false
      displayTag.male = false
      displayTag.female = false

      event.target.parentElement.classList.toggle('active')   // Set 'Favorite' link to active class
      event.target.parentElement.previousElementSibling.classList.toggle('active')  // Remove active class from 'Home' link

      if (favoriteList.length === 0) {
        dataPanel.innerHTML = `
        <h5 class="text-secondary">
          No favorites yet.
          <i class="far fa-sad-cry"></i>
        </h5>
      `
      } else {
        getPageData(INITIAL_PAGE, favoriteList)
      }
      getTotalPages(favoriteList)
      // If 'Home' page is clicked, dispaly complete list
    } else if (event.target.matches('.nav-home')) {
      displayTag.home = true
      displayTag.favorite = false
      displayTag.male = false
      displayTag.female = false

      event.target.parentElement.classList.toggle('active')   // Set 'Home' link to active class
      event.target.parentElement.nextElementSibling.classList.toggle('active')  // Remove active class from 'Favorite' link

      getTotalPages(data)
      getPageData(INITIAL_PAGE, data)
    }
  })

  // Event Listener: Check if search button is clicked
  searchBtn.addEventListener('click', event => {
    let result = ''
    const regex = new RegExp(searchInput.value, 'i')

    // Check input. Do nothing if there is no value.
    if (searchInput.value !== '') {
      // Check if there is any matched data if a value is inputed.
      result = data.filter(person => person.name.match(regex))

      // Display message if no matched data. Otherwise, display matched data.
      if (result.length === 0) {
        dataPanel.innerHTML = `
        <h5 class="text-secondary">
          No mached data.
          <i class="far fa-sad-cry"></i>
        </h5>
      `
      } else {
        getPageData(INITIAL_PAGE, result)
      }
      getTotalPages(result)
    }

    searchInput.value = ''
  })

  // Event Listener: which page is clicked
  pagination.addEventListener('click', event => {
    let currentPage = event.target.dataset.page

    if (displayTag.favorite) {
      if (event.target.hasAttribute('data-page')) {
        if (displayTag.male) {
          getPageData(currentPage, maleList)
        } else if (displayTag.female) {
          getPageData(currentPage, femaleList)
        } else {
          getPageData(currentPage, favoriteList)
        }

      }
    } else {
      if (event.target.hasAttribute('data-page')) {
        if (displayTag.male) {
          getPageData(currentPage, maleList)
        } else if (displayTag.female) {
          getPageData(currentPage, femaleList)
        } else {
          getPageData(currentPage, data)
        }

      }
    }
  })

  // Event Listener: display male
  maleBtn.addEventListener('click', event => {
    displayTag.male = true
    displayTag.female = false

    if (displayTag.favorite) {
      maleList = favoriteList.filter(item => item.gender === 'male')
    } else {
      maleList = data.filter(item => item.gender === 'male')
    }

    getTotalPages(maleList)
    getPageData(INITIAL_PAGE, maleList)
  })

  // Event Listener: display female
  femaleBtn.addEventListener('click', event => {
    displayTag.female = true
    displayTag.male = false

    if (displayTag.favorite) {
      femaleList = favoriteList.filter(item => item.gender === 'female')
    } else {
      femaleList = data.filter(item => item.gender === 'female')
    }

    getTotalPages(femaleList)
    getPageData(INITIAL_PAGE, femaleList)
  })



  // ==================== Functions ===================
  // Display data list.
  function displayDataList(data) {
    let htmlContent = ''
    let icon = ''

    data.forEach(function (item) {
      // Check if the person is marked as my favorite. Display a solid heart if yes, and display a regular heart if not.
      if (favoriteList.some(favorite => favorite.id === item.id)) {
        icon = SOLID_HEART_ICON
      } else {
        icon = REGULAR_HEART_ICON
      }

      htmlContent += `
          <div class="tile col-sm-3 text-center mb-2">
            <figure class="figure m-0" data-toggle="modal" data-target="#show-info-modal" data-id="${item.id}">
              <img class="figure-img img-fluid rounded mb-0" src="${item.avatar}" alt="avatar" data-id="${item.id}">
              <figcaption class="figure-caption mb-2" data-id="${item.id}">${item.name} ${item.surname}</figcaption>
            </figure>
            <a href="#!" class="favorite">
              <i class="${icon} mb-2" data-id="${item.id}"></i>
            </a>
          </div >
        `
    })
    dataPanel.innerHTML = htmlContent
  }

  // Show peronsal info modal
  function showPersonalInfo(id) {
    // Get elements
    const modalTitle = document.querySelector('#show-title')
    const modalAvatar = document.querySelector('#show-avatar')
    let modalInfo = document.querySelector('#show-info')
    // Set request URL
    const url = INDEX_URL + id

    // Send request to SHOW API
    axios
      .get(url)
      .then(response => {
        const data = response.data
        let infoHtml = ''

        // Insert data into modal ui
        modalTitle.textContent = `${data.name} ${data.surname} `
        modalAvatar.innerHTML = `<img src = "${data.avatar}" class= "img-fluid" alt = "Responsive image"> `

        for (let item in data) {
          switch (item) {
            case 'age':
            case 'birthday':
            case 'created_at':
            case 'email':
            case 'gender':
            case 'region':
            case 'updated_at':
              infoHtml += `<p class= "m-0 text-capitalize" > ${item}: ${data[item]}</p> `
              break
          }
        }
        modalInfo.innerHTML = infoHtml
      }).catch(error => console.log(error))
  }

  function toggleFavorite(id) {
    const person = data.find(item => item.id === Number(id))

    if (favoriteList.some(item => item.id === Number(id))) {

      favoriteList.forEach((item, index) => {
        if (item.id === Number(id)) {
          favoriteList.splice(index, 1)
          // favoriteId.splice(index, 1)
        }
      })
    } else {
      favoriteList.push(person)
      // favoriteId.push(id)
    }

    localStorage.setItem('favoriteList', JSON.stringify(favoriteList))
    // localStorage.setItem('favoriteId', JSON.stringify(favoriteId))
  }

  function getTotalPages(data) {
    let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
    let paginationHtml = `
      <li class="page-item">
        <a class="page-link" href="javascript:;" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    `

    for (let page = 1; page <= totalPages; page++) {
      paginationHtml += `
        <li class="page-item">
          <a class="page-link" href="javascript:;" data-page="${page}">${page}</a>
        </li>
      `
    }

    paginationHtml += `
      <li class="page-item">
        <a class="page-link" href="javascript:;" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    `

    pagination.innerHTML = paginationHtml
  }

  function getPageData(pageNum, data) {
    let offset = (pageNum - 1) * ITEM_PER_PAGE
    let pageData = data.slice(offset, offset + ITEM_PER_PAGE)

    displayDataList(pageData)
  }
})()