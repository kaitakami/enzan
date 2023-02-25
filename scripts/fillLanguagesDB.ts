import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const languages = [
  { name: "TypeScript" },
  { name: "JavaScript" },
  { name: "HTML/CSS" },
  { name: "C++" },
  { name: "Kotlin" },
  { name: "Swift" },
  { name: "Python" },
  { name: "Ruby" },
  { name: "PHP" },
  { name: "Dart" },
  { name: "Java" },
  { name: "C#" },
  { name: "Go" },
  { name: "Rust" },
  { name: "Lua" },
  { name: "Elixir" },
  { name: "R" },
  { name: "Perl" },
  { name: "Scala" },
  { name: "Groovy" },
  { name: "COBOL" },
  { name: "C" },
  { name: "Visual Basic" },
  { name: "MATLAB" },
  { name: "CoffeeScript" },
];

const fillDB = async () => {
  const prevLanguages = await prisma.language.findMany();
  const newLanguages = languages.filter(
    (language) =>
      !prevLanguages.find((prevLanguage) => prevLanguage.name === language.name)
  );
  const DB = await prisma.language.createMany({
    data: newLanguages,
  });
  console.log(DB);
};

fillDB().catch((err) => console.log(err));
