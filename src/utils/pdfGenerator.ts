import { jsPDF } from 'jspdf';
import { MedicalReport, PatientProfile } from '../types';

export const generateReportPDF = (report: MedicalReport, patientName: string = 'Rajesh Kumar (P-10482)') => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = 18;

  // Header Banner
  doc.setFillColor(49, 39, 106); // #31276a Primary Brand Color
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('SUSHRUTA HEALTHCARE CDSS', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(220, 215, 245);
  doc.text('OFFICIAL CLINICAL DIAGNOSTIC REPORT COPY', margin, 18);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin, 18, { align: 'right' });

  y = 38;

  // Report Title Box
  doc.setFillColor(245, 243, 252);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 20, 3, 3, 'F');

  doc.setTextColor(49, 39, 106);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(report.name.toUpperCase(), margin + 5, y + 8);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 120);
  doc.text(`Code: ${report.code}  |  Category: ${report.type}  |  Date: ${report.date}`, margin + 5, y + 15);

  y += 28;

  // Metadata Grid Box
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 95);

  doc.text('Patient Name:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 30);
  doc.text(patientName, margin + 28, y);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 95);
  doc.text('Attending Doctor:', margin + 100, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 30);
  doc.text(report.physician, margin + 133, y);

  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 95);
  doc.text('Report Status:', margin, y);

  // Status badge styling
  if (report.status === 'Normal' || report.status === 'Clear') {
    doc.setTextColor(16, 124, 65);
  } else if (report.status === 'Review' || report.status === 'Pending') {
    doc.setTextColor(180, 100, 0);
  } else {
    doc.setTextColor(190, 25, 25);
  }
  doc.setFont('helvetica', 'bold');
  doc.text(report.status.toUpperCase(), margin + 28, y);

  y += 12;

  // Divider line
  doc.setDrawColor(220, 220, 230);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);

  y += 10;

  // Section 1: Clinical Findings
  if (report.findings) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(49, 39, 106);
    doc.text('CLINICAL FINDINGS', margin, y);

    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(40, 40, 50);

    const findingsLines = doc.splitTextToSize(report.findings, pageWidth - 2 * margin);
    doc.text(findingsLines, margin, y);
    y += findingsLines.length * 5 + 8;
  }

  // Section 2: Biomarker Measurements Table
  if (report.metrics && report.metrics.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(49, 39, 106);
    doc.text('BIOMARKER MEASUREMENTS', margin, y);

    y += 5;

    // Table Header
    doc.setFillColor(235, 232, 248);
    doc.rect(margin, y, pageWidth - 2 * margin, 7, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(49, 39, 106);
    doc.text('Parameter Name', margin + 4, y + 5);
    doc.text('Observed Value', margin + 75, y + 5);
    doc.text('Reference Interval', margin + 130, y + 5);

    y += 7;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 30, 40);

    report.metrics.forEach((m, idx) => {
      // Alternating row background
      if (idx % 2 === 1) {
        doc.setFillColor(248, 248, 252);
        doc.rect(margin, y, pageWidth - 2 * margin, 7, 'F');
      }

      doc.text(m.label, margin + 4, y + 5);

      if (m.status === 'warning' || m.status === 'attention') {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(190, 25, 25);
        doc.text(`${m.value} (FLAGGED)`, margin + 75, y + 5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(30, 30, 40);
      } else {
        doc.text(m.value, margin + 75, y + 5);
      }

      doc.text(m.refRange, margin + 130, y + 5);

      y += 7;
    });

    y += 8;
  }

  // Section 3: Doctor's Recommendations
  if (report.doctorNotes) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(49, 39, 106);
    doc.text("DOCTOR'S RECOMMENDATIONS", margin, y);

    y += 6;

    doc.setFillColor(254, 249, 231);
    doc.setDrawColor(245, 210, 120);
    const docNotesLines = doc.splitTextToSize(report.doctorNotes, pageWidth - 2 * margin - 8);
    const boxHeight = docNotesLines.length * 5 + 6;

    doc.roundedRect(margin, y, pageWidth - 2 * margin, boxHeight, 2, 2, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(110, 75, 10);
    doc.text(docNotesLines, margin + 4, y + 5);

    y += boxHeight + 10;
  }

  // Footer
  const footerY = 280;
  doc.setDrawColor(220, 220, 230);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(140, 140, 150);
  doc.text('This digital report is computer generated by Sushruta CDSS and verified by attending clinical staff.', margin, footerY);
  doc.text(`Page 1 of 1`, pageWidth - margin, footerY, { align: 'right' });

  // Trigger browser download
  const safeFileName = `${report.code}_${report.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(safeFileName);
};

export const generatePatientSummaryPDF = (patient: PatientProfile) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = 18;

  // Header Banner
  doc.setFillColor(49, 39, 106);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('SUSHRUTA CDSS - CLINICAL SUMMARY', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(220, 215, 245);
  doc.text('PATIENT COMPREHENSIVE RISK & HEALTH SUMMARY', margin, 18);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, 18, { align: 'right' });

  y = 36;

  // Patient Info Header Box
  doc.setFillColor(245, 243, 252);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 24, 3, 3, 'F');

  doc.setTextColor(49, 39, 106);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(`${patient.name.toUpperCase()} (ID: ${patient.idNumber || patient.id})`, margin + 5, y + 8);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 100);
  doc.text(`Age: ${patient.age} yrs  |  Gender: ${patient.gender}  |  Blood Group: ${patient.bloodGroup}  |  BMI: ${patient.bmi || 24.2} kg/m²`, margin + 5, y + 15);

  y += 32;

  // Risk Score Block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(49, 39, 106);
  doc.text('CDSS AI RISK SCORE & PRIMARY FLAG', margin, y);

  y += 6;
  doc.setFillColor(255, 240, 240);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 14, 2, 2, 'F');

  doc.setTextColor(190, 25, 25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`Risk Score: ${patient.riskScore || 62}% (${patient.primaryRiskCategory || 'Cardiovascular & Metabolic Risk'})`, margin + 5, y + 9);

  y += 22;

  // Medical History & Allergies
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(49, 39, 106);
  doc.text('KNOWN MEDICAL HISTORY & ALLERGIES', margin, y);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(40, 40, 50);

  if (patient.medicalHistory && patient.medicalHistory.length > 0) {
    doc.text(`• Medical Conditions: ${patient.medicalHistory.join(', ')}`, margin + 5, y);
    y += 6;
  }

  doc.text(`• Known Allergies: ${patient.allergies.length > 0 ? patient.allergies.join(', ') : 'None Reported'}`, margin + 5, y);
  y += 6;

  if (patient.currentMedications && patient.currentMedications.length > 0) {
    doc.text(`• Active Medications: ${patient.currentMedications.join(', ')}`, margin + 5, y);
    y += 6;
  }

  y += 14;

  // Footer
  const footerY = 280;
  doc.setDrawColor(220, 220, 230);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(140, 140, 150);
  doc.text('Confidential Clinical Decision Support Document • Sushruta CDSS System', margin, footerY);

  const safeFileName = `Clinical_Summary_${patient.idNumber || patient.id}.pdf`;
  doc.save(safeFileName);
};
