
import { ENVIRONMENTS, GRAPHQL } from '../config/constants.js';

/**
 * Build GraphQL endpoint URL
 * @param query - GraphQL query path
 * @param environment - Environment key
 * @returns Full GraphQL endpoint URL
 */
export function buildGraphQLEndpoint(
  query: string,
  environment: keyof typeof ENVIRONMENTS = 'dev'
): string {
  return `${ENVIRONMENTS[environment]}${GRAPHQL.basePath}${GRAPHQL.modelPath}${query}`;
}
