const express = require("express");
const mysql = require("mysql2");

const app = express();

// MYSQL CONNECTION
// const db = mysql.createPool({
//   host:,
//   user:,
//   password:,
//   useranme:,
// })

app.use("/", (req, res) => {
  res.json({ message: "call on me valerie, come and see me" });
});

// CHECKS FOR CONNECTION TO SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running smoothly on port ${PORT}`);
});
