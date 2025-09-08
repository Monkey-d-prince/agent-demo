import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import '../styles/TalentPlanningAgent.css';

const departments = ['Sales', 'Marketing', 'Technology', 'HR', 'Finance'];

const heatmapData = {
  Sales: {
    teams: ['Enterprise Sales', 'SMB Sales', 'Inside Sales', 'Sales Operations'],
    projects: ['Q4 Pipeline', 'Lead Generation', 'Client Retention', 'Territory Expansion'],
    workloadMatrix: [
      [85, 92, 78, 88],
      [76, 88, 95, 82],
      [65, 72, 85, 78],
      [88, 76, 92, 85]
    ]
  },
  Marketing: {
    teams: ['Content Marketing', 'Digital Marketing', 'Brand Marketing', 'Marketing Operations'],
    projects: ['Campaign Beta', 'Content Strategy', 'Brand Refresh', 'Analytics Dashboard'],
    workloadMatrix: [
      [98, 88, 76, 82],
      [82, 92, 78, 88],
      [68, 75, 85, 72],
      [78, 85, 88, 92]
    ]
  },
  Technology: {
    teams: ['Frontend Dev', 'Backend Dev', 'DevOps', 'QA Testing'],
    projects: ['Mobile App', 'API Platform', 'Cloud Migration', 'Security Audit'],
    workloadMatrix: [
      [72, 68, 85, 78],
      [88, 92, 76, 82],
      [65, 78, 95, 88],
      [58, 62, 68, 72]
    ]
  },
  HR: {
    teams: ['Recruitment', 'HR Operations', 'Learning & Development', 'Compensation & Benefits'],
    projects: ['Hiring Drive Q4', 'Policy Updates', 'Training Programs', 'Benefits Review'],
    workloadMatrix: [
      [88, 82, 76, 72],
      [78, 95, 88, 85],
      [68, 72, 92, 78],
      [75, 78, 82, 88]
    ]
  },
  Finance: {
    teams: ['Accounting', 'Financial Planning', 'Treasury', 'Tax & Compliance'],
    projects: ['Month-end Close', 'Budget Planning', 'Cash Management', 'Audit Preparation'],
    workloadMatrix: [
      [95, 88, 82, 92],
      [78, 95, 72, 85],
      [68, 75, 88, 78],
      [88, 82, 78, 98]
    ]
  }
};

const employeeData = {
  Sales: [
    { name: 'Alice Johnson', activeHours: 7.2, idleHours: 1.8, wellbeing: 78, attritionRisk: 'Low', breakTime: 40, productive: 78, recommendation: 'Maintain current workload, monitor for task variety' },
    { name: 'Bob Martinez', activeHours: 8.5, idleHours: 0.5, wellbeing: 45, attritionRisk: 'High', breakTime: 25, productive: 72, recommendation: 'Immediate workload reduction and wellness intervention required' },
    { name: 'Charlie Wong', activeHours: 6.2, idleHours: 2.8, wellbeing: 82, attritionRisk: 'Medium', breakTime: 60, productive: 85, recommendation: 'Increase project allocation and engagement activities' },
    { name: 'David Kumar', activeHours: 7.8, idleHours: 1.2, wellbeing: 85, attritionRisk: 'Low', breakTime: 45, productive: 88, recommendation: 'Excellent balance, consider for mentorship roles' },
    { name: 'Eva Rodriguez', activeHours: 8.2, idleHours: 0.8, wellbeing: 52, attritionRisk: 'High', breakTime: 30, productive: 75, recommendation: 'Redistribute 25% of workload, implement stress management' },
    { name: 'Frank Miller', activeHours: 7.5, idleHours: 1.5, wellbeing: 76, attritionRisk: 'Low', breakTime: 42, productive: 82, recommendation: 'Continue current performance with regular check-ins' },
    { name: 'Grace Chen', activeHours: 8.8, idleHours: 0.2, wellbeing: 48, attritionRisk: 'Critical', breakTime: 22, productive: 70, recommendation: 'Urgent intervention required - reduce workload immediately' },
    { name: 'Henry Davis', activeHours: 6.8, idleHours: 2.2, wellbeing: 88, attritionRisk: 'Low', breakTime: 55, productive: 92, recommendation: 'High performer, consider for advanced projects' },
    { name: 'Iris Wang', activeHours: 7.9, idleHours: 1.1, wellbeing: 71, attritionRisk: 'Medium', breakTime: 38, productive: 84, recommendation: 'Monitor workload balance and provide career development' },
    { name: 'Jack Thompson', activeHours: 7.1, idleHours: 1.9, wellbeing: 79, attritionRisk: 'Low', breakTime: 48, productive: 86, recommendation: 'Stable performance, maintain current assignments' }
  ],
  Marketing: [
    { name: 'Fiona Chen', activeHours: 8.9, idleHours: 0.1, wellbeing: 38, attritionRisk: 'Critical', breakTime: 25, productive: 65, recommendation: 'Emergency intervention - reduce workload by 40% and provide wellness support' },
    { name: 'George Adams', activeHours: 8.2, idleHours: 0.8, wellbeing: 65, attritionRisk: 'Medium', breakTime: 40, productive: 78, recommendation: 'Monitor stress levels during campaign launches' },
    { name: 'Hannah Davis', activeHours: 6.8, idleHours: 2.2, wellbeing: 78, attritionRisk: 'Low', breakTime: 50, productive: 82, recommendation: 'Assign strategic campaign leadership roles' },
    { name: 'Ian Thompson', activeHours: 9.2, idleHours: 0.0, wellbeing: 42, attritionRisk: 'Critical', breakTime: 20, productive: 68, recommendation: 'Immediate workload redistribution and mandatory wellness program' },
    { name: 'Jane Wilson', activeHours: 7.9, idleHours: 1.1, wellbeing: 68, attritionRisk: 'Medium', breakTime: 45, productive: 85, recommendation: 'Implement flexible work arrangements and regular check-ins' },
    { name: 'Kyle Rodriguez', activeHours: 7.2, idleHours: 1.8, wellbeing: 72, attritionRisk: 'Low', breakTime: 42, productive: 80, recommendation: 'Maintain creative projects with moderate workload' },
    { name: 'Lisa Park', activeHours: 8.5, idleHours: 0.5, wellbeing: 55, attritionRisk: 'High', breakTime: 32, productive: 71, recommendation: 'Reduce campaign deadlines pressure and provide support' },
    { name: 'Mike Garcia', activeHours: 6.9, idleHours: 2.1, wellbeing: 75, attritionRisk: 'Medium', breakTime: 48, productive: 88, recommendation: 'Increase responsibilities in brand strategy' },
    { name: 'Nancy Kim', activeHours: 8.1, idleHours: 0.9, wellbeing: 62, attritionRisk: 'Medium', breakTime: 38, productive: 76, recommendation: 'Balance analytics work with creative tasks' },
    { name: 'Oscar Lee', activeHours: 7.6, idleHours: 1.4, wellbeing: 69, attritionRisk: 'Low', breakTime: 44, productive: 83, recommendation: 'Continue digital marketing focus with team collaboration' }
  ],
  Technology: [
    { name: 'Kevin Park', activeHours: 6.8, idleHours: 2.2, wellbeing: 88, attritionRisk: 'Low', breakTime: 60, productive: 92, recommendation: 'Assign high-impact innovation projects and technical leadership' },
    { name: 'Laura Singh', activeHours: 7.5, idleHours: 1.5, wellbeing: 92, attritionRisk: 'Low', breakTime: 50, productive: 95, recommendation: 'Excellent performance, continue skill development in emerging tech' },
    { name: 'Mark Johnson', activeHours: 7.2, idleHours: 1.8, wellbeing: 78, attritionRisk: 'Medium', breakTime: 55, productive: 85, recommendation: 'Assess career goals and provide growth path clarity' },
    { name: 'Nina Patel', activeHours: 6.5, idleHours: 2.5, wellbeing: 85, attritionRisk: 'Low', breakTime: 65, productive: 89, recommendation: 'Lead cross-functional projects and mentoring initiatives' },
    { name: 'Oscar Kim', activeHours: 7.0, idleHours: 2.0, wellbeing: 82, attritionRisk: 'Medium', breakTime: 58, productive: 87, recommendation: 'Pair with senior developer for advanced skill development' },
    { name: 'Paula Martinez', activeHours: 7.8, idleHours: 1.2, wellbeing: 89, attritionRisk: 'Low', breakTime: 52, productive: 93, recommendation: 'Continue backend architecture leadership role' },
    { name: 'Quinn Taylor', activeHours: 6.9, idleHours: 2.1, wellbeing: 81, attritionRisk: 'Low', breakTime: 58, productive: 88, recommendation: 'Focus on DevOps automation and cloud infrastructure' },
    { name: 'Ryan Brooks', activeHours: 7.3, idleHours: 1.7, wellbeing: 86, attritionRisk: 'Low', breakTime: 54, productive: 91, recommendation: 'Lead QA testing standards and automation initiatives' },
    { name: 'Sarah Wilson', activeHours: 6.7, idleHours: 2.3, wellbeing: 84, attritionRisk: 'Low', breakTime: 62, productive: 90, recommendation: 'Frontend development mentorship and UI/UX collaboration' },
    { name: 'Tom Anderson', activeHours: 7.4, idleHours: 1.6, wellbeing: 87, attritionRisk: 'Low', breakTime: 56, productive: 94, recommendation: 'Security audit leadership and best practices development' }
  ],
  HR: [
    { name: 'Olivia Brown', activeHours: 7.8, idleHours: 1.2, wellbeing: 82, attritionRisk: 'Low', breakTime: 45, productive: 85, recommendation: 'Continue strategic HR initiatives with growth opportunities' },
    { name: 'Paul Garcia', activeHours: 8.5, idleHours: 0.5, wellbeing: 58, attritionRisk: 'High', breakTime: 35, productive: 72, recommendation: 'Delegate recruitment tasks and implement workload management' },
    { name: 'Quinn Miller', activeHours: 6.8, idleHours: 2.2, wellbeing: 78, attritionRisk: 'Medium', breakTime: 55, productive: 82, recommendation: 'Assign strategic policy development and compliance projects' },
    { name: 'Rachel Lee', activeHours: 7.5, idleHours: 1.5, wellbeing: 72, attritionRisk: 'Medium', breakTime: 50, productive: 79, recommendation: 'Implement wellness programs and regular team check-ins' },
    { name: 'Steve Wilson', activeHours: 7.2, idleHours: 1.8, wellbeing: 85, attritionRisk: 'Low', breakTime: 52, productive: 87, recommendation: 'Lead employee development and training program expansion' },
    { name: 'Tina Rodriguez', activeHours: 7.9, idleHours: 1.1, wellbeing: 74, attritionRisk: 'Medium', breakTime: 48, productive: 81, recommendation: 'Focus on compensation analysis and benefits optimization' },
    { name: 'Victor Chang', activeHours: 6.9, idleHours: 2.1, wellbeing: 79, attritionRisk: 'Low', breakTime: 58, productive: 84, recommendation: 'Learning and development program leadership' },
    { name: 'Wendy Taylor', activeHours: 8.1, idleHours: 0.9, wellbeing: 66, attritionRisk: 'High', breakTime: 42, productive: 75, recommendation: 'Reduce interview load and focus on strategic planning' },
    { name: 'Xavier Davis', activeHours: 7.6, idleHours: 1.4, wellbeing: 80, attritionRisk: 'Low', breakTime: 46, productive: 86, recommendation: 'HR operations efficiency and process improvement' },
    { name: 'Yolanda Kim', activeHours: 7.3, idleHours: 1.7, wellbeing: 76, attritionRisk: 'Low', breakTime: 51, productive: 83, recommendation: 'Employee engagement initiatives and culture development' }
  ],
  Finance: [
    { name: 'Tom Anderson', activeHours: 8.9, idleHours: 0.1, wellbeing: 45, attritionRisk: 'Critical', breakTime: 25, productive: 88, recommendation: 'Urgent hiring of 2 senior analysts and workload redistribution' },
    { name: 'Uma Sharma', activeHours: 8.2, idleHours: 0.8, wellbeing: 68, attritionRisk: 'Medium', breakTime: 35, productive: 85, recommendation: 'Monitor closely during month-end and quarter-end periods' },
    { name: 'Victor Chang', activeHours: 7.2, idleHours: 1.8, wellbeing: 82, attritionRisk: 'Low', breakTime: 45, productive: 92, recommendation: 'Assign complex financial modeling and strategic analysis' },
    { name: 'Wendy Taylor', activeHours: 8.8, idleHours: 0.2, wellbeing: 52, attritionRisk: 'High', breakTime: 28, productive: 82, recommendation: 'Implement audit task automation and reduce overtime hours' },
    { name: 'Xander Brooks', activeHours: 8.0, idleHours: 1.0, wellbeing: 72, attritionRisk: 'Medium', breakTime: 38, productive: 87, recommendation: 'Regular workload assessment and task prioritization training' },
    { name: 'Yvonne Davis', activeHours: 7.8, idleHours: 1.2, wellbeing: 69, attritionRisk: 'Medium', breakTime: 40, productive: 84, recommendation: 'Treasury management focus with reasonable work hours' },
    { name: 'Zack Miller', activeHours: 8.4, idleHours: 0.6, wellbeing: 58, attritionRisk: 'High', breakTime: 32, productive: 79, recommendation: 'Tax compliance workload distribution and stress management' },
    { name: 'Amy Rodriguez', activeHours: 7.5, idleHours: 1.5, wellbeing: 74, attritionRisk: 'Low', breakTime: 42, productive: 89, recommendation: 'Financial planning projects with balanced schedule' },
    { name: 'Ben Wilson', activeHours: 8.1, idleHours: 0.9, wellbeing: 61, attritionRisk: 'Medium', breakTime: 36, productive: 83, recommendation: 'Accounting process improvement with adequate rest periods' },
    { name: 'Cara Johnson', activeHours: 7.9, idleHours: 1.1, wellbeing: 66, attritionRisk: 'Medium', breakTime: 39, productive: 86, recommendation: 'Budget planning leadership with wellness monitoring' }
  ]
};

// Function to calculate all metrics from exactly 10 employees
const calculateDepartmentMetrics = (employees) => {
  const totalEmployees = 10;
  
  const avgWellbeing = Math.round(employees.reduce((sum, emp) => sum + emp.wellbeing, 0) / totalEmployees);
  const avgProductivity = Math.round(employees.reduce((sum, emp) => sum + emp.productive, 0) / totalEmployees);
  const avgActiveHours = employees.reduce((sum, emp) => sum + emp.activeHours, 0) / totalEmployees;
  const avgIdleHours = employees.reduce((sum, emp) => sum + emp.idleHours, 0) / totalEmployees;
  const avgBreakTime = Math.round(employees.reduce((sum, emp) => sum + emp.breakTime, 0) / totalEmployees);
  
  const avgOnlineHours = avgActiveHours + avgIdleHours;
  const attendance = Math.round((avgOnlineHours / 9) * 100);
  
  // Calculate activity level based on active hours (out of 9 hour workday)
  const activity = Math.round((avgActiveHours / 9) * 100);
  
  const highRiskCount = employees.filter(emp => emp.attritionRisk === 'Critical' || emp.attritionRisk === 'High').length;
  const attritionRisk = Math.round((highRiskCount / totalEmployees) * 100);
  
  const burnoutTrend = [];
  for (let i = 0; i < 9; i++) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    const employeeIndex = i % totalEmployees;
    const baseWellbeing = employees[employeeIndex].wellbeing;
    const baseBreakTime = employees[employeeIndex].breakTime;
    const wellbeingVariation = baseWellbeing + (Math.random() * 10 - 5);
    const burnoutLevel = Math.max(5, Math.min(35, 100 - wellbeingVariation));
    const breakTimeVariation = baseBreakTime + (Math.random() * 10 - 5);
    
    burnoutTrend.push({
      month: months[i],
      wellbeing: Math.round(Math.max(35, Math.min(95, wellbeingVariation))),
      burnout: Math.round(burnoutLevel),
      breakTime: Math.round(Math.max(20, Math.min(70, breakTimeVariation)))
    });
  }
  
  const attendanceData = [];
  for (let i = 1; i <= 4; i++) {
    const baseOnTime = Math.max(7, Math.min(10, Math.round(attendance * 0.1)));
    const onTime = baseOnTime;
    const late = Math.max(0, Math.min(3, Math.round((10 - baseOnTime) * 0.7)));
    const absent = Math.max(0, 10 - onTime - late);
    
    attendanceData.push({
      period: `Week ${i}`,
      onTime: onTime,
      late: late,
      absent: absent
    });
  }
  
  const totalProductiveTime = employees.reduce((sum, emp) => sum + (emp.productive * emp.activeHours), 0);
  const totalActiveTime = employees.reduce((sum, emp) => sum + emp.activeHours, 0);
  const totalBreakTime = employees.reduce((sum, emp) => sum + emp.breakTime, 0);
  
  const productiveTimePercent = Math.round((totalProductiveTime / (totalActiveTime * 100)) * 100);
  const neutralTimePercent = Math.round(((totalActiveTime - (totalProductiveTime / 100)) / totalActiveTime) * 40);
  const unproductiveTimePercent = Math.round(((totalActiveTime - (totalProductiveTime / 100)) / totalActiveTime) * 30);
  const breakTimePercent = Math.round((totalBreakTime / (totalEmployees * 60)) * 20);
  
  const timeDistribution = [
    { name: 'Productive Time', value: Math.max(30, productiveTimePercent), fill: '#A855F7' },
    { name: 'Neutral Time', value: Math.max(10, neutralTimePercent), fill: '#C084FC' },
    { name: 'Unproductive Time', value: Math.max(5, unproductiveTimePercent), fill: '#EF4444' },
    { name: 'Break Time', value: Math.max(5, breakTimePercent), fill: '#F59E0B' }
  ];
  
  const total = timeDistribution.reduce((sum, item) => sum + item.value, 0);
  timeDistribution.forEach(item => {
    item.value = Math.round((item.value / total) * 100);
  });
  
  const hiringBaseline = 10;
  const attritionMultiplier = 1 + (attritionRisk / 100);
  
  const funnel = {
    resumes: Math.round(hiringBaseline * attritionMultiplier * 8),
    offers: Math.round(hiringBaseline * attritionMultiplier * 3),
    hires: Math.round(hiringBaseline * attritionMultiplier)
  };
  
  return {
    realtimeMetrics: {
      attendance: `${attendance}%`,
      activity: `${activity}%`,
      attritionRisk: `${attritionRisk}%`,
      wellbeingScore: `${avgWellbeing}/100`
    },
    burnoutTrend,
    attendanceData,
    timeDistribution,
    funnel,
    employees
  };
};

const initialData = {};
Object.keys(employeeData).forEach(dept => {
  initialData[dept] = calculateDepartmentMetrics(employeeData[dept]);
});

const TalentPlanningAgent = () => {
  const [selectedDept, setSelectedDept] = useState('Sales');
  const data = initialData[selectedDept];

  const COLORS = ['#A855F7', '#C084FC', '#EF4444', '#F59E0B'];

  const getWorkloadLevel = (workload) => {
    if (workload <= 75) return 'safe';
    if (workload <= 85) return 'balanced';
    if (workload <= 95) return 'high';
    return 'critical';
  };

  const getRiskLevel = (risk) => {
    switch(risk.toLowerCase()) {
      case 'critical': return 'critical';
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'medium';
    }
  };

  // Helper function to calculate individual employee activity
  const calculateEmployeeActivity = (activeHours) => {
    return Math.round((activeHours / 9) * 100);
  };

  const funnelData = [
    { name: 'Resumes Screened', value: data.funnel.resumes, fill: '#A855F7' },
    { name: 'Offers Made', value: data.funnel.offers, fill: '#C084FC' },
    { name: 'Hires Completed', value: data.funnel.hires, fill: '#DDD6FE' }
  ];

  return (
    <div className="talent-container fade-in">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-main slide-up">
            <h1>Ethan — Talent & Workforce Planning</h1>
            <p className="header-subtitle">AI-Powered Workforce Intelligence & Analytics Dashboard</p>
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
            <h2 className="section-title slide-up">📊 Real-Time Workforce Metrics</h2>
            <div className="minimal-metrics">
              <div className="metric-card hover-lift delay-100">
                <div className="metric-label">Attendance</div>
                <div className="metric-value">{data.realtimeMetrics.attendance}</div>
              </div>
              
              <div className="metric-card hover-lift delay-200">
                <div className="metric-label">Activity</div>
                <div className="metric-value">{data.realtimeMetrics.activity}</div>
              </div>
              
              <div className="metric-card hover-lift delay-300">
                <div className="metric-label">Attrition Risk</div>
                <div className="metric-value critical">{data.realtimeMetrics.attritionRisk}</div>
              </div>
              
              <div className="metric-card hover-lift delay-400">
                <div className="metric-label">Well-being Score</div>
                <div className="metric-value">{data.realtimeMetrics.wellbeingScore}</div>
              </div>
            </div>
          </section>

          <section className="charts-section">
            <h2 className="section-title slide-up">📈 Advanced Analytics & Insights</h2>
            <div className="charts-grid">
              <div className="chart-item hover-scale delay-100">
                <div className="chart-header">
                  <h4>Well-being & Burnout Trends</h4>
                </div>
                <div className="chart-container fade-in-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={data.burnoutTrend}>
                      <defs>
                        <linearGradient id="wellbeingGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#A855F7" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#A855F7" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="burnoutGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#6B7280" 
                        fontSize={12}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="#6B7280" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="wellbeing" 
                        stroke="#A855F7" 
                        fillOpacity={1}
                        fill="url(#wellbeingGradient)"
                        name="Well-being Score"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="burnout" 
                        stroke="#EF4444" 
                        fillOpacity={1}
                        fill="url(#burnoutGradient)"
                        name="Burnout Risk"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-item hover-scale delay-200">
                <div className="chart-header">
                  <h4>Attendance Patterns</h4>
                </div>
                <div className="chart-container fade-in-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data.attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis 
                        dataKey="period" 
                        stroke="#6B7280" 
                        fontSize={12}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={[0, 10]}
                        stroke="#6B7280" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value, name) => [`${value}/10 employees`, name]}
                      />
                      <Bar 
                        dataKey="onTime" 
                        fill="#A855F7"
                        radius={[4, 4, 0, 0]}
                        name="On Time"
                      />
                      <Bar 
                        dataKey="late" 
                        fill="#C084FC"
                        radius={[4, 4, 0, 0]}
                        name="Late Arrivals"
                      />
                      <Bar 
                        dataKey="absent" 
                        fill="#EF4444"
                        radius={[4, 4, 0, 0]}
                        name="Absences"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-item hover-scale delay-300">
                <div className="chart-header">
                  <h4>Hiring Funnel Performance</h4>
                </div>
                <div className="chart-container fade-in-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={funnelData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {funnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-item hover-scale delay-400">
                <div className="chart-header">
                  <h4>Time Distribution Analysis</h4>
                </div>
                <div className="chart-container fade-in-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={data.timeDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {data.timeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Time Spent']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="ai-sidebar">
          <section className="ai-insights-section">
            <h2 className="section-title slide-up">🤖 Ethan's AI-Powered Insights</h2>
            
            <div className="unified-ai-content">
              <div className="ai-insights-card">
                <div className="insight-section">
                  <h3>Smart Recommendations</h3>
                  <div className="insight-metrics">
                    <div className="metric">
                      <span className="metric-value">
                        {data.employees.filter(e => e.attritionRisk === 'Critical' || e.attritionRisk === 'High').length}/10
                      </span>
                      <span className="metric-label">High Risk Employees</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">
                        {Math.round(data.employees.reduce((acc, emp) => acc + emp.wellbeing, 0) / 10)}
                      </span>
                      <span className="metric-label">Avg Well-being</span>
                    </div>
                  </div>
                </div>

                <div className="insight-section">
                  <h3>Critical Alerts</h3>
                  <div className="insight-metrics">
                    <div className="metric">
                      <span className="metric-value high-risk">
                        {data.employees.filter(e => e.wellbeing < 50).length}/10
                      </span>
                      <span className="metric-label">Low Well-being</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">
                        {data.employees.filter(e => e.activeHours > 8.5).length}/10
                      </span>
                      <span className="metric-label">Overworked Staff</span>
                    </div>
                  </div>
                </div>

                <div className="insight-section">
                  <div className="insight-metrics">
                    <div className="metric">
                      <span className="metric-value">
                        {data.employees.filter(e => e.idleHours > 2).length}/10
                      </span>
                      <span className="metric-label">Underutilized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* MOVED HEATMAP TO SEPARATE SECTION TO MATCH TABLE WIDTH */}
      <section className="heatmap-section">
        <div className="heatmap-container-fullwidth">
          <div className="chart-header">
            <h4>Workload Balance Heatmap</h4>
            <span className="chart-subtitle">Team vs Project Utilization (Active Hours %)</span>
          </div>
          <div className="heatmap-grid-fullwidth fade-in-chart">
            <div className="heatmap-corner">Teams / Projects</div>
            {heatmapData[selectedDept].projects.map((project, index) => (
              <div key={index} className="project-header">{project}</div>
            ))}
            
            {heatmapData[selectedDept].teams.map((team, teamIndex) => (
              <React.Fragment key={teamIndex}>
                <div className="team-header">{team}</div>
                {heatmapData[selectedDept].workloadMatrix[teamIndex].map((workload, projIndex) => (
                  <div 
                    key={projIndex} 
                    className={`heatmap-cell ${getWorkloadLevel(workload)} cell-hover`}
                    title={`${team} - ${heatmapData[selectedDept].projects[projIndex]}: ${workload}% active hours`}
                  >
                    <span className="workload-percentage">{workload}%</span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          
          <div className="heatmap-legend-fullwidth">
            <div className="legend-item safe">
              <span className="legend-color"></span>
              Optimal (≤75%)
            </div>
            <div className="legend-item balanced">
              <span className="legend-color"></span>
              Balanced (76-85%)
            </div>
            <div className="legend-item high">
              <span className="legend-color"></span>
              High Load (86-95%)
            </div>
            <div className="legend-item critical">
              <span className="legend-color"></span>
              Overloaded (≥96%)
            </div>
          </div>
        </div>
      </section>

      <section className="table-section">
        <h2 className="section-title slide-up">⚠️ Individual Employee Analytics (10 Employees)</h2>
        <div className="table-container fade-in-table">
          <div className="table-wrapper">
            <table className="minimal-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Active Hours</th>
                  <th>Idle Hours</th>
                  <th>Well-being</th>
                  <th>Attrition Risk</th>
                  <th>Break Time</th>
                  <th>Activity %</th>
                  <th>AI Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {data.employees.map((emp, index) => (
                  <tr key={index} className="table-row-hover" style={{animationDelay: `${index * 0.1}s`}}>
                    <td>
                      <div className="employee-info">
                        <span className="employee-name">{emp.name}</span>
                      </div>
                    </td>
                    <td>{emp.activeHours}h</td>
                    <td>{emp.idleHours}h</td>
                    <td>{emp.wellbeing}/100</td>
                    <td>
                      <span className={`risk-badge ${getRiskLevel(emp.attritionRisk)} badge-glow`}>
                        {emp.attritionRisk}
                      </span>
                    </td>
                    <td>{emp.breakTime}min</td>
                    <td>{calculateEmployeeActivity(emp.activeHours)}%</td>
                    <td className="recommendation-cell">
                      {emp.recommendation}
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

export default TalentPlanningAgent;
