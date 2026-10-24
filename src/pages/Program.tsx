import React from "react";
import { useParams } from "react-router-dom";
import ProgramPage from "../components/ProgramPage";
import NotFound from "./NotFound";
import { findProgram } from "@/data/programs";

const Program: React.FC = () => {
  const { slug } = useParams();
  const program = findProgram(slug);

  if (!program) return <NotFound />;

  // Remount on programme change so the page resets rather than showing stale state.
  return <ProgramPage key={program.slug} program={program} />;
};

export default Program;
