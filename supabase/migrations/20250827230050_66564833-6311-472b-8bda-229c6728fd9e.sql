-- Clean up scenario-related tables to use static files instead
-- This removes the dual system issue and simplifies architecture

DROP TABLE IF EXISTS training_sessions;
DROP TABLE IF EXISTS stakeholders;
DROP TABLE IF EXISTS swot_analyses;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS interlocutors;
DROP TABLE IF EXISTS scenarios;