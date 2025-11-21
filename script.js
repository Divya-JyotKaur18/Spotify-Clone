console.log ('Lets write Javascript');



const clientId = "e1381dc0e80c4431b654dea8602008cb";
const albumIds = [
  "4aawyAB9vmqN3uQ7FjRGTy",
  "6kZ42qRrzov54LcAk4onW9",
  "1ATL5GLyefJaxhQzSPVrLX",
  "3SpBlxme9WbeQdIuM99wMa",
  "1DFixLWuPkv3KT3TnV35m3",
  "2ODvWsOgouMbaA5xf0RkJe",
  "2eXFgVxSknBQWzz1FJ4N4i"
];


async function getToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(clientId + ":" + "c475e17e56124962935d86b55bcd18fd")
    },
    body: "grant_type=client_credentials"
  });

  return res.json();
}


async function loadRandomAlbums() {
  const tokenData = await getToken();
  const token = tokenData.access_token;

  // pick 5 random album IDs
  const randomAlbums = albumIds.sort().slice(0, 7);

  // fetch album details
  const url =
    `https://api.spotify.com/v1/albums?ids=${randomAlbums.join(",")}`;

  const albums = await fetch(url, {
    headers: { Authorization: "Bearer " + token }
  }).then(r => r.json());

  const container = document.getElementById("albums");

  console.log(albums);
  albums.albums.forEach(album => {
    container.innerHTML += `
      <div class="card" >
                    <img src="${album.images[0].url}" class="card-img">
                    <p class="cards-title">${album.name}</p>
                    <p class="card-info">${album.artists[0].name}</p>
                </div>
    `;
  });
}

loadRandomAlbums();


async function searchSong(){
  const tokenData = await getToken();
  const token = tokenData.access_token;

  const id = document.getElementById("search");
  input = id.value;

  if (!input){
    console.log("Not any input")
  }

  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(input)}&type=track&limit=10`
  console.log(url);
  
  const tracks = await fetch(url, {
    headers: { Authorization: "Bearer " + token }
  }).then(r => r.json());
  console.log(tracks.tracks);
  
  const container = document.getElementById("searchResults")
  
  tracks.track.forEach(album => {
    container.innerHTML += `
      <div class="card" >
                    <img src="${album.images[0].url}" class="card-img">
                    <p class="cards-title">${album.name}</p>
                    <p class="card-info">${album.artists[0].name}</p>
                </div>
    `;
  });

}

searchSong()






