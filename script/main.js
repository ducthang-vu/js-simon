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


    /* MAIN FUNCTIONS */
    function iterable_to_string(iterable) {
        var content = ''

        for (item of iterable) content += '(' + item + ') '

        return content
    }


    function print_cards() {
        counter = 0
        for (let i = 0; i < 5; i++) {
            document.getElementById(i).innerHTML = Array.from(game_numbers)[i]
        }
    }


    function startTimer() {
        var startTime = performance.now()
        idTimer = setInterval(() => {
            var timeLeft = maxTime - (performance.now() - startTime) / 1000 | 0
            time_display.innerHTML = timeLeft
            if (!timeLeft) {
                clearInterval(idTimer)
                endgame()
            }
        }, 
        500)
    }


    function promptNumbers(array, n) {
        for (let i = 1; i <= n; i++) {
            var usernumber = parseInt(prompt('Enter a number:'))

            while (isNaN(usernumber)) {
                usernumber = parseInt(prompt('You must enter a number, try again:'))
            }

            array.push(usernumber)
        }
    }


    function endgame() {
        promptNumbers(user_numbers, n_numbers)
        result_array =  user_numbers.map(x => game_numbers.has(x))
        result_display.innerHTML = 'The numbers chosen by the machine were:<br>' +  iterable_to_string(game_numbers) + '<br>You chose the following numbers:<br>' + iterable_to_string(user_numbers) + '<br>Thus the result is:<br>' + iterable_to_string(result_array) + '<br>The final score is<br>' + result_array.reduce((x, y) => x + y) + '.'
    }
    

    function startGame() {
        clearInterval(idTimer) // reset timer
        cards.removeClass('flipped')
        time_display.innerHTML = 30  // reset timer
        game_numbers  = randomNumberSet(n_numbers, 10, 100)
        print_cards()
        setTimeout(() => cards.toggleClass('flipped'), 
        1000)
        startTimeBtn.addEventListener(startTimer)
    }


    /* OTHER FUNCTIONS*/
    function showInfo() {
        rules_box.toggle()
        info_button.toggleClass('darkred-color')
        info_button.children().toggleClass('fa-question-circle fa-window-close')
    } 



    /* GLOBAL VARIABLE */
    const info_button = $('#info-button')
    const rules_box = $('#rules')
    const cards = $('.card')
    const playBtn = document.getElementById('play-btn')
    const time_display = document.getElementById('time-display')
    const result_display = document.getElementById('result-display')
    const startTimeBtn = document.getElementById(start-timer-btn)

    const n_numbers = 5
    const maxTime = 30  //seconds

    var game_numbers 
    var user_numbers = []
    var result_array
    var idTimer

    /* EVENTS */
    info_button.click(showInfo)

    playBtn.addEventListener('click', startGame)
    
})
