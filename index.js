let colors = ['#f55a5a', '#2b283a', '#fbf3ab', '#aad1b6', '#a626d3']

const colorForm = document.getElementById('color-form')
const colorInput = document.getElementById('color-input')
const modeInput = document.getElementById('mode-input')
const colorGrid = document.getElementById('color-grid')

colorGrid.addEventListener('click', (e) => {
  const parentNode = e.target.parentElement
  const colorString = parentNode.dataset.color
  const colorEl = parentNode.querySelector('p')
  const originalTextColor = colorEl.style.color
  navigator.clipboard.writeText(colorString)
  colorEl.textContent = 'copied!'
  colorEl.style.color = colorString
  colorEl.style.fontWeight = 'bold'
  setTimeout(function () {
    colorEl.textContent = colorString
    colorEl.style.color = originalTextColor
    colorEl.style.fontWeight = 400
  }, 1000)
})

const baseUrl = 'https://www.thecolorapi.com'

colorForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const hexCode = colorInput.value.substring(1)
  const mode = modeInput.value

  fetch(`${baseUrl}/scheme?hex=${hexCode}&mode=${mode}`)
    .then((data) => data.json())
    .then((data) => {
      let fetchedColors = []
      data.colors.forEach((color) => fetchedColors.push(color.hex.value))
      colors = fetchedColors
      renderColors()
    })
})

function renderColors() {
  console.log('rendering!')
  const colorsHtml = colors
    .map((color, index) => {
      return `
      <div class="color-container" data-color="${color}">
          <div class="color" id="color${
            index + 1
          }" style="background-color: ${color}"></div>
          <p>${color}</p>
        </div>
    `
    })
    .join('')
  colorGrid.innerHTML = colorsHtml
}

renderColors()
