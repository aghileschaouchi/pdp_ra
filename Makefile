PROJECT=rapport
LATEX = latex
TEX=pdflatex
BIBTEX=bibtex
BUILDTEX=$(TEX) $(PROJECT).tex

all:
	$(LATEX) $(PROJECT).tex
	$(LATEX) $(PROJECT).tex
	$(BIBTEX) $(PROJECT)
	$(BUILDTEX)
	$(BUILDTEX)
clean-all:
	rm -f *.aux *.blg *.out *.bbl *.log *.pdf *.*~ *~ *.dvi *.fls *.fdb_latexmk "#"*"#" *.toc

clean:
	rm -f *.aux *.blg *.out *.bbl *.log *.*~ *~ *.dvi *.toc
