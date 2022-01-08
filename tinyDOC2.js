class tinyDOC2
	{
	constructor(editorConfig)
		{
		// SETTING THE TINYDOC CONTAINER
		this.myContainer = editorConfig.container;

		// CHECKING IF THERE IS NO SPELLCHECKER CONFIGURATION
		if (typeof editorConfig.spellcheckerEnabled === 'undefined')
			{
			// DISABLING THE SPELLCHECKER
			this.spellcheckerEnabled = false;
			}
		else
			{
			// USING THE SPELLCHECKER CONFIGURATION
			this.spellcheckerEnabled = editorConfig.spellcheckerEnabled;
			}

		// CHECKING IF THERE IS A SAVE FUNCTION
		if (editorConfig.saveFunction)
			{
			// SETTING THE SAVE FUNCTION
			this.saveFunction = editorConfig.saveFunction;
			}

		// CHECKING IF THERE IS A SPELLCHECKER LANGUAGE
		if (editorConfig.spellcheckerLanguage)
			{
			// SETTING THE SPELLCHECKER LANGUAGE
			this.spellcheckerLanguage = editorConfig.spellcheckerLanguage;
			}

		// CHECKING IF THERE IS A SPELLCHECKER URL
		if (editorConfig.spellcheckerURL)
			{
			// SETTING THE SPELLCHECKER URL
			this.spellcheckerURL = editorConfig.spellcheckerURL;
			}

		if (editorConfig.spellcheckerNoSuggestionsLabel)
			{
			this.spellcheckerNoSuggestionsLabel = editorConfig.spellcheckerNoSuggestionsLabel;
			}
			else
			{
			this.spellcheckerNoSuggestionsLabel = "(no suggestions)";
			}

		// SETTING ALL THE TEMPLATES (IF ANY)
		this.template1 = editorConfig.template1;
		this.template2 = editorConfig.template2;
		this.template3 = editorConfig.template3;

		// SETTING THAT THE DOCUMENT IS ENABLED
		this.documentEnabled = true;

		// ADDING THE STYLESHEET
		this.styleSheet = document.createElement("style");
		this.styleSheet.innerText = ".tinydoc_menu_container{height:40px;border-bottom:thin solid #D3D3D3;overflow-y:hidden} .tinydoc_menu{background-color:#F2F2F2;left:0;right:0;padding-top:0;padding-bottom:0;height:80px;overflow-x:scroll;overflow-y:hidden;outline:none;text-align:center;font-family:Arial;font-size:13px} .tinydoc_menu::-webkit-scrollbar{display:none} .tinydoc_menu_size{float:left;width:800px} .tinydoc_holder{float:left;padding-top:3px;padding-bottom:3px;margin:0} .tinydoc_separator{float:left;border-left:thin solid #D3D3D3;margin-left:4px;height:100px;width:1px} .tinydoc_separator2{float:left;border-left:thin solid #D3D3D3;margin-left:135px;height:100px;width:1px} .tinydoc_button_save{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWElEQVQ4jWNgZGT8Tw5mYGA4z8DAoM9ArgFQQ94zIHH8cSiyZ2BgsEfj18P5SBJYXcMABTj59DCAn4GBgZ9sAwi6CF2CWDBqAI0M0CdBvz6GAWRnKEoNAABz05cZXE0N/gAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_save:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_print{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIABISH+2IiQAAAE9JREFUOMtj/PTpEwMlgAVdgI+P7z8+DZ8+fWJE5jMxUAgYKfUCIwMDw39KDCDbC7CwGDgXUM0AFmLiGl8aodwF6LbRPSXSJhAJeYOqeQEAZqYde9erwQ4AAAAASUVORK5CYII=\");background-repeat:no-repeat;background-position:center} .tinydoc_button_print:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_spellcheck{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QwHAAcfEDNuGwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABB0lEQVQ4y71SMW6DQBAconsN7SJ0BT0fQKJ25YKOB1BRpEJygdzQ0aWBjge4sSXuB/ARhDRuchGJA9gpMtXd7Ozu7O05AJAkCa/XKwBAa42yLB0RIT5huaUOAIwxDgBgKbbnPc7iDU9AKbUe+9llCct5nofb7bZdwM6zLGQ5pRTXHDw1wjzP+yP8ButGaw1jDLTWAPDg8P+Q5zlPpxNffgP72ZqmwTRN28Ku6751GIbhI45jigizLONm8uFwoOd5bNuWAND3PcMwpIgwTVPu2rxcLvR9n77vsygKBkFAEeHxeFxNflhDVVU8n89fd9d1Udf1a+tK05QiwiiK+OeVJUnCcRzf93R3u5J9NTYpBjUAAAAASUVORK5CYII=\");background-repeat:no-repeat;background-position:center} .tinydoc_button_spellcheck:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_spellcheck_enabled{background-color:#E3E3E3 !important;border:thin solid #D3D3D3 !important} .tinydoc_button_undo{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlElEQVR4XqWTQRHCMBREtx0E1AoOgoPigO8ACUgABakTkFApdVD28A97oCwNb+ZdOrPJ/vkpvlBhcOGVWvqN8AU/0ptwSQds0O24eaYPOkHoGmq/6JkuOcJuCq1+BM+Rztogcj7llEZWV0aKA1WCQppoaMrv9eMaTRM95A6De8qFrvTqthB2nY2M9Pnvj1bQyEBvEN4HjBvwG13/UAAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_undo:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_redo{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAjElEQVR4Xq2TXQ2EMBCElwYBSEEC5wAJoAALJwEHVAIoKA6QxE8yD80EJnvhvmTf+s022605mewl+1NIMD/dXUgphOqsmkPg9RzAh4ZcViEFdUwkKuIVEmjSkL3gBhA3CO7u+Su0JKw48EGRLIYIMarOag9Gj6wCFq/MAbNpIGsSDfNnmn/8ui820s0B6TsXTzSQVC8AAAAASUVORK5CYII=\");background-repeat:no-repeat;background-position:center} .tinydoc_button_redo:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_bold{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIABYIhuO09wAAARBJREFUOMulkTGKhEAQRX8vG2tkJGhgaKT3MBBEzDo20XD3CDPHMPAEHsIjGBkZCIKBBTYqSG+0iyO6O+M++EHTVZ+qX4yI8B/etg9FUeRelmXJIAhkURS3Qwci+hEAeSZVVWWe57dtPRE9TrAzZl3XsSiKAADDMCDLso99HdtmoCiK3BoAwDzPME1TCiGgaRrqumanGfzFuq6/h7hnmiYkSSKFEAAA13Xx9ApHlGXJbNvG5RXCMJR93z9nQESMiFjbtsz3fQBA0zRI01S+dAUAEELAMAy5LAt0XUdVVezSCgCwLMtrGYzjiDiO5Xej4zgP/+9njUcXUVUVnPP7UwZbNE2D4zjgnN89z/s8DfEKX5+qlW3Q8GvUAAAAAElFTkSuQmCC\");background-repeat:no-repeat;background-position:center} .tinydoc_button_bold:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_italic{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIABo64oGqewAAAPBJREFUOMulk62ug0AQhb+5aUAhUBjeAIVdSUj4aXi8Pgkp3SYNci0vgUEhUGD2qmJaaLl31EzOzpfZnBzRWvOfOu2JeZ7bLU1rLQA/ewCttVwul3WOogittTyXPwIAmqZZ+6qqXvRdwDRNPB4PAHzfRyklhwBt29p5ngEoigLHcb6/wFpLXdcAiAhZlr19twnous72fQ+AUoogCOQQ4Hq9rv35fN785lvAMAzWGANAGIbEcSyHAPf7HWvtap2IfH/BsizcbjcAXNclSRLZc+oFYIyx4zgCkKYpnudxCPC0DqAsy49hkmcavwnOLuCv9QttsFRTIXyOUwAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_italic:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_underline{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIAB0gUKLFxgAAAK5JREFUOMvtk8EJhDAQRV9ksRLBCiwhEMFerCQHexGcSyoIWIFN5OwhewrsxrgsZI/7b5l5+TDMHyUi1Kh5fRhjojEm3sGlfkOl/gaZQdu2AJzneQFTLTFFg77vAdj3/bLKVEtM0UBrDYC1FudcDCEQQsA5F621b0ySypO4LEvctq047ziOzPOsPhoAeO/juq4cxwFA13VM08QwDCpnVe0tPPKsf/NJRNTPclA9whOE5kYCIDcMCQAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_underline:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_strikethrough{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIACE7qTR11QAAARFJREFUOMutUyGOhEAQrLmg+QHhATzhNkgMeh6wi5w/kHkCCCSehGARSDwSNYqgRmDGQtJnbsmyxx3c7VXSoivdlXR1NzPG4BVYz8SyLGjblpqmwTAMAADXdREEAXzfZ5b11GKMWWOaJgghCMBuCCFomqZNzyZJk5QAEOeciqIgpRQppagoCuKcEwBKk5S+FbgX9X2/KTLGoO/7VfyRt86a5TgO2zP87TG5vF8AAFJK1HVNWms6Et6ozvOMOI4py7KVC8Pwxy2wT4f/DHZ0SFpr6roOVVWhLEukSYrr7cpOC9wxjiN5ngfOOfI8Z7smRlFEtm3TOI6nxzrcgtaa6romKeWm5t9O+YsHv30m9uo7fwChngRRWCWECgAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_strikethrough:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_dotted{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIACQpJ/rw2AAAAFtJREFUOMvtkbsNgDAMBc+IabKW5bGyTybIIG8B0wCi45OCJidZ8nPlp7PWWtZaAXB3SinGGyIigQQyIlISkjhud7MwyOruZ7jukh5Vsf3dz4xX6L1PC9PC/xY2HshsE72V1dYAAAAASUVORK5CYII=\");background-repeat:no-repeat;background-position:center} .tinydoc_button_dotted:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_numbered{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIACgMwEtrkwAAAHJJREFUOMvNkzEKwDAMA6XiJT/LM/K1TBm9asnb0qlQSgOtM7Ta7EGIEyKAAQCSiIBMEnPO4/y83jNJ4oZF2cz5qQElLSXgATEKcpNEd2eYQWtt9N5RSgm1YLVWuDtTSt8w+EkL0R0AgN0Rf7WF1QTLDHbuCD9uIC7lSwAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_numbered:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_highlight{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIAwkdJCLg2wAAAN1JREFUOMvFk7GNhDAQRZ/vLKe0AJmdU5ITSqACSqAgOnBgBBESknOLbC5goz0JLdwhbbAT/hl/vz+W1TAMO2/UF2+WPhP3fafrOnLOABRFQdu2KKXuEaSUfg8D5JxJKd2PME0TAN57vPcH7ZZBjBFjDFVVUVUVxhhijPcMtm1jXVestWit0VpjrWVdV7Zt+3+JT9QQAiGEl15d138TjON4+WRnvQOBiDDPM2VZ0jTNYbDve+Z5RkQwxpwTLMuCiOCce7nJOYeIsCzLdYQn4pXBWQz18b+g9p/vzxI8ADfZZ0b8LW/QAAAAAElFTkSuQmCC\");background-repeat:no-repeat;background-position:center} .tinydoc_button_highlight:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_link{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIETgmTNZ5UwAAAcNJREFUOMuNkrGK8kAUhc9EG0sbbXyG9AbLXYvIFoomRrAwPoggPoAIVhmDWGiMKQQxhW4ZfIC08QlsgtNYxftX7ir8m90LUwzD+ebccy8TQuAvdTweabFYgIjQ6XSgqioDgOxfxJ7nEeccqqoik8lgMpnger2SYRjsV8Bms6HZbAbTNKFpGgOAYrFInHOUSiViaS0EQUCj0ehF/KjpdErn8xnSL79DVVVomsbiOH57frvf78hms+mAXC4HWZbhui4ZhnF8QNbrNe33e9TrdUAI8eOJogicc1IUhTjnJISAZVmkKArZtk1CCLxkcDgcyHEcAMBwOGSn04ls24ZpmigUCgjDEL7vo9/vo9VqMQDfANd1ybZtqKoKWZZxuVzwEJfLZTYYDAgA2u02qtXqd6BCiC+blmXR851zTlEUpbYpBUFAtm2j1+tB13UWx/Hbs+3xeExpQUvb7Ra1Wg26rjMAyOfzn6vV6l3TNBaGIW63W+qiSUmSQJJep5nP5z9d1yXf99FsNtMBjUYDu90Onud9WX0EapomKpUKSwMwIQQcx6H5fI6Pjw8kSQLf9/+7vj8CAMD3fVoul2CModvtvo4qpf4B6K4azkk8uZwAAAAASUVORK5CYII=\");background-repeat:no-repeat;background-position:center} .tinydoc_button_link:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_template{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIEh4sbZutMAAAAFBJREFUOMtjZGBg+M9AAWBhYGBg+PTpEyM5mvn4+P4zMVAB/P/06RMD1Cv/0fmE2CzIJiF7BR+bj48PHm7U9wIxbGQ+I5QzGgsjOxYYKc3OAOmZja1ll10GAAAAAElFTkSuQmCC\");background-repeat:no-repeat;background-position:center} .tinydoc_button_template:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_calc{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkQFwIfp1os4AAAALRJREFUOMvVU7EKwjAQfVcjikvBpbufkULRjkV38TsrGS1oL6N+jenUcxJKEyFiF99yIXf38t4dAX4EvQ+51hcBthENTcu88xJaa4l5cVyn/IL8DEjldSao+cYH/9qDVMxMaZquNu65zLJsTkRr9NiHFKlPUo0xDgBwf6Asy77rOkQRiNB17NM5JzSjOkTgWbC2LURkMbRgjycV8h+cbmycbI3Jt0qimf9HgRp+khgSAhpMiRcKtVp0wswb6wAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_calc:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_clear{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:32px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIACsnR9rBEAAAATxJREFUOMulk7FqwlAUhr+UbIKDGXwFsUJFRx/BVcggZGynzF7IC9y8Qt/DyckHEJUswhUujglk8G6CcLo0xSq0SfvBgQMXvnN+DtdzzlHRbreFmjjnPIAn/snTvbWq8/nsTadTAIwx396q6T9ucDqdZLlcMpvN6Ha7Xq0NbsmyDIDhcFg/wi273e7vguv1+iUYDAZvjQXH41FWqxXz+ZxOp/PeWFDlH41Gzc5Ysd1uP/O/NBdcLheyLGMymdDvP3sAeZ5LkiRSlqUGKMtSJ0kieZ7Lg+BwOMh6vabX69FqtQDwfT8tigKl1MIYI0qpRVEU+L6fPgj2+/1D/iAIlNY6BRiPxwBordMgCJR/L4iiyIuiqNF/kN/KWqvDMJQwDGWz2bxWvbVW1xIYYySOY7HW4pzT1lriOBZjjHwAufKy2MF7tKcAAAAASUVORK5CYII=\");background-repeat:no-repeat;background-position:center} .tinydoc_button_clear:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_document{display:block;padding:8px;outline:none;color:black;background-color:white;font-family:Arial;font-size:16px;line-height:1.3;overflow:auto;-webkit-text-size-adjust:none;-webkit-user-select:text;user-select:text} .tinydoc_document a{text-decoration:underline;color:#3a76b1} .tinydoc_contentviewer{display:inline-block;font-family:Arial;font-size:13px;line-height:2.6;margin-left:11px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:1px;white-space:nowrap} .tinydoc_contentviewer a{text-decoration:none;color:#3a76b1;margin-right:11px} .tinydoc_contentviewer .tinydoc_spellchecker_suggestions{display:inline-block;margin-right:10px} .tinydoc_spellchecker_no_suggestions{color:gray} misspelled{text-decoration:underline;text-decoration-color:red;text-decoration-thickness:2px;text-decoration-style:dotted} @media (pointer: coarse) { .tinydoc_button_save:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_print:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_spellcheck:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_undo:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_redo:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_bold:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_italic:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_underline:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_strikethrough:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_dotted:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_numbered:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_highlight:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_link:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_template:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_calc:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_clear:hover{background-color:#F2F2F2;border:thin solid #F2F2F2}}";
		document.getElementsByTagName("head")[0].appendChild(this.styleSheet);

		// ADDING THE MENU BAR
		this.menuContainer = document.createElement("div");
		this.menuContainer.className = "tinydoc_menu_container";
		this.menuWrapper = document.createElement("div");
		this.menuWrapper.className = "tinydoc_menu";
		this.menuContainer.appendChild(this.menuWrapper);
		this.menu = document.createElement("div");
		this.menu.className = "tinydoc_menu_size";
		this.menuWrapper.appendChild(this.menu);
		this.myContainer.appendChild(this.menuContainer);

		// CHECKING IF THERE IS A SAVE FUNCTION
		if (this.saveFunction)
			{
			// ADDING THE SAVE BUTTON
			this.holder1 = document.createElement("div");
			this.holder1.className = "tinydoc_holder";
			this.menu.appendChild(this.holder1);
			this.buttonSave = document.createElement("div");
			this.buttonSave.className = "tinydoc_button_save";
			this.holder1.appendChild(this.buttonSave);

			// ADDING A SEPARATOR
			this.separator1 = document.createElement("div");
			this.separator1.className = "tinydoc_separator";
			this.menu.appendChild(this.separator1);
			}

		// ADDING THE PRINT BUTTON
		this.holder2 = document.createElement("div");
		this.holder2.className = "tinydoc_holder";
		this.menu.appendChild(this.holder2);
		this.buttonPrint = document.createElement("div");
		this.buttonPrint.className = "tinydoc_button_print";
		this.holder2.appendChild(this.buttonPrint);

		// ADDING A SEPARATOR
		this.separator2 = document.createElement("div");
		this.separator2.className = "tinydoc_separator";
		this.menu.appendChild(this.separator2);

		// CHECKING IF THE SPELLCHECKER IS ENABLED
		if (this.spellcheckerEnabled==true)
			{
			// ADDING THE SPELLCHECKER BUTTON
			this.holder3 = document.createElement("div");
			this.holder3.className = "tinydoc_holder";
			this.menu.appendChild(this.holder3);
			this.buttonSpellcheck = document.createElement("div");
			this.buttonSpellcheck.className = "tinydoc_button_spellcheck";
			this.holder3.appendChild(this.buttonSpellcheck);

			// ADDING A SEPARATOR
			this.separator3 = document.createElement("div");
			this.separator3.className = "tinydoc_separator";
			this.menu.appendChild(this.separator3);
			}

		// ADDING THE UNDO BUTTON
		this.holder4 = document.createElement("div");
		this.holder4.className = "tinydoc_holder";
		this.menu.appendChild(this.holder4);
		this.buttonUndo = document.createElement("div");
		this.buttonUndo.className = "tinydoc_button_undo";
		this.holder4.appendChild(this.buttonUndo);

		// ADDING THE REDO BUTTON
		this.holder5 = document.createElement("div");
		this.holder5.className = "tinydoc_holder";
		this.menu.appendChild(this.holder5);
		this.buttonRedo = document.createElement("div");
		this.buttonRedo.className = "tinydoc_button_redo";
		this.holder5.appendChild(this.buttonRedo);

		// ADDING A SEPARATOR
		this.separator4 = document.createElement("div");
		this.separator4.className = "tinydoc_separator";
		this.menu.appendChild(this.separator4);

		// ADDING THE BOLD BUTTON
		this.holder6 = document.createElement("div");
		this.holder6.className = "tinydoc_holder";
		this.menu.appendChild(this.holder6);
		this.buttonBold = document.createElement("div");
		this.buttonBold.className = "tinydoc_button_bold";
		this.holder6.appendChild(this.buttonBold);

		// ADDING THE ITALIC BUTTON
		this.holder7 = document.createElement("div");
		this.holder7.className = "tinydoc_holder";
		this.menu.appendChild(this.holder7);
		this.buttonItalic = document.createElement("div");
		this.buttonItalic.className = "tinydoc_button_italic";
		this.holder7.appendChild(this.buttonItalic);

		// ADDING THE UNDERLINE BUTTON
		this.holder8 = document.createElement("div");
		this.holder8.className = "tinydoc_holder";
		this.menu.appendChild(this.holder8);
		this.buttonUnderline = document.createElement("div");
		this.buttonUnderline.className = "tinydoc_button_underline";
		this.holder8.appendChild(this.buttonUnderline);

		// ADDING THE STRIKETHROUGH BUTTON
		this.holder9 = document.createElement("div");
		this.holder9.className = "tinydoc_holder";
		this.menu.appendChild(this.holder9);
		this.buttonStrikethrough = document.createElement("div");
		this.buttonStrikethrough.className = "tinydoc_button_strikethrough";
		this.holder9.appendChild(this.buttonStrikethrough);

		// ADDING A SEPARATOR
		this.separator5 = document.createElement("div");
		this.separator5.className = "tinydoc_separator";
		this.menu.appendChild(this.separator5);

		// ADDING THE DOTTED BUTTON
		this.holder10 = document.createElement("div");
		this.holder10.className = "tinydoc_holder";
		this.menu.appendChild(this.holder10);
		this.buttonDotted = document.createElement("div");
		this.buttonDotted.className = "tinydoc_button_dotted";
		this.holder10.appendChild(this.buttonDotted);

		// ADDING THE NUMBERED BUTTON
		this.holder11 = document.createElement("div");
		this.holder11.className = "tinydoc_holder";
		this.menu.appendChild(this.holder11);
		this.buttonNumbered = document.createElement("div");
		this.buttonNumbered.className = "tinydoc_button_numbered";
		this.holder11.appendChild(this.buttonNumbered);

		// ADDING THE HIGHLIGHT BUTTON
		this.holder12 = document.createElement("div");
		this.holder12.className = "tinydoc_holder";
		this.menu.appendChild(this.holder12);
		this.buttonHighlight = document.createElement("div");
		this.buttonHighlight.className = "tinydoc_button_highlight";
		this.holder12.appendChild(this.buttonHighlight);

		// ADDING THE LINK BUTTON
		this.holder13 = document.createElement("div");
		this.holder13.className = "tinydoc_holder";
		this.menu.appendChild(this.holder13);
		this.buttonLink = document.createElement("div");
		this.buttonLink.className = "tinydoc_button_link";
		this.holder13.appendChild(this.buttonLink);

		// ADDING A SEPARATOR
		this.separator6 = document.createElement("div");
		this.separator6.className = "tinydoc_separator";
		this.menu.appendChild(this.separator6);

		// CHECKING IF THERE IS A TEMPLATE 1
		if (editorConfig.template1)
			{
			// ADDING THE TEMPLATE 1 BUTTON
			this.holder14 = document.createElement("div");
			this.holder14.className = "tinydoc_holder";
			this.menu.appendChild(this.holder14);
			this.buttonTemplate1 = document.createElement("div");
			this.buttonTemplate1.className = "tinydoc_button_template";
			this.holder14.appendChild(this.buttonTemplate1);
			}

		// CHECKING IF THERE IS A TEMPLATE 2
		if (editorConfig.template2)
			{
			// ADDING THE TEMPLATE 2 BUTTON
			this.holder15 = document.createElement("div");
			this.holder15.className = "tinydoc_holder";
			this.menu.appendChild(this.holder15);
			this.buttonTemplate2 = document.createElement("div");
			this.buttonTemplate2.className = "tinydoc_button_template";
			this.holder15.appendChild(this.buttonTemplate2);
			}

		// CHECKING IF THERE IS A TEMPLATE 3
		if (editorConfig.template3)
			{
			// ADDING THE TEMPLATE 3 BUTTON
			this.holder16 = document.createElement("div");
			this.holder16.className = "tinydoc_holder";
			this.menu.appendChild(this.holder16);
			this.buttonTemplate3 = document.createElement("div");
			this.buttonTemplate3.className = "tinydoc_button_template";
			this.holder16.appendChild(this.buttonTemplate3);
			}

		// CHECKING IF THERE IS ANY TEMPLATE
		if (editorConfig.template1 || editorConfig.template2 || editorConfig.template3)
			{
			// ADDING A SEPARATOR
			this.separator7 = document.createElement("div");
			this.separator7.className = "tinydoc_separator";
			this.menu.appendChild(this.separator7);
			}

		// ADDING THE CALC BUTTON
		this.holder17 = document.createElement("div");
		this.holder17.className = "tinydoc_holder";
		this.menu.appendChild(this.holder17);
		this.buttonCalc = document.createElement("div");
		this.buttonCalc.className = "tinydoc_button_calc";
		this.holder17.appendChild(this.buttonCalc);

		// ADDING A SEPARATOR
		this.separator8 = document.createElement("div");
		this.separator8.className = "tinydoc_separator";
		this.menu.appendChild(this.separator8);

		// ADDING THE CLEAR FORMAT BUTTON
		this.holder18 = document.createElement("div");
		this.holder18.className = "tinydoc_holder";
		this.menu.appendChild(this.holder18);
		this.buttonClear = document.createElement("div");
		this.buttonClear.className = "tinydoc_button_clear";
		this.holder18.appendChild(this.buttonClear);

		// ADDING A SEPARATOR
		this.separator9 = document.createElement("div");
		this.separator9.className = "tinydoc_separator";
		this.menu.appendChild(this.separator9);

		// ADDING THE CONTENT VIEWER
		this.holder19 = document.createElement("div");
		this.holder19.className = "tinydoc_holder";
		this.menu.appendChild(this.holder19);
		this.contentViewer = document.createElement("div");
		this.contentViewer.className = "tinydoc_contentviewer";
		this.holder19.appendChild(this.contentViewer);

		// ADDING THE PLEASE WAIT CONTAINER
		this.pleaseWait = document.createElement("div");
		this.pleaseWait.style.backgroundColor = "white";
		this.pleaseWait.style.position = "absolute";
		this.pleaseWait.style.left = 0;
		this.pleaseWait.style.right = 0;
		this.pleaseWait.style.top = 0;
		this.pleaseWait.style.bottom = 0;
		this.pleaseWait.style.display = "none";
		this.pleaseWait.style.zIndex = 98;
		this.pleaseWait.style.opacity = 0.5;
		this.pleaseWait.addEventListener("mousedown",function(event){event.preventDefault()});
		this.myContainer.appendChild(this.pleaseWait);

		// ADDING THE PLEASE WAIT ICON
		this.pleaseWaitIcon = document.createElement("div");
		this.pleaseWaitIcon.style.backgroundColor = "white";
		this.pleaseWaitIcon.style.position = "absolute";
		this.pleaseWaitIcon.style.left = 0;
		this.pleaseWaitIcon.style.right = 0;
		this.pleaseWaitIcon.style.top = 0;
		this.pleaseWaitIcon.style.bottom = 0;
		this.pleaseWaitIcon.style.display = "none";
		this.pleaseWaitIcon.style.zIndex = 99;
		this.pleaseWaitIcon.style.background = "url('data:image/gif;base64,R0lGODlhHwAfAPUAAP///wAAAOjo6NLS0ry8vK6urqKiotzc3Li4uJqamuTk5NjY2KqqqqCgoLCwsMzMzPb29qioqNTU1Obm5jY2NiYmJlBQUMTExHBwcJKSklZWVvr6+mhoaEZGRsbGxvj4+EhISDIyMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAHwAfAAAG/0CAcEgUDAgFA4BiwSQexKh0eEAkrldAZbvlOD5TqYKALWu5XIwnPFwwymY0GsRgAxrwuJwbCi8aAHlYZ3sVdwtRCm8JgVgODwoQAAIXGRpojQwKRGSDCRESYRsGHYZlBFR5AJt2a3kHQlZlERN2QxMRcAiTeaG2QxJ5RnAOv1EOcEdwUMZDD3BIcKzNq3BJcJLUABBwStrNBtjf3GUGBdLfCtadWMzUz6cDxN/IZQMCvdTBcAIAsli0jOHSJeSAqmlhNr0awo7RJ19TJORqdAXVEEVZyjyKtE3Bg3oZE2iK8oeiKkFZGiCaggelSTiA2LhxiZLBSjZjBL2siNBOFQ84LxHA+mYEiRJzBO7ZCQIAIfkECQoAAAAsAAAAAB8AHwAABv9AgHBIFAwIBQPAUCAMBMSodHhAJK5XAPaKOEynCsIWqx0nCIrvcMEwZ90JxkINaMATZXfju9jf82YAIQxRCm14Ww4PChAAEAoPDlsAFRUgHkRiZAkREmoSEXiVlRgfQgeBaXRpo6MOQlZbERN0Qx4drRUcAAJmnrVDBrkVDwNjr8BDGxq5Z2MPyUQZuRgFY6rRABe5FgZjjdm8uRTh2d5b4NkQY0zX5QpjTc/lD2NOx+WSW0++2RJmUGJhmZVsQqgtCE6lqpXGjBchmt50+hQKEAEiht5gUcTIESR9GhlgE9IH0BiTkxrMmWIHDkose9SwcQlHDsOIk9ygiVbl5JgMLuV4HUmypMkTOkEAACH5BAkKAAAALAAAAAAfAB8AAAb/QIBwSBQMCAUDwFAgDATEqHR4QCSuVwD2ijhMpwrCFqsdJwiK73DBMGfdCcZCDWjAE2V347vY3/NmdXNECm14Ww4PChAAEAoPDltlDGlDYmQJERJqEhGHWARUgZVqaWZeAFZbERN0QxOeWwgAAmabrkMSZkZjDrhRkVtHYw+/RA9jSGOkxgpjSWOMxkIQY0rT0wbR2LQV3t4UBcvcF9/eFpdYxdgZ5hUYA73YGxruCbVjt78G7hXFqlhY/fLQwR0HIQdGuUrTz5eQdIc0cfIEwByGD0MKvcGSaFGjR8GyeAPhIUofQGNQSgrB4IsdOCqx7FHDBiYcOQshYjKDxliVDpRjunCjdSTJkiZP6AQBACH5BAkKAAAALAAAAAAfAB8AAAb/QIBwSBQMCAUDwFAgDATEqHR4QCSuVwD2ijhMpwrCFqsdJwiK73DBMGfdCcZCDWjAE2V347vY3/NmdXNECm14Ww4PChAAEAoPDltlDGlDYmQJERJqEhGHWARUgZVqaWZeAFZbERN0QxOeWwgAAmabrkMSZkZjDrhRkVtHYw+/RA9jSGOkxgpjSWOMxkIQY0rT0wbR2I3WBcvczltNxNzIW0693MFYT7bTumNQqlisv7BjswAHo64egFdQAbj0RtOXDQY6VAAUakihN1gSLaJ1IYOGChgXXqEUpQ9ASRlDYhT0xQ4cACJDhqDD5mRKjCAYuArjBmVKDP9+VRljMyMHDwcfuBlBooSCBQwJiqkJAgAh+QQJCgAAACwAAAAAHwAfAAAG/0CAcEgUDAgFA8BQIAwExKh0eEAkrlcA9oo4TKcKwharHScIiu9wwTBn3QnGQg1owBNld+O72N/zZnVzRApteFsODwoQABAKDw5bZQxpQ2JkCRESahIRh1gEVIGVamlmXgBWWxETdEMTnlsIAAJmm65DEmZGYw64UZFbR2MPv0QPY0hjpMYKY0ljjMZCEGNK09MG0diN1gXL3M5bTcTcyFtOvdzBWE+207pjUKpYrL+wY7MAB4EerqZjUAG4lKVCBwMbvnT6dCXUkEIFK0jUkOECFEeQJF2hFKUPAIkgQwIaI+hLiJAoR27Zo4YBCJQgVW4cpMYDBpgVZKL59cEBhw+U+QROQ4bBAoUlTZ7QCQIAIfkECQoAAAAsAAAAAB8AHwAABv9AgHBIFAwIBQPAUCAMBMSodHhAJK5XAPaKOEynCsIWqx0nCIrvcMEwZ90JxkINaMATZXfju9jf82Z1c0QKbXhbDg8KEAAQCg8OW2UMaUNiZAkREmoSEYdYBFSBlWppZl4AVlsRE3RDE55bCAACZpuuQxJmRmMOuFGRW0djD79ED2NIY6TGCmNJY4zGQhBjStPTFBXb21DY1VsGFtzbF9gAzlsFGOQVGefIW2LtGhvYwVgDD+0V17+6Y6BwaNfBwy9YY2YBcMAPnStTY1B9YMdNiyZOngCFGuIBxDZAiRY1eoTvE6UoDEIAGrNSUoNBUuzAaYlljxo2M+HIeXiJpRsRNMaq+JSFCpsRJEqYOPH2JQgAIfkECQoAAAAsAAAAAB8AHwAABv9AgHBIFAwIBQPAUCAMBMSodHhAJK5XAPaKOEynCsIWqx0nCIrvcMEwZ90JxkINaMATZXfjywjlzX9jdXNEHiAVFX8ODwoQABAKDw5bZQxpQh8YiIhaERJqEhF4WwRDDpubAJdqaWZeAByoFR0edEMTolsIAA+yFUq2QxJmAgmyGhvBRJNbA5qoGcpED2MEFrIX0kMKYwUUslDaj2PA4soGY47iEOQFY6vS3FtNYw/m1KQDYw7mzFhPZj5JGzYGipUtESYowzVmF4ADgOCBCZTgFQAxZBJ4AiXqT6ltbUZhWdToUSR/Ii1FWbDnDkUyDQhJsQPn5ZU9atjUhCPHVhgTNy/RSKsiqKFFbUaQKGHiJNyXIAAh+QQJCgAAACwAAAAAHwAfAAAG/0CAcEh8JDAWCsBQIAwExKhU+HFwKlgsIMHlIg7TqQeTLW+7XYIiPGSAymY0mrFgA0LwuLzbCC/6eVlnewkADXVECgxcAGUaGRdQEAoPDmhnDGtDBJcVHQYbYRIRhWgEQwd7AB52AGt7YAAIchETrUITpGgIAAJ7ErdDEnsCA3IOwUSWaAOcaA/JQ0amBXKa0QpyBQZyENFCEHIG39HcaN7f4WhM1uTZaE1y0N/TacZoyN/LXU+/0cNyoMxCUytYLjm8AKSS46rVKzmxADhjlCACMFGkBiU4NUQRxS4OHijwNqnSJS6ZovzRyJAQo0NhGrgs5bIPmwWLCLHsQsfhxBWTe9QkOzCwC8sv5Ho127akyRM7QQAAOwAAAAAAAAAAAA==') no-repeat center";
		this.pleaseWaitIcon.addEventListener("mousedown",function(event){event.preventDefault()});
		this.myContainer.appendChild(this.pleaseWaitIcon);

		// ADDING THE EDITABLE DOCUMENT
		this.document = document.createElement("div");
		this.document.className = "tinydoc_document";
		this.document.contentEditable = true;

		// CHECKING IF THE SPELLCHECKER IS ENABLED
		if (this.spellcheckerEnabled==true)
			{
			// DISABLING THE BROWSER SPELLCHECKER FOR THE DOCUMENT
			this.document.spellcheck = false;
			}

		// ADDING THE DOCUMENT TO THE CONTAINER
		this.myContainer.appendChild(this.document);

		// CHECKING IF THERE IS A DEFAULT DOCUMENT TEXT
		if (editorConfig.documentText)
			{
			// SETTING THE DOCUMENT TEXT
			this.document.innerHTML = editorConfig.documentText;
			}
			else
			{
			// SETTING AN EMPTY DOCUMENT TEXT
			this.document.innerHTML = "<div></div>";
			}

		// SETTING THE CURRENT INSTANCE FOR LATER USE
		var thisTinyDOC = this;

		// CREATING A VARIABLE TO STORE THE SPELLCHECKER RESULT
		this.spellcheckerResult = [];

		// CREATING A VARIABLE TO SET THAT THE SPELLCHECKER STATUS
		this.spellcheckerWorking = false;

		// CREATING A VARIABLE TO SET THAT THE SPELLCHECKER WAS EXECUTED
		this.spellcheckerExecuted = false;

		// CREATING A VARIABLE TO SET THE SPELLCHECKER WEB WORKER
		this.myWorker = null;

		// SETTING A VARIABLE TO KNOW IF THE DOCUMENT CAN UNDO/REDO
		this.canUndoRedo = true;

		// SETTING AN UNDO SAVE TIMEOUT VARIABLE TO PREVENT MULTI SAVE UNDO WHILE TYPING
		this.undoSaveTimeout = null;

		// SETTING A VARIABLE TO HANDLE THE KEY ENTER WHEN PRESSED
		this.keyEnterPressed = false;

		// SETTING A VARIABLE TO HANDLE WHEN A THE NEW TEXT IS SET
		this.settingNewText = false;

		// ADDING A REGEX FOR CHECKING IF THE USER IS USING SAFARI
		this.isUsingSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

		// ADDING A REGEX FOR CHECKING IF THE USER IS USING CHROME
		this.isUsingChrome = /.*chrome/i.test(navigator.userAgent);

		// CHECKING IF THERE IS A SAVE FUNCTION
		if (this.saveFunction)
			{
			// SETTING WHAT WILL HAPPEN WHEN THE USER CLICKS ON THE SAVE BUTTON
			this.buttonSave.addEventListener("mousedown",function(event){thisTinyDOC.save();event.preventDefault()});
			}

		// CHECKING IF THE SPELLCHECKER IS ENABLED
		if (this.spellcheckerEnabled==true)
			{
			// SETTING WHAT WILL HAPPEN WHEN THE USER CLICKS ON THE SPELLCHECKER BUTTON
			this.buttonSpellcheck.addEventListener("mousedown",function(event){thisTinyDOC.spellcheck();event.preventDefault()});
			}

		// SETTING WHAT WILL HAPPEN WHEN THE USER CLICKS ON A MENU BUTTON
		this.buttonPrint.addEventListener("mousedown",function(event){thisTinyDOC.print();event.preventDefault()});
		this.buttonUndo.addEventListener("mousedown",function(event){thisTinyDOC.formatDoc("undo",null);event.preventDefault()});
		this.buttonRedo.addEventListener("mousedown",function(event){thisTinyDOC.formatDoc("redo",null);event.preventDefault()});
		this.buttonBold.addEventListener("mousedown",function(event){thisTinyDOC.formatDoc("bold",null);event.preventDefault()});
		this.buttonItalic.addEventListener("mousedown",function(event){thisTinyDOC.formatDoc("italic",null);event.preventDefault()});
		this.buttonUnderline.addEventListener("mousedown",function(event){thisTinyDOC.formatDoc("underline",null);event.preventDefault()});
		this.buttonStrikethrough.addEventListener("mousedown",function(event){thisTinyDOC.formatDoc("strikethrough",null);event.preventDefault()});
		this.buttonDotted.addEventListener("mousedown",function(event){thisTinyDOC.formatDoc("insertunorderedlist",null);event.preventDefault()});
		this.buttonNumbered.addEventListener("mousedown",function(event){thisTinyDOC.formatDoc("insertorderedlist",null);event.preventDefault()});
		this.buttonHighlight.addEventListener("mousedown",function(event){thisTinyDOC.formatDoc("BackColor","#FFFF00");event.preventDefault()});
		this.buttonLink.addEventListener("mousedown",function(event){thisTinyDOC.insertLink();event.preventDefault()});
		this.buttonCalc.addEventListener("mousedown",function(event){thisTinyDOC.insertCalc();event.preventDefault()});
		this.buttonClear.addEventListener("mousedown",function(event){thisTinyDOC.formatDoc("removeFormat",null);event.preventDefault()});

		// CHECKING IF THERE IS A TEMPLATE 1
		if (editorConfig.template1)
			{
			// ADDING THE TEMPLATE 1 BUTTON
			this.buttonTemplate1.addEventListener("mousedown",function(event){thisTinyDOC.insertHtmlAtCaret(template1,false);event.preventDefault()});
			}

		// CHECKING IF THERE IS A TEMPLATE 2
		if (editorConfig.template2)
			{
			// ADDING THE TEMPLATE 2 BUTTON
			this.buttonTemplate2.addEventListener("mousedown",function(event){thisTinyDOC.insertHtmlAtCaret(template2,false);event.preventDefault()});
			}

		// CHECKING IF THERE IS A TEMPLATE 3
		if (editorConfig.template3)
			{
			// ADDING THE TEMPLATE 3 BUTTON
			this.buttonTemplate3.addEventListener("mousedown",function(event){thisTinyDOC.insertHtmlAtCaret(template3,false);event.preventDefault()});
			}

		// SETTING WHAT WILL HAPPEN WHEN THE USER IS CLICKING
		this.document.addEventListener("mousedown", function(event)
			{
			try
				{
				// CHECKING IF THE DOCUMENT IS DISABLED
				if (thisTinyDOC.documentEnabled==false)
					{
					// PREVENTING ANY SELECTION TO BE MADE
					event.preventDefault();
					}
				}
				catch(err)
				{
				}
			});

		// SETTING WHAT WILL HAPPEN WHEN THE USER IS TYPING
		this.document.addEventListener("keydown", function(event)
			{
			try
				{
				// CHECKING IF THE DOCUMENT IS DISABLED
				if (thisTinyDOC.documentEnabled==false)
					{
					// PREVENTING ANY INPUT
					event.preventDefault();
					}
					else
					{
					//CODE FOR ADDING SPACES (TABS) WHEN THE TAB KEY IS DOWN
					if (event.keyCode==9)
						{
						// CANCELING THE TAB KEY EVENT
						event.preventDefault();

						// INSERTING SPACES AS A TAB SPACE
						thisTinyDOC.insertHtmlAtCaret("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",false);

						// FOCUSING THE DOCUMENT AFTER 100 MS
						setTimeout(function(){thisTinyDOC.document.focus()},100);
						}
					else if (event.keyCode==13)
						{
						// HANDLING THE BREAKLINE EVENT
						thisTinyDOC.handleBreakline(event);
						}
					else if ((event.ctrlKey || event.metaKey) && String.fromCharCode(event.which).toLowerCase()=="s")
						{
						// CHECKING IF THERE IS A SAVE FUNCTION
						if (thisTinyDOC.saveFunction)
							{
							// CANCELING THE SAVING PAGE KEY EVENT
							event.preventDefault();

							// SAVING THE DOCUMENT
							thisTinyDOC.save();
							}
						}
					else if ((event.ctrlKey || event.metaKey) && !event.shiftKey && String.fromCharCode(event.which).toLowerCase()=="z")
						{
						// CANCELING THE NATIVE UNDO EVENT
						event.preventDefault();

						// REGISTERING THE UNDO EVENT
						thisTinyDOC.undo(true);
						}
					else if (event.shiftKey && event.metaKey && String.fromCharCode(event.which).toLowerCase()=="z")
						{
						// CANCELING THE NATIVE REDO EVENT
						event.preventDefault();

						// REGISTERING THE REDO EVENT
						thisTinyDOC.redo(true);
						}
					else if ((event.ctrlKey && event.shiftKey) && String.fromCharCode(event.which).toLowerCase()=="z")
						{
						// CANCELING THE NATIVE UNDO EVENT
						event.preventDefault();

						// REGISTERING THE UNDO EVENT
						thisTinyDOC.undo(true);
						}
					else if (event.ctrlKey && String.fromCharCode(event.which).toLowerCase()=="y")
						{
						// CANCELING THE NATIVE REDO EVENT
						event.preventDefault();

						// REGISTERING THE REDO EVENT
						thisTinyDOC.redo(true);
						}
					}
				}
				catch(err)
				{
				}
			});

		// SETTING WHAT WILL HAPPEN WHEN THE USER IS TYPING
		this.document.addEventListener("keyup", function(event)
			{
			// CHECKING IF THE DOCUMENT IS DISABLED
			if (thisTinyDOC.documentEnabled==false)
				{
				// PREVENTING ANY INPUT
				event.preventDefault();
				}
			else if ((event.ctrlKey || event.metaKey) && !event.shiftKey && String.fromCharCode(event.which).toLowerCase()=="z")
				{
				// CANCELING THE NATIVE UNDO EVENT
				event.preventDefault();
				}
			else if (event.shiftKey && event.metaKey && String.fromCharCode(event.which).toLowerCase()=="z")
				{
				// CANCELING THE NATIVE REDO EVENT
				event.preventDefault();
				}
			else if ((event.ctrlKey && event.shiftKey) && String.fromCharCode(event.which).toLowerCase()=="z")
				{
				// CANCELING THE NATIVE UNDO EVENT
				event.preventDefault();
				}
			else if (event.ctrlKey && String.fromCharCode(event.which).toLowerCase()=="y")
				{
				// CANCELING THE NATIVE REDO EVENT
				event.preventDefault();
				}
			else
				{
				// CHECKING FOR ANY URL OR MISSPELLED WORD AT THE CURRENT CARET POSITION
				thisTinyDOC.checkForURL();
				thisTinyDOC.checkForMisspelled();

				// CHECKING IF THERE IS A PREVIOUS UNDO SAVE TIMEOUT
				if (thisTinyDOC.undoSaveTimeout!=null)
					{
					// CLEARING THE PREVIOUS UNDO SAVE TIMEOUT
					clearTimeout(thisTinyDOC.undoSaveTimeout);
					}

				// WAITING 100 MS FOR THE UI TO BE UPDATED
				thisTinyDOC.undoSaveTimeout = setTimeout(function()
					{
					// REGISTERING THE UNDO EVENT
					thisTinyDOC.saveUndo();
					},100);
				}
			});

		// SETTING WHAT WILL HAPPEN WHEN THE USER IS CLICKING
		this.document.addEventListener("click", function(event)
			{
			// CHECKING IF THE DOCUMENT IS DISABLED
			if (thisTinyDOC.documentEnabled==false)
				{
				// PREVENTING ANY INPUT
				event.preventDefault();
				}
			else
				{
				// CHECKING FOR ANY URL OR MISSPELLED WORD AT THE CURRENT CARET POSITION
				thisTinyDOC.checkForURL();
				thisTinyDOC.checkForMisspelled();
				}
			});

		// SETTING WHAT WILL HAPPEN WHEN THE USER IS RIGHT CLICKING
		this.document.addEventListener("contextmenu", function(event)
			{
			// CHECKING IF THE DOCUMENT IS DISABLED
			if(thisTinyDOC.documentEnabled==false)
				{
				// PREVENTING ANY INPUT
				event.preventDefault();
				}
			else
				{
				// CHECKING FOR ANY URL OR MISSPELLED WORD AT THE CURRENT CARET POSITION
				thisTinyDOC.checkForURL();
				thisTinyDOC.checkForMisspelled();
				}
			});

		// SETTING WHAT WILL HAPPEN WHEN THE USER PASTE A TEXT
		this.document.addEventListener("paste", function(event)
			{
			try
				{
				// CANCELING THE PASTE EVENT
				event.preventDefault();

				// GETTING THE CLIPBOARD CONTENT AS PLAIN TEXT
				var text = (event.originalEvent || event).clipboardData.getData("text/plain");

				// REPLACING SPECIAL CHARACTERS
				text = text.replace(/&/gm, "&amp;");
				text = text.replace(/</gm, "&lt;");
				text = text.replace(/>/gm, "&gt;");
				text = text.replace(/  /gm, "&nbsp;&nbsp;");
				text = text.replace(/\n/gm, "<br />");

				// FOCUSING THE DOCUMENT
				thisTinyDOC.document.focus();

				// PASTING THE PLAIN TEXT
				thisTinyDOC.insertHtmlAtCaret(text,false);
				}
				catch(err)
				{
				}
			});

		// SETTING WHAT WILL HAPPEN WHEN THERE IS AN INPUT IN THE DOCUMENT
		this.document.addEventListener("input", function(event)
			{
			// SETTING THE DOCUMENT AS DIRTY
			window.onbeforeunload = function(e){return "Dirty"};
			});

		// CLEARING THE DOCUMENT UNDO/REDO HISTORY
		this.clearUndoRedo();

		// FORCING AN INITIAL RESIZE
		this.resize();

		// SCROLLING TO THE TOP OF THE DOCUMENT
		this.scrollToTop();
		}

	new()
		{
		try
			{
			try
				{
				// LOOPING EVERY DOCUMENT CHILD
				while (this.document.firstChild)
					{
					// REMOVING EVERY CHILD
					this.document.removeChild(this.document.firstChild);
					}
				}
				catch(err)
				{
				}

			// SETTING THE DOCUMENT AS CLEAN
			window.onbeforeunload = null;

			// CLEARING THE DOCUMENT UNDO/REDO HISTORY
			this.clearUndoRedo();

			// TRYING TO MOVE THE CURSOR TO THE BEGINNING OF THE DOCUMENT
			this.setCaretPosition(this.document,0);

			// SCROLLING TO THE TOP OF THE DOCUMENT
			this.scrollToTop();

			// FOCUSING THE DOCUMENT
			this.focus();
			}
			catch(err)
			{
			}
		}

	save()
		{
		try
			{
			// CHECKING THAT THE SPELLCHECKER IS NOT WORKING
			if (this.spellcheckerWorking==false)
				{
				// EXECUTING THE SAVE FUNCTION
				this.saveFunction();
				}
			}
			catch(err)
			{
			}
		}

	resize()
		{
		try
			{
			// RESIZING THE DOCUMENT WHEN THE SCREEN SIZE CHANGES
			this.document.style.width = (this.myContainer.offsetWidth - 16) + "px";
			this.document.style.height = (this.myContainer.offsetHeight - 57) + "px";

			// RESIZING THE PLEASE WAIT CONTAINER
			this.pleaseWait.style.left = this.myContainer.offsetLeft + "px";
			this.pleaseWait.style.right = this.myContainer.offsetRight + "px";;
			this.pleaseWait.style.top = this.myContainer.offsetTop + "px";
			this.pleaseWait.style.bottom = this.myContainer.offsetBottom + "px";
			this.pleaseWait.style.width = this.myContainer.offsetWidth + "px";
			this.pleaseWait.style.height = this.myContainer.offsetHeight + "px";

			// RESIZING THE PLEASE WAIT ICON CONTAINER
			this.pleaseWaitIcon.style.left = this.myContainer.offsetLeft + "px";
			this.pleaseWaitIcon.style.right = this.myContainer.offsetRight + "px";;
			this.pleaseWaitIcon.style.top = this.myContainer.offsetTop + "px";
			this.pleaseWaitIcon.style.bottom = this.myContainer.offsetBottom + "px";
			this.pleaseWaitIcon.style.width = this.myContainer.offsetWidth + "px";
			this.pleaseWaitIcon.style.height = this.myContainer.offsetHeight + "px";

			// RESIZING THE DOCUMENT AFTER 100 MS
			setTimeout(function(){try{this.document.style.width = (this.myContainer.offsetWidth - 16) + "px";this.document.style.height = (this.myContainer.offsetHeight - 57) + "px";this.pleaseWait.style.left = this.myContainer.offsetLeft + "px";this.pleaseWait.style.right = this.myContainer.offsetRight + "px";;this.pleaseWait.style.top = this.myContainer.offsetTop + "px";this.pleaseWait.style.bottom = this.myContainer.offsetBottom + "px";this.pleaseWait.style.width = this.myContainer.offsetWidth + "px";this.pleaseWait.style.height = this.myContainer.offsetHeight + "px";this.pleaseWaitIcon.style.left = this.myContainer.offsetLeft + "px";this.pleaseWaitIcon.style.right = this.myContainer.offsetRight + "px";;this.pleaseWaitIcon.style.top = this.myContainer.offsetTop + "px";this.pleaseWaitIcon.style.bottom = this.myContainer.offsetBottom + "px";this.pleaseWaitIcon.style.width = this.myContainer.offsetWidth + "px";this.pleaseWaitIcon.style.height = this.myContainer.offsetHeight + "px";}catch(err){}},100);
			}
			catch(err)
			{
			}
		}

	scrollToTop()
		{
		try
			{
			// SCROLLING TO THE TOP OF THE DOCUMENT
			this.document.scrollTop = 0;
			}
			catch(err)
			{
			}
		}

	// https://stackoverflow.com/questions/47361276/javascript-scroll-to-cursor-post-a-paste-in-contenteditable-div
	scrollToCaret()
		{
		try
			{
			// SAVING THE CURRENT SELECTION
			var currentSelection = this.saveSelection(this.document);

			// GETTING THE CARET Y POSITION
			var caretPositionY = this.getCaretY() - this.document.offsetTop + 16;

			// CHECKING IF THE CARET IS WITHIN THE VISIBLE CONTENT
			if (caretPositionY<0 || caretPositionY>this.document.offsetHeight)
				{
				// GETTING THE CURRENT SELECTION
				var selection = window.getSelection();

				// CHECKING IF THERE ARE SELECTION RANGES
				if (!selection.rangeCount)
					{
					return;
					}

				// GETTING THE FIRST SELECTION RANGE. THERE'S ALMOST NEVER CAN BE MORE (INSTEAD OF FIREFOX)
				var firstRange = selection.getRangeAt(0);

				// SOMETIMES IF THE EDITABLE ELEMENT IS GETTING REMOVED FROM THE DOM YOU MAY GET A HIERARCHYREQUEST ERROR IN SAFARI
				if (firstRange.commonAncestorContainer === document)
					{
					return;
					}

				// CREATING AN EMPTY BR THAT WILL BE USED AS AN ANCHOR FOR SCROLL, BECAUSE IT'S IMPOSIBLE TO DO IT WITH JUST TEXT NODES
				var tempAnchorEl = document.createElement("br");

				// ADDING A BREAKLINE AFTER THE CARET POSITION
				firstRange.insertNode(tempAnchorEl);

				// CHECKING WHERE TO SCROLL TO
				if (caretPositionY<0)
					{
					// SCROLLING TO THE BR AND TRYING TO SHOW IT AS THE FIRST LINE
					tempAnchorEl.scrollIntoView({block: "start"});
					}
					else
					{
					// SCROLLING TO THE BR AND TRYING TO SHOW IT AS THE LAST LINE
					tempAnchorEl.scrollIntoView({block: "end"});
					}

				// REMOVING THE ANCHOR BECAUSE IT'S NOT NEEDED ANYMORE
				tempAnchorEl.remove();
				}

			// CHECKING IF THERE IS SOMETHING TO SELECT
			if (currentSelection.start!=currentSelection.end)
				{
				// RESTORING THE SELECTION
				this.restoreSelection(this.document,currentSelection);
				}
			}
			catch(err)
			{
			}
		}

	// https://stackoverflow.com/questions/6846230/coordinates-of-selected-text-in-browser-page
	getCaretY()
		{
		try
			{
			var sel = document.selection;
			var range;
			var rect;
			var x = 0;
			var y = 0;

			if (sel)
				{
				if (sel.type != "Control")
					{
					range = sel.createRange();
					range.collapse(true);
					x = range.boundingLeft;
					y = range.boundingTop;
					}
				}
			else if (window.getSelection)
				{
				sel = window.getSelection();

				if (sel.rangeCount)
					{
					range = sel.getRangeAt(0).cloneRange();

					if (range.getClientRects)
						{
						range.collapse(true);

						if (range.getClientRects().length>0)
							{
							rect = range.getClientRects()[0];
							x = rect.left;
							y = rect.top;
							}
						}

					// FALLING BACK TO INSERTING A TEMPORARY ELEMENT
					if (x == 0 && y == 0)
						{
						var span = document.createElement("span");
						if (span.getClientRects)
							{
							// ENSURING SPAN HAS DIMENSIONS AND POSITION BY ADDING A ZERO-WIDTH SPACE CHARACTER
							span.appendChild( document.createTextNode("\u200b") );
							range.insertNode(span);
							rect = span.getClientRects()[0];
							x = rect.left;
							y = rect.top;

							var spanParent = span.parentNode;
							spanParent.removeChild(span);

							// GLUING ANY BROKEN TEXT NODES BACK TOGETHER
							spanParent.normalize();
							}
						}
					}
				}
			return y;
			}
			catch(err)
			{
			}
		return 0;
		}

	setText(myText)
		{
		try
			{
			// CHECKING IF THERE IS A WORKER CREATED
			if (this.myWorker!=null)
				{
				// TERMINATING THE WORKER
				this.myWorker.terminate();
				}

			// CLEARING THE DOCUMENT
			this.new();

			// SETTING THAT A NEW TEXT WILL BE INSERTED
			this.settingNewText = true;

			// SETTING THE DOCUMENT TEXT
			this.insertHtmlAtCaret(myText,false);

			// SETTING THE DOCUMENT AS CLEAN
			window.onbeforeunload = null;

			// CLEARING THE DOCUMENT UNDO/REDO HISTORY
			this.clearUndoRedo();

			// CLEARING THE SPELLCHECKER RESULT
			this.spellcheckerResult = [];

			// CHECKING IF THE SPELLCHECKER IS WORKING
			if (this.spellcheckerWorking==true)
				{
				// ENABLING THE DOCUMENT
				this.enable();
				}

			// SETTING THAT THE SPELLCHECKER IS NOT WORKING
			this.spellcheckerWorking = false;

			// SETTING THAT THE SPELLCHECKER WAS NOT EXECUTED
			this.spellcheckerExecuted = false;

			// HIDING THE PLEASE WAIT ANIMATION
			this.showPleaseWait(false);

			// RESTORING THE SPELLCHECK BUTTON STYLE
			this.buttonSpellcheck.className = "tinydoc_button_spellcheck";

			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// WAITING 25 MS FOR THE UI TO BE UPDATED
			setTimeout(function()
				{
				// MOVING THE CARET TO THE FIRST CHARACTER
				thisTinyDOC.setCaretPosition(thisTinyDOC.document,0);
				},25);
			}
			catch(err)
			{
			}
		}

	getText(mustEncode)
		{
		function encodeText(str)
			{
			// FUNCTION FOR ESCAPING SPECIAL CHARACTERS
			var i = str.length;
			var aRet = [];
			while (i--)
				{
				var tempChar = str[i].charCodeAt();
				if (tempChar > 126 || (tempChar==34 || tempChar==39 || tempChar==60 || tempChar==62))
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

		// GETTING THE DOCUMENT INNERHTML CONTENT
		var originalHTML = this.document.innerHTML;

		// CLEARING THE MISSPELLED TAGS
		originalHTML = originalHTML.replace(/\<misspelled\>/gm, "");
		originalHTML = originalHTML.replace(/\<\/misspelled\>/gm, "");

		// CHECKING IF THE INNERHTML MUST BE ENCODED
		if (mustEncode)
			{
			// RETURNING THE ENCODED INNERHTML
			return encodeText(originalHTML);
			}
			else
			{
			// RETURNING THE INNERHTML
			return originalHTML;
			}
		}

	enable()
		{
		// SETTING THAT THE DOCUMENT IS ENABLED
		this.documentEnabled = true;

		// SHOWING THE CARET
		this.document.style.caretColor = "black";
		}

	disable()
		{
		// SETTING THAT THE DOCUMENT IS DISABLED
		this.documentEnabled = false;

		// HIDING THE CARET
		this.document.style.caretColor = "transparent";
		}

	showPleaseWait(mustShow)
		{
		// CHECKING IF THE PLEASE WAIT SCREEN MUST BE DISPLAYED
		if (mustShow==true)
			{
			// DISPLAYING THE PLEASE WAIT SCREEN
			this.pleaseWait.style.display = "block";
			this.pleaseWaitIcon.style.display = "block";
			}
			else
			{
			// HIDING THE PLEASE WAIT SCREEN
			this.pleaseWait.style.display = "none";
			this.pleaseWaitIcon.style.display = "none";
			}
		}

	focus()
		{
		try
			{
			// FOCUSING THE DOCUMENT
			this.document.focus();

			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// FOCUSING THE DOCUMENT AFTER 100 MS
			setTimeout(function(){thisTinyDOC.document.focus()},100);
			}
			catch(err)
			{
			}
		}

	formatDoc(myCommand, myParameter)
		{
		try
			{
			// FOCUSING THE DOCUMENT
			this.document.focus();

			// CHECKING THAT THE SPELLCHECKER IS NOT WORKING
			if (this.spellcheckerWorking==false)
				{
				// CHECKING ALL THE POSSIBLE COMMANDS
				if (myCommand=="bold"){this.formatStyle("b",myParameter)}
				else if(myCommand=="italic") {this.formatStyle("i",myParameter)}
				else if(myCommand=="underline"){this.formatStyle("u",myParameter)}
				else if(myCommand=="strikethrough"){this.formatStyle("strike",myParameter)}
				else if(myCommand=="BackColor"){this.formatStyle("span",myParameter)}
				else if(myCommand=="insertunorderedlist"){this.formatList("ul","li")}
				else if(myCommand=="insertorderedlist"){this.formatList("ol","li")}
				else if(myCommand=="removeFormat"){this.removeFormat()}
				else if(myCommand=="undo"){this.undo(false)}
				else if(myCommand=="redo"){this.redo(false)}
				}

			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// FOCUSING THE DOCUMENT AFTER 100 MS
			setTimeout(function(){thisTinyDOC.document.focus()},100);
			}
			catch(err)
			{
			}
		}

	formatStyle(myTag, myParameter)
		{
		try
			{
			// GETTING THE CURRENT SELECTION
			var currentSelection = this.saveSelection(this.document);

			// PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
			if (this.isDocumentSelected()==false){return}

			// PREVENTING STYLING OF MULTIPLE LIST ITEMS
			if((this.getParentTag("LI")!=null || this.getParentTag("UL")!=null || this.getParentTag("OL")!=null) && window.getSelection().toString().indexOf("\n")>-1)
				{
				// SETTING THE CURRENT INSTANCE FOR LATER USE
				var thisTinyDOC = this;

				// WAITING 25 MS FOR THE UI TO BE UPDATED
				setTimeout(function()
					{
					// RESTORING THE SELECTION
					thisTinyDOC.restoreSelection(thisTinyDOC.document,currentSelection);

					// CHECKING IF THE USER IS USING CHROME OR SAFARI
					if (thisTinyDOC.isUsingChrome==true || thisTinyDOC.isUsingSafari==true)
						{
						// CHECKING IF THE SELECTED TEXT HAS NO BREAKLINES (NOT SELECTING MULTIPLE LIST ITEMS)
						if (window.getSelection().toString().indexOf("\n")==-1)
							{
							// EXECUTING THE FORMAT STYLE
							thisTinyDOC.formatStyleExecute(myTag, myParameter);
							}
						}
					},25);

				// NO POINT GOING ANY FURTHER
				return;
				}

			// EXECUTING THE FORMAT STYLE
			this.formatStyleExecute(myTag, myParameter);
			}
			catch(err)
			{
			}
		}

	formatStyleExecute(myTag, myParameter)
		{
		try
			{
			// REGISTERING THE UNDO EVENT
			this.saveUndo();

			// GETTING THE CURRENT SELECTION
			var selection = window.getSelection();
			var range = selection.getRangeAt(0);

			// GETTING THE SELECTED CONTENT
			var selectedContent = range.extractContents();

			// CREATING THE NEW TAG
			var newTag = document.createElement(myTag);

			// ADDING THE SELECTED CONTENT TO THE NEW TAG
			newTag.appendChild(selectedContent);

			// CHECKING IF IT IS A SPAN ELEMENT (IN THIS PROJECT, USED FOR HIGHLIGHT)
			if (myTag=="span")
				{
				// SETTING THE BACKGROUND COLOR
				newTag.style.backgroundColor = myParameter;
				}

			// DELETING THE SELECTED CONTENT
			range.deleteContents();

			// INSERTING THE NEW TAG
			range.insertNode(newTag);

			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// WAITING 25 MS FOR THE UI TO BE UPDATED
			setTimeout(function()
				{
				// MAINTAINING THE INITIAL SELECTION
				range = range.cloneRange();
				range.setStartBefore(newTag);
				selection.removeAllRanges();
				selection.addRange(range);

				// REGISTERING THE UNDO EVENT
				thisTinyDOC.saveUndo();

				// SETTING THE DOCUMENT AS DIRTY
				window.onbeforeunload = function(e){return "Dirty"};
				},25);
			}
			catch(err)
			{
			}
		}

	formatList(tag1,tag2)
		{
		try
			{
			// PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
			if (this.isDocumentSelected()==false){return}

			// PREVENTING NESTED LISTS
			if(this.getParentTag("LI")==null && this.getParentTag("UL")==null && this.getParentTag("OL")==null)
				{
				// GETTING THE SELECTED TEXT
				var selectedText = window.getSelection().toString();

				// CHECKING IF THERE IS NO SELECTION
				if (selectedText=="")
					{
					// ADDING A BREAKLINE TO THE ITEM TAG (FOR MOVING THROUGH THE EMPTY LIST USING THE KEYS)
					selectedText = "<br />";
					}

				// INSERTING THE LIST
				this.insertHtmlAtCaret("<" + tag1 + "><" + tag2 + ">" + selectedText + "</" + tag2 + "></" + tag1 + ">",false);
				}
			}
			catch(err)
			{
			}
		}

	getParentTag(tagToFind)
		{
		try
			{
			// GETTING THE SELECTED RANGE
			var range = window.getSelection().getRangeAt(0);

			// GETTING THE CURRENT FOCUS NODE
			var upperNode = range.startContainer;

			// LOOPING ALL THE PARENT NODES
			while (upperNode.parentNode!=this.document)
				{
				// GETTING THE PARENT NODE
				upperNode = upperNode.parentNode;

				// CHECKING IF THE PARENT NODE IS THE REQUESTED ONE
				if (upperNode.nodeName==tagToFind)
					{
					return upperNode;
					}
				}
			}
			catch(err)
			{
			}
		return null;
		}

	getCurrentTag()
		{
		var currentNode = null;

		try
			{
			// GETTING THE SELECTED RANGE
			var range = window.getSelection().getRangeAt(0);

			// GETTING THE CURRENT FOCUS NODE
			currentNode = range.startContainer;
			}
			catch(err)
			{
			}

		return currentNode;
		}

	// https://stackoverflow.com/questions/16736680/get-caret-index-in-contenteditable-div-including-tags
	getCaretCharacterOffsetWithin(element)
		{
		var caretOffset = 0;
		try
			{
			var range = window.getSelection().getRangeAt(0);
			var preCaretRange = range.cloneRange();
			preCaretRange.selectNodeContents(element);
			preCaretRange.setEnd(range.endContainer, range.endOffset);
			caretOffset = preCaretRange.toString().length;
			}
			catch(err)
			{
			}
		return caretOffset;
		}

	handleBreakline(event)
		{
		try
			{
			// SEARCHING FOR THE REQUIRED TAGS
			var tagLI = this.getParentTag("LI");
			var tagUL = this.getParentTag("UL");
			var tagOL = this.getParentTag("OL");

			// CHECKING IF THE CARET IS IN A LIST
			if (tagLI==null && (tagUL!=null || tagOL!=null))
				{
				// CANCELING THE ENTER KEY EVENT
				event.preventDefault();

				// GETTING THE INITIAL NODE
				var initialNode  = window.getSelection().focusNode;

				// GETTING THE CURRENT FOCUS NODE
				var upperNode = window.getSelection().focusNode;

				// CREATING A VARIABLE TO KNOW IF A LIST NODE WAS FOUND
				var listNode = null;

				// LOOPING ALL THE PARENT NODES
				while (upperNode.parentNode)
					{
					// GETTING THE PARENT NODE
					upperNode = upperNode.parentNode;

					// CHECKING IF THE ELEMENT IS A LIST TYPE
					if (upperNode.nodeName=="UL" || upperNode.nodeName=="OL")
						{
						// SETTING THAT THERE IS A LIST AS A PARENT NODE
						listNode = upperNode;
						}
					}

				// CHECKING IF THERE IS A LIST AS A PARENT NODE
				if (listNode!=null)
					{
					// CHECKING IF THE CARET IS AT THE LAST ITEM OF THE LIST
					if (listNode.lastChild==initialNode)
						{
						// CHECKING IF THE BREAKLINE WASN'T HANDLED WITHIN A LINK TAG
						if (this.handleBreaklineInLink()==false)
							{
							// ADDING A BREAKLINE AFTER THE LIST NODE
							this.addBreakLineAfter(listNode);
							}
						}
					}
				}

			// CHECKING IF THE CARET IS NOT IN A LIST
			else if (tagLI==null)
				{
				// CANCELING THE ENTER KEY EVENT
				event.preventDefault();

				// CHECKING IF THE BREAKLINE WASN'T HANDLED WITHIN A LINK TAG
				if (this.handleBreaklineInLink()==false)
					{
					// SETTING THAT KEY ENTER WAS PRESSED
					this.keyEnterPressed = true;

					// INSERTING THE BREAKLINE
					this.insertHtmlAtCaret("<br />",false);
					}
				}
			}
			catch(err)
			{
			}
		}

	handleBreaklineInLink()
		{
		try
			{
			// SEARCHING FOR A LINK TAG
			var linkTag = this.getParentTag("A");

			// CHECKING IF A LINK TAG WAS FOUND
			if (linkTag!=null)
				{
				// CHECKING IF THE CARET IS AT THE LAST POSITION OF THE LINK TAG
				if (this.getCaretCharacterOffsetWithin(linkTag)==linkTag.text.length)
					{
					// ADDING A BREAKLINE AFTER THE LINK TAG
					this.addBreakLineAfter(linkTag);
					return true;
					}
				}
			}
			catch(err)
			{
			}
		return false;
		}

	addBreakLineAfter(currentNode)
		{
		try
			{
			// REGISTERING THE UNDO EVENT
			this.saveUndo();

			// CREATING A BREAKLINE
			var tempAnchorEl = document.createElement("br");

			// ADDING THE BREAKLINE AFTER THE LIST
			currentNode.parentNode.insertBefore(tempAnchorEl, currentNode.nextSibling);

			// SETTING THAT THE CARET MUST BE PLACED BEFORE THE INSERTED NODE
			var startBefore = true;

			// CHECKING IF THE CURRENT NODE IS NOT A LIST
			if (currentNode.nodeName!="UL" && currentNode.nodeName!="OL")
				{
				// SETTING THAT THE CARET MUST BE PLACED AFTER THE INSERTED NODE
				startBefore = false;
				}

			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// WAITING 25 MS FOR THE UI TO BE UPDATED
			setTimeout(function()
				{
				// MOVING THE CARET TO THE BREAKLINE
				var range = document.createRange();
				range.selectNodeContents(tempAnchorEl);
				if (startBefore==true)
					{
					range.setStartBefore(tempAnchorEl);
					}
				else
					{
					range.setStartAfter(tempAnchorEl);
					}
				range.collapse(true);
				var sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);

				// REGISTERING THE UNDO EVENT
				thisTinyDOC.saveUndo();
				},25);
			}
			catch(err)
			{
			}
		}

	isDocumentSelected()
		{
		try
			{
			// CREATING A VARIABLE TO CHECK IF THE DOCUMENT WAS FOUND
			var docFound = false;

			// GETTING THR CURRENT FOCUS NODE
			var upperNode = window.getSelection().focusNode;

			// CHECKING IF THAT NODE IS THE ONE THAT NEEDS TO BE FOUND
			if (upperNode==this.document)
				{
				// SETTING THAT THE DOCUMENT WAS FOUND
				docFound = true;
				}

			// LOOPING ALL THE PARENT NODES
			while (upperNode.parentNode)
				{
				// GETTING THE PARENT NODE
				upperNode = upperNode.parentNode;

				// CHECKING IF THAT NODE IS THE ONE THAT NEEDS TO BE FOUND
				if (upperNode==this.document)
					{
					// SETTING THAT THE DOCUMENT WAS FOUND
					docFound = true;
					}
				}

			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// FOCUSING THE DOCUMENT AFTER 100 MS
			setTimeout(function(){thisTinyDOC.document.focus()},100);

			// RETURNNING THAT THE DOCUMENT FOUND RESULT
			return docFound;
			}
			catch(err)
			{
			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// FOCUSING THE DOCUMENT AFTER 100 MS
			setTimeout(function(){thisTinyDOC.document.focus()},100);

			// RETURN THAT THE DOCUMENT WAS NOT FOUND
			return false;
			}
		}

	removeFormat()
		{
		try
			{
			// CHECKING IF THERE IS ANY SELECTED TEXT
			if(window.getSelection().toString())
				{
				// GETTING THE SELECTED TEXT
				var plainText = window.getSelection().toString();

				// REPLACING SPECIAL CHARACTERS
				plainText = plainText.replace(/&/gm, "&amp;");
				plainText = plainText.replace(/</gm, "&lt;");
				plainText = plainText.replace(/>/gm, "&gt;");
				plainText = plainText.replace(/  /gm, "&nbsp;&nbsp;");
				plainText = plainText.replace(/\n/gm, "<br />");

				try
					{
					// GETTING THE SELECTED RANGE
					var range = window.getSelection().getRangeAt(0);

					// CHECKING IF AN ENTIRE TAG WAS SELECTED
					if (range.startOffset==0 && (range.endOffset==0 || range.endOffset==window.getSelection().toString().length))
						{
						// GETTING THE CURRENT FOCUS NODE
						var upperNode = range.startContainer;

						// LOOPING ALL THE PARENT NODES UNTIL HIT THE DOCUMENT OR A LIST ITEM
						while (upperNode.parentNode!=this.document && upperNode.parentNode.nodeName!="LI")
							{
							// GETTING THE PARENT NODE
							upperNode = upperNode.parentNode;
							}

						// GETTING THE UPPER NODE
						var lowerNode = upperNode;

						// CREATING A VARIABLE TO CHECK IF A LIST ITEM WAS FOUND
						var foundListItem = false;

						// LOOPING ALL THE CHILD NODES
						while (lowerNode.firstChild)
							{
							// GETTING THE CHILD NODE
							lowerNode = lowerNode.firstChild;

							// CHECKING IF THE NODE IS A LIST ITEM
							if (lowerNode.nodeName=="LI")
								{
								// SETTING THAT THE LIST ITEM WAS FOUND
								foundListItem = true;
								}
							}

						// CHECKING IF THERE IS NO LIST ITEM SELECTED
						if(foundListItem==false)
							{
							// CHECKING IF THE UPPER NODE TEXT IS THE SELECTED TEXT
							if (upperNode.innerText.length==range.endOffset)
								{
								// REMOVING THE PARENT NODE
								upperNode.parentNode.removeChild(upperNode);
								}
							}
						}
					}
					catch(err)
					{
					}

				// INSERTING THE PLAIN TEXT
				this.insertHtmlAtCaret(plainText,true);
				}
			}
			catch(err)
			{
			}
		}

	spellcheck()
		{
		try
			{
			// CHECKING IF THE SPELLCHECKER IS NOT WORKING
			if (this.spellcheckerWorking==false)
				{
				// PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
				if (this.isDocumentSelected()==false){return}

				// CHECKING IF A SUGGESTION IS DISPLAYED
				if (this.contentViewer.innerHTML.indexOf("<span ")>-1)
					{
					// CLEARING ANY SUGGESTION
					this.contentViewer.innerHTML = "";
					}

				// CHECKING IF THERE IS A WORKER CREATED
				if (this.myWorker!=null)
					{
					// TERMINATING THE WORKER
					this.myWorker.terminate();
					}

				// CHECKING IF THE SPELLCHECKER WAS EXECUTED PREVIOUSLY
				if (this.spellcheckerExecuted==true)
					{
					// GETTING THE CARET POSITION
					var originalCaretPosition = this.getCaretPosition(this.document);

					// CLEARING THE SPELLCHECKER RESULT
					this.spellcheckerResult = [];

					// GETTING THE DOCUMENT INNERHTML CONTENT
					var originalHTML = this.document.innerHTML;

					// CLEARING THE MISSPELLED TAGS
					originalHTML = originalHTML.replace(/\<misspelled\>/gm, "");
					originalHTML = originalHTML.replace(/\<\/misspelled\>/gm, "");

					try
						{
						// LOOPING EVERY DOCUMENT CHILD
						while (this.document.firstChild)
							{
							// REMOVING EVERY CHILD
							this.document.removeChild(this.document.firstChild);
							}
						}
						catch(err)
						{
						}

					// SETTING THAT THE SPELLCHECKER IS WORKING (TO PREVENT A SAVE UNDO)
					this.spellcheckerWorking = true;

					// SETTING THE DOCUMENT TEXT WITHOUT THE MISSPELLED WORDS UNDERLINED
					this.insertHtmlAtCaret(originalHTML,false);

					// SETTING THE CURRENT INSTANCE FOR LATER USE
					var thisTinyDOC = this;

					// WAITING 25 MS FOR THE UI TO BE UPDATED
					setTimeout(function()
						{
						// SETTING THAT THE SPELLCHECKER IS NOT WORKING
						thisTinyDOC.spellcheckerWorking = false;

						// SETTING THAT THE SPELLCHECKER WAS NOT EXECUTED
						thisTinyDOC.spellcheckerExecuted = false;

						// HIDING THE PLEASE WAIT ANIMATION
						thisTinyDOC.showPleaseWait(false);

						// RESTORING THE SPELLCHECK BUTTON STYLE
						thisTinyDOC.buttonSpellcheck.className = "tinydoc_button_spellcheck";

						// RESTORING THE CARET POSITION
						thisTinyDOC.setCaretPosition(thisTinyDOC.document,originalCaretPosition);
						},25);
					}
					else
					{
					// DISABLING THE DOCUMENT
					this.disable();

					// SHOWING THE PLEASE WAIT ANIMATION
					this.showPleaseWait(true);

					// ADDING A BORDER TO THE SPELLCHECK BUTTON STYLE
					this.buttonSpellcheck.className = "tinydoc_button_spellcheck tinydoc_button_spellcheck_enabled";

					// SETTING THAT THE SPELLCHECKER IS WORKING
					this.spellcheckerWorking = true;

					// GETTING ALL THE WORDS FROM THE TEXT DOCUMENT
					var results = this.document.innerText.match(/[^ ?,.1234567890·!¡¿,`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\s]+/g);

					// CREATING THE DATA FOR THE REQUEST
					var dataRequest = {};
					dataRequest["lang"] = this.spellcheckerLanguage;
					dataRequest["words"] = results;

					// SETTING THE CURRENT INSTANCE FOR LATER USE
					var thisTinyDOC = this;

					// CREATING THE WEB WORKER FOR THE SPELLCHECKER SERVICE
					this.myWorker = new Worker(this.spellcheckerURL);

					// SETTING WHAT WILL HAPPEN WHEN A MESSAGE IS RECEIVED FROM THE WEB WORKER
					this.myWorker.onmessage = function(e)
						{
						try
							{
							// CHECKING IF THE SPELLCHECKER IS WORKING
							if (thisTinyDOC.spellcheckerWorking==true)
								{
								// FOCUSING THE DOCUMENT
								thisTinyDOC.focus();

								// GETTING THE WORKER MESSAGE
								var words = e.data;

								// GETTING THE SPELLCHECKER RESULT
								thisTinyDOC.spellcheckerResult = words;

								// GETTING THE DOCUMENT INNERHTML CONTENT
								var originalHTML = thisTinyDOC.document.innerHTML;

								// GETTING THE CARET POSITION
								var originalCaretPosition = thisTinyDOC.getCaretPosition(thisTinyDOC.document);

								// LOOPING EVERY WORD
								for (var key in words)
									{
									// GETTING THE WORD THAT MUST BE UNDERLINED
									var wordToUnderline = key;

									// REGEX FOR FINDING A WORD NOT INSIDE A TAG
									var exp = new RegExp("\\b(" + wordToUnderline + ")\\b(?![^<]*>|[^<>]*>)", "gi");

									// ADDING A MISSPELLED TAG TO EVERY MISSPELLED WORD
									originalHTML = originalHTML.replace(exp,function(m){return "<misspelled>" + m + "</misspelled>"});
									}

								try
									{
									// LOOPING EVERY DOCUMENT CHILD
									while (thisTinyDOC.document.firstChild)
										{
										// REMOVING EVERY CHILD
										thisTinyDOC.document.removeChild(thisTinyDOC.document.firstChild);
										}
									}
									catch(err)
									{
									}

								// SETTING THE DOCUMENT TEXT WITH THE MISSPELLED WORDS UNDERLINED
								thisTinyDOC.insertHtmlAtCaret(originalHTML,false);

								// ENABLING THE DOCUMENT
								thisTinyDOC.enable();

								// RESTORING THE CARET POSITION
								thisTinyDOC.setCaretPosition(thisTinyDOC.document,originalCaretPosition);

								// HIDING THE PLEASE WAIT ANIMATION
								thisTinyDOC.showPleaseWait(false);

								// WAITING 500 MS FOR THE NEXT SPELLCHECKING (WORKAROUND)
								setTimeout(function()
									{
									// SETTING THAT THE SPELLCHECKER IS NOT WORKING
									thisTinyDOC.spellcheckerWorking = false;

									// SETTING THAT THE SPELLCHECKER WAS EXECUTED
									thisTinyDOC.spellcheckerExecuted = true;
									},500);
								}
							}
							catch(err)
							{
							}
						return true;
						}

					// SETTING WHAT WILL HAPPEN IF SOMETHING GOES WRONG WITH THE WORKER
					this.myWorker.onerror = function(event)
						{
						// WAITING 25 MS FOR THE UI TO BE UPDATED
						setTimeout(function()
							{
							// SETTING THAT THE SPELLCHECKER IS NOT WORKING
							thisTinyDOC.spellcheckerWorking = false;

							// SETTING THAT THE SPELLCHECKER WAS NOT EXECUTED
							thisTinyDOC.spellcheckerExecuted = false;

							// RESTORING THE SPELLCHECK BUTTON STYLE
							thisTinyDOC.buttonSpellcheck.className = "tinydoc_button_spellcheck";

							// ENABLING THE DOCUMENT
							thisTinyDOC.enable();

							// RESTORING THE CARET POSITION
							thisTinyDOC.setCaretPosition(thisTinyDOC.document,originalCaretPosition);

							// HIDING THE PLEASE WAIT ANIMATION
							thisTinyDOC.showPleaseWait(false);
							},25);
						};

					// SENDING THE SPELLCHECKING REQUEST
					this.myWorker.postMessage(dataRequest);
					}
				}
			}
			catch(err)
			{
			}
		}

	print()
		{
		try
			{
			// CHECKING THAT THE SPELLCHECKER IS NOT WORKING
			if (this.spellcheckerWorking==false)
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
				newIframe.contentWindow.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body style='font-family:Arial;font-size:16px'>" + this.document.innerHTML + "<\/body><\/html>");
				newIframe.contentWindow.document.close(); //important!
				newIframe.contentWindow.focus(); //IE fix

				// PRINTING THE IFRAME
				newIframe.contentWindow.print();

				// REMOVING THE IFRAME
				document.body.removeChild(newIframe);
				}
			}
			catch(err)
			{
			}

		// SETTING THE CURRENT INSTANCE FOR LATER USE
		var thisTinyDOC = this;

		// FOCUSING THE DOCUMENT AFTER 100 MS
		setTimeout(function(){thisTinyDOC.document.focus()},100);
		}

	undo(keyboardRequest)
		{
		try
			{
			// PREVENTING OVERLAPPING DURING THE UNDO/REDO RENDERING EVENT
			if (this.canUndoRedo==false){return}

			// PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
			if (this.isDocumentSelected()==false && keyboardRequest==false){return}

			// PREVENTING TO UNDO CONTENT WHEN THE SPELLCHECKER IS WORKING
			if (this.spellcheckerWorking==true){return}

			// CLEARING THE SPELLCHECKER RESULT
			this.spellcheckerResult = [];

			// SETTING THAT THE SPELLCHECKER IS NOT WORKING
			this.spellcheckerWorking = false;

			// SETTING THAT THE SPELLCHECKER WAS NOT EXECUTED
			this.spellcheckerExecuted = false;

			// HIDING THE CARET
			this.document.style.caretColor = "transparent";

			// SETTING THAT THE DOCUMENT CANNOT DO A UNDO/REDO
			this.canUndoRedo = false;

			// GETTING THE CURRENT CARET POSITION
			this.document_history_lastCaret = this.getCaretPosition(this.document);

			// CHECKING IF THERE IS A DOCUMENT HISTORY TO UNDO
			if(this.document_history_index>0)
				{
				// LOOPING EVERY DOCUMENT CHILD
				while (this.document.firstChild)
					{
					// REMOVING EVERY CHILD
					this.document.removeChild(this.document.firstChild);
					}

				// UPDATING THE DOCUMENT CONTENT WITH THE PREVIOUS STORED CONTENT
				this.insertHtmlAtCaret(this.document_history[this.document_history_index-1],false);

				// SETTING THE CURRENT INSTANCE FOR LATER USE
				var thisTinyDOC = this;

				// WAITING 25 MS FOR THE UI TO BE UPDATED
				setTimeout(function()
					{
					// MOVING THE CARET TO THE STORED POSITION
					thisTinyDOC.setCaretPosition(thisTinyDOC.document,thisTinyDOC.document_history_caret[thisTinyDOC.document_history_index-1]);

					// UPDATING THE DOCUMENT HISTORY INDEX
					thisTinyDOC.document_history_index = thisTinyDOC.document_history_index - 1;

					// SCROLLING TO THE CARET
					thisTinyDOC.scrollToCaret();

					// SHOWING THE CARET
					thisTinyDOC.document.style.caretColor = "black";

					// SETTING THAT THE DOCUMENT CAN DO A UNDO/REDO
					thisTinyDOC.canUndoRedo = true;
					},25);
				}
				else
				{
				// SETTING THE CURRENT INSTANCE FOR LATER USE
				var thisTinyDOC = this;

				// WAITING 25 MS FOR THE UI TO BE UPDATED
				setTimeout(function()
					{
					// RESTORING THE CARET POSITION
					thisTinyDOC.setCaretPosition(thisTinyDOC.document,thisTinyDOC.document_history_lastCaret);

					// SHOWING THE CARET
					thisTinyDOC.document.style.caretColor = "black";

					// SETTING THAT THE DOCUMENT CAN DO A UNDO/REDO
					thisTinyDOC.canUndoRedo = true;
					},25);
				}
			}
			catch(err)
			{
			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// WAITING 25 MS FOR THE UI TO BE UPDATED
			setTimeout(function()
				{
				// IN CASE OF ERROR, MOVING THE CARET TO THE FIRST POSITION
				thisTinyDOC.setCaretPosition(thisTinyDOC.document,0);

				// SHOWING THE CARET
				thisTinyDOC.document.style.caretColor = "black";

				// SETTING THAT THE DOCUMENT CAN DO A UNDO/REDO
				thisTinyDOC.canUndoRedo = true;
				},25);
			}
		}

	redo(keyboardRequest)
		{
		try
			{
			// PREVENTING OVERLAPPING DURING THE UNDO/REDO RENDERING EVENT
			if (this.canUndoRedo==false){return}

			// PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
			if (this.isDocumentSelected()==false && keyboardRequest==false){return}

			// PREVENTING TO UNDO CONTENT WHEN THE SPELLCHECKER IS WORKING
			if (this.spellcheckerWorking==true){return}

			// CLEARING THE SPELLCHECKER RESULT
			this.spellcheckerResult = [];

			// SETTING THAT THE SPELLCHECKER IS NOT WORKING
			this.spellcheckerWorking = false;

			// SETTING THAT THE SPELLCHECKER WAS NOT EXECUTED
			this.spellcheckerExecuted = false;

			// HIDING THE CARET
			this.document.style.caretColor = "transparent";

			// SETTING THAT THE DOCUMENT CANNOT DO A UNDO/REDO
			this.canUndoRedo = false;

			// GETTING THE CURRENT CARET POSITION
			this.document_history_lastCaret = this.getCaretPosition(this.document);

			// CHECKING IF THERE IS A DOCUMENT HISTORY TO REDO
			if(this.document_history[this.document_history_index+1])
				{
				// LOOPING EVERY DOCUMENT CHILD
				while (this.document.firstChild)
					{
					// REMOVING EVERY CHILD
					this.document.removeChild(this.document.firstChild);
					}

				// UPDATING THE DOCUMENT CONTENT WITH THE NEXT STORED CONTENT
				this.insertHtmlAtCaret(this.document_history[this.document_history_index+1],false);

				// SETTING THE CURRENT INSTANCE FOR LATER USE
				var thisTinyDOC = this;

				// WAITING 25 MS FOR THE UI TO BE UPDATED
				setTimeout(function()
					{
					// MOVING THE CARET TO THE STORED POSITION
					thisTinyDOC.setCaretPosition(thisTinyDOC.document,thisTinyDOC.document_history_caret[thisTinyDOC.document_history_index+1]);

					// UPDATING THE DOCUMENT HISTORY INDEX
					thisTinyDOC.document_history_index = thisTinyDOC.document_history_index + 1;

					// SCROLLING TO THE CARET
					thisTinyDOC.scrollToCaret();

					// SHOWING THE CARET
					thisTinyDOC.document.style.caretColor = "black";

					// SETTING THAT THE DOCUMENT CAN DO A UNDO/REDO
					thisTinyDOC.canUndoRedo = true;
					},25);
				}
				else
				{
				// SETTING THE CURRENT INSTANCE FOR LATER USE
				var thisTinyDOC = this;

				// WAITING 25 MS FOR THE UI TO BE UPDATED
				setTimeout(function()
					{
					// RESTORING THE CARET POSITION
					thisTinyDOC.setCaretPosition(thisTinyDOC.document,thisTinyDOC.document_history_lastCaret);

					// SHOWING THE CARET
					thisTinyDOC.document.style.caretColor = "black";

					// SETTING THAT THE DOCUMENT CAN DO A UNDO/REDO
					thisTinyDOC.canUndoRedo = true;
					},25);
				}
			}
			catch(err)
			{
			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// WAITING 25 MS FOR THE UI TO BE UPDATED
			setTimeout(function()
				{
				// IN CASE OF ERROR, MOVING THE CARET TO THE FIRST POSITION
				thisTinyDOC.setCaretPosition(thisTinyDOC.document,0);

				// SHOWING THE CARET
				thisTinyDOC.document.style.caretColor = "black";

				// SETTING THAT THE DOCUMENT CAN DO A UNDO/REDO
				thisTinyDOC.canUndoRedo = true;
				},25);
			}
		}

	saveUndo()
		{
		try
			{
			// GETTING THE CURRENT DOCUMENT CONTENT OR STATE
			var current_state = this.document.innerHTML;

			// CLEARING THE MISSPELLED TAGS
			current_state = current_state.replace(/\<misspelled\>/gm, "");
			current_state = current_state.replace(/\<\/misspelled\>/gm, "");

			// IF CURRENT STATE IDENTICAL TO PREVIOUS DON'T SAVE IDENTICAL STATES
			if(current_state!=this.document_history[this.document_history_index])
				{
				// IF WE ALREADY USED UNDO BUTTON AND MADE MODIFICATION - DELETE ALL FORWARD HISTORY
				if(this.document_history_index<=this.document_history.length-1)
					{
					// REMOVING ALL FORWARD HISTORY
					this.document_history = this.document_history.slice(0,this.document_history_index+1);
					this.document_history_caret = this.document_history_caret.slice(0,this.document_history_index+1);

					// UPDATING THE DOCUMENT HISTORY INDEX
					this.document_history_index = this.document_history_index + 1;
					}

				// ADDING THE CURRENT DOCUMENT CONTENT STATE TO THE DOCUMENT HISTORY
				this.document_history.push(current_state);

				// ADDING THE CURRENT DOCUMENT CARET STATE TO THE DOCUMENT HISTORY
				this.document_history_caret.push(this.getCaretPosition(this.document));

				// UPDATING THE DOCUMENT HISTORY INDEX
				this.document_history_index = this.document_history.length - 1;
				}
			}
			catch(err)
			{
			}
		}

	clearUndoRedo()
		{
		// CLEARING THE UNDO/REDO HISTORY
		this.document_history = [];
		this.document_history_caret = [];
		this.document_history_index = 0;
		this.document_history_lastCaret = 0;

		// SAVING THE INITIAL STATE
		this.saveUndo();
		}

	// https://gist.github.com/isLishude/6ccd1fbf42d1eaac667d6873e7b134f8
	// https://codepen.io/jeffward/pen/OJjPKYo
	setCaretPosition(container, position)
		{
		try
			{
			function createRange(node,chars,range)
				{
				if(range == null)
					{
					range = window.document.createRange();
					range.selectNode(node);
					range.setStart(node,0);
					}

				if(chars.count == 0)
					{
					range.setEnd(node,chars.count);
					}
				else if(node != null && chars.count > 0)
					{
					if(node.nodeType == 3)
						{
						if(node.textContent.length < chars.count)
							{
							chars.count -= node.textContent.length;
							}
						else
							{
							range.setEnd(node,chars.count);
							chars.count = 0;
							}
						}
					else
						{
						var _g = 0;
						var _g1 = node.childNodes.length;
						while(_g < _g1)
							{
							var lp = _g++;
							range = createRange(node.childNodes[lp],chars,range);
							if(chars.count == 0)
								{
								break;
								}
							}
						}
					}
				return range;
				}

			if(position >= 0)
				{
				var selection = window.getSelection();
				var range = createRange(container,{ count : position});
				if(range != null)
					{
					range.collapse(false);
					selection.removeAllRanges();
					selection.addRange(range);
					}
				}
			}
			catch(err)
			{
			}
		}

	// https://stackoverflow.com/questions/3972014/get-contenteditable-caret-position
	getCaretPosition(element)
		{
		try
			{
			// CHECKING IF THE CARET IS IN THE DOCUMENT
			if (this.isDocumentSelected()==false){return 0}

			var caretOffset = 0;

			var range = window.getSelection().getRangeAt(0);
			var preCaretRange = range.cloneRange();

			preCaretRange.selectNodeContents(element);
			preCaretRange.setEnd(range.endContainer, range.endOffset);

			caretOffset = preCaretRange.toString().length;

			return caretOffset;
			}
			catch(err)
			{
			return 0;
			}
		}

	insertLink()
		{
		try
			{
			function checkForEmail(email)
				{
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(String(email).toLowerCase());
				}

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
							this.insertHtmlAtCaret("<a href='mailto:" + selectedText.toLowerCase() + "' target='_blank'>" + selectedText + "</a>", false);
							}
							else
							{
							// INSERTING THE URL LINK INTO THE DOCUMENT
							this.insertHtmlAtCaret("<a href='" + selectedText + "' target='_blank'>" + selectedText + "</a>", false);
							}
						}
					}
				}

			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// FOCUSING THE DOCUMENT AFTER 100 MS
			setTimeout(function(){thisTinyDOC.document.focus()},100);
			}
			catch(err)
			{
			}
		}

	insertCalc()
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
								this.insertHtmlAtCaret(" = ERROR",false);
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
								this.insertHtmlAtCaret(" = " + finalResult, false);
								}
							}
							catch(err)
							{
							// INSERTING AN ERROR TEXT IF THE EXPRESSION RESULT COULD NOT BE EVALUATED
							this.insertHtmlAtCaret(" = ERROR", false);
							}
						}
						else
						{
						// SETTING THE FINAL RESULT VARIABLE
						var finalResult = 0;

						// SETTING THE VARIABLE FOR THE LAST-LINE-BREAKLINE-CHECKER
						var lastLineBR = "";

						// GETTING ALL THE LINES
						for(var i=0; i<splitted.length; i++)
							{
							try
								{
								// GETTING ONE LINE
								var currentLine = splitted[i];

								// CHECKING THE LINE
								if (currentLine.length>0)
									{
									// TRIMMING THE CURRENT LINE
									currentLine = currentLine.trim();

									// CHECKING IF THE CURRENT LINE HAS A SPACE
									if (currentLine.lastIndexOf(" ")>-1)
										{
										// GETTING THE CONTENT AFTER THE SPACE
										currentLine = currentLine.substr(currentLine.lastIndexOf(" ")+1,currentLine.length);
										}

									// REMOVING INVALID CHARACTERS
									currentLine = currentLine.replace(/[^0-9.]/g, "");

									// ADDING THE VALUE TO THE FINAL RESULT
									finalResult = parseFloat(finalResult) + parseFloat(currentLine);
									}

								// CHECKING IF THE LAST LINE AND IS NOT A BREAKLINE.
								// IF SO, A BREAKLINE WILL BE ADDED BEFORE THE RESULT.
								if (currentLine!="" && i==splitted.length-1)
									{
									lastLineBR = "<br>";
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
								this.insertHtmlAtCaret(lastLineBR + "----------<br />ERROR", false);
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
								this.insertHtmlAtCaret(lastLineBR + "----------<br />" + finalResult, false);
								}
							}
							catch(err)
							{
							// INSERTING AN ERROR TEXT IF THE RESULT COULD NOT BE DISPLAYED
							this.insertHtmlAtCaret(lastLineBR + "----------<br />ERROR", false);
							}
						}
					}
				}
			}
			catch(err)
			{
			}

		// SETTING THE CURRENT INSTANCE FOR LATER USE
		var thisTinyDOC = this;

		// FOCUSING THE DOCUMENT AFTER 100 MS
		setTimeout(function(){thisTinyDOC.document.focus()},100);
		}

	checkForURL()
		{
		try
			{
			// SEARCHING FOR A LINK TAG
			var linkTag = this.getParentTag("A");

			// CHECKING IF A LINK TAG WASN'T FOUND
			if (linkTag==null)
				{
				// GETTING THE CURRENT TAG WHERE THE CARET IS LOCATED (BACKSAFE)
				linkTag = this.getCurrentTag();
				}

			// CHECKING IF A LINK TAG WAS FOUND
			if (linkTag.nodeName=="A")
				{
				// GETTING THE URL (IF ANY)
				var finalURL = linkTag.href;

				// CHECKING IF THERE IS A VALUE
				if(typeof finalURL !== "undefined")
					{
					// CLEARING THE MISSPELLED TAGS
					finalURL = finalURL.replace(/\<misspelled\>/gm, "");
					finalURL = finalURL.replace(/\<\/misspelled\>/gm, "");

					// ADDING THE VALUE TO THE CONTENT VIEWER
					this.contentViewer.innerHTML = "<a href='" + finalURL + "' target='_blank'>" + finalURL + "</a>";
					}
				}
				else
				{
				// CLEARING THE CONTENT VIEWER
				this.contentViewer.innerHTML = "";
				}
			}
			catch(err)
			{
			}
		}

	checkForMisspelled()
		{
		try
			{
			// SEARCHING FOR A MISSPELLED TAG
			var misspelledTag = this.getParentTag("MISSPELLED");

			// CHECKING IF A MISSPELLED TAG WASN'T FOUND
			if (misspelledTag==null)
				{
				// GETTING THE CURRENT TAG WHERE THE CARET IS LOCATED (BACKSAFE)
				misspelledTag = this.getCurrentTag();
				}

			// CHECKING IF A MISSPELLED TAG WAS FOUND
			if (misspelledTag.nodeName=="MISSPELLED")
				{
				// GETTING THE MISSPELLED WORD (IF ANY)
				var finalMisspelled = misspelledTag.textContent;

				// CHECKING IF THERE IS A VALUE
				if(typeof finalMisspelled !== "undefined")
					{
					// CLEARING THE CONTENT VIEWER
					this.contentViewer.innerHTML = "";

					// CHECKING IF THE WORD WAS REPORTED BY THE SPELLCHECKER
					if (this.spellcheckerResult[finalMisspelled])
						{
						// LOOPING EVERY SUGGESTED WORD
						for (var i = 0; i < this.spellcheckerResult[finalMisspelled].length; i++)
							{
							// ADDING THE SUGGESTED WORD
							this.contentViewer.innerHTML = this.contentViewer.innerHTML + '<span class="tinydoc_spellchecker_suggestions">' + this.spellcheckerResult[finalMisspelled][i] + '</span>';
							}

						// CHECKING IF THERE IS NO SUGGESTIONS
						if(this.spellcheckerResult[finalMisspelled].length==0)
							{
							// ADDING THE SUGGESTIONS LABEL
							this.contentViewer.innerHTML = '<span class="tinydoc_spellchecker_no_suggestions">' + this.spellcheckerNoSuggestionsLabel + '</span>';
							}
						}
						else
						{
						// ADDING THE SUGGESTIONS LABEL
						this.contentViewer.innerHTML = '<span class="tinydoc_spellchecker_no_suggestions">' + this.spellcheckerNoSuggestionsLabel + '</span>';
						}
					}
				}
				else
				{
				// CHECKING IF THE CARET IS IN A LINK TAG
				if (this.getParentTag("A")==false || this.getCurrentTag("A")==false)
					{
					// CLEARING THE CONTENT VIEWER
					this.contentViewer.innerHTML = "";
					}
				}
			}
			catch(err)
			{
			}
		}

	// https://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
	insertHtmlAtCaret(html, selectPastedContent)
		{
		try
			{
			// PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
			if (this.isDocumentSelected()==false){return}

			// PREVENTING SAVING AN UNDO EVENT DURING AN UNDO/REDO EVENT OR THE SPELLCHECKER IS NOT WORKING
			if (this.canUndoRedo==true && this.spellcheckerWorking==false)
				{
				// REGISTERING THE UNDO EVENT
				this.saveUndo();
				}

			var selection = window.getSelection();

			if (selection.getRangeAt && selection.rangeCount)
				{
				var range = selection.getRangeAt(0);
				range.deleteContents();

				var el = document.createElement("div");
				el.innerHTML = html;

				var frag = document.createDocumentFragment(), node, lastNode;

				while((node = el.firstChild))
					{
					lastNode = frag.appendChild(node);
					}

				var firstNode = frag.firstChild;
				range.insertNode(frag);

				if (lastNode)
					{
					range = range.cloneRange();
					range.setStartAfter(lastNode);
					if (selectPastedContent)
						{
						range.setStartBefore(firstNode);
						}
					else
						{
						range.collapse(true);
						}
					selection.removeAllRanges();
					selection.addRange(range);
					}

				// CHECKING IF THE SPELLCHECKER IS WORKING
				if (this.spellcheckerWorking==true)
					{
					// NO POINT GOING ANY FURTHER
					return;
					}
				// CHECKING IF A NEW TEXT IS SET
				else if (this.settingNewText==true)
					{
					// SETTING THAT ENTER KEY WAS NOT PRESSED
					this.settingNewText = false;

					// MOVING THE CARET TO THE BEGINNING OF THE DOCUMENT
					this.setCaretPosition(this.document,0);
					}

				// CHECKING IF THE ENTER KEY WAS PRESSED
				else if (this.keyEnterPressed==true)
					{
					// SETTING THAT ENTER KEY WAS NOT PRESSED
					this.keyEnterPressed=false;

					// SCROLLING TO THE CARET
					this.scrollToCaret();

					// SETTING THE DOCUMENT AS DIRTY
					window.onbeforeunload = function(e){return "Dirty"};
					}
					else
					{
					// SETTING THE CURRENT INSTANCE FOR LATER USE
					var thisTinyDOC = this;

					// WAITING 25 MS FOR THE UI TO BE UPDATED
					setTimeout(function()
						{
						if (lastNode)
							{
							range = range.cloneRange();
							range.setStartAfter(lastNode);
							if (selectPastedContent)
								{
								range.setStartBefore(firstNode);
								}
							else
								{
								range.collapse(true);
								}
							selection.removeAllRanges();
							selection.addRange(range);
							}

						// PREVENTING SAVING AN UNDO EVENT DURING AN UNDO/REDO EVENT
						if (thisTinyDOC.canUndoRedo==true)
							{
							// SCROLLING TO THE CARET
							thisTinyDOC.scrollToCaret();

							// REGISTERING THE UNDO EVENT
							thisTinyDOC.saveUndo();
							}

						// SETTING THE DOCUMENT AS DIRTY
						window.onbeforeunload = function(e){return "Dirty"};
						},25);
					}
				}
			}
			catch(err)
			{
			}
		}

	// https://stackoverflow.com/questions/17678843/cant-restore-selection-after-html-modify-even-if-its-the-same-html
	saveSelection(containerEl)
		{
		try
			{
			var doc = containerEl.ownerDocument;
			var win = doc.defaultView;
			var range = win.getSelection().getRangeAt(0);
			var preSelectionRange = range.cloneRange();
			preSelectionRange.selectNodeContents(containerEl);
			preSelectionRange.setEnd(range.startContainer, range.startOffset);
			var start = preSelectionRange.toString().length;
			return {start: start, end: start + range.toString().length};
			}
			catch(err)
			{
			return {start: 0, end: 0};
			}
		}

	// https://stackoverflow.com/questions/17678843/cant-restore-selection-after-html-modify-even-if-its-the-same-html
	restoreSelection(containerEl, savedSel)
		{
		try
			{
			var doc = containerEl.ownerDocument, win = doc.defaultView;
			var charIndex = 0, range = doc.createRange();
			range.setStart(containerEl, 0);
			range.collapse(true);
			var nodeStack = [containerEl], node, foundStart = false, stop = false;

			while (!stop && (node = nodeStack.pop()))
				{
				if (node.nodeType == 3)
					{
					var nextCharIndex = charIndex + node.length;
					if (!foundStart && savedSel.start >= charIndex && savedSel.start < nextCharIndex)
						{
						range.setStart(node, savedSel.start - charIndex);
						foundStart = true;
						}
					if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex)
						{
						range.setEnd(node, savedSel.end - charIndex);
						stop = true;
						}
					charIndex = nextCharIndex;
					}
					else
					{
					var i = node.childNodes.length;
					while (i--)
						{
						nodeStack.push(node.childNodes[i]);
						}
					}
				}

			var sel = win.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
			}
			catch(err)
			{
			}
		}
	}