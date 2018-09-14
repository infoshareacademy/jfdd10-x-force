var letter = document.querySelector('.letterbefore');
var circle = document.querySelector('.circle');
var send = document.querySelector('.send')
var subscribeForm = document.querySelector('#subscribe_form')


circle.addEventListener('click', animate )
send.addEventListener('click', sent)


function sent(event) {
    event.preventDefault()
   if (subscribeForm.checkValidity()){
    letter.classList.toggle('letter-sent')
   }
    

}


function animate() {
    letter.classList.toggle('letterafter')
}