import React, { useMemo } from 'react';
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
  Area,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import '../styles/ChiefOfStaffAgent.css';

const departments = ['Sales', 'Marketing', 'Technology', 'HR', 'Finance'];

// Department-specific data structures with corrected team sizes (≤10)
const departmentData = {
  Sales: {
    productivity: { dept: 'Sales', productivity: 87, industry: 82, risk: 'Low' },
    deliveryTrend: [
      { month: 'Jan', delivery: 92, sla: 95 },
      { month: 'Feb', delivery: 94, sla: 95 },
      { month: 'Mar', delivery: 88, sla: 95 },
      { month: 'Apr', delivery: 91, sla: 95 },
      { month: 'May', delivery: 96, sla: 95 },
      { month: 'Jun', delivery: 89, sla: 95 }
    ],
    projects: [
      { project: 'Q4 Pipeline', teamSize: 8, risk: 85, budget: 2.5, dept: 'Sales' },
      { project: 'Lead Generation', teamSize: 6, risk: 45, budget: 1.8, dept: 'Sales' },
      { project: 'Client Retention', teamSize: 4, risk: 28, budget: 1.2, dept: 'Sales' }
    ],
    overtime: { dept: 'Sales', regular: 160, overtime: 25, absence: 8 },
    benchmarking: { department: 'Sales', productivity: 87, riskLevel: 'Low', notes: 'Exceeding Q4 pipeline targets, strong performance across all regions' },
    compliance: [
      { metric: 'Sales Compliance', status: 'Compliant', score: 94, dept: 'Sales' },
      { metric: 'CRM Data Quality', status: 'Compliant', score: 89, dept: 'Sales' },
      { metric: 'Lead Tracking', status: 'At Risk', score: 76, dept: 'Sales' }
    ]
  },
  Marketing: {
    productivity: { dept: 'Marketing', productivity: 78, industry: 80, risk: 'Medium' },
    deliveryTrend: [
      { month: 'Jan', delivery: 85, sla: 95 },
      { month: 'Feb', delivery: 89, sla: 95 },
      { month: 'Mar', delivery: 82, sla: 95 },
      { month: 'Apr', delivery: 87, sla: 95 },
      { month: 'May', delivery: 91, sla: 95 },
      { month: 'Jun', delivery: 84, sla: 95 }
    ],
    projects: [
      { project: 'Brand Refresh', teamSize: 10, risk: 72, budget: 3.2, dept: 'Marketing' },
      { project: 'Campaign Beta', teamSize: 9, risk: 91, budget: 2.9, dept: 'Marketing' },
      { project: 'Content Strategy', teamSize: 5, risk: 35, budget: 1.5, dept: 'Marketing' }
    ],
    overtime: { dept: 'Marketing', regular: 155, overtime: 18, absence: 12 },
    benchmarking: { department: 'Marketing', productivity: 78, riskLevel: 'Medium', notes: 'Campaign delays identified, resource constraints affecting delivery timelines' },
    compliance: [
      { metric: 'Brand Guidelines', status: 'Compliant', score: 92, dept: 'Marketing' },
      { metric: 'Content Approval', status: 'Gap Identified', score: 67, dept: 'Marketing' },
      { metric: 'Marketing ROI', status: 'At Risk', score: 74, dept: 'Marketing' }
    ]
  },
  Technology: {
    productivity: { dept: 'Technology', productivity: 92, industry: 85, risk: 'Low' },
    deliveryTrend: [
      { month: 'Jan', delivery: 97, sla: 95 },
      { month: 'Feb', delivery: 98, sla: 95 },
      { month: 'Mar', delivery: 94, sla: 95 },
      { month: 'Apr', delivery: 96, sla: 95 },
      { month: 'May', delivery: 99, sla: 95 },
      { month: 'Jun', delivery: 97, sla: 95 }
    ],
    projects: [
      { project: 'Cloud Migration', teamSize: 10, risk: 45, budget: 4.2, dept: 'Technology' },
      { project: 'Mobile App', teamSize: 7, risk: 38, budget: 2.8, dept: 'Technology' },
      { project: 'API Platform', teamSize: 5, risk: 25, budget: 1.9, dept: 'Technology' }
    ],
    overtime: { dept: 'Technology', regular: 162, overtime: 15, absence: 6 },
    benchmarking: { department: 'Technology', productivity: 92, riskLevel: 'Low', notes: 'Cloud migration ahead of schedule, exceptional team performance and efficiency' },
    compliance: [
      { metric: 'Security Audits', status: 'Compliant', score: 97, dept: 'Technology' },
      { metric: 'Code Reviews', status: 'Compliant', score: 94, dept: 'Technology' },
      { metric: 'DevOps Standards', status: 'Compliant', score: 91, dept: 'Technology' }
    ]
  },
  HR: {
    productivity: { dept: 'HR', productivity: 85, industry: 83, risk: 'Low' },
    deliveryTrend: [
      { month: 'Jan', delivery: 88, sla: 95 },
      { month: 'Feb', delivery: 92, sla: 95 },
      { month: 'Mar', delivery: 86, sla: 95 },
      { month: 'Apr', delivery: 89, sla: 95 },
      { month: 'May', delivery: 94, sla: 95 },
      { month: 'Jun', delivery: 90, sla: 95 }
    ],
    projects: [
      { project: 'Hiring Drive Q4', teamSize: 6, risk: 65, budget: 2.1, dept: 'HR' },
      { project: 'Training Programs', teamSize: 4, risk: 42, budget: 1.6, dept: 'HR' },
      { project: 'Policy Updates', teamSize: 3, risk: 30, budget: 0.9, dept: 'HR' }
    ],
    overtime: { dept: 'HR', regular: 158, overtime: 22, absence: 9 },
    benchmarking: { department: 'HR', productivity: 85, riskLevel: 'Low', notes: 'Talent acquisition metrics improving, stable workforce management performance' },
    compliance: [
      { metric: 'D&I Reporting', status: 'Compliant', score: 95, dept: 'HR' },
      { metric: 'Employee Records', status: 'Compliant', score: 88, dept: 'HR' },
      { metric: 'Policy Compliance', status: 'Gap Identified', score: 68, dept: 'HR' }
    ]
  },
  Finance: {
    productivity: { dept: 'Finance', productivity: 91, industry: 88, risk: 'Low' },
    deliveryTrend: [
      { month: 'Jan', delivery: 96, sla: 95 },
      { month: 'Feb', delivery: 97, sla: 95 },
      { month: 'Mar', delivery: 93, sla: 95 },
      { month: 'Apr', delivery: 95, sla: 95 },
      { month: 'May', delivery: 98, sla: 95 },
      { month: 'Jun', delivery: 96, sla: 95 }
    ],
    projects: [
      { project: 'Budget Planning', teamSize: 7, risk: 35, budget: 2.4, dept: 'Finance' },
      { project: 'Audit Preparation', teamSize: 5, risk: 58, budget: 2.0, dept: 'Finance' },
      { project: 'Cash Management', teamSize: 3, risk: 22, budget: 1.1, dept: 'Finance' }
    ],
    overtime: { dept: 'Finance', regular: 164, overtime: 12, absence: 5 },
    benchmarking: { department: 'Finance', productivity: 91, riskLevel: 'Low', notes: 'Automation initiatives reducing manual work, strong financial controls maintained' },
    compliance: [
      { metric: 'SOX Controls', status: 'Compliant', score: 96, dept: 'Finance' },
      { metric: 'Financial Audits', status: 'Compliant', score: 93, dept: 'Finance' },
      { metric: 'Reporting Standards', status: 'At Risk', score: 77, dept: 'Finance' }
    ]
  }
};

const ChiefOfStaffAgent = () => {
  // Aggregate data across all departments
  const aggregatedData = useMemo(() => {
    // Productivity comparison data
    const productivityData = departments.map(dept => departmentData[dept].productivity);
    
    // Combined delivery trends
    const deliveryTrendData = departmentData.Sales.deliveryTrend.map((item, index) => {
      const monthData = { month: item.month, sla: 95 };
      departments.forEach(dept => {
        monthData[dept] = departmentData[dept].deliveryTrend[index].delivery;
      });
      return monthData;
    });
    
    // All projects combined
    const allProjects = departments.flatMap(dept => departmentData[dept].projects);
    
    // Overtime data for all departments
    const overtimeData = departments.map(dept => departmentData[dept].overtime);
    
    // All compliance data
    const allCompliance = departments.flatMap(dept => 
      departmentData[dept].compliance.map(item => ({ ...item, dept }))
    );
    
    // Department benchmarking
    const benchmarkingData = departments.map(dept => departmentData[dept].benchmarking);
    
    return {
      productivityData,
      deliveryTrendData,
      allProjects,
      overtimeData,
      allCompliance,
      benchmarkingData
    };
  }, []);

  // Calculate company-wide KPIs
  const companyKPIs = useMemo(() => {
    const avgProductivity = Math.round(
      aggregatedData.productivityData.reduce((sum, d) => sum + d.productivity, 0) / departments.length
    );
    
    const avgIndustry = Math.round(
      aggregatedData.productivityData.reduce((sum, d) => sum + d.industry, 0) / departments.length
    );
    
    const totalHighRiskProjects = aggregatedData.allProjects.filter(p => p.risk > 70).length;
    
    const totalProjects = aggregatedData.allProjects.length;
    
    const avgDelivery = Math.round(
      aggregatedData.deliveryTrendData.reduce((sum, month) => {
        const monthAvg = departments.reduce((deptSum, dept) => deptSum + month[dept], 0) / departments.length;
        return sum + monthAvg;
      }, 0) / aggregatedData.deliveryTrendData.length
    );
    
    const totalBudget = aggregatedData.allProjects.reduce((sum, p) => sum + p.budget, 0);
    
    return {
      avgProductivity,
      avgIndustry,
      totalHighRiskProjects,
      totalProjects,
      avgDelivery,
      totalBudget,
      riskRatio: Math.round((totalHighRiskProjects / totalProjects) * 100)
    };
  }, [aggregatedData]);

  const COLORS = ['#A855F7', '#C084FC', '#3B82F6', '#10B981', '#F59E0B'];
  const PIE_COLORS = ['#A855F7', '#C084FC', '#EF4444', '#F59E0B', '#10B981'];

  // Custom tooltip content for scatter chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#374151' }}>
            {data.project}
          </p>
          <p style={{ margin: '4px 0', color: '#6B7280' }}>
            Department: <span style={{ color: '#374151' }}>{data.dept}</span>
          </p>
          <p style={{ margin: '4px 0', color: '#6B7280' }}>
            Risk Score: <span style={{ color: '#374151' }}>{data.risk}%</span>
          </p>
          <p style={{ margin: '4px 0', color: '#6B7280' }}>
            Budget: <span style={{ color: '#374151' }}>${data.budget}M</span>
          </p>
          <p style={{ margin: '4px 0', color: '#6B7280' }}>
            Team Size: <span style={{ color: '#374151' }}>{data.teamSize} members</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="talent-container fade-in">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-main slide-up">
            <h1>Clara — Unbiased Chief of Staff</h1>
            <p className="header-subtitle">Cross-Departmental Executive Dashboard - Complete Organizational Transparency</p>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <div className="content-area">
          {/* Company-wide KPI Tiles */}
          <section className="kpi-section">
            <h2 className="section-title slide-up">📊 Enterprise Performance Overview</h2>
            <div className="minimal-metrics">
              <div className="metric-card hover-lift delay-100">
                <div className="metric-label">Company Productivity</div>
                <div className="metric-value">{companyKPIs.avgProductivity}%</div>
                <div className="metric-subtext">vs. industry: {companyKPIs.avgIndustry}%</div>
              </div>
              
              <div className="metric-card hover-lift delay-200">
                <div className="metric-label">Avg Delivery Performance</div>
                <div className="metric-value">{companyKPIs.avgDelivery}%</div>
                <div className="metric-subtext">cross-department average</div>
              </div>
              
              <div className="metric-card hover-lift delay-300">
                <div className="metric-label">Project Risk Ratio</div>
                <div className="metric-value">{companyKPIs.riskRatio}%</div>
                <div className="metric-subtext">high-risk projects</div>
              </div>
              
              <div className="metric-card hover-lift delay-400">
                <div className="metric-label">Critical Projects</div>
                <div className="metric-value critical">{companyKPIs.totalHighRiskProjects}</div>
                <div className="metric-subtext">requiring immediate attention</div>
              </div>
            </div>
          </section>

          {/* Cross-Department Analytics */}
          <section className="charts-section">
            <h2 className="section-title slide-up">📈 Cross-Department Performance Analytics</h2>
            <div className="charts-grid">
              
              {/* Department Productivity Comparison */}
              <div className="chart-item hover-scale delay-100">
                <div className="chart-header">
                  <h4>Department Productivity vs Industry Benchmarks</h4>
                  <span className="chart-subtitle">Performance comparison across all departments</span>
                </div>
                <div className="chart-container fade-in-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={aggregatedData.productivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis dataKey="dept" stroke="#6B7280" fontSize={12} tickLine={false} />
                      <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar dataKey="productivity" fill="#A855F7" name="Our Performance" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="industry" fill="#C084FC" name="Industry Avg" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Multi-Department Delivery Trends */}
              <div className="chart-item hover-scale delay-200">
                <div className="chart-header">
                  <h4>Department Delivery Trends Comparison</h4>
                  <span className="chart-subtitle">Monthly performance tracking across all departments</span>
                </div>
                <div className="chart-container fade-in-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={aggregatedData.deliveryTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis dataKey="month" stroke="#6B7280" fontSize={12} tickLine={false} />
                      <YAxis domain={[75, 100]} stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend />
                      {departments.map((dept, index) => (
                        <Line 
                          key={dept}
                          type="monotone" 
                          dataKey={dept} 
                          stroke={COLORS[index]} 
                          strokeWidth={2}
                          name={dept}
                        />
                      ))}
                      <Line type="monotone" dataKey="sla" stroke="#EF4444" strokeDasharray="5 5" name="SLA Target" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Project Risk Scatter Plot - FIXED X-AXIS TICKS */}
              <div className="chart-item hover-scale delay-300">
                <div className="chart-header">
                  <h4>Enterprise Project Risk Analysis</h4>
                  <span className="chart-subtitle">Risk vs Budget allocation across all departments</span>
                </div>
                <div className="chart-container fade-in-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <ScatterChart data={aggregatedData.allProjects}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis 
                        type="number"
                        dataKey="budget" 
                        stroke="#6B7280" 
                        fontSize={12}
                        tickLine={false}
                        name="Budget ($M)"
                        domain={[0, 5]}
                        ticks={[0, 1, 2, 3, 4, 5]}
                        tickFormatter={(value) => `$${value}M`}
                        label={{ 
                          value: 'Budget ($ Millions)', 
                          position: 'insideBottom', 
                          offset: -1,
                          style: { textAnchor: 'middle', fill: '#6B7280', fontSize: '12px' }
                        }}
                      />
                      <YAxis 
                        type="number"
                        dataKey="risk"
                        stroke="#6B7280" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        name="Risk Score"
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                        label={{ 
                          value: 'Risk Score (%)', 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { textAnchor: 'middle', fill: '#6B7280', fontSize: '12px' }
                        }}
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        content={<CustomTooltip />}
                      />
                      <Scatter 
                        dataKey="risk" 
                        fill="#A855F7"
                        name="Projects"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Resource Utilization Comparison */}
              <div className="chart-item hover-scale delay-400">
                <div className="chart-header">
                  <h4>Cross-Department Resource Utilization</h4>
                  <span className="chart-subtitle">Hours distribution analysis by department</span>
                </div>
                <div className="chart-container fade-in-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={aggregatedData.overtimeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis dataKey="dept" stroke="#6B7280" fontSize={12} tickLine={false} />
                      <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="regular" stackId="a" fill="#A855F7" name="Regular Hours" radius={[0, 0, 4, 4]} />
                      <Bar dataKey="overtime" stackId="a" fill="#F59E0B" name="Overtime" />
                      <Bar dataKey="absence" stackId="a" fill="#EF4444" name="Absence" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Enhanced AI Action Center */}
        <aside className="ai-sidebar">
          <section className="ai-insights-section">
            <h2 className="section-title slide-up">🤖 Clara's Enterprise Insights</h2>
            
            <div className="unified-ai-content">
              <div className="ai-insights-card">
                <div className="insight-section">
                  <h3>Executive Risk Alert</h3>
                  <p>Critical organizational risks requiring C-suite attention</p>
                  <div className="insight-metrics">
                    <div className="metric">
                      <span className="metric-value high-risk">
                        {companyKPIs.totalHighRiskProjects}
                      </span>
                      <span className="metric-label">High-Risk Projects</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">
                        {aggregatedData.benchmarkingData.filter(d => d.riskLevel === 'Medium').length}
                      </span>
                      <span className="metric-label">Departments At Risk</span>
                    </div>
                  </div>
                </div>

                <div className="insight-section">
                  <h3>Performance Intelligence</h3>
                  <p>Data-driven insights on organizational performance</p>
                  <div className="insight-metrics">
                    <div className="metric">
                      <span className="metric-value">
                        {aggregatedData.productivityData.filter(d => d.productivity > d.industry).length}
                      </span>
                      <span className="metric-label">Above Industry Avg</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">
                        {Math.round(aggregatedData.overtimeData.reduce((sum, d) => sum + d.overtime, 0) / departments.length)}h
                      </span>
                      <span className="metric-label">Avg Monthly Overtime</span>
                    </div>
                  </div>
                </div>

                <div className="insight-section">
                  <h3>Strategic Recommendations</h3>
                  <p>Unbiased recommendations for organizational optimization</p>
                  <div className="insight-metrics">
                    <div className="metric">
                      <span className="metric-value">
                        ${companyKPIs.totalBudget.toFixed(1)}M
                      </span>
                      <span className="metric-label">Total Investment</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">
                        {aggregatedData.allCompliance.filter(c => c.status === 'At Risk').length}
                      </span>
                      <span className="metric-label">Compliance Issues</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* All Departments Benchmarking Table */}
      <section className="table-section">
        <h2 className="section-title slide-up">📋 Enterprise Department Assessment</h2>
        <div className="table-container fade-in-table">
          <div className="table-wrapper">
            <table className="minimal-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Productivity %</th>
                  <th>Risk Level</th>
                  <th>Clara's Unfiltered Assessment</th>
                </tr>
              </thead>
              <tbody>
                {aggregatedData.benchmarkingData.map((dept, index) => (
                  <tr key={dept.department} className="table-row-hover" style={{animationDelay: `${index * 0.1}s`}}>
                    <td>
                      <div className="employee-info">
                        <span className="employee-name">{dept.department}</span>
                      </div>
                    </td>
                    <td><span className="productivity-score">{dept.productivity}%</span></td>
                    <td>
                      <span className={`risk-badge ${dept.riskLevel.toLowerCase()} badge-glow`}>
                        {dept.riskLevel}
                      </span>
                    </td>
                    <td className="recommendation-cell">{dept.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Enterprise Compliance Overview */}
      <section className="compliance-section">
        <div className="table-container fade-in-table">
          <div className="table-wrapper">
            <h3 className="compliance-title">Enterprise Compliance Dashboard</h3>
            <table className="minimal-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Compliance Metric</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Priority Action</th>
                </tr>
              </thead>
              <tbody>
                {aggregatedData.allCompliance.map((row, index) => (
                  <tr key={index} className="table-row-hover" style={{animationDelay: `${index * 0.05}s`}}>
                    <td>
                      <div className="employee-info">
                        <span className="employee-name">{row.dept}</span>
                      </div>
                    </td>
                    <td className="metric-name">{row.metric}</td>
                    <td>
                      <span className={`risk-badge ${row.status.toLowerCase().replace(/\s+/g, '-')} badge-glow`}>
                        {row.status}
                      </span>
                    </td>
                    <td><span className="compliance-score">{row.score}%</span></td>
                    <td className="action-cell">
                      {row.score < 70 ? '🚨 Immediate intervention' : 
                       row.score < 80 ? '⚠️ Close monitoring' : 
                       row.score < 90 ? '📊 Regular review' : '✅ Maintain standards'}
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

export default ChiefOfStaffAgent;
