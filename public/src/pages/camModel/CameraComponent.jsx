/** @format */

import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { createWorker } from "tesseract.js";

const CameraComponent = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOCR = async (capturedImage) => {
    setIsProcessing(true);
    const worker = createWorker({
      logger: (info) => console.log(info), // Log OCR progress
    });

    try {
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");

      const { data } = await worker.recognize(capturedImage);
      setText(data.text);
    } catch (error) {
      console.error("Error during OCR:", error);
      setText("Failed to extract text. Please try again.");
    } finally {
      await worker.terminate();
      setIsProcessing(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        fontFamily: "Arial, sans-serif",
      }}>
      {!image && (
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "primary.main", mb: 3, textAlign: "center" }}>
            Place your report in between the borders
          </Typography>

          <Card
            sx={{
              width: "100%",
              maxWidth: 350,
              height: 350,
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "primary.main",
              boxShadow: 3,
              mb: 3,
            }}>
            <Camera
              ref={camera}
              aspectRatio={1}
            />
          </Card>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const capturedImage = camera.current.takePhoto();
              setImage(capturedImage);
              handleOCR(capturedImage); // Perform OCR
            }}
            sx={{
              textTransform: "none",
              fontSize: "16px",
              mb: 3,
            }}>
            Take Photo
          </Button>
        </Box>
      )}
      {image && (
        <Box>
          <Card
            sx={{
              width: "100%",
              maxWidth: 350,
              borderRadius: 2,
              boxShadow: 3,
              overflow: "hidden",
              mb: 2,
            }}>
            <CardMedia
              component="img"
              image={image}
              alt="Captured moment"
              sx={{ width: "100%", height: "auto" }}
            />
          </Card>

          {isProcessing ? (
            <CircularProgress sx={{ mt: 2 }} />
          ) : (
            <Typography
              variant="body1"
              sx={{ mt: 2, color: "text.primary", textAlign: "center" }}>
              {text || "No text detected."}
            </Typography>
          )}

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setImage(null);
              setText("");
            }}
            sx={{
              textTransform: "none",
              fontSize: "16px",
              mt: 2,
            }}>
            Retake Photo
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CameraComponent;
