# A demo app to assign members on teams

This app use firebase real time database to store information about members

Then it can generate an assignment of those members on teams
based on the information proided on each member.

Right know only the role of each member is taken into consideration for
the lane.

## Instalation

npm install to install the packages

Create a .env file at the root folder with:
1.  REACT_APP_API_KEY = "YOUR_FIREBASE_KEY"
2.  REACT_APP_DB_URL = "YOUR DB_URL" (without the final /) 

## FireBase

1. Create a project
2. enable authentication with email & password
3. Create a realtime Dabase 
4. set read & write rules for authenticated users only
