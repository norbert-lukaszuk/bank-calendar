const db = window.firebase.firestore();
const fill = () => {
  const cat = [
    "Ubezpieczenie",
    "Rachunki-gaz",
    "Rachunki-śmieci",
    "Orange",
    "Rachunki-telefon",
    "VAT",
    "Kredyt",
    "Rachunki-woda",
    "Podatki-PPE",
    "ZUS",
    "Podatki-nieruchomość",
    "Internet",
    "Rachunki-prąd",
    "Czynsz",
    "Księgowość",
    "Securitas",
    "Rachunki-telewizja",
  ];
  cat.forEach((e) => {
    db.collection("categoriesReact")
      .add({
        categorieName: e,
        bankName: ["mbank", "pko"],
        titlePrefill: "",
        color: "",
        calendarId: "afqpdpcef0fvv5o39r3rvujte0@group.calendar.google.com",
        reminderTimes: [120, 1440],
      })
      .then((resp) => console.log(resp.id))
      .catch((err) => console.error(err));
  });
};
export default fill;
