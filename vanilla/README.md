# TinyDOC in Vanilla JavaScript

TinyDOC is a WYSIWYG Editor. The idea of this project is to provide a lightweight text editor with simple and easy-to-use features without **execCommand**.

![alt screenshot](https://github.com/lrusso/tinyDOC/blob/main/tinyDOC.png)

## Web:

https://lrusso.github.io/tinyDOC/vanilla/tinyDOC.htm

## How to use it

```javascript
const myEditor = new TinyDOC({
              container: document.getElementById("myTestContainer"), 
              content: "Hello world",
              saveCallback: () => {console.log("saveCallback")},
              dirtyCallback: () => {console.log("dirtyCallback")},
              template1: "My Template 1",
              template2: "My Template 2",
              template3: "My Template 3",
              calcEnabled: true,
              useCtrlSForSaving: true,
              useCtrlPForPrinting: true,
              replaceTabWithSpaces: true,
              linkColor: "#3A76B1",
              spellcheckerEnabled: true,
              spellcheckerStarted: () => {console.log("spellcheckerStarted")},
              spellcheckerEnded: () => {console.log("spellcheckerEnded")},
              spellcheckerLanguage: "en-US",
              spellcheckerURL: "spellchecker.js",
              spellcheckerNoSuggestions: "(No suggestions)",
              spellcheckerMaxSuggestions: 5
              })
```

## Methods

| METHOD | DETAILS |
| :---------------| :----- |
| new | Deletes the document content. | 
| print | Prints the document content. |
| save | Executes the save function. |
| focus | Focus the document. |
| enable | Enables the document. |
| disable | Disables the document. |
| resize | Resizes the document to fit the container. |
| scrollToTop | Scrolls to the top of the document. |
| getText | Returns the document content. |

## Calc Button - Single Line Evaluation

**SAMPLE TEXT**

```
lorem ipsum (5.40+4.70-3.90)*2/1 lorem ipsum
```

Select ```(5.40+4.70-3.90)*2/1```, then click on the Calc Button and the result will be inserted next to the selected text.

## Calc Button - Multi Line Addition Operation

**SAMPLE TEXT**

```
$ 100.10
$ 200.20
$ 300.30
```

Select all, then click on the Calc Button and the result will be inserted below to the selected text.

## Suggested spellchecker:

https://github.com/lrusso/JavaScriptSpellchecker
