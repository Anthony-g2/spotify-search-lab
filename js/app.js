// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');


  // your code here

  // function tempTrack (tracks){
  //   return `<div class='container inline'>
  //     <img src='${tracks.tracks.items[i].album.images[1].url}'>
  //     <p>Artist - ${tracks.tracks.items[i].album.artists[0].name} </p>
  //     <p>Album - ${tracks.tracks.items[i].album.name} </p>
  //     <p>Popularity - ${tracks.tracks.items[i].album.popularity} </p>
  //    </div>`)
  // }

  $('#spSearch').submit(function(event){
    event.preventDefault();
    let $name = $('#qName').val();
    let $type = $('input.qType:checked').val();
    $.ajax({
      method: 'GET',
      url: "https://api.spotify.com/v1/search",
      data: {
        q: $name,
        type: $type,
        limit: 10
      },
      headers: {
        "Authorization": "Bearer BQBHJT3zE3L3HXLa_X7U94DH4Zqkid2Va_XVm3qWEJfq4WbOKfaIU-2ohwOgXqyFbrd5hebQfxmSU1UgW3YUvw"
      }
    })
    .then(function(data){
      $('#results').html('');
      $('#resTitle').fadeIn(1);
      if ($type = 'tracks'){
        for (let i=0;i < data.tracks.items.length;i++){
          $('#results').append(
            `<div class='container'>
              <hr style="width: auto; margin-left: -30px">
              <div class="resShow">
                <img src='${data.tracks.items[i].album.images[1].url}'>
                  <ul>
                    <li>Track Name - ${data.tracks.items[i].name}</li>
                    <br>
                    <li>Album - ${data.tracks.items[i].album.name}</li>
                    <br>
                    <li>Artist - ${data.tracks.items[i].album.artists[0].name}</li>
                  </ul>
                </div>
              </div>`
        )};
      } else if ($type = 'artist'){
          $('#results').append(
            `<div class='container'>
              <div class="resShow">
                <img src='${data.artists.items[0].images[1].url}'>
                  <ul>
                    <li>Artist - ${data.artists.items[0].name}</li>
                    <li>Genre - ${data.artists.items[0].genres[0]}</li>
                    <li>Popularity - ${data.artists.items[0].popularity}/100</li>
                  </ul>
                </div>
                <hr>
              </div>`
        )};
      });
    $name = null;
    $type = null;
  });
});
