using my.trippin as trippin from '../db/schema';

service TrippinService {
    entity People as select from trippin.People
        actions {
            action suspendPerson() returns String
        };
    entity EmailTypes as projection on trippin.EmailTypes;
    entity UserStatuses as projection on trippin.UserStatuses;
    entity Trips as projection on trippin.Trips;
    entity Locations as projection on trippin.Locations;

    function getMostExpensiveTrips(count : Integer) returns array of Trips;
}
