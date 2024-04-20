# TinyDOC in React

TinyDOC is a WYSIWYG Editor. The idea of this project is to provide a lightweight text editor with simple and easy-to-use features without **execCommand**.

![alt screenshot](https://github.com/lrusso/tinyDOC/blob/main/tinyDOC.png)

## How to use it

```javascript
const [forceFocusCounter, setForceFocusCounter] = React.useState(0)

return (<TinyDOC
   content="Hello world"
   height={480}
   enabled
   saveCallback={() => {console.log("saveCallback")}
   focusOnMount
   forceFocus={forceFocusCounter}
   dirtyCallback={() => {console.log("dirtyCallback")}
   template1="My Template 1"
   template2="My Template 2"
   template3="My Template 3"
   calcEnabled
   useCtrlSForSaving
   useCtrlPForPrinting
   wordCountValue="words"
   charCountValue="characters"
   spellcheckerEnabled
   spellcheckerStarted={() => {console.log("spellcheckerStarted")}
   spellcheckerEnded={() => {console.log("spellcheckerEnded")}
   spellcheckerLanguage="en-US"
   spellcheckerURL="spellchecker.js"
   spellcheckerNoSuggestions="(No suggestions)"
   spellcheckerMaxSuggestions={5}
   linkColor="#ff0000"
   replaceTabWithSpaces
/>)
```

## Calc Button Sample 1 - Single Line Evaluation

**SAMPLE TEXT**

```
lorem ipsum (5.40+4.70-3.90)*2/1 lorem ipsum
```

Select ```(5.40+4.70-3.90)*2/1```, then click on the Calc Button and the result will be inserted next to the selected text.

## Calc Button Sample 2 - Multi Line Addition Operation

**SAMPLE TEXT**

```
$ 100.10
$ 200.20
$ 300.30
```

Select all, then click on the Calc Button and the result will be inserted below to the selected text.

## Suggested spellchecker:

https://github.com/lrusso/JavaScriptSpellchecker
