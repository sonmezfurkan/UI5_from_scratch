const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
  const { People, Trips } = this.entities;

  this.before("CREATE", People, async (req) => {
    const { userName } = req.data;

    // Check if a person with the same userName already exists
    const exists = await SELECT.one.from(People).where({ userName });

    if (exists) {
      req.error(409, `Person with userName '${userName}' already exists.`);
    }
  });

  this.on('getMostExpensiveTrips', async (req) => {
    // Retrieve the count parameter from the request
    const count = req.data.count || 3; // Default to 3 if no count is provided

    // Query the Trips entity to get the top 'count' most expensive trips
    const tx = cds.transaction(req);
    const { Trips } = this.entities;

    const results = await tx.read(Trips)
      .orderBy({ budget: 'desc' }) // Order by budget in descending order
      .limit(count); // Limit based on the count parameter

    return results;
  });

  this.on("suspendPerson", async (req) => {
    // Get the person ID from the bound entity in the request context
    const ID = req.params[0];

    // Find the person
    const person = await cds.run(
      SELECT.one.from(People).where({ ID })
    );

    if (!person) {
      return req.error(404, `Person with ID ${ID} not found`);
    }

    // Update the status to 'S' (Suspended)
    await cds.run(
      UPDATE(People).set({ status_code: "S" }).where({ ID })
    );

    return `Person with ID ${ID} has been suspended.`;
  });
});
