// Star Wars Trivia
// Röd text visar i Character Comparsion vem som har mest av de två jämförda värdena och 
// grön text visar om två värden är lika.
//////////////////////////////////////////////


// Get vald character namn
function showCharacter(char) {      
    var characterName = document.getElementById(char).value;
    
  
    // Get vald image URL
    var imageUrl = getImageUrl(characterName);
  
    // Create HTML elements for the character's name and image
    var nameElement = document.createElement("h3");
    nameElement.innerHTML = characterName;
    var imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.style.width = "250px";
    
  
    // Visa elements i character info div
    if (char == 'character1'){
      var characterInfo = document.getElementById("character-image_1");
    }else{
      var characterInfo = document.getElementById("character-image_2");
    };
    characterInfo.innerHTML = "";
    characterInfo.appendChild(nameElement);
    characterInfo.appendChild(imageElement);
  }

  class StarWarsChar {
    constructor(name, gender, height, mass, hairColor, skinColor, eyeColor, movies, pictureUrl = '') {
      this.name = name;
      this.gender = gender;
      this.height = height;
      this.mass = mass;
      this.hairColor = hairColor;
      this.skinColor = skinColor;
      this.eyeColor = eyeColor;
      this.movies = movies;
      this.pictureUrl = pictureUrl;
    }
  }

  function getImageUrl(characterName) {
    var imageUrls = {
      "Luke Skywalker": "https://www.toplessrobot.com/wp-content/uploads/2008/10/Episode_4_Luke_Skywalker_1.jpg",
      "C-3PO": "https://static.wikia.nocookie.net/starwars/images/0/02/C3PO-TROSposter.png",
      "R2-D2": "https://scifishop.se/wp-content/uploads/2022/05/r2d2-ep2-actionfigur-1-6.jpg",
      "Darth Vader": "https://s.abcnews.com/images/Entertainment/HT_darth_vader_jef_160715_16x9_992.jpg",
      "Leia Organa": "https://static.wikia.nocookie.net/fictupedia/images/1/1d/Leia-princess-leia-organa-solo-skywalker-9301321-576-1010.jpg",
      "Chewbacca": "https://upload.wikimedia.org/wikipedia/en/1/12/Chewbaca_%28Peter_Mayhew%29.png"
    };
    return imageUrls[characterName];
  }

  // Läser in info från API

urls = {
  "Luke Skywalker": 'https://swapi.dev/api/people/1/',
  "C-3PO": 'https://swapi.dev/api/people/2/',
  "R2-D2": 'https://swapi.dev/api/people/3/',
  "Darth Vader": 'https://swapi.dev/api/people/4/',
  "Leia Organa": 'https://swapi.dev/api/people/5/',
  "Chewbacca": 'https://swapi.dev/api/people/13/'};

const responses = [];

async function getCharacter(name) {
  
  const characterProps = ['name', 'gender', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'films', 'pictureUrl'];
  
  const response = await fetch(urls[name]);
  const data = await response.json();
  
  data.films = data.films.length;
  data.pictureUrl = urls[data.name];
  
  characterData = characterProps.map(prop => data[prop]);
  
  return new StarWarsChar(...characterData);
}

async function addToHTML(characterInfo_1, characterInfo_2, char1_value, char2_value, text)
{
  
  if (char1_value > char2_value){
    
    characterInfo_1.innerHTML += text  + `<span style="color: red;">${char1_value}</span>` +  '<br>' 
    characterInfo_2.innerHTML += char2_value +  '<br>' 
  }else if(char1_value < char2_value){
    characterInfo_1.innerHTML += text  + char1_value +  '<br>' 
    characterInfo_2.innerHTML += `<span style="color: red;">${char2_value}</span>` +  '<br>' 
  } else{
    characterInfo_1.innerHTML += text + char1_value +  '<br>' 
    characterInfo_2.innerHTML += char2_value +  '<br>' 
  
  }

}

async function addSameToHTML(characterInfo_1, characterInfo_2, char1_value, char2_value, text){

    if (char1_value == char2_value){
      characterInfo_1.innerHTML += text + `<span style="color: green;">${char1_value}</span>` +  '<br>' 
      characterInfo_2.innerHTML += `<span style="color: green;">${char2_value}</span>` +  '<br>' 
    }else{
      characterInfo_1.innerHTML += text +  char1_value +  '<br>' 
      characterInfo_2.innerHTML += char2_value +  '<br>' 
    }
}


async function makeRequests() {
  
  const name_of_char_1 = document.getElementById("character1").value;
  const name_of_char_2 = document.getElementById("character2").value;
  
  div_type_1 = 'character-info_1'
  div_type_2 = 'character-info_2'

  const characterInfo_1 = document.getElementById(div_type_1);
  const characterInfo_2 = document.getElementById(div_type_2);
  characterInfo_1.innerHTML = ''
  characterInfo_2.innerHTML = ''

  const char1 = await getCharacter(name_of_char_1);
  const char2 = await getCharacter(name_of_char_2);

  addSameToHTML(characterInfo_1, characterInfo_2, char1.hairColor, char2.hairColor, 'Hair Color: ')

  addToHTML(characterInfo_1, characterInfo_2, parseInt(char1.height), parseInt(char2.height), 'Height: ')

  addToHTML(characterInfo_1, characterInfo_2, parseInt(char1.mass), parseInt(char2.mass), 'Weight: ')

  addSameToHTML(characterInfo_1, characterInfo_2, char1.gender, char2.gender, 'Gender: ')
  
  addSameToHTML(characterInfo_1, characterInfo_2, char1.skinColor, char2.skinColor, 'Skin Color: ')

  characterInfo_1.innerHTML += 'Eye color: ' +   char1.eyeColor  +  '<br>' 
  characterInfo_2.innerHTML += char2.eyeColor +  '<br>' 
  
  addToHTML(characterInfo_1, characterInfo_2, char1.movies, char2.movies, 'Number of films: ')

}
