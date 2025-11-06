import { ENVIRONMENTS, GRAPHQL } from '../config/constants.js';

function buildGraphQLEndpoint(query, environment = 'dev') {
  return `${ENVIRONMENTS[environment]}${GRAPHQL.basePath}${GRAPHQL.modelPath}${query}`;
}
export { buildGraphQLEndpoint };
