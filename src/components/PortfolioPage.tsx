"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PortfolioGrid from "@/components/PortfolioGrid";
import { useState } from "react";

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div>
      <Navbar onFilterChange={handleFilterChange} />
      <PortfolioGrid activeFilter={activeFilter} />
      <Footer />
    </div>
  );
};

export default PortfolioPage;
