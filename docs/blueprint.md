# **App Name**: VenteTrack

## Core Features:

- Product Catalog: Display a comprehensive list of all products, including their design and current stock levels, fetched from the Django API.
- Client Directory: Show a list of all registered clients, displaying their names, fetched from the Django API.
- Sales History: Provide a view of all recorded sales transactions, detailing the client, the product sold, and the quantity (qtesortie) from the Django API.
- New Sale Entry: An interactive form allowing users to record a new sale by selecting a client, choosing a product, and specifying the quantity sold, then sending this data to the Django API.
- Automated Stock Deduction: Upon the successful recording of a new sale, automatically send an update request to the Django API to decrease the corresponding product's stock level.

## Style Guidelines:

- Primary color: A balanced and professional medium-blue (#3986AC), signifying trust and efficiency for interactive elements and highlights.
- Background color: A very light, desaturated blue (#ECF2F3), providing a clean and calm canvas for content.
- Accent color: A vibrant, analogous greenish-teal (#1EAD95), used sparingly for important actions or indicators to ensure visual contrast and modern appeal.
- Primary font: 'Inter' (sans-serif) for both headlines and body text, chosen for its high readability, modern aesthetic, and versatility across different text densities typical for a management application.
- Utilize a consistent set of clean, modern, and intuitive vector icons (e.g., Material Design) to enhance navigation and data presentation without visual clutter.
- Implement a dashboard-like layout with a persistent sidebar for primary navigation, featuring well-organized tables for data display and clear, user-friendly forms for data input.
- Incorporate subtle, functional animations for UI elements such as form submissions, data loading states, and navigation transitions to create a smooth and responsive user experience.