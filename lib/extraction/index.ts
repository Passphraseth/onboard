/**
 * Data Extraction Layer
 *
 * This module provides comprehensive data extraction from multiple sources
 * to create unique, data-driven website designs.
 */

// Website Analysis
export { analyzeWebsite, analyzeCompetitors } from './website-analyzer'
export type { WebsiteAnalysis, CompetitorPatterns } from './website-analyzer'

// Instagram Analysis
export { analyzeInstagram, extractColorsFromImage } from './instagram-analyzer'
export type { InstagramAnalysis } from './instagram-analyzer'

// Brand Orchestration
export { extractBrandProfile } from './brand-orchestrator'
export type { BrandProfile, ExtractionInput } from './brand-orchestrator'
