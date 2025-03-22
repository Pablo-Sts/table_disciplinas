"use client";
import { useEffect, useState } from "react";

type Subject = {
  id: number;
  courseId: number;
  subjectTypeId: number;
  acronym: string;
  description: string;
  period: number;
  workload: number;
};

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API;

  const [subjects, setSubjects] = useState<Subject[]>([]);

  async function getSubjects() {
    await fetch(`${baseUrl}/subject`)
      .then((response) => response.json())
      .then((data) => setSubjects(data));
  }

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <>
      <header className="flex w-full h-fit items-center justify-center p-4 border-b-[1px] border-zinc-800">
        <h1 className="text-xl font-bold">DISCIPLINAS</h1>
      </header>
      <main className=" flex flex-1 justify-center items-center w-full">
        {subjects.length === 0 && <p>NÃO FORAM ENCONTRADAS DISCIPLINAS.</p>}

        {subjects.length > 0 && (
          <table className="w-4/5 mt-10 h-3/4 overflow-y-scroll">
            <thead className="w-full border">
              <tr>
                <th className="w-1/6 p-3">Sigla</th>
                <th className="w-3/5">Descrição</th>
                <th className="w-1/6">Período</th>
                <th className="w-1/6">Duração</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {subjects.map((subject: Subject, index: number) => {
                return (
                  <tr key={subject.id} className={`border text-center ${index%2 === 0 && "bg-zinc-800"}`}>
                    <td className="p-2">{subject.acronym}</td>
                    <td>{subject.description}</td>
                    <td>{subject.period}</td>
                    <td>{subject.workload}h</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
