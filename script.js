(function () {
  alert('просьба проверить в последний день')
  const BODY = document.getElementById("body");
  const KEYS = window.RS_SCHOOL.KEYS || {};

  const letters2 = [];
  let isShift = false;
  let isAltPresssed = false;
  let isCapsLock = false;
  let isCtrlKeyPresssed = false;
  let isEnglish = true; 

  const TITLE = document.createElement("p");
  let titleText = document.createTextNode("RsApp Keyboard");
  TITLE.classList.add("title");
  TITLE.appendChild(titleText);
  const info = document.createElement("p");
  let infoText = document.createTextNode("Клавиатура создана в ОС Windows. Смена языка 'Alt+Shift'");
  info.classList.add("info");
  info.appendChild(infoText);
  const TEXTAREA = document.createElement("textarea");
  TEXTAREA.classList.add("textarea");

  function handleBtnInput(code, ru, en, isCTRLPressed, event) {

    // let prevAltPressed = false;

    // if (!prevAltPressed && event.altKey) {
    //   isAltPresssed = true;
    // }
    // if (prevAltPressed && !event.altKey) {
    //   isAltPresssed = false;
    // }
    // prevAltPressed = event.altKey;


    switch (code) {
      case "MetaLeft":
      case "ControlLeft":
      case "ControlRight":
      case "ShiftLeft":
      case "ShiftRight":
      case "ArrowUp":
      case "ArrowRight":
      case "ArrowDown":
      case "ArrowLeft":
        break;

      case "AltLeft":
      case "AltRight":
        if (isCTRLPressed) {
          isEnglish = !isEnglish;
        }
        break;
      case "Space":
        KEYS[code] = {
          ru: " ",
          en: " ",
        };

        letters2.splice(cursorPosition || letters2.length, 0, " ");
        break;
      case "CapsLock":
        isCapsLock = !isCapsLock;
        break;
      case "MetaLeft":
        break;
      case "Backspace":
        letters2.splice(cursorPosition - 1, 1);
        break;
      case "Tab":
        letters2.splice(cursorPosition || letters2.length, 0, "    ");

        break;
      case "Enter":
        letters2.splice(cursorPosition || letters2.length, 0, "\r\n");

        break;
      case "Delete":
        letters2.splice(cursorPosition, 1);

        break;
      default:
        let letter = KEYS[code].en;

        if (!isEnglish && KEYS[code].ru) {
          letter = KEYS[code].ru;
        }

        if (isShift && isEnglish && KEYS[code].enAlt) {
          letter = KEYS[code].enAlt;
        }

        if (isShift && !isEnglish && KEYS[code].ruAlt) {
          letter = KEYS[code].ruAlt;
        }

        letters2.splice(cursorPosition || letters2.length, 0, letter);

        break;
    }

    updateTeaxtArea();
  }

  document.addEventListener("keydown", function (event) {
    
    const code = event.code;

    event.preventDefault();

    handleBtnInput(code, event.key, event.key, event.ctrlKey);
  });

  const KEYBOARD = document.createElement("div");
  KEYBOARD.setAttribute("id", "keybord-box");
  KEYBOARD.classList.add("keybord-box");

  BODY.appendChild(TITLE);
  BODY.appendChild(TEXTAREA);
  BODY.appendChild(KEYBOARD);
  BODY.appendChild(info);

  const keyEventCode = [
    "Backquote",
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0",
    "Minus",
    "Equal",
    "Backspace",
    "Tab",
    "KeyQ",
    "KeyW",
    "KeyE",
    "KeyR",
    "KeyT",
    "KeyY",
    "KeyU",
    "KeyI",
    "KeyO",
    "KeyP",
    "BracketLeft",
    "BracketRight",
    "Backslash",
    "Delete",
    "CapsLock",
    "KeyA",
    "KeyS",
    "KeyD",
    "KeyF",
    "KeyG",
    "KeyH",
    "KeyJ",
    "KeyK",
    "KeyL",
    "Semicolon",
    "Quote",
    "Enter",
    "ShiftLeft",
    "KeyZ",
    "KeyX",
    "KeyC",
    "KeyV",
    "KeyB",
    "KeyN",
    "KeyM",
    "Comma",
    "Period",
    "Slash",
    "ArrowUp",
    "ShiftRight",
    "ControlLeft",
    "MetaLeft",
    "AltLeft",
    "Space",
    "AltRight",
    "ArrowLeft",
    "ArrowDown",
    "ArrowRight",
    "ControlRight",
  ];

  let textareavalue = TEXTAREA.value;

  TEXTAREA.addEventListener("focusout", () => {
    textareavalue = TEXTAREA.value;
  });

  TEXTAREA.addEventListener("focusin", () => {
    cursorPosition = TEXTAREA.selectionEnd;
  });

  let letterLeft = [];
  const letterRight = [];
  let cursorPosition = 0;

  window.addEventListener("languagechange", function () {
    alert(1);
    console.log("languagechange event detected!");
  });
  function updateTeaxtArea() {

    const letters = letterLeft.map((l) => {
      return KEYS[l] ? KEYS[l].en : "";
    });

    TEXTAREA.value = letters2.join("");
  }

  function renderKeyBoard() {
    KEYBOARD.innerHTML = null;

    console.log("renderKeyBoard", isEnglish);

    keyEventCode.forEach((code, index) => {
      const container = document.getElementById("keybord-box");

      let btn = code;

      if (!KEYS[code].en) {
        console.log("renderKeyBoard", code);
      }

      if (isEnglish && KEYS[code] && KEYS[code].en) {
        btn = KEYS[code].en;
      }

      if (!isEnglish && KEYS[code] && KEYS[code].ru) {
        btn = KEYS[code].ru;
      }

      let text = document.createTextNode(btn);
      let keyboardKey = document.createElement("div");
      keyboardKey.setAttribute("id", code);
      keyboardKey.classList.add("key");
      keyboardKey.appendChild(text);
      container.appendChild(keyboardKey);


      document.getElementById(code).addEventListener("click", function (event) {
        inputValue = textareavalue.split("");
        handleBtnInput(code, KEYS[code], KEYS[code]);
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    let pressedKey = document.getElementById(event.code);
    isShift = event.shiftKey;
    isAltPresssed = event.altKey;
    isCtrlKeyPresssed = event.ctrlKey;
    pressedKey.classList.add("key-pressed");
  });
  document.addEventListener("keyup", function (event) {
    let pressedKey = document.getElementById(event.code);

    // console.log("up");
    // console.log(event);
    isShift = event.shiftKey;
    isAltPresssed = event.altKey;
    isCtrlKeyPresssed = event.ctrlKey;

    if (isAltPresssed && !isShift) {
      isEnglish = !isEnglish;
    }

    pressedKey.classList.remove("key-pressed");
  });

  function toggleLocale() {
    isEnglish = !isEnglish;
    console.log("isEnglish", isEnglish);

    renderKeyBoard();
  }

  document.onkeydown = function (event) {
    if (event.code == "AltLeft") {
      document.onkeyup = function (event) {
        if (event.code == "ShiftLeft") {
          toggleLocale();
        }
      };
    }
  };
  document.onkeydown = function (event) {
    if (event.code == "ShiftLeft") {
      document.onkeyup = function (event) {
        if (event.code == "AltLeft") {
          toggleLocale();
        }
      };
    }

    if (event.code == "CapsLock") {
      toggleLocale();
    }
  };

  document.onkeydown = function (event) {
    if (event.code == "AltLeft") {
      document.onkeyup = function (event) {
        if (event.code == "ShiftLeft") {
          toggleLocale();
        }
      };
    }
  };
  document.onkeydown = function (event) {
    if (event.code == "ShiftLeft") {
      document.onkeyup = function (event) {
        if (event.code == "AltLeft") {
          toggleLocale();
        }
      };
    }
  };

  renderKeyBoard();
})();
