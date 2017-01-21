FILE=rapport

$(FILE).pdf: %.tex
	latexmk -pdf $(FILE)

clean:
	rm -f *.aux *.blg *.out *.bbl *.log *.pdf *.*~ *~ *.dvi *.fls *.fdb_latexmk "#"*"#"
letpdf:
	rm -f *.aux *.blg *.out *.bbl *.log *.*~ *~ *.dvi		
