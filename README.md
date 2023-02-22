# Industrialisasi Interface

This is the interface of Industrialisasi CMS. This interface is mainly developed using HTML, React.js, React-Bootstrap, and some CSS. There is a plan to introduce a more complex and visually enchanting UI, but I will not rush to it. This software comes with no support and guarantee. Use it at your own risk.

## To run it on your local computer, use this:
    git clone https://github.com/adipginting/industrialisasi-interface
    cd industrialisasi-interface
    npm install
    npm start
    
## To run it via docker:
    git clone https://github.com/adipginting/industrialisasi-interface
    cd industrialisasi-interface
    sudo docker run -p 3000:3000 -d
    
## To run it via docker compose:
Alternatively, I created this repository to run the whole website (the database server, the api server, and the front-end server) via docker compose (work in progress). See https://github.com/adipginting/industrialisasi

## To do and progress:
- [x] It displays a three navigation menus on header.
- [x] On register page, it does character contraints on email, username, and passwords.
- [x] It can send verification email to users.
- [x] Users can register.
- [x] Users can login.
- [x] If users are logged in, register and login URI is redictered to home page.
- [x] Users can read posts.
- [ ] Users can write posts.
- [ ] Users can write comments.
- [ ] Reply comments in one level thread.
- [ ] Improve styling.
