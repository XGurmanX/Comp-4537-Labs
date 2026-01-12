# Comp 4537 Labs Repository
### A Repository to store and update my Comp 4537 Labs 
 
## Instructions

Server is Run Online
- Open it https://comp-4537.gurmanpannu.dev

Server is Run locally
- by running ``` node server.js ``` in the terminal
- open at http://localhost:8080


 
## WorkFlow
- All new work and changes are pushed to **dev** branch. 
- After completion and testing locally it it then merged with the **main** branch
- Merging to the main branch then activates a trigger on the Cloud Run on Google Cloud
- This trigger rebuilds the server with the new changes.
    - *Rebuilds can take upto 1-2 minutes*
- Test server with new changes to make sure its works on the server