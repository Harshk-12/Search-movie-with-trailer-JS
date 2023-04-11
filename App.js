let input = document.querySelector('.input')
let btn = document.querySelector(".btn")
let maindiv = document.querySelector('.movies')
let message1 = document.createElement('h2')



function search() {
  let moviename = input.value.toLowerCase()

  // console.log(moviename)

  //empty page before search
  maindiv.innerHTML = ''

  function fetchdata() {

    fetch("https://api.themoviedb.org/3/search/movie?api_key=8125db8f67d23da1d30f6063b1b794b8&language=en-US&query=" +
      moviename + "&page=1&include_adult=false")
      .then(response => { return response.json() })
      .then(response1 => { showresults(response1.results) })

  }
  fetchdata()
}

function showresults(data) {
  // console.log(moviename)
  if (input.value.length === 0) {
    maindiv.append(message1)

    message1.innerHTML = 'Please write the name of a movie'
    message1.classList.add("message1")
  }
  else {
    // message1.innerHTML = ''
    data.forEach(item => {
      let image = document.createElement('img')
      let title = document.createElement('p')
      let contentdiv = document.createElement('div')

      maindiv.append(contentdiv)
      contentdiv.append(image)
      contentdiv.append(title)

      item.poster_path ?
        image.src = 'https://image.tmdb.org/t/p/original' + item.poster_path
        : image.src = 'https://static.thenounproject.com/png/220984-200.png'

      item.title.length > 40 ? title.innerHTML = item.title.slice(0, 40) + '...' : title.innerHTML = item.title

      image.classList.add('image')
      title.classList.add('title')
      contentdiv.classList.add('contentdiv')

      fetch("https://api.themoviedb.org/3/movie/" +
        item.id +
        "/videos?api_key=8125db8f67d23da1d30f6063b1b794b8&language=en-US")
        .then(response => { return response.json() })
        .then(response1 => trailer(response1.results))

      function trailer(data) {
        console.log(data)
        let trailerdata = data.find(obj => {
          if (obj.site == 'YouTube' && obj.type == 'Trailer') { return obj }
          else { return undefined }
        })
        console.log(trailerdata)
        playtrailer(trailerdata)
        function playtrailer(data){

          let trailer=document.createElement('p')
          let anchor=document.createElement('a')
          contentdiv.append(trailer)
          trailer.append(anchor)

          anchor.href=' https://www.youtube.com/watch?v='+ data.key
          // anchor.innerHTML=(item.title)
          anchor.innerHTML='Trailer'

          anchor.classList.add("anchor")
          trailer.classList.add('trailer')


       
        }
      }

    })


  }

}
 
