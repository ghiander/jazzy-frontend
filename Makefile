.PHONY: build test run debug

imageName=jazzyfront

build:
	docker build -t ${imageName} .

debug:
	docker run --rm -it -p 8501:8501 -p 3000:3000 --name ${imageName} --mount source=${PWD}/src,target=/app,type=bind ${imageName} /bin/bash
	streamlit run app.py

run:
	docker run -p 8501:8501 --rm --name ${imageName} ${imageName}

test:
	echo "no tests have been implemented yet"