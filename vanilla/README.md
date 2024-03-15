# TinyDOC 2 Editor 

TinyDOC 2 Editor is a HTML5 Rich Text Editor. The idea of this project is to provide a lightweight text editor with simple and easy-to-use features without **execCommand**.

![alt screenshot](https://raw.githubusercontent.com/lrusso/tinyDOC2/master/tinyDOC2.png)

## Web

https://lrusso.github.io/tinyDOC2/tinyDOC2.htm

## TinyDOC 2 Configuration

| # | SETTING | DETAILS |
| :------------ |:---------------| :----- |
| 1 | container | The document container. | 
| 2 | documentText | The default text. |
| 3 | saveFunction | The save function. |
| 4 | spellcheckerEnabled | Boolean. |
| 5 | spellcheckerLanguage | Spellchecker Language. |
| 6 | spellcheckerURL | Spellchecker URL. |
| 7 | spellcheckerNoSuggestionsLabel | No suggestions String. |
| 8 | template1 | HTML template. |
| 9 | template2 | HTML template. |
| 10 | template3 | HTML template. |

**Example without a spellchecker:**
```javascript
new tinyDOC2({
              container: document.getElementById("myTestContainer"), 
              documentText: "Hello world",
              saveFunction: () => {alert("saveFunction")},
              template1: "My Template 1",
              template2: "My Template 2",
              template3: "My Template 3"
              })
```

**Example with a spellchecker:**
```javascript
new tinyDOC2({
              container: document.getElementById("myTestContainer"), 
              documentText: "Hello world",
              saveFunction: () => {alert("saveFunction")},
              template1: "My Template 1",
              template2: "My Template 2",
              template3: "My Template 3",
              spellcheckerEnabled: true,
              spellcheckerLanguage: "en-US",
              spellcheckerURL: "JavaScriptSpellchecker.js",
              spellcheckerNoSuggestionsLabel: "(No suggestions)"
              })
```

## TinyDOC 2 Methods

| # | METHOD | DETAILS |
| :------------ |:---------------| :----- |
| 1 | new | Deletes the document content. | 
| 2 | print | Prints the document content. |
| 3 | save | Executes the save function. |
| 4 | focus | Focus the document. |
| 5 | enable | Enables the document. |
| 6 | disable | Disables the document. |
| 7 | resize | Resizes the document to fit the container. |
| 8 | scrollToTop | Scrolls to the top of the document. |
| 9 | clearUndoRedo | Clears all the undo/redo history. |
| 10 | getText(boolean) | Returns the document content with or without encoding. |
| 11 | showPleaseWait(boolean) | Hides or shows a please wait screen. |

## Accessing the ContentEditable Div used by TinyDOC 2

```javascript
let myExample = new tinyDOC2({ container: document.getElementById("myTestContainer") })
myExample.document.scrollTop = 0
```

## Calc Button Sample 1 - Single Line Evaluation

```
lorem ipsum (5.40+4.70-3.90)*2/1 lorem ipsum
```
Select (5.40+4.70-3.90)*2/1, then click in the Calc Button, and the result will be inserted next to the selected text.

```
lorem ipsum (5.40+4.70-3.90)*2/1 = 12.40 lorem ipsum
```

## Calc Button Sample 2 - Multi Line Addition Operation

```
$ 100.10
$ 200.20
$ 300.30
```

Select all, then click in the Calc Button, and the result will be inserted below to the selected text.

```
$ 100.10
$ 200.20
$ 300.30
----------
600.60
```

## Suggested spellchecker:

https://github.com/lrusso/JavaScriptSpellchecker
