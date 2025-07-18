// src/components/ResumePDF.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  header: { fontSize: 18, marginBottom: 10 },
  label: { fontSize: 12, fontWeight: 'bold' },
  value: { fontSize: 12 },
});

const ResumePDF = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>{resume.name}</Text>
        <Text style={styles.value}>{resume.contact}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Summary</Text>
        <Text style={styles.value}>{resume.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Education</Text>
        <Text style={styles.value}>{resume.education}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Experience</Text>
        <Text style={styles.value}>{resume.experience}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Skills</Text>
        <Text style={styles.value}>{resume.skills}</Text>
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
