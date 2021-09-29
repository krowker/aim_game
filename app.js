const startBtn = document.querySelector ('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#1f5f1e', '#f5b914', '#f5146a', '#c814f5', '#14f575', '#f1f514', '#14f5ea']
let time = 0
let score = 0

startBtn.addEventListener ('click', (event)=>{
event.preventDefault()
screens[0].classList.add('up')
})

timeList.addEventListener ('click', (event)=> {
   if(event.target.classList.contains('time-btn')){
      time = parseInt(event.target.getAttribute('data-time'))
      screens[1].classList.add('up')
      startGame()
   }
})

board.addEventListener('click', event =>{
   if (event.target.classList.contains('circle')){
      score++
      event.target.remove()
      createRandomCircle()
   }
})


function startGame(){
   setInterval(decreaseTime, 1000)
   setTime(time)
   createRandomCircle()
}

function decreaseTime() {
   if (time === 0){
      finishGame()
   } else {
      let current = --time
      if (current < 10) {
         current = `0${current}`
      }
      setTime(current)
   }
}

function setTime(value) {
   timeEl.innerHTML=`00:${value}`
}

function createRandomCircle() {
   const circle = document.createElement('div')
   const size = getRandomNumber (10,60)
   const {width, height} = board.getBoundingClientRect()
   const x = getRandomNumber(0, width-size)
   const y = getRandomNumber(0, height - size)
   const color =  getRandomColor()

   circle.classList.add('circle')
   circle.style.width=`${size}px`
   circle.style.height=`${size}px`
   circle.style.top = `${x}px` 
   circle.style.left = `${y}px` 
   circle.style.backgroundColor = color

   board.append(circle)
}

function getRandomColor () {
   const index = Math.floor(Math.random()*colors.length)
 
   return colors[index]
 }

function getRandomNumber(min, max) {
  return Math.round(Math.random()*(max-min)+min)
}

function finishGame(){
   timeEl.parentNode.classList.add('hide')
   board.innerHTML=`<h1>Score: <span class="primary">${score}</span></h1>`
}
