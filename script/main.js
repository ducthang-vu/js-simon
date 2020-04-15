$(document).ready(function() {
    console.log('main.js is working')
    console.log($)


    /* UTILITIES FUNCTIONS */
    function randomNumberSet(n, min, max) {
        //Accepts integers n, min, max; and returns a set of different n integers, between min, included, and max, excluded. 
        var randomNumbers = new Set()

        if (isNaN(n) || n < 1 || isNaN(max) || isNaN(min)) {return -1}  // Validation

        while (randomNumbers.size < n) randomNumbers.add(Math.floor(Math.random() * (max - min)) + min)
        
        return randomNumbers
    }





    function iterable_to_string(iterable) {
        var content = ''

        for (item of iterable) content += '(' + item + ') '

        return content
    }


    function startTimer() {
        var startTime = performance.now()
        var idTimer = setInterval(() => {
            var timeLeft = maxTime - (performance.now() - startTime) / 1000 | 0
            time_display.innerHTML = timeLeft
            if (!timeLeft) {
                clearInterval(idTimer)
                endgame()
            }
        }, 
        500)
    }


    function promptNumbers(n) {
        for (let i = 1; i <= n; i++) {
            var usernumber = parseInt(prompt('Enter a number:'))

            while (isNaN(usernumber)) {
                usernumber = parseInt(prompt('You must enter a number, try again:'))
            }

            user_numbers.push(usernumber)
        }
    }


    function endgame() {
        promptNumbers(n_numbers)
        result_array =  user_numbers.map(x => game_numbers.has(x))
        result_display.innerHTML = 'The numbers chosen by the machine were:<br>' +  iterable_to_string(game_numbers) + '<br>You chose the following numbers:<br>' + iterable_to_string(user_numbers) + '<br>Thus the result is:<br>' + iterable_to_string(result_array) + '<br>The final score is<br>' + result_array.reduce((x, y) => x + y) + '.'
    }
    

    function startGame() {
        game_numbers  = randomNumberSet(n_numbers, 10, 100)
        alert('The five numbers are: ' + iterable_to_string(game_numbers) +'.\nPress ok to start the clock, after 30 seconds you will be asked to enter the five numbers!')
        startTimer()
    }
  

    /* GLOBAL VARIABLE */
    const playBtn = document.getElementById('play-btn')
    const time_display = document.getElementById('time-display')
    const result_display = document.getElementById('result-display')

    const n_numbers = 5
    const maxTime = 30  //seconds
   

    var game_numbers 
    var user_numbers = []
    var result_array
    var final_score

    playBtn.addEventListener('click', startGame)
    
})
