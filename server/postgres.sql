/* Get up and running with Database via CLI
 * Probably a quicker way but it worked fine for me.
 */

-- First login to pg via CLI
-- psql -U postgres
-- type password.

CREATE DATABASE deliveroo;

-- We can then use Sequelize to generate the tables for us.

-- These are already in the package.json file, but if new project, need to install required deps.
-- npm install sequelize sequelize-cli
-- npm install pg

-- Initialize Sequelize:
-- npx sequelize-cli init

-- Create a Sequelize Config file, e.g. config/config.json
-- Create a Sequlize model (if not done already, e.g. models/rider.js).
-- mkdir migrations (This is to store the migrations)
-- --> You can also generate a model and edit as needed by running:
-- npx sequelize-cli migration:generate --name create-Rider
-- (Typically it's a good naming convention to name it regarding what it's doing, e.g. create-)
-- You then edit the migration file which was just generated. See examples in migrations folder.

-- Then run:
-- npx sequelize-cli db:migrate


-- TODO: Look at this to configure Sequelize with ES6.
-- https://gist.github.com/andrewmunro/030f0bf62453239c495b0347c8cd1247