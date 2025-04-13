# React Dashboard Application

## Description

This is a single-page React application that provides a customizable dashboard interface. Users can add, remove, and rearrange widgets on a grid layout. The application is designed to be extensible, allowing for the addition of various widget types. Currently implemented widgets include Weather, Todo, and News. The layout and widget configurations are persisted to local storage.

## Features

- **Dynamic Widget Management:** Add, remove, and rearrange widgets on a responsive grid.
- **Customizable Layout:** Dashboard layout is saved and restored from local storage.
- **Widget Configuration:** Configure individual widgets (e.g., set weather location, todo list title, news source).
- **Implemented Widgets:**
  - Weather: Displays weather information.
  - Todo: A simple todo list.
  - News: Displays news headlines.
- **Responsive Design:** The dashboard adapts to different screen sizes.

## Technologies Used

- **React:** JavaScript library for building the user interface.
- **React Grid Layout:** Library for creating the draggable and resizable grid layout.
- **TanStack Query:** For efficient data fetching and caching (used in the News widget, and potentially extensible to other data-fetching widgets).
- **Shadcn UI:** UI component library providing pre-styled and accessible components (based on Radix UI and Tailwind CSS).
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Local Storage:** Browser API for persisting the dashboard layout and widget configurations.
- **Lodash (debounce):** For debouncing layout saves to local storage, improving performance.
- **Lucide React:** Icon library.

## Setup and Running Instructions

1.  **Clone the repository:**
    ```bash
    git clone <your_repository_url>
    cd <your_repository_directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install  # or yarn install or pnpm install
    ```
3.  **Set up Environment Variables:**

    - Certain widgets (Weather, News) require API keys to function.
    - Create a file named `.env` in the root directory of the project (the same level as `package.json`).
    - Add the following lines to the `.env` file, replacing `<your_key_here>` with your actual API keys obtained from the respective services (Openweathermap API & News API ):
      ```dotenv
      VITE_OPENWEATHERMAP_API_KEY=<your_openweathermap_api_key_here>
      VITE_NEWSAPI_API_KEY=<your_newsapi_api_key_here>
      ```

4.  **Run the application:**
    ```bash
    npm run dev # or yarn dev or pnpm dev
    ```
5.  **Open in your browser:** The application will typically be served at `http://localhost:5173`.

## Explanation of Technical Choices

- **React:** React was chosen for its component-based architecture, which makes it easy to create reusable UI elements and manage the complexity of a dynamic dashboard.
- **React Grid Layout:** This library provides the core functionality for creating the draggable, resizable, and responsive grid layout, which is essential for a dashboard application. It handles the complexities of grid management, allowing us to focus on the widget components themselves.
- **TanStack Query:** Used for data fetching in the News widget (and designed for extension to other widgets). It simplifies asynchronous data management, caching, and updates, leading to a better user experience.
- **Shadcn UI:** This component library was selected for its modern design, accessibility, and ease of use. It provides a set of pre-styled components that are easily customizable with Tailwind CSS, allowing for rapid development and a consistent look and feel.
- **Tailwind CSS:** Tailwind's utility-first approach allows for highly customizable styling directly within the component files, promoting maintainability and reducing the need for separate CSS files.
- **Local Storage:** Local storage was used for its simplicity in persisting the dashboard layout and widget configurations directly in the browser. For a more complex application, a server-side database would be more appropriate, but for this project, it provides a convenient solution for persistence.
- **Lodash (debounce):** The `debounce` function from Lodash is used to limit the frequency of saving layout changes to local storage. This improves performance by preventing excessive writes during rapid dragging or resizing of widgets.
- **Modular Structure:** The application is structured with a `src/modules/dashboard` directory. This promotes a feature-driven organization, making it easier to add new widgets or extend the dashboard functionality in the future.

## Assumptions and Simplifications

- **Local Storage Persistence:** The application uses local storage for persistence, which is suitable for a single-user, browser-based application. A real-world application with multiple users or data that needs to be shared would require a server-side database.
- **Static Widget Components:** Widget components (Weather, Todo, News) are currently imported statically. For a more extensible system, dynamic loading of widgets (e.g., from separate files or a server) could be implemented.
- **Simplified Widget Configuration:** The widget configuration is relatively basic. More complex widgets might require more sophisticated configuration options and UI.
- **No Authentication/Authorization:** The application does not include user authentication or authorization.
- **Single-Page Application:** This is a single-page application. More complex applications might require routing.

## Potential Improvements (If More Time)

- **Server-Side Persistence:** Implement a server-side database (e.g., PostgreSQL, MongoDB) to store user dashboards and widget configurations. This would allow for multi-user support, data sharing, and access from different devices.
- **Dynamic Widget Loading:** Implement dynamic loading of widgets. This would allow for adding new widgets without modifying the core application code. Widgets could be loaded from separate files, a server, or even a plugin system.
- **More Robust Widget Configuration:** Develop a more flexible and user-friendly system for widget configuration, potentially with custom form components or a more structured configuration schema.
- **Enhanced Error Handling:** Implement more comprehensive error handling, including user-friendly error messages, logging, and retry mechanisms.
- **Unit and Integration Tests:** Add unit and integration tests to ensure the application's stability and prevent regressions.
- **Accessibility Improvements:** Conduct a thorough accessibility audit and implement any necessary improvements to ensure the application is usable by everyone.
- **Internationalization (i18n):** Support multiple languages.
- **More Widget Variety:** Develop a wider range of widgets, such as charts, graphs, calendars, and social media feeds.
- **Customizable Themes:** Allow users to customize the look and feel of the dashboard with different themes.
- **Visual improvements:** The general visual appearance could be improved. Since right now i just choose the basic shadcn theme.
- **Add a settings panel:** Add a settings panel to allow users to configure global dashboard settings.
