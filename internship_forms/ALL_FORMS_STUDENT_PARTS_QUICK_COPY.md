# QUICK COPY: JUST THE STUDENT'S FIELDS FOR ALL 3 FORMS

This quick-reference document contains ONLY the fields that you as a student are required to write or type into each of the three AASTU internship forms.

---

## 1. FORM 02: Internship Student Logbook Form (VPAA/DPT/OF/002)

### Header Fields:
* **Student's Name:** Yabets Alelign Tiruneh
* **Student ID:** ETS 1352/15
* **Department:** Software Engineering
* **Name of Company:** Ethio Telecom (CTO Silicon / Bole Branch)
* **Name of Supervisor:** Mr. Naod (Director)

### Safety Prompt (Report 1 Only):
* **Have you been given brief on the company safety guidelines?** Circle **Yes**
*(Note: Exclude or leave blank on Reports 2, 3, and 4)*

---

### Daily Log Text Entries (Ready to Copy into the "Work Performed" column):

#### Month 1: Weeks 1 – 4 (July 1 – July 24, 2026)
* **Week 1 Day 1 (July 1):** Completed workplace registration and onboarding; attended project briefing for SuperDimm platform.
* **Week 1 Day 2 (July 2):** Reviewed project architecture documentation, repository structure, and full-stack/mobile guidelines.
* **Week 1 Day 3 (July 3):** Configured local development environment: Node.js runtime, VS Code, Git, and Android SDK dependencies.
* **Week 1 Day 4 (July 4):** Analyzed customer care ticketing requirements, complaint categories, and internal resolution workflows.
* **Week 1 Day 5 (July 6):** Documented backend functional requirements, API communication standards, and initial entity scope.

* **Week 2 Day 1 (July 7):** Analyzed dual-user interaction requirements: customer self-service reporting vs. internal staff management.
* **Week 2 Day 2 (July 8):** Formulated system boundaries: Next.js web application, React Native mobile client, and REST API backend.
* **Week 2 Day 3 (July 9):** Designed domain models and data schemas for Customer, ServiceRequest, Category, and UserSession entities.
* **Week 2 Day 4 (July 10):** Specified RESTful API contract specifications, HTTP request/response payloads, status codes, and error formats.
* **Week 2 Day 5 (July 11):** Finalized high-level architectural flow diagrams for customer service-request submission and tracking.

* **Week 3 Day 1 (July 13):** Initialized SuperDimm web application using Next.js App Router and TypeScript with strict type checking.
* **Week 3 Day 2 (July 14):** Configured Tailwind CSS design tokens, custom color palettes, responsive breakpoints, and typography.
* **Week 3 Day 3 (July 15):** Installed and configured shadcn/ui and Radix UI primitives (Button, Card, Dialog, Select, Badge).
* **Week 3 Day 4 (July 16):** Built shared application layout structures: navigation header, operational sidebar, and view container.
* **Week 3 Day 5 (July 17):** Implemented wireframes and layout shells for staff operations dashboard and customer portal landing screen.

* **Week 4 Day 1 (July 20):** Configured Prisma ORM with SQLite database for rapid local development and schema migrations.
* **Week 4 Day 2 (July 21):** Resolved database driver integration issues using @prisma/adapter-better-sqlite3 and verified stability.
* **Week 4 Day 3 (July 22):** Executed Prisma migrations for Customer and ServiceRequest models with relational integrity constraints.
* **Week 4 Day 4 (July 23):** Implemented core REST API endpoints: POST /api/requests (submission) and GET /api/requests (listing/filtering).
* **Week 4 Day 5 (July 24):** Developed GET /api/customers profile endpoints; verified API responses and JSON serialization using Postman.

---

#### Month 2: Weeks 5 – 8 (July 27 – August 21, 2026)
* **Week 5 Day 1 (July 27):** Designed internal operations dashboard layout to provide real-time operational visibility for telecom staff.
* **Week 5 Day 2 (July 28):** Built statistical metric cards for Total Inquiries, Pending Tickets, In-Progress Issues, and Resolved Requests.
* **Week 5 Day 3 (July 29):** Created backend aggregation queries to calculate ticket volume by category (Broadband, 4G/5G, Billing).
* **Week 5 Day 4 (July 30):** Implemented severity indicator badges (Low, Medium, High, Critical) to prioritize urgent service disruptions.
* **Week 5 Day 5 (July 31):** Optimized dashboard query performance and verified responsive layout across multiple display resolutions.

* **Week 6 Day 1 (August 3):** Implemented customer directory table displaying account numbers, full names, phone numbers, and service plans.
* **Week 6 Day 2 (August 4):** Developed client-side debounced search filter allowing quick customer lookup by phone number and account ID.
* **Week 6 Day 3 (August 5):** Built slide-over detail panel (shadcn/ui Sheet) to inspect customer profiles and service request histories.
* **Week 6 Day 4 (August 6):** Added pagination controls and sorting options to handle larger customer datasets smoothly.
* **Week 6 Day 5 (August 7):** Conducted component-level unit testing and resolved edge cases regarding empty search results.

* **Week 7 Day 1 (August 10):** Developed ticket detail view (/requests/[id]) displaying problem descriptions, timestamps, and customer contacts.
* **Week 7 Day 2 (August 11):** Implemented ticket lifecycle transition workflow: Pending -> In Progress -> Resolved.
* **Week 7 Day 3 (August 12):** Integrated staff resolution notes and technician assignment dropdown menus into request management screen.
* **Week 7 Day 4 (August 13):** Added optimistic UI updates for status changes with automatic backend rollback upon API failure.
* **Week 7 Day 5 (August 14):** Tested full request lifecycle from initial complaint intake to final resolution state in the database.

* **Week 8 Day 1 (August 17):** Configured authentication infrastructure using NextAuth with credential provider and JWT session strategy.
* **Week 8 Day 2 (August 18):** Implemented role-based access control (RBAC) distinguishing customer accounts from operations/staff accounts.
* **Week 8 Day 3 (August 19):** Built Next.js middleware for route protection, redirecting unauthenticated requests and guarding internal routes.
* **Week 8 Day 4 (August 20):** Secured API routes by verifying JWT bearer tokens in request authorization headers before serving data.
* **Week 8 Day 5 (August 21):** Conducted mid-term project demonstration of the secure web operations platform for review and feedback.

---

#### Month 3: Weeks 9 – 13 (August 24 – September 25, 2026)
* **Week 9 Day 1 (August 24):** Built customer-facing self-service landing portal and public service information views.
* **Week 9 Day 2 (August 25):** Developed self-service problem reporting form with category dropdowns (Broadband, 4G/5G, SIM, Billing).
* **Week 9 Day 3 (August 26):** Implemented automatic unique tracking reference generator (e.g., REQ-2026-XXXX) upon form submission.
* **Week 9 Day 4 (August 27):** Built public ticket status lookup page enabling customers to query progress using their tracking reference.
* **Week 9 Day 5 (August 28):** Added comprehensive client-side form validation (Zod schema validation) to prevent incomplete ticket submissions.

* **Week 10 Day 1 (August 31):** Audited web application interfaces against Human-Computer Interaction (HCI) principles to reduce cognitive overload.
* **Week 10 Day 2 (September 1):** Refactored overloaded data tables by stripping non-essential columns and placing secondary metadata into drawers.
* **Week 10 Day 3 (September 2):** Replaced raw textual status labels with high-contrast, accessible status badges across all listing screens.
* **Week 10 Day 4 (September 3):** Designed intuitive empty-state components with illustrative icons and clear call-to-action prompts.
* **Week 10 Day 5 (September 4):** Standardized toast notifications, loading spinner states, and error alerts across both customer and staff workflows.

* **Week 11 Day 1 (September 7):** Refining responsive layouts across web dashboard and customer portal pages for different viewport sizes.
* **Week 11 Day 2 (September 8):** Planned customer-facing mobile application architecture with React Native, Expo, and Expo Router.
* **Week 11 Day 3 (September 9):** Initialized mobile project structure with Expo Router file-based routing and TypeScript configuration.
* **Week 11 Day 4 (September 10):** Set up mobile theme configuration (Colors, Spacing, Typography) and custom components (ThemedView, ThemedText).
* **Week 11 Day 5 (September 11):** Structured bottom-tab navigation layout in /app/(tabs)/_layout.tsx (Home, Services, Requests, Alerts, Profile).

* **Week 12 Day 1 (September 14):** Implemented mobile authentication view (/app/auth/login.tsx) with form validation and JWT session handling.
* **Week 12 Day 2 (September 15):** Developed mobile customer Home screen (/app/(tabs)/index.tsx) and telecom services showcase.
* **Week 12 Day 3 (September 16):** Built mobile service request creation flow (/app/requests/create.tsx) with category picker and validation.
* **Week 12 Day 4 (September 17):** Developed customer ticket history screen (/app/(tabs)/requests.tsx) displaying status badges and pull-to-refresh.
* **Week 12 Day 5 (September 18):** Implemented ticket detail screen (/app/requests/[id].tsx), user profile view, and alerts interface placeholder.

* **Week 13 Day 1 (September 21):** Tested mobile application on Android emulators and physical devices, resolving layout wrapping and scaling bugs.
* **Week 13 Day 2 (September 22):** Conducted cross-platform integration testing between web staff dashboard and mobile customer submissions.
* **Week 13 Day 3 (September 23):** Documented known system limitations (identifying mobile alerts as a development prototype requiring push services).
* **Week 13 Day 4 (September 24):** Cleaned project codebase, verified TypeScript compile health, organized commit history, and pushed code to GitHub.
* **Week 13 Day 5 (September 25):** Compiled technical artifacts, captured application screenshots, and prepared documentation for final university report.

---

## 2. FORM 06: Monthly Performance Evaluation Format (VPAA/DPT/OF/006)

### Header Fields (Fill across 3 copies: July, August, September):
* **Month:** Month 1 (July 2026) / Month 2 (August 2026) / Month 3 (September 2026)
* **Company Name:** Ethio Telecom (CTO Silicon / Bole Branch)
* **Company Supervisor's Name:** [Supervisor's Full Name]
* **Phone No.:** [Supervisor's Phone Number]
* **Student's Full Name:** Yabets Alelign Tiruneh
* **Student's Department:** Department of Software Engineering
* **ID No.:** ETS 1352/15

*(All evaluation boxes, marks, comments, and signature/stamps are filled by your supervisor)*

---

## 3. FORM 04: Industry Supervisor Overall Evaluation Form (VPAA/DPT/OF/004)

### Header Fields:
* **Student's Name:** Yabets Alelign Tiruneh
* **ID No.:** ETS 1352/15
* **Department:** Software Engineering
* **Organization's Name:** Ethio Telecom (CTO Silicon / Bole Branch)
* **Duration of Internship:** July 1, 2026 – September 30, 2026 (3 Months)

*(All 1–5 checkboxes, Section C comments, Job Offer question, scoring, and stamps are completed by your Industry Supervisor and Department Coordinator)*
