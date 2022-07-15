# df-api-template
demo/template code for calling the dialogflow API in order to build a custom chatbot! 

## structure
this template code consists of 2 main folders:
* **df-server** - for setting up connection to dialogflow, calling API, & returning formatted data
* **df- frontend** - to demo calling the API using vanilla javascript (fetch) & interacting with dialogflow

## df-server
in order to run the server properly, you will need to create a service account and download a JSON key for your dialogflow project in the google developer console. instructions on how to do that can be found in [this youtube video](https://www.youtube.com/watch?v=F2ibS4gcglY) (starting ~6:00).

> NOTE: this is for locally building/testing your own dialogflow endpoint. if you are interested in this exact endpoint that is implemented, it is currently hosted on heroku [here](https://github.com/rghosh96/df-api-heroku).

there is currently just one endpoint that's really implemented, which is `query-intent`. 

### `query-intent`
**purpose:** to chat with the dialogflow agent by sending your chat message and then receive a reply back

**request body:** should include 2 things: 
1. the `text` (string) query to be sent
2. some arbitrary `userId` (string)

example:
```
{
	"text": "Click here to begin! name=rashi age=25 location=gainesville",
	"userId": "rg-100196"
}
```

**response**: consists of up to 2 parts:
* the `agentText` (string), or what the agent says in response to your message
* `payload` (object); can be null if you do not send any type of payload from dialogflow. only 3 types of payloads are currently accounted for: `chips`, `button`, `description`

example:
```
{
    "agentText": "Hi Rashi, nice to meet you! As you may know, we're going to talk about clinical trials today. But before we dive in, how familiar are we with clinical trials?",
    "payload": {
        "chips": [
            "I've never heard of clinical trials before.",
            "I'm kind of familiar; I've heard the term before.",
            "I'm very familiar with clinical trials."
        ],
        "description": {
		    "title": "Clinical Trials - Interventions",
		    "text": [
		        "Medical products, such as drugs or devices",
		        "Procedures; or changes to participants' behavior, such as diet"
		    ]
		},
		"button": {
		    "link": "https://clinicaltrials.gov/ct2/about-studies/learn",
		    "text": "More information"
		}
    }
}
```

## df-frontend
**purpose:** to demonstrate chatbot capability on a front-end interface.

you can interact with the dialogflow agent from a front-end interface and fully customize what the chatbot looks like! below is an example:

![enter image description here](https://i.imgur.com/xV4DL8d.gif)



