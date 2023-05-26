const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const cors = require("cors");
const connection = require("./connection");
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.get("/api/v1/tasks", (req, res) => {
  connection.query("select * from task", (error, result) => {
    if (error) {
      res.json({ error });
    } else {
      res.json({ result });
    }
  });
});
server.post("/api/v1/tasks", (req, res) => {
  const { content, dueDate, statues, assignedTo } = req.body;
  const value = [content, dueDate, statues, assignedTo];
  connection.query(
    "insert into task(content, dueDate, statues, assignedTo) value(?,?,?,?)",
    value,
    (error, result) => {
      if (error) {
        res.json({ error });
      } else {
        res.json({ result });
      }
    }
  );
});
server.put("/api/v1/tasks/:id", (req, res) => {
  const id = req.params.id;
  const { content, dueDate, statues, assignedTo } = req.body;
  const value = [content, dueDate, statues, assignedTo, id];
  connection.query(
    "update task set content=?,dueDate=?,statues=?,assignedTo=?where id=?",
    value,
    (error, result) => {
      if (error) {
        res.json({ error });
      } else {
        res.json({ result });
      }
    }
  );
});
server.delete("/api/v1/tasks/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  connection.query(`delete from task where id=${id}`, (error, result) => {
    if (error) {
      res.json({ error });
    } else {
      res.json({ result });
    }
  });
});
server.listen(4000, () => {
  console.log("http://localhost:4000");
});
