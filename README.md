latexmathjax
============

A simple LaTeX to HTML+CSS+MathJax translator

To use this script client-side, simply put a (fairly standard) LaTeX file between the tags 

<div class="LaTeX">

</div>

in the (outline) HTML file below. Then save the HTML file and open it from a browser. The result should be a reasonable approximation of the PDF file that pdflatex would have produced. If there are some issues (and yes, this is quite possible since LaTeX is far to large to translate with a small script like this) then look at the .js file and the .css file to see if the issues can be fixed easily.
