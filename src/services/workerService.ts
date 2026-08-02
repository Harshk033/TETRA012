// Placeholder Worker Service for SUSHRUTA Health Worker Command Center

export interface WorkerSummaryMetrics {
  todayPatientsCount: number;
  criticalAlertsCount: number;
  pendingLabReportsCount: number;
  riskAssessmentQueueCount: number;
  upcomingFollowupsCount: number;
}

export const workerService = {
  async getDashboardSummary(): Promise<WorkerSummaryMetrics> {
    await new Promise((res) => setTimeout(res, 350));
    return {
      todayPatientsCount: 18,
      criticalAlertsCount: 3,
      pendingLabReportsCount: 5,
      riskAssessmentQueueCount: 7,
      upcomingFollowupsCount: 12,
    };
  },
};
