const router = require("express").Router();
const client = require("../connection");

//create movie
router.post("/create", async (req, res) => {
  const movie = req.body;
  console.log(movie)
  let insertQuery = `insert into movies(name,description,releasedate,rating,ticketprice,country,genre,photo,slug)
                  values('${movie.name}', '${movie.description}', ${movie.releasedate}, 
                        ${movie.rating}, '${movie.country}', ${movie.ticketprice}, 
                        '${movie.genre}','${movie.photo}', '${movie.slug}') RETURNING *`

  client.query(insertQuery, (err, result) => {
    console.log("we thank GOD, for life");
    console.log(result);
    if (!err) { 
      // res.send(result);
      //  res.send('insertion was successful', result)
       res.status(200).send(result)
    } else {
      console.log(err.message); 
    }
  });
  client.end; 
});

//get all movies

router.get("/movies", (req, res) => {
  client.query(`Select * from movies`, (err, result) => {
    if (!err) {
      // res.send(result.rows);
      res.status(200).send(result.rows)
    }
  });
  client.end;
});
// client.connect();

//get movie by id
router.get("/movies/:id", (req, res) => {
  client.query(
    `Select * from movies where id=${req.params.id}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    }
  );
  client.end;
});
// client.connect();

//get movie by slug
router.get("/slug/:slug", async (req, res) => {
  client.query(
    `Select * from movies where slug=${req.params.slug}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    }
  );
  client.end;
});
// client.connect();

router.put("/movies/:id", async (req, res) => {
  let movie = req.body;
  let updateQuery = `update movies
                       set name = '${movie.name}',
                       description = '${movie.description}',
                       releaseDate = '${movie.releaseDate}',
                       rating = '${movie.rating}',
                       country =  '${movie.country}',                `;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

module.exports = router;
