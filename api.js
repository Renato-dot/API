const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = mysql.createConnection({
  host: "ucka.veleri.hr",
  user: "rprebeg",
  password: "11", 
  database: "rprebeg", 
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL.");
});


app.get("/sport", (req, res) => {
  db.query("SELECT * FROM Sport", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post("/sport", (req, res) => {
  const { naziv_sporta, pripadajuci_tereni } = req.body;
  db.query(
    "INSERT INTO Sport (naziv_sporta, pripadajuci_tereni) VALUES (?, ?)",
    [naziv_sporta, pripadajuci_tereni],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, naziv_sporta, pripadajuci_tereni });
    }
  );
});

app.put("/sport/:id", (req, res) => {
  const { id } = req.params;
  const { naziv_sporta, pripadajuci_tereni } = req.body;
  db.query(
    "UPDATE Sport SET naziv_sporta = ?, pripadajuci_tereni = ? WHERE id = ?",
    [naziv_sporta, pripadajuci_tereni, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Sport updated successfully.");
    }
  );
});

app.delete("/sports/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Sport WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Sport deleted successfully.");
  });
});


app.get("/sportski_tereni", (req, res) => {
  db.query("SELECT * FROM Sportski_tereni", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post("/sportski_tereni", (req, res) => {
  const {
    sifra_terena,
    lokacija,
    ocjena,
    adresa,
    naziv_sporta,
    sifra_rezervacije,
  } = req.body;
  db.query(
    "INSERT INTO Sportski_tereni (sifra_terena, lokacija, ocjena, adresa, naziv_sporta, sifra_rezervacije) VALUES (?, ?, ?, ?, ?, ?)",
    [sifra_terena, lokacija, ocjena, adresa, naziv_sporta, sifra_rezervacije],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({
        id: result.insertId,
        sifra_terena,
        lokacija,
        ocjena,
        adresa,
        naziv_sporta,
        sifra_rezervacije,
      });
    }
  );
});

app.put("/sportski_tereni/:id", (req, res) => {
  const { id } = req.params;
  const {
    sifra_terena,
    lokacija,
    ocjena,
    adresa,
    naziv_sporta,
    sifra_rezervacije,
  } = req.body;
  db.query(
    "UPDATE Sportski_tereni SET sifra_terena = ?, lokacija = ?, ocjena = ?, adresa = ?, naziv_sporta = ?, sifra_rezervacije = ? WHERE id = ?",
    [
      sifra_terena,
      lokacija,
      ocjena,
      adresa,
      naziv_sporta,
      sifra_rezervacije,
      id,
    ],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Sportski teren updated successfully.");
    }
  );
});

app.delete("/sportski_tereni/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Sportski_tereni WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Sportski teren deleted successfully.");
  });
});


app.get("/rezervacije", (req, res) => {
  db.query("SELECT * FROM Rezervacije_terena", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post("/rezervacije", (req, res) => {
  const {
    sifra_rezervacije,
    datum_i_vrijeme_rezervacije,
    ime_korisnika_koji_rezervira,
    sifra_korisnika,
  } = req.body;
  db.query(
    "INSERT INTO Rezervacije_terena (sifra_rezervacije, datum_i_vrijeme_rezervacije, ime_korisnika_koji_rezervira, sifra_korisnika) VALUES (?, ?, ?, ?)",
    [
      sifra_rezervacije,
      datum_i_vrijeme_rezervacije,
      ime_korisnika_koji_rezervira,
      sifra_korisnika,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({
        id: result.insertId,
        sifra_rezervacije,
        datum_i_vrijeme_rezervacije,
        ime_korisnika_koji_rezervira,
        sifra_korisnika,
      });
    }
  );
});

app.put("/rezervacije/:id", (req, res) => {
  const { id } = req.params;
  const {
    sifra_rezervacije,
    datum_i_vrijeme_rezervacije,
    ime_korisnika_koji_rezervira,
    sifra_korisnika,
  } = req.body;
  db.query(
    "UPDATE Rezervacije_terena SET sifra_rezervacije = ?, datum_i_vrijeme_rezervacije = ?, ime_korisnika_koji_rezervira = ?, sifra_korisnika = ? WHERE id = ?",
    [
      sifra_rezervacije,
      datum_i_vrijeme_rezervacije,
      ime_korisnika_koji_rezervira,
      sifra_korisnika,
      id,
    ],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Rezervacija updated successfully.");
    }
  );
});

app.delete("/rezervacije/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Rezervacije_terena WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Rezervacija deleted successfully.");
  });
});


app.get("/korisnici", (req, res) => {
  db.query("SELECT * FROM Korisnik", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post("/korisnici", (req, res) => {
  const { sifra_korisnika, korisnicko_ime, e_mail, lozinka } = req.body;
  db.query(
    "INSERT INTO Korisnik (sifra_korisnika, korisnicko_ime, e_mail, lozinka) VALUES (?, ?, ?, ?)",
    [sifra_korisnika, korisnicko_ime, e_mail, lozinka],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({
        id: result.insertId,
        sifra_korisnika,
        korisnicko_ime,
        e_mail,
        lozinka,
      });
    }
  );
});

app.put("/korisnici/:id", (req, res) => {
  const { id } = req.params;
  const { sifra_korisnika, korisnicko_ime, e_mail, lozinka } = req.body;
  db.query(
    "UPDATE Korisnik SET sifra_korisnika = ?, korisnicko_ime = ?, e_mail = ?, lozinka = ? WHERE id = ?",
    [sifra_korisnika, korisnicko_ime, e_mail, lozinka, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Korisnik updated successfully.");
    }
  );
});

app.delete("/korisnici/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Korisnik WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Korisnik deleted successfully.");
  });
});


app.get("/ocjene_recenzije", (req, res) => {
  db.query("SELECT * FROM Ocjene_recenzije_terena", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post("/ocjene_recenzije", (req, res) => {
  const { sifra_recenzije, ocjena, komentar, sifra_korisnika } = req.body;
  db.query(
    "INSERT INTO Ocjene_recenzije_terena (sifra_recenzije, ocjena, komentar, sifra_korisnika) VALUES (?, ?, ?, ?)",
    [sifra_recenzije, ocjena, komentar, sifra_korisnika],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({
        id: result.insertId,
        sifra_recenzije,
        ocjena,
        komentar,
        sifra_korisnika,
      });
    }
  );
});

app.put("/ocjene_recenzije/:id", (req, res) => {
  const { id } = req.params;
  const { sifra_recenzije, ocjena, komentar, sifra_korisnika } = req.body;
  db.query(
    "UPDATE Ocjene_recenzije_terena SET sifra_recenzije = ?, ocjena = ?, komentar = ?, sifra_korisnika = ? WHERE id = ?",
    [sifra_recenzije, ocjena, komentar, sifra_korisnika, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Ocjena/Recenzija updated successfully.");
    }
  );
});

app.delete("/ocjene_recenzije/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Ocjene_recenzije_terena WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Ocjena/Recenzija deleted successfully.");
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
