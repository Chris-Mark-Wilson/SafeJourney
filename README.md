##SafeJourney
API key for google map api's is stored in app.json
New api key generated in google api's registered under SafeJourney project name.

currently failing to render user location on map...
current theory - not using expo location as yet, i have a feeling once we use it, it will set permissions on the phone to allow us access to the use location, then the user location will be rendered.
Docs state permission must be sought to use the showsUserLocation prop in mapview but we didnt do that in the test app, hence the theory of once we start to use the Location.requestForegroundPermissionsAsync() method from the expo.location package, this will be carried out automatically.
