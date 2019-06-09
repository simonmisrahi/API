const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");

const config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Misrahi123",
    database: "fs_bnb_1"
  };

const connection = mysql.createConnection(config);
connection.connect();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post("/api/users", (req,res) => {
    const user = req.body;
    console.log(user);


    connection.query("INSERT INTO user set ?", user, (err,result) => {
        console.log('HERE 2');
        if (err) {
            console.log(err);

            if (err.code === "ER_DUP_ENTRY"){
                return res.status(400).json({message: err.sqlMessage})
        }    else {
            return res.status(500).json({message: "Failed to insert"});
        }
    }

        console.log(result);

        var responseUser = {
            id: result.insertId,
            name: user.name,
            email: user.email,
            password: user.password
        };

        return res.status(200).json(responseUser);
    
    });

});

app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;
  
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [userId],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Failed to select" });
        }
  
        if (result.length === 0) {
          return res.status(404).json({ message: "No user found for ID" });
        }
  
        const userResponse = {
          id: result[0].id,
          name: result[0].name,
          email: result[0].email
          // Hide password...
        };
  
        return res.status(200).json(userResponse);
      }
    );
  });
app.post("/api/auth", (req, res) => {
    const authReq = req.body;
  
    connection.query(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [
          authReq.email,
          authReq.password
      ],
      (err, result) => {
          if (err) {
              return res.status(500).json({message: "Failed to login"});
          }
  
          if (result.length === 0) {
              return res.status(401).json({message: "Invalid email or password"});
          }
  
          const responseUser = {
              id: result[0].id,
              name: result[0].name,
              email: result[0].email
          };
  
          return res.json(responseUser);
      }
    );
  })

  app.post("/api/providers", (req,res) => {
    const user = req.body;
    console.log(user);


    connection.query("INSERT INTO user set ?", user, (err,result) => {
        console.log('HERE 2');
        if (err) {
            console.log(err);

            if (err.code === "ER_DUP_ENTRY"){
                return res.status(400).json({message: err.sqlMessage})
        }    else {
            return res.status(500).json({message: "Failed to insert"});
        }
    }

        console.log(result);

        var responseUser = {
            id: result.insertId,
            name: user.name,
            email: user.email,
            password: user.password
        };

        return res.status(200).json(responseUser);
    
    });

});

app.get("/api/providers/:id", (req, res) => {
    const userId = req.params.id;
  
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [userId],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Failed to select" });
        }
  
        if (result.length === 0) {
          return res.status(404).json({ message: "No user found for ID" });
        }
  
        const userResponse = {
          id: result[0].id,
          name: result[0].name,
          email: result[0].email
          // Hide password...
        };
  
        return res.status(200).json(userResponse);
      }
    );
  });

app.listen(3000, () => console.log("Listening on 3000"));