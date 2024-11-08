TASK 1

1. Data Type Optimisation
   Currently all the Fields use generic varchar data types and lack constraints beyond primary key definition.

- UUIDs for id: If each id in users, parcs, and bookings is intended to be globally unique, using UUID rather than varchar ensures uniqueness.
- Specific Data Types: Use more specific data types, such as:
  - DATE or TIMESTAMP for bookingdate in bookings, to allow for date-specific querying and sorting.
  - TEXT for potentially larger fields like comments in bookings and description in parcs, as it accommodates variable-length text without length restrictions.

2. Foreign Key Constraints. The user and parc fields in bookings could imply relationships with other tables, but these relationships are not formally defined.

- Enforce Relationships:
- Set user in bookings as a foreign key referencing users(id).
- Set parc in bookings as a foreign key referencing parcs(id).
- This establishes a formal link between bookings, users, and parcs, enforcing referential integrity within the database.

- Cascade Deletes/Updates: If a user or parc is deleted, cascade this to remove or handle related bookings. This prevents orphaned records and maintains consistency.

3. Additional Constraints and Indexes

- Unique Constraints:
  - Add a unique constraint on email in users to ensure each user’s email is unique, preventing duplicate entries.
- Indexes for Performance:
  - Create indexes on frequently queried fields.

4. Normalisation

   - If comments in bookings are complex or if multiple comments can be added per booking, we might want to consider a separate comments table with booking_id as a foreign key.

5. Consistency in Naming Conventions

- Consider standardising field names across tables (e.g., use user_id in bookings instead of user, parc_id instead of parc), making relationships clearer and easier to maintain.

TASK 2

1. Test Driven Development (TDD) is a software development approach where tests are written before the code itself. The process involves writing a failing test, developing code to pass the test, and then refactoring the code while keeping tests green.

This practice ensured that new features met requirements, reduced bugs, and maintained code quality and reliability. It helped catch issues early and facilitated confident code refactoring and updates.

2. Pair Programming is where developers collaborate closely on the same code. These practices have brought clear benefits, like better code quality, and knowledge sharing among team members.It helps new developers get up to speed and encouraged collaborative problem-solving.

3.Continuous Integration/Continuous Deployment (CI/CD)
CI/CD pipelines for automated testing and deployment, adopting agile methodologies for rapid development cycles.
This helps in shipping functionality frequently to deliver value to users quickly, gather feedback, and iterate efficiently. This approach helps maintain momentum and adapt to user needs.
