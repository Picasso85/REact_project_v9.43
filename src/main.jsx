// Import necessary dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import components and loaders
import { Root, loader as contextLoader } from "./components/Root";
import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { EventsPage, loader as eventsLoader } from "./pages/EventsPage";
import { NewEvent, action as newEvent } from "./components/UI/NewEvent";
import { EditEvent, action as editEvent } from "./components/UI/EditEvent";
import theme from "./components/Theme";

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: contextLoader,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventLoader,
        action: editEvent,
      },
      {
        path: "/new",
        element: <NewEvent />,
        action: newEvent,
      },
    ],
  },
]);

// Render the application using ReactDOM.createRoot
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrap the entire application in StrictMode for development
  <React.StrictMode>
    {/* Provide Chakra UI theme to the application */}
    <ChakraProvider theme={theme}>
      {/* Provide the router configuration to the application */}
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
