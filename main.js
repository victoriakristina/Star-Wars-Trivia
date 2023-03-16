// Star Wars Trivia
// Röd text visar i Character Comparsion vem som har mest av de två jämförda värdena och 
// grön text visar om två värden är lika.
//////////////////////////////////////////////


// Get vald character namn
function showCharacter(char) {      
    var characterName = document.getElementById(char).value;
    
  
    // Get vald image URL
    var imageUrl = getImageUrl(characterName);
  
    // Create HTML element för character namn och bild
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
      "Luke Skywalker": "https://media0.giphy.com/media/8evO2CUalQUVWXEj7m/giphy.gif?cid=ecf05e479wh78bqbs6nmdozmsnww37pmaj7gx4k6rlgozlcp&rid=giphy.gif&ct=s",
      "C-3PO": "https://media1.giphy.com/media/JrMyqcNznjfx8g5sr2/giphy.gif?cid=ecf05e47dhaqwzl8u0xwiidblbe6cqpccnmxok6degyw1ud4&rid=giphy.gif&ct=s",
      "R2-D2": "https://media2.giphy.com/media/m9YWbV2vuiyvJbtyv1/giphy.gif?cid=ecf05e473wuvb1dg29xqflh23523s6lthc24ci800h9upy4o&rid=giphy.gif&ct=s",
      "Darth Vader": "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDJrYmlpOGhzdm41cHRicjk5aXEzNHp3ZmtnamJzbG5sNWJpN3oxciZjdD1z/SmYqlOh9GtnuAe4SwB/giphy.gif",
      "Leia Organa": "https://media0.giphy.com/media/K0y6Dr4Q2bPqTOCIzO/giphy.gif?cid=ecf05e47us33fe9rzusfjx7ocpwhzxmfiu6dwegmxjoxnw0g&rid=giphy.gif&ct=s",
      "Chewbacca": "https://media1.giphy.com/media/H7HvhT7Zwwrs1JwGhX/giphy.gif?cid=ecf05e4750koxqvmspzbge6s5vzl3ohkwcquexbedm8bh0ys&rid=giphy.gif&ct=s"
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
