class tinyDOC2
	{
	constructor(myContainer, documentText, saveFunction, template1, template2, template3)
		{
		// SETTING THE TINYDOC CONTAINER
		this.myContainer = myContainer;

		// CHECKING IF THERE IS A SAVE FUNCTION
		if (saveFunction)
			{
			// SETTING THE SAVE FUNCTION
			this.saveFunction = saveFunction;
			}

		// SETTING ALL THE TEMPLATES (IF ANY)
		this.template1 = template1;
		this.template2 = template2;
		this.template3 = template3;

		// SETTING THE DEFAULT VALUE FOR THE LINK CHECKER
		this.linkFound = false;

		// SETTING THAT THE DOCUMENT IS ENABLED
		this.documentEnabled = true;

		// ADDING THE STYLESHEET
		this.styleSheet = document.createElement("style");
		this.styleSheet.innerText = ".tinydoc_menu_container{height:40px;border-bottom:thin solid #D3D3D3;overflow-y:hidden} .tinydoc_menu{background-color:#F2F2F2;left:0;right:0;padding-top:0;padding-bottom:0;height:80px;overflow-x:scroll;overflow-y:hidden;outline:none;text-align:center;font-family:Arial;font-size:13px} .tinydoc_menu::-webkit-scrollbar{display:none} .tinydoc_menu_size{float:left;width:670px} .tinydoc_holder{float:left;padding-top:3px;padding-bottom:3px;margin:0} .tinydoc_separator{float:left;border-left:thin solid #D3D3D3;margin-left:5px;height:100px;width:1px} .tinydoc_separator2{float:left;border-left:thin solid #D3D3D3;margin-left:135px;height:100px;width:1px} .tinydoc_button_save{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWElEQVQ4jWNgZGT8Tw5mYGA4z8DAoM9ArgFQQ94zIHH8cSiyZ2BgsEfj18P5SBJYXcMABTj59DCAn4GBgZ9sAwi6CF2CWDBqAI0M0CdBvz6GAWRnKEoNAABz05cZXE0N/gAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_save:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_print{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIABISH+2IiQAAAE9JREFUOMtj/PTpEwMlgAVdgI+P7z8+DZ8+fWJE5jMxUAgYKfUCIwMDw39KDCDbC7CwGDgXUM0AFmLiGl8aodwF6LbRPSXSJhAJeYOqeQEAZqYde9erwQ4AAAAASUVORK5CYII=\");background-repeat:no-repeat;background-position:center} .tinydoc_button_print:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_undo{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlElEQVR4XqWTQRHCMBREtx0E1AoOgoPigO8ACUgABakTkFApdVD28A97oCwNb+ZdOrPJ/vkpvlBhcOGVWvqN8AU/0ptwSQds0O24eaYPOkHoGmq/6JkuOcJuCq1+BM+Rztogcj7llEZWV0aKA1WCQppoaMrv9eMaTRM95A6De8qFrvTqthB2nY2M9Pnvj1bQyEBvEN4HjBvwG13/UAAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_undo:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_redo{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAjElEQVR4Xq2TXQ2EMBCElwYBSEEC5wAJoAALJwEHVAIoKA6QxE8yD80EJnvhvmTf+s022605mewl+1NIMD/dXUgphOqsmkPg9RzAh4ZcViEFdUwkKuIVEmjSkL3gBhA3CO7u+Su0JKw48EGRLIYIMarOag9Gj6wCFq/MAbNpIGsSDfNnmn/8ui820s0B6TsXTzSQVC8AAAAASUVORK5CYII=\");background-repeat:no-repeat;background-position:center} .tinydoc_button_redo:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_bold{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIABYIhuO09wAAARBJREFUOMulkTGKhEAQRX8vG2tkJGhgaKT3MBBEzDo20XD3CDPHMPAEHsIjGBkZCIKBBTYqSG+0iyO6O+M++EHTVZ+qX4yI8B/etg9FUeRelmXJIAhkURS3Qwci+hEAeSZVVWWe57dtPRE9TrAzZl3XsSiKAADDMCDLso99HdtmoCiK3BoAwDzPME1TCiGgaRrqumanGfzFuq6/h7hnmiYkSSKFEAAA13Xx9ApHlGXJbNvG5RXCMJR93z9nQESMiFjbtsz3fQBA0zRI01S+dAUAEELAMAy5LAt0XUdVVezSCgCwLMtrGYzjiDiO5Xej4zgP/+9njUcXUVUVnPP7UwZbNE2D4zjgnN89z/s8DfEKX5+qlW3Q8GvUAAAAAElFTkSuQmCC\");background-repeat:no-repeat;background-position:center} .tinydoc_button_bold:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_italic{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIABo64oGqewAAAPBJREFUOMulk62ug0AQhb+5aUAhUBjeAIVdSUj4aXi8Pgkp3SYNci0vgUEhUGD2qmJaaLl31EzOzpfZnBzRWvOfOu2JeZ7bLU1rLQA/ewCttVwul3WOogittTyXPwIAmqZZ+6qqXvRdwDRNPB4PAHzfRyklhwBt29p5ngEoigLHcb6/wFpLXdcAiAhZlr19twnous72fQ+AUoogCOQQ4Hq9rv35fN785lvAMAzWGANAGIbEcSyHAPf7HWvtap2IfH/BsizcbjcAXNclSRLZc+oFYIyx4zgCkKYpnudxCPC0DqAsy49hkmcavwnOLuCv9QttsFRTIXyOUwAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_italic:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_underline{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIAB0gUKLFxgAAAK5JREFUOMvtk8EJhDAQRV9ksRLBCiwhEMFerCQHexGcSyoIWIFN5OwhewrsxrgsZI/7b5l5+TDMHyUi1Kh5fRhjojEm3sGlfkOl/gaZQdu2AJzneQFTLTFFg77vAdj3/bLKVEtM0UBrDYC1FudcDCEQQsA5F621b0ySypO4LEvctq047ziOzPOsPhoAeO/juq4cxwFA13VM08QwDCpnVe0tPPKsf/NJRNTPclA9whOE5kYCIDcMCQAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_underline:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_strikethrough{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIACE7qTR11QAAARFJREFUOMutUyGOhEAQrLmg+QHhATzhNkgMeh6wi5w/kHkCCCSehGARSDwSNYqgRmDGQtJnbsmyxx3c7VXSoivdlXR1NzPG4BVYz8SyLGjblpqmwTAMAADXdREEAXzfZ5b11GKMWWOaJgghCMBuCCFomqZNzyZJk5QAEOeciqIgpRQppagoCuKcEwBKk5S+FbgX9X2/KTLGoO/7VfyRt86a5TgO2zP87TG5vF8AAFJK1HVNWms6Et6ozvOMOI4py7KVC8Pwxy2wT4f/DHZ0SFpr6roOVVWhLEukSYrr7cpOC9wxjiN5ngfOOfI8Z7smRlFEtm3TOI6nxzrcgtaa6romKeWm5t9O+YsHv30m9uo7fwChngRRWCWECgAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_strikethrough:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_dotted{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIACQpJ/rw2AAAAFtJREFUOMvtkbsNgDAMBc+IabKW5bGyTybIIG8B0wCi45OCJidZ8nPlp7PWWtZaAXB3SinGGyIigQQyIlISkjhud7MwyOruZ7jukh5Vsf3dz4xX6L1PC9PC/xY2HshsE72V1dYAAAAASUVORK5CYII=\");background-repeat:no-repeat;background-position:center} .tinydoc_button_dotted:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_numbered{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIACgMwEtrkwAAAHJJREFUOMvNkzEKwDAMA6XiJT/LM/K1TBm9asnb0qlQSgOtM7Ta7EGIEyKAAQCSiIBMEnPO4/y83jNJ4oZF2cz5qQElLSXgATEKcpNEd2eYQWtt9N5RSgm1YLVWuDtTSt8w+EkL0R0AgN0Rf7WF1QTLDHbuCD9uIC7lSwAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_numbered:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_highlight{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIAwkdJCLg2wAAAN1JREFUOMvFk7GNhDAQRZ/vLKe0AJmdU5ITSqACSqAgOnBgBBESknOLbC5goz0JLdwhbbAT/hl/vz+W1TAMO2/UF2+WPhP3fafrOnLOABRFQdu2KKXuEaSUfg8D5JxJKd2PME0TAN57vPcH7ZZBjBFjDFVVUVUVxhhijPcMtm1jXVestWit0VpjrWVdV7Zt+3+JT9QQAiGEl15d138TjON4+WRnvQOBiDDPM2VZ0jTNYbDve+Z5RkQwxpwTLMuCiOCce7nJOYeIsCzLdYQn4pXBWQz18b+g9p/vzxI8ADfZZ0b8LW/QAAAAAElFTkSuQmCC\");background-repeat:no-repeat;background-position:center} .tinydoc_button_highlight:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_link{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIETgmTNZ5UwAAAcNJREFUOMuNkrGK8kAUhc9EG0sbbXyG9AbLXYvIFoomRrAwPoggPoAIVhmDWGiMKQQxhW4ZfIC08QlsgtNYxftX7ir8m90LUwzD+ebccy8TQuAvdTweabFYgIjQ6XSgqioDgOxfxJ7nEeccqqoik8lgMpnger2SYRjsV8Bms6HZbAbTNKFpGgOAYrFInHOUSiViaS0EQUCj0ehF/KjpdErn8xnSL79DVVVomsbiOH57frvf78hms+mAXC4HWZbhui4ZhnF8QNbrNe33e9TrdUAI8eOJogicc1IUhTjnJISAZVmkKArZtk1CCLxkcDgcyHEcAMBwOGSn04ls24ZpmigUCgjDEL7vo9/vo9VqMQDfANd1ybZtqKoKWZZxuVzwEJfLZTYYDAgA2u02qtXqd6BCiC+blmXR851zTlEUpbYpBUFAtm2j1+tB13UWx/Hbs+3xeExpQUvb7Ra1Wg26rjMAyOfzn6vV6l3TNBaGIW63W+qiSUmSQJJep5nP5z9d1yXf99FsNtMBjUYDu90Onud9WX0EapomKpUKSwMwIQQcx6H5fI6Pjw8kSQLf9/+7vj8CAMD3fVoul2CModvtvo4qpf4B6K4azkk8uZwAAAAASUVORK5CYII=\");background-repeat:no-repeat;background-position:center} .tinydoc_button_link:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_template{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIEh4sbZutMAAAAFBJREFUOMtjZGBg+M9AAWBhYGBg+PTpEyM5mvn4+P4zMVAB/P/06RMD1Cv/0fmE2CzIJiF7BR+bj48PHm7U9wIxbGQ+I5QzGgsjOxYYKc3OAOmZja1ll10GAAAAAElFTkSuQmCC\");background-repeat:no-repeat;background-position:center} .tinydoc_button_template:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_calc{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkQFwIfp1os4AAAALRJREFUOMvVU7EKwjAQfVcjikvBpbufkULRjkV38TsrGS1oL6N+jenUcxJKEyFiF99yIXf38t4dAX4EvQ+51hcBthENTcu88xJaa4l5cVyn/IL8DEjldSao+cYH/9qDVMxMaZquNu65zLJsTkRr9NiHFKlPUo0xDgBwf6Asy77rOkQRiNB17NM5JzSjOkTgWbC2LURkMbRgjycV8h+cbmycbI3Jt0qimf9HgRp+khgSAhpMiRcKtVp0wswb6wAAAABJRU5ErkJggg==\");background-repeat:no-repeat;background-position:center} .tinydoc_button_calc:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_button_clear{display:block;font-family:Arial;font-size:15px;line-height:32px;height:32px;width:28px;background-color:#F2F2F2;border:thin solid #F2F2F2;margin-left:3px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkIACsnR9rBEAAAATxJREFUOMulk7FqwlAUhr+UbIKDGXwFsUJFRx/BVcggZGynzF7IC9y8Qt/DyckHEJUswhUujglk8G6CcLo0xSq0SfvBgQMXvnN+DtdzzlHRbreFmjjnPIAn/snTvbWq8/nsTadTAIwx396q6T9ucDqdZLlcMpvN6Ha7Xq0NbsmyDIDhcFg/wi273e7vguv1+iUYDAZvjQXH41FWqxXz+ZxOp/PeWFDlH41Gzc5Ysd1uP/O/NBdcLheyLGMymdDvP3sAeZ5LkiRSlqUGKMtSJ0kieZ7Lg+BwOMh6vabX69FqtQDwfT8tigKl1MIYI0qpRVEU+L6fPgj2+/1D/iAIlNY6BRiPxwBordMgCJR/L4iiyIuiqNF/kN/KWqvDMJQwDGWz2bxWvbVW1xIYYySOY7HW4pzT1lriOBZjjHwAufKy2MF7tKcAAAAASUVORK5CYII=\");background-repeat:no-repeat;background-position:center} .tinydoc_button_clear:hover{background-color:#E3E3E3;border:thin solid #D3D3D3} .tinydoc_document{display:block;padding:8px;outline:none;color:black;background-color:white;font-family:Arial;font-size:16px;line-height:1.3;overflow:auto;-webkit-text-size-adjust:none;-webkit-user-select:text;user-select:text} .tinydoc_document a{text-decoration:underline;color:#3a76b1} .tinydoc_urlviewer{display:inline-block;font-family:Arial;font-size:13px;line-height:2.6;margin-left:11px;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:1px;white-space:nowrap} .tinydoc_urlviewer a{text-decoration:none;color:#3a76b1;margin-right:11px} @media (pointer: coarse) { .tinydoc_button_save:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_print:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_undo:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_redo:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_bold:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_italic:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_underline:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_strikethrough:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_dotted:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_numbered:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_highlight:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_link:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_template:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_calc:hover{background-color:#F2F2F2;border:thin solid #F2F2F2} .tinydoc_button_clear:hover{background-color:#F2F2F2;border:thin solid #F2F2F2}}";
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
		if (saveFunction)
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

		// ADDING THE UNDO BUTTON
		this.holder3 = document.createElement("div");
		this.holder3.className = "tinydoc_holder";
		this.menu.appendChild(this.holder3);
		this.buttonUndo = document.createElement("div");
		this.buttonUndo.className = "tinydoc_button_undo";
		this.holder3.appendChild(this.buttonUndo);

		// ADDING THE REDO BUTTON
		this.holder4 = document.createElement("div");
		this.holder4.className = "tinydoc_holder";
		this.menu.appendChild(this.holder4);
		this.buttonRedo = document.createElement("div");
		this.buttonRedo.className = "tinydoc_button_redo";
		this.holder4.appendChild(this.buttonRedo);

		// ADDING A SEPARATOR
		this.separator3 = document.createElement("div");
		this.separator3.className = "tinydoc_separator";
		this.menu.appendChild(this.separator3);

		// ADDING THE BOLD BUTTON
		this.holder5 = document.createElement("div");
		this.holder5.className = "tinydoc_holder";
		this.menu.appendChild(this.holder5);
		this.buttonBold = document.createElement("div");
		this.buttonBold.className = "tinydoc_button_bold";
		this.holder5.appendChild(this.buttonBold);

		// ADDING THE ITALIC BUTTON
		this.holder6 = document.createElement("div");
		this.holder6.className = "tinydoc_holder";
		this.menu.appendChild(this.holder6);
		this.buttonItalic = document.createElement("div");
		this.buttonItalic.className = "tinydoc_button_italic";
		this.holder6.appendChild(this.buttonItalic);

		// ADDING THE UNDERLINE BUTTON
		this.holder7 = document.createElement("div");
		this.holder7.className = "tinydoc_holder";
		this.menu.appendChild(this.holder7);
		this.buttonUnderline = document.createElement("div");
		this.buttonUnderline.className = "tinydoc_button_underline";
		this.holder7.appendChild(this.buttonUnderline);

		// ADDING THE STRIKETHROUGH BUTTON
		this.holder8 = document.createElement("div");
		this.holder8.className = "tinydoc_holder";
		this.menu.appendChild(this.holder8);
		this.buttonStrikethrough = document.createElement("div");
		this.buttonStrikethrough.className = "tinydoc_button_strikethrough";
		this.holder8.appendChild(this.buttonStrikethrough);

		// ADDING A SEPARATOR
		this.separator4 = document.createElement("div");
		this.separator4.className = "tinydoc_separator";
		this.menu.appendChild(this.separator4);

		// ADDING THE DOTTED BUTTON
		this.holder9 = document.createElement("div");
		this.holder9.className = "tinydoc_holder";
		this.menu.appendChild(this.holder9);
		this.buttonDotted = document.createElement("div");
		this.buttonDotted.className = "tinydoc_button_dotted";
		this.holder9.appendChild(this.buttonDotted);

		// ADDING THE NUMBERED BUTTON
		this.holder10 = document.createElement("div");
		this.holder10.className = "tinydoc_holder";
		this.menu.appendChild(this.holder10);
		this.buttonNumbered = document.createElement("div");
		this.buttonNumbered.className = "tinydoc_button_numbered";
		this.holder10.appendChild(this.buttonNumbered);

		// ADDING THE HIGHLIGHT BUTTON
		this.holder11 = document.createElement("div");
		this.holder11.className = "tinydoc_holder";
		this.menu.appendChild(this.holder11);
		this.buttonHighlight = document.createElement("div");
		this.buttonHighlight.className = "tinydoc_button_highlight";
		this.holder11.appendChild(this.buttonHighlight);

		// ADDING THE LINK BUTTON
		this.holder12 = document.createElement("div");
		this.holder12.className = "tinydoc_holder";
		this.menu.appendChild(this.holder12);
		this.buttonLink = document.createElement("div");
		this.buttonLink.className = "tinydoc_button_link";
		this.holder12.appendChild(this.buttonLink);

		// ADDING A SEPARATOR
		this.separator5 = document.createElement("div");
		this.separator5.className = "tinydoc_separator";
		this.menu.appendChild(this.separator5);

		// CHECKING IF THERE IS A TEMPLATE 1
		if (template1)
			{
			// ADDING THE TEMPLATE 1 BUTTON
			this.holder13 = document.createElement("div");
			this.holder13.className = "tinydoc_holder";
			this.menu.appendChild(this.holder13);
			this.buttonTemplate1 = document.createElement("div");
			this.buttonTemplate1.className = "tinydoc_button_template";
			this.holder13.appendChild(this.buttonTemplate1);
			}

		// CHECKING IF THERE IS A TEMPLATE 2
		if (template2)
			{
			// ADDING THE TEMPLATE 2 BUTTON
			this.holder14 = document.createElement("div");
			this.holder14.className = "tinydoc_holder";
			this.menu.appendChild(this.holder14);
			this.buttonTemplate2 = document.createElement("div");
			this.buttonTemplate2.className = "tinydoc_button_template";
			this.holder14.appendChild(this.buttonTemplate2);
			}

		// CHECKING IF THERE IS A TEMPLATE 3
		if (template3)
			{
			// ADDING THE TEMPLATE 3 BUTTON
			this.holder15 = document.createElement("div");
			this.holder15.className = "tinydoc_holder";
			this.menu.appendChild(this.holder15);
			this.buttonTemplate3 = document.createElement("div");
			this.buttonTemplate3.className = "tinydoc_button_template";
			this.holder15.appendChild(this.buttonTemplate3);
			}

		// CHECKING IF THERE IS ANY TEMPLATE
		if (template1 || template2 || template3)
			{
			// ADDING A SEPARATOR
			this.separator6 = document.createElement("div");
			this.separator6.className = "tinydoc_separator";
			this.menu.appendChild(this.separator6);
			}

		// ADDING THE CALC BUTTON
		this.holder16 = document.createElement("div");
		this.holder16.className = "tinydoc_holder";
		this.menu.appendChild(this.holder16);
		this.buttonCalc = document.createElement("div");
		this.buttonCalc.className = "tinydoc_button_calc";
		this.holder16.appendChild(this.buttonCalc);

		// ADDING A SEPARATOR
		this.separator7 = document.createElement("div");
		this.separator7.className = "tinydoc_separator";
		this.menu.appendChild(this.separator7);

		// ADDING THE CLEAR FORMAT BUTTON
		this.holder17 = document.createElement("div");
		this.holder17.className = "tinydoc_holder";
		this.menu.appendChild(this.holder17);
		this.buttonClear = document.createElement("div");
		this.buttonClear.className = "tinydoc_button_clear";
		this.holder17.appendChild(this.buttonClear);

		// ADDING A SEPARATOR
		this.separator8 = document.createElement("div");
		this.separator8.className = "tinydoc_separator";
		this.menu.appendChild(this.separator8);

		// ADDING THE URL VIEWER
		this.holder18 = document.createElement("div");
		this.holder18.className = "tinydoc_holder";
		this.menu.appendChild(this.holder18);
		this.urlViewer = document.createElement("div");
		this.urlViewer.className = "tinydoc_urlviewer";
		this.holder18.appendChild(this.urlViewer);

		// ADDING A EDITABLE DOCUMENT
		this.document = document.createElement("div");
		this.document.className = "tinydoc_document";
		this.document.contentEditable = true;
		this.document.innerHTML = "<div></div>";
		this.myContainer.appendChild(this.document);

		// CHECKING IF THERE IS A DEFAULT DOCUMENT TEXT
		if (documentText)
			{
			// SETTING THE DOCUMENT TEXT
			this.document.innerHTML = documentText;
			}

		// SETTING THE CURRENT INSTANCE FOR LATER USE
		var thisTinyDOC = this;

		// CHECKING IF THERE IS A SAVE FUNCTION
		if (saveFunction)
			{
			// SETTING WHAT WILL HAPPEN WHEN THE USER CLICKS ON THE SAVE BUTTON
			this.buttonSave.addEventListener("mousedown",function(event){thisTinyDOC.save();event.preventDefault()});
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
		if (template1)
			{
			// ADDING THE TEMPLATE 1 BUTTON
			this.buttonTemplate1.addEventListener("mousedown",function(event){thisTinyDOC.insertHtmlAtCaret(template1,false);event.preventDefault()});
			}

		// CHECKING IF THERE IS A TEMPLATE 2
		if (template2)
			{
			// ADDING THE TEMPLATE 2 BUTTON
			this.buttonTemplate2.addEventListener("mousedown",function(event){thisTinyDOC.insertHtmlAtCaret(template2,false);event.preventDefault()});
			}

		// CHECKING IF THERE IS A TEMPLATE 3
		if (template3)
			{
			// ADDING THE TEMPLATE 3 BUTTON
			this.buttonTemplate3.addEventListener("mousedown",function(event){thisTinyDOC.insertHtmlAtCaret(template3,false);event.preventDefault()});
			}

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
				else
				{
				// CHECKING FOR ANY URL AT THE CURRENT CARET POSITION
				thisTinyDOC.checkForURL();

				// REGISTERING THE UNDO EVENT
				thisTinyDOC.saveUndo();
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
				// CHECKING FOR ANY URL AT THE CURRENT CARET POSITION
				thisTinyDOC.checkForURL();
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
				// CHECKING FOR ANY URL AT THE CURRENT CARET POSITION
				thisTinyDOC.checkForURL();
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
			// CLEARING THE DOCUMENT DATA
			this.document.innerHTML = "";

			// SETTING THE DOCUMENT AS CLEAN
			window.onbeforeunload = null;

			// CLEARING THE DOCUMENT UNDO/REDO HISTORY
			this.clearUndoRedo();

			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// FOCUSING THE DOCUMENT AFTER 100 MS
			setTimeout(function(){thisTinyDOC.document.focus()},100);

			// TRYING TO MOVE THE CURSOR TO THE BEGINNING OF THE DOCUMENT
			var range = document.createRange();
			var sel = window.getSelection();
			range.setStart(this.document.childNodes[0], 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);

			// SCROLLING TO THE TOP OF THE DOCUMENT
			this.scrollToTop();
			}
			catch(err)
			{
			}
		}

	save()
		{
		try
			{
			this.saveFunction();
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
			this.document.style.width = (this.myContainer.offsetWidth - 16)+ "px";
			this.document.style.height = (this.myContainer.offsetHeight - 57) + "px";

			// RESIZING THE DOCUMENT AFTER 100 MS
			setTimeout(function(){try{this.document.style.width = (this.myContainer.offsetWidth - 16)+ "px";this.document.style.height = (this.myContainer.offsetHeight - 57) + "px";}catch(err){}},100);
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
			// GETTING THE CURRENT SELECTION
			const selection = window.getSelection();

			// CHECKING IF THERE ARE SELECTION RANGES
			if (!selection.rangeCount)
				{
				return;
				}

			// GETTING THE FIRST SELECTION RANGE. THERE'S ALMOST NEVER CAN BE MORE (INSTEAD OF FIREFOX)
			const firstRange = selection.getRangeAt(0);

			// SOMETIMES IF THE EDITABLE ELEMENT IS GETTING REMOVED FROM THE DOM YOU MAY GET A HIERARCHYREQUEST ERROR IN SAFARI
			if (firstRange.commonAncestorContainer === document)
				{
				return;
				}

			// CREATING AN EMPTY BR THAT WILL BE USED AS AN ANCHOR FOR SCROLL, BECAUSE IT'S IMPOSIBLE TO DO IT WITH JUST TEXT NODES
			const tempAnchorEl = document.createElement("br");

			// PUTTING THE BR RIGHT AFTER THE CARET POSITION
			firstRange.insertNode(tempAnchorEl);

			// SCROLLING TO THE BR. I PERSONALLY PREFER TO ADD THE BLOCK END OPTION, BUT IF YOU WANT TO USE 'START' INSTEAD JUST REPLACE BR TO SPAN
			tempAnchorEl.scrollIntoView({block: "end"});

			// REMOVING THE ANCHOR BECAUSE IT'S NOT NEEDED ANYMORE
			tempAnchorEl.remove();
			}
			catch(err)
			{
			}
		}

	setText(myText)
		{
		try
			{
			// CLEARING THE DOCUMENT
			this.new();

			// SETTING THE DOCUMENT TEXT
			this.document.innerHTML = myText
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

		// CHECKING IF THE INNERHTML MUST BE ENCODED
		if (mustEncode)
			{
			// RETURNING THE ENCODED INNERHTML
			return encodeText(this.document.innerHTML);
			}
			else
			{
			// RETURNING THE INNERHTML
			return this.document.innerHTML;
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

			// FIX FOR FIREFOX
			this.document.blur();

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
			// PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
			if (this.isDocumentSelected()==false){return}

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
			if(this.checkParentTag("LI")==false && this.checkParentTag("UL")==false && this.checkParentTag("OL")==false)
				{
				// GETTING THE CURRENT SELECTION
				var selection = window.getSelection();
				var range = selection.getRangeAt(0);
				var selectedContent = range.extractContents();

				// ADDING THE LIST TAGS
				var listTag = document.createElement(tag1);
				var itemTag = document.createElement(tag2);
				listTag.appendChild(itemTag);

				// ADDING THE SELECTED CONTENT TO THE LIST ITEM
				itemTag.appendChild(selectedContent);

				// REMOVING THE SELECTED CONTENT
				range.deleteContents();

				// INSERTING THE LIST
				range.insertNode(listTag);

				// SETTING THE CURRENT INSTANCE FOR LATER USE
				var thisTinyDOC = this;

				// WAITING 25 MS FOR THE UI TO BE UPDATED
				setTimeout(function()
					{
					// MOVING THE CARET AFTER THE LIST
					range = range.cloneRange();
					range.setStartAfter(listTag);
					selection.removeAllRanges();
					selection.addRange(range);

					// REGISTERING THE UNDO EVENT
					thisTinyDOC.saveUndo();

					// SETTING THE DOCUMENT AS DIRTY
					window.onbeforeunload = function(e){return "Dirty"};
					},25);
				}
			}
			catch(err)
			{
			}
		}

	checkParentTag(tagToFind)
		{
		// CREATING A VARIABLE TO CHECK IF THE TAG WAS FOUND
		var tagFound = false;

		try
			{
			// GETTING THR CURRENT FOCUS NODE
			var upperNode = window.getSelection().focusNode;

			// LOOPING ALL THE PARENT NODES
			while (upperNode.parentNode)
				{
				// GETTING THE PARENT NODE
				upperNode = upperNode.parentNode;

				// CHECKING IF THAT NODE IS THE ONE THAT NEEDS TO BE FOUND
				if (upperNode.nodeName==tagToFind)
					{
					// SETTING THE TAG WAS FOUND
					tagFound = true;
					}
				}
			}
			catch(err)
			{
			}

		return tagFound;
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

				// INSERTING THE PLAIN TEXT
				this.insertHtmlAtCaret(plainText,true);
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
			// PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
			if (this.isDocumentSelected()==false && keyboardRequest==false){return}

			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// GETTING THE CURRENT CARET POSITION
			this.document_history_lastCaret = this.getCaretPosition(this.document);

			// CHECKING IF THERE IS A DOCUMENT HISTORY TO UNDO
			if(this.document_history_index>0)
				{
				// UPDATING THE DOCUMENT CONTENT WITH THE PREVIOUS STORED CONTENT
				this.document.innerHTML = this.document_history[this.document_history_index-1];

				// WAITING 25 MS FOR THE UI TO BE UPDATED
				setTimeout(function()
					{
					// MOVING THE CARET TO THE STORED POSITION
					thisTinyDOC.setCaretPosition(thisTinyDOC.document,thisTinyDOC.document_history_caret[thisTinyDOC.document_history_index-1]);

					// UPDATING THE DOCUMENT HISTORY INDEX
					thisTinyDOC.document_history_index = thisTinyDOC.document_history_index - 1;

					// SCROLLING TO THE CARET
					thisTinyDOC.scrollToCaret();
					},25);
				}
				else
				{
				// WAITING 25 MS FOR THE UI TO BE UPDATED
				setTimeout(function()
					{
					// RESTORING THE CARET POSITION
					thisTinyDOC.setCaretPosition(thisTinyDOC.document,thisTinyDOC.document_history_lastCaret);
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
				},25);
			}
		}

	redo(keyboardRequest)
		{
		try
			{
			// PREVENTING TO ADD CONTENT OUTSIDE THE DOCUMENT
			if (this.isDocumentSelected()==false && keyboardRequest==false){return}

			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// GETTING THE CURRENT CARET POSITION
			this.document_history_lastCaret = this.getCaretPosition(this.document);

			// CHECKING IF THERE IS A DOCUMENT HISTORY TO REDO
			if(this.document_history[this.document_history_index+1])
				{
				// UPDATING THE DOCUMENT CONTENT WITH THE NEXT STORED CONTENT
				this.document.innerHTML = this.document_history[this.document_history_index+1];

				// WAITING 25 MS FOR THE UI TO BE UPDATED
				setTimeout(function()
					{
					// MOVING THE CARET TO THE STORED POSITION
					thisTinyDOC.setCaretPosition(thisTinyDOC.document,thisTinyDOC.document_history_caret[thisTinyDOC.document_history_index+1]);

					// UPDATING THE DOCUMENT HISTORY INDEX
					thisTinyDOC.document_history_index = thisTinyDOC.document_history_index + 1;

					// SCROLLING TO THE CARET
					thisTinyDOC.scrollToCaret();
					},25);
				}
				else
				{
				// WAITING 25 MS FOR THE UI TO BE UPDATED
				setTimeout(function()
					{
					// RESTORING THE CARET POSITION
					thisTinyDOC.setCaretPosition(thisTinyDOC.document,thisTinyDOC.document_history_lastCaret);
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
				},25);
			}
		}

	saveUndo()
		{
		try
			{
			// IF WE ALREADY USED UNDO BUTTON AND MADE MODIFICATION - DELETE ALL FORWARD HISTORY
			if(this.document_history_index<this.document_history.length-1)
				{
				// REMOVING ALL FORWARD HISTORY
				this.document_history = this.document_history.slice(0,this.document_history_index+1);
				this.document_history_caret = this.document_history_caret.slice(0,this.document_history_index+1);

				// UPDATING THE DOCUMENT HISTORY INDEX
				this.document_history_index = this.document_history_index + 1;
				}

			// GETTING THE CURRENT DOCUMENT CONTENT OR STATE
			var current_state = this.document.innerHTML;

			// IF CURRENT STATE IDENTICAL TO PREVIOUS DON'T SAVE IDENTICAL STATES
			if(current_state!=this.document_history[this.document_history_index])
				{
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
								this.insertHtmlAtCaret(lastLineBR + "----------<br/>ERROR", false);
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
								this.insertHtmlAtCaret(lastLineBR + "----------<br/>" + finalResult, false);
								}
							}
							catch(err)
							{
							// INSERTING AN ERROR TEXT IF THE RESULT COULD NOT BE DISPLAYED
							this.insertHtmlAtCaret(lastLineBR + "----------<br/>ERROR", false);
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
			// SETTING THE LINK FOUND VALUE AS FALSE
			this.linkFound = false;

			// GETTING THE CURRENT SELECTION
			var selectedNode = window.getSelection().focusNode;

			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

			// GOING THROUGH EVERY NODE
			for (var i=0;i<selectedNode.length;i++)
				{
				try
					{
					// CHECKING IF THE NODE HAS AT LEAST ONE CHILD NODE
					if (selectedNode.firstChild!=null)
						{
						// PERFORMING A RECURSIVE SEARCH FOR EVERY CHILD NODE
						thisTinyDOC.checkForURL_AllDescendants(selectedNode);
						}
						else
						{
						// EXECUTING THE FIND AND SELECT FUNCTION WITHIN THE CURRENT NODE
						thisTinyDOC.checkForURL_Update(selectedNode);
						}
					}
					catch(err)
					{
					}
				}

			// CHECKING IF A LINK WAS FOUND
			if (this.linkFound==false)
				{
				// CLEARING THE URL VIEWER
				this.urlViewer.innerHTML = "";
				}
			}
			catch(err)
			{
			}
		}

	checkForURL_AllDescendants(latestChildNode)
		{
		try
			{
			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisTinyDOC = this;

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
						thisTinyDOC.checkForURL_AllDescendants(child);
						}

					// EXECUTING THE CHECK FOR URL FUNCTION WITHIN THE CURRENT NODE
					thisTinyDOC.checkForURL_Update(child);
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

	checkForURL_Update(selectedNode)
		{
		try
			{
			// GETTING THE URL (IF ANY)
			var finalURL = selectedNode.parentNode.href;

			// CHECKING IF THERE IS A VALUE
			if(typeof finalURL !== "undefined")
				{
				// ADDING THE VALUE TO THE URL VIEWER
				this.urlViewer.innerHTML = "<a href='" + finalURL + "' target='_blank'>" + finalURL + "</a>";

				// SETTING THE LINK FOUND VALUE AS TRUE
				this.linkFound = true;
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

			// REGISTERING THE UNDO EVENT
			this.saveUndo();

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

					// SCROLLING TO THE CARET
					thisTinyDOC.scrollToCaret();

					// REGISTERING THE UNDO EVENT
					thisTinyDOC.saveUndo();

					// SETTING THE DOCUMENT AS DIRTY
					window.onbeforeunload = function(e){return "Dirty"};
					},25);
				}
			}
			catch(err)
			{
			}
		}
	}