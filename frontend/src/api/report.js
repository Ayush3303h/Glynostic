import { apiRequest } from "./client";

export function generateReport(data) {
  return apiRequest("/report/generate", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getReport(id) {
  return apiRequest(`/report/${id}`);
}