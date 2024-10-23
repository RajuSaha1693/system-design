import express from "express";
const app = express();
app.use(express.json());
const PORT = 3001;
let superHero = [
  {
    id: 1,
    name: "Superman",
    comic: "DC",
  },
  {
    id: 2,
    name: "Captain America",
    comic: "Marvel",
  },
];

app.get("/api/superhero", (req, res) => {
  res.send(superHero);
});

app.post("/api/superhero", (req, res) => {
  const body = req.body;
  superHero = [...superHero, body];
  res.status(200);
  res.send("Success");
});
app.put("/api/superhero/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  superHero = superHero.map((hero) => {
    if (hero.id == id) {
      return { id, ...body };
    }
    return hero;
  });
  res.json(superHero);
});
app.delete("/api/superhero/:id", (req, res) => {
  const id = req.params.id;
  superHero = superHero.filter((hero) => hero.id != id);
  res.json(superHero);
});
app.patch("/api/superhero/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body);
  const foundHero = superHero.find((hero) => hero.id == id);
  superHero = superHero.map((hero) => {
    if (hero.id == id) {
      return {
        ...foundHero,
        ...body,
      };
    }
    return hero;
  });
  res.json(superHero);
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
