latexmathjax
============

A simple LaTeX to HTML+CSS+MathJax translator

To use this script client-side, simply insert the content of a (fairly standard) LaTeX file at the ... in the
template HTML file below.

&lt;!DOCTYPE html><br>
&lt;html><br>
&nbsp;&nbsp;&lt;head><br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;script type="text/javascript" src="latexmathjax.js">&lt;/script><br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;link rel="stylesheet" type="text/css" href="latexmathjax.css" /><br>
&nbsp;&nbsp;&lt;/head><br>
&nbsp;&nbsp;&lt;body><br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;pre class="LaTeX"><br>
...
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/pre><br>
&nbsp;&nbsp;&lt;/body><br>
&lt;/html>

Then save the HTML file and open it from a browser. The result should be a reasonable approximation of the PDF file that pdflatex would have produced. If there are some issues (and yes, this is quite possible since LaTeX is far too large to translate with a small script like this) then look at the latexmathjax.js file and the latexmathjax.css file to see if the issues can be fixed easily.
