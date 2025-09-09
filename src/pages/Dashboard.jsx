import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TalentPlanningAgent from "./TalentPlanningAgent";
import ChiefOfStaffAgent from "./ChiefOfStaffAgent";
import UpskillingAgent from "./UpskillingAgent";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [isCardView, setIsCardView] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const navigate = useNavigate();

  const agents = [
    {
      id: 1,
      title: "Clara",
      subtitle: "Unbiased Chief of Staff",
      icon: "📊",
      image: "https://iili.io/KxRu0og.md.png",
      component: <ChiefOfStaffAgent />,
      description:
        "Automated, unbiased reporting directly to leadership. No filters, pure data-driven insights for faster, more confident decisions.",
    },
    {
      id: 2,
      title: "Ethan",
      subtitle: "Talent & Workforce Planning", 
      icon: "🔍",
      image: "https://iili.io/KxRu1Va.md.png",
      component: <TalentPlanningAgent />,
      description:
        "See beyond surface-level reporting. Clear visibility into workload distribution, early detection of overloaded employees, and smart redeployment.",
    },
    {
      id: 3,
      title: "Emily",
      subtitle: "Upskilling & Workforce Development",
      icon: "🎓",
      image: "https://iili.io/Kxj4PAg.png",
      component: <UpskillingAgent />,
      description:
        "From generic training to targeted upskilling. Detects skill gaps, correlates tasks with performance, and recommends personalized training.",
    },
  ];

  const handleCardClick = (agent) => {
    setIsCardView(false);
    setSelectedAgent(agent);
  };

  const toggleView = () => {
    setIsCardView(!isCardView);
    setSelectedAgent(null);
  };

  const renderCards = () => (
    <>
      <header className="wd-main-header">
        <h1>🌐 The Hidden Realities of Enterprise Workforces</h1>
      </header>

      <p className="wd-intro">
        Leaders rarely see the full picture. Managerial reports often lack
        accuracy, training budgets are spread too thin, and critical talent risks
        remain invisible until it's too late.
      </p>

      <div className="wd-cards-container">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="wd-card"
            onClick={() => handleCardClick(agent)}
          >
            <div className="wd-card-image">
              <img src={agent.image} alt={agent.title} />
            </div>
            <h2>
              {agent.title}
            </h2>
            <h3 className="wd-agent-subtitle">
              {agent.subtitle}
            </h3>
            <p>
              {agent.icon} {agent.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className={`wd-dashboard-container ${!isCardView ? "wd-sidebar-layout" : ""}`}>
      {isCardView ? (
        renderCards()
      ) : (
        <div className="wd-dashboard-layout">
          <aside className="wd-sidebar">
            <div className="wd-sidebar-header">
              <h2 className="wd-sidebar-title" onClick={toggleView}>
                AI Agents
              </h2>
            </div>
            <nav className="wd-sidebar-nav">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`wd-sidebar-item ${
                    selectedAgent?.id === agent.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedAgent(agent)}
                >
                  <span className="wd-agent-icon">{agent.icon}</span>
                  <div className="wd-agent-info">
                    <span className="wd-agent-name">{agent.title}</span>
                    <span className="wd-agent-role">{agent.subtitle}</span>
                  </div>
                </div>
              ))}
            </nav>
          </aside>

          <main className="wd-main-content">
            {selectedAgent?.component || renderCards()}
          </main>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
