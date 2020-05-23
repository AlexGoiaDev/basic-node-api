# basic-node-api
Basic Node Api
-----------------

Designed and developed by:
-> Alex Goia

Sometimes helped by:
-> Pedro Clemente


Proposal of the current repository:
Generate generic modules to get a shit done and start a SAAS.

Postgres Database in pitedomo server:
pitedomo.duckdns.org:5432

example of use
var pgp = require("pg-promise")();
var db = pgp("postgres://postgres:mysecretpassword@pitedomo.duckdns.org:5432/postgres");