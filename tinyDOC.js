var userLanguage = window.navigator.userLanguage || window.navigator.language;

var STRING_ERROR = "";
var STRING_SAVED = "";
var STRING_NOTFOUND = "";
var STRING_WELCOME = "";
var STRING_CLICKURL = "";
var STRING_FIND = "";
var STRING_REPLACEWITH = "";

var FIND_STRING = null;
var FIND_FOUND = false;
var FIND_FOUND_FIRST = null;
var FIND_INITIAL_INDEX = null;
var FIND_REPLACEWITH = null;

var LINK_FOUND = false;

var NOTIFICATION_TIMER;

if (userLanguage.substring(0,2)=="es")
	{
	STRING_ERROR = "Error al guardar.";
	STRING_SAVED = "Documento guardado.";
	STRING_NOTFOUND = "Texto no encontrado.";
	STRING_WELCOME = "Bienvenido a <b>TinyDOC Editor</b> por Leonardo Russo / <a href='https://www.lrusso.com'>www.lrusso.com</a><br/><br/>Este es un editor WYSIWYG (<span style='background-color: rgb(255, 255, 0);'>What You See Is What You Get</span>) desarrollado en <b>HTML5</b> con funciones intencionalmente limitadas, tales como:<br/><ul><li>Guardar e Imprimir.</li><li>Deshacer y Rehacer.</li><li>Buscar y Reemplazar.</li><li>Funci&oacute;n para plantillas.</li><li>Herramientas de formato simplificadas.</li></ul>La idea de este proyecto es la de brindar un editor de textos liviano con funciones sencillas e intuitivas.<ol><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li><li>Sed in pellentesque eros, id luctus purus.</li><li>Curabitur gravida posuere lorem, eget finibus odio vehicula at.</li><li>Phasellus nisi diam, laoreet non enim at, lacinia egestas justo.</li></ol>Pellentesque bibendum metus vel interdum dignissim. Sed tempor augue eu felis elementum tincidunt. Cras ac ante id elit viverra hendrerit in vitae quam. Ut varius, ligula in volutpat tempus, enim nunc volutpat dolor, nec ultrices arcu lorem quis metus. Nulla pharetra dignissim vestibulum. Aliquam auctor tortor sodales, vehicula purus vel, tristique nibh. Aenean in mi purus. Phasellus consectetur leo enim, id rutrum leo egestas nec. <span style='background-color: rgb(255, 255, 0);'>Praesent fermentum, eros quis vehicula semper, nisi quam aliquam elit</span>, in consequat nulla ante quis tellus. Mauris ultrices dui et turpis semper, ac viverra lacus interdum. In aliquam est eu leo placerat vulputate. Praesent imperdiet sit amet libero eget ullamcorper.";
	STRING_CLICKURL = "HAGA CLICK AQU&Iacute; PARA ABRIR EL LINK";
	STRING_FIND = "Buscar...";
	STRING_REPLACEWITH = "Reemplazar con...";
	}
	else
	{
	STRING_ERROR = "Error while saving.";
	STRING_SAVED = "Document saved.";
	STRING_NOTFOUND = "Text not found.";
	STRING_WELCOME = "Welcome to <b>TinyDOC Editor</b> by Leonardo Russo / <a href='https://www.lrusso.com'>www.lrusso.com</a><br/><br/>This is a WYSIWYG (<span style='background-color: rgb(255, 255, 0);'>What You See Is What You Get</span>) editor developed in <b>HTML5</b> with intentional limited functions like:<br/><ul><li>Save & Print.</li><li>Undo & Redo.</li><li>Find and Replace.</li><li>Templates feature.</li><li>Simplified formatting tools.</li></ul>The idea of this project is to provide a lightweight text editor with simple and easy-to-use features.<ol><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li><li>Sed in pellentesque eros, id luctus purus.</li><li>Curabitur gravida posuere lorem, eget finibus odio vehicula at.</li><li>Phasellus nisi diam, laoreet non enim at, lacinia egestas justo.</li></ol>Pellentesque bibendum metus vel interdum dignissim. Sed tempor augue eu felis elementum tincidunt. Cras ac ante id elit viverra hendrerit in vitae quam. Ut varius, ligula in volutpat tempus, enim nunc volutpat dolor, nec ultrices arcu lorem quis metus. Nulla pharetra dignissim vestibulum. Aliquam auctor tortor sodales, vehicula purus vel, tristique nibh. Aenean in mi purus. Phasellus consectetur leo enim, id rutrum leo egestas nec. <span style='background-color: rgb(255, 255, 0);'>Praesent fermentum, eros quis vehicula semper, nisi quam aliquam elit</span>, in consequat nulla ante quis tellus. Mauris ultrices dui et turpis semper, ac viverra lacus interdum. In aliquam est eu leo placerat vulputate. Praesent imperdiet sit amet libero eget ullamcorper.";
	STRING_CLICKURL = "CLICK HERE TO OPEN THE LINK";
	STRING_FIND = "Find...";
	STRING_REPLACEWITH = "Replace with...";
	}

function encodeText(str)
	{
	// FUNCTION FOR ESCAPING SPECIAL CHARACTERS
	var i = str.length;
	var aRet = [];
	while (i--)
		{
		var tempChar = str[i].charCodeAt();
		if (tempChar > 126 || (tempChar==60 || tempChar==62))
			{
			aRet[i] = "&#" + tempChar + ";";
			}
			else
			{
			aRet[i] = str[i];
			}
		}
	return aRet.join("");
	}

function saveDocument()
	{
	// CLEARING THE NOTIFICATION TIMER
	try{clearTimeout(NOTIFICATION_TIMER)}catch(err){}

	// HIDING THE CARET
	document.getElementById("tinydoc_textcode").classList.add("tinydoc_caret_invisible");

	// HIDING ALL NOTIFICATIONS
	document.getElementsByClassName("tinydoc_saved")[0].style.display = "none";
	document.getElementsByClassName("tinydoc_error")[0].style.display = "none";
	document.getElementsByClassName("tinydoc_notfound")[0].style.display = "none";

	// SHOWING THE LOADING SPLASH
	document.getElementsByClassName("tinydoc_splash")[0].style.display = "block";
	document.getElementsByClassName("tinydoc_splash_container")[0].style.display = "block";

	setTimeout(function()
		{
		// SETTING THE PARAMETERS FOR THE REQUEST
		var valueDocument = encodeText(document.getElementById("tinydoc_textcode").innerHTML);
		var params = "documentdata=" + encodeURIComponent(valueDocument);

		// SETTING THE SERVER URL FOR SAVING AND THE TIMEOUT VALUE
		var serverTimeout = 3000;
		var serverSavingURL = "myDocumentSaver.php";

		// STARTING THE CODING OF THE REQUEST
		var http = new XMLHttpRequest();
		http.open("POST", serverSavingURL, true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.timeout = serverTimeout;

		// SETTING WHAT HAPPENS WHEN THE REQUEST IS DONE
		http.onreadystatechange = function()
			{
			if(http.readyState == 4)
				{
				// HIDING THE LOADING SPLASH
				document.getElementsByClassName("tinydoc_splash")[0].style.display = "none";
				document.getElementsByClassName("tinydoc_splash_container")[0].style.display = "none";

				// IF THE SERVER REPLIES OK (JUST AS AN EXAMPLE REPLY), THEN THE DOCUMENT WAS SAVED
				if (http.responseText=="OK")
					{
					// SHOWING THE SAVED DOCUMENT NOTIFICATION
					document.getElementsByClassName("tinydoc_saved")[0].style.display = "block";

					// CLEARING THE NOTIFICATION TIMER
					try{clearTimeout(NOTIFICATION_TIMER)}catch(err){}

					// SETTING THE DELAY FOR HIDING THE SAVED DOCUMENT NOTIFICATION
					NOTIFICATION_TIMER = setTimeout(function(){document.getElementsByClassName("tinydoc_saved")[0].style.display = "none"},3000);

					// SETTING THE DIRTY DOCUMENT STATUS OFF
					window.onbeforeunload = null;
					}
					else
					{
					// SHOWING THE ERROR WHILE SAVING DOCUMENT NOTIFICATION
					document.getElementsByClassName("tinydoc_error")[0].style.display = "block";

					// CLEARING THE NOTIFICATION TIMER
					try{clearTimeout(NOTIFICATION_TIMER)}catch(err){}

					// SETTING THE DELAY FOR HIDING THE ERROR WHILE SAVING DOCUMENT NOTIFICATION
					NOTIFICATION_TIMER = setTimeout(function(){document.getElementsByClassName("tinydoc_error")[0].style.display = "none"},3000);
					}

				// SHOWING THE CARET
				document.getElementById("tinydoc_textcode").classList.remove("tinydoc_caret_invisible");

				// FOCUSING THE DOCUMENT
				document.getElementById("tinydoc_textcode").focus();
				setTimeout(function(){document.getElementById("tinydoc_textcode").focus()},200);
				}
			};

		// SETTING THE ONERROR EVENT
		http.onerror = function ()
			{
			// SHOWING THE ERROR WHILE SAVING DOCUMENT NOTIFICATION
			document.getElementsByClassName("tinydoc_error")[0].style.display = "block";

			// CLEARING THE NOTIFICATION TIMER
			try{clearTimeout(NOTIFICATION_TIMER)}catch(err){}

			// SETTING THE DELAY FOR HIDING THE ERROR WHILE SAVING DOCUMENT NOTIFICATION
			NOTIFICATION_TIMER = setTimeout(function(){document.getElementsByClassName("tinydoc_error")[0].style.display = "none"},3000)

			// SHOWING THE CARET
			document.getElementById("tinydoc_textcode").classList.remove("tinydoc_caret_invisible");

			// FOCUSING THE DOCUMENT
			document.getElementById("tinydoc_textcode").focus();
			setTimeout(function(){document.getElementById("tinydoc_textcode").focus()},200);
			};

		// SETTING THE ONTIMEOUT EVENT
		http.ontimeout = function (e)
			{
			// SHOWING THE ERROR WHILE SAVING DOCUMENT NOTIFICATION
			document.getElementsByClassName("tinydoc_error")[0].style.display = "block";

			// CLEARING THE NOTIFICATION TIMER
			try{clearTimeout(NOTIFICATION_TIMER)}catch(err){}

			// SETTING THE DELAY FOR HIDING THE ERROR WHILE SAVING DOCUMENT NOTIFICATION
			NOTIFICATION_TIMER = setTimeout(function(){document.getElementsByClassName("tinydoc_error")[0].style.display = "none"},3000)

			// SHOWING THE CARET
			document.getElementById("tinydoc_textcode").classList.remove("tinydoc_caret_invisible");

			// FOCUSING THE DOCUMENT
			document.getElementById("tinydoc_textcode").focus();
			setTimeout(function(){document.getElementById("tinydoc_textcode").focus()},200);
			};

		// MAKES THE REQUEST
		http.send(params);
		}, 250);
	}

function printDocument()
	{
	try
		{
		// CREATING A TEMP IFRAME
		var newIframe = document.createElement("iframe");
		newIframe.width = "0";
		newIframe.height = "0";
		newIframe.src = "about:blank";
		newIframe.className = "tinydoc_frame";

		// ADDING THE IFRAME TO THE DOCUMENT
		document.body.appendChild(newIframe);

		// WRITING THE DOCUMENT CONTENT INTO THE IFRAME
		newIframe.contentWindow.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body style='font-family:Arial;font-size:16px'>" + document.getElementById("tinydoc_textcode").innerHTML + "<\/body><\/html>");
		newIframe.contentWindow.document.close(); //important!
		newIframe.contentWindow.focus(); //IE fix

		// PRINTING THE IFRAME
		newIframe.contentWindow.print();

		// REMOVING THE IFRAME
		document.body.removeChild(newIframe);

		// GETTING THE FOCUS IN THE DOCUMENT
		document.getElementById("tinydoc_textcode").focus();

		// PRENTIVE DELAYED EVENT FOR GETTING FOCUS IN THE DOCUMENT
		setTimeout(function(){document.getElementById("tinydoc_textcode").focus()},200);
		}
		catch(err)
		{
		}

	// GETTING THE FOCUS IN THE DOCUMENT
	document.getElementById("tinydoc_textcode").focus();

	// PRENTIVE DELAYED EVENT FOR GETTING FOCUS IN THE DOCUMENT
	setTimeout(function(){document.getElementById("tinydoc_textcode").focus()},200);
	}

function showSearchBox()
	{
	try
		{
		if (document.getElementsByClassName("tinydoc_button_find_box")[0].style.display=="block")
			{
			document.getElementsByClassName("tinydoc_button_find_box")[0].style.display = "none";
			document.getElementById("buttonFind").classList.remove("tinydoc_button_find_selected");
			}
			else
			{
			document.getElementsByClassName("tinydoc_button_find_box")[0].style.display = "block";
			document.getElementById("buttonFind").classList.add("tinydoc_button_find_selected");

			// FOCUSING THE DOCUMENT
			document.getElementsByClassName("tinydoc_button_find_textbox1")[0].focus();
			setTimeout(function(){document.getElementsByClassName("tinydoc_button_find_textbox1")[0].focus()},200);
			}
		}
		catch(err)
		{
		}
	}

function findReplaceInDocument()
	{
	try
		{
		// GETTING THE FIND VALUE
		FIND_STRING = document.getElementsByClassName("tinydoc_button_find_textbox1")[0].value;
		FIND_STRING = FIND_STRING.toLowerCase();

		// GETTING THE REPLACE VALUE
		FIND_REPLACEWITH = document.getElementsByClassName("tinydoc_button_find_textbox2")[0].value;
		FIND_REPLACEWITH = FIND_REPLACEWITH.toLowerCase();

		// CHECKING IF THE SEARCH VALUE IS EMPTY
		if (FIND_STRING!="")
			{
			// CHECKING IF IT IS GOING TO BE A FIND OR A FIND-AND-REPLACE FUNCTION
			if (FIND_REPLACEWITH!="")
				{
				// GETTING THE CURRENT SELECTION AND ALL THE DOCUMENT NODES
				var selection = window.getSelection();
				var allNodes = document.getElementById("tinydoc_textcode").childNodes;

				// GOING THROUGH EVERY NODE
				for (var i=0;i<allNodes.length;i++)
					{
					try
						{
						// CHECKING IF THE NODE HAS AT LEAST ONE CHILD NODE
						if (allNodes[i].firstChild!=null)
							{
							// CHECKING IF THE TEXT EXISTS WITHIN THE CHILD NODE
							if (allNodes[i].firstChild.textContent.indexOf(FIND_STRING)>-1)
								{
								// PERFORMING A RECURSIVE SEARCH FOR EVERY CHILD NODE
								replaceInDocument_AllDescendants(FIND_STRING,allNodes[i],selection);
								}
							}
							else
							{
							// EXECUTING THE FIND AND SELECT FUNCTION WITHIN THE CURRENT NODE
							replaceInDocument_findAndSelect(FIND_STRING,allNodes[i],selection);
							}
						}
						catch(err)
						{
						}
					}
				}
				else
				{
				// SETTING THAT THE VALUE WAS NOT FOUND YET
				FIND_FOUND = false;
				FIND_FOUND_FIRST = null;

				// GETTING THE CURRENT SELECTION AND ALL THE DOCUMENT NODES
				var selection = window.getSelection();
				var allNodes = document.getElementById("tinydoc_textcode").childNodes;

				// GOING THROUGH EVERY NODE
				for (var i=0;i<allNodes.length;i++)
					{
					try
						{
						// CHECKING IF THE NODE HAS AT LEAST ONE CHILD NODE
						if (allNodes[i].firstChild!=null)
							{
							// CHECKING IF THE TEXT EXISTS WITHIN THE CHILD NODE
							if (allNodes[i].firstChild.textContent.indexOf(FIND_STRING)>-1)
								{
								// PERFORMING A RECURSIVE SEARCH FOR EVERY CHILD NODE
								findInDocument_AllDescendants(FIND_STRING,allNodes[i],selection);
								}
							}
							else
							{
							// EXECUTING THE FIND AND SELECT FUNCTION WITHIN THE CURRENT NODE
							findInDocument_findAndSelect(FIND_STRING,allNodes[i],selection);
							}
						}
						catch(err)
						{
						}
					}

				// CHECKING IF THERE IS A PREVIOUS FOUND TO THE CARET POSITION
				// AND THAT THERE ARE NO FOUNDS AFTER THE CARET POSITION.
				if (FIND_FOUND_FIRST!=null && FIND_FOUND == false)
					{
					// SELECTING THE PREVIOUS FOUND (THE FIRST MATCH IN THE DOCUMENT)
					selection.removeAllRanges();
					selection.addRange(FIND_FOUND_FIRST);

					// UPDATING THE CARET POSITION
					FIND_INITIAL_INDEX = getCaretPosition(document.getElementById("tinydoc_textcode"));

					// SCROLLING TO THE SELECTED VALUE
					scrollToCaret();
					}
				else if (FIND_FOUND==false)
					{
					// HIDING ALL NOTIFICATIONS
					document.getElementsByClassName("tinydoc_saved")[0].style.display = "none";
					document.getElementsByClassName("tinydoc_error")[0].style.display = "none";

					// SHOWING THE NOT FOUND NOTIFICATION
					document.getElementsByClassName("tinydoc_notfound")[0].style.display = "block";

					// CLEARING THE NOTIFICATION TIMER
					try{clearTimeout(NOTIFICATION_TIMER)}catch(err){}

					// SETTING THE DELAY FOR HIDING THE SAVED DOCUMENT NOTIFICATION
					NOTIFICATION_TIMER = setTimeout(function(){document.getElementsByClassName("tinydoc_notfound")[0].style.display = "none"},3000);
					}
				}
			}
		}
		catch(err)
		{
		}
	}

function findInDocument_AllDescendants(search,latestChildNode,sel)
	{
	try
		{
		// GOING THROUGH EVERY NODE
		for (var i = 0; i < latestChildNode.childNodes.length; i++)
			{
			try
				{
				// CHECKING IF THERE IS NO VALUE FOUND YET
				if (FIND_FOUND==false)
					{
					// CREATING A VARIABLE AND GETTING THE CHILD NODE
					var child = latestChildNode.childNodes[i];

					// CHECKING IF THAT CHILD NODE HAS A CHILD NODE
					if (child.firstChild!=null)
						{
						// IF SO, THIS FUNCTION WILL BE EXECUTED ONE MORE TIME FOR THIS CHILD NODE
						findInDocument_AllDescendants(search,child,sel);
						}

					// EXECUTING THE FIND AND SELECT FUNCTION WITHIN THE CURRENT NODE
					findInDocument_findAndSelect(search,child,sel);
					}
				}
				catch(err)
				{
				}
			}
		}
		catch(err)
		{
		}
	}

function findInDocument_findAndSelect(search, myNode, selection)
	{
	try
		{
		// SETTING ALL THE PARAMETERS
		var needle = search;
		var re = new RegExp(needle,"gi");
		var haystack = myNode.textContent.toLowerCase();

		// GOING THROUGH EVERY TEXT MATCH
		while(re.exec(haystack))
			{
			if (FIND_FOUND==false)
				{
				// LOCATING THE TEXT MATCH
				var startIndex = re.lastIndex - search.length;
				var endIndex = startIndex + search.length;

				// CREATING THE RANGE
				var range = document.createRange();
				range.setStart(myNode, startIndex);
				range.setEnd(myNode, endIndex);

				// SELECTING THE TEXT
				selection.removeAllRanges();
				selection.addRange(range);

				// CHECKING IF THAT THE SELECTED TEXT IS THE SAME AS THE ONE THAT THE USER WROTE
				if (window.getSelection().toString().toLowerCase()==search)
					{
					// CHECKING IF THERE IS A FIRST VALUE FOUND
					if (FIND_FOUND_FIRST==null)
						{
						FIND_FOUND_FIRST = range;
						}

					// GETTING THE CARET POSITION
					var caretPosition = getCaretPosition(document.getElementById("tinydoc_textcode"));

					// CHECKING IF THE CARET POSITION IS GREATER THAN THE INITIAL CARET POSITION
					if (caretPosition>FIND_INITIAL_INDEX)
						{
						// SETTING THAT THE SEARCH VALUE WAS FOUND
						FIND_FOUND = true;

						// UPDATING THE CARET POSITION
						FIND_INITIAL_INDEX = getCaretPosition(document.getElementById("tinydoc_textcode"));
						}

					// SCROLLING TO THE SELECTED VALUE
					scrollToCaret();
					}
					else
					{
					// CLEARING SELECTION IF THERE IS NO MATCH
					selection.removeAllRanges();
					}
				}
			}
		}
		catch(err)
		{
		}
	}

function replaceInDocument_AllDescendants(search,latestChildNode,sel)
	{
	try
		{
		// GOING THROUGH EVERY NODE
		for (var i = 0; i < latestChildNode.childNodes.length; i++)
			{
			try
				{
				// CREATING A VARIABLE AND GETTING THE CHILD NODE
				var child = latestChildNode.childNodes[i];

				// CHECKING IF THAT CHILD NODE HAS A CHILD NODE
				if (child.firstChild!=null)
					{
					// IF SO, THIS FUNCTION WILL BE EXECUTED ONE MORE TIME FOR THIS CHILD NODE
					replaceInDocument_AllDescendants(search,child,sel);
					}

				// EXECUTING THE FIND AND SELECT FUNCTION WITHIN THE CURRENT NODE
				replaceInDocument_findAndSelect(search,child,sel);
				}
				catch(err)
				{
				}
			}
		}
		catch(err)
		{
		}
	}

function replaceInDocument_findAndSelect(search, myNode, selection)
	{
	try
		{
		// SETTING ALL THE PARAMETERS
		var needle = search;
		var re = new RegExp(needle,"gi");
		var haystack = myNode.textContent.toLowerCase();
		var tempOffset = 0;

		// GOING THROUGH EVERY TEXT MATCH
		while(re.exec(haystack))
			{
			// LOCATING THE TEXT MATCH
			var startIndex = re.lastIndex - search.length + tempOffset;
			var endIndex = startIndex + search.length;

			// CREATING THE RANGE
			var range = document.createRange();
			range.setStart(myNode, startIndex);
			range.setEnd(myNode, endIndex);

			// SELECTING THE TEXT
			selection.removeAllRanges();
			selection.addRange(range);

			// CHECKING IF THAT THE SELECTED TEXT IS THE SAME AS THE ONE THAT THE USER WROTE
			if (window.getSelection().toString().toLowerCase()==search)
				{
				document.execCommand("insertText", false, FIND_REPLACEWITH);

				// CHECKING IF THE FIND AND REPLACE VALUES HAVE A DIFFERENT LENGTH
				if (search.length!=FIND_REPLACEWITH.length)
					{
					// IF SO, THE OFFSET MUST BE UPDATED
					tempOffset = tempOffset + FIND_REPLACEWITH.length - 1;
					}
				}
				else
				{
				// CLEARING SELECTION IF THERE IS NO MATCH
				selection.removeAllRanges();
				}
			}
		}
		catch(err)
		{
		}
	}

function insertCalc()
	{
	try
		{
		// GETTING THE SELECTED TEXT
		var selectedText = window.getSelection().toString();

		// CHECKING THE SELECTED TEXT
		if (selectedText!=null)
			{
			// IF THERE IS A SELECTED TEXT
			if (selectedText.length>0)
				{
				// MOVING THE CARET AFTER THE SELECTED TEXT
				try{document.getSelection().collapseToEnd()}catch(err){}

				// SPLITTING THE SELECTED TEXT BY BREAKLINES
				var splitted = selectedText.split("\n");

				// CHECK IF IT IS A SINGLE LINE EXPRESSION OR A MULTILINE ADDING OPERATION
				if (splitted.length==1)
					{
					// REMOVING INVALID CHARACTERS
					selectedText = selectedText.replace(/[^0-9.*\/()+-]/g, "");

					try
						{
						// EVALUATING THE EXPRESSION
						var finalResult = eval(selectedText);

						// CHECKING IF THE FINAL RESULT IS NAN (NOT A NUMBER)
						if (isNaN(finalResult)==true)
							{
							// INSERTING AN ERROR TEXT IF THE EXPRESSION RESULT COULD NOT BE EVALUATED
							document.execCommand("insertText", false, " = ERROR");
							}
							else
							{
							// SHOWING ONLY TWO DECIMALS AFTER COMMA
							finalResult = parseFloat(finalResult).toFixed(2);

							// CHECKING IF THE FINAL RESULT IS AN INTEGER
							if (finalResult.indexOf(".00")>-1)
								{
								finalResult = parseFloat(finalResult).toFixed(0);
								}

							// INSERTING THE EXPRESSION RESULT
							document.execCommand("insertText", false, " = " + finalResult);
							}
						}
						catch(err)
						{
						// INSERTING AN ERROR TEXT IF THE EXPRESSION RESULT COULD NOT BE EVALUATED
						document.execCommand("insertText", false, " = ERROR");
						}
					}
					else
					{
					// SETTING THE FINAL RESULT VARIABLE
					var finalResult = 0;

					// SETTING THE VARIABLE FOR THE LAST-LINE-BREAKLINE-CHECKER
					var lastLineBR = "";

					// GETTING ALL THE LINES
					for (var i=0;i<splitted.length;i++)
						{
						try
							{
							// GETTING ONE LINE
							var currentLine = splitted[i];

							// CHECKING THE LINE
							if (currentLine.length>0)
								{
								// REMOVING INVALID CHARACTERS
								currentLine = currentLine.replace(/[^0-9.]/g, "");

								// ADDING THE VALUE TO THE FINAL RESULT
								finalResult = parseFloat(finalResult) + parseFloat(currentLine);
								}

							// CHECKING IF THE LAST LINE AND IS NOT A BREAKLINE.
							// IF SO, A BREAKLINE WILL BE ADDED BEFORE THE RESULT.
							if (currentLine!="" && i==splitted.length-1)
								{
								lastLineBR = "\n";
								}
							}
							catch(err)
							{
							}
						}

					try
						{
						// CHECKING IF THE FINAL RESULT IS NAN (NOT A NUMBER)
						if (isNaN(finalResult)==true)
							{
							// INSERTING AN ERROR TEXT IF THE EXPRESSION RESULT COULD NOT BE EVALUATED
							document.execCommand("insertText", false, lastLineBR + "----------\nERROR");
							}
							else
							{
							// SHOWING ONLY TWO DECIMALS AFTER COMMA
							finalResult = parseFloat(finalResult).toFixed(2);

							// CHECKING IF THE FINAL RESULT IS AN INTEGER
							if (finalResult.indexOf(".00")>-1)
								{
								finalResult = parseFloat(finalResult).toFixed(0);
								}

							// INSERTING THE FINAL RESULT
							document.execCommand("insertText", false, lastLineBR + "----------\n" + finalResult);
							}
						}
						catch(err)
						{
						// INSERTING AN ERROR TEXT IF THE RESULT COULD NOT BE DISPLAYED
						document.execCommand("insertText", false, lastLineBR + "----------\nERROR");
						}
					}
				}
			}

		// FOCUSING THE DOCUMENT
		document.getElementById("tinydoc_textcode").focus();
		setTimeout(function(){document.getElementById("tinydoc_textcode").focus()},200);
		}
		catch(err)
		{
		}
	}

function insertLink()
	{
	try
		{
		// GETTING THE SELECTED TEXT
		var selectedText = window.getSelection().toString();

		// CHECKING THE SELECTED TEXT
		if (selectedText!=null)
			{
			// IF THERE IS A SELECTED TEXT
			if (selectedText.length>0)
				{
				// VALIDATORS FOR KNOWING IF THE SELECTED TEXT IS A HTTP, HTTPS OR MAILTO LINK
				var selectedTextURLChecker1 = selectedText.toLowerCase().indexOf(" ");
				var selectedTextURLChecker2 = selectedText.toLowerCase().indexOf("http://");
				var selectedTextURLChecker3 = selectedText.toLowerCase().indexOf("https://");
				var selectedTextURLChecker4 = checkForEmail(selectedText);

				// VALIDATING THE SELECTED TEXT
				if (selectedTextURLChecker1==-1 && (selectedTextURLChecker2==0 || selectedTextURLChecker3==0 || selectedTextURLChecker4==true))
					{
					// CHECKING IF IT IS A URL OR EMAIL
					if (selectedTextURLChecker4==true)
						{
						// INSERTING THE MAILTO LINK INTO THE DOCUMENT
						formatDoc("insertHTML","<a href='mailto:" + selectedText.toLowerCase() + "' target='top'>" + selectedText + "</a>");
						}
						else
						{
						// INSERTING THE URL LINK INTO THE DOCUMENT
						formatDoc("insertHTML","<a href='" + selectedText + "' target='top'>" + selectedText + "</a>");
						}
					}
				}
			}

		// FOCUSING THE DOCUMENT
		document.getElementById("tinydoc_textcode").focus();
		setTimeout(function(){document.getElementById("tinydoc_textcode").focus()},200);
		}
		catch(err)
		{
		}
	}

function formatDoc(myCommand, myParameter)
	{
	try
		{
		// EXECUTING COMMAND FOR THE CURRENT SELECTION
		document.execCommand(myCommand, false, myParameter);

		// GETTING THE FOCUS IN THE DOCUMENT
		document.getElementById("tinydoc_textcode").focus();

		// PRENTIVE DELAYED EVENT FOR GETTING FOCUS IN THE DOCUMENT
		setTimeout(function(){document.getElementById("tinydoc_textcode").focus()},200);
		}
		catch(err)
		{
		}
	}

function checkForURL()
	{
	try
		{
		// SETTING THE LINK FOUND VALUE AS FALSE
		LINK_FOUND = false;

		// GETTING THE CURRENT SELECTION
		var selectedNode = window.getSelection().focusNode;

		// GOING THROUGH EVERY NODE
		for (var i=0;i<selectedNode.length;i++)
			{
			try
				{
				// CHECKING IF THE NODE HAS AT LEAST ONE CHILD NODE
				if (selectedNode.firstChild!=null)
					{
					// PERFORMING A RECURSIVE SEARCH FOR EVERY CHILD NODE
					checkForURL_AllDescendants(selectedNode);
					}
					else
					{
					// EXECUTING THE FIND AND SELECT FUNCTION WITHIN THE CURRENT NODE
					checkForURL_Update(selectedNode);
					}
				}
				catch(err)
				{
				}
			}

		// CHECKING IF A LINK WAS FOUND
		if (LINK_FOUND==false)
			{
			// CLEARING THE URL VIEWER
			document.getElementById("tinydoc_urlviewer").innerHTML = "";
			}
		}
		catch(err)
		{
		}
	}

function checkForURL_AllDescendants(latestChildNode)
	{
	try
		{
		// GOING THROUGH EVERY NODE
		for (var i = 0; i < latestChildNode.childNodes.length; i++)
			{
			try
				{
				// CREATING A VARIABLE AND GETTING THE CHILD NODE
				var child = latestChildNode.childNodes[i];

				// CHECKING IF THAT CHILD NODE HAS A CHILD NODE
				if (child.firstChild!=null)
					{
					// IF SO, THIS FUNCTION WILL BE EXECUTED ONE MORE TIME FOR THIS CHILD NODE
					checkForURL_AllDescendants(child);
					}

				// EXECUTING THE CHECK FOR URL FUNCTION WITHIN THE CURRENT NODE
				checkForURL_Update(child);
				}
				catch(err)
				{
				}
			}
		}
		catch(err)
		{
		}
	}

function checkForURL_Update(selectedNode)
	{
	try
		{
		// GETTING THE URL (IF ANY)
		var finalURL = selectedNode.parentNode.href;

		// CHECKING IF THERE IS A VALUE
		if(typeof finalURL !== "undefined")
			{
			// CHECKING IF THE SEARCHBOX IS VISIBLE
			if (document.getElementsByClassName("tinydoc_button_find_box")[0].style.display=="block")
				{
				// CHECKING THE WINDOW WIDTH
				if(window.innerWidth<=1280)
					{
					// HIDING THE SEARCHBOX IF THE WINDOW WIDTH IS EQUAL OR LESS THAN 1280.
					// THIS IS BECAUSE THE TEXT IN TINYDOC_URLVIEWER WON'T SHOW UP OTHERWISE.
					document.getElementById("buttonFind").click();
					}
				}

			// ADDING THE VALUE TO THE URL VIEWER
			document.getElementById("tinydoc_urlviewer").innerHTML = "<a href='" + finalURL + "' target='top'>" + STRING_CLICKURL + "</a>";

			// SETTING THE LINK FOUND VALUE AS TRUE
			LINK_FOUND = true;
			}
		}
		catch(err)
		{
		}
	}

function scrollToCaret()
	{
	try
		{
		// SETTING THE SCROLLTOP TO 0
		document.getElementById("tinydoc_textcode").scrollTop = 0;

		// GETTING THE CARET Y-POSITION
		var caretPositionY = getCaretPositionY();

		// GETTING THE DOCUMENT PADDING-TOP
		var containerPaddingTop = document.getElementById("tinydoc_textcode").getBoundingClientRect().top + 10;

		// GETTING THE TARGET POSITION
		var targetPostion = caretPositionY - containerPaddingTop;

		// SETTING THE SCROLL LOCATION
		document.getElementById("tinydoc_textcode").scrollTop = targetPostion;
		}
		catch(err)
		{
		}
	}

function getCaretPositionY()
	{
	// Authors of this function: Nishad Up & Tom
	// https://stackoverflow.com/questions/3972014/get-caret-position-in-contenteditable-div/30993650#30993650

	var y = 0;

	try
		{
		var sel = window.getSelection();
		if(sel.rangeCount)
			{
			var range = sel.getRangeAt(0).cloneRange();
			if(range.getClientRects())
				{
				range.collapse(true);
				var rect = range.getClientRects()[0];
				if(rect)
					{
					y = rect.top;
					}
				}
			}
		}
		catch(err)
		{
		}
	return y;
	}

function getCaretPosition(element)
	{
	// Author of this function: Tim Down
	// https://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022

	var caretOffset = 0;
	try
		{
		var doc = element.ownerDocument || element.document;
		var win = doc.defaultView || doc.parentWindow;
		var sel;

		if (typeof win.getSelection != "undefined")
			{
			sel = win.getSelection();
			if (sel.rangeCount > 0)
				{
				var range = win.getSelection().getRangeAt(0);
				var preCaretRange = range.cloneRange();
				preCaretRange.selectNodeContents(element);
				preCaretRange.setEnd(range.endContainer, range.endOffset);
				caretOffset = preCaretRange.toString().length;
				}
			}
		else if((sel = doc.selection) && sel.type != "Control")
			{
			var textRange = sel.createRange();
			var preCaretTextRange = doc.body.createTextRange();
			preCaretTextRange.moveToElementText(element);
			preCaretTextRange.setEndPoint("EndToEnd", textRange);
			caretOffset = preCaretTextRange.text.length;
			}
		}
		catch(err)
		{
		}
	return caretOffset;
	}

function checkForEmail(email)
	{
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
	}

function resizeTinyDOCEditor()
	{
	try
		{
		// GETTING THE WINDOW SIZE
		var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName("body")[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight|| e.clientHeight|| g.clientHeight;

		// CALCUTING THE NEW SIZE FOR THE DOCUMENT
		var editHeight = y - 57;
		var editWidth = x - 16;

		// RESIZING DOCUMENT
		document.getElementById("tinydoc_textcode").style.height = editHeight.toString() + "px";
		document.getElementById("tinydoc_textcode").style.width = editWidth.toString() + "px";
		}
		catch(err)
		{
		}
	}

document.getElementById("tinydoc_textcode").addEventListener("paste", function(e)
	{
	try
		{
		// CANCELING THE PASTE EVENT
		e.preventDefault();

		// GETTING THE CLIPBOARD CONTENT AS PLAIN TEXT
		var text = (e.originalEvent || e).clipboardData.getData("text/plain");

		// PASTING THE TEXT
		document.execCommand("insertText", false, text);
		}
		catch(err)
		{
		}
	});

document.getElementById("tinydoc_textcode").addEventListener("keydown", function (e)
	{
	try
		{
		// IF THE LOADING SPLASH IS VISIBLE, IT MEANS THAT THE DOCUMENT IT IS BEEN SAVED
		// AND ALL THE KEYDOWN EVENTS WILL BE DISABLED BECAUSE OF THAT.
		if (document.getElementsByClassName("tinydoc_splash")[0].style.display == "block")
			{
			e.preventDefault();
			}
			else
			{
			//CODE FOR ADDING SPACES (TABS) WHEN THE TAB KEY IS DOWN
			if (e.keyCode==9)
				{
				// CANCELING THE TAB KEY EVENT
				e.preventDefault();

				// INSERTING SPACES AS A TAB SPACE
				document.execCommand("insertText", false, "          ");

				// GETTING THE FOCUS IN THE DOCUMENT
				document.getElementById("tinydoc_textcode").focus();

				// PRENTIVE DELAYED EVENT FOR GETTING FOCUS IN THE DOCUMENT
				setTimeout(function(){document.getElementById("tinydoc_textcode").focus()},200);
				}
			else if (e.ctrlKey || e.metaKey)
				{
				switch (String.fromCharCode(e.which).toLowerCase())
					{
					case "s":
					// CANCELING THE SAVING PAGE KEY EVENT
					e.preventDefault();

					// SAVING THE DOCUMENT
					saveDocument();
					break;

					case "f":
					// CANCELING THE STANDARD FIND DIALOG EVENT
					e.preventDefault();

					// SHOW THE SEARCH BOX
					showSearchBox();
					break;
					}
				}
			}
		}
		catch(err)
		{
		}
	});

document.getElementById("tinydoc_textcode").addEventListener("keyup", function (e)
	{
	// CHECKING FOR URL LINKS WHILE THE USER IS WRITING OR MOVING THROUGH THE DOCUMENT
	checkForURL();
	});

document.getElementById("tinydoc_textcode").addEventListener("input", function (e)
	{
	// SETTING THE DOCUMENT AS DIRTY WHEN THE USER IS TYPING
	window.onbeforeunload = function(e){return "Dirty"};
	});

window.onresize = function()
	{
	// RESIZING THE DOCUMENT
	resizeTinyDOCEditor();
	};

window.onload = function()
	{
	// RESIZING THE DOCUMENT
	resizeTinyDOCEditor();

	// SETTING THE WELCOME DOCUMENT
	document.getElementById("tinydoc_textcode").innerHTML = STRING_WELCOME;

	// SETTING THE LANGUAGE VALUES
	document.getElementsByClassName("tinydoc_saved")[0].innerHTML = STRING_SAVED;
	document.getElementsByClassName("tinydoc_error")[0].innerHTML = STRING_ERROR;
	document.getElementsByClassName("tinydoc_notfound")[0].innerHTML = STRING_NOTFOUND;
	document.getElementsByClassName("tinydoc_button_find_textbox1")[0].placeholder = STRING_FIND;
	document.getElementsByClassName("tinydoc_button_find_textbox2")[0].placeholder = STRING_REPLACEWITH;

	// GETTING THE FOCUS IN THE DOCUMENT
	document.getElementById("tinydoc_textcode").focus();

	// PRENTIVE DELAYED EVENT FOR GETTING FOCUS IN THE DOCUMENT
	setTimeout(function(){document.getElementById("tinydoc_textcode").focus()},200);

	// TRYING TO MOVE THE CURSOR TO THE BEGINNING OF THE DOCUMENT
	try
		{
		var range = document.createRange();
		var sel = window.getSelection();
		range.setStart(document.getElementById("tinydoc_textcode").childNodes[0], 0);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
		}
		catch(err)
		{
		}

	// SCROLLING TO THE TOP OF THE DOCUMENT
	try{document.getElementById("tinydoc_textcode").scrollTop = 0}catch(err){}

	// SETTING WHAT HAPPENS WHEN EACH ELEMENT IS CLICKED
	document.getElementById("tinydoc_textcode").addEventListener("click",function(event){checkForURL()});
	document.getElementById("tinydoc_textcode").addEventListener("contextmenu",function(event){checkForURL()});
	document.getElementById("tinydoc_textcode").addEventListener("blur",function(event){FIND_INITIAL_INDEX = getCaretPosition(document.getElementById("tinydoc_textcode"));});
	document.getElementById("buttonSave").addEventListener("click",function(event){saveDocument()});
	document.getElementById("buttonPrint").addEventListener("click",function(event){printDocument()});
	document.getElementById("buttonFind").addEventListener("click",function(event){showSearchBox()});
	document.getElementById("buttonFindNext").addEventListener("click",function(event){findReplaceInDocument()});
	document.getElementById("buttonUndo").addEventListener("click",function(event){formatDoc("undo",null);checkForURL()});
	document.getElementById("buttonRedo").addEventListener("click",function(event){formatDoc("redo",null);checkForURL()});
	document.getElementById("buttonBold").addEventListener("click",function(event){formatDoc("bold",null)});
	document.getElementById("buttonItalic").addEventListener("click",function(event){formatDoc("italic",null)});
	document.getElementById("buttonUnderline").addEventListener("click",function(event){formatDoc("underline",null)});
	document.getElementById("buttonStrikethrough").addEventListener("click",function(event){formatDoc("strikethrough",null)});
	document.getElementById("buttonDotted").addEventListener("click",function(event){formatDoc("insertunorderedlist",null)});
	document.getElementById("buttonNumbered").addEventListener("click",function(event){formatDoc("insertorderedlist",null)});
	document.getElementById("buttonClear").addEventListener("click",function(event){formatDoc("removeFormat",null)});
	document.getElementById("buttonHighlight").addEventListener("click",function(event){formatDoc("BackColor","#FFFF00")});
	document.getElementById("buttonCalc").addEventListener("click",function(event){insertCalc()});
	document.getElementById("buttonLink").addEventListener("click",function(event){insertLink()});
	document.getElementById("buttonTemplate1").addEventListener("click",function(event){formatDoc("insertHTML","My Template 1<br />Example 1<br />");});
	document.getElementById("buttonTemplate2").addEventListener("click",function(event){formatDoc("insertHTML","My Template 2<br />Example 2<br />");});
	document.getElementById("buttonTemplate3").addEventListener("click",function(event){formatDoc("insertHTML","My Template 3<br />Example 3<br />");});
	document.getElementsByClassName("tinydoc_menubar")[0].addEventListener("click",function(event){if (document.getElementsByClassName("tinydoc_button_find_textbox1")[0]!=document.activeElement&&document.getElementsByClassName("tinydoc_button_find_textbox2")[0]!=document.activeElement){document.getElementById("tinydoc_textcode").focus()}});
	}