import * as express from "express";
import * as firestore from "@google-cloud/firestore";
import * as admin from "firebase-admin";
const router = express.Router();
const db = admin.firestore();

//TODO: Factor out the operation Date -> Timestamp and vice versa

router
  .route("/:category?")
  .get((req, res) => {
    (async () => {
      try {
        // const orderByName = req.query.orderByName;
        const now = new Date();
        const query = db.collection("clubs");
        const category = req.params.category;
        const response = await (category
          ? query.where("category", "==", category)
          : query
        )
          .where("due", ">", now)
          .orderBy("due")
          .orderBy("foldedName")
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
                image: data.image,
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
        const foldedName = foldName(req.body.name);
        await db.collection("clubs").add({
          name: req.body.name,
          foldedName: foldedName,
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

const foldName = (name: string) =>
  name.toLowerCase().replace(/[^0-9A-Z]+/gi, "");

export default router;
