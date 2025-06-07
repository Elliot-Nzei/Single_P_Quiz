all: install run

install:
	pip install -r backend/requirements.txt

run:
	uvicorn backend.main:app --reload
push:
		git add .
		git commit -m "Auto-commit"
		git push