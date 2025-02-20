import React from "react";
import Nav from "./DashboardComponents/Nav";
import WorkFlowToDo from "./DashboardComponents/WorkFlowToDo";

export default function Dashboard() {
  return (
    <>
      <section className="max-w-7xl mx-auto rounded-t-2xl mt-3">
        <header className="">
          <Nav />
        </header>
        <main className="max-w-7xl mx-auto">
          <WorkFlowToDo />
        </main>
      </section>
    </>
  );
}
