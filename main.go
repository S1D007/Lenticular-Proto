package main

import (
	"encoding/json"
	"fmt"
	"image"
	"image/png"
	"net/http"
	"strconv"

	"github.com/disintegration/imaging"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type ErrorResponse struct {
	Error string `json:"error"`
}

func interlaceImages(images []image.Image, stripWidth int) (image.Image, error) {
	// width of the 1st image as a reference frame for other images
	width := images[0].Bounds().Dx()
	// height of the 1st image as a reference frame for other images
	height := images[0].Bounds().Dy()

	interlaced := image.NewNRGBA(image.Rect(0, 0, width, height))
	for x := 0; x < width; x++ {
		// calculate the index of the image to take the pixel from
		imgIndex := (x / stripWidth) % len(images)
		for y := 0; y < height; y++ {
			// set the pixel from the image like a strip with the width of stripWidth
			interlaced.Set(x, y, images[imgIndex].At(x, y))
		}
	}

	return interlaced, nil
}

func writeJSONError(w http.ResponseWriter, message string, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(ErrorResponse{Error: message})
}

func uploadHandler(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(32 << 20)
	if err != nil {
		writeJSONError(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	stripWidthStr := r.FormValue("stripWidth")
	stripWidth, err := strconv.Atoi(stripWidthStr)
	if err != nil || stripWidth <= 0 {
		stripWidth = 8
	}

	files := r.MultipartForm.File["images"]
	var loadedImages []image.Image

	for _, fileHeader := range files {
		file, err := fileHeader.Open()
		if err != nil {
			writeJSONError(w, "Unable to open uploaded file", http.StatusInternalServerError)
			return
		}
		defer file.Close()

		img, err := imaging.Decode(file)
		if err != nil {
			writeJSONError(w, "Failed to decode image", http.StatusBadRequest)
			return
		}
		loadedImages = append(loadedImages, img)
	}

	interlacedImg, err := interlaceImages(loadedImages, stripWidth)
	if err != nil {
		writeJSONError(w, "Failed to interlace images", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "image/png")
	if err := png.Encode(w, interlacedImg); err != nil {
		writeJSONError(w, "Failed to encode interlaced image", http.StatusInternalServerError)
	}
}

func main() {
	router := mux.NewRouter()
	router.Use(cors.Default().Handler)
	router.HandleFunc("/upload", uploadHandler).Methods("POST")

	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", router)
}
