// Case studies reflect the public repositories inspected on 29 October 2026.
// Update evidence links and claims together when you publish new project code.
export default [
  {
    slug: 'spendwise', number: '01', name: 'Spendwise', type: 'Backend development', status: 'In development',
    repo: 'https://github.com/SarpAygen/SpendWise', commit: 'ab7677379904d709a59fed9c8cbae9597235773d',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL'],
    tagline: 'A clearer foundation for everyday finances.',
    summary: 'A personal finance backend for recording and retrieving categorized transactions, with request validation and consistent error responses.',
    short: 'Bringing structure to transaction data with a Java REST API, input validation, and PostgreSQL persistence.',
    overview: 'Spendwise is an ongoing Java and Spring Boot project focused on the backend of a personal finance tracker. The public version supports creating transactions, retrieving the full collection, and looking up an individual transaction. It separates the API, business logic, and data access so each part has a clear responsibility.',
    problem: 'Tracking spending starts with dependable records. A merchant, amount, date, category, and transaction type need a consistent structure before they can support useful financial summaries. This project starts with that foundation and uses Postman to work directly with the API while the backend develops.',
    features: [
      ['Transaction endpoints', 'Create a transaction, list all transactions, and retrieve one by ID through /api/transactions.'],
      ['Input validation', 'Require a merchant, positive amount, date, category, and transaction type before saving.'],
      ['Clear error responses', 'Return field-specific validation errors with HTTP 400, and HTTP 404 when a requested transaction is missing.'],
      ['Separated persistence', 'Use a Spring Data JPA repository and a Transaction entity for database access, with PostgreSQL integration.']
    ],
    choices: [
      ['Java + Spring Boot', 'Define typed transaction data and HTTP endpoints with a familiar application structure.'],
      ['Spring Data JPA + PostgreSQL', 'Keep database operations behind a repository instead of embedding queries in the controller.'],
      ['BigDecimal + LocalDate', 'Represent decimal transaction amounts and dates explicitly in the data model.'],
      ['Maven + Postman', 'Manage project dependencies and exercise the API during development.']
    ],
    challenges: [
      {title: 'Make invalid data useful to the caller.', body: 'An incomplete transaction should produce an actionable response. The model uses validation annotations, the controller applies @Valid, and a shared exception handler turns field errors into a response keyed by field name. A missing merchant can therefore be reported directly instead of becoming an unexplained server failure.', tradeoff: 'Returning the entity directly keeps this early API small. A separate request/response model would give future versions more control over what callers can submit and receive.'},
      {title: 'Keep the route separate from the work.', body: 'TransactionController delegates to TransactionService, which uses TransactionRepository. When an ID is missing, the service raises NotFoundException and the shared handler produces a 404. The same error policy can apply without duplicating response logic in every endpoint.', tradeoff: 'The service layer is deliberately thin at this stage. It provides a place for future rules without adding those rules before they are needed.'}
    ],
    testing: 'API development has been checked manually through Postman. The inspected public repository includes a Spring application-context test, but does not yet contain endpoint or validation regression tests. The API example is an illustrative request based on the current model; it is not a captured live response.',
    lessons: 'A small API makes the boundaries visible: the controller handles requests, the service coordinates behavior, and the repository handles storage. Validation and centralized errors give that structure a consistent contract for callers.',
    limitations: 'The published version focuses on create and read operations. A frontend and broader budgeting features remain future work. Update/delete and CSV preview are not part of this public source snapshot.',
    next: ['Add endpoint and validation regression tests.', 'Publish and verify the remaining transaction and CSV preview work.', 'Build financial summaries on top of the transaction model.'],
    evidence: [
      ['Transaction controller', 'src/main/java/spendwise/controller/TransactionController.java'],
      ['Service and missing-record behavior', 'src/main/java/spendwise/service/TransactionService.java'],
      ['Transaction model and validation', 'src/main/java/spendwise/model/Transaction.java'],
      ['Central exception handler', 'src/main/java/spendwise/exception/GlobalExceptionHandler.java']
    ]
  },
  {
    slug: 'computer-vision-desktop-automation', number: '02', name: 'Computer Vision Desktop Automation', type: 'Computer vision & desktop systems', status: 'Version 3.5.1',
    repo: 'https://github.com/SarpAygen/Computer_Vision_Desktop_Automation', commit: '87b35fa867d5787621f6b0c4286e712222331309',
    technologies: ['Python', 'OpenCV', 'Tesseract OCR', 'PySide6'],
    tagline: 'Turning uncertain pixels into verified actions.',
    summary: 'A Windows application that uses computer vision and OCR to coordinate actions across up to four application windows, with explicit state checks and independent recovery.',
    short: 'Interpreting a changing visual interface and coordinating verified actions across up to four Windows application windows.',
    image: {src: 'assets/automation-dashboard.webp', width: 1280, height: 900, alt: 'Macro Studio 3.5.1 interface preview with orange controls, four window status panels, and diagnostic navigation.', caption: 'Actual repository interface preview · Macro Studio 3.5.1 · No game input running'},
    overview: 'This application was developed for Fish! An Anime RNG on Roblox. It watches for the Hallows’ Eve event, selects eligible characters, reads mutation labels, and puts characters away when the event ends. The engineering problem is coordinating those actions when visual evidence is incomplete and input can arrive late.',
    problem: 'A desktop interface is not a stable API. Windows overlap, inventory layouts change, animations hide controls, and an accepted key press may not change the game immediately. Coordinating several windows requires the application to keep track of what it intended, what it sent, and what the screen actually confirms.',
    features: [
      ['Visual event and inventory detection', 'Use OpenCV matching and image processing to locate relevant regions, with Tesseract OCR for text and mutation labels.'],
      ['Per-window action state', 'Track targets, pending inputs, retries, and visual confirmation separately for up to four windows.'],
      ['Prioritized cleanup and recovery', 'Handle event end before lower-priority work, reject stale scan results, and let healthy windows continue when another window needs recovery.'],
      ['Bounded background work', 'Keep slower scans off the foreground input worker and limit outstanding jobs and UI messages.'],
      ['Diagnostics and maintenance', 'Expose timestamped logs, capture previews, and independent anti-idle deadlines in a native Qt interface.']
    ],
    choices: [
      ['Python + OpenCV + NumPy', 'Process small capture regions and identify visual structure in inventory and event banners.'],
      ['Tesseract OCR', 'Read text that visual matching alone cannot classify, while keeping slower recognition off urgent paths.'],
      ['PySide6', 'Present window status, controls, settings, and diagnostics in a native Qt application.'],
      ['Windows APIs + background threads', 'Verify foreground ownership, serialize input, and observe events without blocking the action worker.']
    ],
    challenges: [
      {title: 'A sent key is not a completed action.', body: 'Repeating a toggle too quickly can undo an input that arrived late. The application records the intended slot and accepted input, then uses two fresh matching observations to confirm equipment state. A hidden inventory remains uncertain; it does not become success merely because a key was sent. Retry guards and release-only retries protect against duplicate toggles.', tradeoff: 'Waiting for reliable evidence adds latency. Conservative checks can require another capture or rescan, but preserve the distinction between an attempted action and an observed result.'},
      {title: 'Keep slow recognition away from urgent work.', body: 'Mutation OCR runs on copied captures in a bounded executor. Event-specific results are checked against current state before they can authorize an action. The foreground worker can service another ready window while a scan finishes, and event-end cleanup interrupts lower-priority work. Anti-idle deadlines are scheduled independently so unresolved maintenance cannot suppress them indefinitely.', tradeoff: 'Only one worker controls foreground input, so actions remain serialized. This avoids competing focus changes, while bounded queues favor current state over an unlimited backlog.'}
    ],
    testing: 'The repository’s recorded version 3.5.1 validation log reports 12 of 12 regression suites passing. Coverage includes delayed and dropped inputs, stale OCR, hidden inventories, disconnected clients, event interruptions, and Qt interface behavior. Image processing and offscreen Qt checks use real code; Windows input and timing scenarios are simulated. These are recorded repository results, not a new live test performed for this portfolio.',
    lessons: 'Reliable automation needs uncertainty to be an explicit state. Separating observation, input, and confirmation makes failures easier to diagnose, while bounded work and independent recovery keep one difficult window from consuming the entire session.',
    limitations: 'The implementation targets a specific game interface and requires visible content. Tracked windows must share event timing, and input takes foreground focus. Visual confirmation cannot prove server acceptance. Simulated tests do not establish overnight reliability or guarantee that anti-idle input prevents server disconnects.',
    next: ['Expand validation on real Windows setups and display scales.', 'Collect reproducible captures for new interface failures.', 'Continue separating tightly coupled scheduling and recognition code.'],
    evidence: [
      ['Application and action handling', 'hallows_eve_macro.py'],
      ['Bounded runtime infrastructure', 'macro_runtime.py'],
      ['Recorded 3.5.1 validation results', 'VALIDATION_3_5_1.log'],
      ['Engineering audit and tradeoffs', 'AUDIT_3_5.md'],
      ['Anti-idle scheduler and test scope', 'ANTI_IDLE_FIX_3_5_1.md']
    ]
  }
];
