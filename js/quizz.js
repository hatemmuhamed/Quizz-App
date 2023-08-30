export class Quizz{
    constructor(response){
        this.questions=response;
        this.currentQuestion = 0;
        this.score = 0;
        this.totalNumberOfQuestions = this.questions.length;
        this.showQuestions();
        document.getElementById('next').addEventListener('click',this.nextQuestion.bind(this));
        document.getElementById('tryBtn').addEventListener('click',this.tryAgain);
    }
    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        
    }
    showQuestions(){
        document.getElementById('currentQuestion').innerHTML = this.currentQuestion + 1;
        document.getElementById('totalNumberOfQuestions').innerHTML = this.totalNumberOfQuestions;
        document.getElementById('question').innerHTML = this.questions[this.currentQuestion].question;
        let answers = [this.questions[this.currentQuestion].correct_answer,...this.questions[this.currentQuestion].incorrect_answers];
        this.shuffle(answers);
        let container = ``
        for(let i  = 0 ;i < answers.length ; i++){
            container += `
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="answer" id="" value="${answers[i]}" >
                        ${answers[i]}
                    </label>
                </div> 
            `
        }
    document.getElementById('rowAnswer').innerHTML = container;
        
    }
    nextQuestion(){
        let correctAnswer = this.questions[this.currentQuestion].correct_answer;
        let answerInputs = document.getElementsByName('answer');
        
        let userAnswerElement = Array.from(answerInputs).find(value=>value.checked);
        if(userAnswerElement != undefined){
            $('#alert').fadeOut(600);
            let userAnswer = userAnswerElement.value;
            this.checkCorrectAnswer(userAnswer,correctAnswer);
            this.currentQuestion ++;
            if(this.currentQuestion < this.totalNumberOfQuestions){
                this.showQuestions();
            }
            else{
                //! =========> display screen finished
                $('#quiz').fadeOut(400);
                $('#finish').fadeIn(600);
                document.getElementById('score').innerHTML = this.score;
            }
        }
        else{
            //^ =====================> dipslay alert 
            $('#alert').fadeIn(600);
        }
        
    }
    checkCorrectAnswer(userAnswer,correctAnswer){
        if(userAnswer===correctAnswer){
            //! ====> display correct span
            $('#Correct').fadeIn(700).fadeOut(700);
            this.score++;
        }
        else{
            //! ====> display incorrect span
            $('#inCorrect').fadeIn(700).fadeOut(700);
        }
    }
    tryAgain(){
        $('#finish').fadeOut(400);
        $('#setting').fadeIn(600);
    }
}