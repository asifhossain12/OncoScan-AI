"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material"

// Mock report data - replace with actual data from your backend
const mockReport = {
  patientId: "P12345",
  scanDate: "2024-02-22",
  findings: [
    {
      location: "Left Lung",
      size: "2.3 cm",
      type: "Nodule",
      severity: "Moderate",
    },
    {
      location: "Right Lymph Node",
      size: "1.1 cm",
      type: "Mass",
      severity: "Mild",
    },
  ],
  recommendation: "Follow-up scan recommended in 3 months",
  confidence: 0.89,
}

export default function Report() {
  const navigate = useNavigate()
  const [report] = useState(mockReport)

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild":
        return "success"
      case "moderate":
        return "warning"
      case "severe":
        return "error"
      default:
        return "default"
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h4" component="h1">
            Oncology Report
          </Typography>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Upload New Image
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Patient ID: {report.patientId}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Scan Date: {report.scanDate}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            AI Confidence: {(report.confidence * 100).toFixed(1)}%
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Findings
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Severity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.findings.map((finding, index) => (
                <TableRow key={index}>
                  <TableCell>{finding.location}</TableCell>
                  <TableCell>{finding.type}</TableCell>
                  <TableCell>{finding.size}</TableCell>
                  <TableCell>
                    <Chip label={finding.severity} color={getSeverityColor(finding.severity) as any} size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ bgcolor: "background.paper", p: 3, borderRadius: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Recommendation
          </Typography>
          <Typography>{report.recommendation}</Typography>
        </Box>
      </Paper>
    </Container>
  )
}

