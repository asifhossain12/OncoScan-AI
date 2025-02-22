"use client"

import React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography, Button, Paper, CircularProgress } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { Upload as UploadIcon } from "@mui/icons-material"

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile?.type.startsWith("image/")) {
      handleFileSelection(droppedFile)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile?.type.startsWith("image/")) {
      handleFileSelection(selectedFile)
    }
  }

  const handleFileSelection = (selectedFile: File) => {
    setFile(selectedFile)
    const url = URL.createObjectURL(selectedFile)
    setPreviewUrl(url)
  }

  const handleGenerate = async () => {
    if (!file) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would:
      // 1. Create a FormData object
      // 2. Append the image file
      // 3. Send it to your backend
      // 4. Get the report data
      // 5. Store it in state management (Redux/Context)

      navigate("/report")
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
            Oncology Report Generator
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Upload a medical image to generate an oncology report
          </Typography>
        </Box>

        <Paper
          sx={{
            p: 4,
            border: "2px dashed",
            borderColor: isDragging ? "primary.main" : "divider",
            borderRadius: 2,
            cursor: "pointer",
            transition: "border-color 0.3s ease",
            backgroundColor: "background.paper",
            mb: 3,
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <Box sx={{ textAlign: "center" }}>
            <input type="file" id="file-input" accept="image/*" onChange={handleFileSelect} style={{ display: "none" }} />
            {previewUrl ? (
              <Box sx={{ mb: 2 }}>
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ) : (
              <UploadIcon sx={{ fontSize: 48, mb: 2 }} />
            )}
            <Typography>{file ? file.name : "Drop your image here or click to browse"}</Typography>
          </Box>
        </Paper>

        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={!file || isLoading}
          onClick={handleGenerate}
          sx={{
            py: 1.5,
            backgroundColor: "grey.700",
            "&:hover": {
              backgroundColor: "grey.600",
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Generate Report"}
        </Button>
      </Grid>
    </Grid>
  )
}
