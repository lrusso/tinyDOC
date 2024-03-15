import React from "react"

const TinyDOC = ({
  content,
  height,
  enabled = true,
  saveCallback,
  focusOnMount,
  forceFocus,
  dirtyCallback,
  template1,
  template2,
  template3,
  calcEnabled,
  linkColor,
  wordCountValue = " words and ",
  charCountValue = " characters.",
  useCtrlSForSaving,
  useCtrlPForPrinting,
  replaceTabWithSpaces,
  spellcheckerEnabled,
  spellcheckerLanguage,
  spellcheckerStarted,
  spellcheckerEnded,
  spellcheckerURL = "./spellchecker.js",
  spellcheckerNoSuggestions = "(No suggestions)",
  spellcheckerMaxSuggestions = 3,
}) => {
  const refDocument = React.useRef(null)
  const [selectedLink, setSelectedLink] = React.useState(null)
  const [undoContent, setUndoContent] = React.useState(null)
  const [undoCaret, setUndoCaret] = React.useState(null)
  const [currentContent, setCurrentContent] = React.useState(null)
  const [currentCaret, setCurrentCaret] = React.useState(null)
  const [redoContent, setRedoContent] = React.useState(null)
  const [redoCaret, setRedoCaret] = React.useState(null)
  const [initialCaret, setInitialCaret] = React.useState(null)
  const [caretBeforeSaving, setCaretBeforeSaving] = React.useState(null)
  const [timer, setTimer] = React.useState(null)
  const [spellcheckerRunning, setSpellcheckerRunning] = React.useState(false)
  const [spellcheckerWorker, setSpellcheckerWorker] = React.useState(null)
  const [spellcheckerCaretPos, setSpellcheckerCaretPos] = React.useState(null)
  const [spellcheckerWords, setSpellcheckerWords] = React.useState([])
  const [spellcheckerSuggestions, setSpellcheckerSuggestions] = React.useState(null)
  const isUsingSafari = /^((?!chrome|android).)*safari/i.test(
    window.navigator.userAgent
  )
  const isMobileDevice = !!(
    window.navigator.userAgent.match(/Android/i) ||
    window.navigator.userAgent.match(/webOS/i) ||
    window.navigator.userAgent.match(/iPhone/i) ||
    window.navigator.userAgent.match(/iPad/i) ||
    window.navigator.userAgent.match(/iPod/i) ||
    window.navigator.userAgent.match(/BlackBerry/i) ||
    window.navigator.userAgent.match(/Windows Phone/i)
  )
  const EDITOR_ENABLED = spellcheckerRunning ? false : enabled ? enabled : false
  const SPELLCHECKER_ENABLED = spellcheckerWords.length !== 0

  const save = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    if (isUsingSafari) {
      setCaretBeforeSaving(getCaretPosition(refDocument.current))
    }

    let originalHTML = refDocument.current.innerHTML
    originalHTML = originalHTML.replace(/<misspelled>/gm, "")
    originalHTML = originalHTML.replace(/<\/misspelled>/gm, "")

    if (saveCallback) {
      saveCallback(originalHTML)
    }
  }

  const print = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    const webLinkColor = linkColor ? linkColor : "#3A76B1"
    if (!isMobileDevice) {
      try {
        const newIframe = document.createElement("iframe")
        newIframe.width = "0"
        newIframe.height = "0"
        newIframe.src = "about:blank"
        document.body.appendChild(newIframe)
        newIframe.contentWindow.document.write(
          "<!DOCTYPE html><html><head><title>" +
            encodeText(window.location.href) +
            "</title><style>a{text-decoration:underline;color:" +
            webLinkColor +
            "}</style></head><body style='font-family:Arial;font-size:16px;white-space:pre-wrap'>" +
            refDocument.current.innerHTML +
            "</body></html>"
        )
        newIframe.contentWindow.document.close()
        newIframe.contentWindow.focus()
        newIframe.contentWindow.print()
        document.body.removeChild(newIframe)
        setTimeout(() => {
          refDocument.current.focus()
        }, 25)
      } catch (err) {
        //
      }
    } else {
      try {
        const printingWindow = window.open("about:blank", "_blank")
        printingWindow.document.write(
          "<!DOCTYPE html><html><head><title>" +
            encodeText(window.location.href) +
            "</title><style>a{text-decoration:underline;color:" +
            webLinkColor +
            "}</style></head><body style='font-family:Arial;font-size:16px;white-space:pre-wrap'>" +
            refDocument.current.innerHTML +
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

  const spellcheck = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    const caretPos = getCaretPosition(refDocument.current)
    setSpellcheckerCaretPos(caretPos)
    setSpellcheckerSuggestions(null)
    setSpellcheckerWords([])

    if (SPELLCHECKER_ENABLED) {
      let originalHTML = refDocument.current.innerHTML
      originalHTML = originalHTML.replace(/<misspelled>/gm, "")
      originalHTML = originalHTML.replace(/<\/misspelled>/gm, "")

      refDocument.current.innerHTML = originalHTML

      if (spellcheckerEnded) {
        spellcheckerEnded()
      }

      setTimeout(() => {
        setCaretPosition(refDocument.current, caretPos)
        refDocument.current.focus()
      }, 25)

      return
    }

    setSpellcheckerRunning(true)

    if (spellcheckerWorker) {
      spellcheckerWorker.terminate()
    }

    if (spellcheckerStarted) {
      spellcheckerStarted()
    }

    setSpellcheckerWorker(new Worker(spellcheckerURL))
  }

  const undo = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    const caretPos = getCaretPosition(refDocument.current)
    if (undoContent?.length >= 0) {
      let originalHTML = undoContent
      originalHTML = originalHTML.replace(/<misspelled>/gm, "")
      originalHTML = originalHTML.replace(/<\/misspelled>/gm, "")
      refDocument.current.innerHTML = originalHTML
      setCurrentContent(undoContent)
      setCurrentCaret(undoCaret)
      setRedoContent(currentContent)
      setRedoCaret(currentCaret)
      setUndoContent(null)
      setSpellcheckerSuggestions(null)
      setSpellcheckerWords([])

      refDocument.current.style.caretColor = "transparent"

      setTimeout(() => {
        refDocument.current.focus()
        dirtyCallback()
        if (undoCaret) {
          setCaretPosition(refDocument.current, undoCaret)
        }
        refDocument.current.style.caretColor = "#000000"
        scrollToCaret(refDocument.current, 16)
        setInitialCaret(getCaretPosition(refDocument.current))
      }, 25)
    } else {
      setTimeout(() => {
        refDocument.current.focus()
        if (isUsingSafari) {
          setCaretPosition(refDocument.current, caretPos)
        }
      }, 25)
    }
  }

  const redo = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    const caretPos = getCaretPosition(refDocument.current)
    if (redoContent?.length >= 0) {
      let originalHTML = redoContent
      originalHTML = originalHTML.replace(/<misspelled>/gm, "")
      originalHTML = originalHTML.replace(/<\/misspelled>/gm, "")
      refDocument.current.innerHTML = originalHTML
      setCurrentContent(redoContent)
      setCurrentCaret(redoCaret)
      setUndoContent(currentContent)
      setUndoCaret(currentCaret)
      setRedoContent(null)
      setSpellcheckerSuggestions(null)
      setSpellcheckerWords([])

      refDocument.current.style.caretColor = "transparent"

      setTimeout(() => {
        refDocument.current.focus()
        dirtyCallback()
        if (redoCaret) {
          setCaretPosition(refDocument.current, redoCaret)
        }
        refDocument.current.style.caretColor = "#000000"
        scrollToCaret(refDocument.current, 16)
        setInitialCaret(getCaretPosition(refDocument.current))
      }, 25)
    } else {
      setTimeout(() => {
        refDocument.current.focus()
        if (isUsingSafari) {
          setCaretPosition(refDocument.current, caretPos)
        }
      }, 25)
    }
  }

  const bold = () => {
    formatText("b")
  }

  const italic = () => {
    formatText("i")
  }

  const underline = () => {
    formatText("u")
  }

  const strikethrough = () => {
    formatText("strike")
  }

  const bullets = () => {
    formatList("ul", "li")
  }

  const numbers = () => {
    formatList("ol", "li")
  }

  const highlight = () => {
    formatText("span", "#FFFF00")
  }

  const link = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    try {
      if (!isDocumentSelected()) {
        return
      }

      const selectedText = window.getSelection().toString()
      if (selectedText.length > 0) {
        const selectedTextURLChecker1 = selectedText.toLowerCase().indexOf(" ")
        const selectedTextURLChecker2 = selectedText.toLowerCase().indexOf("http://")
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
            insertHtmlAtCaret(
              "<a href='mailto:" +
                selectedText.toLowerCase() +
                "' target='_blank'>" +
                selectedText +
                "</a>",
              false
            )
          } else {
            insertHtmlAtCaret(
              "<a href='" +
                selectedText +
                "' target='_blank'>" +
                selectedText +
                "</a>",
              false
            )
          }
          setTimeout(() => {
            refDocument.current.focus()
          }, 25)
        }
      } else {
        setTimeout(() => {
          refDocument.current.focus()
        }, 25)
      }
    } catch (err) {
      //
    }
  }

  const insertTemplate1 = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    insertHtmlAtCaret(template1)
    setTimeout(() => {
      refDocument.current.focus()
    }, 25)
  }

  const insertTemplate2 = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    insertHtmlAtCaret(template2)
    setTimeout(() => {
      refDocument.current.focus()
    }, 25)
  }

  const insertTemplate3 = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    insertHtmlAtCaret(template3)
    setTimeout(() => {
      refDocument.current.focus()
    }, 25)
  }

  const calc = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    try {
      let selectedText = window.getSelection().toString()
      if (selectedText.length > 0) {
        try {
          document.getSelection().collapseToEnd()
        } catch (err) {
          //
        }

        const splitted = selectedText.split("\n")
        if (splitted.length === 1) {
          // REMOVING INVALID CHARACTERS
          selectedText = selectedText.replace(/[^0-9.*\\/()+-]/g, "")

          try {
            // eslint-disable-next-line no-eval
            let finalResult = eval(selectedText)

            if (isNaN(finalResult)) {
              insertHtmlAtCaret(" = ERROR", false)
              setTimeout(() => {
                refDocument.current.focus()
              }, 25)
            } else {
              finalResult = parseFloat(finalResult).toFixed(2)

              if (finalResult.indexOf(".00") > -1) {
                finalResult = parseFloat(finalResult).toFixed(0)
              }

              insertHtmlAtCaret(" = " + finalResult, false)
              setTimeout(() => {
                refDocument.current.focus()
              }, 25)
            }
          } catch (err) {
            insertHtmlAtCaret(" = ERROR", false)
            setTimeout(() => {
              refDocument.current.focus()
            }, 25)
          }
        } else {
          let finalResult = 0

          let lastLineBR = ""

          for (let i = 0; i < splitted.length; i++) {
            try {
              let currentLine = splitted[i]

              if (currentLine.length > 0) {
                currentLine = currentLine.trim()

                if (currentLine.lastIndexOf(" ") > -1) {
                  currentLine = currentLine.substring(
                    currentLine.lastIndexOf(" ") + 1,
                    currentLine.length
                  )
                }

                currentLine = currentLine.replace(/[^0-9.]/g, "")

                finalResult = parseFloat(finalResult) + parseFloat(currentLine)
              }

              if (currentLine !== "" && i === splitted.length - 1) {
                lastLineBR = "<br />"
              }
            } catch (err) {
              //
            }
          }

          try {
            if (isNaN(finalResult)) {
              insertHtmlAtCaret(lastLineBR + "----------<br />ERROR<br />", false)
              setTimeout(() => {
                refDocument.current.focus()
              }, 25)
            } else {
              finalResult = parseFloat(finalResult).toFixed(2)

              if (finalResult.indexOf(".00") > -1) {
                finalResult = parseFloat(finalResult).toFixed(0)
              }

              insertHtmlAtCaret(
                lastLineBR + "----------<br />" + finalResult + "<br />",
                false
              )
              setTimeout(() => {
                refDocument.current.focus()
              }, 25)
            }
          } catch (err) {
            insertHtmlAtCaret(lastLineBR + "----------<br />ERROR<br />", false)
            setTimeout(() => {
              refDocument.current.focus()
            }, 25)
          }
        }
      } else {
        setTimeout(() => {
          refDocument.current.focus()
        }, 25)
      }
    } catch (err) {
      //
    }
  }

  const wordCount = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    try {
      const textPlain = refDocument.current.innerText
      const wordCounter = textPlain.split(" ").filter((n) => {
        return n !== ""
      }).length
      const charCount = textPlain.length
      insertHtmlAtCaret(
        wordCounter + wordCountValue + charCount + charCountValue + "<br />"
      )
      setTimeout(() => {
        refDocument.current.focus()
      }, 25)
    } catch (err) {
      //
    }
  }

  const removeFormat = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    try {
      let selectedText = window.getSelection().toString()
      if (selectedText.length > 0) {
        selectedText = selectedText.replace(/&/gm, "&amp;")
        selectedText = selectedText.replace(/</gm, "&lt;")
        selectedText = selectedText.replace(/>/gm, "&gt;")
        selectedText = selectedText.replace(/ {2}/gm, "&nbsp;&nbsp;")
        selectedText = selectedText.replace(/\n/gm, "<br />")

        try {
          const range = window.getSelection().getRangeAt(0)

          if (
            range.startOffset === 0 &&
            (range.endOffset === 0 ||
              range.endOffset === window.getSelection().toString().length)
          ) {
            let upperNode = range.startContainer

            while (
              upperNode.parentNode !== refDocument.current &&
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

        insertHtmlAtCaret(selectedText, true)
      } else {
        setTimeout(() => {
          refDocument.current.focus()
        }, 25)
      }
    } catch (err) {
      //
    }
  }

  const formatText = (myTag, myParameter) => {
    if (!EDITOR_ENABLED) {
      return
    }

    try {
      const selectedText = window.getSelection().toString()
      const caretPos = getCaretPosition(refDocument.current) - selectedText.length

      if (selectedText.length > 0) {
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
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
          if (isUsingSafari) {
            setCaretPosition(refDocument.current, caretPos)
          }
          refDocument.current.focus()
          dirtyCallback()
          saveUndo(caretPos)
        }, 25)
      } else {
        setTimeout(() => {
          if (isUsingSafari) {
            setCaretPosition(refDocument.current, caretPos)
          }
          refDocument.current.focus()
        }, 25)
      }
    } catch (err) {
      //
    }
  }

  const formatList = (tag1, tag2) => {
    if (!EDITOR_ENABLED) {
      return
    }

    try {
      if (!isDocumentSelected()) {
        return
      }
      const caretPos = getCaretPosition(refDocument.current)

      // PREVENTING NESTED LISTS
      if (
        getParentTag("LI") === null &&
        getParentTag("UL") === null &&
        getParentTag("OL") === null
      ) {
        let selectedText = window.getSelection().toString()
        if (selectedText === "") {
          selectedText = "<br />"
        }

        let convertedContent = ""

        selectedText.split(/\r?\n|\r|\n/g).forEach((line) => {
          convertedContent =
            convertedContent + "<" + tag2 + ">" + (line || " ") + "</" + tag2 + ">"
        })

        convertedContent = "<" + tag1 + ">" + convertedContent + "</" + tag1 + ">"

        insertHtmlAtCaret(convertedContent, false)
      }
      setTimeout(() => {
        if (isUsingSafari) {
          setCaretPosition(refDocument.current, caretPos)
        } else {
          refDocument.current.focus()
        }
      }, 30)
    } catch (err) {
      //
    }
  }

  const checkForEmail = (email) => {
    const re =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const encodeText = (str) => {
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

  // https://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
  const insertHtmlAtCaret = (html, selectPastedContent) => {
    try {
      if (!isDocumentSelected()) {
        return
      }

      const selection = window.getSelection()

      if (selection.getRangeAt && selection.rangeCount) {
        let range = selection.getRangeAt(0)
        range.deleteContents()

        const el = document.createElement("div")
        el.innerHTML = html

        let frag = document.createDocumentFragment(),
          node,
          lastNode

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

        setTimeout(() => {
          dirtyCallback()
          saveUndo()
          scrollToCaret(refDocument.current, 16)
        }, 25)
      }
    } catch (err) {
      //
    }
  }

  const isDocumentSelected = () => {
    try {
      let docFound = false
      let upperNode = window.getSelection().focusNode

      if (upperNode === refDocument.current) {
        docFound = true
      }

      while (upperNode.parentNode) {
        upperNode = upperNode.parentNode

        if (upperNode === refDocument.current) {
          docFound = true
        }
      }

      return docFound
    } catch (err) {
      return false
    }
  }

  const getParentTag = (tagToFind) => {
    try {
      const range = window.getSelection().getRangeAt(0)
      let upperNode = range.startContainer

      if (upperNode === refDocument.current) {
        return null
      }

      while (upperNode.parentNode !== refDocument.current) {
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

  const getCurrentTag = () => {
    let currentNode = null

    try {
      const range = window.getSelection().getRangeAt(0)
      currentNode = range.startContainer
    } catch (err) {
      //
    }

    return currentNode
  }

  const handleBreakline = (event) => {
    try {
      const tagLI = getParentTag("LI")
      const tagUL = getParentTag("UL")
      const tagOL = getParentTag("OL")

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
            if (!handleBreaklineInLink()) {
              addBreakLineAfter(listNode)
              dirtyCallback()
            }
          }
        }
      } else if (tagLI === null) {
        event.preventDefault()
        if (!handleBreaklineInLink()) {
          if (
            isCaretAtEndOfDocument(refDocument.current) &&
            !isLastCharacterBreakline(refDocument.current)
          ) {
            insertHtmlAtCaret("<br /><br />", false)
          } else {
            insertHtmlAtCaret("<br />", false)
          }
        }
      }
    } catch (err) {
      //
    }
  }

  const handleBreaklineInLink = () => {
    try {
      const linkTag = getParentTag("A")

      if (linkTag !== null) {
        if (getCaretCharacterOffsetWithin(linkTag) === linkTag.text.length) {
          addBreakLineAfter(linkTag)
          return true
        }
      }
    } catch (err) {
      //
    }
    return false
  }

  const addBreakLineAfter = (currentNode) => {
    try {
      const tempAnchorEl = document.createElement("br")
      currentNode.parentNode.insertBefore(tempAnchorEl, currentNode.nextSibling)

      let startBefore = true

      if (currentNode.nodeName !== "UL" && currentNode.nodeName !== "OL") {
        startBefore = false
      }

      setTimeout(() => {
        // MOVING THE CARET TO THE BREAKLINE
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
      }, 25)
    } catch (err) {
      //
    }
  }

  const isCaretAtEndOfDocument = (element) => {
    try {
      const range = window.getSelection().getRangeAt(0)
      const preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(element)
      preCaretRange.setEnd(range.endContainer, range.endOffset)
      const caretOffset = preCaretRange.toString().length

      const breaklinesCounter = element.innerText.split(/\r\n|\r|\n/).length - 1

      if (caretOffset + breaklinesCounter === element.innerText.length) {
        return true
      }
    } catch (err) {
      //
    }

    return false
  }

  const isLastCharacterBreakline = (element) => {
    try {
      const breaklinesCounter = element.innerText.split(/\r\n|\r|\n/)
      if (
        breaklinesCounter[breaklinesCounter.length - 1] === "" &&
        breaklinesCounter.length > 1
      ) {
        return true
      }
    } catch (err) {
      //
    }
    return false
  }

  const checkForMisspelledOrURLs = () => {
    checkForURL()
    if (spellcheckerWords.length !== 0) {
      checkForMisspelled()
    }
  }

  const checkForURL = () => {
    try {
      let linkTag = getParentTag("A")

      if (linkTag === null) {
        linkTag = getCurrentTag()
      }

      if (linkTag.nodeName === "A") {
        const finalURL = linkTag.href

        if (typeof finalURL !== "undefined") {
          setSelectedLink(finalURL)
        }
      } else {
        setSelectedLink(null)
      }
    } catch (err) {
      //
    }
  }

  const checkForMisspelled = () => {
    try {
      let misspelledTag = getParentTag("MISSPELLED")

      if (misspelledTag === null) {
        misspelledTag = getCurrentTag()
      }

      if (misspelledTag.nodeName === "MISSPELLED") {
        const finalMisspelled = misspelledTag.textContent

        if (finalMisspelled) {
          if (spellcheckerWords[finalMisspelled]) {
            let suggestions = ""

            for (let i = 0; i < spellcheckerWords[finalMisspelled].length; i++) {
              suggestions =
                suggestions +
                (suggestions.length === 0 ? "" : ", ") +
                spellcheckerWords[finalMisspelled][i]
            }

            if (spellcheckerWords[finalMisspelled].length === 0) {
              setSpellcheckerSuggestions("")
            } else {
              setSpellcheckerSuggestions(suggestions)
            }
          } else {
            setSpellcheckerSuggestions(null)
          }
        }
      } else {
        setSpellcheckerSuggestions(null)
      }
    } catch (err) {
      //
    }
  }

  const saveUndo = (caretPos) => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }

    setTimer(
      setTimeout(() => {
        if (currentContent !== refDocument.current.innerHTML) {
          setUndoContent(currentContent)
          setUndoCaret(caretPos || initialCaret)
          setCurrentContent(refDocument.current.innerHTML)
          setCurrentCaret(getCaretPosition(refDocument.current))
          setInitialCaret(null)
        }
      }, 250)
    )
  }

  // https://stackoverflow.com/questions/3972014/get-contenteditable-caret-position
  const getCaretPosition = (element) => {
    try {
      // CHECKING IF THE CARET IS IN THE DOCUMENT
      if (!isDocumentSelected()) {
        return 0
      }

      const range = window.getSelection().getRangeAt(0)
      const preCaretRange = range.cloneRange()

      preCaretRange.selectNodeContents(element)
      preCaretRange.setEnd(range.endContainer, range.endOffset)

      return preCaretRange.toString().length
    } catch (err) {
      return 0
    }
  }

  // https://gist.github.com/isLishude/6ccd1fbf42d1eaac667d6873e7b134f8
  // https://codepen.io/jeffward/pen/OJjPKYo
  const setCaretPosition = (container, position) => {
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

  // https://stackoverflow.com/questions/47361276/javascript-scroll-to-cursor-post-a-paste-in-contenteditable-div
  const scrollToCaret = (container, offsetTop) => {
    try {
      const currentSelection = saveSelection(container)

      const caretPositionY = getCaretY(container) - container.offsetTop + offsetTop

      if (caretPositionY < 0 || caretPositionY > container.offsetHeight) {
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
        restoreSelection(container, currentSelection)
      }
    } catch (err) {
      //
    }
  }

  // https://stackoverflow.com/questions/6846230/coordinates-of-selected-text-in-browser-page
  const getCaretY = () => {
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
      return 0
    }
  }

  // https://stackoverflow.com/questions/17678843/cant-restore-selection-after-html-modify-even-if-its-the-same-html
  const saveSelection = (containerEl) => {
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
  const restoreSelection = (containerEl, savedSel) => {
    try {
      const doc = containerEl.ownerDocument,
        win = doc.defaultView
      let charIndex = 0,
        range = doc.createRange()
      range.setStart(containerEl, 0)
      range.collapse(true)
      let nodeStack = [containerEl],
        node,
        foundStart = false,
        stop = false

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

  const onKeyDown = (e) => {
    if (!EDITOR_ENABLED) {
      e.preventDefault()
      return
    }

    const KEY_UP = e.key === "ArrowUp"
    const KEY_DOWN = e.key === "ArrowDown"
    const KEY_LEFT = e.key === "ArrowLeft"
    const KEY_RIGHT = e.key === "ArrowRight"
    const KEY_TAB = e.key === "Tab"
    const KEY_ENTER = e.key === "Enter"
    const KEY_UNDO_MAC = e.ctrlKey && e.shiftKey && e.key === "z"
    const KEY_UNDO_WINDOWS = (e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === "z"
    const KEY_REDO_MAC = e.shiftKey && e.metaKey && e.key === "z"
    const KEY_REDO_WINDOWS = e.ctrlKey && e.key === "y"

    if (KEY_UP || KEY_DOWN || KEY_LEFT || KEY_RIGHT) {
      setInitialCaret(getCaretPosition(refDocument.current))
    } else if (KEY_TAB) {
      e.preventDefault()
      if (replaceTabWithSpaces) {
        insertHtmlAtCaret(
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
          false
        )
      } else {
        insertHtmlAtCaret("&#009", false)
      }
      setTimeout(() => {
        refDocument.current.focus()
      }, 25)
    } else if (KEY_ENTER) {
      handleBreakline(e)
    } else if (KEY_UNDO_MAC || KEY_UNDO_WINDOWS) {
      e.preventDefault()
      undo()
    } else if (KEY_REDO_MAC || KEY_REDO_WINDOWS) {
      e.preventDefault()
      redo()
    }
  }

  const onPaste = (e) => {
    try {
      e.preventDefault()

      let text = (e.originalEvent || e).clipboardData.getData("text/plain")

      text = text.replace(/&/gm, "&amp;")
      text = text.replace(/</gm, "&lt;")
      text = text.replace(/>/gm, "&gt;")
      text = text.replace(/ {2}/gm, "&nbsp;&nbsp;")
      text = text.replace(/\n/gm, "<br />")

      refDocument.current.focus()

      insertHtmlAtCaret(text, false)
    } catch (err) {
      //
    }
  }

  // https://stackoverflow.com/questions/16736680/get-caret-index-in-contenteditable-div-including-tags
  const getCaretCharacterOffsetWithin = (element) => {
    try {
      const range = window.getSelection().getRangeAt(0)
      const preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(element)
      preCaretRange.setEnd(range.endContainer, range.endOffset)
      return preCaretRange.toString().length
    } catch (err) {
      return 0
    }
  }

  const onInput = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    saveUndo()
    dirtyCallback()
  }

  const onClick = () => {
    if (!EDITOR_ENABLED) {
      return
    }

    setInitialCaret(getCaretPosition(refDocument.current))
    checkForMisspelledOrURLs()
  }

  React.useEffect(() => {
    if (spellcheckerWorker) {
      const focusAfterSpellcheck = () => {
        setSpellcheckerRunning(false)

        setTimeout(() => {
          setCaretPosition(refDocument.current, spellcheckerCaretPos || 0)
          refDocument.current.focus()
        }, 25)
      }

      spellcheckerWorker.onmessage = (e) => {
        try {
          if (spellcheckerEnded) {
            spellcheckerEnded()
          }

          const misspelledWords = e.data

          setSpellcheckerWords(misspelledWords)

          let originalHTML = refDocument.current.innerHTML

          for (let wordToUnderline in misspelledWords) {
            // REGEX FOR REPLACING MISSPELLED WORDS
            // THAT ARE NOT BETWEEN A TAGS
            const misspelledWordRegExp = new RegExp(
              "\\b(" + wordToUnderline + ")\\b(?!(.(?!<a))*<\\/a>)",
              "gmi"
            )

            originalHTML = originalHTML.replace(misspelledWordRegExp, (word) => {
              return "<misspelled>" + word + "</misspelled>"
            })
          }

          refDocument.current.innerHTML = originalHTML

          focusAfterSpellcheck()
        } catch (err) {
          focusAfterSpellcheck()
        }

        return true
      }

      spellcheckerWorker.onerror = () => {
        if (spellcheckerEnded) {
          spellcheckerEnded()
        }
        focusAfterSpellcheck()
      }

      const wordsToCheck = refDocument.current.innerText.match(
        /[^ ?,.1234567890·!¡¿,`~!@#$%^&*()_|+\-=?;:",.<>{}[\]\\/\s]+/g
      )

      spellcheckerWorker.postMessage({
        lang: spellcheckerLanguage,
        words: wordsToCheck,
        suggestions: spellcheckerMaxSuggestions,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spellcheckerWorker])

  React.useEffect(() => {
    if (forceFocus > 0) {
      refDocument.current?.focus()
      if (isUsingSafari && caretBeforeSaving) {
        setTimeout(() => {
          setCaretPosition(refDocument.current, caretBeforeSaving)
          setCaretBeforeSaving(null)
        }, 25)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceFocus])

  React.useEffect(() => {
    if (focusOnMount) {
      setTimeout(() => {
        refDocument.current?.focus()
      }, 50)
    }
    if (refDocument.current) {
      refDocument.current.innerHTML = typeof content === "string" ? content : ""
      setCurrentContent(refDocument.current.innerHTML)
      setCurrentCaret(0)
    }

    const styleNode = document.createElement("style")
    const styleText = `
      .TinyDOCDocument {white-space:pre-wrap;word-break:break-word}
      .TinyDOCDocument a{text-decoration:underline;color:${
        linkColor ? linkColor + "} " : "#3A76B1} "
      }
      .TinyDOCMenuItem:hover{background-color:#E3E3E3 !important;border:thin solid #D3D3D3 !important;cursor:pointer !important}
      .TinyDOCDocument::-webkit-scrollbar{height:12px;width:5px;background:#FFFFFF}
      .TinyDOCDocument::-webkit-scrollbar-thumb{background:#C8C8C8;-webkit-border-radius:1ex;-webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75)}
      .TinyDOCDocument::-webkit-scrollbar-corner{background:#C8C8C8}
      .TinyDOCSpellcheckerEnabled{background-color:#E3E3E3 !important;border:thin solid #D3D3D3 !important;cursor:pointer !important}
      @media (pointer: coarse) { .TinyDOCMenuItem:hover{background-color:#F2F2F2 !important;border:thin solid #F2F2F2 !important} }
      misspelled{text-decoration:underline;text-decoration-color:red;text-decoration-thickness:2px;text-decoration-style:dotted}
    `
    const styleTextNode = document.createTextNode(styleText)
    styleNode.appendChild(styleTextNode)
    document.getElementsByTagName("head")[0].appendChild(styleNode)

    const ctrlCharChecker = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "s" || e.key === "S") &&
        useCtrlSForSaving
      ) {
        e.preventDefault()
        if (document.activeElement === refDocument.current) {
          refDocument.current.blur()
        }
        save()
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "p" || e.key === "P") &&
        !isMobileDevice &&
        useCtrlPForPrinting
      ) {
        e.preventDefault()
        print()
      }
    }

    document.addEventListener("keydown", ctrlCharChecker)

    return () => {
      document.getElementsByTagName("head")[0].removeChild(styleNode)
      document.removeEventListener("keydown", ctrlCharChecker)

      if (spellcheckerWorker) {
        spellcheckerWorker.terminate()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={styles.container}>
      <div style={styles.toolbar}>
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onMouseDown={save}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M896 960h-896v-1024h1024v896zM512 832h128v-256h-128v256zM896 64h-768v768h64v-320h576v320h75l53 -53v-715z"
                transform="translate(-10 930) scale(-1,1) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div style={styles.separator}></div>
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onClick={print}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M256 896h512v-128h-512v128zM960 704h-896q-26 0 -45 -19t-19 -45v-320q0 -26 19 -45t45 -19h192v-256h512v256h192q26 0 45 19t19 45v320q0 26 -19 45t-45 19zM704 64h-384v320h384v-320zM974 608q0 -19 -13.5 -32.5t-32.5 -13.5t-32.5 13.5t-13.5 32.5t13.5 32.5
                  t32.5 13.5t32.5 -13.5t13.5 -32.5z"
                transform="translate(0 930) scale(-0.97,0.97) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div style={styles.separator}></div>
        {spellcheckerEnabled && (
          <>
            <div
              style={styles.button}
              className={
                SPELLCHECKER_ENABLED
                  ? "TinyDOCSpellcheckerEnabled"
                  : EDITOR_ENABLED
                    ? "TinyDOCMenuItem"
                    : undefined
              }
              onMouseDown={spellcheck}
            >
              <div style={styles.iconWrapper}>
                <svg width="16" height="16" viewBox="0 0 1000 1000">
                  <path
                    d="M128 704h128v-192h64v384q0 26 -19 45t-45 19h-128q-26 0 -45 -19t-19 -45v-384h64v192zM128 896h128v-128h-128v128zM960 896v64h-192q-26 0 -45 -19t-19 -45v-320q0 -26 19 -45t45 -19h192v64h-192v320h192zM640 800v96q0 26 -19 45t-45 19h-192v-448h192q26 0 45 19
            t19 45v96q0 26 -9 45t-35 19q26 0 35 19t9 45zM576 576h-128v128h128v-128zM576 768h-128v128h128v-128zM832 384l-416 -448l-224 288l82 70l142 -148l352 302z"
                    transform="translate(0 930) scale(-0.97,0.97) rotate(180)"
                  />
                </svg>
              </div>
            </div>
            <div style={styles.separator}></div>
          </>
        )}
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onMouseDown={undo}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M762 -64q43 77 62 168t-9 168t-113.5 127.5t-253.5 46.5v-254l-384 384l384 384v-248q201 5 314.5 -73t148.5 -196t-4.5 -255.5t-144.5 -251.5z"
                transform="translate(0 930) scale(-1,1) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onMouseDown={redo}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M576 712v248l384 -384l-384 -384v254q-168 4 -253.5 -46.5t-113.5 -127.5t-9 -168t62 -168q-105 114 -144.5 251.5t-4.5 255.5t148.5 196t314.5 73v0z"
                transform="translate(0 930) scale(-1,1) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div style={styles.separator}></div>
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onMouseDown={bold}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M708 475q28 34 44 76t16 89q0 53 -20 99.5t-55 81.5t-81.5 55t-99.5 20h-320v-896h384q53 0 99.5 20t81.5 55t55 81.5t20 99.5q0 70 -34 128t-90 91zM384 768h101q42 0 72 -37.5t30 -90.5t-30 -90.5t-71 -37.5h-102v256zM543 128h-159v256h159q44 0 75 -37.5t31 -90.5
                  t-31 -90.5t-75 -37.5z"
                transform="translate(0 945) scale(-1,1) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onMouseDown={italic}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M896 896v-64h-128l-320 -768h128v-64h-448v64h128l320 768h-128v64h448z"
                transform="translate(0 945) scale(-1,1) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onMouseDown={underline}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M704 896h128v-416q0 -60 -25 -112.5t-68.5 -91.5t-102 -61.5t-124.5 -22.5t-124.5 22.5t-102 61.5t-68.5 91.5t-25 112.5v416h128v-416q0 -30 13.5 -58t37.5 -51q28 -24 64.5 -37.5t76.5 -13.5t76.5 13.5t64.5 37.5q24 23 37.5 51t13.5 58v416zM192 128h640v-128h-640
                  v128z"
                transform="translate(0 945) scale(-1,1) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onMouseDown={strikethrough}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M731 443q48 -36 74.5 -85t26.5 -102t-26.5 -102t-74.5 -85q-44 -33 -100.5 -51t-118.5 -18t-118.5 18t-100.5 51q-48 36 -74.5 85t-26.5 102h128q0 -52 57 -90t135 -38t135 38t57 90t-57 90t-135 38q-62 0 -118.5 18t-100.5 51q-48 36 -74.5 85t-26.5 102t26.5 102
                  t74.5 85q44 33 100.5 51t118.5 18t118.5 -18t100.5 -51q48 -36 74.5 -85t26.5 -102h-128q0 52 -57 90t-135 38t-135 -38t-57 -90t57 -90t135 -38q62 0 118.5 -18t100.5 -51v0zM0 448h1024v-64h-1024v64z"
                transform="translate(0 945) scale(-1,1) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div style={styles.separator}></div>
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onMouseDown={bullets}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M384 896h640v-128h-640v128zM384 512h640v-128h-640v128zM384 128h640v-128h-640v128zM0 832q0 53 37.5 90.5t90.5 37.5t90.5 -37.5t37.5 -90.5t-37.5 -90.5t-90.5 -37.5t-90.5 37.5t-37.5 90.5zM0 448q0 53 37.5 90.5t90.5 37.5t90.5 -37.5t37.5 -90.5t-37.5 -90.5
                  t-90.5 -37.5t-90.5 37.5t-37.5 90.5zM0 64q0 53 37.5 90.5t90.5 37.5t90.5 -37.5t37.5 -90.5t-37.5 -90.5t-90.5 -37.5t-90.5 37.5t-37.5 90.5z"
                transform="translate(0 930) scale(-0.97,0.97) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onMouseDown={numbers}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M384 128h640v-128h-640v128zM384 512h640v-128h-640v128zM384 896h640v-128h-640v128zM192 960v-256h-64v192h-64v64h128zM128 434v-50h128v-64h-192v146l128 60v50h-128v64h192v-146zM256 256v-320h-192v64h128v64h-128v64h128v64h-128v64h192z"
                transform="translate(-50 930) scale(-0.97,0.97) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onMouseDown={highlight}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M739 627l-502 -502h-186v185l503 503l185 -186v0zM803 688l-185 186l67 67q17 17 38.5 17t38.5 -17l108 -109q17 -17 17 -38.5t-17 -38.5l-67 -67v0zM42 0"
                transform="translate(0 930) scale(-0.97,0.97) rotate(180)"
              />
              <path
                fill="#FFFF00"
                d="M-739 627l-502 -17 17 -38.5t-17 -38.5l-67 -67v0zM42 48h940v-112h-940v112v0z"
                transform="translate(0 930) scale(-0.97,0.97) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onMouseDown={link}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M320 256q13 -13 32.5 -12.5t33.5 14.5l316 316q14 14 14.5 33.5t-12.5 32.5t-32.5 12.5t-33.5 -14.5l-316 -316q-14 -14 -14.5 -33.5t12.5 -32.5zM477 285q3 -7 5 -14.5t2 -15.5q0 -13 -5 -25t-14 -21l-163 -163q-10 -10 -22 -14.5t-25 -4.5t-25 4.5t-21 14.5l-99 99
                  q-10 9 -14.5 21t-4.5 25t4.5 25t14.5 21l163 164q9 9 21 14t25 5q8 0 15.5 -2t14.5 -5l65 65q-21 16 -45.5 24t-49.5 8q-30 0 -58.5 -11t-51.5 -34l-163 -163q-46 -46 -46 -111t46 -110l99 -99q23 -23 51.5 -34.5t58.5 -11.5t59 11.5t52 34.5l163 163q42 42 45 100.5
                  t-32 104.5l-65 -65v0zM978 815l-99 99q-23 23 -51.5 34.5t-58.5 11.5t-59 -11.5t-51 -34.5l-164 -163q-42 -42 -45 -100.5t32 -104.5l65 65q-3 7 -5 14.5t-2 15.5q0 13 5 25t14 21l163 163q10 10 22 14.5t25 4.5t25 -4.5t21 -14.5l99 -99q10 -9 14.5 -21t4.5 -25t-4.5 -25
                  t-14.5 -21l-163 -164q-9 -9 -21 -14t-25 -5q-8 0 -15.5 2t-14.5 5l-65 -65q21 -16 45.5 -24t49.5 -8q30 0 58.5 11t51.5 34l163 164q46 45 46 110t-46 110z"
                transform="translate(0 930) scale(-0.97,0.97) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div style={styles.separator}></div>
        {template1 && (
          <div
            style={styles.button}
            className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
            onMouseDown={insertTemplate1}
          >
            <div style={styles.iconWrapper}>
              <svg width="16" height="16" viewBox="0 0 1000 1000">
                <path
                  d="M384 768h128v-64h-128v64zM576 768h128v-64h-128v64zM896 768v-256h-192v64h128v128h-64v64h128zM320 576h128v-64h-128v64zM512 576h128v-64h-128v64zM192 704v-128h64v-64h-128v256h192v-64h-128zM384 384h128v-64h-128v64zM576 384h128v-64h-128v64zM896 384v-256
                    h-192v64h128v128h-64v64h128zM320 192h128v-64h-128v64zM512 192h128v-64h-128v64zM192 320v-128h64v-64h-128v256h192v-64h-128zM960 896h-896v-896h896v896zM1024 960v0v-1024h-1024v1024h1024z"
                  transform="translate(0 915) scale(-0.97,0.97) rotate(180)"
                />
              </svg>
            </div>
          </div>
        )}
        {template2 && (
          <div
            style={styles.button}
            className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
            onMouseDown={insertTemplate2}
          >
            <div style={styles.iconWrapper}>
              <svg width="16" height="16" viewBox="0 0 1000 1000">
                <path
                  d="M384 768h128v-64h-128v64zM576 768h128v-64h-128v64zM896 768v-256h-192v64h128v128h-64v64h128zM320 576h128v-64h-128v64zM512 576h128v-64h-128v64zM192 704v-128h64v-64h-128v256h192v-64h-128zM384 384h128v-64h-128v64zM576 384h128v-64h-128v64zM896 384v-256
                    h-192v64h128v128h-64v64h128zM320 192h128v-64h-128v64zM512 192h128v-64h-128v64zM192 320v-128h64v-64h-128v256h192v-64h-128zM960 896h-896v-896h896v896zM1024 960v0v-1024h-1024v1024h1024z"
                  transform="translate(0 915) scale(-0.97,0.97) rotate(180)"
                />
              </svg>
            </div>
          </div>
        )}
        {template3 && (
          <div
            style={styles.button}
            className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
            onMouseDown={insertTemplate3}
          >
            <div style={styles.iconWrapper}>
              <svg width="16" height="16" viewBox="0 0 1000 1000">
                <path
                  d="M384 768h128v-64h-128v64zM576 768h128v-64h-128v64zM896 768v-256h-192v64h128v128h-64v64h128zM320 576h128v-64h-128v64zM512 576h128v-64h-128v64zM192 704v-128h64v-64h-128v256h192v-64h-128zM384 384h128v-64h-128v64zM576 384h128v-64h-128v64zM896 384v-256
                    h-192v64h128v128h-64v64h128zM320 192h128v-64h-128v64zM512 192h128v-64h-128v64zM192 320v-128h64v-64h-128v256h192v-64h-128zM960 896h-896v-896h896v896zM1024 960v0v-1024h-1024v1024h1024z"
                  transform="translate(0 915) scale(-0.97,0.97) rotate(180)"
                />
              </svg>
            </div>
          </div>
        )}
        {(template1 || template2 || template3) && (
          <div style={styles.separator}></div>
        )}
        {calcEnabled && (
          <>
            <div
              style={styles.button}
              className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
              onMouseDown={calc}
            >
              <div style={styles.iconWrapper}>
                <svg width="16" height="16" viewBox="0 0 512.001 512.001">
                  <path
                    d="M403.432,0H108.57C86.583,0,68.695,17.887,68.695,39.874v432.253c0,21.987,17.887,39.874,39.874,39.874h294.862
      c21.987,0,39.874-17.887,39.874-39.874V39.874C443.305,17.887,425.417,0,403.432,0z M424.297,472.127h-0.001
      c0,11.505-9.36,20.865-20.865,20.865H108.57c-11.505,0-20.865-9.36-20.865-20.865V39.874c0-11.505,9.36-20.865,20.865-20.865
      h294.862c11.505,0,20.865,9.36,20.865,20.865V472.127z"
                  />
                  <path
                    d="M382.1,51.081H129.901c-5.25,0-9.504,4.255-9.504,9.504v82.322c0,5.249,4.254,9.504,9.504,9.504H382.1
      c5.25,0,9.504-4.255,9.504-9.504V60.585C391.604,55.336,387.349,51.081,382.1,51.081z M372.596,133.403h-233.19V70.089h233.19
      V133.403z"
                  />
                  <path
                    d="M185.115,181.553h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214
      c5.25,0,9.504-4.255,9.504-9.504v-59.335C194.62,185.809,190.366,181.553,185.115,181.553z M175.611,240.889h-36.205v-40.327
      h36.205V240.889z"
                  />
                  <path
                    d="M185.115,283.696h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214
      c5.25,0,9.504-4.255,9.504-9.504v-59.335C194.62,287.952,190.366,283.696,185.115,283.696z M175.611,343.032h-36.205v-40.327
      h36.205V343.032z"
                  />
                  <path
                    d="M185.115,385.84h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214
      c5.25,0,9.504-4.255,9.504-9.504v-59.335C194.62,390.095,190.366,385.84,185.115,385.84z M175.611,445.175h-36.205v-40.327h36.205
      V445.175z"
                  />
                  <path
                    d="M283.608,181.553h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214
      c5.25,0,9.504-4.255,9.504-9.504v-59.335C293.112,185.809,288.857,181.553,283.608,181.553z M274.103,240.889h-36.205v-40.327
      h36.205V240.889z"
                  />
                  <path
                    d="M283.608,283.696h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214
      c5.25,0,9.504-4.255,9.504-9.504v-59.335C293.112,287.952,288.857,283.696,283.608,283.696z M274.103,343.032h-36.205v-40.327
      h36.205V343.032z"
                  />
                  <path
                    d="M283.608,385.84h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504h55.214
      c5.25,0,9.504-4.255,9.504-9.504v-59.335C293.112,390.095,288.857,385.84,283.608,385.84z M274.103,445.175h-36.205v-40.327
      h36.205V445.175z"
                  />
                  <path
                    d="M382.1,181.553h-55.214c-5.25,0-9.504,4.255-9.504,9.504v59.335c0,5.249,4.254,9.504,9.504,9.504H382.1
      c5.25,0,9.504-4.255,9.504-9.504v-59.335C391.604,185.809,387.349,181.553,382.1,181.553z M372.596,240.889H336.39v-40.327h36.205
      V240.889z"
                  />
                  <path
                    d="M382.1,283.696h-55.214c-5.25,0-9.504,4.255-9.504,9.504V454.68c0,5.249,4.254,9.504,9.504,9.504H382.1
      c5.25,0,9.504-4.255,9.504-9.504V293.201C391.604,287.952,387.349,283.696,382.1,283.696z M372.596,445.175H336.39v-142.47h36.205
      V445.175z"
                  />
                </svg>
              </div>
            </div>
            <div style={styles.separator}></div>
          </>
        )}
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onMouseDown={wordCount}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M0 480h1024v-64h-1024v64zM304 912v-339h-67v272h-67v67h134zM445 694v-54h134v-67h-201v153l134 64v55h-134v67h201v-154zM854 912v-339h-204v67h137v67h-137v71h137v67h-137v67h204zM115 166q3 44 29.5 64t79.5 20q29 0 50.5 -7t35.5 -19q15 -12 20.5 -28t5.5 -42v-112
                q0 -20 1 -26t9 -16h-74q-2 7 -3 9.5t-3 9.5q-17 -14 -33 -19.5t-38 -5.5q-41 0 -65 21.5t-24 54.5q0 34 23 53.5t76 26.5l38 7q12 2 17.5 5.5t5.5 10.5q0 9 -10 15.5t-29 6.5t-30.5 -7t-14.5 -22h-67v0zM262 115q-4 -2 -10 -4t-15 -2l-26 -7q-19 -4 -28.5 -11.5t-9.5 -16.5
                q0 -12 9 -19t26 -7t31 7.5t23 24.5v35v0zM390 336h74v-112q17 12 32.5 17t34.5 5q48 0 77 -34.5t29 -89.5q0 -58 -30.5 -96.5t-78.5 -38.5q-24 0 -38.5 8t-28.5 27v-28h-71v342v0zM461 122q0 -32 14.5 -51.5t36.5 -19.5t36.5 19.5t14.5 51.5q0 33 -13.5 51.5t-37.5 18.5
                q-22 0 -36.5 -19.5t-14.5 -50.5zM851 154q-2 16 -13.5 25.5t-31.5 9.5q-24 0 -37.5 -18.5t-13.5 -52.5q0 -36 13.5 -54.5t37.5 -18.5q20 0 31.5 10t13.5 31l71 -3q-8 -45 -39.5 -70.5t-79.5 -25.5q-55 0 -88 35.5t-33 92.5q0 60 33.5 95.5t90.5 35.5q48 0 79 -25t33 -71h-67
                v4z"
                transform="translate(-10 930) scale(-1,1) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div style={styles.separator}></div>
        <div
          style={styles.button}
          className={EDITOR_ENABLED ? "TinyDOCMenuItem" : undefined}
          onMouseDown={removeFormat}
        >
          <div style={styles.iconWrapper}>
            <svg width="16" height="16" viewBox="0 0 1000 1000">
              <path
                d="M0 64h576v-128h-576v128zM192 960h704v-128h-704v128zM277 128l205 784l124 -32l-196 -752h-133zM930 -64l-130 130l-130 -130l-62 62l130 130l-130 130l62 62l130 -130l130 130l62 -62l-130 -130l130 -130z"
                transform="translate(0 915) scale(-0.97,0.97) rotate(180)"
              />
            </svg>
          </div>
        </div>
        <div style={styles.separator}></div>
        {selectedLink && (
          <div style={styles.linkWrapper}>
            <a
              href={selectedLink}
              style={{ color: linkColor ? linkColor : "#3A76B1", ...styles.linkTag }}
              target="_blank"
              rel="noreferrer"
            >
              {selectedLink}
            </a>
          </div>
        )}
        {!selectedLink && spellcheckerSuggestions === "" && (
          <div style={styles.suggestionsEmptyWrapper}>
            {spellcheckerNoSuggestions}
          </div>
        )}
        {!selectedLink &&
          spellcheckerSuggestions !== "" &&
          spellcheckerSuggestions && (
            <div style={styles.suggestionsWrapper}>{spellcheckerSuggestions}</div>
          )}
      </div>
      <div
        ref={refDocument}
        style={{
          height: height - 41,
          ...styles.document,
        }}
        className="TinyDOCDocument"
        contentEditable={EDITOR_ENABLED ? true : false}
        spellCheck={!spellcheckerEnabled}
        suppressContentEditableWarning
        onKeyDown={onKeyDown}
        onKeyUp={checkForMisspelledOrURLs}
        onPaste={onPaste}
        onInput={onInput}
        onClick={onClick}
        onContextMenu={onClick}
      ></div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: "#FFF",
  },
  toolbar: {
    display: "flex",
    height: "40px",
    overflow: "hidden",
    backgroundColor: "#F2F2F2",
    borderBottom: "thin solid #D3D3D3",
  },
  button: {
    backgroundColor: "#F2F2F2",
    border: "thin solid #F2F2F2",
    display: "block",
    fontSize: "15px",
    lineHeight: "24px",
    height: "32px",
    width: "32px",
    marginLeft: "3px",
    marginTop: "3px",
    marginRight: "3px",
    cursor: "default",
    userSelect: "none",
    WebkitUserSelect: "none",
  },
  iconWrapper: {
    marginLeft: "8px",
    marginTop: "7px",
  },
  separator: {
    float: "left",
    borderLeft: "thin solid #D3D3D3",
    marginLeft: "1px",
    height: "40px",
    width: "1px",
  },
  document: {
    display: "block",
    padding: "8px",
    outline: "none",
    color: "#000000",
    backgroundColor: "#FFFFFF",
    fontSize: "16px",
    lineHeight: "1.3",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  linkWrapper: {
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    marginLeft: "11px",
    cursor: "default",
    userSelect: "none",
    WebkitUserSelect: "none",
    width: "1px",
    whiteSpace: "nowrap",
  },
  linkTag: {
    textDecoration: "none",
  },
  suggestionsWrapper: {
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    marginLeft: "11px",
    cursor: "default",
    userSelect: "none",
    WebkitUserSelect: "none",
    width: "1px",
    whiteSpace: "nowrap",
  },
  suggestionsEmptyWrapper: {
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    marginLeft: "11px",
    cursor: "default",
    userSelect: "none",
    WebkitUserSelect: "none",
    width: "1px",
    whiteSpace: "nowrap",
    color: "gray",
  },
}

export default TinyDOC
