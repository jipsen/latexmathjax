/*
LaTeXMathJax.js
===============

Version of 2014-02-25

This file contains JavaScript functions to convert (some simple) LaTeX
notation to HTML+CSS+MathJax.
If you use it on a webpage, please send the URL to jipsen@chapman.edu

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or (at
your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
General Public License (at http://www.gnu.org/copyleft/gpl.html)
for more details.

To use this script, add the following line to the <head> of your HTML file:
<script type="text/javascript" src="LaTeXMathML.js"></script>
Or use absolute path names if the file is not in the same folder
as your HTML page.
*/

(function () {
    table = function(mch,p1){
        var t = p1;
        t = t.replace(/^\[[^\[]+\]/g,'');
        t = t.replace(/\\begin\{tabular\}\{[^\}]*\}/g,'<table class="LaTeXtable">\n<tr><td>');
        t = t.replace(/&amp;/g,'</td><td>');
        t = t.replace(/\\\\\s/g,"</td></tr>\n<tr><td>");
        t = t.replace(/\\end\{tabular\}/g,'</td></tr>\n</table>');
t = t.replace(/\\caption\{([^\}]+)\}/g,'<div class="LaTeXtable">$1</div>');
	return t
    }
    verbatim = function(mch,p1){
        var t = '<pre class="verbatim">'+p1+'</pre>';
        t = t.replace(/\\/g,'\\<span></span>'); // prevent translation
	return t
    }
    address = function(mch,p1){
        var t = '<div class="address">'+p1+'</div>';
        t = t.replace(/\\\\/g,',');
	return t
    }
    bibliography = function(mch,p1){
        var t = '<div class="thebibliography">'+p1+'</div>';
        t = t.replace(/[\n\r]+[ \f\n\r\t\v\u2028\u2029]*[\n\r]+/g,'');
	return t
    }
    function loadfile(url) {
	var req;
        req = new XMLHttpRequest();
	req.onreadystatechange = function(){
	    if (req.readyState==4 && req.status==200){
		document.getElementById('ltx').innerHTML = req.responseText;
	    }
	}
	req.open("GET",url,false); //do synchronous request
	req.send();
    }
    window.onload = function() {
        var nd = document.getElementById('ltx')
        if (nd && nd.innerHTML.length<20) {
            var fn = document.URL;
            fn = fn.replace(/#.*/,""); // remove any anchor from URL
            loadfile(fn.substring(0,fn.length-4)+"tex");
        }
	var pres = document.getElementsByTagName('pre');
	for (var i=0; i<pres.length; i++){
            if (pres[i].className == "LaTeX") {
               st = pres[i].innerHTML;

st = st.replace(/\\begin\{verbatim\}([\s\S]*?)\\end\{verbatim\}/g,verbatim);
st = st.replace(/\\%/g, "<per>"); // save \% sign
st = st.replace(/%[^\n]*(?=\n)/g,""); // remove LaTeX comments
st = st.replace(/%[^\r]*(?=\r)/g,""); // IE
st = st.replace(/<per>/g, "\\%"); // restore \% sign
st = st.replace(/\\newtheorem.*\}/g,"");
st = st.replace(/\\renewcommand.*\}/g,"");
st = st.replace(/\\documentclass[^\}]*\}/g,"");
st = st.replace(/\\usepackage[^\}]*\}/g,""); // ignore packages
st = st.replace(/\\begin\s*\{\s*document\s*\}/g,"");
st = st.replace(/\\maketitle/g,"");
st = st.replace(/\\end\s*\{\s*document\s*\}/g,"");
st = st.replace(/\\noindent/g,"");
st = st.replace(/\\notag/g,"");
st = st.replace(/\\title\[[^\]]+\]\{([^\}]+)\}/g,'<div class="title">$1</div>');
st = st.replace(/\\title\{([^\}]+)\}/g,'<div class="title">$1</div>');
st = st.replace(/\\author\{([^\}]+)\}/g,'<div class="author">$1</div>');
st = st.replace(/\\email\{([^\}]+)\}/g,'<div class="email">$1</div>');
st = st.replace(/\\address\{([^\}]+)\}/g,address);
st = st.replace(/\\date\{([^\}]+)\}/g,'<div class="date">$1</div>');
st = st.replace(/\\keywords\{([^\}]+)\}/g,'<div class="keywords">$1.</div>'); 
st = st.replace(/\\subjclass\[(\w+)\]\{([^\}]+)\}/g,'<div class="subjclass">$1  <i>Mathematics Subject Classification</i>: $2</div>'); 
st = st.replace(/\\subjclass\{([^\}]+)\}/g,'<div class="subjclass"><i>Mathematics Subject Classification</i>: $1</div>'); 
st = st.replace(/\\begin\{abstract\}/g,'<div class="abstract">'); 
st = st.replace(/\\end\{abstract\}/g,"</div>");

st = st.replace(/\\chapter\{([^\}]+)\}/g,'<h1 class="chapter">$1</h1>');
st = st.replace(/\\section\{([^\}]+)\}/g,'<h2 class="section">$1</h2>');
st = st.replace(/\\subsection\{([^\}]+)\}/g,'<h3 class="subsection">$1</h3>');
st = st.replace(/\\subsubsection\{([^\}]+)\}/g,'<h4 class="subsubsection">$1</h4>');

st = st.replace(/\\begin\{definition\}/g,'\n<div class="definition">');
st = st.replace(/\\end\{definition\}/g,"</div>\n");
st = st.replace(/\\begin\{lemma\}/g,'\n<div class="lemma">');
st = st.replace(/\\end\{lemma\}/g,"</div>\n");
st = st.replace(/\\begin\{theorem\}/g,'\n<div class="theorem">');
st = st.replace(/\\end\{theorem\}/g,"</div>\n");
st = st.replace(/\\begin\{corollary\}/g,'\n<div class="corollary">');
st = st.replace(/\\end\{corollary\}/g,"</div>\n");
st = st.replace(/\\begin\{proposition\}/g,'\n<div class="proposition">');
st = st.replace(/\\end\{proposition\}/g,"</div>\n");
st = st.replace(/\\begin\{proof\}/g,'\n<div class="proof">');
st = st.replace(/\\end\{proof\}/g,'</div>\n');
st = st.replace(/\\begin\{example\}/g,'\n<div class="example">');
st = st.replace(/\\end\{example\}/g,"</div>\n");
st = st.replace(/\\begin\{exercise\}/g,'\n<div class="exercise">');
st = st.replace(/\\end\{exercise\}/g,"</div>\n");
st = st.replace(/\\begin\{center\}/g,'\n<div class="center">');
st = st.replace(/\\end\{center\}/g,"</div>\n");
st = st.replace(/\\begin\{verbatim\}/g,'\n<pre class="verbatim">');
st = st.replace(/\\end\{verbatim\}/g,"</pre>\n");
st = st.replace(/\\begin\{itemize\}/g,'<ul class="itemize">'); 
st = st.replace(/\\end\{itemize\}/g,"</ul>");
st = st.replace(/\\begin\{enumerate\}/g,'<ol class="enumerate">');
st = st.replace(/\\item\[(\w+)\]/g,"<li>$1");
st = st.replace(/\\item/g,"<li>");
st = st.replace(/\\end\{enumerate\}/g,"</ol>");
st = st.replace(/\\begin\{thebibliography\}\{[^\}]*\}([\s\S]*?)\\end\{thebibliography\}/g,bibliography);
st = st.replace(/\\begin\{tikzpicture\}([\s\S]*?)\\end\{tikzpicture\}/g,'');

// use this template to create translations for other environments
st = st.replace(/\\begin\{\}/g,'<div class="">');
st = st.replace(/\\end\{\}/g,"</div>");

// cannot have {} nested inside currently
st = st.replace(/\\textbf\{([^\}]+)\}/g,'<b>$1</b>');
st = st.replace(/\\textit\{([^\}]+)\}/g,'<span class="textit">$1</span>');
st = st.replace(/\\textsc\{([^\}]+)\}/g,'<span class="textsc">$1</span>');
st = st.replace(/\\textsf\{([^\}]+)\}/g,'<span class="textsf">$1</span>');
st = st.replace(/\\textsl\{([^\}]+)\}/g,'<span class="textsl">$1</span>');
st = st.replace(/\\texttt\{([^\}]+)\}/g,'<span class="texttt">$1</span>');
st = st.replace(/\\emph\{([^\}]+)\}/g,'<em>$1</em>');
st = st.replace(/\\verb\|([^\|]+)\|/g,'<pre class="verb">$1</pre>');

st = st.replace(/\\begin\{table\}([\s\S]*?)\\end\{table\}/g,table);

st = st.replace(/\\label\{([^\}]+)\}/g,'<a class="label" id="$1"></a>');
st = st.replace(/\\ref\{(\w+)\}/g,'<a class="ref" href="#$1">$1</a>');
st = st.replace(/\\url\{([^\}]+)\}/g,'<a href="$1">$1</a>');
st = st.replace(/\\href\{([^\}]+)\}\{([^\}]+)\}/g,'<a href="$1">$2</a>');
st = st.replace(/\\cite\{([^\}]+)\}/g,'[<a class="cite" href="#$1">$1</a>]');
st = st.replace(/\\begin\{figure\}\[[^\]]+\]/g,'<table class="figure">');
st = st.replace(/\\begin\{figure\}/g,'<table class="figure">');
st = st.replace(/\\end\{figure\}/g,"</table>");
st = st.replace(/\\includegraphics\{([^\}]+)\}/g,'<tr><td class="image"><img src="$1"></td></tr>');

var j = st.search(/\\caption\{[\s\S]+\}/); 
while(j >= 0) { 
    st = st.replace(/\\caption\{/ ,'<tr><td class="caption">');
    var c = 1;
    for(var k=j; k<st.length;k++) { 
        if(st.charAt(k) == "{") { c++ };
        if(st.charAt(k) == "}") { c-- };
        if(c == 0) { 
            st = st.substring(0,k)+"</td></tr>"+st.substring(k+1,st.length) ;
            break;
        }
    };
    j = st.search(/\\caption\{[\s\S]+\}/);
}

st = st.replace(/\\LaTeX/g,"LaTeX");
st = st.replace(/``/g,"\u201c");
st = st.replace(/''/g,"\u201d");

st = st.replace(/([^\\])\\(\s)/g,"$1\u00A0$2"); //handle backslashspace
st = st.replace(/\\quad/g,"\u2001");
st = st.replace(/\\qquad/g,"\u2001\u2001");
st = st.replace(/\\indent/g,"\u2001\u2001");
st = st.replace(/\\enspace/g,"\u2002");
st = st.replace(/\\;/g,"\u2004");
st = st.replace(/\\:/g,"\u2005");
st = st.replace(/\\,/g,"\u2006");
st = st.replace(/\\thinspace/g,"\u200A");
st = st.replace(/([^\\])~/g,"$1\u00A0");
st = st.replace(/\\~/g,"~");
st = st.replace(/\\textbackslash /g,"\\<b></b>");
st = st.replace(/\\n(?=\s)/g,"<br>");
st = st.replace(/\\newline/g,"<br>");
st = st.replace(/\\linebreak/g,"<br>");
st = st.replace(/\\smallskip/g,'<p class="smallskip">&nbsp</p>');
st = st.replace(/\\medskip/g,'<p class="medskip">&nbsp</p>');
st = st.replace(/\\bigskip/g,'<p class="bigskip">&nbsp</p>');
st = st.replace(/[\n\r]+[ \f\n\r\t\v\u2028\u2029]*[\n\r]+/g,'<p></p>');
st = st.replace(/\\bibitem[^\{]*\{(\w*)\}/g,"<br>[<a name='$1'>$1</a>] ");
st = st.replace(/\{\\scriptsize/g,"");

//miscellaneous nonstandard translations
st = st.replace(/\\centering/g,"");
st = st.replace(/\\G/g,"");
st = st.replace(/\\begin\{exercises\}/g,'<div class="exercises">');
st = st.replace(/\\end\{exercises\}/g,"</div>");
st = st.replace(/\\problem/g,'<span class="problem"></span>');
st = st.replace(/\\begin\{sol\}/g,'<div class="solution">');
st = st.replace(/\\end\{sol\}/g,"</div>");
st = st.replace(/\\qed/g,"\u220E");
st = st.replace(/\\endproof/g,"\u220E");
st = st.replace(/\\proof/g,"<b>Proof: </b>");

                pres[i].outerHTML = st;
            }
        }

	(function () { //config and run MathJax
	    var head = document.getElementsByTagName("head")[0], script;
	    script = document.createElement("script");
	    script.type = "text/x-mathjax-config";
	    script[(window.opera ? "innerHTML" : "text")] =
		"MathJax.Hub.Config({\n" +
		"  tex2jax: { inlineMath: [['$','$'], ['\\\\(','\\\\)']], processEscapes: true }\n" +
		",  TeX: { extensions: ['color.js'], equationNumbers: { autoNumber: 'AMS' } }\n" +
		"});"
	    head.appendChild(script);
	    script = document.createElement("script");
	    script.type = "text/javascript";
	    script.src  = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
		//or edit previous line for any other cdn or local mathjax installation
	    head.appendChild(script);
	})();
    }
})();
