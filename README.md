LaTeXMathJax
============

A simple LaTeX to HTML+CSS+MathJax translator.

To use this script client-side, simply download the files 
**latexmathjax.js**, **latexmathjax.css** and **test.html** to a folder 
that contains a LaTeX file. Then rename the **test.html** file
so that it has the **same name** as your LaTeX file, but with the 
extension ".html".

Then open the HTML file from a browser. The result should be a reasonable
approximation of the PDF file that pdflatex would have produced. If
there are some issues (yes, this is quite possible since LaTeX is far
too large to translate with a small script like this) then look at the
latexmathjax.js file and the latexmathjax.css file to see if the
issues can be fixed easily.

The **test.html** file (see below) just loads the script and CSS. The
script then loads the LaTeX file and does simple regular expression
replacements to translate it from LaTeX to HTML. The CSS file is used
to style the elements and to number sections, subsections, lemmas,
theorems, etc.  Finally MathJax is invoked to display the math
formulas.

Since each LaTeX construct is handled by a particular regular expression,
the latexmathjax.js file is quite easy to modify and adapt to a larger
subset of LaTeX or to translate some nonstandard features or packages.

The **test.html** file looks as follows:

    <!DOCTYPE html>
    <html>
      <head>
        <script type="text/javascript" src="latexmathjax.js"></script>
        <link rel="stylesheet" type="text/css" href="latexmathjax.css" />
      </head>
      <body>
        <pre id="ltx" class="LaTeX"></pre>
      </body>
    </html>

If you prefer, the LaTeX code can also be manually inserted into the
&lt;pre> tag, but then it cannot be processed with pdflatex and
simultaneaously viewed in a browser.

Here are some sample pages:

[test.html](http://math.chapman.edu/~jipsen/latexmathjax/test.html)

[A longer file](http://math.chapman.edu/~jipsen/latexmathjax/index.html)

[A chapter on functions](http://math.chapman.edu/~jipsen/calculus/1.0/)
