Intial Setup:
npm i @njs2/cli -g

Development:
npm start

To create migration:
npm run migrate new migration_name -- --timestamp

To run migrations:
npm run migrate up

To reverse the last migration:
npm run migrate down

Create lib:
njs2 library utilityLib facebook
