# BloggerBlog

BloggerBlog is a modern, full-stack blogging platform built with React and Appwrite. It offers a seamless writing and reading experience, featuring a rich text editor, user authentication, and responsive design. Inspired by Hitesh Choudhary's Chai aur React series, this project expands upon the foundational concepts with enhanced features and a revamped UI.

🚀 Features
- User Authentication: Secure login and registration system using Appwrite.
- Rich Text Editor: Create and format blog posts effortlessly with TinyMCE.
- Responsive Design: Optimized for desktops, tablets, and mobile devices using Tailwind CSS.
- State Management: Efficient handling of application state with Redux Toolkit.
- Form Handling: Simplified form validation and management using React Hook Form.
- Routing: Seamless navigation with React Router DOM.
- Dark Mode: Toggle between light and dark themes for better accessibility.

🛠️ Technologies Used
**Frontend:**
- React
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- React Hook Form
- TinyMCE

**Backend:**
- Appwrite

📦 Getting Started
**Prerequisites**
- Node.js installed
- Appwrite instance running locally or accessible via cloud

**Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/SugamChaudharry/BloggerBlog.git
   cd BloggerBlog
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Rename `.env.example` to `.env`
   - Fill in the required environment variables:
     ```env
      VITE_APPWRITE_URL="url"
      VITE_APPWRITE_PROJECT_ID="project id"
      VITE_APPWRITE_COLLECTION_ID="collection id"
      VITE_APPWRITE_DATABASE_ID="database id"
      VITE_APPWRITE_BUCKET_ID="bucket id"
      VITE_RET_API="key"
     ```

4. Run the application:
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:5173](http://localhost:5173).

�� Project Structure
