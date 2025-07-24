// src/types/analytics.ts

export interface StateLiteracy {
    _id: string; // State name
    avg_literacy: number;
    min_literacy: number;
    max_literacy: number;
}

export interface PopulationData {
    _id: string; // State name
    total_population: number;
    tribe_count: number;
}

export interface LivelihoodType {
    _id: string; // Livelihood type name (e.g., "Agriculture", "Forestry")
    count: number;
}

export interface EmploymentData {
    _id: { modern: boolean }; // true for modern, false for traditional
    count: number;
}

export interface MigrationTrend {
    _id: string; // Migration trend (e.g., "Rural to Urban", "Seasonal")
    count: number;
}

export interface CulturalPractice {
    _id: string; // Cultural practice name
    count: number;
    tribes: string[]; // List of tribe names practicing this
}

export interface TribeDistribution {
    _id: string; // Tribe name
    state: string;
    population: number;
    education: {
        literacy_rate: number;
    };
    modern_employment: boolean;
    livelihood: string;
    distribution: {
        latitude?: number;
        longitude?: number;
        migration_trend: string;
    };
    cultural_practices: string[];
}