/**
 * Environment base URLs
 */
export const ENVIRONMENTS = {
  dev:    'https://publish-p153442-e1604645.adobeaemcloud.com',
  stage:  'https://publish-p153442-e1604645.adobeaemcloud.com',
  prod:   'https://publish-p153442-e1604645.adobeaemcloud.com',
} as const;

/**
 * GraphQL configuration
 */
export const GRAPHQL = {
  basePath: '/graphql/execute.json',
  modelPath: '/Sandbox-Models',
} as const;

/**
 * Available GraphQL queries
 */
export const QUERIES = {
  getAllCardsPlans: '/get-all-cards-plans',
} as const;
