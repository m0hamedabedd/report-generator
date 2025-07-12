
import { GoogleGenAI } from "@google/genai";
import type { UserDetails } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are an expert LaTeX typesetter and content creator. Your sole purpose is to generate a complete, compilable LaTeX document based on the user's detailed specifications.
- Your output MUST be ONLY raw LaTeX code.
- Do NOT include any explanations, markdown like \`\`\`latex, or comments.
- The entire response must be a single, valid LaTeX file, starting with \\documentclass and ending with \\end{document}.
- You must generate real, meaningful content for the report's topic. Placeholder text is strictly forbidden.`;

export const generateReport = async (userDetails: UserDetails, topic: string): Promise<string> => {
  const { name, id, section, pages, university, additionalInfo, style, coverPageFormat, language } = userDetails;

  const userPrompt = `
    Generate a complete LaTeX document based on the following specifications.

    ---
    ### 1. HIGH-LEVEL SPECIFICATIONS
    ---
    - **Topic:** "${topic}"
    - **Language:** "${language}"
    - **Style/Theme:** "${style}"
    - **Cover Page Format:** "${coverPageFormat}"
    - **Main Report Target Page Count:** ${pages}
    - **Author Name:** ${name || 'Not Provided'}
    - **University:** ${university || 'Not Provided'}
    - **ID:** ${id || 'Not Provided'}
    - **Course/Section:** ${section || 'Not Provided'}
    - **Additional Cover Letter Info:** "${additionalInfo || 'No additional information provided.'}"

    ---
    ### 2. DOCUMENT STRUCTURE
    ---
    The document must have two main parts: a Cover Page and the Main Report.

    **PART A: THE COVER PAGE (Format: ${coverPageFormat})**
    ${
      (() => {
        switch (coverPageFormat) {
          case 'Formal Report':
            return `
    - **Document Class:** You **MUST** use \`\\documentclass[a4paper, twoside]{report}\`.
    - **Cover Page Method:** You **MUST** define \`\\title\`, \`\\author\`, and \`\\date\` in the preamble, then call \`\\maketitle\` immediately after \`\\begin{document}\`. Example for preamble:
      \\title{${topic}}
      \\author{${name || 'Author Name'}\\\\ID: ${id || 'N/A'}\\\\${university || 'University Name'}}
      \\date{\\today}
    - **IMPORTANT:** Do NOT use the \`titlepage\` environment.
    `;
          case 'Full Page':
            return `
    - **Document Class:** Use \`\\documentclass[a4paper,12pt]{article}\`.
    - **Cover Page Method:** Create a visually distinct, full-page cover. Right after \`\\begin{document}\`, use \`\\thispagestyle{empty}\` and then construct the title page using \`\\centering\`, \`\\vfill\`, and font sizing commands (\`\\Huge\`, \`\\Large\`, etc.) to arrange the elements.
    - **No Page Number:** The cover page must not have a page number.
    - **After Cover:** After the cover page content, you **MUST** use \`\\clearpage\` and then \`\\pagenumbering{arabic}\` to reset numbering for the main report.
    - **IMPORTANT:** Do NOT use the \`titlepage\` environment or \`\\maketitle\`.
    `;
          case 'Standard':
          default:
            return `
    - **Document Class:** Use \`\\documentclass[a4paper]{article}\`.
    - **Cover Page Method:** Create a dedicated cover page using the \`titlepage\` environment (\`\\begin{titlepage}...\`\\end{titlepage}\`). Place this right after \`\\begin{document}\`.
    - **Inside \`titlepage\`:** Use \`\\centering\`, \`\\vfill\`, and font size commands for a professional layout. Example:
      \\begin{titlepage}
          \\centering
          \\vspace*{2cm}
          {\\Huge\\bfseries ${topic}\\}
          \\vfill
          {\\Large\\bfseries ${name || 'Author Name'}\\}
          \\large ${university || 'University Name'}
          \\vfill
          \\large
          ID: ${id || 'N/A'}\\\\
          Course: ${section || 'N/A'}\\\\
          ${additionalInfo ? `Note: ${additionalInfo}\\\\` : ''}
          \\vfill
          \\today
      \\end{titlepage}
    - **After Cover:** Immediately after \`\\end{titlepage}\`, you **MUST** use \`\\newpage\`.
    - **IMPORTANT:** Do NOT use \`\\maketitle\`.
    `;
        }
      })()
    }

    **PART B: THE MAIN REPORT STRUCTURE**
    - **CRUCIAL - AVOID REPETITION:**
      ${coverPageFormat === 'Formal Report'
          ? '- The report content begins after `\\maketitle`.'
          : '- The report content begins after the cover page (`\\end{titlepage}` or `\\clearpage`). You **MUST NOT** use `\\maketitle` or redefine title/author details.'
      }
    - The report must include a table of contents (\`\\tableofcontents\`), an abstract, an introduction, multiple main sections, and a conclusion.

    ---
    ### 3. CONTENT GENERATION (MOST IMPORTANT)
    ---
    - **WRITE REAL CONTENT IN ${language.toUpperCase()}:** Your primary task is to write a comprehensive and original report on the **Topic: "${topic}"** in the **${language}** language.
    - **NO PLACEHOLDER TEXT:** You are strictly forbidden from using any placeholder text (e.g., "Lorem Ipsum", "Pellentesque habitant morbi tristique", "insert text here", etc.). The entire body of the report—abstract, introduction, all sections, and conclusion—must be composed of meaningful, coherent sentences that are directly relevant to the topic.
    - **CONTENT DEPTH and PAGE COUNT:** The main report content (after the cover page) **MUST** be generated to be as close as possible to **${pages} pages** long. Adjust content depth and detail to meet this length.

    ---
    ### 4. STYLING & LATEX PACKAGES
    ---
    - **Document Class:** The \`\\documentclass\` **MUST** be determined by the "Cover Page Format" selection above.
    - You must include all necessary \`\\usepackage{...}\` declarations in the preamble based on the chosen theme and language.

    **Language-Specific Packages (CRITICAL):**
    ${
      language === 'arabic'
        ? `
    - For Arabic support, you **MUST** include these packages and commands **BEFORE** other styling packages:
      \\usepackage{polyglossia}
      \\setmainlanguage{arabic}
      \\setotherlanguage{english}
      \\usepackage{fontspec}
      \\setmainfont{Amiri}
    `
        : `
    - For English support, ensure these are included:
      \\usepackage[utf8]{inputenc}
      \\usepackage[T1]{fontenc}
    `
    }
    
    **Applying Theme: "${style}"**
    - **Modern:** \`\\usepackage[margin=1in]{geometry}\`, \`\\usepackage{helvet}\`, \`\\renewcommand{\\familydefault}{\\sfdefault}\`, \`\\usepackage{titlesec}\`, \`\\usepackage{hyperref}\`. \`\\hypersetup{colorlinks=true, linkcolor=blue, urlcolor=blue}\`. \`\\titleformat{\\section}{\\normalfont\\Large\\bfseries}{\\thesection}{1em}{}\`
    - **Classic:** \`\\usepackage[margin=1.2in]{geometry}\`, \`\\usepackage{charter}\`, \`\\usepackage{hyperref}\`.
    - **Minimalist:** \`\\usepackage[margin=1.5in]{geometry}\`, \`\\usepackage{hyperref}\`. Use \`\\pagestyle{plain}\`.
    - **Academic:** \`\\usepackage[margin=1in]{geometry}\`, \`\\usepackage{amsmath}\`, \`\\usepackage{bookman}\`, \`\\usepackage{graphicx}\`, \`\\usepackage{hyperref}\`. Include a bibliography.
    
    Now, generate the complete and compilable LaTeX file with real, substantive content in the specified language.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating report:", error);
    if (error instanceof Error) {
        return `Error from API: ${error.message}. Please check your API key and network connection.`;
    }
    return "An unknown error occurred while generating the report.";
  }
};

export const refineTopic = async (topic: string, language: string): Promise<string> => {
  if (!topic.trim()) {
    return topic;
  }

  const refinePrompt = `
    A user has provided the following topic for a report: "${topic}".
    The target language for the report is **${language}**.

    Your task is to refine this topic into a more professional, specific, and well-scoped report title. The refined title **must be in ${language}**.

    Examples (English):
    - User input: "AI and jobs"
    - Refined output: "The Impact of Artificial Intelligence on the Future of the Job Market: An Analysis of Automation and Skill Displacement"
    
    Examples (Arabic):
    - User input: "تأثير الذكاء الاصطناعي على الوظائف"
    - Refined output: "تحليل معمق لتأثيرات الذكاء الاصطناعي على مستقبل سوق العمل وتغير المهارات المطلوبة"

    Now, refine the user's topic: "${topic}". Respond with ONLY the refined topic string, and nothing else.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: refinePrompt,
      config: {
        systemInstruction: `You are a helpful research assistant specializing in creating professional report titles. Your output must be only the refined title text.`,
      }
    });
    // The response.text might contain quotes, let's remove them.
    return response.text.replace(/"/g, '').trim();
  } catch (error) {
    console.error("Error refining topic:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to refine topic: ${error.message}`);
    }
    throw new Error("An unknown error occurred while refining the topic.");
  }
};
