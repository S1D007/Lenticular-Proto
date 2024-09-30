BINARY_NAME= lenticular
GO_FILES=$(shell find . -name '*.go')

.PHONY: all build run clean

all: build

build:
	@echo "Building the Go binary..."
	go build -o $(BINARY_NAME)

run: build
	@echo "Starting the server..."
	./$(BINARY_NAME)

clean:
	@echo "Cleaning up..."
	rm -f $(BINARY_NAME)

fmt:
	@echo "Formatting Go code..."
	go fmt $(PKG)