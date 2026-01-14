using sap from '@sap/cds/common';
using {
    cuid,
    Currency,
    managed
} from '@sap/cds/common';

namespace my.trippin;

entity EmailTypes : sap.common.CodeList {
    key code : String(1);
}

entity UserStatuses : sap.common.CodeList {
    key code : String(1);
}

type EmailType : Association to EmailTypes;
type Status    : Association to UserStatuses;

entity Locations : cuid {
    address    : String(255);
    city       : String(40);
    postalCode : String(8);
    country    : String(40);
    person     : Association to People;
};

entity People : cuid, managed {
    userName  : String(255) @mandatory;
    firstName : String(255);
    lastName  : String(255);
    emails    : Composition of many EmailAddresses
                    on emails.person = $self;
    gender    : String(10);
    age       : Integer;
    status    : Status default 'A';
    createdBy : String(40);
    address   : Composition of Locations;
    trips     : Composition of many Trips
                    on trips.person = $self;
}

annotate People with {
    modifiedAt @odata.etag
};


entity EmailAddresses : cuid {
    type    : EmailType;
    address : String(255);
    person  : Association to People;
}

entity Trips : cuid {
    name        : String(255);
    budget      : Decimal(10, 2);
    currency    : Currency;
    description : String(1024);
    startsAt    : DateTime;
    endsAt      : DateTime;
    person      : Association to People;
}
