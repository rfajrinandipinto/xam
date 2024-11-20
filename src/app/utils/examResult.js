export const calculateTotals = (results) => {
  return results.reduce(
    (totals, course) => {
      totals.totalCredits += course.subjearncredit;
      totals.totalGPAPoints += course.subjgpa * course.subjearncredit;
      totals.totalMarks += parseFloat(course.marks);
      return totals;
    },
    { totalCredits: 0, totalGPAPoints: 0, totalMarks: 0 }
  );
};

export const calculateOverallGPA = (totalGPAPoints, totalCredits) => {
  return totalCredits > 0 ? (totalGPAPoints / totalCredits).toFixed(2) : "0.00";
};

export const calculateOverallMarks = (totalMarks, totalCredits) => {
  return totalCredits > 0 ? (totalMarks / totalCredits).toFixed(2) : "0.00";
};

export function getGradeAndGPA(marks, examGrades = []) {
  // Handle invalid or missing inputs
  if (!examGrades || examGrades.length === 0) {
    return {
      grade: "N/A",
      gpa: 0
    };
  }
  
  // Validate marks
  const numericMarks = parseFloat(marks);
  if (isNaN(numericMarks) || numericMarks < 0 || numericMarks > 100) {
    return {
      grade: "N/A",
      gpa: 0
    };
  }
  
  try {
    // Sort the data to ensure it is in ascending order of finalpercent
    const sortedGrades = examGrades
      .filter(grade => 
        grade.finalpercent && 
        grade.overallgradepoint && 
        grade.overallgrade
      )
      .map(grade => ({
        ...grade,
        finalpercent: parseFloat(grade.finalpercent),
        overallgradepoint: parseFloat(grade.overallgradepoint),
      }))
      .sort((a, b) => a.finalpercent - b.finalpercent);
    
    if (sortedGrades.length === 0) {
      return {
        grade: "N/A",
        gpa: 0
      };
    }
    
    // Find the appropriate grade
    const result = sortedGrades.find(
      (grade, index) =>
        numericMarks <= grade.finalpercent &&
        (index === 0 || numericMarks > sortedGrades[index - 1].finalpercent)
    );
    
    if (!result) {
      return {
        grade: sortedGrades[sortedGrades.length - 1].overallgrade,
        gpa: sortedGrades[sortedGrades.length - 1].overallgradepoint
      };
    }
    
    return {
      grade: result.overallgrade,
      gpa: result.overallgradepoint,
    };
  } catch (error) {
    console.error("Error in getGradeAndGPA:", error);
    return {
      grade: "N/A",
      gpa: 0
    };
  }
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

export function getOverallAchievement(gpa, examGrades = []) {
  // Handle invalid or missing inputs
  if (!examGrades || examGrades.length === 0) {
    return "N/A";
  }
  
  if (isNaN(gpa) || gpa === 0) {
    return "GAGAL";
  }
  
  const numericGPA = parseFloat(gpa);
  
  try {
    // Sort grades by overallgradepoint in descending order
    const sortedGrades = [...examGrades]
      .filter(grade => grade.overallgradepoint) // Filter out invalid grades
      .sort((a, b) => 
        parseFloat(b.overallgradepoint) - parseFloat(a.overallgradepoint)
      );
    
    if (sortedGrades.length === 0) {
      return "N/A";
    }
    
    // Find the first grade where the GPA is greater than or equal to the overallgradepoint
    const grade = sortedGrades.find(grade => 
      numericGPA >= parseFloat(grade.overallgradepoint)
    );
    
    return grade ? grade.overallrank : "GAGAL";
  } catch (error) {
    console.error("Error in getOverallAchievement:", error);
    return "N/A";
  }
}