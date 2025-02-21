import React from "react";
import Nav from "./DashboardComponents/Nav";
import WorkFlowToDo from "./DashboardComponents/WorkFlowToDo";

export default function Dashboard() {
  return (
    <>
      <section className="px-4 max-w-7xl mx-auto  rounded-2xl mt-3 mb-3">
        <header className="">
          <Nav />
        </header>
        <main className="max-w-7xl mx-auto rounded-b-2xl">
          <WorkFlowToDo />
        </main>
      </section>
    </>
  );
}
