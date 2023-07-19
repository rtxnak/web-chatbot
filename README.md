# web-chatbot
## About project

This project was developed to a technical test with the [skills](#skills) on a full stack situation. Its a chatbot, it can interpret the terms: "Hello," "Goodbye," "Good," "I want" to initiate a conversation thread with the user.
Its necessary to create an account and login to continue the conversation.

Upon encountering the term "loan" will display three options:
 - "Do you want to apply for a loan?";
 - "Loan conditions";
 - "Help";

Each option have a information and a reference link about

And beside chatbot page, there is a chatbot history page that shows all ended conversations and there is the possibility to download the conversation in CSV format

Note: to end a conversation and for it to be saved, it is necessary to end the conversation with the term "goodbye"

All the users information and chats will be saved on a database.

## Skills 
On FrontEnd:
 - Functional Programming in Javascript is the base language;
 - ReactJs/NextJs and Tailwindcss to create the pages;
 - Axios to do the API connection;

On BackEnd:
 - OOP in Typescript is the base language;
 - NestJs framework from Node.js;
 - ODM library typeORM for MSQL database modeling;


## Opening the app locally
 
On terminal:

1. Please install and check the version of the following services on your system:

[Docker](https://docs.docker.com/get-docker/)
```bash
  docker -v
```
[Docker-Compose](https://docs.docker.com/compose/install/)
```bash
  docker-compose -v
```

2. Clone the repository in your preferred folder
```bash
  git clone git@github.com:rtxnak/web-chatbot.git
```

3. Move to app folder
```bash
  cd web-chatbot/ 
```

4. Run the application with docker-compose
```bash
  npm run compose:up
```

5. The application can be accessed through:

    http://localhost:3000/

6. Finishing the application
```bash
  npm run compose:down
```

