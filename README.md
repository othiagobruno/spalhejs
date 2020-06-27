Spalhe
SESSION & USERS
create user
POST - http://165.227.187.193/users

init session
POST - http://165.227.187.193/sessions

get only user
GET - http://165.227.187.193/users/{id}

get unfollowed users
GET - http://165.227.187.193/users/unfollowed (obs: todos os usuários que eu não sigo)

upload profile photo
POST - http://165.227.187.193/users/{uid}/upload

checks if the username exists
POST - http://165.227.187.193/users/username (obs: verifica pra saber se o username já existe)

Modelo de tabela para users
id => primary key
name => string
avatar => string
username => string
biography => string
website => string
email => string
senha => string md5
private => boolean
color => string (cores para o perfil definida pelo usuário)
token => string (usado para notificação por push)
status => data (caso o usuário desative a conta ou passe mais de 3 meses sem entrar)
MODELO DE ESTRUTURA DE RESPOSTA JSON - USERS
{"user":{
"id": 1,
"name":"User Test",
"avatar":"http://url",
"username":"usertest",
"biography": "hello world guys",
"private": true,
"website": "googl.cl",
"color": "red",
"follows":{
"following": 3,
"followers": 17,
},
"posts_count": 2,
"following_user": true,
}}
following_user => TRUE or FALSE caso eu estaja seguindo ou não o usuario requisitado. se for o meu perfil ele retorna nulo
FOLLOWS
follow user
POST - http://165.227.187.193/users/{uid}/follow

unfollow user
DELETE - http://165.227.187.193/users/{uid}/follow

get list of following
GET - http://165.227.187.193/users/{uid}/following (obtem lista de quem eu sigo)

get list of followers
GET - http://165.227.187.193/users/{uid}/followers (obtem lista de quem me segue)

POSTS
get all posts from user id
GET - http://165.227.187.193/users/{id}/posts (verifica se a conta é privada ou não)

get all posts
GET - http://165.227.187.193/posts (obs: dos usuários que eu sigo)

get post by id
GET - http://165.227.187.193/posts/{id} (verifica se a conta é privada ou não)

create posting
POST - http://165.227.187.193/posts

update posting by id
PUT - http://165.227.187.193/posts/{id}

delete posting by id
DELETE - http://165.227.187.193/posts/{id}

MODELO DE ESTRUTURA DE RESPOSTA JSON
[{
"user":{
"id": 1,
"name":"User Test",
"avatar":"http://url",
"username":"usertest"
},
"description": "hello world",
"id": 21,
"created_at":"2020/02/02",
"updated_at": null,
"count_likes": 20,
"count_comments": 12,
"count_shares": 2,
"files": [
{"url": "file1", "type": "image"},
{"url": "file2", "type": "video"}
]
}]
COMMENTS
create comments in posts
POST - http://165.227.187.193/posts/{id}/comments

get all comments in post
GET - http://165.227.187.193/posts/{id}/comments

delete a comment post
DELETE - http://165.227.187.193/posts/{id}/comment/{id}

LIKES
create/insert likes in post
POST - http://165.227.187.193/posts/{id}/likes

get likes in post
GET - http://165.227.187.193/posts/{id}/likes (obs: busca os dados do usuário também)
