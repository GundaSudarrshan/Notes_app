let body = document.querySelector("body");
let notesDisplay = document.querySelector(".notes_display");
let noteTitle = document.querySelector("#note_title");
let noteContent = document.querySelector("#note_content");
let noteFeatures = document.querySelector(".note_features");
let modal = document.querySelector(".modal");

const inputText = document.getElementById("input-text");
const btnMakeBold = document.getElementById("bold");
const btnUnderline = document.getElementById("underline");
const btnCopyText = document.getElementById("copy-text");

function bold() {
  const selectedText = window.getSelection.toString();
  document.execCommand("bold");
  console.log(selectedText.toString());
}
function underline() {
  const selectedText = window.getSelection.toString();
  document.execCommand("underline");
}
function copy() {
  const selectedText = window.getSelection.toString();
  document.execCommand("copy");
}
let notes = [];

noteTitle.addEventListener("click", () => {
  noteTitle.innerHTML = "";
  noteTitle.removeAttribute("readonly");
  noteFeatures.style.display = "block";

  noteTitle.placeholder = "Write a title..";
});

let saveNote = (event) => {
  if (event.target.localName !== "body") return;

  if (noteTitle.value === "" && noteContent.innerHTML === "") return;

  let note = {
    id: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(),
    title: noteTitle.value || "Untitled",
    content:
      noteContent.innerHTML.length > 20
        ? noteContent.innerHTML.trim(0, 20).concat("...")
        : noteContent.innerHTML,
  };
  noteFeatures.style.display = "none";
  notes.push(note);
  noteTitle.value = "";
  noteContent.innerHTML = "";

  displayNotes();
};

let displayNotes = () => {
  notesDisplay.innerHTML = "";
  notes.forEach((note) => {
    let noteDiv = document.createElement("div");
    let deleteButton = document.createElement("button");
    let editButton = document.createElement("button");
    let buttons = document.createElement("div");
    deleteButton.setAttribute("data-id", note.id);
    editButton.setAttribute("data-id", note.id);
    buttons.classList.add("button-elements");

    deleteButton.innerHTML = `<img data-id='${note.id}' src='https://www.veryicon.com/download/png/commerce-shopping/soft-designer-online-tools-icon/delete-77?s=256' width='15' height='15' alt='Delete'/>`;
    editButton.innerHTML = `<img data-id='${note.id}' src='https://icons.veryicon.com/png/o/miscellaneous/disneys-aladdin/edit-edit.png' width='15' height='15' alt='Delete'/>`;

    deleteButton.classList.add("delete_float");

    editButton.classList.add("edit_float");

    buttons.appendChild(deleteButton);
    buttons.appendChild(editButton);
    noteDiv.appendChild(buttons);

    let noteHeaderDiv = document.createElement("h1");
    let noteContentDiv = document.createElement("p");

    noteDiv.classList.add("note_card");
    noteHeaderDiv.classList.add("note_header");
    noteContentDiv.classList.add("note_content");

    noteHeaderDiv.innerHTML = note.title;
    noteContentDiv.innerHTML = note.content;

    noteDiv.appendChild(noteHeaderDiv);
    noteDiv.appendChild(noteContentDiv);

    notesDisplay.appendChild(noteDiv);
    noteDiv.addEventListener("mouseover", (event) => {
      deleteButton.classList.remove("delete_float");
      deleteButton.classList.add("delete_float_hover");
    });
    noteDiv.addEventListener("mouseout", (event) => {
      deleteButton.classList.remove("delete_float_hover");
      deleteButton.classList.add("delete_float");
    });
    noteDiv.addEventListener("mouseover", (event) => {
      editButton.classList.remove("edit_float");
      editButton.classList.add("edit_float_hover");
    });
    noteDiv.addEventListener("mouseout", (event) => {
      editButton.classList.remove("edit_float_hover");
      editButton.classList.add("edit_float");
    });

    editButton.addEventListener("click", (event) => {
      let targetId = event.target.getAttribute("data-id");
      console.log(targetId);
      if (note.id == targetId) {
        let modalDiv = document.createElement("div");
        let modalView = document.querySelector(".modal-view");
        let modalInputContainer = document.createElement("div");
        let modalTitle = document.createElement("input");
        let modalContent = document.createElement("div");
        let modalButtons = document.createElement("div");
        let modalBoldButton = document.createElement("button");
        let modalUnderlineButton = document.createElement("button");
        let modalCopyButton = document.createElement("button");
        let modalSave = document.createElement("button");
        let modalId = note.id;
        modalTitle.value = note.title;
        modalContent.innerHTML = note.content;
        console.log(note);
        modalInputContainer.classList.add("modal-input-container");
        modalTitle.classList.add("modal-title");
        modalContent.classList.add("modal-content");
        modalDiv.classList.add("modal-div");
        modalButtons.classList.add("modal-buttons");
        modalBoldButton.classList.add("modal-bold");
        modalUnderlineButton.classList.add("modal-underline");
        modalCopyButton.classList.add("modal-copy");
        modalSave.classList.add("modal-save");
        modalButtons.appendChild(modalBoldButton);
        modalButtons.appendChild(modalUnderlineButton);
        modalButtons.appendChild(modalCopyButton);
        modalButtons.appendChild(modalSave);

        modalInputContainer.appendChild(modalTitle);
        modalInputContainer.appendChild(modalContent);

        modalDiv.appendChild(modalInputContainer);
        modalDiv.appendChild(modalButtons);
        modalView.appendChild(modalDiv);
        modalContent.setAttribute("contenteditable", "true");
        modalContent.setAttribute("spellcheck", "false");
        document.querySelector(".main_section").style.display = "none";

        modalBoldButton.innerHTML = `<i class="fa-solid fa-bold"></i>`;
        modalUnderlineButton.innerHTML = `<i class="fa-solid fa-underline"></i>`;
        modalCopyButton.innerHTML = `<i class="fa-solid fa-copy"></i>`;
        modalSave.innerHTML = "save";

        modalBoldButton.addEventListener("click", bold);
        modalUnderlineButton.addEventListener("click", underline);
        modalCopyButton.addEventListener("click", copy);
        modalSave.addEventListener("click", function () {
          let title_updated = modalTitle.innerHTML;

          note.id = modalId;
          note.title = modalTitle.value;
          note.content = modalContent.innerHTML;

          console.log(notes);
          modalDiv.style.display = "none";
          document.querySelector(".main_section").style.display = "block";
          displayNotes();
        });
      }
    });
    deleteButton.addEventListener("click", (event) => {
      let idToBeDeleted = event.target.getAttribute("data-id");

      notes = notes.filter((note) => {
        if (note.id !== idToBeDeleted) {
          return true;
        }
        return false;
      });
      displayNotes();
      console.log(notes);
    });
  });
};

body.addEventListener("click", saveNote);
