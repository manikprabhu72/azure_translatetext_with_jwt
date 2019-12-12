# azure_translatetext_with_jwt

I have created different routes to work with JWT and without JWT. below are the details to test the api:

I. Test without JWT:

Endpoint: 

POST:
http://68.183.144.13:4000/translate

Body Params:
1. Name: translateTo, Description: Array of strings which are the list of languages to be translated to (ex: "de", "it","ar"), Required.
2. Name: text, Description: Sentence to be translated. (ex: "Hello World"), Required.

Testing from Postman:

1. Enter the above URL and in the request body, select type as raw and from the dropdown select JSON.
2. Pass the above required params in the body in JSON format.

Ex:
{"translateTo": ["de", "it","ar"],"text": "How are you"}

Sample Response:
[
    {
        "detectedLanguage": {
            "language": "en",
            "score": 1
        },
        "translations": [
            {
                "text": "Wie geht es dir",
                "to": "de"
            },
            {
                "text": "Come stai",
                "to": "it"
            },
            {
                "text": "كيف حالك",
                "to": "ar"
            }
        ]
    }
]


II. Testing with JWT:

Two requests to be made.

one is to authenticate and get jwt. 

second one to translate the text using the jwt from the first .

Endpoint 1:

POST
http://68.183.144.13:4000/user/login
Body Params:
1. Name: username, value:"Manik", Required. Hardcoded username.
2. Name: password, value: "jwt", Required. Hardcoded password.

Below is Request Body:

{
	"username": "Manik",
	"password":"jwt"
}

Response:

1. Name: accessToken, Description: use this accesToken to make further requests.

Sample Response:

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFuaWsiLCJpYXQiOjE1NzYxMTcxMDcsImV4cCI6MTU3NjExNzgyN30.qsz9Q7jtgP0nsW2UWEJJ6fHSa7vUk4RWrYH59Sxm2ss"
}

Endpoint 2:

POST
http://68.183.144.13:4000/user/translate

Body Params: Same as Section I Endpoint.

Headers:

1. key: 'Authorization', value: Access token from the endpoint 1 (ex: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFuaWsiLCJpYXQiOjE1NzYxMTcxMDcsImV4cCI6MTU3NjExNzgyN30.qsz9Q7jtgP0nsW2UWEJJ6fHSa7vUk4RWrYH59Sxm2ss ).

Response:

[
    {
        "detectedLanguage": {
            "language": "en",
            "score": 1
        },
        "translations": [
            {
                "text": "Wie geht es dir",
                "to": "de"
            },
            {
                "text": "Come stai",
                "to": "it"
            },
            {
                "text": "كيف حالك",
                "to": "ar"
            }
        ]
    }
]


