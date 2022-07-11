let url = "http://localhost:3030/query-intent"

var form = document.getElementById("myForm");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

async function testDfApi(text = "") {
  var div = document.getElementById('div1');
  let userText;
  while(div.firstChild){
      div.removeChild(div.firstChild);
  }
  if (text !== "") {
    userText = text;
  } else {
    userText = document.getElementById('userInput').value 
  }

  
  let data = {
    "text": userText,
    "userId": "mh-test"
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    });
    
    response.json().then(data => {
      console.log(data);
      let payload = data.payload

      if (payload.chips) {
        for (let i = 0; i < payload.chips.length; i++) {
          const chip = document.createElement("button");
          const node = document.createTextNode(payload.chips[i]);
          chip.appendChild(node);
          chip.onclick = function() { testDfApi(payload.chips[i]) };

          const element = document.getElementById("div1");
          element.appendChild(chip);
        } 
      }

      if (payload.button) {
        const button = document.createElement("a");
        const node = document.createTextNode(payload.button.text);
        button.appendChild(node);
        button.href = payload.button.link;
        button.target = "_blank"

        const element = document.getElementById("div1");
        element.appendChild(button);
      }

      if (payload.description) {
        console.log(payload.description)
        const element = document.getElementById("div1");
        const title = document.createElement("h3");
        const node = document.createTextNode(payload.description.title);
        title.appendChild(node)
        element.appendChild(title)

        for (let i = 0; i < payload.description.text.length; i++) {
          const text = document.createElement("p");
          const node = document.createTextNode(payload.description.text[i]);
          text.appendChild(node)
          element.appendChild(text)
        }
      }

      document.getElementById('df-text').innerText = data.agentText
      document.getElementById('userInput').value = ""
    });

  }
    
    //Click here to begin! name=rashi age=25 location=gainesville

