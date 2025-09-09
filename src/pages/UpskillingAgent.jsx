import React, { useState, useMemo } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ScatterChart, Scatter, Cell
} from 'recharts';
import '../styles/UpskillingAgent.css';

const departments = ['Sales', 'Marketing', 'Technology', 'HR', 'Finance'];

const employeeData = {
  Sales: [
    { name: 'Alice Johnson', gap: 'Salesforce Einstein Analytics', keyStrength: 'Customer Relationship Building & Face-to-Face Meetings', numTasks: 2, training: 'Salesforce Einstein Analytics Bootcamp', impact: 'High', before: 73, after: 87, score: 89, completionRate: 67, skillLevel: 'Intermediate', timeToComplete: '4 weeks' },
    { name: 'Bob Martinez', gap: 'LinkedIn Sales Navigator Advanced Features', keyStrength: 'Cold Calling & Phone Prospecting', numTasks: 3, training: 'LinkedIn Sales Navigator Mastery', impact: 'Medium', before: 61, after: 78, score: 74, completionRate: 45, skillLevel: 'Beginner', timeToComplete: '3 weeks' },
    { name: 'Charlie Wong', gap: 'HubSpot Marketing Automation Integration', keyStrength: 'Technical Product Demos & Solution Architecture', numTasks: 1, training: 'HubSpot Sales & Marketing Alignment', impact: 'Medium', before: 79, after: 84, score: 83, completionRate: 89, skillLevel: 'Advanced', timeToComplete: '2 weeks' },
    { name: 'David Kumar', gap: 'Tableau Sales Dashboards', keyStrength: 'Strategic Account Planning & Executive Presentations', numTasks: 4, training: 'Sales Analytics with Tableau', impact: 'High', before: 84, after: 92, score: 91, completionRate: 78, skillLevel: 'Advanced', timeToComplete: '5 weeks' },
    { name: 'Eva Rodriguez', gap: 'Microsoft Dynamics 365 CRM', keyStrength: 'Team Leadership & Sales Process Design', numTasks: 3, training: 'Dynamics 365 Sales Platform', impact: 'High', before: 68, after: 85, score: 82, completionRate: 56, skillLevel: 'Intermediate', timeToComplete: '6 weeks' },
    { name: 'Frank Miller', gap: 'Zoom Video SDK Integration', keyStrength: 'Trade Show Networking & Event Management', numTasks: 2, training: 'Virtual Sales Platform Integration', impact: 'Low', before: 77, after: 81, score: 79, completionRate: 92, skillLevel: 'Intermediate', timeToComplete: '3 weeks' },
    { name: 'Grace Chen', gap: 'Gong Conversation Intelligence', keyStrength: 'Customer Success & Account Retention', numTasks: 5, training: 'AI Call Analytics with Gong', impact: 'High', before: 62, after: 79, score: 86, completionRate: 34, skillLevel: 'Intermediate', timeToComplete: '7 weeks' },
    { name: 'Henry Davis', gap: 'Power BI Sales Reports', keyStrength: 'Excel Data Analysis & Manual Reporting', numTasks: 1, training: 'Power BI for Sales Teams', impact: 'Medium', before: 86, after: 91, score: 88, completionRate: 95, skillLevel: 'Advanced', timeToComplete: '4 weeks' },
    { name: 'Iris Wang', gap: 'Outreach.io Automation', keyStrength: 'Cross-Cultural Communication & International Sales', numTasks: 2, training: 'Sales Sequence Automation', impact: 'Medium', before: 71, after: 83, score: 81, completionRate: 71, skillLevel: 'Intermediate', timeToComplete: '3 weeks' },
    { name: 'Jack Thompson', gap: 'LinkedIn Sales Navigator Advanced Features', keyStrength: 'Sales Training & Team Mentoring', numTasks: 3, training: 'LinkedIn Sales Navigator Mastery', impact: 'Low', before: 59, after: 72, score: 76, completionRate: 23, skillLevel: 'Beginner', timeToComplete: '3 weeks' }
  ],
  Marketing: [
    { name: 'Fiona Chen', gap: 'Adobe Experience Manager', keyStrength: 'Creative Design & Visual Content Creation', numTasks: 6, training: 'Adobe Experience Manager Platform', impact: 'High', before: 58, after: 79, score: 84, completionRate: 42, skillLevel: 'Intermediate', timeToComplete: '8 weeks' },
    { name: 'George Adams', gap: 'Google Analytics 4 Advanced', keyStrength: 'A/B Testing & Conversion Optimization', numTasks: 2, training: 'GA4 Advanced Analytics', impact: 'High', before: 72, after: 88, score: 87, completionRate: 83, skillLevel: 'Advanced', timeToComplete: '3 weeks' },
    { name: 'Hannah Davis', gap: 'Mailchimp Automation', keyStrength: 'Content Writing & Blog Management', numTasks: 3, training: 'Email Marketing Automation', impact: 'Medium', before: 65, after: 78, score: 81, completionRate: 67, skillLevel: 'Intermediate', timeToComplete: '4 weeks' },
    { name: 'Ian Thompson', gap: 'Facebook Ads Manager API', keyStrength: 'Google Ads Campaign Management', numTasks: 4, training: 'Facebook Advertising API', impact: 'Medium', before: 69, after: 82, score: 79, completionRate: 31, skillLevel: 'Intermediate', timeToComplete: '6 weeks' },
    { name: 'Jane Wilson', gap: 'Premiere Pro Video Editing', keyStrength: 'Photography & Visual Storytelling', numTasks: 1, training: 'Professional Video Production', impact: 'Low', before: 74, after: 79, score: 77, completionRate: 88, skillLevel: 'Intermediate', timeToComplete: '2 weeks' },
    { name: 'Kyle Rodriguez', gap: 'Google Analytics 4 Advanced', keyStrength: 'Excel Data Analysis & Reporting', numTasks: 2, training: 'GA4 Advanced Analytics', impact: 'Medium', before: 76, after: 84, score: 85, completionRate: 75, skillLevel: 'Intermediate', timeToComplete: '3 weeks' },
    { name: 'Lisa Park', gap: 'Instagram Business API', keyStrength: 'Community Management & Social Engagement', numTasks: 2, training: 'Instagram Business Advanced', impact: 'Medium', before: 67, after: 74, score: 78, completionRate: 54, skillLevel: 'Intermediate', timeToComplete: '3 weeks' },
    { name: 'Mike Garcia', gap: 'Unbounce Landing Pages', keyStrength: 'HTML/CSS Coding & Web Development', numTasks: 3, training: 'Landing Page Optimization', impact: 'High', before: 81, after: 89, score: 86, completionRate: 61, skillLevel: 'Advanced', timeToComplete: '4 weeks' },
    { name: 'Nancy Kim', gap: 'Asana Project Management', keyStrength: 'Cross-Functional Team Coordination', numTasks: 1, training: 'Project Management with Asana', impact: 'Low', before: 73, after: 77, score: 82, completionRate: 94, skillLevel: 'Intermediate', timeToComplete: '2 weeks' },
    { name: 'Oscar Lee', gap: 'Zapier Automation', keyStrength: 'Excel Process Documentation & Manual Workflows', numTasks: 5, training: 'Marketing Automation with Zapier', impact: 'High', before: 64, after: 81, score: 83, completionRate: 38, skillLevel: 'Intermediate', timeToComplete: '5 weeks' }
  ],
  Technology: [
    { name: 'Kevin Park', gap: 'Docker Compose Production', keyStrength: 'Linux Server Administration & Shell Scripting', numTasks: 3, training: 'Docker Production Deployment', impact: 'High', before: 82, after: 91, score: 93, completionRate: 73, skillLevel: 'Advanced', timeToComplete: '5 weeks' },
    { name: 'Laura Singh', gap: 'Spring Security Implementation', keyStrength: 'Java Enterprise Development & Database Design', numTasks: 4, training: 'Spring Security Framework', impact: 'High', before: 87, after: 94, score: 92, completionRate: 65, skillLevel: 'Expert', timeToComplete: '6 weeks' },
    { name: 'Mark Johnson', gap: 'GraphQL Schema Design', keyStrength: 'REST API Development & SQL Optimization', numTasks: 2, training: 'GraphQL API Development', impact: 'Medium', before: 71, after: 84, score: 86, completionRate: 81, skillLevel: 'Intermediate', timeToComplete: '4 weeks' },
    { name: 'Nina Patel', gap: 'Kubernetes Production Deployment', keyStrength: 'Python Data Science & Statistical Analysis', numTasks: 5, training: 'Kubernetes Container Orchestration', impact: 'High', before: 79, after: 88, score: 89, completionRate: 47, skillLevel: 'Advanced', timeToComplete: '8 weeks' },
    { name: 'Oscar Kim', gap: 'AWS IAM Security Policies', keyStrength: 'Network Security & Firewall Management', numTasks: 3, training: 'AWS Security & IAM', impact: 'Medium', before: 75, after: 86, score: 84, completionRate: 59, skillLevel: 'Intermediate', timeToComplete: '5 weeks' },
    { name: 'Paula Martinez', gap: 'Apache Kafka Streaming', keyStrength: 'SQL Database Optimization & ETL Design', numTasks: 4, training: 'Kafka Data Streaming', impact: 'High', before: 68, after: 82, score: 87, completionRate: 52, skillLevel: 'Intermediate', timeToComplete: '7 weeks' },
    { name: 'Quinn Taylor', gap: 'React Native Mobile Dev', keyStrength: 'React.js Web Development & JavaScript', numTasks: 2, training: 'React Native Development', impact: 'Medium', before: 76, after: 85, score: 83, completionRate: 74, skillLevel: 'Intermediate', timeToComplete: '4 weeks' },
    { name: 'Ryan Brooks', gap: 'Cypress Automated Testing', keyStrength: 'Manual QA Testing & Bug Documentation', numTasks: 3, training: 'Automated Testing with Cypress', impact: 'Medium', before: 64, after: 78, score: 81, completionRate: 36, skillLevel: 'Beginner', timeToComplete: '6 weeks' },
    { name: 'Sarah Wilson', gap: 'Figma Design Systems', keyStrength: 'User Experience Research & Wireframing', numTasks: 1, training: 'Advanced Design Systems', impact: 'High', before: 83, after: 89, score: 88, completionRate: 92, skillLevel: 'Advanced', timeToComplete: '3 weeks' },
    { name: 'Tom Anderson', gap: 'Terraform Infrastructure', keyStrength: 'AWS Manual Server Configuration & Cloud Architecture', numTasks: 6, training: 'Infrastructure as Code with Terraform', impact: 'High', before: 69, after: 85, score: 91, completionRate: 29, skillLevel: 'Intermediate', timeToComplete: '9 weeks' }
  ],
  HR: [
    { name: 'Olivia Brown', gap: 'BambooHR Analytics', keyStrength: 'Recruitment & Interview Process Management', numTasks: 2, training: 'HR Analytics with BambooHR', impact: 'Medium', before: 72, after: 84, score: 86, completionRate: 76, skillLevel: 'Intermediate', timeToComplete: '4 weeks' },
    { name: 'Paul Garcia', gap: 'Workday Performance Module', keyStrength: 'Employee Development & Performance Reviews', numTasks: 4, training: 'Workday Performance Management', impact: 'High', before: 66, after: 81, score: 79, completionRate: 43, skillLevel: 'Intermediate', timeToComplete: '7 weeks' },
    { name: 'Quinn Miller', gap: 'PayScale Compensation Software', keyStrength: 'Excel Payroll & Benefits Administration', numTasks: 3, training: 'Market Compensation with PayScale', impact: 'Medium', before: 71, after: 83, score: 82, completionRate: 68, skillLevel: 'Intermediate', timeToComplete: '5 weeks' },
    { name: 'Rachel Lee', gap: 'Microsoft Teams Admin', keyStrength: 'Office 365 User Support & Training', numTasks: 1, training: 'Teams Enterprise Administration', impact: 'Low', before: 78, after: 82, score: 80, completionRate: 87, skillLevel: 'Intermediate', timeToComplete: '3 weeks' },
    { name: 'Steve Wilson', gap: 'Zoom Webinar Platform', keyStrength: 'In-Person Training & Leadership Coaching', numTasks: 2, training: 'Virtual Training & Webinars', impact: 'Medium', before: 59, after: 74, score: 81, completionRate: 55, skillLevel: 'Beginner', timeToComplete: '4 weeks' },
    { name: 'Tina Rodriguez', gap: 'Culture Amp Survey Platform', keyStrength: 'Employee Engagement & Wellness Program Design', numTasks: 3, training: 'Employee Analytics with Culture Amp', impact: 'High', before: 67, after: 79, score: 83, completionRate: 41, skillLevel: 'Intermediate', timeToComplete: '6 weeks' },
    { name: 'Victor Chang', gap: 'Cornerstone LMS', keyStrength: 'Curriculum Development & Instructional Design', numTasks: 4, training: 'Learning Management Systems', impact: 'High', before: 63, after: 78, score: 85, completionRate: 52, skillLevel: 'Intermediate', timeToComplete: '8 weeks' },
    { name: 'Wendy Taylor', gap: 'Tableau HR Dashboards', keyStrength: 'Excel HR Reporting & Data Entry', numTasks: 5, training: 'HR Analytics with Tableau', impact: 'High', before: 54, after: 73, score: 82, completionRate: 31, skillLevel: 'Beginner', timeToComplete: '10 weeks' },
    { name: 'Xavier Davis', gap: 'ServiceNow HR Platform', keyStrength: 'Change Management & Communication Planning', numTasks: 3, training: 'HR Service Management', impact: 'Medium', before: 69, after: 81, score: 84, completionRate: 64, skillLevel: 'Intermediate', timeToComplete: '6 weeks' },
    { name: 'Yolanda Kim', gap: 'Slack Workflow Builder', keyStrength: 'Remote Team Management & Virtual Culture Building', numTasks: 1, training: 'Slack Advanced Automation', impact: 'Low', before: 75, after: 79, score: 81, completionRate: 89, skillLevel: 'Intermediate', timeToComplete: '2 weeks' }
  ],
  Finance: [
    { name: 'Tom Anderson', gap: 'Power BI Financial Modeling', keyStrength: 'Excel Financial Analysis & Manual Reporting', numTasks: 4, training: 'Financial Analytics with Power BI', impact: 'High', before: 78, after: 91, score: 88, completionRate: 62, skillLevel: 'Advanced', timeToComplete: '6 weeks' },
    { name: 'Uma Sharma', gap: 'QuickBooks Enterprise', keyStrength: 'Manual Bookkeeping & Journal Entry Processing', numTasks: 2, training: 'QuickBooks Enterprise Advanced', impact: 'Medium', before: 71, after: 82, score: 84, completionRate: 74, skillLevel: 'Intermediate', timeToComplete: '4 weeks' },
    { name: 'Victor Chang', gap: 'Python Financial Analysis', keyStrength: 'Excel VBA Programming & Macro Development', numTasks: 6, training: 'Python for Finance', impact: 'High', before: 65, after: 83, score: 87, completionRate: 35, skillLevel: 'Intermediate', timeToComplete: '8 weeks' },
    { name: 'Wendy Taylor', gap: 'SAP Business One', keyStrength: 'Audit Documentation & Risk Assessment', numTasks: 5, training: 'SAP Business One Finance', impact: 'High', before: 47, after: 69, score: 81, completionRate: 28, skillLevel: 'Beginner', timeToComplete: '12 weeks' },
    { name: 'Xander Brooks', gap: 'Bloomberg Terminal', keyStrength: 'Cash Flow Management & Banking Operations', numTasks: 3, training: 'Bloomberg Terminal Advanced', impact: 'Medium', before: 61, after: 76, score: 79, completionRate: 58, skillLevel: 'Intermediate', timeToComplete: '5 weeks' },
    { name: 'Yvonne Davis', gap: 'TaxAct Professional', keyStrength: 'Tax Research & Compliance Documentation', numTasks: 2, training: 'Advanced Tax Software', impact: 'Medium', before: 73, after: 84, score: 83, completionRate: 69, skillLevel: 'Intermediate', timeToComplete: '4 weeks' },
    { name: 'Zack Miller', gap: 'Morningstar Investment Platform', keyStrength: 'Excel Investment Tracking & Financial Research', numTasks: 4, training: 'Investment Analysis Platform', impact: 'High', before: 52, after: 71, score: 85, completionRate: 41, skillLevel: 'Beginner', timeToComplete: '9 weeks' },
    { name: 'Amy Rodriguez', gap: 'Adaptive Insights Budgeting', keyStrength: 'Excel Budget Planning & Cost Analysis', numTasks: 3, training: 'Cloud Budgeting Platform', impact: 'High', before: 68, after: 82, score: 84, completionRate: 56, skillLevel: 'Intermediate', timeToComplete: '7 weeks' },
    { name: 'Ben Wilson', gap: 'NetSuite Financial Reports', keyStrength: 'Manual Financial Statement Preparation', numTasks: 4, training: 'NetSuite Financial Management', impact: 'Medium', before: 59, after: 75, score: 82, completionRate: 44, skillLevel: 'Beginner', timeToComplete: '8 weeks' },
    { name: 'Cara Johnson', gap: 'Power BI Financial Modeling', keyStrength: 'Cost Accounting & Variance Analysis', numTasks: 4, training: 'Financial Analytics with Power BI', impact: 'Medium', before: 63, after: 78, score: 86, completionRate: 49, skillLevel: 'Intermediate', timeToComplete: '6 weeks' }
  ]
};

const useInterconnectedData = (selectedDept) => {
  return useMemo(() => {
    const deptEmployees = employeeData[selectedDept];

    const skillGaps = {};
    deptEmployees.forEach(emp => {
      const skillCategory = emp.gap.split(' ')[0];
      if (!skillGaps[skillCategory]) {
        skillGaps[skillCategory] = {
          employees: [],
          totalGap: 0,
          avgCurrent: 0,
          avgRequired: 0
        };
      }
      skillGaps[skillCategory].employees.push(emp);
      skillGaps[skillCategory].totalGap += (100 - emp.before);
    });

    const radarSkills = Object.entries(skillGaps)
      .slice(0, 5)
      .map(([skill, data]) => {
        const avgCurrent = Math.round(
          data.employees.reduce((sum, emp) => sum + emp.before, 0) / data.employees.length
        );
        const avgRequired = Math.min(95, avgCurrent + 25);

        return {
          skill: skill,
          current: avgCurrent,
          required: avgRequired
        };
      });

    const demandForecast = Object.entries(skillGaps)
      .slice(0, 3)
      .map(([skill, data]) => {
        const highImpactCount = data.employees.filter(emp => emp.impact === 'High').length;
        const demandScore = Math.round(
          (highImpactCount / deptEmployees.length) * 100 + 
          (data.totalGap / data.employees.length) * 0.5
        );
        const growthRate = Math.round(demandScore * 0.4);

        return {
          skill: `${skill} Solutions`,
          demand: Math.min(85, demandScore),
          growth: `+${growthRate}%`
        };
      });

    const skillGapIndex = Math.round(
      deptEmployees.reduce((sum, emp) => {
        const gapSize = (100 - emp.before) * (emp.impact === 'High' ? 1.5 : emp.impact === 'Medium' ? 1.0 : 0.5);
        return sum + gapSize;
      }, 0) / deptEmployees.length
    );

    const trainingEngagement = Math.round(
      deptEmployees.reduce((sum, emp) => sum + emp.completionRate, 0) / deptEmployees.length
    );

    const trainingROI = Math.round(
      deptEmployees.reduce((sum, emp) => sum + ((emp.after - emp.before) / emp.before * 100), 0) / deptEmployees.length
    );

    const futureSkillsDemand = Math.round(
      deptEmployees.filter(emp => emp.impact === 'High' && emp.score >= 85).length / deptEmployees.length * 100
    );

    const highPerformers = deptEmployees
      .filter(emp => emp.score >= 80)
      .map(emp => ({
        name: emp.name,
        department: selectedDept,
        productivity_score: Math.min(100, Math.round(emp.score * 1.1)),
        velocity: Math.round((emp.numTasks / parseInt(emp.timeToComplete.split(' ')[0])) * 10) / 10,
        score: emp.score,
        completionRate: emp.completionRate
      }))
      .sort((a, b) => b.productivity_score - a.productivity_score)
      .slice(0, 5);

    const scatterData = deptEmployees.map(emp => ({
      name: emp.name,
      skill_score: emp.score,
      task_completion_rate: emp.completionRate,
      productivity_score: Math.round(emp.score * 1.1),
      velocity: Math.round((emp.numTasks / parseInt(emp.timeToComplete.split(' ')[0])) * 10) / 10,
      impact: emp.impact
    }));

    const productivityScores = highPerformers.map(emp => emp.productivity_score).sort((a, b) => a - b);
    const calculateBoxPlotStats = (data) => {
      if (data.length === 0) return { q1: 0, median: 0, q3: 0, min: 0, max: 0, outliers: [] };
      const q1 = data[Math.floor(data.length * 0.25)];
      const median = data[Math.floor(data.length * 0.5)];
      const q3 = data[Math.floor(data.length * 0.75)];
      const iqr = q3 - q1;
      const lowerFence = q1 - 1.5 * iqr;
      const upperFence = q3 + 1.5 * iqr;
      const outliers = data.filter(val => val < lowerFence || val > upperFence);

      return { 
        q1, median, q3, 
        min: Math.max(Math.min(...data), lowerFence), 
        max: Math.min(Math.max(...data), upperFence), 
        outliers 
      };
    };
    const productivityStats = calculateBoxPlotStats(productivityScores);

    const avgImprovementRate = Math.round(
      deptEmployees.reduce((sum, emp) => sum + (emp.after - emp.before), 0) / deptEmployees.length
    );
    const highImpactTraining = deptEmployees.filter(emp => emp.impact === 'High').length;
    const avgCompletionTime = Math.round(
      deptEmployees.reduce((sum, emp) => {
        const weeks = parseInt(emp.timeToComplete.split(' ')[0]);
        return sum + weeks;
      }, 0) / deptEmployees.length
    );

    const generateAIInsights = () => {
      const insights = [];

      const commonGaps = Object.entries(skillGaps)
        .filter(([gap, data]) => data.employees.length >= 2)
        .sort((a, b) => b[1].employees.length - a[1].employees.length);

      if (commonGaps.length > 0) {
        const [topGap, data] = commonGaps[0];
        const avgCompletion = Math.round(
          data.employees.reduce((sum, emp) => sum + emp.completionRate, 0) / data.employees.length
        );
        insights.push({
          type: 'Skill Gap Alert',
          metric: `${data.employees.length} ${selectedDept} team members`,
          insight: `Low ${topGap} adoption`,
          recommendation: `Group training cohort`,
          timeline: `${avgCompletion < 50 ? '6-8' : '3-4'} weeks`,
          priority: data.employees.some(emp => emp.impact === 'High') ? 'High' : 'Medium'
        });
      }

      if (highPerformers.length > 0) {
        insights.push({
          type: 'High Potential',
          metric: `${highPerformers.length} employees`,
          insight: `>80% performance scores`,
          recommendation: `Leadership track candidates`,
          timeline: `Next review cycle`,
          priority: 'High'
        });
      }

      const lowCompletionRates = deptEmployees.filter(emp => emp.completionRate < 50);
      if (lowCompletionRates.length > 0) {
        insights.push({
          type: 'Training Fatigue',
          metric: `${lowCompletionRates.length} employees`,
          insight: `<50% completion rates`,
          recommendation: `Shorter modules needed`,
          timeline: `Immediate adjustment`,
          priority: 'Medium'
        });
      }

      const reskillCandidates = deptEmployees.filter(emp => 
        emp.skillLevel === 'Beginner' || emp.skillLevel === 'Intermediate'
      );
      if (reskillCandidates.length >= 3) {
        const potentialValue = reskillCandidates.length * 45000;
        insights.push({
          type: 'ROI Opportunity',
          metric: `${reskillCandidates.length} employees`,
          insight: `Reskilling potential`,
          recommendation: `$${Math.round(potentialValue/1000)}K annual value`,
          timeline: `3-6 months`,
          priority: 'High'
        });
      }

      return insights;
    };

    return {
      deptEmployees,
      skillGapIndex,
      trainingEngagement,
      trainingROI,
      futureSkillsDemand,
      radarSkills,
      demandForecast,
      scatterData,
      highPerformers,
      productivityStats,
      aiInsights: generateAIInsights(),
      avgImprovementRate,
      highImpactTraining,
      avgCompletionTime
    };
  }, [selectedDept]);
};

const UpskillingAgent = () => {
  const [selectedDept, setSelectedDept] = useState('Sales');

  const {
    deptEmployees,
    skillGapIndex,
    trainingEngagement,
    trainingROI,
    futureSkillsDemand,
    radarSkills,
    demandForecast,
    scatterData,
    highPerformers,
    productivityStats,
    aiInsights,
    avgImprovementRate,
    highImpactTraining,
    avgCompletionTime
  } = useInterconnectedData(selectedDept);

  const getScatterColor = (impact) => {
    switch(impact) {
      case 'High': return '#A855F7';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <div className="talent-container fade-in">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-main slide-up">
            <h1>Emily — Upskilling & Workforce Development</h1>
          </div>
          <div className="header-meta slide-down">
            <div className="filter-container">
              <label>Department:</label>
              <select 
                value={selectedDept} 
                onChange={(e) => setSelectedDept(e.target.value)}
                className="animated-select"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <div className="content-area">
          <section className="kpi-section">
            <h2 className="section-title slide-up">Real-Time Learning Intelligence</h2>
            <div className="minimal-metrics">
              <div className="metric-card hover-lift delay-100">
                <div className="metric-label">Skill Gap Urgency</div>
                <div className="metric-value">{skillGapIndex}%</div>
                <div className="metric-subtext">critical skills needed</div>
                <div className="metric-trend">Based on {deptEmployees.length} employees</div>
              </div>

              <div className="metric-card hover-lift delay-200">
                <div className="metric-label">Training Engagement</div>
                <div className="metric-value">{trainingEngagement}%</div>
                <div className="metric-subtext">program completion rate</div>
                <div className="metric-trend">Avg {avgCompletionTime} weeks duration</div>
              </div>

              <div className="metric-card hover-lift delay-300">
                <div className="metric-label">Performance Lift</div>
                <div className="metric-value">{trainingROI}%</div>
                <div className="metric-subtext">productivity improvement</div>
                <div className="metric-trend">{avgImprovementRate} pts avg gain</div>
              </div>

              <div className="metric-card hover-lift delay-400">
                <div className="metric-label">Future-Ready Talent</div>
                <div className="metric-value">{futureSkillsDemand}%</div>
                <div className="metric-subtext">high performers ready</div>
                <div className="metric-trend">{highImpactTraining} high-impact programs</div>
              </div>
            </div>
          </section>

          <section className="charts-section">
            <h2 className="section-title slide-up">Advanced Skills & Learning Analytics</h2>
            <div className="charts-grid">
              <div className="chart-item hover-scale delay-100">
                <div className="chart-header">
                  <h4>Critical Skills Gap Analysis</h4>
                  <span className="chart-subtitle">Real Team Data: Current vs Required Levels</span>
                </div>
                <div className="chart-container fade-in-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={radarSkills}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar name="Current Level" dataKey="current" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                      <Radar name="Required Level" dataKey="required" stroke="#A855F7" fill="#A855F7" fillOpacity={0.3} />
                      <Legend />
                      <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-item hover-scale delay-200">
                <div className="chart-header">
                  <h4>Skill Score vs Task Completion Rate</h4>
                  <span className="chart-subtitle">Individual Performance Distribution</span>
                </div>
                <div className="chart-container fade-in-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <ScatterChart data={scatterData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis 
                        type="number"
                        dataKey="skill_score" 
                        stroke="#6B7280" 
                        fontSize={12} 
                        tickLine={false}
                        axisLine={false}
                        domain={[60, 95]}
                        ticks={[60, 65, 70, 75, 80, 85, 90, 95]}
                        label={{ 
                          value: 'Skill Score (%)', 
                          position: 'insideBottom', 
                          offset: -5,
                          style: { textAnchor: 'middle' }
                        }}
                      />
                      <YAxis 
                        type="number"
                        dataKey="task_completion_rate" 
                        stroke="#6B7280" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                        domain={[20, 100]}
                        ticks={[20, 30, 40, 50, 60, 70, 80, 90, 100]}
                        label={{ 
                          value: 'Task Completion Rate (%)', 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { textAnchor: 'middle' }
                        }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          padding: '12px'
                        }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="custom-tooltip">
                                <p className="tooltip-title" style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1F2937' }}>
                                  {data.name}
                                </p>
                                <p style={{ color: '#6B7280', margin: '4px 0' }}>
                                  <span style={{ color: '#A855F7' }}>●</span> Skill Score: {data.skill_score}%
                                </p>
                                <p style={{ color: '#6B7280', margin: '4px 0' }}>
                                  <span style={{ color: '#F59E0B' }}>●</span> Completion Rate: {data.task_completion_rate}%
                                </p>
                                <p style={{ color: '#6B7280', margin: '4px 0' }}>
                                  <span style={{ color: '#10B981' }}>●</span> Impact Level: {data.impact}
                                </p>
                                <p style={{ color: '#6B7280', margin: '4px 0', fontSize: '12px' }}>
                                  Productivity Score: {data.productivity_score}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Scatter dataKey="task_completion_rate" name="Employees">
                        {scatterData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getScatterColor(entry.impact)} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-item hover-scale delay-300">
                <div className="chart-header">
                  <h4>High Performer Analysis</h4>
                  <span className="chart-subtitle">Top 5 Leadership Pipeline Candidates</span>
                </div>
                <div className="chart-container fade-in-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={highPerformers}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#6B7280" 
                        fontSize={10} 
                        tickLine={false}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tickFormatter={(value) => {
                          const nameParts = value.split(' ');
                          return nameParts.length >= 2 ? `${nameParts[0]} ${nameParts[1][0]}.` : value;
                        }}
                      />
                      <YAxis 
                        stroke="#6B7280" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                        domain={[80, 100]}
                        ticks={[80, 85, 90, 95, 100]}
                        label={{ value: 'Productivity Score', angle: -90, position: 'Left', dx: -20 }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value) => [`${value}`, 'Productivity Score']}
                        labelFormatter={(label) => `Employee: ${label}`}
                      />
                      <Bar dataKey="productivity_score" radius={[4, 4, 0, 0]}>
                        {highPerformers.map((entry, index) => {
                          const isTopPerformer = index < 5;
                          return (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={isTopPerformer ? '#8B5CF6' : '#A855F7'} 
                            />
                          );
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-item hover-scale delay-400">
                <div className="chart-header">
                  <h4>Skills Demand Forecast</h4>
                  <span className="chart-subtitle">Based on Current Gap Analysis</span>
                </div>
                <div className="chart-container fade-in-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={demandForecast}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis 
                        dataKey="skill" 
                        stroke="#6B7280" 
                        fontSize={10} 
                        tickLine={false}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value, name, props) => [
                          `${value}% demand`,
                          `${props.payload.growth} projected growth`
                        ]}
                      />
                      <Bar dataKey="demand" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="ai-sidebar">
          <section className="ai-insights-section">
            <h2 className="section-title slide-up">Emily's Strategic Intelligence Hub</h2>

            <div className="unified-ai-content">
              <div className="ai-insights-card">
                <div className="insight-section">
                  <h3>⚡ Live AI Insights</h3>
                  <p>Data-driven recommendations from your team's performance</p>
                  <div className="ai-insights-points">
                    {aiInsights.map((insight, idx) => {
                      let summary = '';
                      if (insight.type === 'Skill Gap Alert') {
                        summary = `${insight.metric} need ${insight.insight.split(' ')[1]} skills → ${insight.timeline} cohort training`;
                      } else if (insight.type === 'High Potential') {
                        summary = `${insight.metric} show leadership potential → Fast-track development`;
                      } else if (insight.type === 'Training Fatigue') {
                        summary = `${insight.metric} struggling with completion → ${insight.recommendation}`;
                      } else if (insight.type === 'ROI Opportunity') {
                        summary = `${insight.recommendation} potential → Immediate reskilling focus`;
                      }
                      return <p key={idx} className="ai-insight-point">{summary}</p>;
                    })}
                  </div>
                </div>

                <div className="insight-section">
                  <h3>Department Performance</h3>
                  <p>Real-time metrics from your {selectedDept} team</p>
                  <div className="insight-metrics">
                    <div className="metric">
                      <span className="metric-value">{highImpactTraining}</span>
                      <span className="metric-label">High-Impact Programs</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">{avgImprovementRate}</span>
                      <span className="metric-label">Avg Skill Points Gained</span>
                    </div>
                  </div>
                  <div className="performance-breakdown">
                    <div className="perf-item">Team Completion: {trainingEngagement}%</div>
                    <div className="perf-item">Avg Training: {avgCompletionTime} weeks</div>
                    <div className="perf-item">ROI Generated: ${Math.round(trainingROI * 15000).toLocaleString()}</div>
                  </div>
                </div>

                <div className="insight-section">
                  <h3>Leadership Pipeline</h3>
                  <p>High-performers ready for advancement</p>
                  <div className="leaders-summary">
                    <div className="metric">
                      <span className="metric-value">{highPerformers.length}</span>
                      <span className="metric-label">Leadership Ready</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">{productivityStats.median || 0}</span>
                      <span className="metric-label">Median Productivity</span>
                    </div>
                  </div>
                  <div className="top-performers">
                    {highPerformers.slice(0, 3).map((performer, idx) => (
                      <div key={idx} className="performer-item">
                        <span className="performer-name">
                          {performer.name.split(' ')[0]} {performer.name.split(' ')[1]?.[0]}.
                        </span>
                        <span className="performer-score">{performer.productivity_score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <section className="table-section">
        <h2 className="section-title slide-up">Skills Development Tracking</h2>

        <div className="table-container fade-in-table">
          <div className="table-wrapper">
            <h3 className="table-title">Current Skills Development - {selectedDept} Department </h3>
            <table className="minimal-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Critical Skill Gap</th>
                  <th>Key Strength</th>
                  <th>Tasks Assigned</th>
                  <th>Completion Rate</th>
                  <th>Skill Level</th>
                  <th>Recommended Training</th>
                </tr>
              </thead>
              <tbody>
                {deptEmployees.map((item, index) => (
                  <tr key={index} className="table-row-hover" style={{animationDelay: `${index * 0.1}s`}}>
                    <td>
                      <div className="employee-info">
                        <div className="employee-details">
                          <span className="employee-name">{item.name}</span>
                          <small className="employee-score">Score: {item.score}%</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="gap-area tech-gap">{item.gap}</span>
                    </td>
                    <td>
                      <span className="strength-area human-strength">{item.keyStrength}</span>
                    </td>
                    <td>
                      <div className="tasks-container">
                        <span className="tasks-count">{item.numTasks} task{item.numTasks > 1 ? 's' : ''}</span>
                      </div>
                    </td>
                    <td>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{width: `${item.completionRate}%`}}
                          ></div>
                        </div>
                        <span className="progress-text">{item.completionRate}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`skill-level-badge ${item.skillLevel.toLowerCase()}`}>
                        {item.skillLevel}
                      </span>
                    </td>
                    <td className="training-cell">
                      <div className="training-info">
                        <span className="training-name targeted-training">{item.training}</span>
                        <span> - </span>
                        <span className="training-duration">{item.timeToComplete}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpskillingAgent;
