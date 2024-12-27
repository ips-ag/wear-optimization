import Dexie, { Table } from 'dexie';

interface Analysis {
  id: string;
  timestamp: string;
  imageUrl: string;
  results: {
    pattern: string;
    confidence: number;
    recommendations: string[];
  };
}

class WearDB extends Dexie {
  analyses!: Table<Analysis>;

  constructor() {
    super('wear-optimization');
    this.version(1).stores({
      analyses: 'id, timestamp',
    });
  }
}

export const seedTestData = () => {
  const db = new WearDB();

  const testData: Analysis = {
    id: new Date().getTime().toString(),
    timestamp: new Date().toISOString(),
    imageUrl: 'cypress/fixtures/images/test-wear-pattern.png',
    results: {
      pattern: 'Edge Wear',
      confidence: 0.95,
      recommendations: ['Adjust alignment', 'Check tire pressure'],
    },
  };

  return db.analyses.add(testData);
};
