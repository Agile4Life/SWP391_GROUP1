# API contract workflow

The API team publishes an OpenAPI YAML/JSON export here when an endpoint is ready for frontend integration. Every change must specify request, successful response and common error response.

Frontend may use a local mock matching the contract, but must remove the mock before the Jira ticket is moved to Done.
