class tinyDOC {
  constructor(editorConfig) {
    this.myContainer = editorConfig.container

    if (typeof editorConfig.spellcheckerEnabled === "undefined") {
      this.spellcheckerEnabled = false
    } else {
      this.spellcheckerEnabled = editorConfig.spellcheckerEnabled
    }

    if (editorConfig.saveFunction) {
      this.saveFunction = editorConfig.saveFunction
    }

    if (editorConfig.spellcheckerLanguage) {
      this.spellcheckerLanguage = editorConfig.spellcheckerLanguage
    }

    if (editorConfig.spellcheckerURL) {
      this.spellcheckerURL = editorConfig.spellcheckerURL
    }

    if (editorConfig.spellcheckerNoSuggestionsLabel) {
      this.spellcheckerNoSuggestionsLabel =
        editorConfig.spellcheckerNoSuggestionsLabel
    } else {
      this.spellcheckerNoSuggestionsLabel = "(no suggestions)"
    }

    this.template1 = editorConfig.template1
    this.template2 = editorConfig.template2
    this.template3 = editorConfig.template3

    this.documentEnabled = true

    this.styleSheet = document.createElement("style")
    this.styleSheet.innerText = `
      .tinydoc_menu_container{height:40px;background-color:#F2F2F2;border-bottom:thin solid #D3D3D3;overflow-y:hidden}
      .tinydoc_menu{background-color:#F2F2F2;left:0;right:0;padding-top:0;padding-bottom:0;height:80px;margin-left:3px;overflow-x:scroll;overflow-y:hidden;outline:none;text-align:center;font-family:Arial;font-size:13px}
      .tinydoc_menu::-webkit-scrollbar{display:none}
      .tinydoc_menu_size{float:left;width:800px}
      .tinydoc_holder{float:left;padding-top:3px;padding-bottom:3px;padding-right:3px;margin:0}
      .tinydoc_separator{float:left;border-left:thin solid #D3D3D3;margin-left:1px;margin-right:3px;height:100px;width:1px}
      .tinydoc_separator2{float:left;border-left:thin solid #D3D3D3;margin-left:135px;height:100px;width:1px}
      .tinydoc_button{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none}
      .tinydoc_button:hover{background-color:#E3E3E3;border:thin solid #D3D3D3}
      .tinydoc_document{display:block;padding:8px;outline:none;color:black;background-color:white;font-family:Arial;font-size:16px;line-height:1.3;overflow:auto;-webkit-text-size-adjust:none;-webkit-user-select:text;user-select:text}
      .tinydoc_document a{text-decoration:underline;color:#3a76b1}
      .tinydoc_contentviewer{display:inline-block;font-family:Arial;font-size:13px;line-height:2.6;margin-left:11px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:1px;white-space:nowrap}
      .tinydoc_contentviewer a{text-decoration:none;color:#3a76b1;margin-right:11px}
      .tinydoc_contentviewer .tinydoc_spellchecker_suggestions{display:inline-block;color:#3a76b1;margin-right:20px;cursor:pointer}
      .tinydoc_spellchecker_no_suggestions{color:gray}
      misspelled{text-decoration:underline;text-decoration-color:red;text-decoration-thickness:2px;text-decoration-style:dotted}
      @media (pointer: coarse)
        {
        .tinydoc_button:hover{background-color:#F2F2F2;border:thin solid #F2F2F2}
        .tinydoc_button:hover{background-color:#F2F2F2;border:thin solid #F2F2F2}
        }
      `
    document.getElementsByTagName("head")[0].appendChild(this.styleSheet)

    this.menuContainer = document.createElement("div")
    this.menuContainer.className = "tinydoc_menu_container"
    this.menuWrapper = document.createElement("div")
    this.menuWrapper.className = "tinydoc_menu"
    this.menuContainer.appendChild(this.menuWrapper)
    this.menu = document.createElement("div")
    this.menu.className = "tinydoc_menu_size"
    this.menuWrapper.appendChild(this.menu)
    this.myContainer.appendChild(this.menuContainer)

    if (this.saveFunction) {
      this.holder1 = document.createElement("div")
      this.holder1.className = "tinydoc_holder"
      this.menu.appendChild(this.holder1)
      this.buttonSave = document.createElement("div")
      this.buttonSave.className = "tinydoc_button"
      this.buttonSave.innerHTML =
        "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M896 960h-896v-1024h1024v896zM512 832h128v-256h-128v256zM896 64h-768v768h64v-320h576v320h75l53 -53v-715z' transform='translate(-10 930) scale(-1,1) rotate(180)'/></svg>"
      this.buttonSave.addEventListener("mousedown", (event) => {
        this.save()
        event.preventDefault()
      })
      this.holder1.appendChild(this.buttonSave)

      this.separator1 = document.createElement("div")
      this.separator1.className = "tinydoc_separator"
      this.menu.appendChild(this.separator1)
    }

    this.holder2 = document.createElement("div")
    this.holder2.className = "tinydoc_holder"
    this.menu.appendChild(this.holder2)
    this.buttonPrint = document.createElement("div")
    this.buttonPrint.className = "tinydoc_button"
    this.buttonPrint.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M256 896h512v-128h-512v128zM960 704h-896q-26 0 -45 -19t-19 -45v-320q0 -26 19 -45t45 -19h192v-256h512v256h192q26 0 45 19t19 45v320q0 26 -19 45t-45 19zM704 64h-384v320h384v-320zM974 608q0 -19 -13.5 -32.5t-32.5 -13.5t-32.5 13.5t-13.5 32.5t13.5 32.5 t32.5 13.5t32.5 -13.5t13.5 -32.5z' transform='translate(0 930) scale(-0.97,0.97) rotate(180)'/></svg>"
    this.buttonPrint.addEventListener("mousedown", (event) => {
      this.print()
      event.preventDefault()
    })
    this.holder2.appendChild(this.buttonPrint)

    this.separator2 = document.createElement("div")
    this.separator2.className = "tinydoc_separator"
    this.menu.appendChild(this.separator2)

    if (this.spellcheckerEnabled) {
      this.holder3 = document.createElement("div")
      this.holder3.className = "tinydoc_holder"
      this.menu.appendChild(this.holder3)
      this.buttonSpellcheck = document.createElement("div")
      this.buttonSpellcheck.className = "tinydoc_button"
      this.buttonSpellcheck.innerHTML =
        "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M128 704h128v-192h64v384q0 26 -19 45t-45 19h-128q-26 0 -45 -19t-19 -45v-384h64v192zM128 896h128v-128h-128v128zM960 896v64h-192q-26 0 -45 -19t-19 -45v-320q0 -26 19 -45t45 -19h192v64h-192v320h192zM640 800v96q0 26 -19 45t-45 19h-192v-448h192q26 0 45 19 t19 45v96q0 26 -9 45t-35 19q26 0 35 19t9 45zM576 576h-128v128h128v-128zM576 768h-128v128h128v-128zM832 384l-416 -448l-224 288l82 70l142 -148l352 302z' transform='translate(0 950) scale(-0.97,0.97) rotate(180)'/></svg>"
      this.buttonSpellcheck.addEventListener("mousedown", (event) => {
        this.spellcheck()
        event.preventDefault()
      })
      this.holder3.appendChild(this.buttonSpellcheck)

      this.separator3 = document.createElement("div")
      this.separator3.className = "tinydoc_separator"
      this.menu.appendChild(this.separator3)
    }

    this.holder4 = document.createElement("div")
    this.holder4.className = "tinydoc_holder"
    this.menu.appendChild(this.holder4)
    this.buttonUndo = document.createElement("div")
    this.buttonUndo.className = "tinydoc_button"
    this.buttonUndo.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M762 -64q43 77 62 168t-9 168t-113.5 127.5t-253.5 46.5v-254l-384 384l384 384v-248q201 5 314.5 -73t148.5 -196t-4.5 -255.5t-144.5 -251.5z' transform='translate(0 960) scale(-1,1) rotate(180)'/></svg>"
    this.buttonUndo.addEventListener("mousedown", (event) => {
      this.formatDoc("undo", null)
      event.preventDefault()
    })
    this.holder4.appendChild(this.buttonUndo)

    this.holder5 = document.createElement("div")
    this.holder5.className = "tinydoc_holder"
    this.menu.appendChild(this.holder5)
    this.buttonRedo = document.createElement("div")
    this.buttonRedo.className = "tinydoc_button"
    this.buttonRedo.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M576 712v248l384 -384l-384 -384v254q-168 4 -253.5 -46.5t-113.5 -127.5t-9 -168t62 -168q-105 114 -144.5 251.5t-4.5 255.5t148.5 196t314.5 73v0z' transform='translate(0 960) scale(-1,1) rotate(180)'/></svg>"
    this.buttonRedo.addEventListener("mousedown", (event) => {
      this.formatDoc("redo", null)
      event.preventDefault()
    })
    this.holder5.appendChild(this.buttonRedo)

    this.separator4 = document.createElement("div")
    this.separator4.className = "tinydoc_separator"
    this.menu.appendChild(this.separator4)

    this.holder6 = document.createElement("div")
    this.holder6.className = "tinydoc_holder"
    this.menu.appendChild(this.holder6)
    this.buttonBold = document.createElement("div")
    this.buttonBold.className = "tinydoc_button"
    this.buttonBold.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M708 475q28 34 44 76t16 89q0 53 -20 99.5t-55 81.5t-81.5 55t-99.5 20h-320v-896h384q53 0 99.5 20t81.5 55t55 81.5t20 99.5q0 70 -34 128t-90 91zM384 768h101q42 0 72 -37.5t30 -90.5t-30 -90.5t-71 -37.5h-102v256zM543 128h-159v256h159q44 0 75 -37.5t31 -90.5 t-31 -90.5t-75 -37.5z' transform='translate(0 960) scale(-1,1) rotate(180)'/></svg>"
    this.buttonBold.addEventListener("mousedown", (event) => {
      this.formatDoc("bold", null)
      event.preventDefault()
    })
    this.holder6.appendChild(this.buttonBold)

    this.holder7 = document.createElement("div")
    this.holder7.className = "tinydoc_holder"
    this.menu.appendChild(this.holder7)
    this.buttonItalic = document.createElement("div")
    this.buttonItalic.className = "tinydoc_button"
    this.buttonItalic.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M896 896v-64h-128l-320 -768h128v-64h-448v64h128l320 768h-128v64h448z' transform='translate(0 955) scale(-1,1) rotate(180)'/></svg>"
    this.buttonItalic.addEventListener("mousedown", (event) => {
      this.formatDoc("italic", null)
      event.preventDefault()
    })
    this.holder7.appendChild(this.buttonItalic)

    this.holder8 = document.createElement("div")
    this.holder8.className = "tinydoc_holder"
    this.menu.appendChild(this.holder8)
    this.buttonUnderline = document.createElement("div")
    this.buttonUnderline.className = "tinydoc_button"
    this.buttonUnderline.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M704 896h128v-416q0 -60 -25 -112.5t-68.5 -91.5t-102 -61.5t-124.5 -22.5t-124.5 22.5t-102 61.5t-68.5 91.5t-25 112.5v416h128v-416q0 -30 13.5 -58t37.5 -51q28 -24 64.5 -37.5t76.5 -13.5t76.5 13.5t64.5 37.5q24 23 37.5 51t13.5 58v416zM192 128h640v-128h-640 v128z' transform='translate(0 975) scale(-1,1) rotate(180)'/></svg>"
    this.buttonUnderline.addEventListener("mousedown", (event) => {
      this.formatDoc("underline", null)
      event.preventDefault()
    })
    this.holder8.appendChild(this.buttonUnderline)

    this.holder9 = document.createElement("div")
    this.holder9.className = "tinydoc_holder"
    this.menu.appendChild(this.holder9)
    this.buttonStrikethrough = document.createElement("div")
    this.buttonStrikethrough.className = "tinydoc_button"
    this.buttonStrikethrough.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M731 443q48 -36 74.5 -85t26.5 -102t-26.5 -102t-74.5 -85q-44 -33 -100.5 -51t-118.5 -18t-118.5 18t-100.5 51q-48 36 -74.5 85t-26.5 102h128q0 -52 57 -90t135 -38t135 38t57 90t-57 90t-135 38q-62 0 -118.5 18t-100.5 51q-48 36 -74.5 85t-26.5 102t26.5 102 t74.5 85q44 33 100.5 51t118.5 18t118.5 -18t100.5 -51q48 -36 74.5 -85t26.5 -102h-128q0 52 -57 90t-135 38t-135 -38t-57 -90t57 -90t135 -38q62 0 118.5 -18t100.5 -51v0zM0 448h1024v-64h-1024v64z' transform='translate(0 960) scale(-1,1) rotate(180)'/></svg>"
    this.buttonStrikethrough.addEventListener("mousedown", (event) => {
      this.formatDoc("strikethrough", null)
      event.preventDefault()
    })
    this.holder9.appendChild(this.buttonStrikethrough)

    this.separator5 = document.createElement("div")
    this.separator5.className = "tinydoc_separator"
    this.menu.appendChild(this.separator5)

    this.holder10 = document.createElement("div")
    this.holder10.className = "tinydoc_holder"
    this.menu.appendChild(this.holder10)
    this.buttonDotted = document.createElement("div")
    this.buttonDotted.className = "tinydoc_button"
    this.buttonDotted.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M384 896h640v-128h-640v128zM384 512h640v-128h-640v128zM384 128h640v-128h-640v128zM0 832q0 53 37.5 90.5t90.5 37.5t90.5 -37.5t37.5 -90.5t-37.5 -90.5t-90.5 -37.5t-90.5 37.5t-37.5 90.5zM0 448q0 53 37.5 90.5t90.5 37.5t90.5 -37.5t37.5 -90.5t-37.5 -90.5 t-90.5 -37.5t-90.5 37.5t-37.5 90.5zM0 64q0 53 37.5 90.5t90.5 37.5t90.5 -37.5t37.5 -90.5t-37.5 -90.5t-90.5 -37.5t-90.5 37.5t-37.5 90.5z' transform='translate(0 940) scale(-0.97,0.97) rotate(180)'/></svg>"
    this.buttonDotted.addEventListener("mousedown", (event) => {
      this.formatDoc("insertunorderedlist", null)
      event.preventDefault()
    })
    this.holder10.appendChild(this.buttonDotted)

    this.holder11 = document.createElement("div")
    this.holder11.className = "tinydoc_holder"
    this.menu.appendChild(this.holder11)
    this.buttonNumbered = document.createElement("div")
    this.buttonNumbered.className = "tinydoc_button"
    this.buttonNumbered.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M384 128h640v-128h-640v128zM384 512h640v-128h-640v128zM384 896h640v-128h-640v128zM192 960v-256h-64v192h-64v64h128zM128 434v-50h128v-64h-192v146l128 60v50h-128v64h192v-146zM256 256v-320h-192v64h128v64h-128v64h128v64h-128v64h192z' transform='translate(-50 940) scale(-0.97,0.97) rotate(180)'/></svg>"
    this.buttonNumbered.addEventListener("mousedown", (event) => {
      this.formatDoc("insertorderedlist", null)
      event.preventDefault()
    })
    this.holder11.appendChild(this.buttonNumbered)

    this.holder12 = document.createElement("div")
    this.holder12.className = "tinydoc_holder"
    this.menu.appendChild(this.holder12)
    this.buttonHighlight = document.createElement("div")
    this.buttonHighlight.className = "tinydoc_button"
    this.buttonHighlight.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M739 627l-502 -502h-186v185l503 503l185 -186v0zM803 688l-185 186l67 67q17 17 38.5 17t38.5 -17l108 -109q17 -17 17 -38.5t-17 -38.5l-67 -67v0zM42 0' transform='translate(0 950) scale(-0.97,0.97) rotate(180)'/><path fill='#FFFF00' d='M-739 627l-502 -17 17 -38.5t-17 -38.5l-67 -67v0zM42 48h940v-112h-940v112v0z' transform='translate(0 950) scale(-0.97,0.97) rotate(180)'/></svg>"
    this.buttonHighlight.addEventListener("mousedown", (event) => {
      this.formatDoc("BackColor", "#FFFF00")
      event.preventDefault()
    })
    this.holder12.appendChild(this.buttonHighlight)

    this.holder13 = document.createElement("div")
    this.holder13.className = "tinydoc_holder"
    this.menu.appendChild(this.holder13)
    this.buttonLink = document.createElement("div")
    this.buttonLink.className = "tinydoc_button"
    this.buttonLink.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M320 256q13 -13 32.5 -12.5t33.5 14.5l316 316q14 14 14.5 33.5t-12.5 32.5t-32.5 12.5t-33.5 -14.5l-316 -316q-14 -14 -14.5 -33.5t12.5 -32.5zM477 285q3 -7 5 -14.5t2 -15.5q0 -13 -5 -25t-14 -21l-163 -163q-10 -10 -22 -14.5t-25 -4.5t-25 4.5t-21 14.5l-99 99 q-10 9 -14.5 21t-4.5 25t4.5 25t14.5 21l163 164q9 9 21 14t25 5q8 0 15.5 -2t14.5 -5l65 65q-21 16 -45.5 24t-49.5 8q-30 0 -58.5 -11t-51.5 -34l-163 -163q-46 -46 -46 -111t46 -110l99 -99q23 -23 51.5 -34.5t58.5 -11.5t59 11.5t52 34.5l163 163q42 42 45 100.5 t-32 104.5l-65 -65v0zM978 815l-99 99q-23 23 -51.5 34.5t-58.5 11.5t-59 -11.5t-51 -34.5l-164 -163q-42 -42 -45 -100.5t32 -104.5l65 65q-3 7 -5 14.5t-2 15.5q0 13 5 25t14 21l163 163q10 10 22 14.5t25 4.5t25 -4.5t21 -14.5l99 -99q10 -9 14.5 -21t4.5 -25t-4.5 -25 t-14.5 -21l-163 -164q-9 -9 -21 -14t-25 -5q-8 0 -15.5 2t-14.5 5l-65 -65q21 -16 45.5 -24t49.5 -8q30 0 58.5 11t51.5 34l163 164q46 45 46 110t-46 110z' transform='translate(0 930) scale(-0.97,0.97) rotate(180)'/></svg>"
    this.buttonLink.addEventListener("mousedown", (event) => {
      this.insertLink()
      event.preventDefault()
    })
    this.holder13.appendChild(this.buttonLink)

    this.separator6 = document.createElement("div")
    this.separator6.className = "tinydoc_separator"
    this.menu.appendChild(this.separator6)

    if (editorConfig.template1) {
      this.holder14 = document.createElement("div")
      this.holder14.className = "tinydoc_holder"
      this.menu.appendChild(this.holder14)
      this.buttonTemplate1 = document.createElement("div")
      this.buttonTemplate1.className = "tinydoc_button"
      this.buttonTemplate1.innerHTML =
        "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M384 768h128v-64h-128v64zM576 768h128v-64h-128v64zM896 768v-256h-192v64h128v128h-64v64h128zM320 576h128v-64h-128v64zM512 576h128v-64h-128v64zM192 704v-128h64v-64h-128v256h192v-64h-128zM384 384h128v-64h-128v64zM576 384h128v-64h-128v64zM896 384v-256 h-192v64h128v128h-64v64h128zM320 192h128v-64h-128v64zM512 192h128v-64h-128v64zM192 320v-128h64v-64h-128v256h192v-64h-128zM960 896h-896v-896h896v896zM1024 960v0v-1024h-1024v1024h1024z' transform='translate(0 940) scale(-0.97,0.97) rotate(180)'/></svg>"
      this.buttonTemplate1.addEventListener("mousedown", (event) => {
        this.insertHtmlAtCaret(this.template1, false)
        event.preventDefault()
      })
      this.holder14.appendChild(this.buttonTemplate1)
    }

    if (editorConfig.template2) {
      this.holder15 = document.createElement("div")
      this.holder15.className = "tinydoc_holder"
      this.menu.appendChild(this.holder15)
      this.buttonTemplate2 = document.createElement("div")
      this.buttonTemplate2.className = "tinydoc_button"
      this.buttonTemplate2.innerHTML =
        "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M384 768h128v-64h-128v64zM576 768h128v-64h-128v64zM896 768v-256h-192v64h128v128h-64v64h128zM320 576h128v-64h-128v64zM512 576h128v-64h-128v64zM192 704v-128h64v-64h-128v256h192v-64h-128zM384 384h128v-64h-128v64zM576 384h128v-64h-128v64zM896 384v-256 h-192v64h128v128h-64v64h128zM320 192h128v-64h-128v64zM512 192h128v-64h-128v64zM192 320v-128h64v-64h-128v256h192v-64h-128zM960 896h-896v-896h896v896zM1024 960v0v-1024h-1024v1024h1024z' transform='translate(0 940) scale(-0.97,0.97) rotate(180)'/></svg>"
      this.buttonTemplate2.addEventListener("mousedown", (event) => {
        this.insertHtmlAtCaret(this.template2, false)
        event.preventDefault()
      })
      this.holder15.appendChild(this.buttonTemplate2)
    }

    if (editorConfig.template3) {
      this.holder16 = document.createElement("div")
      this.holder16.className = "tinydoc_holder"
      this.menu.appendChild(this.holder16)
      this.buttonTemplate3 = document.createElement("div")
      this.buttonTemplate3.className = "tinydoc_button"
      this.buttonTemplate3.innerHTML =
        "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M384 768h128v-64h-128v64zM576 768h128v-64h-128v64zM896 768v-256h-192v64h128v128h-64v64h128zM320 576h128v-64h-128v64zM512 576h128v-64h-128v64zM192 704v-128h64v-64h-128v256h192v-64h-128zM384 384h128v-64h-128v64zM576 384h128v-64h-128v64zM896 384v-256 h-192v64h128v128h-64v64h128zM320 192h128v-64h-128v64zM512 192h128v-64h-128v64zM192 320v-128h64v-64h-128v256h192v-64h-128zM960 896h-896v-896h896v896zM1024 960v0v-1024h-1024v1024h1024z' transform='translate(0 940) scale(-0.97,0.97) rotate(180)'/></svg>"
      this.buttonTemplate3.addEventListener("mousedown", (event) => {
        this.insertHtmlAtCaret(this.template3, false)
        event.preventDefault()
      })
      this.holder16.appendChild(this.buttonTemplate3)
    }

    if (editorConfig.template1 || editorConfig.template2 || editorConfig.template3) {
      this.separator7 = document.createElement("div")
      this.separator7.className = "tinydoc_separator"
      this.menu.appendChild(this.separator7)
    }

    this.holder17 = document.createElement("div")
    this.holder17.className = "tinydoc_holder"
    this.menu.appendChild(this.holder17)
    this.buttonCalc = document.createElement("div")
    this.buttonCalc.className = "tinydoc_button"
    this.buttonCalc.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 512.001 512.001'><path d='M403.432,0H108.57C86.583,0,68.695,17.887,68.695,39.874v432.253c0,21.987,17.887,39.874,39.874,39.874h294.862 c21.987,0,39.874-17.887,39.874-39.874V39.874C443.305,17.887,425.417,0,403.432,0z M424.297,472.127h-0.001 c0,11.505-9.36,20.865-20.865,20.865H108.57c-11.505,0-20.865-9.36-20.865-20.865V39.874c0-11.505,9.36-20.865,20.865-20.865 h294.862c11.505,0,20.865,9.36,20.865,20.865V472.127z'/><path d='M382.1,51.081H129.901c-5.25,0-9.504,4.255-9.504,9.504v82.322c0,5.249,4.254,9.504,9.504,9.504H382.1 c5.25,0,9.504-4.255,9.504-9.504V60.585C391.604,55.336,387.349,51.081,382.1,51.081z M372.596,133.403h-233.19V70.089h233.19 V133.403z'/><path d='M185.115,181.553h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214 c5.25,0,9.504-4.255,9.504-9.504v-59.335C194.62,185.809,190.366,181.553,185.115,181.553z M175.611,240.889h-36.205v-40.327 h36.205V240.889z'/><path d='M185.115,283.696h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214 c5.25,0,9.504-4.255,9.504-9.504v-59.335C194.62,287.952,190.366,283.696,185.115,283.696z M175.611,343.032h-36.205v-40.327 h36.205V343.032z'/><path d='M185.115,385.84h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214 c5.25,0,9.504-4.255,9.504-9.504v-59.335C194.62,390.095,190.366,385.84,185.115,385.84z M175.611,445.175h-36.205v-40.327h36.205 V445.175z'/><path d='M283.608,181.553h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214 c5.25,0,9.504-4.255,9.504-9.504v-59.335C293.112,185.809,288.857,181.553,283.608,181.553z M274.103,240.889h-36.205v-40.327 h36.205V240.889z'/><path d='M283.608,283.696h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214 c5.25,0,9.504-4.255,9.504-9.504v-59.335C293.112,287.952,288.857,283.696,283.608,283.696z M274.103,343.032h-36.205v-40.327 h36.205V343.032z'/><path d='M283.608,385.84h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214 c5.25,0,9.504-4.255,9.504-9.504v-59.335C293.112,390.095,288.857,385.84,283.608,385.84z M274.103,445.175h-36.205v-40.327 h36.205V445.175z'/><path d='M382.1,181.553h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504H382.1 c5.25,0,9.504-4.255,9.504-9.504v-59.335C391.604,185.809,387.349,181.553,382.1,181.553z M372.596,240.889H336.39v-40.327h36.205 V240.889z'/><path d='M382.1,283.696h-55.214c-5.25,0-9.504,4.255-9.504,9.504V454.68c0,5.249,4.254,9.504,9.504,9.504H382.1 c5.25,0,9.504-4.255,9.504-9.504V293.201C391.604,287.952,387.349,283.696,382.1,283.696z M372.596,445.175H336.39v-142.47h36.205 V445.175z'/></svg>"
    this.buttonCalc.addEventListener("mousedown", (event) => {
      this.insertCalc()
      event.preventDefault()
    })
    this.holder17.appendChild(this.buttonCalc)

    this.separator8 = document.createElement("div")
    this.separator8.className = "tinydoc_separator"
    this.menu.appendChild(this.separator8)

    this.holder18 = document.createElement("div")
    this.holder18.className = "tinydoc_holder"
    this.menu.appendChild(this.holder18)
    this.buttonRemoveFormat = document.createElement("div")
    this.buttonRemoveFormat.className = "tinydoc_button"
    this.buttonRemoveFormat.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M0 64h576v-128h-576v128zM192 960h704v-128h-704v128zM277 128l205 784l124 -32l-196 -752h-133zM930 -64l-130 130l-130 -130l-62 62l130 130l-130 130l62 62l130 -130l130 130l62 -62l-130 -130l130 -130z' transform='translate(0 915) scale(-0.97,0.97) rotate(180)'/></svg>"
    this.buttonRemoveFormat.addEventListener("mousedown", (event) => {
      this.formatDoc("removeFormat", null)
      event.preventDefault()
    })
    this.holder18.appendChild(this.buttonRemoveFormat)

    this.separator9 = document.createElement("div")
    this.separator9.className = "tinydoc_separator"
    this.menu.appendChild(this.separator9)

    this.holder19 = document.createElement("div")
    this.holder19.className = "tinydoc_holder"
    this.menu.appendChild(this.holder19)
    this.contentViewer = document.createElement("div")
    this.contentViewer.className = "tinydoc_contentviewer"
    this.holder19.appendChild(this.contentViewer)

    this.pleaseWait = document.createElement("div")
    this.pleaseWait.style.backgroundColor = "white"
    this.pleaseWait.style.position = "absolute"
    this.pleaseWait.style.left = 0
    this.pleaseWait.style.right = 0
    this.pleaseWait.style.top = 0
    this.pleaseWait.style.bottom = 0
    this.pleaseWait.style.display = "none"
    this.pleaseWait.style.zIndex = 98
    this.pleaseWait.style.opacity = 0.5
    this.pleaseWait.addEventListener("mousedown", (event) => {
      event.preventDefault()
    })
    this.myContainer.appendChild(this.pleaseWait)

    this.pleaseWaitIcon = document.createElement("div")
    this.pleaseWaitIcon.style.backgroundColor = "white"
    this.pleaseWaitIcon.style.position = "absolute"
    this.pleaseWaitIcon.style.left = 0
    this.pleaseWaitIcon.style.right = 0
    this.pleaseWaitIcon.style.top = 0
    this.pleaseWaitIcon.style.bottom = 0
    this.pleaseWaitIcon.style.display = "none"
    this.pleaseWaitIcon.style.zIndex = 99
    this.pleaseWaitIcon.style.background =
      "url('data:image/gif;base64,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') no-repeat center"
    this.pleaseWaitIcon.addEventListener("mousedown", (event) => {
      event.preventDefault()
    })
    this.myContainer.appendChild(this.pleaseWaitIcon)

    this.document = document.createElement("div")
    this.document.className = "tinydoc_document"
    this.document.contentEditable = true

    if (this.spellcheckerEnabled) {
      this.document.spellcheck = false
    }

    this.myContainer.appendChild(this.document)

    if (editorConfig.documentText) {
      this.document.innerHTML = editorConfig.documentText
    } else {
      this.document.innerHTML = "<div></div>"
    }

    this.spellcheckerResult = []
    this.spellcheckerWorking = false
    this.spellcheckerExecuted = false
    this.myWorker = null
    this.canUndoRedo = true
    this.undoSaveTimeout = null
    this.keyEnterPressed = false
    this.settingNewText = false
    this.isUsingSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    this.isUsingChrome = /.*chrome/i.test(navigator.userAgent)
    this.isMobileDevice = !!(
      window.navigator.userAgent.match(/Android/i) ||
      window.navigator.userAgent.match(/webOS/i) ||
      window.navigator.userAgent.match(/iPhone/i) ||
      window.navigator.userAgent.match(/iPad/i) ||
      window.navigator.userAgent.match(/iPod/i) ||
      window.navigator.userAgent.match(/BlackBerry/i) ||
      window.navigator.userAgent.match(/Windows Phone/i)
    )

    this.document.addEventListener("mousedown", (event) => {
      try {
        if (!this.documentEnabled) {
          event.preventDefault()
        }
      } catch (err) {
        //
      }
    })

    this.document.addEventListener("keydown", (event) => {
      try {
        if (!this.documentEnabled) {
          event.preventDefault()
        } else {
          if (event.keyCode === 9) {
            event.preventDefault()

            this.insertHtmlAtCaret(
              "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
              false
            )

            setTimeout(() => {
              this.document.focus()
            }, 100)
          } else if (event.keyCode === 13) {
            this.handleBreakline(event)
          } else if (
            (event.ctrlKey || event.metaKey) &&
            String.fromCharCode(event.which).toLowerCase() === "s"
          ) {
            if (this.saveFunction) {
              event.preventDefault()

              this.save()
            }
          } else if (
            (event.ctrlKey || event.metaKey) &&
            !event.shiftKey &&
            String.fromCharCode(event.which).toLowerCase() === "z"
          ) {
            event.preventDefault()

            this.undo(true)
          } else if (
            event.shiftKey &&
            event.metaKey &&
            String.fromCharCode(event.which).toLowerCase() === "z"
          ) {
            event.preventDefault()

            this.redo(true)
          } else if (
            event.ctrlKey &&
            event.shiftKey &&
            String.fromCharCode(event.which).toLowerCase() === "z"
          ) {
            event.preventDefault()

            this.undo(true)
          } else if (
            event.ctrlKey &&
            String.fromCharCode(event.which).toLowerCase() === "y"
          ) {
            event.preventDefault()

            this.redo(true)
          }
        }
      } catch (err) {
        //
      }
    })

    this.document.addEventListener("keyup", (event) => {
      if (!this.documentEnabled) {
        event.preventDefault()
      } else if (
        (event.ctrlKey || event.metaKey) &&
        !event.shiftKey &&
        String.fromCharCode(event.which).toLowerCase() === "z"
      ) {
        event.preventDefault()
      } else if (
        event.shiftKey &&
        event.metaKey &&
        String.fromCharCode(event.which).toLowerCase() === "z"
      ) {
        event.preventDefault()
      } else if (
        event.ctrlKey &&
        event.shiftKey &&
        String.fromCharCode(event.which).toLowerCase() === "z"
      ) {
        event.preventDefault()
      } else if (
        event.ctrlKey &&
        String.fromCharCode(event.which).toLowerCase() === "y"
      ) {
        event.preventDefault()
      } else {
        this.checkForURL()
        this.checkForMisspelled()

        if (this.undoSaveTimeout !== null) {
          clearTimeout(this.undoSaveTimeout)
        }

        this.undoSaveTimeout = setTimeout(() => {
          this.saveUndo()
        }, 100)
      }
    })

    this.document.addEventListener("click", (event) => {
      if (!this.documentEnabled) {
        event.preventDefault()
      } else {
        this.checkForURL()
        this.checkForMisspelled()
      }
    })

    this.document.addEventListener("contextmenu", (event) => {
      if (!this.documentEnabled) {
        event.preventDefault()
      } else {
        this.checkForURL()
        this.checkForMisspelled()
      }
    })

    this.document.addEventListener("paste", (event) => {
      try {
        event.preventDefault()

        let text = (event.originalEvent || event).clipboardData.getData("text/plain")

        text = text.replace(/&/gm, "&amp;")
        text = text.replace(/</gm, "&lt;")
        text = text.replace(/>/gm, "&gt;")
        text = text.replace(/ {2}/gm, "&nbsp;&nbsp;")
        text = text.replace(/\n/gm, "<br />")

        this.document.focus()

        this.insertHtmlAtCaret(text, false)
      } catch (err) {
        //
      }
    })

    this.document.addEventListener("input", () => {
      window.onbeforeunload = () => {
        return "Dirty"
      }
    })

    this.clearUndoRedo()
    this.resize()
    this.scrollToTop()
  }

  new() {
    try {
      try {
        while (this.document.firstChild) {
          this.document.removeChild(this.document.firstChild)
        }
      } catch (err) {
        //
      }

      window.onbeforeunload = null

      this.clearUndoRedo()
      this.setCaretPosition(this.document, 0)
      this.scrollToTop()
      this.focus()
    } catch (err) {
      //
    }
  }

  save() {
    try {
      if (!this.spellcheckerWorking) {
        this.saveFunction()
      }
    } catch (err) {
      //
    }
  }

  resize() {
    try {
      this.document.style.width = this.myContainer.offsetWidth - 16 + "px"
      this.document.style.height = this.myContainer.offsetHeight - 57 + "px"

      this.pleaseWait.style.left = this.myContainer.offsetLeft + "px"
      this.pleaseWait.style.right = this.myContainer.offsetRight + "px"
      this.pleaseWait.style.top = this.myContainer.offsetTop + "px"
      this.pleaseWait.style.bottom = this.myContainer.offsetBottom + "px"
      this.pleaseWait.style.width = this.myContainer.offsetWidth + "px"
      this.pleaseWait.style.height = this.myContainer.offsetHeight + "px"

      this.pleaseWaitIcon.style.left = this.myContainer.offsetLeft + "px"
      this.pleaseWaitIcon.style.right = this.myContainer.offsetRight + "px"
      this.pleaseWaitIcon.style.top = this.myContainer.offsetTop + "px"
      this.pleaseWaitIcon.style.bottom = this.myContainer.offsetBottom + "px"
      this.pleaseWaitIcon.style.width = this.myContainer.offsetWidth + "px"
      this.pleaseWaitIcon.style.height = this.myContainer.offsetHeight + "px"

      setTimeout(() => {
        try {
          this.document.style.width = this.myContainer.offsetWidth - 16 + "px"
          this.document.style.height = this.myContainer.offsetHeight - 57 + "px"
          this.pleaseWait.style.left = this.myContainer.offsetLeft + "px"
          this.pleaseWait.style.right = this.myContainer.offsetRight + "px"
          this.pleaseWait.style.top = this.myContainer.offsetTop + "px"
          this.pleaseWait.style.bottom = this.myContainer.offsetBottom + "px"
          this.pleaseWait.style.width = this.myContainer.offsetWidth + "px"
          this.pleaseWait.style.height = this.myContainer.offsetHeight + "px"
          this.pleaseWaitIcon.style.left = this.myContainer.offsetLeft + "px"
          this.pleaseWaitIcon.style.right = this.myContainer.offsetRight + "px"
          this.pleaseWaitIcon.style.top = this.myContainer.offsetTop + "px"
          this.pleaseWaitIcon.style.bottom = this.myContainer.offsetBottom + "px"
          this.pleaseWaitIcon.style.width = this.myContainer.offsetWidth + "px"
          this.pleaseWaitIcon.style.height = this.myContainer.offsetHeight + "px"
        } catch (err) {
          //
        }
      }, 100)
    } catch (err) {
      //
    }
  }

  scrollToTop() {
    try {
      this.document.scrollTop = 0
    } catch (err) {
      //
    }
  }

  // https://stackoverflow.com/questions/47361276/javascript-scroll-to-cursor-post-a-paste-in-contenteditable-div
  scrollToCaret() {
    try {
      const currentSelection = this.saveSelection(this.document)
      const caretPositionY = this.getCaretY() - this.document.offsetTop + 16

      if (caretPositionY < 0 || caretPositionY > this.document.offsetHeight) {
        const selection = window.getSelection()

        if (!selection.rangeCount) {
          return
        }

        const firstRange = selection.getRangeAt(0)

        if (firstRange.commonAncestorContainer === document) {
          return
        }

        const tempAnchorEl = document.createElement("br")

        firstRange.insertNode(tempAnchorEl)

        if (caretPositionY < 0) {
          tempAnchorEl.scrollIntoView({ block: "start" })
        } else {
          tempAnchorEl.scrollIntoView({ block: "end" })
        }

        tempAnchorEl.remove()
      }

      if (currentSelection.start !== currentSelection.end) {
        this.restoreSelection(this.document, currentSelection)
      }
    } catch (err) {
      //
    }
  }

  // https://stackoverflow.com/questions/6846230/coordinates-of-selected-text-in-browser-page
  getCaretY() {
    try {
      let sel = document.selection
      let range
      let rect
      let x = 0
      let y = 0

      if (sel) {
        if (sel.type !== "Control") {
          range = sel.createRange()
          range.collapse(true)
          x = range.boundingLeft
          y = range.boundingTop
        }
      } else if (window.getSelection) {
        sel = window.getSelection()

        if (sel.rangeCount) {
          range = sel.getRangeAt(0).cloneRange()

          if (range.getClientRects) {
            range.collapse(true)

            if (range.getClientRects().length > 0) {
              rect = range.getClientRects()[0]
              x = rect.left
              y = rect.top
            }
          }

          if (x === 0 && y === 0) {
            const span = document.createElement("span")
            if (span.getClientRects) {
              span.appendChild(document.createTextNode("\u200b"))
              range.insertNode(span)
              rect = span.getClientRects()[0]
              x = rect.left
              y = rect.top

              const spanParent = span.parentNode
              spanParent.removeChild(span)

              spanParent.normalize()
            }
          }
        }
      }
      return y
    } catch (err) {
      //
    }
    return 0
  }

  setText(myText) {
    try {
      if (this.myWorker !== null) {
        this.myWorker.terminate()
      }

      this.new()
      this.settingNewText = true
      this.insertHtmlAtCaret(myText, false)
      window.onbeforeunload = null
      this.clearUndoRedo()
      this.spellcheckerResult = []

      if (this.spellcheckerWorking) {
        this.enable()
      }

      this.spellcheckerWorking = false
      this.spellcheckerExecuted = false
      this.showPleaseWait(false)
      this.buttonSpellcheck.className = "tinydoc_button"

      setTimeout(() => {
        this.setCaretPosition(this.document, 0)
      }, 25)
    } catch (err) {
      //
    }
  }

  getText(mustEncode) {
    let originalHTML = this.document.innerHTML

    originalHTML = originalHTML.replace(/<misspelled>/gm, "")
    originalHTML = originalHTML.replace(/<\/misspelled>/gm, "")

    if (mustEncode) {
      return this.encodeText(originalHTML)
    } else {
      return originalHTML
    }
  }

  encodeText(str) {
    let i = str.length
    const aRet = []
    while (i--) {
      const tempChar = str[i].charCodeAt()
      if (
        tempChar > 126 ||
        tempChar === 34 ||
        tempChar === 39 ||
        tempChar === 60 ||
        tempChar === 62
      ) {
        aRet[i] = "&#" + tempChar + ";"
      } else {
        aRet[i] = str[i]
      }
    }
    return aRet.join("")
  }

  enable() {
    this.documentEnabled = true
    this.document.style.caretColor = "black"
  }

  disable() {
    this.documentEnabled = false
    this.document.style.caretColor = "transparent"
  }

  showPleaseWait(mustShow) {
    if (mustShow) {
      this.pleaseWait.style.display = "block"
      this.pleaseWaitIcon.style.display = "block"
    } else {
      this.pleaseWait.style.display = "none"
      this.pleaseWaitIcon.style.display = "none"
    }
  }

  focus() {
    try {
      this.document.focus()

      setTimeout(() => {
        this.document.focus()
      }, 100)
    } catch (err) {
      //
    }
  }

  formatDoc(myCommand, myParameter) {
    try {
      this.document.focus()

      if (!this.spellcheckerWorking) {
        if (myCommand === "bold") {
          this.formatStyle("b", myParameter)
        } else if (myCommand === "italic") {
          this.formatStyle("i", myParameter)
        } else if (myCommand === "underline") {
          this.formatStyle("u", myParameter)
        } else if (myCommand === "strikethrough") {
          this.formatStyle("strike", myParameter)
        } else if (myCommand === "BackColor") {
          this.formatStyle("span", myParameter)
        } else if (myCommand === "insertunorderedlist") {
          this.formatList("ul", "li")
        } else if (myCommand === "insertorderedlist") {
          this.formatList("ol", "li")
        } else if (myCommand === "removeFormat") {
          this.removeFormat()
        } else if (myCommand === "undo") {
          this.undo(false)
        } else if (myCommand === "redo") {
          this.redo(false)
        }
      }

      setTimeout(() => {
        this.document.focus()
      }, 100)
    } catch (err) {
      //
    }
  }

  formatStyle(myTag, myParameter) {
    try {
      const currentSelection = this.saveSelection(this.document)

      if (!this.isDocumentSelected()) {
        return
      }

      if (
        (this.getParentTag("LI") !== null ||
          this.getParentTag("UL") !== null ||
          this.getParentTag("OL") !== null) &&
        window.getSelection().toString().indexOf("\n") > -1
      ) {
        setTimeout(() => {
          this.restoreSelection(this.document, currentSelection)

          if (this.isUsingChrome || this.isUsingSafari) {
            if (window.getSelection().toString().indexOf("\n") === -1) {
              this.formatStyleExecute(myTag, myParameter)
            }
          }
        }, 25)

        return
      }

      this.formatStyleExecute(myTag, myParameter)
    } catch (err) {
      //
    }
  }

  formatStyleExecute(myTag, myParameter) {
    try {
      this.saveUndo()

      const selection = window.getSelection()
      let range = selection.getRangeAt(0)

      const selectedContent = range.extractContents()
      const newTag = document.createElement(myTag)

      newTag.appendChild(selectedContent)

      if (myTag === "span") {
        newTag.style.backgroundColor = myParameter
        newTag.style.boxShadow = "inset 0 0 0 1000px " + myParameter
      }

      range.deleteContents()
      range.insertNode(newTag)

      setTimeout(() => {
        range = range.cloneRange()
        range.setStartBefore(newTag)
        selection.removeAllRanges()
        selection.addRange(range)

        this.saveUndo()

        window.onbeforeunload = () => {
          return "Dirty"
        }
      }, 25)
    } catch (err) {
      //
    }
  }

  formatList(tag1, tag2) {
    try {
      if (!this.isDocumentSelected()) {
        return
      }

      if (
        this.getParentTag("LI") === null &&
        this.getParentTag("UL") === null &&
        this.getParentTag("OL") === null
      ) {
        let selectedText = window.getSelection().toString()

        if (selectedText === "") {
          selectedText = "<br />"
        }

        this.insertHtmlAtCaret(
          "<" +
            tag1 +
            "><" +
            tag2 +
            ">" +
            selectedText +
            "</" +
            tag2 +
            "></" +
            tag1 +
            ">",
          false
        )
      }
    } catch (err) {
      //
    }
  }

  getParentTag(tagToFind) {
    try {
      const range = window.getSelection().getRangeAt(0)

      let upperNode = range.startContainer

      while (upperNode.parentNode !== this.document) {
        upperNode = upperNode.parentNode

        if (upperNode.nodeName === tagToFind) {
          return upperNode
        }
      }
    } catch (err) {
      //
    }
    return null
  }

  getCurrentTag() {
    let currentNode = null

    try {
      const range = window.getSelection().getRangeAt(0)
      currentNode = range.startContainer
    } catch (err) {
      //
    }

    return currentNode
  }

  // https://stackoverflow.com/questions/16736680/get-caret-index-in-contenteditable-div-including-tags
  getCaretCharacterOffsetWithin(element) {
    let caretOffset = 0
    try {
      const range = window.getSelection().getRangeAt(0)
      const preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(element)
      preCaretRange.setEnd(range.endContainer, range.endOffset)
      caretOffset = preCaretRange.toString().length
    } catch (err) {
      //
    }
    return caretOffset
  }

  handleBreakline(event) {
    try {
      const tagLI = this.getParentTag("LI")
      const tagUL = this.getParentTag("UL")
      const tagOL = this.getParentTag("OL")

      if (tagLI === null && (tagUL !== null || tagOL !== null)) {
        event.preventDefault()

        const initialNode = window.getSelection().focusNode
        let upperNode = window.getSelection().focusNode
        let listNode = null

        while (upperNode.parentNode) {
          upperNode = upperNode.parentNode

          if (upperNode.nodeName === "UL" || upperNode.nodeName === "OL") {
            listNode = upperNode
          }
        }

        if (listNode !== null) {
          if (listNode.lastChild === initialNode) {
            if (!this.handleBreaklineInLink()) {
              this.addBreakLineAfter(listNode)
            }
          }
        }
      } else if (tagLI === null) {
        event.preventDefault()

        if (!this.handleBreaklineInLink()) {
          this.keyEnterPressed = true
          this.insertHtmlAtCaret("<br />", false)
        }
      }
    } catch (err) {
      //
    }
  }

  handleBreaklineInLink() {
    try {
      const linkTag = this.getParentTag("A")

      if (linkTag !== null) {
        if (this.getCaretCharacterOffsetWithin(linkTag) === linkTag.text.length) {
          this.addBreakLineAfter(linkTag)
          return true
        }
      }
    } catch (err) {
      //
    }
    return false
  }

  addBreakLineAfter(currentNode) {
    try {
      this.saveUndo()
      const tempAnchorEl = document.createElement("br")
      currentNode.parentNode.insertBefore(tempAnchorEl, currentNode.nextSibling)

      let startBefore = true

      if (currentNode.nodeName !== "UL" && currentNode.nodeName !== "OL") {
        startBefore = false
      }

      setTimeout(() => {
        const range = document.createRange()
        range.selectNodeContents(tempAnchorEl)
        if (startBefore) {
          range.setStartBefore(tempAnchorEl)
        } else {
          range.setStartAfter(tempAnchorEl)
        }
        range.collapse(true)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)

        this.saveUndo()
      }, 25)
    } catch (err) {
      //
    }
  }

  isDocumentSelected() {
    try {
      let docFound = false
      let upperNode = window.getSelection().focusNode

      if (upperNode === this.document) {
        docFound = true
      }

      while (upperNode.parentNode) {
        upperNode = upperNode.parentNode
        if (upperNode === this.document) {
          docFound = true
        }
      }

      setTimeout(() => {
        this.document.focus()
      }, 100)

      return docFound
    } catch (err) {
      setTimeout(() => {
        this.document.focus()
      }, 100)

      return false
    }
  }

  removeFormat() {
    try {
      if (window.getSelection().toString()) {
        let plainText = window.getSelection().toString()

        plainText = plainText.replace(/&/gm, "&amp;")
        plainText = plainText.replace(/</gm, "&lt;")
        plainText = plainText.replace(/>/gm, "&gt;")
        plainText = plainText.replace(/ {2}/gm, "&nbsp;&nbsp;")
        plainText = plainText.replace(/\n/gm, "<br />")

        try {
          const range = window.getSelection().getRangeAt(0)

          if (
            range.startOffset === 0 &&
            (range.endOffset === 0 ||
              range.endOffset === window.getSelection().toString().length)
          ) {
            let upperNode = range.startContainer

            while (
              upperNode.parentNode !== this.document &&
              upperNode.parentNode.nodeName !== "LI"
            ) {
              upperNode = upperNode.parentNode
            }

            let lowerNode = upperNode
            let foundListItem = false

            while (lowerNode.firstChild) {
              lowerNode = lowerNode.firstChild
              if (lowerNode.nodeName === "LI") {
                foundListItem = true
              }
            }

            if (!foundListItem) {
              if (upperNode.innerText.length === range.endOffset) {
                upperNode.parentNode.removeChild(upperNode)
              }
            }
          }
        } catch (err) {
          //
        }

        this.insertHtmlAtCaret(plainText, true)
      }
    } catch (err) {
      //
    }
  }

  spellcheck() {
    try {
      if (!this.spellcheckerWorking) {
        if (!this.isDocumentSelected()) {
          return
        }

        if (this.contentViewer.innerHTML.indexOf("<span ") > -1) {
          this.contentViewer.innerHTML = ""
        }

        if (this.myWorker !== null) {
          this.myWorker.terminate()
        }

        let originalCaretPosition

        if (this.spellcheckerExecuted) {
          originalCaretPosition = this.getCaretPosition(this.document)

          this.spellcheckerResult = []

          let originalHTML = this.document.innerHTML
          originalHTML = originalHTML.replace(/<misspelled>/gm, "")
          originalHTML = originalHTML.replace(/<\/misspelled>/gm, "")

          try {
            while (this.document.firstChild) {
              this.document.removeChild(this.document.firstChild)
            }
          } catch (err) {
            //
          }

          this.spellcheckerWorking = true
          this.insertHtmlAtCaret(originalHTML, false)

          setTimeout(() => {
            this.spellcheckerWorking = false
            this.spellcheckerExecuted = false
            this.showPleaseWait(false)
            this.buttonSpellcheck.className = "tinydoc_button"
            this.setCaretPosition(this.document, originalCaretPosition)
          }, 25)
        } else {
          this.disable()
          this.showPleaseWait(true)
          this.buttonSpellcheck.className = "tinydoc_button"
          this.spellcheckerWorking = true

          const results = this.document.innerText.match(
            /[^ ?,.1234567890·!¡¿,`~!@#$%^&*()_|+\-=?;:",.<>{}[\]\\/\s]+/g
          )

          const dataRequest = {}
          dataRequest["lang"] = this.spellcheckerLanguage
          dataRequest["words"] = results

          this.myWorker = new Worker(this.spellcheckerURL)
          this.myWorker.onmessage = (e) => {
            try {
              if (this.spellcheckerWorking) {
                this.focus()

                const words = e.data

                this.spellcheckerResult = words

                let originalHTML = this.document.innerHTML

                originalCaretPosition = this.getCaretPosition(this.document)

                for (const key in words) {
                  const wordToUnderline = key

                  const exp = new RegExp(
                    "\\b(" + wordToUnderline + ")\\b(?![^<]*>|[^<>]*>)",
                    "gi"
                  )

                  originalHTML = originalHTML.replace(exp, (m) => {
                    return "<misspelled>" + m + "</misspelled>"
                  })
                }

                try {
                  while (this.document.firstChild) {
                    this.document.removeChild(this.document.firstChild)
                  }
                } catch (err) {
                  //
                }

                this.insertHtmlAtCaret(originalHTML, false)
                this.enable()
                this.setCaretPosition(this.document, originalCaretPosition)
                this.showPleaseWait(false)

                setTimeout(() => {
                  this.spellcheckerWorking = false
                  this.spellcheckerExecuted = true
                }, 500)
              }
            } catch (err) {
              //
            }
            return true
          }

          this.myWorker.onerror = () => {
            setTimeout(() => {
              this.spellcheckerWorking = false
              this.spellcheckerExecuted = false
              this.buttonSpellcheck.className = "tinydoc_button"
              this.enable()
              this.setCaretPosition(this.document, originalCaretPosition)
              this.showPleaseWait(false)
            }, 25)
          }

          this.myWorker.postMessage(dataRequest)
        }
      }
    } catch (err) {
      //
    }
  }

  print() {
    if (this.spellcheckerWorking) {
      return
    }

    const webLinkColor = "#3A76B1"

    if (!this.isMobileDevice) {
      try {
        const newIframe = document.createElement("iframe")
        newIframe.width = "0"
        newIframe.height = "0"
        newIframe.src = "about:blank"
        document.body.appendChild(newIframe)
        newIframe.contentWindow.document.write(
          "<!DOCTYPE html><html><head><title>" +
            this.encodeText(window.location.href) +
            "</title><style>a{text-decoration:underline;color:" +
            webLinkColor +
            "}</style></head><body style='font-family:Arial;font-size:16px;white-space:pre-wrap'>" +
            this.document.innerHTML +
            "</body></html>"
        )
        newIframe.contentWindow.document.close()
        newIframe.contentWindow.focus()
        newIframe.contentWindow.print()
        document.body.removeChild(newIframe)

        setTimeout(() => {
          this.document.focus()
        }, 25)
      } catch (err) {
        //
      }
    } else {
      try {
        const printingWindow = window.open("about:blank", "_blank")
        printingWindow.document.write(
          "<!DOCTYPE html><html><head><title>" +
            this.encodeText(window.location.href) +
            "</title><style>a{text-decoration:underline;color:" +
            webLinkColor +
            "}</style></head><body style='font-family:Arial;font-size:16px;white-space:pre-wrap'>" +
            this.document.innerHTML +
            "</body></html>"
        )
        printingWindow.document.close()
        printingWindow.focus()
        setTimeout(() => {
          printingWindow.print()
        }, 500)
      } catch (err) {
        //
      }
    }
  }

  undo(keyboardRequest) {
    try {
      if (!this.canUndoRedo) {
        return
      }

      if (!this.isDocumentSelected() && !keyboardRequest) {
        return
      }

      if (this.spellcheckerWorking) {
        return
      }

      if (this.spellcheckerExecuted) {
        this.spellcheck()

        return
      }

      this.document.style.caretColor = "transparent"
      this.canUndoRedo = false
      this.document_history_lastCaret = this.getCaretPosition(this.document)

      if (this.document_history_index > 0) {
        while (this.document.firstChild) {
          this.document.removeChild(this.document.firstChild)
        }

        this.insertHtmlAtCaret(
          this.document_history[this.document_history_index - 1],
          false
        )

        setTimeout(() => {
          this.setCaretPosition(
            this.document,
            this.document_history_caret[this.document_history_index - 1]
          )

          this.document_history_index = this.document_history_index - 1
          this.scrollToCaret()
          this.document.style.caretColor = "black"
          this.canUndoRedo = true
        }, 25)
      } else {
        setTimeout(() => {
          this.setCaretPosition(this.document, this.document_history_lastCaret)
          this.document.style.caretColor = "black"
          this.canUndoRedo = true
        }, 25)
      }
    } catch (err) {
      setTimeout(() => {
        this.setCaretPosition(this.document, 0)
        this.document.style.caretColor = "black"
        this.canUndoRedo = true
      }, 25)
    }
  }

  redo(keyboardRequest) {
    try {
      if (!this.canUndoRedo) {
        return
      }

      if (!this.isDocumentSelected() && !keyboardRequest) {
        return
      }

      if (this.spellcheckerWorking) {
        return
      }

      if (this.spellcheckerExecuted) {
        this.spellcheck()

        return
      }

      this.document.style.caretColor = "transparent"
      this.canUndoRedo = false
      this.document_history_lastCaret = this.getCaretPosition(this.document)

      if (this.document_history[this.document_history_index + 1]) {
        while (this.document.firstChild) {
          this.document.removeChild(this.document.firstChild)
        }

        this.insertHtmlAtCaret(
          this.document_history[this.document_history_index + 1],
          false
        )

        setTimeout(() => {
          this.setCaretPosition(
            this.document,
            this.document_history_caret[this.document_history_index + 1]
          )

          this.document_history_index = this.document_history_index + 1
          this.scrollToCaret()
          this.document.style.caretColor = "black"
          this.canUndoRedo = true
        }, 25)
      } else {
        setTimeout(() => {
          this.setCaretPosition(this.document, this.document_history_lastCaret)
          this.document.style.caretColor = "black"
          this.canUndoRedo = true
        }, 25)
      }
    } catch (err) {
      setTimeout(() => {
        this.setCaretPosition(this.document, 0)
        this.document.style.caretColor = "black"
        this.canUndoRedo = true
      }, 25)
    }
  }

  saveUndo() {
    try {
      let current_state = this.document.innerHTML
      current_state = current_state.replace(/<misspelled>/gm, "")
      current_state = current_state.replace(/<\/misspelled>/gm, "")

      if (current_state !== this.document_history[this.document_history_index]) {
        if (this.document_history_index <= this.document_history.length - 1) {
          this.document_history = this.document_history.slice(
            0,
            this.document_history_index + 1
          )
          this.document_history_caret = this.document_history_caret.slice(
            0,
            this.document_history_index + 1
          )

          this.document_history_index = this.document_history_index + 1
        }

        this.document_history.push(current_state)
        this.document_history_caret.push(this.getCaretPosition(this.document))
        this.document_history_index = this.document_history.length - 1
      }
    } catch (err) {
      //
    }
  }

  clearUndoRedo() {
    this.document_history = []
    this.document_history_caret = []
    this.document_history_index = 0
    this.document_history_lastCaret = 0

    this.saveUndo()
  }

  // https://gist.github.com/isLishude/6ccd1fbf42d1eaac667d6873e7b134f8
  // https://codepen.io/jeffward/pen/OJjPKYo
  setCaretPosition(container, position) {
    try {
      if (position === null) {
        position = 0
      }

      const createRange = (node, chars, range) => {
        if (range === null || typeof range === "undefined") {
          range = window.document.createRange()
          range.selectNode(node)
          range.setStart(node, 0)
        }

        if (chars.count === 0) {
          range.setEnd(node, chars.count)
        } else if (node !== null && chars.count > 0) {
          if (node.nodeType === 3) {
            if (node.textContent.length < chars.count) {
              chars.count -= node.textContent.length
            } else {
              range.setEnd(node, chars.count)
              chars.count = 0
            }
          } else {
            let _g = 0
            const _g1 = node.childNodes.length
            while (_g < _g1) {
              const lp = _g++
              range = createRange(node.childNodes[lp], chars, range)
              if (chars.count === 0) {
                break
              }
            }
          }
        }
        return range
      }

      if (position >= 0) {
        const selection = window.getSelection()
        const range = createRange(container, { count: position })
        if (range !== null) {
          range.collapse(false)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }
    } catch (err) {
      //
    }
  }

  // https://stackoverflow.com/questions/3972014/get-contenteditable-caret-position
  getCaretPosition(element) {
    try {
      if (!this.isDocumentSelected()) {
        return 0
      }

      let caretOffset = 0

      const range = window.getSelection().getRangeAt(0)
      const preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(element)
      preCaretRange.setEnd(range.endContainer, range.endOffset)

      caretOffset = preCaretRange.toString().length

      return caretOffset
    } catch (err) {
      return 0
    }
  }

  insertLink() {
    try {
      const checkForEmail = (email) => {
        const re =
          /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
      }

      const selectedText = window.getSelection().toString()

      if (selectedText !== null) {
        if (selectedText.length > 0) {
          const selectedTextURLChecker1 = selectedText.toLowerCase().indexOf(" ")
          const selectedTextURLChecker2 = selectedText
            .toLowerCase()
            .indexOf("http://")
          const selectedTextURLChecker3 = selectedText
            .toLowerCase()
            .indexOf("https://")
          const selectedTextURLChecker4 = checkForEmail(selectedText)

          if (
            selectedTextURLChecker1 === -1 &&
            (selectedTextURLChecker2 === 0 ||
              selectedTextURLChecker3 === 0 ||
              selectedTextURLChecker4)
          ) {
            if (selectedTextURLChecker4) {
              this.insertHtmlAtCaret(
                "<a href='mailto:" +
                  selectedText.toLowerCase() +
                  "' target='_blank'>" +
                  selectedText +
                  "</a>",
                false
              )
            } else {
              this.insertHtmlAtCaret(
                "<a href='" +
                  selectedText +
                  "' target='_blank'>" +
                  selectedText +
                  "</a>",
                false
              )
            }
          }
        }
      }

      setTimeout(() => {
        this.document.focus()
      }, 100)
    } catch (err) {
      //
    }
  }

  insertCalc() {
    try {
      let selectedText = window.getSelection().toString()

      if (selectedText !== null) {
        if (selectedText.length > 0) {
          try {
            document.getSelection().collapseToEnd()
          } catch (err) {
            //
          }

          const splitted = selectedText.split("\n")

          let finalResult

          if (splitted.length === 1) {
            selectedText = selectedText.replace(/[^0-9.*/()+-]/g, "")

            try {
              // eslint-disable-next-line no-eval
              finalResult = eval(selectedText)

              if (isNaN(finalResult)) {
                this.insertHtmlAtCaret(" = ERROR", false)
              } else {
                finalResult = parseFloat(finalResult).toFixed(2)

                if (finalResult.indexOf(".00") > -1) {
                  finalResult = parseFloat(finalResult).toFixed(0)
                }

                this.insertHtmlAtCaret(" = " + finalResult, false)
              }
            } catch (err) {
              this.insertHtmlAtCaret(" = ERROR", false)
            }
          } else {
            finalResult = 0

            let lastLineBR = ""

            for (let i = 0; i < splitted.length; i++) {
              try {
                let currentLine = splitted[i]

                if (currentLine.length > 0) {
                  currentLine = currentLine.trim()

                  if (currentLine.lastIndexOf(" ") > -1) {
                    currentLine = currentLine.substr(
                      currentLine.lastIndexOf(" ") + 1,
                      currentLine.length
                    )
                  }

                  currentLine = currentLine.replace(/[^0-9.]/g, "")

                  finalResult = parseFloat(finalResult) + parseFloat(currentLine)
                }

                if (currentLine !== "" && i === splitted.length - 1) {
                  lastLineBR = "<br>"
                }
              } catch (err) {
                //
              }
            }

            try {
              if (isNaN(finalResult)) {
                this.insertHtmlAtCaret(lastLineBR + "----------<br />ERROR", false)
              } else {
                finalResult = parseFloat(finalResult).toFixed(2)

                if (finalResult.indexOf(".00") > -1) {
                  finalResult = parseFloat(finalResult).toFixed(0)
                }

                this.insertHtmlAtCaret(
                  lastLineBR + "----------<br />" + finalResult,
                  false
                )
              }
            } catch (err) {
              this.insertHtmlAtCaret(lastLineBR + "----------<br />ERROR", false)
            }
          }
        }
      }
    } catch (err) {
      //
    }

    setTimeout(() => {
      this.document.focus()
    }, 100)
  }

  checkForURL() {
    try {
      let linkTag = this.getParentTag("A")

      if (linkTag === null) {
        linkTag = this.getCurrentTag()
      }

      if (linkTag.nodeName === "A") {
        let finalURL = linkTag.href

        if (typeof finalURL !== "undefined") {
          finalURL = finalURL.replace(/<misspelled>/gm, "")
          finalURL = finalURL.replace(/<\/misspelled>/gm, "")

          this.contentViewer.innerHTML =
            "<a href='" + finalURL + "' target='_blank'>" + finalURL + "</a>"
        }
      } else {
        this.contentViewer.innerHTML = ""
      }
    } catch (err) {
      //
    }
  }

  checkForMisspelled() {
    try {
      let misspelledTag = this.getParentTag("MISSPELLED")

      if (misspelledTag === null) {
        misspelledTag = this.getCurrentTag()
      }

      if (misspelledTag.nodeName === "MISSPELLED") {
        const finalMisspelled = misspelledTag.textContent

        if (typeof finalMisspelled !== "undefined") {
          this.contentViewer.innerHTML = ""

          if (this.spellcheckerResult[finalMisspelled]) {
            for (
              let i = 0;
              i < this.spellcheckerResult[finalMisspelled].length;
              i++
            ) {
              const suggestedWord = document.createElement("span")
              suggestedWord.className = "tinydoc_spellchecker_suggestions"
              suggestedWord.innerHTML = this.spellcheckerResult[finalMisspelled][i]
              suggestedWord.addEventListener("mousedown", () => {
                this.replaceWith(this.innerHTML)
              })

              this.contentViewer.appendChild(suggestedWord)
            }

            if (this.spellcheckerResult[finalMisspelled].length === 0) {
              this.contentViewer.innerHTML =
                '<span class="tinydoc_spellchecker_no_suggestions">' +
                this.spellcheckerNoSuggestionsLabel +
                "</span>"
            }
          } else {
            this.contentViewer.innerHTML = ""

            this.replaceWith(misspelledTag.textContent)
          }
        }
      } else {
        if (!this.getParentTag("A") || !this.getCurrentTag("A")) {
          this.contentViewer.innerHTML = ""
        }
      }
    } catch (err) {
      //
    }
  }

  replaceWith(word) {
    try {
      if (!this.isDocumentSelected()) {
        this.contentViewer.innerHTML = ""
        return
      }

      const currentTag = this.getCurrentTag()

      if (currentTag.parentNode.nodeName === "MISSPELLED") {
        const originalCaretPosition = this.getCaretPosition(this.document)

        this.saveUndo()

        currentTag.nodeValue = word

        currentTag.parentNode.parentNode.replaceChild(
          currentTag.parentNode.firstChild,
          currentTag.parentNode
        )

        this.contentViewer.innerHTML = ""
        this.focus()
        this.saveUndo()
        window.onbeforeunload = () => {
          return "Dirty"
        }

        setTimeout(() => {
          this.setCaretPosition(this.document, originalCaretPosition)
        })
      } else {
        this.contentViewer.innerHTML = ""
      }
    } catch (err) {
      //
    }
  }

  // https://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
  insertHtmlAtCaret(html, selectPastedContent) {
    try {
      if (!this.isDocumentSelected()) {
        return
      }

      if (this.canUndoRedo && !this.spellcheckerWorking) {
        this.saveUndo()
      }

      const selection = window.getSelection()

      if (selection.getRangeAt && selection.rangeCount) {
        let range = selection.getRangeAt(0)
        range.deleteContents()

        const el = document.createElement("div")
        el.innerHTML = html

        let frag = document.createDocumentFragment()
        let node
        let lastNode

        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node)
        }

        const firstNode = frag.firstChild
        range.insertNode(frag)

        if (lastNode) {
          range = range.cloneRange()
          range.setStartAfter(lastNode)
          if (selectPastedContent) {
            range.setStartBefore(firstNode)
          } else {
            range.collapse(true)
          }
          selection.removeAllRanges()
          selection.addRange(range)
        }

        if (this.spellcheckerWorking) {
          return
        } else if (this.settingNewText) {
          this.settingNewText = false

          this.setCaretPosition(this.document, 0)
        } else if (this.keyEnterPressed) {
          this.keyEnterPressed = false

          this.scrollToCaret()

          window.onbeforeunload = () => {
            return "Dirty"
          }
        } else {
          setTimeout(() => {
            if (lastNode) {
              range = range.cloneRange()
              range.setStartAfter(lastNode)
              if (selectPastedContent) {
                range.setStartBefore(firstNode)
              } else {
                range.collapse(true)
              }
              selection.removeAllRanges()
              selection.addRange(range)
            }

            if (this.canUndoRedo) {
              this.scrollToCaret()

              this.saveUndo()
            }

            window.onbeforeunload = () => {
              return "Dirty"
            }
          }, 25)
        }
      }
    } catch (err) {
      //
    }
  }

  // https://stackoverflow.com/questions/17678843/cant-restore-selection-after-html-modify-even-if-its-the-same-html
  saveSelection(containerEl) {
    try {
      const doc = containerEl.ownerDocument
      const win = doc.defaultView
      const range = win.getSelection().getRangeAt(0)
      const preSelectionRange = range.cloneRange()
      preSelectionRange.selectNodeContents(containerEl)
      preSelectionRange.setEnd(range.startContainer, range.startOffset)
      const start = preSelectionRange.toString().length
      return { start: start, end: start + range.toString().length }
    } catch (err) {
      return { start: 0, end: 0 }
    }
  }

  // https://stackoverflow.com/questions/17678843/cant-restore-selection-after-html-modify-even-if-its-the-same-html
  restoreSelection(containerEl, savedSel) {
    try {
      const doc = containerEl.ownerDocument,
        win = doc.defaultView
      let charIndex = 0
      let range = doc.createRange()
      range.setStart(containerEl, 0)
      range.collapse(true)
      let nodeStack = [containerEl]
      let node
      let foundStart = false
      let stop = false

      while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType === 3) {
          const nextCharIndex = charIndex + node.length
          if (
            !foundStart &&
            savedSel.start >= charIndex &&
            savedSel.start < nextCharIndex
          ) {
            range.setStart(node, savedSel.start - charIndex)
            foundStart = true
          }
          if (
            foundStart &&
            savedSel.end >= charIndex &&
            savedSel.end <= nextCharIndex
          ) {
            range.setEnd(node, savedSel.end - charIndex)
            stop = true
          }
          charIndex = nextCharIndex
        } else {
          let i = node.childNodes.length
          while (i--) {
            nodeStack.push(node.childNodes[i])
          }
        }
      }

      const sel = win.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    } catch (err) {
      //
    }
  }
}
