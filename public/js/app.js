console.log('Client side javescript is loading')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#location')
const msg2 = document.querySelector('#weather')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
        msg1.textContent='Loading.. '
        msg2.textContent=''
    // console.log(search.value)
    fetch('http://localhost:3000/weather?search='+search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {

                msg1.textContent='Location = '+data.address
                msg2.textContent='Weather = '+data.weather
            }
        })
    })
})