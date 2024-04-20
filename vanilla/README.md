# TinyDOC in Vanilla JavaScript

TinyDOC is a WYSIWYG Editor. The idea of this project is to provide a lightweight text editor with simple and easy-to-use features without **execCommand**.

![alt screenshot](https://github.com/lrusso/tinyDOC/blob/main/tinyDOC.png)

## Web:

https://lrusso.github.io/tinyDOC/vanilla/tinyDOC.htm

## TinyDOC Settings:

| # | SETTING | DETAILS |
| :------------ |:---------------| :----- |
| 1 | container | The document container. | 
| 2 | documentText | The default text. |
| 3 | saveFunction | The save function. |
| 4 | calcEnabled | Boolean. |
| 5 | spellcheckerEnabled | Boolean. |
| 6 | spellcheckerLanguage | Spellchecker Language. |
| 7 | spellcheckerURL | Spellchecker URL. |
| 8 | spellcheckerNoSuggestionsLabel | No suggestions String. |
| 9 | template1 | HTML template. |
| 10 | template2 | HTML template. |
| 11 | template3 | HTML template. |

**Example without the spellchecker:**

```javascript
new TinyDOC({
              container: document.getElementById("myTestContainer"), 
              documentText: "Hello world",
              saveFunction: () => {alert("saveFunction")},
              template1: "My Template 1",
              template2: "My Template 2",
              template3: "My Template 3"
              })
```

**Example with the spellchecker:**

```javascript
new TinyDOC({
              container: document.getElementById("myTestContainer"), 
              documentText: "Hello world",
              saveFunction: () => {alert("saveFunction")},
              template1: "My Template 1",
              template2: "My Template 2",
              template3: "My Template 3",
              spellcheckerEnabled: true,
              spellcheckerLanguage: "en-US",
              spellcheckerURL: "spellchecker.js",
              spellcheckerNoSuggestionsLabel: "(No suggestions)"
              })
```

## TinyDOC methods:

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

## Accessing the ContentEditable Div used by TinyDOC

```javascript
const myEditor = new TinyDOC({ container: document.getElementById("myTestContainer") })
myEditor.document.scrollTop = 0
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
