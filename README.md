LaTeXMathJax
============

A simple LaTeX to HTML+CSS+MathJax translator.

To use this script client-side, simply download the .js and .css file,
and insert the content of a (fairly standard) LaTeX file at the ... in
the template HTML file below.

    <!DOCTYPE html>
    <html>
      <head>
        <script type="text/javascript" src="latexmathjax.js"></script>
        <link rel="stylesheet" type="text/css" href="latexmathjax.css" />
      </head>
      <body>
        <pre class="LaTeX">
        ...
        </pre>
      </body>
    </html>

Then save the HTML file in the same folder as the .js and .css files
and open it from a browser. The result should be a reasonable
approximation of the PDF file that pdflatex would have produced. If
there are some issues (yes, this is quite possible since LaTeX is far
too large to translate with a small script like this) then look at the
latexmathjax.js file and the latexmathjax.css file to see if the
issues can be fixed easily.
