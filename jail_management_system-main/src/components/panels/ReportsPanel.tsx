
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ReportsPanel = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const reportTypes = [
    { id: 'inmate-summary', name: 'Inmate Summary Report', description: 'Overview of all inmates and their status' },
    { id: 'staff-schedule', name: 'Staff Schedule Report', description: 'Current staff assignments and schedules' },
    { id: 'visitor-log', name: 'Visitor Activity Report', description: 'Recent visitor logs and statistics' },
    { id: 'cell-occupancy', name: 'Cell Occupancy Report', description: 'Current cell assignments and availability' },
    { id: 'security-incidents', name: 'Security Incident Report', description: 'Recent security incidents and responses' },
    { id: 'medical-log', name: 'Medical Activity Report', description: 'Medical visits and health statistics' },
  ];

  const generateReport = () => {
    if (!selectedReport) {
      alert('Please select a report type');
      return;
    }

    // Simulate report generation
    const reportWindow = window.open('', '_blank');
    const reportContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Jail Management System - Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .subtitle { color: #666; }
            .section { margin-bottom: 30px; }
            .data-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .data-table th, .data-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .data-table th { background-color: #f5f5f5; font-weight: bold; }
            .stats { display: flex; gap: 20px; margin: 20px 0; }
            .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 5px; flex: 1; }
            .stat-number { font-size: 24px; font-weight: bold; color: #333; }
            .stat-label { color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Jail Management System Report</div>
            <div class="subtitle">${reportTypes.find(r => r.id === selectedReport)?.name || 'Custom Report'}</div>
            <div class="subtitle">Generated on: ${new Date().toLocaleDateString()}</div>
            ${dateRange.start && dateRange.end ? `<div class="subtitle">Period: ${dateRange.start} to ${dateRange.end}</div>` : ''}
          </div>

          <div class="section">
            <h2>Executive Summary</h2>
            <div class="stats">
              <div class="stat-card">
                <div class="stat-number">1,247</div>
                <div class="stat-label">Total Inmates</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">89</div>
                <div class="stat-label">Active Staff</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">23</div>
                <div class="stat-label">Available Cells</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">156</div>
                <div class="stat-label">Daily Visitors</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>Detailed Information</h2>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Current Count</th>
                  <th>Capacity</th>
                  <th>Utilization</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Block A Inmates</td>
                  <td>312</td>
                  <td>350</td>
                  <td>89.1%</td>
                  <td>Normal</td>
                </tr>
                <tr>
                  <td>Block B Inmates</td>
                  <td>289</td>
                  <td>300</td>
                  <td>96.3%</td>
                  <td>High</td>
                </tr>
                <tr>
                  <td>Medical Wing</td>
                  <td>45</td>
                  <td>50</td>
                  <td>90.0%</td>
                  <td>Normal</td>
                </tr>
                <tr>
                  <td>Solitary Confinement</td>
                  <td>12</td>
                  <td>20</td>
                  <td>60.0%</td>
                  <td>Low</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section">
            <h2>Recent Activities</h2>
            <ul>
              <li>15 new admissions in the last 7 days</li>
              <li>8 releases processed this week</li>
              <li>23 scheduled court appearances</li>
              <li>156 visitor appointments logged</li>
              <li>3 medical emergencies handled</li>
            </ul>
          </div>

          <div class="section">
            <h2>Recommendations</h2>
            <ul>
              <li>Consider expanding Block B capacity due to high utilization</li>
              <li>Schedule additional medical staff for peak hours</li>
              <li>Review visitor scheduling system for optimization</li>
              <li>Implement preventive maintenance for cells showing wear</li>
            </ul>
          </div>

          <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
            <p>This report is confidential and for internal use only.</p>
            <p>Jail Management System © ${new Date().getFullYear()}</p>
          </div>
        </body>
      </html>
    `;
    
    reportWindow?.document.write(reportContent);
    reportWindow?.document.close();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Reports & Analytics</h2>
        <p className="text-slate-600">Generate comprehensive reports and analyze facility data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle>Report Generator</CardTitle>
              <CardDescription>Select report type and parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((report) => (
                      <SelectItem key={report.id} value={report.id}>
                        {report.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedReport && (
                  <p className="text-sm text-slate-600">
                    {reportTypes.find(r => r.id === selectedReport)?.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  />
                </div>
              </div>

              <Button 
                onClick={generateReport} 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={!selectedReport}
              >
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Current facility overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-slate-700">Total Reports Generated</span>
                  <span className="text-xl font-bold text-blue-600">247</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-slate-700">This Month</span>
                  <span className="text-xl font-bold text-green-600">18</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-slate-700">Last Generated</span>
                  <span className="text-sm font-medium text-purple-600">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 mt-6">
            <CardHeader>
              <CardTitle>Report History</CardTitle>
              <CardDescription>Recently generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Inmate Summary', date: '2024-05-22', type: 'PDF' },
                  { name: 'Staff Schedule', date: '2024-05-21', type: 'Excel' },
                  { name: 'Visitor Log', date: '2024-05-20', type: 'PDF' },
                  { name: 'Cell Occupancy', date: '2024-05-19', type: 'PDF' },
                ].map((report, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border border-slate-200 rounded">
                    <div>
                      <p className="font-medium text-sm">{report.name}</p>
                      <p className="text-xs text-slate-500">{report.date}</p>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {report.type}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportsPanel;
