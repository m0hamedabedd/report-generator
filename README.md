# AI LaTeX Report Generator

This is a web-based application that allows users to generate professional LaTeX reports using AI. Users can input their details, specify the report topic, and customize the style and format. The AI then generates a complete `.tex` file ready for compilation.

## Features

- **AI-Powered Content Generation:** Automatically generates report content based on a user-provided topic.
- **Customizable Templates:** Choose from different report styles (Modern, Classic, Minimalist, Academic) and cover page formats.
- **Bilingual Support:** Generate reports in both English and Arabic.
- **User-Friendly Interface:** A simple and intuitive interface for inputting data and generating reports.
- **Downloadable Output:** Download the generated LaTeX code as a `.tex` file.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/report-generator.git
   cd report-generator
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your environment variables:**

   Create a `.env.local` file in the root of your project and add your Gemini API key:

   ```
   GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
   ```

   You can use the provided `.env.local.example` as a template.

### Running the Application

Once the dependencies are installed and the environment variables are set, you can run the application with:

```bash
npm run dev
```

This will start the development server, and you can view the application in your browser at `http://localhost:5173`.

## How to Use

1. **Fill in your details:** Enter your name, ID, university, and other relevant information in the user details form.
2. **Configure the report:** Choose the number of pages, report style, cover page format, and language.
3. **Provide a topic:** Enter a topic for your report.
4. **Generate the report:** Click the "Generate Report" button to let the AI create the LaTeX code.
5. **Download the file:** Once the report is generated, you can copy the code or download it as a `.tex` file.

## Built With

- [React](https://reactjs.org/) - The web framework used
- [Vite](https://vitejs.dev/) - Frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Gemini API](https://ai.google.dev/) - For AI-powered content generation