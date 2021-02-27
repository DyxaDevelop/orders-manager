# orders-manager
A project written in ReactJS that allows you to manage orders in a company./
The user interface has the ability to create orders, as well as view a list of all orders with the ability to load data from the database.

The project uses the following technologies: ReactJS, React-router, NodeJS, ExpressJS , MySQL

# Installing

The project is divided into 2 parts: Front-End and Back-end.
They work separately and, if you wish, you can change one of the parts to your own, adhering to the settings

In both parts you need to install modules

```
npm i
```
Later in the index.js file in the server folder, you need to configure the connection to the database
```javascript
const conn = mysql.createConnection({
    // DB connecting here
    host: "localhost",
    user: "root",
    database: "users",
    password: "root"
});
```

The MySQL database is used here, an example database with a valid structure is located in the server folder in the db.sql file

And then run them separately

```
npm start
```

# Screenshots of the application:
![image](https://user-images.githubusercontent.com/47272018/109397743-ed3d0880-7940-11eb-8138-cdb6db64f6d2.png)
![image](https://user-images.githubusercontent.com/47272018/109397766-16f62f80-7941-11eb-9aa9-38b34471e8e8.png)
![image](https://user-images.githubusercontent.com/47272018/109397772-1cec1080-7941-11eb-8e5e-8ad3bd91a7d9.png)
![image](https://user-images.githubusercontent.com/47272018/109397774-21b0c480-7941-11eb-8678-6888ca130434.png)
![image](https://user-images.githubusercontent.com/47272018/109397835-82400180-7941-11eb-8f03-2034a5c273f1.png)


# An example of a generated invoice: 
![image](https://user-images.githubusercontent.com/47272018/109397797-3d1bcf80-7941-11eb-9334-a0f923314b77.png)




