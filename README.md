# SerONoSerNg

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.3.

## Questions from Access

The question bank is imported from `../seronoser.mdb`: 29 questions and 348
answers. `questions.json` is the development app's working copy; `api/data.js`
contains the same data as the default for fresh installations.

To repeat the import on Windows, close the app and run from this directory:

```powershell
./scripts/import-access-questions.ps1
# Or specify another database:
./scripts/import-access-questions.ps1 -DatabasePath C:\path\seronoser.mdb
```

This replaces both question banks, including any local question edits. Microsoft
Access itself is not required; the script uses the Microsoft Access ODBC driver
(already available on the machine used for this import).

Question IDs retain the source IDs as strings. Answer IDs combine the question
and answer IDs because the source answer numbers repeat for each question.
Text, enabled flags, and answer flags are preserved (`valor: false` means correct).
Selection state is reset, and `Sin Foto` is normalized to the app's `Sin foto`.
Photos are bundled in `public/fotos` and imported as relative `fotos/` URLs,
with filenames URL-encoded for spaces and special characters. Angular copies
this folder into the build, which is also included in the Electron package.
All 195 distinct photos referenced by the imported questions are included.

An existing packaged installation loads its saved `questions.json` beside the
executable instead of the bundled defaults. To update that installation, close
the app, back up that saved file, and replace it with this repository's imported
`questions.json`.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
