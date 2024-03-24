hello I have completed the given functionalities


step 1-> clone the repo
step 2 -> npm install 
step 3 -> set the env variables (PORT,MONGODB_URL,JWT_SECRET)


Apis for auth 
1) signup ->/api/v1/signup
2) login  -> api/v1/login

Apis for notes (ALL the routes is for Authenticated user only 
1) create a note -> POST /api/v1/auth/notes
2) get all notes -> GET api/v1/auth/getnotes
3) note by id -> GET api/v1/auth/checknote/:id
4) update note by id -> PUT api/v1/auth/notes/:id
5) delete note by id - DEL api/v1/auth/delnotes/:id
6) share a note -> POST api/v1/auth/notes/:id//share
7) for search -> post api/v1/auth/search

I have also used rate limiter and throttling to optimize APIS
