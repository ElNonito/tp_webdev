Epfbook is a simple demonstrator of what can be done quickly with node.js. It is a server that provide a variety of endpoints using basic techniques  of web development. It was realized (with this documentation) under 24 hours for a school project.   

# Installation

For the installation you will need git, npm and nvm

```git clone <your-
git clone https://github.com/ElNonito/tp_webdev/ && cd tp_webdev/epfbook
nvm install
npm install
```

To run the app:

```node app.js```

To run the app in development environment :

``` npm run dev```



# Endpoints  

## / 

The home page it contains a simple string

# /api/login

It's a non functional demonstrator of cookie logging (needs to use insomnia to make it work)

# /students

Renders a page showing all students in the database.

# /students/create

Show a user-friendly page to adds students in the data base via a form.

# /students/data

It shows basic graphs made in c3js. The data to make the graph is non-related to the application.

# /student/:id

Shows the personnal page of a Student. Propose a form to modify student data.


# /api/students

Is an api endpoint to Retrieve students in the database via a GET request.

# /api/students/create 

Is an api endpoint to add a students to the database via a POST request.

The body of the request must be:

``` {name:"your_name", school:"your_school"}```


# consuming an api questions :

In the Rick and Morty the character of id 5 is Jerry Smith.
To do so I requested the following endpoint with a browser : https://rickandmortyapi.com/api/character/5
