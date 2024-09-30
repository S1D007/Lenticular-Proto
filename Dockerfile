# Stage 1: Build the application
FROM golang:1.22.3 AS builder

WORKDIR /app

COPY go.mod go.sum ./

# It will download all the dependencies
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o lenticular .

# Stage 2: Build the final image
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=builder /app/lenticular .

CMD ["./lenticular"]

EXPOSE 8080