// menggunakan jquery
// http://www.omdbapi.com/?apikey=ea38e251&s=naruto
// $(".search-button").on("click", function () {
//    $.ajax({
//       url: "http://www.omdbapi.com/?apikey=ea38e251&s=" + $(".input-keyword").val(),
//       success: (result) => {
//          const movies = result.Search;
//          // console.log(movies);
//          let cards = "";
//          movies.forEach((m) => {
//             cards += showCards(m);
//          });
//          $(".movie-container").html(cards);

//          // ketika tombol detail di klik
//          $(".modal-detail-button").on("click", function () {
//             $.ajax({
//                url: "http://www.omdbapi.com/?apikey=ea38e251&i=" + $(this).data("imdbid"),
//                success: (m) => {
//                   const movieDetail = showMovieDetail(m);
//                   $(".modal-body").html(movieDetail);
//                },
//                error: (e) => {
//                   console.log(e.responseText);
//                },
//             });
//          });
//       },
//       error: (e) => {
//          console.log(e.responseText);
//       },
//    });
// });


// vanilla menggunakan fetch()
const searchBtn = document.querySelector(".search-button");
searchBtn.addEventListener("click", function () {
   const inputKeyword = document.querySelector(".input-keyword");
   fetch("http://www.omdbapi.com/?apikey=ea38e251&s=" + inputKeyword)
      .then((response) => response.json())
      .then((response) => {
         const movies = response.Search;
         let cards = "";
         movies.forEach((m) => (cards += showCards(m)));
         const movieContainer = document.querySelector(".movie-container");
         movieContainer.innerHTML = cards;
         const modalDetailButton = document.querySelector(".modal-detail-button");
         modalDetailButton.forEach((btn) => {
            btn.addEventListener("click", function () {
               const imdbid = this.dataset.imdbid;
               fetch("http://www.omdbapi.com/?apikey=ea38e251&i=" + imdbid)
                  .then((response) => response.json)
                  .then((m) => {
                     const movieDetail = showMovieDetail(m);
                     const modalBody = document.querySelector(".modal-body");
                     modalBody.innerHTML = movieDetail;
                  });
            });
         });
      });
});

function showCards(m) {
   return `<div class="col-md-4 col-lg-3 my-3 ">
   <div class="card h-100 ">
         <img src="${m.Poster}" class="card-img-top" />
         <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle text-muted mb-3">${m.Year}</h6>
            <a href="#" class="btn btn-outline-primary modal-detail-button" data-toggle="modal" data-target="#modalDetail" data-imdbid="${m.imdbID}">Show Details</a>
         </div>
      </div>
   </div>`;
}
function showMovieDetail(m) {
   return ` <div class="container-fluid">
   <div class="row">
      <div class="col-md-3">
         <img src="${m.Poster}" class="img-fluid" />
      </div>
      <div class="col-md">
         <ul class="list-group">
            <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
            <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
            <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
            <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
            <li class="list-group-item"><strong>Plot : </strong><br />${m.Plot}</li>
         </ul>
      </div>
   </div>
</div>`;
}
