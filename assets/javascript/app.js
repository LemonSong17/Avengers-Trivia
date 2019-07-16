$(document).ready(function () {
  var index = 0;

  //function for when start button is pressed
  function setup() {
    index = 0;
    $('#startButton').on('click', function () {
      $(this).hide();
      countdownTimer.start();
      loadQuestion(index);
    });
  }

  //setting and clearing countdown timer + function for if time runs out
  var countdownTimer = {
    time: 10,
    reset: function () {
      this.time = 10;
      $('.timer').html('<h3>' + this.time + ' seconds remaining</h3>');
    },
    start: function () {
      counter = setInterval(countdownTimer.count, 1000);
    },
    stop: function () {
      clearInterval(counter);
    },
    count: function () {
      countdownTimer.time--;
      console.log(countdownTimer.time);
      $('.timer').html(countdownTimer.time);
      if (countdownTimer.time >= 0) {
        $('.timer').html('<h3>' + countdownTimer.time + ' seconds remaining</h3>');
      }
      else {
        index++;
        answerWrong();
        countdownTimer.reset();
        if (index < questionArray.length) {
          loadQuestion(index);
        } else {
          $(".answerchoice").hide();
          showScore();
        }
      }
    }
  };


  
  
  
  
  var trivia = {

    correct: 0,
    wrong: 0,
    q1: {
      question: 'What is Tony Starks wifes name?',
      possibleAnswers: ['A. Pepper',
        'B. Grace',
        'C. Rachel',
        'D. Hillary'],
      flags: [true, false, false, false],
      answer: 'A. Pepper '
    },

    q2: {
      question: 'Who is Thors brother?',
      possibleAnswers: ['A. Odin   ',
        'B. Loki  ',
        'C.  Asgard  ',
        'D.  Heimdall  '],
      flags: [false, true, false, false],
      answer: 'B. Loki  '
    },

    q3: {
      question: ' Which of these places is not in an Avengers film? ',
      possibleAnswers: ['A. Asgard  ',
        'B.  Sokovia  ',
        'C. Diagon Alley  ',
        'D.  Wakanda '],
      flags: [false, false, true, false],
      answer: 'C.  Diagon Alley  '
    },

    q4: {
      question: ' Steve Rogers best friends name is? ',
      possibleAnswers: ['A. Will ',
        'B. Matt ',
        'C. Ron ',
        'D. Bucky '],
      flags: [false, false, false, true],
      answer: 'D. Bucky '
    },

    q5: {
      question: ' Which of these is not an infinity stone?',
      possibleAnswers: ['A. Rude ',
        'B. Time   ',
        'C.  Soul ',
        'D.  Space '],
      flags: [true, false, false, false],
      answer: 'A. Rude '
    }
  };



 //array for each question and function to load the queestion onto the page
  var questionArray = [trivia.q1, trivia.q2, trivia.q3, trivia.q4, trivia.q5];

  function loadQuestion(questionSelection) {
    console.log('questionSelection: ',questionSelection);
    countdownTimer.reset();
    $(".question").html(questionArray[questionSelection].question);
    $("#buttonA").text(questionArray[questionSelection].possibleAnswers[0]).show();
    $("#buttonB").text(questionArray[questionSelection].possibleAnswers[1]).show();
    $("#buttonC").text(questionArray[questionSelection].possibleAnswers[2]).show();
    $("#buttonD").text(questionArray[questionSelection].possibleAnswers[3]).show();
    
  }

  //alerts for correct and incorrect selection
  function answerCorrect() {
    trivia.correct++;
    alert("Correct!");
    console.log("correct");
  }

  function answerWrong() {
    trivia.wrong++;
    alert("Incorrect");
    console.log("wrong");
  }


  //function to remove question and append right and wrong talley to final page
  function showScore() {
    $('.question').empty();
    $('.question').append("<h2><p>" + trivia.correct + " correct</p></h2>");
    $('.question').append("<h2><p>" + trivia.wrong + " incorrect</p></h2>");
    countdownTimer.stop();
    $('.timer').empty();
  }





  //function defining buttons and bollean functions for whether or not the user selected the correct/incorrect answer
  $('.answerchoice').on('click', function () {
    console.log($(this));
    if (this.id == 'buttonA') {
      var answerChosen = 'A';
    } else if (this.id == 'buttonB') {
      answerChosen = 'B';
    } else if (this.id == 'buttonC') {
      answerChosen = 'C';
    } else if (this.id == 'buttonD') {
      answerChosen = 'D';
    }
    if ((answerChosen == 'A') && (questionArray[index].flags[0] == true)) {
      answerCorrect();
    } else if (answerChosen == 'A') {
      answerWrong();
    }
    if ((answerChosen == 'B') && (questionArray[index].flags[1] == true)) {
      answerCorrect();
    } else if (answerChosen == 'B') {
      answerWrong();
    }
    if ((answerChosen == 'C') && (questionArray[index].flags[2] == true)) {
      answerCorrect();
    } else if (answerChosen == 'C') {
      answerWrong();
    }
    if ((answerChosen == 'D') && (questionArray[index].flags[3] == true)) {
      answerCorrect();
    } else if (answerChosen == 'D') {
      answerWrong();
    }


    $(".question").text('');
    $("#buttonA").text('');
    $("#buttonB").text('');
    $("#buttonC").text('');
    $("#buttonD").text('');
    index++;
    if (index < questionArray.length) {
      loadQuestion(index);
    } else {
      $(".answerchoice").hide();
      showScore();
    }
  });


  $('#start').click(countdownTimer.start);
  setup();
});