// lib/scoring/purposeWeights.js

export const purposeWeights = {
  programming: {
    cpuPerformanceScore: 5,
    memoryScore: 4,
    storageScore: 3,
    batteryScore: 2,
    gpuPerformanceScore: 1,
    portabilityScore: 2
  },

  gaming: {
    gpuPerformanceScore: 5,
    cpuPerformanceScore: 4,
    memoryScore: 3,
    storageScore: 2,
    batteryScore: 1,
    portabilityScore: 1
  },

  student: {
    batteryScore: 5,
    portabilityScore: 4,
    memoryScore: 3,
    cpuPerformanceScore: 3,
    storageScore: 2,
    gpuPerformanceScore: 1
  },

  office: {
    cpuPerformanceScore: 4,
    memoryScore: 3,
    batteryScore: 4,
    portabilityScore: 3,
    storageScore: 2,
    gpuPerformanceScore: 1
  }
};