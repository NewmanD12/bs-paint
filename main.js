/*******************
 * OUR HELPER CODE *
*******************/

/*
 * Here we add the squares to the canvas dynamically.
 * You can mostly leave this section alone!
 * But if you want to change how wide the canvas is,
 * there are just two steps:
 * 
 * 1. Change the `gridWidth` value below.
 * 2. Change the `grid-template-rows` and
 * `grid-template-columns` to match.
 *
 * To make the second one happen, the number to change
 * is the first argument to `repeat`, currently set at 10.
 */
const gridWidth = 10;
let count = 0;
while (count <= gridWidth * gridWidth) {
  const canvas = document.querySelector('.canvas');
  const div = document.createElement('div');
  div.className = 'square color-5';
  canvas.appendChild(div);
  count++;
}

// You probably should NOT do these in the order below.
// That is, you probably should NOT do all the queries,
// THEN all the functions,
// THEN all the wiring.

// Instead, it'll be easier if you go one action at a time!
// So, add a query for the palette colors.
// THEN add an event listener function for what happens when one is clicked.
// THEN wire those two together, so that when the palette elements are clicked,
// the function runs.
//
// And proceed from there to getting the squares working.
//

// ALSO.
// You do not have to follow the sections below. If you're doing your functions inline, it doesn't make a lot of sense to separate the event listener functions from their wiring!

/***********
 * QUERIES *
***********/

// Add queries for all your squares, palette colors, and brush here.
// (Note the singular or plural used in that sentence!)

let colors = document.querySelectorAll('.palette div')
let palette = document.querySelector('.palette')

let current_color = document.querySelector('.current-brush')
let current_color_class = current_color.classList

let canvas = document.querySelector('.canvas')
let canvas_divs = document.querySelectorAll('.canvas div')

selectedColor = 'color-2'

let clicked = false

/****************************
 * EVENT LISTENER FUNCTIONS *
 ****************************/

for(let color of colors){
  color.addEventListener('click', function(){
    // searches through the class names for which item you clicked, looking for a class name that starts with 'color-'. It then saves that class name to a variable named selectedColor
    current_color.style.background = ''
    for(let class_name of color.classList){
      if(class_name.startsWith('color-')){
        selectedColor = class_name
      }
    }
    // After getting the selected color class from for loop above, it then goes through the classes that the current paint brush has, also looking for a class that starts with 'color-'. it then replaces that class with the one selected above
    for(let class_name of current_color_class){
      if(class_name.startsWith('color-')){
        current_color_class.replace(class_name, selectedColor)
      }
    }
  })
}


canvas.addEventListener('mouseup', function(){
  clicked = false
})

canvas.addEventListener('mousedown', function(){
  clicked = true
})




for(let division of canvas_divs){
  division.addEventListener('mouseenter', function(){
    if(clicked){
      if(selectedColor.startsWith('color-')){
        division.style.background = ''
        for(let divClassName of division.classList){
          if(divClassName.startsWith('color-')){
            division.classList.replace(divClassName, selectedColor)
          }
        }
      }
      else if(selectedColor.startsWith('(')){
        division.style.background = 'rgb' + selectedColor
      }
      else {
        division.style.background = selectedColor
      }
    }
  })
}

let colors_length = colors.length

let new_color = document.querySelector('#input')
let submit_new_color = document.querySelector('#new-color-submit')

submit_new_color.addEventListener('click', function(){
  let new_color_input = new_color.value
  let new_div = document.createElement(`div`)
  new_div.classList.add('palette-color')
  new_div.classList.add(`color-${colors.length + 1}`)

  if(new_color_input.startsWith('(')){
    new_div.style.background = 'rgb' + new_color_input
    new_div.addEventListener('click', function(){
      current_color.style.background = 'rgb' + new_color_input
      selectedColor = new_color_input      
    })
  }
  else{
    new_div.style.background = new_color_input
    new_div.addEventListener('click', function(){
      current_color.style.background = new_color_input
      selectedColor = new_color_input
    })
  }

  if(new_div.style.background !== ''){
    palette.appendChild(new_div)
    new_color.value = ''
  }
})




