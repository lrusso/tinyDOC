class tinyDOC {
  constructor(editorConfig) {
    // SETTING THE TINYDOC CONTAINER
    this.myContainer = editorConfig.container

    // CHECKING IF THERE IS NO SPELLCHECKER CONFIGURATION
    if (typeof editorConfig.spellcheckerEnabled === "undefined") {
      // DISABLING THE SPELLCHECKER
      this.spellcheckerEnabled = false
    } else {
      // USING THE SPELLCHECKER CONFIGURATION
      this.spellcheckerEnabled = editorConfig.spellcheckerEnabled
    }

    // CHECKING IF THERE IS A SAVE FUNCTION
    if (editorConfig.saveFunction) {
      // SETTING THE SAVE FUNCTION
      this.saveFunction = editorConfig.saveFunction
    }

    // CHECKING IF THERE IS A SPELLCHECKER LANGUAGE
    if (editorConfig.spellcheckerLanguage) {
      // SETTING THE SPELLCHECKER LANGUAGE
      this.spellcheckerLanguage = editorConfig.spellcheckerLanguage
    }

    // CHECKING IF THERE IS A SPELLCHECKER URL
    if (editorConfig.spellcheckerURL) {
      // SETTING THE SPELLCHECKER URL
      this.spellcheckerURL = editorConfig.spellcheckerURL
    }

    // CHECKING IF THERE IS A SPELLCHECKER NO SUGGESTION LABEL
    if (editorConfig.spellcheckerNoSuggestionsLabel) {
      // SETTING THE SPELLCHECKER NO SUGGESTION LABEL
      this.spellcheckerNoSuggestionsLabel =
        editorConfig.spellcheckerNoSuggestionsLabel
    } else {
      // SETTING THE DEFAULT SPELLCHECKER NO SUGGESTION LABEL
      this.spellcheckerNoSuggestionsLabel = "(no suggestions)"
    }

    // SETTING ALL THE TEMPLATES (IF ANY)
    this.template1 = editorConfig.template1
    this.template2 = editorConfig.template2
    this.template3 = editorConfig.template3

    // SETTING THAT THE DOCUMENT IS ENABLED
    this.documentEnabled = true

    // ADDING THE STYLESHEET
    this.styleSheet = document.createElement("style")
    this.styleSheet.innerText =
      ".tinydoc_menu_container{height:40px;background-color:#F2F2F2;border-bottom:thin solid #D3D3D3;overflow-y:hidden} .tinydoc_menu{background-color:#F2F2F2;left:0;right:0;padding-top:0;padding-bottom:0;height:80px;margin-left:3px;overflow-x:scroll;overflow-y:hidden;outline:none;text-align:center;font-family:Arial;font-size:13px} .tinydoc_menu::-webkit-scrollbar{display:none} .tinydoc_menu_size{float:left;width:800px} .tinydoc_holder{float:left;padding-top:3px;padding-bottom:3px;padding-right:3px;margin:0} .tinydoc_separator{float:left;border-left:thin solid #D3D3D3;margin-left:1px;margin-right:3px;height:100px;width:1px} .tinydoc_separator2{float:left;border-left:thin solid #D3D3D3;margin-left:135px;height:100px;width:1px} .tinydoc_button_save{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_save:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_print{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;} .tinydoc_button_print:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_spellcheck{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_spellcheck:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_spellcheck_enabled{background-color:#E3E3E3 !important;border:thin solid #D3D3D3 !important} .tinydoc_button_undo{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;} .tinydoc_button_undo:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_redo{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_redo:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_bold{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_bold:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_italic{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_italic:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_underline{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_underline:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_strikethrough{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_strikethrough:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_dotted{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_dotted:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_numbered{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_numbered:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_highlight{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_highlight:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_link{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_link:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_template{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_template:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_calc{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_calc:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_clear{display:block;font-family:Arial;font-size:15px;line-height:28px;height:28px;width:32px;padding-top:4px;background-color:#F2F2F2;border:thin solid #F2F2F2;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none} .tinydoc_button_clear:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_document{display:block;padding:8px;outline:none;color:black;background-color:white;font-family:Arial;font-size:16px;line-height:1.3;overflow:auto;-webkit-text-size-adjust:none;-webkit-user-select:text;user-select:text} .tinydoc_document a{text-decoration:underline;color:#3a76b1} .tinydoc_contentviewer{display:inline-block;font-family:Arial;font-size:13px;line-height:2.6;margin-left:11px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:1px;white-space:nowrap} .tinydoc_contentviewer a{text-decoration:none;color:#3a76b1;margin-right:11px} .tinydoc_contentviewer .tinydoc_spellchecker_suggestions{display:inline-block;color:#3a76b1;margin-right:20px;cursor:pointer} .tinydoc_spellchecker_no_suggestions{color:gray} misspelled{text-decoration:underline;text-decoration-color:red;text-decoration-thickness:2px;text-decoration-style:dotted} @media (pointer: coarse) { .tinydoc_button_save:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_print:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_spellcheck:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_undo:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_redo:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_bold:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_italic:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_underline:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_strikethrough:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_dotted:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_numbered:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_highlight:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_link:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_template:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_calc:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_clear:hover{background-color:#F2F2F2;border:thin solid #F2F2F2}}"
    document.getElementsByTagName("head")[0].appendChild(this.styleSheet)

    // ADDING THE MENU BAR
    this.menuContainer = document.createElement("div")
    this.menuContainer.className = "tinydoc_menu_container"
    this.menuWrapper = document.createElement("div")
    this.menuWrapper.className = "tinydoc_menu"
    this.menuContainer.appendChild(this.menuWrapper)
    this.menu = document.createElement("div")
    this.menu.className = "tinydoc_menu_size"
    this.menuWrapper.appendChild(this.menu)
    this.myContainer.appendChild(this.menuContainer)

    // CHECKING IF THERE IS A SAVE FUNCTION
    if (this.saveFunction) {
      // ADDING THE SAVE BUTTON
      this.holder1 = document.createElement("div")
      this.holder1.className = "tinydoc_holder"
      this.menu.appendChild(this.holder1)
      this.buttonSave = document.createElement("div")
      this.buttonSave.className = "tinydoc_button_save"
      this.buttonSave.innerHTML =
        "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M896 960h-896v-1024h1024v896zM512 832h128v-256h-128v256zM896 64h-768v768h64v-320h576v320h75l53 -53v-715z' transform='translate(-10 930) scale(-1,1) rotate(180)'/></svg>"
      this.holder1.appendChild(this.buttonSave)

      // ADDING A SEPARATOR
      this.separator1 = document.createElement("div")
      this.separator1.className = "tinydoc_separator"
      this.menu.appendChild(this.separator1)
    }

    // ADDING THE PRINT BUTTON
    this.holder2 = document.createElement("div")
    this.holder2.className = "tinydoc_holder"
    this.menu.appendChild(this.holder2)
    this.buttonPrint = document.createElement("div")
    this.buttonPrint.className = "tinydoc_button_print"
    this.buttonPrint.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M256 896h512v-128h-512v128zM960 704h-896q-26 0 -45 -19t-19 -45v-320q0 -26 19 -45t45 -19h192v-256h512v256h192q26 0 45 19t19 45v320q0 26 -19 45t-45 19zM704 64h-384v320h384v-320zM974 608q0 -19 -13.5 -32.5t-32.5 -13.5t-32.5 13.5t-13.5 32.5t13.5 32.5 t32.5 13.5t32.5 -13.5t13.5 -32.5z' transform='translate(0 930) scale(-0.97,0.97) rotate(180)'/></svg>"
    this.holder2.appendChild(this.buttonPrint)

    // ADDING A SEPARATOR
    this.separator2 = document.createElement("div")
    this.separator2.className = "tinydoc_separator"
    this.menu.appendChild(this.separator2)

    // CHECKING IF THE SPELLCHECKER IS ENABLED
    if (this.spellcheckerEnabled) {
      // ADDING THE SPELLCHECKER BUTTON
      this.holder3 = document.createElement("div")
      this.holder3.className = "tinydoc_holder"
      this.menu.appendChild(this.holder3)
      this.buttonSpellcheck = document.createElement("div")
      this.buttonSpellcheck.className = "tinydoc_button_spellcheck"
      this.buttonSpellcheck.innerHTML =
        "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M128 704h128v-192h64v384q0 26 -19 45t-45 19h-128q-26 0 -45 -19t-19 -45v-384h64v192zM128 896h128v-128h-128v128zM960 896v64h-192q-26 0 -45 -19t-19 -45v-320q0 -26 19 -45t45 -19h192v64h-192v320h192zM640 800v96q0 26 -19 45t-45 19h-192v-448h192q26 0 45 19 t19 45v96q0 26 -9 45t-35 19q26 0 35 19t9 45zM576 576h-128v128h128v-128zM576 768h-128v128h128v-128zM832 384l-416 -448l-224 288l82 70l142 -148l352 302z' transform='translate(0 950) scale(-0.97,0.97) rotate(180)'/></svg>"
      this.holder3.appendChild(this.buttonSpellcheck)

      // ADDING A SEPARATOR
      this.separator3 = document.createElement("div")
      this.separator3.className = "tinydoc_separator"
      this.menu.appendChild(this.separator3)
    }

    // ADDING THE UNDO BUTTON
    this.holder4 = document.createElement("div")
    this.holder4.className = "tinydoc_holder"
    this.menu.appendChild(this.holder4)
    this.buttonUndo = document.createElement("div")
    this.buttonUndo.className = "tinydoc_button_undo"
    this.buttonUndo.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M762 -64q43 77 62 168t-9 168t-113.5 127.5t-253.5 46.5v-254l-384 384l384 384v-248q201 5 314.5 -73t148.5 -196t-4.5 -255.5t-144.5 -251.5z' transform='translate(0 960) scale(-1,1) rotate(180)'/></svg>"
    this.holder4.appendChild(this.buttonUndo)

    // ADDING THE REDO BUTTON
    this.holder5 = document.createElement("div")
    this.holder5.className = "tinydoc_holder"
    this.menu.appendChild(this.holder5)
    this.buttonRedo = document.createElement("div")
    this.buttonRedo.className = "tinydoc_button_redo"
    this.buttonRedo.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M576 712v248l384 -384l-384 -384v254q-168 4 -253.5 -46.5t-113.5 -127.5t-9 -168t62 -168q-105 114 -144.5 251.5t-4.5 255.5t148.5 196t314.5 73v0z' transform='translate(0 960) scale(-1,1) rotate(180)'/></svg>"
    this.holder5.appendChild(this.buttonRedo)

    // ADDING A SEPARATOR
    this.separator4 = document.createElement("div")
    this.separator4.className = "tinydoc_separator"
    this.menu.appendChild(this.separator4)

    // ADDING THE BOLD BUTTON
    this.holder6 = document.createElement("div")
    this.holder6.className = "tinydoc_holder"
    this.menu.appendChild(this.holder6)
    this.buttonBold = document.createElement("div")
    this.buttonBold.className = "tinydoc_button_bold"
    this.buttonBold.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M708 475q28 34 44 76t16 89q0 53 -20 99.5t-55 81.5t-81.5 55t-99.5 20h-320v-896h384q53 0 99.5 20t81.5 55t55 81.5t20 99.5q0 70 -34 128t-90 91zM384 768h101q42 0 72 -37.5t30 -90.5t-30 -90.5t-71 -37.5h-102v256zM543 128h-159v256h159q44 0 75 -37.5t31 -90.5 t-31 -90.5t-75 -37.5z' transform='translate(0 960) scale(-1,1) rotate(180)'/></svg>"
    this.holder6.appendChild(this.buttonBold)

    // ADDING THE ITALIC BUTTON
    this.holder7 = document.createElement("div")
    this.holder7.className = "tinydoc_holder"
    this.menu.appendChild(this.holder7)
    this.buttonItalic = document.createElement("div")
    this.buttonItalic.className = "tinydoc_button_italic"
    this.buttonItalic.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M896 896v-64h-128l-320 -768h128v-64h-448v64h128l320 768h-128v64h448z' transform='translate(0 955) scale(-1,1) rotate(180)'/></svg>"
    this.holder7.appendChild(this.buttonItalic)

    // ADDING THE UNDERLINE BUTTON
    this.holder8 = document.createElement("div")
    this.holder8.className = "tinydoc_holder"
    this.menu.appendChild(this.holder8)
    this.buttonUnderline = document.createElement("div")
    this.buttonUnderline.className = "tinydoc_button_underline"
    this.buttonUnderline.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M704 896h128v-416q0 -60 -25 -112.5t-68.5 -91.5t-102 -61.5t-124.5 -22.5t-124.5 22.5t-102 61.5t-68.5 91.5t-25 112.5v416h128v-416q0 -30 13.5 -58t37.5 -51q28 -24 64.5 -37.5t76.5 -13.5t76.5 13.5t64.5 37.5q24 23 37.5 51t13.5 58v416zM192 128h640v-128h-640 v128z' transform='translate(0 975) scale(-1,1) rotate(180)'/></svg>"
    this.holder8.appendChild(this.buttonUnderline)

    // ADDING THE STRIKETHROUGH BUTTON
    this.holder9 = document.createElement("div")
    this.holder9.className = "tinydoc_holder"
    this.menu.appendChild(this.holder9)
    this.buttonStrikethrough = document.createElement("div")
    this.buttonStrikethrough.className = "tinydoc_button_strikethrough"
    this.buttonStrikethrough.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M731 443q48 -36 74.5 -85t26.5 -102t-26.5 -102t-74.5 -85q-44 -33 -100.5 -51t-118.5 -18t-118.5 18t-100.5 51q-48 36 -74.5 85t-26.5 102h128q0 -52 57 -90t135 -38t135 38t57 90t-57 90t-135 38q-62 0 -118.5 18t-100.5 51q-48 36 -74.5 85t-26.5 102t26.5 102 t74.5 85q44 33 100.5 51t118.5 18t118.5 -18t100.5 -51q48 -36 74.5 -85t26.5 -102h-128q0 52 -57 90t-135 38t-135 -38t-57 -90t57 -90t135 -38q62 0 118.5 -18t100.5 -51v0zM0 448h1024v-64h-1024v64z' transform='translate(0 960) scale(-1,1) rotate(180)'/></svg>"
    this.holder9.appendChild(this.buttonStrikethrough)

    // ADDING A SEPARATOR
    this.separator5 = document.createElement("div")
    this.separator5.className = "tinydoc_separator"
    this.menu.appendChild(this.separator5)

    // ADDING THE DOTTED BUTTON
    this.holder10 = document.createElement("div")
    this.holder10.className = "tinydoc_holder"
    this.menu.appendChild(this.holder10)
    this.buttonDotted = document.createElement("div")
    this.buttonDotted.className = "tinydoc_button_dotted"
    this.buttonDotted.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M384 896h640v-128h-640v128zM384 512h640v-128h-640v128zM384 128h640v-128h-640v128zM0 832q0 53 37.5 90.5t90.5 37.5t90.5 -37.5t37.5 -90.5t-37.5 -90.5t-90.5 -37.5t-90.5 37.5t-37.5 90.5zM0 448q0 53 37.5 90.5t90.5 37.5t90.5 -37.5t37.5 -90.5t-37.5 -90.5 t-90.5 -37.5t-90.5 37.5t-37.5 90.5zM0 64q0 53 37.5 90.5t90.5 37.5t90.5 -37.5t37.5 -90.5t-37.5 -90.5t-90.5 -37.5t-90.5 37.5t-37.5 90.5z' transform='translate(0 940) scale(-0.97,0.97) rotate(180)'/></svg>"
    this.holder10.appendChild(this.buttonDotted)

    // ADDING THE NUMBERED BUTTON
    this.holder11 = document.createElement("div")
    this.holder11.className = "tinydoc_holder"
    this.menu.appendChild(this.holder11)
    this.buttonNumbered = document.createElement("div")
    this.buttonNumbered.className = "tinydoc_button_numbered"
    this.buttonNumbered.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M384 128h640v-128h-640v128zM384 512h640v-128h-640v128zM384 896h640v-128h-640v128zM192 960v-256h-64v192h-64v64h128zM128 434v-50h128v-64h-192v146l128 60v50h-128v64h192v-146zM256 256v-320h-192v64h128v64h-128v64h128v64h-128v64h192z' transform='translate(-50 940) scale(-0.97,0.97) rotate(180)'/></svg>"
    this.holder11.appendChild(this.buttonNumbered)

    // ADDING THE HIGHLIGHT BUTTON
    this.holder12 = document.createElement("div")
    this.holder12.className = "tinydoc_holder"
    this.menu.appendChild(this.holder12)
    this.buttonHighlight = document.createElement("div")
    this.buttonHighlight.className = "tinydoc_button_highlight"
    this.buttonHighlight.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M739 627l-502 -502h-186v185l503 503l185 -186v0zM803 688l-185 186l67 67q17 17 38.5 17t38.5 -17l108 -109q17 -17 17 -38.5t-17 -38.5l-67 -67v0zM42 0' transform='translate(0 950) scale(-0.97,0.97) rotate(180)'/><path fill='#FFFF00' d='M-739 627l-502 -17 17 -38.5t-17 -38.5l-67 -67v0zM42 48h940v-112h-940v112v0z' transform='translate(0 950) scale(-0.97,0.97) rotate(180)'/></svg>"
    this.holder12.appendChild(this.buttonHighlight)

    // ADDING THE LINK BUTTON
    this.holder13 = document.createElement("div")
    this.holder13.className = "tinydoc_holder"
    this.menu.appendChild(this.holder13)
    this.buttonLink = document.createElement("div")
    this.buttonLink.className = "tinydoc_button_link"
    this.buttonLink.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M320 256q13 -13 32.5 -12.5t33.5 14.5l316 316q14 14 14.5 33.5t-12.5 32.5t-32.5 12.5t-33.5 -14.5l-316 -316q-14 -14 -14.5 -33.5t12.5 -32.5zM477 285q3 -7 5 -14.5t2 -15.5q0 -13 -5 -25t-14 -21l-163 -163q-10 -10 -22 -14.5t-25 -4.5t-25 4.5t-21 14.5l-99 99 q-10 9 -14.5 21t-4.5 25t4.5 25t14.5 21l163 164q9 9 21 14t25 5q8 0 15.5 -2t14.5 -5l65 65q-21 16 -45.5 24t-49.5 8q-30 0 -58.5 -11t-51.5 -34l-163 -163q-46 -46 -46 -111t46 -110l99 -99q23 -23 51.5 -34.5t58.5 -11.5t59 11.5t52 34.5l163 163q42 42 45 100.5 t-32 104.5l-65 -65v0zM978 815l-99 99q-23 23 -51.5 34.5t-58.5 11.5t-59 -11.5t-51 -34.5l-164 -163q-42 -42 -45 -100.5t32 -104.5l65 65q-3 7 -5 14.5t-2 15.5q0 13 5 25t14 21l163 163q10 10 22 14.5t25 4.5t25 -4.5t21 -14.5l99 -99q10 -9 14.5 -21t4.5 -25t-4.5 -25 t-14.5 -21l-163 -164q-9 -9 -21 -14t-25 -5q-8 0 -15.5 2t-14.5 5l-65 -65q21 -16 45.5 -24t49.5 -8q30 0 58.5 11t51.5 34l163 164q46 45 46 110t-46 110z' transform='translate(0 930) scale(-0.97,0.97) rotate(180)'/></svg>"
    this.holder13.appendChild(this.buttonLink)

    // ADDING A SEPARATOR
    this.separator6 = document.createElement("div")
    this.separator6.className = "tinydoc_separator"
    this.menu.appendChild(this.separator6)

    // CHECKING IF THERE IS A TEMPLATE 1
    if (editorConfig.template1) {
      // ADDING THE TEMPLATE 1 BUTTON
      this.holder14 = document.createElement("div")
      this.holder14.className = "tinydoc_holder"
      this.menu.appendChild(this.holder14)
      this.buttonTemplate1 = document.createElement("div")
      this.buttonTemplate1.className = "tinydoc_button_template"
      this.buttonTemplate1.innerHTML =
        "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M384 768h128v-64h-128v64zM576 768h128v-64h-128v64zM896 768v-256h-192v64h128v128h-64v64h128zM320 576h128v-64h-128v64zM512 576h128v-64h-128v64zM192 704v-128h64v-64h-128v256h192v-64h-128zM384 384h128v-64h-128v64zM576 384h128v-64h-128v64zM896 384v-256 h-192v64h128v128h-64v64h128zM320 192h128v-64h-128v64zM512 192h128v-64h-128v64zM192 320v-128h64v-64h-128v256h192v-64h-128zM960 896h-896v-896h896v896zM1024 960v0v-1024h-1024v1024h1024z' transform='translate(0 940) scale(-0.97,0.97) rotate(180)'/></svg>"
      this.holder14.appendChild(this.buttonTemplate1)
    }

    // CHECKING IF THERE IS A TEMPLATE 2
    if (editorConfig.template2) {
      // ADDING THE TEMPLATE 2 BUTTON
      this.holder15 = document.createElement("div")
      this.holder15.className = "tinydoc_holder"
      this.menu.appendChild(this.holder15)
      this.buttonTemplate2 = document.createElement("div")
      this.buttonTemplate2.className = "tinydoc_button_template"
      this.buttonTemplate2.innerHTML =
        "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M384 768h128v-64h-128v64zM576 768h128v-64h-128v64zM896 768v-256h-192v64h128v128h-64v64h128zM320 576h128v-64h-128v64zM512 576h128v-64h-128v64zM192 704v-128h64v-64h-128v256h192v-64h-128zM384 384h128v-64h-128v64zM576 384h128v-64h-128v64zM896 384v-256 h-192v64h128v128h-64v64h128zM320 192h128v-64h-128v64zM512 192h128v-64h-128v64zM192 320v-128h64v-64h-128v256h192v-64h-128zM960 896h-896v-896h896v896zM1024 960v0v-1024h-1024v1024h1024z' transform='translate(0 940) scale(-0.97,0.97) rotate(180)'/></svg>"
      this.holder15.appendChild(this.buttonTemplate2)
    }

    // CHECKING IF THERE IS A TEMPLATE 3
    if (editorConfig.template3) {
      // ADDING THE TEMPLATE 3 BUTTON
      this.holder16 = document.createElement("div")
      this.holder16.className = "tinydoc_holder"
      this.menu.appendChild(this.holder16)
      this.buttonTemplate3 = document.createElement("div")
      this.buttonTemplate3.className = "tinydoc_button_template"
      this.buttonTemplate3.innerHTML =
        "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M384 768h128v-64h-128v64zM576 768h128v-64h-128v64zM896 768v-256h-192v64h128v128h-64v64h128zM320 576h128v-64h-128v64zM512 576h128v-64h-128v64zM192 704v-128h64v-64h-128v256h192v-64h-128zM384 384h128v-64h-128v64zM576 384h128v-64h-128v64zM896 384v-256 h-192v64h128v128h-64v64h128zM320 192h128v-64h-128v64zM512 192h128v-64h-128v64zM192 320v-128h64v-64h-128v256h192v-64h-128zM960 896h-896v-896h896v896zM1024 960v0v-1024h-1024v1024h1024z' transform='translate(0 940) scale(-0.97,0.97) rotate(180)'/></svg>"
      this.holder16.appendChild(this.buttonTemplate3)
    }

    // CHECKING IF THERE IS ANY TEMPLATE
    if (editorConfig.template1 || editorConfig.template2 || editorConfig.template3) {
      // ADDING A SEPARATOR
      this.separator7 = document.createElement("div")
      this.separator7.className = "tinydoc_separator"
      this.menu.appendChild(this.separator7)
    }

    // ADDING THE CALC BUTTON
    this.holder17 = document.createElement("div")
    this.holder17.className = "tinydoc_holder"
    this.menu.appendChild(this.holder17)
    this.buttonCalc = document.createElement("div")
    this.buttonCalc.className = "tinydoc_button_calc"
    this.buttonCalc.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 512.001 512.001'><path d='M403.432,0H108.57C86.583,0,68.695,17.887,68.695,39.874v432.253c0,21.987,17.887,39.874,39.874,39.874h294.862 c21.987,0,39.874-17.887,39.874-39.874V39.874C443.305,17.887,425.417,0,403.432,0z M424.297,472.127h-0.001 c0,11.505-9.36,20.865-20.865,20.865H108.57c-11.505,0-20.865-9.36-20.865-20.865V39.874c0-11.505,9.36-20.865,20.865-20.865 h294.862c11.505,0,20.865,9.36,20.865,20.865V472.127z'/><path d='M382.1,51.081H129.901c-5.25,0-9.504,4.255-9.504,9.504v82.322c0,5.249,4.254,9.504,9.504,9.504H382.1 c5.25,0,9.504-4.255,9.504-9.504V60.585C391.604,55.336,387.349,51.081,382.1,51.081z M372.596,133.403h-233.19V70.089h233.19 V133.403z'/><path d='M185.115,181.553h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214 c5.25,0,9.504-4.255,9.504-9.504v-59.335C194.62,185.809,190.366,181.553,185.115,181.553z M175.611,240.889h-36.205v-40.327 h36.205V240.889z'/><path d='M185.115,283.696h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214 c5.25,0,9.504-4.255,9.504-9.504v-59.335C194.62,287.952,190.366,283.696,185.115,283.696z M175.611,343.032h-36.205v-40.327 h36.205V343.032z'/><path d='M185.115,385.84h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214 c5.25,0,9.504-4.255,9.504-9.504v-59.335C194.62,390.095,190.366,385.84,185.115,385.84z M175.611,445.175h-36.205v-40.327h36.205 V445.175z'/><path d='M283.608,181.553h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214 c5.25,0,9.504-4.255,9.504-9.504v-59.335C293.112,185.809,288.857,181.553,283.608,181.553z M274.103,240.889h-36.205v-40.327 h36.205V240.889z'/><path d='M283.608,283.696h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214 c5.25,0,9.504-4.255,9.504-9.504v-59.335C293.112,287.952,288.857,283.696,283.608,283.696z M274.103,343.032h-36.205v-40.327 h36.205V343.032z'/><path d='M283.608,385.84h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214 c5.25,0,9.504-4.255,9.504-9.504v-59.335C293.112,390.095,288.857,385.84,283.608,385.84z M274.103,445.175h-36.205v-40.327 h36.205V445.175z'/><path d='M382.1,181.553h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504H382.1 c5.25,0,9.504-4.255,9.504-9.504v-59.335C391.604,185.809,387.349,181.553,382.1,181.553z M372.596,240.889H336.39v-40.327h36.205 V240.889z'/><path d='M382.1,283.696h-55.214c-5.25,0-9.504,4.255-9.504,9.504V454.68c0,5.249,4.254,9.504,9.504,9.504H382.1 c5.25,0,9.504-4.255,9.504-9.504V293.201C391.604,287.952,387.349,283.696,382.1,283.696z M372.596,445.175H336.39v-142.47h36.205 V445.175z'/></svg>"
    this.holder17.appendChild(this.buttonCalc)

    // ADDING A SEPARATOR
    this.separator8 = document.createElement("div")
    this.separator8.className = "tinydoc_separator"
    this.menu.appendChild(this.separator8)

    // ADDING THE REMOVE FORMAT BUTTON
    this.holder18 = document.createElement("div")
    this.holder18.className = "tinydoc_holder"
    this.menu.appendChild(this.holder18)
    this.buttonRemoveFormat = document.createElement("div")
    this.buttonRemoveFormat.className = "tinydoc_button_clear"
    this.buttonRemoveFormat.innerHTML =
      "<svg width='16' height='16' viewBox='0 0 1000 1000'><path d='M0 64h576v-128h-576v128zM192 960h704v-128h-704v128zM277 128l205 784l124 -32l-196 -752h-133zM930 -64l-130 130l-130 -130l-62 62l130 130l-130 130l62 62l130 -130l130 130l62 -62l-130 -130l130 -130z' transform='translate(0 915) scale(-0.97,0.97) rotate(180)'/></svg>"
    this.holder18.appendChild(this.buttonRemoveFormat)

    // ADDING A SEPARATOR
    this.separator9 = document.createElement("div")
    this.separator9.className = "tinydoc_separator"
    this.menu.appendChild(this.separator9)

    // ADDING THE CONTENT VIEWER
    this.holder19 = document.createElement("div")
    this.holder19.className = "tinydoc_holder"
    this.menu.appendChild(this.holder19)
    this.contentViewer = document.createElement("div")
    this.contentViewer.className = "tinydoc_contentviewer"
    this.holder19.appendChild(this.contentViewer)

    // ADDING THE PLEASE WAIT CONTAINER
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
    this.pleaseWait.addEventListener("mousedown", function (event) {
      event.preventDefault()
    })
    this.myContainer.appendChild(this.pleaseWait)

    // ADDING THE PLEASE WAIT ICON
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
      "url('data:image/gif;base64,R0lGODlhHwAfAPUAAP///wAAAOjo6NLS0ry8vK6urqKiotzc3Li4uJqamuTk5NjY2KqqqqCgoLCwsMzMzPb29qioqNTU1Obm5jY2NiYmJlBQUMTExHBwcJKSklZWVvr6+mhoaEZGRsbGxvj4+EhISDIyMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAHwAfAAAG/0CAcEgUDAgFA4BiwSQexKh0eEAkrldAZbvlOD5TqYKALWu5XIwnPFwwymY0GsRgAxrwuJwbCi8aAHlYZ3sVdwtRCm8JgVgODwoQAAIXGRpojQwKRGSDCRESYRsGHYZlBFR5AJt2a3kHQlZlERN2QxMRcAiTeaG2QxJ5RnAOv1EOcEdwUMZDD3BIcKzNq3BJcJLUABBwStrNBtjf3GUGBdLfCtadWMzUz6cDxN/IZQMCvdTBcAIAsli0jOHSJeSAqmlhNr0awo7RJ19TJORqdAXVEEVZyjyKtE3Bg3oZE2iK8oeiKkFZGiCaggelSTiA2LhxiZLBSjZjBL2siNBOFQ84LxHA+mYEiRJzBO7ZCQIAIfkECQoAAAAsAAAAAB8AHwAABv9AgHBIFAwIBQPAUCAMBMSodHhAJK5XAPaKOEynCsIWqx0nCIrvcMEwZ90JxkINaMATZXfju9jf82YAIQxRCm14Ww4PChAAEAoPDlsAFRUgHkRiZAkREmoSEXiVlRgfQgeBaXRpo6MOQlZbERN0Qx4drRUcAAJmnrVDBrkVDwNjr8BDGxq5Z2MPyUQZuRgFY6rRABe5FgZjjdm8uRTh2d5b4NkQY0zX5QpjTc/lD2NOx+WSW0++2RJmUGJhmZVsQqgtCE6lqpXGjBchmt50+hQKEAEiht5gUcTIESR9GhlgE9IH0BiTkxrMmWIHDkose9SwcQlHDsOIk9ygiVbl5JgMLuV4HUmypMkTOkEAACH5BAkKAAAALAAAAAAfAB8AAAb/QIBwSBQMCAUDwFAgDATEqHR4QCSuVwD2ijhMpwrCFqsdJwiK73DBMGfdCcZCDWjAE2V347vY3/NmdXNECm14Ww4PChAAEAoPDltlDGlDYmQJERJqEhGHWARUgZVqaWZeAFZbERN0QxOeWwgAAmabrkMSZkZjDrhRkVtHYw+/RA9jSGOkxgpjSWOMxkIQY0rT0wbR2LQV3t4UBcvcF9/eFpdYxdgZ5hUYA73YGxruCbVjt78G7hXFqlhY/fLQwR0HIQdGuUrTz5eQdIc0cfIEwByGD0MKvcGSaFGjR8GyeAPhIUofQGNQSgrB4IsdOCqx7FHDBiYcOQshYjKDxliVDpRjunCjdSTJkiZP6AQBACH5BAkKAAAALAAAAAAfAB8AAAb/QIBwSBQMCAUDwFAgDATEqHR4QCSuVwD2ijhMpwrCFqsdJwiK73DBMGfdCcZCDWjAE2V347vY3/NmdXNECm14Ww4PChAAEAoPDltlDGlDYmQJERJqEhGHWARUgZVqaWZeAFZbERN0QxOeWwgAAmabrkMSZkZjDrhRkVtHYw+/RA9jSGOkxgpjSWOMxkIQY0rT0wbR2I3WBcvczltNxNzIW0693MFYT7bTumNQqlisv7BjswAHo64egFdQAbj0RtOXDQY6VAAUakihN1gSLaJ1IYOGChgXXqEUpQ9ASRlDYhT0xQ4cACJDhqDD5mRKjCAYuArjBmVKDP9+VRljMyMHDwcfuBlBooSCBQwJiqkJAgAh+QQJCgAAACwAAAAAHwAfAAAG/0CAcEgUDAgFA8BQIAwExKh0eEAkrlcA9oo4TKcKwharHScIiu9wwTBn3QnGQg1owBNld+O72N/zZnVzRApteFsODwoQABAKDw5bZQxpQ2JkCRESahIRh1gEVIGVamlmXgBWWxETdEMTnlsIAAJmm65DEmZGYw64UZFbR2MPv0QPY0hjpMYKY0ljjMZCEGNK09MG0diN1gXL3M5bTcTcyFtOvdzBWE+207pjUKpYrL+wY7MAB4EerqZjUAG4lKVCBwMbvnT6dCXUkEIFK0jUkOECFEeQJF2hFKUPAIkgQwIaI+hLiJAoR27Zo4YBCJQgVW4cpMYDBpgVZKL59cEBhw+U+QROQ4bBAoUlTZ7QCQIAIfkECQoAAAAsAAAAAB8AHwAABv9AgHBIFAwIBQPAUCAMBMSodHhAJK5XAPaKOEynCsIWqx0nCIrvcMEwZ90JxkINaMATZXfju9jf82Z1c0QKbXhbDg8KEAAQCg8OW2UMaUNiZAkREmoSEYdYBFSBlWppZl4AVlsRE3RDE55bCAACZpuuQxJmRmMOuFGRW0djD79ED2NIY6TGCmNJY4zGQhBjStPTFBXb21DY1VsGFtzbF9gAzlsFGOQVGefIW2LtGhvYwVgDD+0V17+6Y6BwaNfBwy9YY2YBcMAPnStTY1B9YMdNiyZOngCFGuIBxDZAiRY1eoTvE6UoDEIAGrNSUoNBUuzAaYlljxo2M+HIeXiJpRsRNMaq+JSFCpsRJEqYOPH2JQgAIfkECQoAAAAsAAAAAB8AHwAABv9AgHBIFAwIBQPAUCAMBMSodHhAJK5XAPaKOEynCsIWqx0nCIrvcMEwZ90JxkINaMATZXfjywjlzX9jdXNEHiAVFX8ODwoQABAKDw5bZQxpQh8YiIhaERJqEhF4WwRDDpubAJdqaWZeAByoFR0edEMTolsIAA+yFUq2QxJmAgmyGhvBRJNbA5qoGcpED2MEFrIX0kMKYwUUslDaj2PA4soGY47iEOQFY6vS3FtNYw/m1KQDYw7mzFhPZj5JGzYGipUtESYowzVmF4ADgOCBCZTgFQAxZBJ4AiXqT6ltbUZhWdToUSR/Ii1FWbDnDkUyDQhJsQPn5ZU9atjUhCPHVhgTNy/RSKsiqKFFbUaQKGHiJNyXIAAh+QQJCgAAACwAAAAAHwAfAAAG/0CAcEh8JDAWCsBQIAwExKhU+HFwKlgsIMHlIg7TqQeTLW+7XYIiPGSAymY0mrFgA0LwuLzbCC/6eVlnewkADXVECgxcAGUaGRdQEAoPDmhnDGtDBJcVHQYbYRIRhWgEQwd7AB52AGt7YAAIchETrUITpGgIAAJ7ErdDEnsCA3IOwUSWaAOcaA/JQ0amBXKa0QpyBQZyENFCEHIG39HcaN7f4WhM1uTZaE1y0N/TacZoyN/LXU+/0cNyoMxCUytYLjm8AKSS46rVKzmxADhjlCACMFGkBiU4NUQRxS4OHijwNqnSJS6ZovzRyJAQo0NhGrgs5bIPmwWLCLHsQsfhxBWTe9QkOzCwC8sv5Ho127akyRM7QQAAOwAAAAAAAAAAAA==') no-repeat center"
    this.pleaseWaitIcon.addEventListener("mousedown", function (event) {
      event.preventDefault()
    })
    this.myContainer.appendChild(this.pleaseWaitIcon)

    // ADDING THE EDITABLE DOCUMENT
    this.document = document.createElement("div")
    this.document.className = "tinydoc_document"
    this.document.contentEditable = true

    // CHECKING IF THE SPELLCHECKER IS ENABLED
    if (this.spellcheckerEnabled) {
      // DISABLING THE BROWSER SPELLCHECKER FOR THE DOCUMENT
      this.document.spellcheck = false
    }

    // ADDING THE DOCUMENT TO THE CONTAINER
    this.myContainer.appendChild(this.document)

    // CHECKING IF THERE IS A DEFAULT DOCUMENT TEXT
    if (editorConfig.documentText) {
      // SETTING THE DOCUMENT TEXT
      this.document.innerHTML = editorConfig.documentText
    } else {
      // SETTING AN EMPTY DOCUMENT TEXT
      this.document.innerHTML = "<div></div>"
    }

    // SETTING THE CURRENT INSTANCE FOR LATER USE
    var thisTinyDOC = this

    // CREATING A VARIABLE TO STORE THE SPELLCHECKER RESULT
    this.spellcheckerResult = []

    // CREATING A VARIABLE TO SET THAT THE SPELLCHECKER STATUS
    this.spellcheckerWorking = false

    // CREATING A VARIABLE TO SET THAT THE SPELLCHECKER WAS EXECUTED
    this.spellcheckerExecuted = false

    // CREATING A VARIABLE TO SET THE SPELLCHECKER WEB WORKER
    this.myWorker = null

    // SETTING A VARIABLE TO KNOW IF THE DOCUMENT CAN UNDO/REDO
    this.canUndoRedo = true

    // SETTING AN UNDO SAVE TIMEOUT VARIABLE TO PREVENT MULTI SAVE UNDO WHILE TYPING
    this.undoSaveTimeout = null

    // SETTING A VARIABLE TO HANDLE THE KEY ENTER WHEN PRESSED
    this.keyEnterPressed = false

    // SETTING A VARIABLE TO HANDLE WHEN A THE NEW TEXT IS SET
    this.settingNewText = false

    // ADDING A REGEX FOR CHECKING IF THE USER IS USING SAFARI
    this.isUsingSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    // ADDING A REGEX FOR CHECKING IF THE USER IS USING CHROME
    this.isUsingChrome = /.*chrome/i.test(navigator.userAgent)

    // ADDING A VALIDATION FOR CHECKING IF THE USER IS USING A MOBILE DEVICE
    this.isMobileDevice = !!(
      window.navigator.userAgent.match(/Android/i) ||
      window.navigator.userAgent.match(/webOS/i) ||
      window.navigator.userAgent.match(/iPhone/i) ||
      window.navigator.userAgent.match(/iPad/i) ||
      window.navigator.userAgent.match(/iPod/i) ||
      window.navigator.userAgent.match(/BlackBerry/i) ||
      window.navigator.userAgent.match(/Windows Phone/i)
    )

    // CHECKING IF THERE IS A SAVE FUNCTION
    if (this.saveFunction) {
      // SETTING WHAT WILL HAPPEN WHEN THE USER CLICKS ON THE SAVE BUTTON
      this.buttonSave.addEventListener("mousedown", function (event) {
        thisTinyDOC.save()
        event.preventDefault()
      })
    }

    // CHECKING IF THE SPELLCHECKER IS ENABLED
    if (this.spellcheckerEnabled) {
      // SETTING WHAT WILL HAPPEN WHEN THE USER CLICKS ON THE SPELLCHECKER BUTTON
      this.buttonSpellcheck.addEventListener("mousedown", function (event) {
        thisTinyDOC.spellcheck()
        event.preventDefault()
      })
    }

    // SETTING WHAT WILL HAPPEN WHEN THE USER CLICKS ON A MENU BUTTON
    this.buttonPrint.addEventListener("mousedown", function (event) {
      thisTinyDOC.print()
      event.preventDefault()
    })
    this.buttonUndo.addEventListener("mousedown", function (event) {
      thisTinyDOC.formatDoc("undo", null)
      event.preventDefault()
    })
    this.buttonRedo.addEventListener("mousedown", function (event) {
      thisTinyDOC.formatDoc("redo", null)
      event.preventDefault()
    })
    this.buttonBold.addEventListener("mousedown", function (event) {
      thisTinyDOC.formatDoc("bold", null)
      event.preventDefault()
    })
    this.buttonItalic.addEventListener("mousedown", function (event) {
      thisTinyDOC.formatDoc("italic", null)
      event.preventDefault()
    })
    this.buttonUnderline.addEventListener("mousedown", function (event) {
      thisTinyDOC.formatDoc("underline", null)
      event.preventDefault()
    })
    this.buttonStrikethrough.addEventListener("mousedown", function (event) {
      thisTinyDOC.formatDoc("strikethrough", null)
      event.preventDefault()
    })
    this.buttonDotted.addEventListener("mousedown", function (event) {
      thisTinyDOC.formatDoc("insertunorderedlist", null)
      event.preventDefault()
    })
    this.buttonNumbered.addEventListener("mousedown", function (event) {
      thisTinyDOC.formatDoc("insertorderedlist", null)
      event.preventDefault()
    })
    this.buttonHighlight.addEventListener("mousedown", function (event) {
      thisTinyDOC.formatDoc("BackColor", "#FFFF00")
      event.preventDefault()
    })
    this.buttonLink.addEventListener("mousedown", function (event) {
      thisTinyDOC.insertLink()
      event.preventDefault()
    })
    this.buttonCalc.addEventListener("mousedown", function (event) {
      thisTinyDOC.insertCalc()
      event.preventDefault()
    })
    this.buttonRemoveFormat.addEventListener("mousedown", function (event) {
      thisTinyDOC.formatDoc("removeFormat", null)
      event.preventDefault()
    })

    // CHECKING IF THERE IS A TEMPLATE 1
    if (editorConfig.template1) {
      // ADDING THE TEMPLATE 1 BUTTON
      this.buttonTemplate1.addEventListener("mousedown", function (event) {
        thisTinyDOC.insertHtmlAtCaret(thisTinyDOC.template1, false)
        event.preventDefault()
      })
    }

    // CHECKING IF THERE IS A TEMPLATE 2
    if (editorConfig.template2) {
      // ADDING THE TEMPLATE 2 BUTTON
      this.buttonTemplate2.addEventListener("mousedown", function (event) {
        thisTinyDOC.insertHtmlAtCaret(thisTinyDOC.template2, false)
        event.preventDefault()
      })
    }

    // CHECKING IF THERE IS A TEMPLATE 3
    if (editorConfig.template3) {
      // ADDING THE TEMPLATE 3 BUTTON
      this.buttonTemplate3.addEventListener("mousedown", function (event) {
        thisTinyDOC.insertHtmlAtCaret(thisTinyDOC.template3, false)
        event.preventDefault()
      })
    }

    // SETTING WHAT WILL HAPPEN WHEN THE USER IS CLICKING
    this.document.addEventListener("mousedown", function (event) {
      try {
        // CHECKING IF THE DOCUMENT IS DISABLED
        if (!thisTinyDOC.documentEnabled) {
          // PREVENTING ANY SELECTION TO BE MADE
          event.preventDefault()
        }
      } catch (err) {
        //
      }
    })

    // SETTING WHAT WILL HAPPEN WHEN THE USER IS TYPING
    this.document.addEventListener("keydown", function (event) {
      try {
        // CHECKING IF THE DOCUMENT IS DISABLED
        if (!thisTinyDOC.documentEnabled) {
          // PREVENTING ANY INPUT
          event.preventDefault()
        } else {
          //CODE FOR ADDING SPACES (TABS) WHEN THE TAB KEY IS DOWN
          if (event.keyCode === 9) {
            // CANCELING THE TAB KEY EVENT
            event.preventDefault()

            // INSERTING SPACES AS A TAB SPACE
            thisTinyDOC.insertHtmlAtCaret(
              "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
              false
            )

            // FOCUSING THE DOCUMENT AFTER 100 MS
            setTimeout(function () {
              thisTinyDOC.document.focus()
            }, 100)
          } else if (event.keyCode === 13) {
            // HANDLING THE BREAKLINE EVENT
            thisTinyDOC.handleBreakline(event)
          } else if (
            (event.ctrlKey || event.metaKey) &&
            String.fromCharCode(event.which).toLowerCase() === "s"
          ) {
            // CHECKING IF THERE IS A SAVE FUNCTION
            if (thisTinyDOC.saveFunction) {
              // CANCELING THE SAVING PAGE KEY EVENT
              event.preventDefault()

              // SAVING THE DOCUMENT
              thisTinyDOC.save()
            }
          } else if (
            (event.ctrlKey || event.metaKey) &&
            !event.shiftKey &&
            String.fromCharCode(event.which).toLowerCase() === "z"
          ) {
            // CANCELING THE NATIVE UNDO EVENT
            event.preventDefault()

            // REGISTERING THE UNDO EVENT
            thisTinyDOC.undo(true)
          } else if (
            event.shiftKey &&
            event.metaKey &&
            String.fromCharCode(event.which).toLowerCase() === "z"
          ) {
            // CANCELING THE NATIVE REDO EVENT
            event.preventDefault()

            // REGISTERING THE REDO EVENT
            thisTinyDOC.redo(true)
          } else if (
            event.ctrlKey &&
            event.shiftKey &&
            String.fromCharCode(event.which).toLowerCase() === "z"
          ) {
            // CANCELING THE NATIVE UNDO EVENT
            event.preventDefault()

            // REGISTERING THE UNDO EVENT
            thisTinyDOC.undo(true)
          } else if (
            event.ctrlKey &&
            String.fromCharCode(event.which).toLowerCase() === "y"
          ) {
            // CANCELING THE NATIVE REDO EVENT
            event.preventDefault()

            // REGISTERING THE REDO EVENT
            thisTinyDOC.redo(true)
          }
        }
      } catch (err) {
        //
      }
    })

    // SETTING WHAT WILL HAPPEN WHEN THE USER IS TYPING
    this.document.addEventListener("keyup", function (event) {
      // CHECKING IF THE DOCUMENT IS DISABLED
      if (!thisTinyDOC.documentEnabled) {
        // PREVENTING ANY INPUT
        event.preventDefault()
      } else if (
        (event.ctrlKey || event.metaKey) &&
        !event.shiftKey &&
        String.fromCharCode(event.which).toLowerCase() === "z"
      ) {
        // CANCELING THE NATIVE UNDO EVENT
        event.preventDefault()
      } else if (
        event.shiftKey &&
        event.metaKey &&
        String.fromCharCode(event.which).toLowerCase() === "z"
      ) {
        // CANCELING THE NATIVE REDO EVENT
        event.preventDefault()
      } else if (
        event.ctrlKey &&
        event.shiftKey &&
        String.fromCharCode(event.which).toLowerCase() === "z"
      ) {
        // CANCELING THE NATIVE UNDO EVENT
        event.preventDefault()
      } else if (
        event.ctrlKey &&
        String.fromCharCode(event.which).toLowerCase() === "y"
      ) {
        // CANCELING THE NATIVE REDO EVENT
        event.preventDefault()
      } else {
        // CHECKING FOR ANY URL OR MISSPELLED WORD AT THE CURRENT CARET POSITION
        thisTinyDOC.checkForURL()
        thisTinyDOC.checkForMisspelled()

        // CHECKING IF THERE IS A PREVIOUS UNDO SAVE TIMEOUT
        if (thisTinyDOC.undoSaveTimeout !== null) {
          // CLEARING THE PREVIOUS UNDO SAVE TIMEOUT
          clearTimeout(thisTinyDOC.undoSaveTimeout)
        }

        // WAITING 100 MS FOR THE UI TO BE UPDATED
        thisTinyDOC.undoSaveTimeout = setTimeout(function () {
          // REGISTERING THE UNDO EVENT
          thisTinyDOC.saveUndo()
        }, 100)
      }
    })

    // SETTING WHAT WILL HAPPEN WHEN THE USER IS CLICKING
    this.document.addEventListener("click", function (event) {
      // CHECKING IF THE DOCUMENT IS DISABLED
      if (!thisTinyDOC.documentEnabled) {
        // PREVENTING ANY INPUT
        event.preventDefault()
      } else {
        // CHECKING FOR ANY URL OR MISSPELLED WORD AT THE CURRENT CARET POSITION
        thisTinyDOC.checkForURL()
        thisTinyDOC.checkForMisspelled()
      }
    })

    // SETTING WHAT WILL HAPPEN WHEN THE USER IS RIGHT CLICKING
    this.document.addEventListener("contextmenu", function (event) {
      // CHECKING IF THE DOCUMENT IS DISABLED
      if (!thisTinyDOC.documentEnabled) {
        // PREVENTING ANY INPUT
        event.preventDefault()
      } else {
        // CHECKING FOR ANY URL OR MISSPELLED WORD AT THE CURRENT CARET POSITION
        thisTinyDOC.checkForURL()
        thisTinyDOC.checkForMisspelled()
      }
    })

    // SETTING WHAT WILL HAPPEN WHEN THE USER PASTE A TEXT
    this.document.addEventListener("paste", function (event) {
      try {
        // CANCELING THE PASTE EVENT
        event.preventDefault()

        // GETTING THE CLIPBOARD CONTENT AS PLAIN TEXT
        var text = (event.originalEvent || event).clipboardData.getData("text/plain")

        // REPLACING SPECIAL CHARACTERS
        text = text.replace(/&/gm, "&amp;")
        text = text.replace(/</gm, "&lt;")
        text = text.replace(/>/gm, "&gt;")
        text = text.replace(/  /gm, "&nbsp;&nbsp;")
        text = text.replace(/\n/gm, "<br />")

        // FOCUSING THE DOCUMENT
        thisTinyDOC.document.focus()

        // PASTING THE PLAIN TEXT
        thisTinyDOC.insertHtmlAtCaret(text, false)
      } catch (err) {
        //
      }
    })

    // SETTING WHAT WILL HAPPEN WHEN THERE IS AN INPUT IN THE DOCUMENT
    this.document.addEventListener("input", function () {
      // SETTING THE DOCUMENT AS DIRTY
      window.onbeforeunload = function () {
        return "Dirty"
      }
    })

    // CLEARING THE DOCUMENT UNDO/REDO HISTORY
    this.clearUndoRedo()

    // FORCING AN INITIAL RESIZE
    this.resize()

    // SCROLLING TO THE TOP OF THE DOCUMENT
    this.scrollToTop()
  }

  new() {
    try {
      try {
        // LOOPING EVERY DOCUMENT CHILD
        while (this.document.firstChild) {
          // REMOVING EVERY CHILD
          this.document.removeChild(this.document.firstChild)
        }
      } catch (err) {
        //
      }

      // SETTING THE DOCUMENT AS CLEAN
      window.onbeforeunload = null

      // CLEARING THE DOCUMENT UNDO/REDO HISTORY
      this.clearUndoRedo()

      // TRYING TO MOVE THE CURSOR TO THE BEGINNING OF THE DOCUMENT
      this.setCaretPosition(this.document, 0)

      // SCROLLING TO THE TOP OF THE DOCUMENT
      this.scrollToTop()

      // FOCUSING THE DOCUMENT
      this.focus()
    } catch (err) {
      //
    }
  }

  save() {
    try {
      // CHECKING THAT THE SPELLCHECKER IS NOT WORKING
      if (!this.spellcheckerWorking) {
        // EXECUTING THE SAVE FUNCTION
        this.saveFunction()
      }
    } catch (err) {
      //
    }
  }

  resize() {
    try {
      // RESIZING THE DOCUMENT WHEN THE SCREEN SIZE CHANGES
      this.document.style.width = this.myContainer.offsetWidth - 16 + "px"
      this.document.style.height = this.myContainer.offsetHeight - 57 + "px"

      // RESIZING THE PLEASE WAIT CONTAINER
      this.pleaseWait.style.left = this.myContainer.offsetLeft + "px"
      this.pleaseWait.style.right = this.myContainer.offsetRight + "px"
      this.pleaseWait.style.top = this.myContainer.offsetTop + "px"
      this.pleaseWait.style.bottom = this.myContainer.offsetBottom + "px"
      this.pleaseWait.style.width = this.myContainer.offsetWidth + "px"
      this.pleaseWait.style.height = this.myContainer.offsetHeight + "px"

      // RESIZING THE PLEASE WAIT ICON CONTAINER
      this.pleaseWaitIcon.style.left = this.myContainer.offsetLeft + "px"
      this.pleaseWaitIcon.style.right = this.myContainer.offsetRight + "px"
      this.pleaseWaitIcon.style.top = this.myContainer.offsetTop + "px"
      this.pleaseWaitIcon.style.bottom = this.myContainer.offsetBottom + "px"
      this.pleaseWaitIcon.style.width = this.myContainer.offsetWidth + "px"
      this.pleaseWaitIcon.style.height = this.myContainer.offsetHeight + "px"

      // RESIZING THE DOCUMENT AFTER 100 MS
      setTimeout(function () {
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
      // SCROLLING TO THE TOP OF THE DOCUMENT
      this.document.scrollTop = 0
    } catch (err) {
      //
    }
  }

  // https://stackoverflow.com/questions/47361276/javascript-scroll-to-cursor-post-a-paste-in-contenteditable-div
  scrollToCaret() {
    try {
      // SAVING THE CURRENT SELECTION
      var currentSelection = this.saveSelection(this.document)

      // GETTING THE CARET Y POSITION
      var caretPositionY = this.getCaretY() - this.document.offsetTop + 16

      // CHECKING IF THE CARET IS WITHIN THE VISIBLE CONTENT
      if (caretPositionY < 0 || caretPositionY > this.document.offsetHeight) {
        // GETTING THE CURRENT SELECTION
        var selection = window.getSelection()

        // CHECKING IF THERE ARE SELECTION RANGES
        if (!selection.rangeCount) {
          return
        }

        // GETTING THE FIRST SELECTION RANGE. THERE'S ALMOST NEVER CAN BE MORE (INSTEAD OF FIREFOX)
        var firstRange = selection.getRangeAt(0)

        // SOMETIMES IF THE EDITABLE ELEMENT IS GETTING REMOVED FROM THE DOM YOU MAY GET A HIERARCHYREQUEST ERROR IN SAFARI
        if (firstRange.commonAncestorContainer === document) {
          return
        }

        // CREATING AN EMPTY BR THAT WILL BE USED AS AN ANCHOR FOR SCROLL, BECAUSE IT'S IMPOSIBLE TO DO IT WITH JUST TEXT NODES
        var tempAnchorEl = document.createElement("br")

        // ADDING A BREAKLINE AFTER THE CARET POSITION
        firstRange.insertNode(tempAnchorEl)

        // CHECKING WHERE TO SCROLL TO
        if (caretPositionY < 0) {
          // SCROLLING TO THE BR AND TRYING TO SHOW IT AS THE FIRST LINE
          tempAnchorEl.scrollIntoView({ block: "start" })
        } else {
          // SCROLLING TO THE BR AND TRYING TO SHOW IT AS THE LAST LINE
          tempAnchorEl.scrollIntoView({ block: "end" })
        }

        // REMOVING THE ANCHOR BECAUSE IT'S NOT NEEDED ANYMORE
        tempAnchorEl.remove()
      }

      // CHECKING IF THERE IS SOMETHING TO SELECT
      if (currentSelection.start !== currentSelection.end) {
        // RESTORING THE SELECTION
        this.restoreSelection(this.document, currentSelection)
      }
    } catch (err) {
      //
    }
  }

  // https://stackoverflow.com/questions/6846230/coordinates-of-selected-text-in-browser-page
  getCaretY() {
    try {
      var sel = document.selection
      var range
      var rect
      var x = 0
      var y = 0

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

          // FALLING BACK TO INSERTING A TEMPORARY ELEMENT
          if (x === 0 && y === 0) {
            var span = document.createElement("span")
            if (span.getClientRects) {
              // ENSURING SPAN HAS DIMENSIONS AND POSITION BY ADDING A ZERO-WIDTH SPACE CHARACTER
              span.appendChild(document.createTextNode("\u200b"))
              range.insertNode(span)
              rect = span.getClientRects()[0]
              x = rect.left
              y = rect.top

              var spanParent = span.parentNode
              spanParent.removeChild(span)

              // GLUING ANY BROKEN TEXT NODES BACK TOGETHER
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
      // CHECKING IF THERE IS A WORKER CREATED
      if (this.myWorker !== null) {
        // TERMINATING THE WORKER
        this.myWorker.terminate()
      }

      // CLEARING THE DOCUMENT
      this.new()

      // SETTING THAT A NEW TEXT WILL BE INSERTED
      this.settingNewText = true

      // SETTING THE DOCUMENT TEXT
      this.insertHtmlAtCaret(myText, false)

      // SETTING THE DOCUMENT AS CLEAN
      window.onbeforeunload = null

      // CLEARING THE DOCUMENT UNDO/REDO HISTORY
      this.clearUndoRedo()

      // CLEARING THE SPELLCHECKER RESULT
      this.spellcheckerResult = []

      // CHECKING IF THE SPELLCHECKER IS WORKING
      if (this.spellcheckerWorking) {
        // ENABLING THE DOCUMENT
        this.enable()
      }

      // SETTING THAT THE SPELLCHECKER IS NOT WORKING
      this.spellcheckerWorking = false

      // SETTING THAT THE SPELLCHECKER WAS NOT EXECUTED
      this.spellcheckerExecuted = false

      // HIDING THE PLEASE WAIT ANIMATION
      this.showPleaseWait(false)

      // RESTORING THE SPELLCHECK BUTTON STYLE
      this.buttonSpellcheck.className = "tinydoc_button_spellcheck"

      // SETTING THE CURRENT INSTANCE FOR LATER USE
      var thisTinyDOC = this

      // WAITING 25 MS FOR THE UI TO BE UPDATED
      setTimeout(function () {
        // MOVING THE CARET TO THE FIRST CHARACTER
        thisTinyDOC.setCaretPosition(thisTinyDOC.document, 0)
      }, 25)
    } catch (err) {
      //
    }
  }

  getText(mustEncode) {
    // GETTING THE DOCUMENT INNERHTML CONTENT
    var originalHTML = this.document.innerHTML

    // CLEARING THE MISSPELLED TAGS
    originalHTML = originalHTML.replace(/<misspelled>/gm, "")
    originalHTML = originalHTML.replace(/<\/misspelled>/gm, "")

    // CHECKING IF THE INNERHTML MUST BE ENCODED
    if (mustEncode) {
      // RETURNING THE ENCODED INNERHTML
      return this.encodeText(originalHTML)
    } else {
      // RETURNING THE INNERHTML
      return originalHTML
    }
  }

  encodeText(str) {
    // FUNCTION FOR ESCAPING SPECIAL CHARACTERS
    var i = str.length
    var aRet = []
    while (i--) {
      var tempChar = str[i].charCodeAt()
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
    // SETTING THAT THE DOCUMENT IS ENABLED
    this.documentEnabled = true

    // SHOWING THE CARET
    this.document.style.caretColor = "black"
  }

  disable() {
    // SETTING THAT THE DOCUMENT IS DISABLED
    this.documentEnabled = false

    // HIDING THE CARET
    this.document.style.caretColor = "transparent"
  }

  showPleaseWait(mustShow) {
    // CHECKING IF THE PLEASE WAIT SCREEN MUST BE DISPLAYED
    if (mustShow) {
      // DISPLAYING THE PLEASE WAIT SCREEN
      this.pleaseWait.style.display = "block"
      this.pleaseWaitIcon.style.display = "block"
    } else {
      // HIDING THE PLEASE WAIT SCREEN
      this.pleaseWait.style.display = "none"
      this.pleaseWaitIcon.style.display = "none"
    }
  }

  focus() {
    try {
      // FOCUSING THE DOCUMENT
      this.document.focus()

      // SETTING THE CURRENT INSTANCE FOR LATER USE
      var thisTinyDOC = this

      // FOCUSING THE DOCUMENT AFTER 100 MS
      setTimeout(function () {
        thisTinyDOC.document.focus()
      }, 100)
    } catch (err) {
      //
    }
  }

  formatDoc(myCommand, myParameter) {
    try {
      // FOCUSING THE DOCUMENT
      this.document.focus()

      // CHECKING THAT THE SPELLCHECKER IS NOT WORKING
      if (!this.spellcheckerWorking) {
        // CHECKING ALL THE POSSIBLE COMMANDS
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

      // SETTING THE CURRENT INSTANCE FOR LATER USE
      var thisTinyDOC = this

      // FOCUSING THE DOCUMENT AFTER 100 MS
      setTimeout(function () {
        thisTinyDOC.document.focus()
      }, 100)
    } catch (err) {
      //
    }
  }

  formatStyle(myTag, myParameter) {
    try {
      // GETTING THE CURRENT SELECTION
      var currentSelection = this.saveSelection(this.document)

      // PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
      if (!this.isDocumentSelected()) {
        return
      }

      // PREVENTING STYLING OF MULTIPLE LIST ITEMS
      if (
        (this.getParentTag("LI") !== null ||
          this.getParentTag("UL") !== null ||
          this.getParentTag("OL") !== null) &&
        window.getSelection().toString().indexOf("\n") > -1
      ) {
        // SETTING THE CURRENT INSTANCE FOR LATER USE
        var thisTinyDOC = this

        // WAITING 25 MS FOR THE UI TO BE UPDATED
        setTimeout(function () {
          // RESTORING THE SELECTION
          thisTinyDOC.restoreSelection(thisTinyDOC.document, currentSelection)

          // CHECKING IF THE USER IS USING CHROME OR SAFARI
          if (thisTinyDOC.isUsingChrome || thisTinyDOC.isUsingSafari) {
            // CHECKING IF THE SELECTED TEXT HAS NO BREAKLINES (NOT SELECTING MULTIPLE LIST ITEMS)
            if (window.getSelection().toString().indexOf("\n") === -1) {
              // EXECUTING THE FORMAT STYLE
              thisTinyDOC.formatStyleExecute(myTag, myParameter)
            }
          }
        }, 25)

        // NO POINT GOING ANY FURTHER
        return
      }

      // EXECUTING THE FORMAT STYLE
      this.formatStyleExecute(myTag, myParameter)
    } catch (err) {
      //
    }
  }

  formatStyleExecute(myTag, myParameter) {
    try {
      // REGISTERING THE UNDO EVENT
      this.saveUndo()

      // GETTING THE CURRENT SELECTION
      var selection = window.getSelection()
      var range = selection.getRangeAt(0)

      // GETTING THE SELECTED CONTENT
      var selectedContent = range.extractContents()

      // CREATING THE NEW TAG
      var newTag = document.createElement(myTag)

      // ADDING THE SELECTED CONTENT TO THE NEW TAG
      newTag.appendChild(selectedContent)

      // CHECKING IF IT IS A SPAN ELEMENT (IN THIS PROJECT, USED FOR HIGHLIGHT)
      if (myTag === "span") {
        // SETTING THE BACKGROUND COLOR
        newTag.style.backgroundColor = myParameter
        newTag.style.boxShadow = "inset 0 0 0 1000px " + myParameter
      }

      // DELETING THE SELECTED CONTENT
      range.deleteContents()

      // INSERTING THE NEW TAG
      range.insertNode(newTag)

      // SETTING THE CURRENT INSTANCE FOR LATER USE
      var thisTinyDOC = this

      // WAITING 25 MS FOR THE UI TO BE UPDATED
      setTimeout(function () {
        // MAINTAINING THE INITIAL SELECTION
        range = range.cloneRange()
        range.setStartBefore(newTag)
        selection.removeAllRanges()
        selection.addRange(range)

        // REGISTERING THE UNDO EVENT
        thisTinyDOC.saveUndo()

        // SETTING THE DOCUMENT AS DIRTY
        window.onbeforeunload = function () {
          return "Dirty"
        }
      }, 25)
    } catch (err) {
      //
    }
  }

  formatList(tag1, tag2) {
    try {
      // PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
      if (!this.isDocumentSelected()) {
        return
      }

      // PREVENTING NESTED LISTS
      if (
        this.getParentTag("LI") === null &&
        this.getParentTag("UL") === null &&
        this.getParentTag("OL") === null
      ) {
        // GETTING THE SELECTED TEXT
        var selectedText = window.getSelection().toString()

        // CHECKING IF THERE IS NO SELECTION
        if (selectedText === "") {
          // ADDING A BREAKLINE TO THE ITEM TAG (FOR MOVING THROUGH THE EMPTY LIST USING THE KEYS)
          selectedText = "<br />"
        }

        // INSERTING THE LIST
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
      // GETTING THE SELECTED RANGE
      var range = window.getSelection().getRangeAt(0)

      // GETTING THE CURRENT FOCUS NODE
      var upperNode = range.startContainer

      // LOOPING ALL THE PARENT NODES
      while (upperNode.parentNode !== this.document) {
        // GETTING THE PARENT NODE
        upperNode = upperNode.parentNode

        // CHECKING IF THE PARENT NODE IS THE REQUESTED ONE
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
    var currentNode = null

    try {
      // GETTING THE SELECTED RANGE
      var range = window.getSelection().getRangeAt(0)

      // GETTING THE CURRENT FOCUS NODE
      currentNode = range.startContainer
    } catch (err) {
      //
    }

    return currentNode
  }

  // https://stackoverflow.com/questions/16736680/get-caret-index-in-contenteditable-div-including-tags
  getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0
    try {
      var range = window.getSelection().getRangeAt(0)
      var preCaretRange = range.cloneRange()
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
      // SEARCHING FOR THE REQUIRED TAGS
      var tagLI = this.getParentTag("LI")
      var tagUL = this.getParentTag("UL")
      var tagOL = this.getParentTag("OL")

      // CHECKING IF THE CARET IS IN A LIST
      if (tagLI === null && (tagUL !== null || tagOL !== null)) {
        // CANCELING THE ENTER KEY EVENT
        event.preventDefault()

        // GETTING THE INITIAL NODE
        var initialNode = window.getSelection().focusNode

        // GETTING THE CURRENT FOCUS NODE
        var upperNode = window.getSelection().focusNode

        // CREATING A VARIABLE TO KNOW IF A LIST NODE WAS FOUND
        var listNode = null

        // LOOPING ALL THE PARENT NODES
        while (upperNode.parentNode) {
          // GETTING THE PARENT NODE
          upperNode = upperNode.parentNode

          // CHECKING IF THE ELEMENT IS A LIST TYPE
          if (upperNode.nodeName === "UL" || upperNode.nodeName === "OL") {
            // SETTING THAT THERE IS A LIST AS A PARENT NODE
            listNode = upperNode
          }
        }

        // CHECKING IF THERE IS A LIST AS A PARENT NODE
        if (listNode !== null) {
          // CHECKING IF THE CARET IS AT THE LAST ITEM OF THE LIST
          if (listNode.lastChild === initialNode) {
            // CHECKING IF THE BREAKLINE WASN'T HANDLED WITHIN A LINK TAG
            if (!this.handleBreaklineInLink()) {
              // ADDING A BREAKLINE AFTER THE LIST NODE
              this.addBreakLineAfter(listNode)
            }
          }
        }
      }

      // CHECKING IF THE CARET IS NOT IN A LIST
      else if (tagLI === null) {
        // CANCELING THE ENTER KEY EVENT
        event.preventDefault()

        // CHECKING IF THE BREAKLINE WASN'T HANDLED WITHIN A LINK TAG
        if (!this.handleBreaklineInLink()) {
          // SETTING THAT KEY ENTER WAS PRESSED
          this.keyEnterPressed = true

          // INSERTING THE BREAKLINE
          this.insertHtmlAtCaret("<br />", false)
        }
      }
    } catch (err) {
      //
    }
  }

  handleBreaklineInLink() {
    try {
      // SEARCHING FOR A LINK TAG
      var linkTag = this.getParentTag("A")

      // CHECKING IF A LINK TAG WAS FOUND
      if (linkTag !== null) {
        // CHECKING IF THE CARET IS AT THE LAST POSITION OF THE LINK TAG
        if (this.getCaretCharacterOffsetWithin(linkTag) === linkTag.text.length) {
          // ADDING A BREAKLINE AFTER THE LINK TAG
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
      // REGISTERING THE UNDO EVENT
      this.saveUndo()

      // CREATING A BREAKLINE
      var tempAnchorEl = document.createElement("br")

      // ADDING THE BREAKLINE AFTER THE LIST
      currentNode.parentNode.insertBefore(tempAnchorEl, currentNode.nextSibling)

      // SETTING THAT THE CARET MUST BE PLACED BEFORE THE INSERTED NODE
      var startBefore = true

      // CHECKING IF THE CURRENT NODE IS NOT A LIST
      if (currentNode.nodeName !== "UL" && currentNode.nodeName !== "OL") {
        // SETTING THAT THE CARET MUST BE PLACED AFTER THE INSERTED NODE
        startBefore = false
      }

      // SETTING THE CURRENT INSTANCE FOR LATER USE
      var thisTinyDOC = this

      // WAITING 25 MS FOR THE UI TO BE UPDATED
      setTimeout(function () {
        // MOVING THE CARET TO THE BREAKLINE
        var range = document.createRange()
        range.selectNodeContents(tempAnchorEl)
        if (startBefore) {
          range.setStartBefore(tempAnchorEl)
        } else {
          range.setStartAfter(tempAnchorEl)
        }
        range.collapse(true)
        var sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)

        // REGISTERING THE UNDO EVENT
        thisTinyDOC.saveUndo()
      }, 25)
    } catch (err) {
      //
    }
  }

  isDocumentSelected() {
    try {
      // CREATING A VARIABLE TO CHECK IF THE DOCUMENT WAS FOUND
      var docFound = false

      // GETTING THR CURRENT FOCUS NODE
      var upperNode = window.getSelection().focusNode

      // CHECKING IF THAT NODE IS THE ONE THAT NEEDS TO BE FOUND
      if (upperNode === this.document) {
        // SETTING THAT THE DOCUMENT WAS FOUND
        docFound = true
      }

      // LOOPING ALL THE PARENT NODES
      while (upperNode.parentNode) {
        // GETTING THE PARENT NODE
        upperNode = upperNode.parentNode

        // CHECKING IF THAT NODE IS THE ONE THAT NEEDS TO BE FOUND
        if (upperNode === this.document) {
          // SETTING THAT THE DOCUMENT WAS FOUND
          docFound = true
        }
      }

      // SETTING THE CURRENT INSTANCE FOR LATER USE
      var thisTinyDOC = this

      // FOCUSING THE DOCUMENT AFTER 100 MS
      setTimeout(function () {
        thisTinyDOC.document.focus()
      }, 100)

      // RETURNNING THAT THE DOCUMENT FOUND RESULT
      return docFound
    } catch (err) {
      // SETTING THE CURRENT INSTANCE FOR LATER USE
      var thisTinyDOC = this

      // FOCUSING THE DOCUMENT AFTER 100 MS
      setTimeout(function () {
        thisTinyDOC.document.focus()
      }, 100)

      // RETURN THAT THE DOCUMENT WAS NOT FOUND
      return false
    }
  }

  removeFormat() {
    try {
      // CHECKING IF THERE IS ANY SELECTED TEXT
      if (window.getSelection().toString()) {
        // GETTING THE SELECTED TEXT
        var plainText = window.getSelection().toString()

        // REPLACING SPECIAL CHARACTERS
        plainText = plainText.replace(/&/gm, "&amp;")
        plainText = plainText.replace(/</gm, "&lt;")
        plainText = plainText.replace(/>/gm, "&gt;")
        plainText = plainText.replace(/  /gm, "&nbsp;&nbsp;")
        plainText = plainText.replace(/\n/gm, "<br />")

        try {
          // GETTING THE SELECTED RANGE
          var range = window.getSelection().getRangeAt(0)

          // CHECKING IF AN ENTIRE TAG WAS SELECTED
          if (
            range.startOffset === 0 &&
            (range.endOffset === 0 ||
              range.endOffset === window.getSelection().toString().length)
          ) {
            // GETTING THE CURRENT FOCUS NODE
            var upperNode = range.startContainer

            // LOOPING ALL THE PARENT NODES UNTIL HIT THE DOCUMENT OR A LIST ITEM
            while (
              upperNode.parentNode !== this.document &&
              upperNode.parentNode.nodeName !== "LI"
            ) {
              // GETTING THE PARENT NODE
              upperNode = upperNode.parentNode
            }

            // GETTING THE UPPER NODE
            var lowerNode = upperNode

            // CREATING A VARIABLE TO CHECK IF A LIST ITEM WAS FOUND
            var foundListItem = false

            // LOOPING ALL THE CHILD NODES
            while (lowerNode.firstChild) {
              // GETTING THE CHILD NODE
              lowerNode = lowerNode.firstChild

              // CHECKING IF THE NODE IS A LIST ITEM
              if (lowerNode.nodeName === "LI") {
                // SETTING THAT THE LIST ITEM WAS FOUND
                foundListItem = true
              }
            }

            // CHECKING IF THERE IS NO LIST ITEM SELECTED
            if (!foundListItem) {
              // CHECKING IF THE UPPER NODE TEXT IS THE SELECTED TEXT
              if (upperNode.innerText.length === range.endOffset) {
                // REMOVING THE PARENT NODE
                upperNode.parentNode.removeChild(upperNode)
              }
            }
          }
        } catch (err) {
          //
        }

        // INSERTING THE PLAIN TEXT
        this.insertHtmlAtCaret(plainText, true)
      }
    } catch (err) {
      //
    }
  }

  spellcheck() {
    try {
      // CHECKING IF THE SPELLCHECKER IS NOT WORKING
      if (!this.spellcheckerWorking) {
        // PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
        if (!this.isDocumentSelected()) {
          return
        }

        // CHECKING IF A SUGGESTION IS DISPLAYED
        if (this.contentViewer.innerHTML.indexOf("<span ") > -1) {
          // CLEARING ANY SUGGESTION
          this.contentViewer.innerHTML = ""
        }

        // CHECKING IF THERE IS A WORKER CREATED
        if (this.myWorker !== null) {
          // TERMINATING THE WORKER
          this.myWorker.terminate()
        }

        // CHECKING IF THE SPELLCHECKER WAS EXECUTED PREVIOUSLY
        if (this.spellcheckerExecuted) {
          // GETTING THE CARET POSITION
          var originalCaretPosition = this.getCaretPosition(this.document)

          // CLEARING THE SPELLCHECKER RESULT
          this.spellcheckerResult = []

          // GETTING THE DOCUMENT INNERHTML CONTENT
          var originalHTML = this.document.innerHTML

          // CLEARING THE MISSPELLED TAGS
          originalHTML = originalHTML.replace(/<misspelled>/gm, "")
          originalHTML = originalHTML.replace(/<\/misspelled>/gm, "")

          try {
            // LOOPING EVERY DOCUMENT CHILD
            while (this.document.firstChild) {
              // REMOVING EVERY CHILD
              this.document.removeChild(this.document.firstChild)
            }
          } catch (err) {
            //
          }

          // SETTING THAT THE SPELLCHECKER IS WORKING (TO PREVENT A SAVE UNDO)
          this.spellcheckerWorking = true

          // SETTING THE DOCUMENT TEXT WITHOUT THE MISSPELLED WORDS UNDERLINED
          this.insertHtmlAtCaret(originalHTML, false)

          // SETTING THE CURRENT INSTANCE FOR LATER USE
          var thisTinyDOC = this

          // WAITING 25 MS FOR THE UI TO BE UPDATED
          setTimeout(function () {
            // SETTING THAT THE SPELLCHECKER IS NOT WORKING
            thisTinyDOC.spellcheckerWorking = false

            // SETTING THAT THE SPELLCHECKER WAS NOT EXECUTED
            thisTinyDOC.spellcheckerExecuted = false

            // HIDING THE PLEASE WAIT ANIMATION
            thisTinyDOC.showPleaseWait(false)

            // RESTORING THE SPELLCHECK BUTTON STYLE
            thisTinyDOC.buttonSpellcheck.className = "tinydoc_button_spellcheck"

            // RESTORING THE CARET POSITION
            thisTinyDOC.setCaretPosition(thisTinyDOC.document, originalCaretPosition)
          }, 25)
        } else {
          // DISABLING THE DOCUMENT
          this.disable()

          // SHOWING THE PLEASE WAIT ANIMATION
          this.showPleaseWait(true)

          // ADDING A BORDER TO THE SPELLCHECK BUTTON STYLE
          this.buttonSpellcheck.className =
            "tinydoc_button_spellcheck tinydoc_button_spellcheck_enabled"

          // SETTING THAT THE SPELLCHECKER IS WORKING
          this.spellcheckerWorking = true

          // GETTING ALL THE WORDS FROM THE TEXT DOCUMENT
          var results = this.document.innerText.match(
            /[^ ?,.1234567890·!¡¿,`~!@#$%^&*()_|+\-=?;:",.<>{}[\]\\/\s]+/g
          )

          // CREATING THE DATA FOR THE REQUEST
          var dataRequest = {}
          dataRequest["lang"] = this.spellcheckerLanguage
          dataRequest["words"] = results

          // SETTING THE CURRENT INSTANCE FOR LATER USE
          var thisTinyDOC = this

          // CREATING THE WEB WORKER FOR THE SPELLCHECKER SERVICE
          this.myWorker = new Worker(this.spellcheckerURL)

          // SETTING WHAT WILL HAPPEN WHEN A MESSAGE IS RECEIVED FROM THE WEB WORKER
          this.myWorker.onmessage = function (e) {
            try {
              // CHECKING IF THE SPELLCHECKER IS WORKING
              if (thisTinyDOC.spellcheckerWorking) {
                // FOCUSING THE DOCUMENT
                thisTinyDOC.focus()

                // GETTING THE WORKER MESSAGE
                var words = e.data

                // GETTING THE SPELLCHECKER RESULT
                thisTinyDOC.spellcheckerResult = words

                // GETTING THE DOCUMENT INNERHTML CONTENT
                var originalHTML = thisTinyDOC.document.innerHTML

                // GETTING THE CARET POSITION
                var originalCaretPosition = thisTinyDOC.getCaretPosition(
                  thisTinyDOC.document
                )

                // LOOPING EVERY WORD
                for (var key in words) {
                  // GETTING THE WORD THAT MUST BE UNDERLINED
                  var wordToUnderline = key

                  // REGEX FOR FINDING A WORD NOT INSIDE A TAG
                  var exp = new RegExp(
                    "\\b(" + wordToUnderline + ")\\b(?![^<]*>|[^<>]*>)",
                    "gi"
                  )

                  // ADDING A MISSPELLED TAG TO EVERY MISSPELLED WORD
                  originalHTML = originalHTML.replace(exp, function (m) {
                    return "<misspelled>" + m + "</misspelled>"
                  })
                }

                try {
                  // LOOPING EVERY DOCUMENT CHILD
                  while (thisTinyDOC.document.firstChild) {
                    // REMOVING EVERY CHILD
                    thisTinyDOC.document.removeChild(thisTinyDOC.document.firstChild)
                  }
                } catch (err) {
                  //
                }

                // SETTING THE DOCUMENT TEXT WITH THE MISSPELLED WORDS UNDERLINED
                thisTinyDOC.insertHtmlAtCaret(originalHTML, false)

                // ENABLING THE DOCUMENT
                thisTinyDOC.enable()

                // RESTORING THE CARET POSITION
                thisTinyDOC.setCaretPosition(
                  thisTinyDOC.document,
                  originalCaretPosition
                )

                // HIDING THE PLEASE WAIT ANIMATION
                thisTinyDOC.showPleaseWait(false)

                // WAITING 500 MS FOR THE NEXT SPELLCHECKING (WORKAROUND)
                setTimeout(function () {
                  // SETTING THAT THE SPELLCHECKER IS NOT WORKING
                  thisTinyDOC.spellcheckerWorking = false

                  // SETTING THAT THE SPELLCHECKER WAS EXECUTED
                  thisTinyDOC.spellcheckerExecuted = true
                }, 500)
              }
            } catch (err) {
              //
            }
            return true
          }

          // SETTING WHAT WILL HAPPEN IF SOMETHING GOES WRONG WITH THE WORKER
          this.myWorker.onerror = function () {
            // WAITING 25 MS FOR THE UI TO BE UPDATED
            setTimeout(function () {
              // SETTING THAT THE SPELLCHECKER IS NOT WORKING
              thisTinyDOC.spellcheckerWorking = false

              // SETTING THAT THE SPELLCHECKER WAS NOT EXECUTED
              thisTinyDOC.spellcheckerExecuted = false

              // RESTORING THE SPELLCHECK BUTTON STYLE
              thisTinyDOC.buttonSpellcheck.className = "tinydoc_button_spellcheck"

              // ENABLING THE DOCUMENT
              thisTinyDOC.enable()

              // RESTORING THE CARET POSITION
              thisTinyDOC.setCaretPosition(
                thisTinyDOC.document,
                originalCaretPosition
              )

              // HIDING THE PLEASE WAIT ANIMATION
              thisTinyDOC.showPleaseWait(false)
            }, 25)
          }

          // SENDING THE SPELLCHECKING REQUEST
          this.myWorker.postMessage(dataRequest)
        }
      }
    } catch (err) {
      //
    }
  }

  print() {
    // CHECKING IF THE SPELLCHECKER IS WORKING
    if (this.spellcheckerWorking) {
      // NO POINT GOING ANY FURTHER
      return
    }

    const webLinkColor = "#3A76B1"

    // CHECKING IF IT IS A DESKTOP DEVICE
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
        const thisTinyDOC = this
        setTimeout(() => {
          thisTinyDOC.document.focus()
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
      // PREVENTING OVERLAPPING DURING THE UNDO/REDO RENDERING EVENT
      if (!this.canUndoRedo) {
        return
      }

      // PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
      if (!this.isDocumentSelected() && !keyboardRequest) {
        return
      }

      // PREVENTING TO UNDO CONTENT WHEN THE SPELLCHECKER IS WORKING
      if (this.spellcheckerWorking) {
        return
      }

      // CHECKING IF THE SPELLCHECKER WAS EXECUTED
      if (this.spellcheckerExecuted) {
        // DISABLING THE SPELLCHECKER
        this.spellcheck()

        // NO POINT GOING ANY FURTHER
        return
      }

      // HIDING THE CARET
      this.document.style.caretColor = "transparent"

      // SETTING THAT THE DOCUMENT CANNOT DO A UNDO/REDO
      this.canUndoRedo = false

      // GETTING THE CURRENT CARET POSITION
      this.document_history_lastCaret = this.getCaretPosition(this.document)

      // CHECKING IF THERE IS A DOCUMENT HISTORY TO UNDO
      if (this.document_history_index > 0) {
        // LOOPING EVERY DOCUMENT CHILD
        while (this.document.firstChild) {
          // REMOVING EVERY CHILD
          this.document.removeChild(this.document.firstChild)
        }

        // UPDATING THE DOCUMENT CONTENT WITH THE PREVIOUS STORED CONTENT
        this.insertHtmlAtCaret(
          this.document_history[this.document_history_index - 1],
          false
        )

        // SETTING THE CURRENT INSTANCE FOR LATER USE
        var thisTinyDOC = this

        // WAITING 25 MS FOR THE UI TO BE UPDATED
        setTimeout(function () {
          // MOVING THE CARET TO THE STORED POSITION
          thisTinyDOC.setCaretPosition(
            thisTinyDOC.document,
            thisTinyDOC.document_history_caret[
              thisTinyDOC.document_history_index - 1
            ]
          )

          // UPDATING THE DOCUMENT HISTORY INDEX
          thisTinyDOC.document_history_index = thisTinyDOC.document_history_index - 1

          // SCROLLING TO THE CARET
          thisTinyDOC.scrollToCaret()

          // SHOWING THE CARET
          thisTinyDOC.document.style.caretColor = "black"

          // SETTING THAT THE DOCUMENT CAN DO A UNDO/REDO
          thisTinyDOC.canUndoRedo = true
        }, 25)
      } else {
        // SETTING THE CURRENT INSTANCE FOR LATER USE
        var thisTinyDOC = this

        // WAITING 25 MS FOR THE UI TO BE UPDATED
        setTimeout(function () {
          // RESTORING THE CARET POSITION
          thisTinyDOC.setCaretPosition(
            thisTinyDOC.document,
            thisTinyDOC.document_history_lastCaret
          )

          // SHOWING THE CARET
          thisTinyDOC.document.style.caretColor = "black"

          // SETTING THAT THE DOCUMENT CAN DO A UNDO/REDO
          thisTinyDOC.canUndoRedo = true
        }, 25)
      }
    } catch (err) {
      // SETTING THE CURRENT INSTANCE FOR LATER USE
      var thisTinyDOC = this

      // WAITING 25 MS FOR THE UI TO BE UPDATED
      setTimeout(function () {
        // IN CASE OF ERROR, MOVING THE CARET TO THE FIRST POSITION
        thisTinyDOC.setCaretPosition(thisTinyDOC.document, 0)

        // SHOWING THE CARET
        thisTinyDOC.document.style.caretColor = "black"

        // SETTING THAT THE DOCUMENT CAN DO A UNDO/REDO
        thisTinyDOC.canUndoRedo = true
      }, 25)
    }
  }

  redo(keyboardRequest) {
    try {
      // PREVENTING OVERLAPPING DURING THE UNDO/REDO RENDERING EVENT
      if (!this.canUndoRedo) {
        return
      }

      // PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
      if (!this.isDocumentSelected() && !keyboardRequest) {
        return
      }

      // PREVENTING TO UNDO CONTENT WHEN THE SPELLCHECKER IS WORKING
      if (this.spellcheckerWorking) {
        return
      }

      // CHECKING IF THE SPELLCHECKER WAS EXECUTED
      if (this.spellcheckerExecuted) {
        // DISABLING THE SPELLCHECKER
        this.spellcheck()

        // NO POINT GOING ANY FURTHER
        return
      }

      // HIDING THE CARET
      this.document.style.caretColor = "transparent"

      // SETTING THAT THE DOCUMENT CANNOT DO A UNDO/REDO
      this.canUndoRedo = false

      // GETTING THE CURRENT CARET POSITION
      this.document_history_lastCaret = this.getCaretPosition(this.document)

      // CHECKING IF THERE IS A DOCUMENT HISTORY TO REDO
      if (this.document_history[this.document_history_index + 1]) {
        // LOOPING EVERY DOCUMENT CHILD
        while (this.document.firstChild) {
          // REMOVING EVERY CHILD
          this.document.removeChild(this.document.firstChild)
        }

        // UPDATING THE DOCUMENT CONTENT WITH THE NEXT STORED CONTENT
        this.insertHtmlAtCaret(
          this.document_history[this.document_history_index + 1],
          false
        )

        // SETTING THE CURRENT INSTANCE FOR LATER USE
        var thisTinyDOC = this

        // WAITING 25 MS FOR THE UI TO BE UPDATED
        setTimeout(function () {
          // MOVING THE CARET TO THE STORED POSITION
          thisTinyDOC.setCaretPosition(
            thisTinyDOC.document,
            thisTinyDOC.document_history_caret[
              thisTinyDOC.document_history_index + 1
            ]
          )

          // UPDATING THE DOCUMENT HISTORY INDEX
          thisTinyDOC.document_history_index = thisTinyDOC.document_history_index + 1

          // SCROLLING TO THE CARET
          thisTinyDOC.scrollToCaret()

          // SHOWING THE CARET
          thisTinyDOC.document.style.caretColor = "black"

          // SETTING THAT THE DOCUMENT CAN DO A UNDO/REDO
          thisTinyDOC.canUndoRedo = true
        }, 25)
      } else {
        // SETTING THE CURRENT INSTANCE FOR LATER USE
        var thisTinyDOC = this

        // WAITING 25 MS FOR THE UI TO BE UPDATED
        setTimeout(function () {
          // RESTORING THE CARET POSITION
          thisTinyDOC.setCaretPosition(
            thisTinyDOC.document,
            thisTinyDOC.document_history_lastCaret
          )

          // SHOWING THE CARET
          thisTinyDOC.document.style.caretColor = "black"

          // SETTING THAT THE DOCUMENT CAN DO A UNDO/REDO
          thisTinyDOC.canUndoRedo = true
        }, 25)
      }
    } catch (err) {
      // SETTING THE CURRENT INSTANCE FOR LATER USE
      var thisTinyDOC = this

      // WAITING 25 MS FOR THE UI TO BE UPDATED
      setTimeout(function () {
        // IN CASE OF ERROR, MOVING THE CARET TO THE FIRST POSITION
        thisTinyDOC.setCaretPosition(thisTinyDOC.document, 0)

        // SHOWING THE CARET
        thisTinyDOC.document.style.caretColor = "black"

        // SETTING THAT THE DOCUMENT CAN DO A UNDO/REDO
        thisTinyDOC.canUndoRedo = true
      }, 25)
    }
  }

  saveUndo() {
    try {
      // GETTING THE CURRENT DOCUMENT CONTENT OR STATE
      var current_state = this.document.innerHTML

      // CLEARING THE MISSPELLED TAGS
      current_state = current_state.replace(/<misspelled>/gm, "")
      current_state = current_state.replace(/<\/misspelled>/gm, "")

      // IF CURRENT STATE IDENTICAL TO PREVIOUS DON'T SAVE IDENTICAL STATES
      if (current_state !== this.document_history[this.document_history_index]) {
        // IF WE ALREADY USED UNDO BUTTON AND MADE MODIFICATION - DELETE ALL FORWARD HISTORY
        if (this.document_history_index <= this.document_history.length - 1) {
          // REMOVING ALL FORWARD HISTORY
          this.document_history = this.document_history.slice(
            0,
            this.document_history_index + 1
          )
          this.document_history_caret = this.document_history_caret.slice(
            0,
            this.document_history_index + 1
          )

          // UPDATING THE DOCUMENT HISTORY INDEX
          this.document_history_index = this.document_history_index + 1
        }

        // ADDING THE CURRENT DOCUMENT CONTENT STATE TO THE DOCUMENT HISTORY
        this.document_history.push(current_state)

        // ADDING THE CURRENT DOCUMENT CARET STATE TO THE DOCUMENT HISTORY
        this.document_history_caret.push(this.getCaretPosition(this.document))

        // UPDATING THE DOCUMENT HISTORY INDEX
        this.document_history_index = this.document_history.length - 1
      }
    } catch (err) {
      //
    }
  }

  clearUndoRedo() {
    // CLEARING THE UNDO/REDO HISTORY
    this.document_history = []
    this.document_history_caret = []
    this.document_history_index = 0
    this.document_history_lastCaret = 0

    // SAVING THE INITIAL STATE
    this.saveUndo()
  }

  // https://gist.github.com/isLishude/6ccd1fbf42d1eaac667d6873e7b134f8
  // https://codepen.io/jeffward/pen/OJjPKYo
  setCaretPosition(container, position) {
    try {
      function createRange(node, chars, range) {
        if (range === null) {
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
            var _g = 0
            var _g1 = node.childNodes.length
            while (_g < _g1) {
              var lp = _g++
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
        var selection = window.getSelection()
        var range = createRange(container, { count: position })
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
      // CHECKING IF THE CARET IS IN THE DOCUMENT
      if (!this.isDocumentSelected()) {
        return 0
      }

      var caretOffset = 0

      var range = window.getSelection().getRangeAt(0)
      var preCaretRange = range.cloneRange()

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
      function checkForEmail(email) {
        var re =
          /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
      }

      // GETTING THE SELECTED TEXT
      var selectedText = window.getSelection().toString()

      // CHECKING THE SELECTED TEXT
      if (selectedText !== null) {
        // IF THERE IS A SELECTED TEXT
        if (selectedText.length > 0) {
          // VALIDATORS FOR KNOWING IF THE SELECTED TEXT IS A HTTP, HTTPS OR MAILTO LINK
          var selectedTextURLChecker1 = selectedText.toLowerCase().indexOf(" ")
          var selectedTextURLChecker2 = selectedText.toLowerCase().indexOf("http://")
          var selectedTextURLChecker3 = selectedText
            .toLowerCase()
            .indexOf("https://")
          var selectedTextURLChecker4 = checkForEmail(selectedText)

          // VALIDATING THE SELECTED TEXT
          if (
            selectedTextURLChecker1 === -1 &&
            (selectedTextURLChecker2 === 0 ||
              selectedTextURLChecker3 === 0 ||
              selectedTextURLChecker4)
          ) {
            // CHECKING IF IT IS A URL OR EMAIL
            if (selectedTextURLChecker4) {
              // INSERTING THE MAILTO LINK INTO THE DOCUMENT
              this.insertHtmlAtCaret(
                "<a href='mailto:" +
                  selectedText.toLowerCase() +
                  "' target='_blank'>" +
                  selectedText +
                  "</a>",
                false
              )
            } else {
              // INSERTING THE URL LINK INTO THE DOCUMENT
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

      // SETTING THE CURRENT INSTANCE FOR LATER USE
      var thisTinyDOC = this

      // FOCUSING THE DOCUMENT AFTER 100 MS
      setTimeout(function () {
        thisTinyDOC.document.focus()
      }, 100)
    } catch (err) {
      //
    }
  }

  insertCalc() {
    try {
      // GETTING THE SELECTED TEXT
      var selectedText = window.getSelection().toString()

      // CHECKING THE SELECTED TEXT
      if (selectedText !== null) {
        // IF THERE IS A SELECTED TEXT
        if (selectedText.length > 0) {
          // MOVING THE CARET AFTER THE SELECTED TEXT
          try {
            document.getSelection().collapseToEnd()
          } catch (err) {
            //
          }

          // SPLITTING THE SELECTED TEXT BY BREAKLINES
          var splitted = selectedText.split("\n")

          // CHECK IF IT IS A SINGLE LINE EXPRESSION OR A MULTILINE ADDING OPERATION
          if (splitted.length === 1) {
            // REMOVING INVALID CHARACTERS
            selectedText = selectedText.replace(/[^0-9.*/()+-]/g, "")

            try {
              // EVALUATING THE EXPRESSION
              var finalResult = eval(selectedText)

              // CHECKING IF THE FINAL RESULT IS NAN (NOT A NUMBER)
              if (isNaN(finalResult)) {
                // INSERTING AN ERROR TEXT IF THE EXPRESSION RESULT COULD NOT BE EVALUATED
                this.insertHtmlAtCaret(" = ERROR", false)
              } else {
                // SHOWING ONLY TWO DECIMALS AFTER COMMA
                finalResult = parseFloat(finalResult).toFixed(2)

                // CHECKING IF THE FINAL RESULT IS AN INTEGER
                if (finalResult.indexOf(".00") > -1) {
                  finalResult = parseFloat(finalResult).toFixed(0)
                }

                // INSERTING THE EXPRESSION RESULT
                this.insertHtmlAtCaret(" = " + finalResult, false)
              }
            } catch (err) {
              // INSERTING AN ERROR TEXT IF THE EXPRESSION RESULT COULD NOT BE EVALUATED
              this.insertHtmlAtCaret(" = ERROR", false)
            }
          } else {
            // SETTING THE FINAL RESULT VARIABLE
            var finalResult = 0

            // SETTING THE VARIABLE FOR THE LAST-LINE-BREAKLINE-CHECKER
            var lastLineBR = ""

            // GETTING ALL THE LINES
            for (var i = 0; i < splitted.length; i++) {
              try {
                // GETTING ONE LINE
                var currentLine = splitted[i]

                // CHECKING THE LINE
                if (currentLine.length > 0) {
                  // TRIMMING THE CURRENT LINE
                  currentLine = currentLine.trim()

                  // CHECKING IF THE CURRENT LINE HAS A SPACE
                  if (currentLine.lastIndexOf(" ") > -1) {
                    // GETTING THE CONTENT AFTER THE SPACE
                    currentLine = currentLine.substr(
                      currentLine.lastIndexOf(" ") + 1,
                      currentLine.length
                    )
                  }

                  // REMOVING INVALID CHARACTERS
                  currentLine = currentLine.replace(/[^0-9.]/g, "")

                  // ADDING THE VALUE TO THE FINAL RESULT
                  finalResult = parseFloat(finalResult) + parseFloat(currentLine)
                }

                // CHECKING IF THE LAST LINE AND IS NOT A BREAKLINE.
                // IF SO, A BREAKLINE WILL BE ADDED BEFORE THE RESULT.
                if (currentLine !== "" && i === splitted.length - 1) {
                  lastLineBR = "<br>"
                }
              } catch (err) {
                //
              }
            }

            try {
              // CHECKING IF THE FINAL RESULT IS NAN (NOT A NUMBER)
              if (isNaN(finalResult)) {
                // INSERTING AN ERROR TEXT IF THE EXPRESSION RESULT COULD NOT BE EVALUATED
                this.insertHtmlAtCaret(lastLineBR + "----------<br />ERROR", false)
              } else {
                // SHOWING ONLY TWO DECIMALS AFTER COMMA
                finalResult = parseFloat(finalResult).toFixed(2)

                // CHECKING IF THE FINAL RESULT IS AN INTEGER
                if (finalResult.indexOf(".00") > -1) {
                  finalResult = parseFloat(finalResult).toFixed(0)
                }

                // INSERTING THE FINAL RESULT
                this.insertHtmlAtCaret(
                  lastLineBR + "----------<br />" + finalResult,
                  false
                )
              }
            } catch (err) {
              // INSERTING AN ERROR TEXT IF THE RESULT COULD NOT BE DISPLAYED
              this.insertHtmlAtCaret(lastLineBR + "----------<br />ERROR", false)
            }
          }
        }
      }
    } catch (err) {
      //
    }

    // SETTING THE CURRENT INSTANCE FOR LATER USE
    var thisTinyDOC = this

    // FOCUSING THE DOCUMENT AFTER 100 MS
    setTimeout(function () {
      thisTinyDOC.document.focus()
    }, 100)
  }

  checkForURL() {
    try {
      // SEARCHING FOR A LINK TAG
      var linkTag = this.getParentTag("A")

      // CHECKING IF A LINK TAG WASN'T FOUND
      if (linkTag === null) {
        // GETTING THE CURRENT TAG WHERE THE CARET IS LOCATED (BACKSAFE)
        linkTag = this.getCurrentTag()
      }

      // CHECKING IF A LINK TAG WAS FOUND
      if (linkTag.nodeName === "A") {
        // GETTING THE URL (IF ANY)
        var finalURL = linkTag.href

        // CHECKING IF THERE IS A VALUE
        if (typeof finalURL !== "undefined") {
          // CLEARING THE MISSPELLED TAGS
          finalURL = finalURL.replace(/<misspelled>/gm, "")
          finalURL = finalURL.replace(/<\/misspelled>/gm, "")

          // ADDING THE VALUE TO THE CONTENT VIEWER
          this.contentViewer.innerHTML =
            "<a href='" + finalURL + "' target='_blank'>" + finalURL + "</a>"
        }
      } else {
        // CLEARING THE CONTENT VIEWER
        this.contentViewer.innerHTML = ""
      }
    } catch (err) {
      //
    }
  }

  checkForMisspelled() {
    try {
      // SEARCHING FOR A MISSPELLED TAG
      var misspelledTag = this.getParentTag("MISSPELLED")

      // CHECKING IF A MISSPELLED TAG WASN'T FOUND
      if (misspelledTag === null) {
        // GETTING THE CURRENT TAG WHERE THE CARET IS LOCATED (BACKSAFE)
        misspelledTag = this.getCurrentTag()
      }

      // CHECKING IF A MISSPELLED TAG WAS FOUND
      if (misspelledTag.nodeName === "MISSPELLED") {
        // GETTING THE MISSPELLED WORD (IF ANY)
        var finalMisspelled = misspelledTag.textContent

        // CHECKING IF THERE IS A VALUE
        if (typeof finalMisspelled !== "undefined") {
          // CLEARING THE CONTENT VIEWER
          this.contentViewer.innerHTML = ""

          // CHECKING IF THE WORD WAS REPORTED BY THE SPELLCHECKER
          if (this.spellcheckerResult[finalMisspelled]) {
            // SETTING THE CURRENT INSTANCE FOR LATER USE
            var thisTinyDOC = this

            // LOOPING EVERY SUGGESTED WORD
            for (
              var i = 0;
              i < this.spellcheckerResult[finalMisspelled].length;
              i++
            ) {
              // CREATING THE SUGGESTED WORD
              var suggestedWord = document.createElement("span")
              suggestedWord.className = "tinydoc_spellchecker_suggestions"
              suggestedWord.innerHTML = this.spellcheckerResult[finalMisspelled][i]
              suggestedWord.addEventListener("mousedown", function () {
                thisTinyDOC.replaceWith(this.innerHTML)
              })

              // ADDING THE SUGGESTED WORD
              this.contentViewer.appendChild(suggestedWord)
            }

            // CHECKING IF THERE IS NO SUGGESTIONS
            if (this.spellcheckerResult[finalMisspelled].length === 0) {
              // ADDING THE SUGGESTIONS LABEL
              this.contentViewer.innerHTML =
                '<span class="tinydoc_spellchecker_no_suggestions">' +
                this.spellcheckerNoSuggestionsLabel +
                "</span>"
            }
          } else {
            // CLEARING THE CONTENT VIEWER
            this.contentViewer.innerHTML = ""

            // REMOVING THE UNDERLINE FROM THE NEW WORD
            this.replaceWith(misspelledTag.textContent)
          }
        }
      } else {
        // CHECKING IF THE CARET IS IN A LINK TAG
        if (!this.getParentTag("A") || !this.getCurrentTag("A")) {
          // CLEARING THE CONTENT VIEWER
          this.contentViewer.innerHTML = ""
        }
      }
    } catch (err) {
      //
    }
  }

  replaceWith(word) {
    try {
      // PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
      if (!this.isDocumentSelected()) {
        this.contentViewer.innerHTML = ""
        return
      }

      // GETTING THE CURRENT TAG
      var currentTag = this.getCurrentTag()

      // CHECKING IF THE CARET IS ON A MISSPELLED WORD
      if (currentTag.parentNode.nodeName === "MISSPELLED") {
        // GETTING THE CARET POSITION
        var originalCaretPosition = this.getCaretPosition(this.document)

        // REGISTERING THE UNDO EVENT
        this.saveUndo()

        // REPLACING THE MISSPELLED WORD
        currentTag.nodeValue = word

        // REMOVING THE HIGHTLIGHT FROM THE CORRECTED WORD
        currentTag.parentNode.parentNode.replaceChild(
          currentTag.parentNode.firstChild,
          currentTag.parentNode
        )

        // CLEARING THE SUGGESTIONS
        this.contentViewer.innerHTML = ""

        // FOCUSING THE DOCUMENT
        this.focus()

        // REGISTERING THE UNDO EVENT
        this.saveUndo()

        // SETTING THE DOCUMENT AS DIRTY
        window.onbeforeunload = function () {
          return "Dirty"
        }

        // SETTING THE CURRENT INSTANCE FOR LATER USE
        var thisTinyDOC = this

        // WAITING 25 MS FOR THE UI TO BE UPDATED
        setTimeout(function () {
          // RESTORING THE CARET POSITION
          thisTinyDOC.setCaretPosition(thisTinyDOC.document, originalCaretPosition)
        })
      } else {
        // CLEARING THE SUGGESTIONS
        this.contentViewer.innerHTML = ""
      }
    } catch (err) {
      //
    }
  }

  // https://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
  insertHtmlAtCaret(html, selectPastedContent) {
    try {
      // PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
      if (!this.isDocumentSelected()) {
        return
      }

      // PREVENTING SAVING AN UNDO EVENT DURING AN UNDO/REDO EVENT OR THE SPELLCHECKER IS NOT WORKING
      if (this.canUndoRedo && !this.spellcheckerWorking) {
        // REGISTERING THE UNDO EVENT
        this.saveUndo()
      }

      var selection = window.getSelection()

      if (selection.getRangeAt && selection.rangeCount) {
        var range = selection.getRangeAt(0)
        range.deleteContents()

        var el = document.createElement("div")
        el.innerHTML = html

        var frag = document.createDocumentFragment(),
          node,
          lastNode

        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node)
        }

        var firstNode = frag.firstChild
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

        // CHECKING IF THE SPELLCHECKER IS WORKING
        if (this.spellcheckerWorking) {
          // NO POINT GOING ANY FURTHER
          return
        }
        // CHECKING IF A NEW TEXT IS SET
        else if (this.settingNewText) {
          // SETTING THAT ENTER KEY WAS NOT PRESSED
          this.settingNewText = false

          // MOVING THE CARET TO THE BEGINNING OF THE DOCUMENT
          this.setCaretPosition(this.document, 0)
        }

        // CHECKING IF THE ENTER KEY WAS PRESSED
        else if (this.keyEnterPressed) {
          // SETTING THAT ENTER KEY WAS NOT PRESSED
          this.keyEnterPressed = false

          // SCROLLING TO THE CARET
          this.scrollToCaret()

          // SETTING THE DOCUMENT AS DIRTY
          window.onbeforeunload = function () {
            return "Dirty"
          }
        } else {
          // SETTING THE CURRENT INSTANCE FOR LATER USE
          var thisTinyDOC = this

          // WAITING 25 MS FOR THE UI TO BE UPDATED
          setTimeout(function () {
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

            // PREVENTING SAVING AN UNDO EVENT DURING AN UNDO/REDO EVENT
            if (thisTinyDOC.canUndoRedo) {
              // SCROLLING TO THE CARET
              thisTinyDOC.scrollToCaret()

              // REGISTERING THE UNDO EVENT
              thisTinyDOC.saveUndo()
            }

            // SETTING THE DOCUMENT AS DIRTY
            window.onbeforeunload = function () {
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
      var doc = containerEl.ownerDocument
      var win = doc.defaultView
      var range = win.getSelection().getRangeAt(0)
      var preSelectionRange = range.cloneRange()
      preSelectionRange.selectNodeContents(containerEl)
      preSelectionRange.setEnd(range.startContainer, range.startOffset)
      var start = preSelectionRange.toString().length
      return { start: start, end: start + range.toString().length }
    } catch (err) {
      return { start: 0, end: 0 }
    }
  }

  // https://stackoverflow.com/questions/17678843/cant-restore-selection-after-html-modify-even-if-its-the-same-html
  restoreSelection(containerEl, savedSel) {
    try {
      var doc = containerEl.ownerDocument,
        win = doc.defaultView
      var charIndex = 0,
        range = doc.createRange()
      range.setStart(containerEl, 0)
      range.collapse(true)
      var nodeStack = [containerEl],
        node,
        foundStart = false,
        stop = false

      while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType === 3) {
          var nextCharIndex = charIndex + node.length
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
          var i = node.childNodes.length
          while (i--) {
            nodeStack.push(node.childNodes[i])
          }
        }
      }

      var sel = win.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    } catch (err) {
      //
    }
  }
}
