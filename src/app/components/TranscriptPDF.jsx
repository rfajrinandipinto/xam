import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Calibri',
  fonts: [
    {
      src: '/fonts/calibri.ttf',
    },
  ],
});

Font.register({
  family: 'Tahoma',
  fonts: [
    {
      src: '/fonts/tahoma.ttf',
    },
    {
      src: '/fonts/tahoma-bold.ttf',
      fontWeight: 'bold',
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Calibri',
    fontSize: 11,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    gap: 10,
  },
  logoContainer: {
    width: 95,
    marginRight: 15,
  },
  logo: {
    width: 95,
    height: 85,
  },
  header: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 10,
    fontFamily: 'Tahoma',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  headerText: {
    fontSize: 10,
    fontFamily: 'Tahoma',
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Tahoma',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF0000',
  },
  studentInfo: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 120,
    fontFamily: 'Tahoma',
    fontSize: 11,
  },
  value: {
    flex: 1,
    fontFamily: 'Tahoma',
    fontSize: 11,
  },
  courseTable: {
    marginBottom: 20,
    position: 'relative',
  },
  watermark: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
    objectFit: 'contain',
  },
  tableContent: {
    position: 'relative',
    zIndex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
    fontFamily: 'Tahoma',
    fontWeight: 'bold',
    fontSize: 10,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
    fontSize: 10,
  },
  codeColumn: {
    width: '15%',
  },
  nameColumn: {
    width: '45%',
  },
  creditColumn: {
    width: '15%',
    textAlign: 'center',
  },
  gradeColumn: {
    width: '12.5%',
    textAlign: 'center',
  },
  gpaColumn: {
    width: '12.5%',
    textAlign: 'center',
  },
  tableSummaryRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
    marginTop: 5,
    fontSize: 11,
    fontFamily: 'Tahoma',
    fontWeight: 'bold',
  },
  summaryLeftColumn: {
    width: '75%',
    textAlign: 'left',
  },
  summaryRightColumn: {
    width: '25%',
    textAlign: 'right',
  },
  signature: {
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBlock: {
    width: '45%',
    alignItems: 'center',
    marginTop: 30,
  },
  signatureLine: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#000',
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 10,
    fontFamily: 'Tahoma',
    textAlign: 'center',
  },
});

const TranscriptPDF = ({ data }) => {
  // Calculate overall GPA
  const calculateOverallGPA = () => {
    if (!data || data.length === 0) return 0;
    
    const totalGPA = data.reduce((sum, course) => sum + parseFloat(course.subjgpa || 0), 0);
    return (totalGPA / data.length).toFixed(2);
  };

  // Determine achievement level based on GPA
  const getAchievement = (gpa) => {
    const gpaNum = parseFloat(gpa);
    if (gpaNum >= 3.67) return 'CEMERLANG';
    if (gpaNum >= 3.00) return 'SANGAT BAIK';
    if (gpaNum >= 2.00) return 'BAIK';
    if (gpaNum >= 1.00) return 'LULUS';
    return 'GAGAL';
  };

  // Get student info from first result
  const studentInfo = data && data.length > 0 ? data[0] : {};
  const overallGPA = calculateOverallGPA();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image src="/images/pergeraq-logo.png" style={styles.logo} />
          </View>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>PERSATUAN GURU-GURU AL-QURAN (PERGERAQ)</Text>
            <Text style={styles.headerText}>218E Changi Road #03-10 PKMS Building Singapore 419737</Text>
            <Text style={styles.headerText}>Tel: +65 6348 7057 Fax: +65 6348 7056</Text>
            <Text style={styles.headerText}>E-mail: pergeraqsgp@gmail.com IECP S/N: 17030132</Text>
          </View>
        </View>

        <Text style={styles.title}>TRANSKRIP AKADEMIK</Text>

        <View style={styles.studentInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>NAMA</Text>
            <Text style={styles.value}>: {studentInfo.studentname || ''}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>ID PELAJAR</Text>
            <Text style={styles.value}>: {studentInfo.studentidno || ''}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>PROGRAM</Text>
            <Text style={styles.value}>: {studentInfo.programname || 'SIJIL PENINGKATAN GURU AL-QURAN'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>SESI AKADEMIK</Text>
            <Text style={styles.value}>: {studentInfo.examseriesdescription || ''}</Text>
          </View>
        </View>

        <View style={styles.courseTable}>
          <Image src="/images/pergeraq-logo.png" style={styles.watermark} />
          <View style={styles.tableContent}>
            <View style={styles.tableHeader}>
              <Text style={styles.codeColumn}>Kod</Text>
              <Text style={styles.nameColumn}>Modul</Text>
              <Text style={styles.creditColumn}>Jam Kredit</Text>
              <Text style={styles.gradeColumn}>Gred</Text>
              <Text style={styles.gpaColumn}>GPA</Text>
            </View>

            {data.map((course, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.codeColumn}>{course.subjcode || '-'}</Text>
                <Text style={styles.nameColumn}>{course.subjdesc || '-'}</Text>
                <Text style={styles.creditColumn}>{course.subjearncredit || '-'}</Text>
                <Text style={styles.gradeColumn}>{course.subjgrade || '-'}</Text>
                <Text style={styles.gpaColumn}>{course.subjgpa || '-'}</Text>
              </View>
            ))}

            <View style={styles.tableSummaryRow}>
              <Text style={styles.summaryLeftColumn}>GPA KESELURUHAN: {overallGPA}</Text>
              <Text style={styles.summaryRightColumn}>PENCAPAIAN: {getAchievement(overallGPA)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.signature}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>(Penasihat Akademik)</Text>
            <Text style={styles.signatureText}>Ustaz Dr Mohamed Qusairy Thaha</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>(Ketua Jabatan Akademik)</Text>
            <Text style={styles.signatureText}>Ustaz Achmed Fahdly Bin Mohd Kamsari</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TranscriptPDF;