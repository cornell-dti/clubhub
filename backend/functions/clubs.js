const express = require("express");
const router = express.Router();
const firestore = require("@google-cloud/firestore");
const admin = require("firebase-admin");
const db = admin.firestore();

router
  .route("/:category?")
  .get((req, res) => {
    (async () => {
      try {
        const now = new Date();
        const query = db.collection("clubs");
        const response = await query
          .where("due", ">", now)
          .orderBy("due")
          .get()
          .then((querySnapshot) => {
            return querySnapshot.docs.map((doc) => {
              const data = doc.data();
              const due = data.due.toDate();
              return {
                name: data.name,
                category: data.category,
                due: due,
                link: data.link,
              };
            });
          });
        return res.status(200).send(response);
      } catch (e) {
        console.log(e);
        return res.status(500).send(e);
      }
    })();
  })
  .post((req, res) => {
    (async () => {
      try {
        const dateDue = new Date(req.body.due);
        const timestampDue = firestore.Timestamp.fromDate(dateDue);
        await db.collection("clubs").add({
          name: req.body.name,
          category: req.body.category,
          due: timestampDue,
          link: req.body.link,
          image: null,
        });
        return res.status(200).send(`Added ${req.body.name}!`);
      } catch (e) {
        console.log(e);
        return res.status(500).send(e);
      }
    })();
  });

router.route("/:category").get((req, res) => {
  (async () => {
    try {
      const document = db.collection("clubs").doc(req.params.id);
      let club = await document.get();
      let response = club.data();
      response.due = response.due.toDate();

      return res.status(200).send(response);
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  })();
});

module.exports = router;
