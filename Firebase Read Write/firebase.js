let documents = [];

function firebaseOnload() {
  if (window.location.pathname != "/") return;

  updateDocs();
}

async function updateDocs() {

  $("#cardGroup").addClass("hide");
  $("#loadingSpinner").removeClass("hide");

  documents = [];
  let db = firebase.firestore();
  let docs = await db.collection("Notes").get();

  $("#cardGroup").empty();

  docs.forEach(doc => {
    const data = doc.data();

    documents.push({
      id: doc.id,
      data: data,
    });

    var card = $(`
      <div class="card">
        <div class="card-body">
          <h4 class="card-title"><span>${data.Book}</span><span style="color: rgba(255,255,255,0.59);font-size: 18px;margin-left: 16px;">${data.Chapter}</span></h4>
          <h6 class="text-muted card-subtitle mb-2">${data.Tags}</h6>
          <button class="btn btn-primary" role="button" onclick="openDoc('${doc.id}')">Open</button>
        </div>
      </div>
      `);
    
      $("#cardGroup").append(card);
  })

  $("#cardGroup").removeClass("hide");
  $("#loadingSpinner").addClass("hide");
}

function openDoc(id) {
  window.location = `/book.html?id=${id}`;
}

async function addDoc() {
  db = firebase.firestore();

  try {
    let success = await db.collection("Notes").add({
      Book: "Other Book"
    })

    updateDocs()
  } catch(e) {
    console.error(e);
  }


}

async function changeDoc(id, book) {
  db = firebase.firestore();

  try {
    let succes = await db.collection("Notes").doc(id).set({
      Book: book,
    })

    updateDocs()
  } catch(e) {
    console.error(e);
  }

  updateDocs()
}

async function removeFirstDoc() {
  db = firebase.firestore();

  try {
    let success = await db.collection("Notes").doc(documents[0].id).delete();

    updateDocs();
  } catch(e) {
    console.error(e);
  }
}