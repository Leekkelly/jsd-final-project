console.log(`Final Project`);
console.log(axios);
//DOM Content Loaded for detect the page loads up to retrieve element tag
document.addEventListener("DOMContentLoaded", function(){

  //listen for the form submit event
  const searchForm = document.querySelector('#searchForm');
  const searchText = document.querySelector('#searchText');
  const outputResultsDiv = document.querySelector('#outputResults');
  const outputDetailsDiv = document.querySelector('#outputDetails');
  const formerTeamDiv = document.querySelector('#formerTeam');
  const milestonesDiv = document.querySelector('#milestones');

  searchForm.addEventListener('submit', (ev) => {
      //to stop reload the page
      ev.preventDefault();

      console.log(`user input:`, searchText.value );

      // const url = `https://thesportsdb.com/api/v1/json/3/searchplayers.php?p=Danny_Welbeck`;
      const url = `https://thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchText.value}`;
      //try Lionel Messi, Harry Kane, Kylian Mbappe, 
      
      // axios.get(`http://www.numbersapi.com/${userNumber.value}?json`).then( function(response){
      axios.get(url).then( function(response){
          console.log(`response:`, response);
          console.log(`response by url`, response.data); //url 1st AJAX
          // console.log(https://thesportsdb.com/api/v1/json/3/lookupplayer.php?id=34146370);
          outputResultsDiv.innerHTML = '';
          formerTeamDiv.innerHTML = '';
          milestonesDiv.innerHTML = '';

          for ( const player of response.data.player){
            console.log(player);
            console.log(`player date born:`, player.dateBorn);
            console.log(`player id:`, player.idPlayer);
            console.log(`player name:`, player.strPlayer);
            console.log(`strBirthLocation`, player.strBirthLocation);

            const playerImgUrl = `${player.strCutout}`;
            // const playerImgUrl = `https://placekitten.com/200/300`;
            // localStorage.setItem(`Player`,`${searchText.value}`);
            // localStorage.clear();
            outputResultsDiv.innerHTML += `
              <div class="player">
                <h2 data-id="${player.idPlayer}">${ player.strPlayer}</h2> 
                
                <img src="${playerImgUrl}" alt="Image" /> 
                <p>
                    <p>player date born: ${player.dateBorn} </p>
                    <p>player birth location: ${ player.strBirthLocation} </p>
                </p>
              </div>
              `;
          }
      })
      .catch(function(err){ //try 123 to throw error
        console.warn(`Error to load player results`, err);
        outputResultsDiv.innerHTML = 'There was an error to show player info, please try again!'
      });
      //hide and show detail
      outputDetailsDiv.style.display = 'none';
      outputResultsDiv.style.display = 'block';

  });

  outputResultsDiv.addEventListener('click', ev => {
    console.log(`click`, ev.target);

    if(ev.target.nodeName === 'H2'){
      console.log(`clicked player name`);
      const playerId = ev.target.dataset.id;
      const playerDetailsUrl = `https://thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`;
      //since current team details need to pay, I used player former teams instead
      const playFormerTeamsUrl = `https://thesportsdb.com/api/v1/json/3/lookupformerteams.php?id=${playerId}`;
      const playerMilestonesUrl = `https://thesportsdb.com/api/v1/json/3/lookupmilestones.php?id=${playerId}`;
      
      axios.get(playerDetailsUrl).then(function(response){
          console.log(response)
          showPlayerDetails(response.data.players);

      })
      .catch(function(err){
          console.warn(`Error to loading player detail`, err);
      });

      axios.get(playFormerTeamsUrl).then(function(response){
        console.log(`formteam`,response)
        showFormerTeamInfo(response.data.formerteams)
      })
      .catch(function(err){
          console.warn(`Error to loading former team info`, err);
      });

      axios.get(playerMilestonesUrl).then(function(response){
        console.log(`milestones`, response);
        showPlayerMilestones(response.data.milestones)
      })
      .catch(function(err){
        console.warn(`Error to loading player milestones`, err);
      })

      outputResultsDiv.style.display = 'none';
      outputDetailsDiv.style.display = 'block';
        
    }
  });

  function showPlayerDetails(player){
    const playerImgUrl = `${player[0].strThumb}`;
    // console.log(`showPlayer details img`,player[0].strCutout);

    outputDetailsDiv.innerHTML = `
        <div>
          <img src="${playerImgUrl}" alt="Image" />
          <h3>${player[0].strPlayer}</h3>
          <p>Player's Nationality: ${player[0].strNationality}</p>
          <p>About this player : ${player[0].strDescriptionEN}</p>
          <p>Player's Height: ${player[0].strHeight}</p>
          <p>Player's Weight: ${player[0].strWeight}</p> 
        </div>
    `;
  }

  function showFormerTeamInfo(player){
    console.log(`former team info:`,player[0].strFormerTeam);
    formerTeamDiv.innerHTML = `
      <div>
        <p>Former team: ${player[0].strFormerTeam}</p>
      </div>
    `;
  }

  function showPlayerMilestones(player){
    console.log(`milestones`, player[0].strMilestone );

    //try for local storage to get the string to array
    // localStorage.setItem(`Player`,`${JSON.stringify(player)}`);
    // const milestone = JSON.parse(localStorage.Player);
    // console.log(milestone);

    //use .map()here to get all the achieve player done, .join to help show all milestone together 
    milestonesDiv.innerHTML = `
      <h3>Milestones:</h3>
      <ul>
          ${player.map(player => 
            `<li>${player.strMilestone}</li>`).join('')}
      </ul>
      <button id="bookmark">Bookmarked it!</button>
    `;
  }

});