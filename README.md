# jsd-final-project

About this project

This is the final project of my Javascript Development course.

The project is using The Sport Database api to get data, retrieve the data and show in the HTML page build as a Single Page App. 
User can input their favourite football player name in the input, will get the information of the selected player.

![Alt text](<Screen Shot html.png>)

Above is the screenshot search of the HTML page.

- When user input the player's name. 
- The outputResult will show brief player's info. 
- When the user clicked on the player's name, will bring them to (next page)
- which is the outputDetails page. In here, user can see the description about the player, the former team joined and the milestone's the player achieved.

---


![Alt text](<Screen Shot .png>)

Explain a technical hurdle 

In the search and testing the API stage was taking me some time.
In the data, I tried to use in search's search player by name, in lookups's player details by id,
player former teams by player's id and milestones by player's id.
In getting the response, I get confused that the response.data in line 27 and line 79 the 
player and players different. It toke me few hours to play around with it.

What I learned from this project?

I learned to read the development document!
Gareth also show me how to use the data that we stored in localstorage. By using JSON.stringify and JSON.parse to retrieve data from the localstorage. 

In the future version, I would like to add Web Speech API to let the user input search by speech recognition.



Kelly Lee

Project Link: https://leekkelly.github.io/jsd-final-project/


