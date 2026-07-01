// src/api/students.js

export const MOCK_STUDENTS = [
  {
    id: "stu_001",
    name: "Sophie Martin",
    nationality: "🇫🇷 France",
    school: "ISI Florence",
    program: "Art History",
    languages: ["FR", "EN", "IT"],
    bio: "Passionate about Renaissance art and finding the best gelato in Florence!",
    interests: ["art", "photography", "hiking"],
    avatar: null,
    joinedDate: "2026-09-01"
  },
  {
    id: "stu_002",
    name: "Carlos Rivera",
    nationality: "🇲🇽 Mexico",
    school: "Lorenzo de' Medici",
    program: "Culinary Arts",
    languages: ["ES", "EN"],
    bio: "Future chef combining Italian and Mexican cuisine. Let's cook together!",
    interests: ["cooking", "food", "soccer"],
    avatar: null,
    joinedDate: "2026-09-01"
  },
  {
    id: "stu_003",
    name: "Yuki Tanaka",
    nationality: "🇯🇵 Japan",
    school: "British Institute",
    program: "Italian Language",
    languages: ["JA", "EN", "IT"],
    bio: "Learning Italian from scratch. Kawaii Firenze! 🌸",
    interests: ["language", "manga", "coffee"],
    avatar: null,
    joinedDate: "2026-09-15"
  },
  {
    id: "stu_004",
    name: "Emma Johnson",
    nationality: "🇺🇸 USA",
    school: "SACI Florence",
    program: "Fashion Design",
    languages: ["EN"],
    bio: "Design student from NYC. Florence is inspiring me every single day.",
    interests: ["fashion", "design", "wine"],
    avatar: null,
    joinedDate: "2026-08-28"
  },
  {
    id: "stu_005",
    name: "Ahmed Hassan",
    nationality: "🇪🇬 Egypt",
    school: "Marist Florence",
    program: "Architecture",
    languages: ["AR", "EN", "IT"],
    bio: "Architecture student obsessed with Brunelleschi's dome. Ciao!",
    interests: ["architecture", "history", "football"],
    avatar: null,
    joinedDate: "2026-09-05"
  },
  {
    id: "stu_006",
    name: "Léa Dubois",
    nationality: "🇧🇪 Belgium",
    school: "ISI Florence",
    program: "Photography",
    languages: ["FR", "EN", "NL"],
    bio: "Capturing Florence one shot at a time. Street photography lover.",
    interests: ["photography", "art", "cycling"],
    avatar: null,
    joinedDate: "2026-09-10"
  }
];

export async function getStudents(filters = {}) {
  await delay(300);
  let students = [...MOCK_STUDENTS];

  if (filters.school) {
    students = students.filter(s => s.school === filters.school);
  }
  if (filters.interest) {
    students = students.filter(s => s.interests.includes(filters.interest));
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    students = students.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.school.toLowerCase().includes(q) ||
      s.program.toLowerCase().includes(q)
    );
  }

  return students;
}

export async function getStudentById(id) {
  await delay(200);
  return MOCK_STUDENTS.find(s => s.id === id) || null;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
