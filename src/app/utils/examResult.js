export function getGradeAndGPA(marks, examGrades = []) {
  if (!marks || marks === "" || !examGrades || examGrades.length === 0) {
    return { grade: "N/A", gpa: 0 };
  }

  // Convert marks to number
  const numericMarks = parseFloat(marks);
  
  // Find matching grade range
  const matchingGrade = examGrades.find(grade => {
    const finalPercent = parseFloat(grade.finalpercent);
    const nextGrade = examGrades[grade.examfinalgradeseq - 2];
    const lowerBound = nextGrade ? parseFloat(nextGrade.finalpercent) : 0;
    
    return numericMarks >= lowerBound && numericMarks < finalPercent;
  });

  if (matchingGrade) {
    return {
      grade: matchingGrade.overallgrade,
      gpa: parseFloat(matchingGrade.overallgradepoint)
    };
  }

  // Handle 100% or perfect score
  if (numericMarks === 100) {
    const topGrade = examGrades[examGrades.length - 1];
    return {
      grade: topGrade.overallgrade,
      gpa: parseFloat(topGrade.overallgradepoint)
    };
  }

  // Default case if no match found
  return { grade: "F", gpa: 0 };
}

export function getGradeClass(grade) {
  switch (grade) {
    case "A":
    case "A-":
      return "bg-green-600";
    case "B+":
      return "bg-blue-600";
    case "B":
    case "B-":
      return "bg-blue-500";
    case "C+":
    case "C":
      return "bg-yellow-500";
    case "D":
      return "bg-orange-500";
    case "F":
      return "bg-red-600";
    default:
      return "bg-gray-500";
  }
}

export function getOverallAchievement(gpa) {
  if (isNaN(gpa) || gpa === 0) return "GAGAL";
  
  const numericGPA = parseFloat(gpa);
  if (numericGPA >= 3.6) return "CEMERLANG";
  if (numericGPA >= 3.3) return "SANGAT BAIK";
  if (numericGPA >= 2.3) return "BAIK";
  if (numericGPA >= 2.0) return "MEMUASKAN";
  if (numericGPA >= 1.6) return "LULUS";
  return "GAGAL";
}