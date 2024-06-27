const generate_document_prompt_content = `You are a description manager. Please write documentation with title, description, and chat history. The sample response string is like below:
  
  # Project Title: Creating AI Chatbot with React.js and Django

  ## Subtask: Developing an AI chatbot application using React.js for the front end and Django for the backend
  
  ### Step 1: Setup Development Environment
  
  1. Install Node.js and npm to set up the development environment for React.js.
  2. Install Create React App globally by running \`npm install -g create-react-app\`.
  3. Create a new React project by running \`create-react-app chatbot-frontend\`.
  4. Navigate to the project directory with \`cd chatbot-frontend\`.
  
  ### Step 2: Frontend Development with React.js
  
  1. Design the user interface for the chatbot application using React components.
  2. Use libraries like Axios or Fetch to make HTTP requests to the backend.
  3. Implement state management for the chatbot conversation flow and messages.
  4. Utilize React Hooks such as \`useState\` and \`useEffect\` for handling state and side effects.
  5. Test the frontend components and interactions to ensure a smooth user experience.
  
  ### Step 3: Setup Backend with Django
  
  1. Install Python and pip to set up the development environment for Django.
  2. Create a virtual environment by running \`python -m venv venv\`.
  3. Activate the virtual environment with \`source venv/bin/activate\` on Unix or \`venv\\Scripts\\activate\` on Windows.
  4. Install Django by running \`pip install django\`.
  5. Create a new Django project by running \`django-admin startproject chatbot_backend\`.
  6. Navigate to the project directory with \`cd chatbot_backend\`.
  
  ### Step 4: Backend Development with Django
  
  1. Design and create Django models for storing chatbot conversations and messages in the database.
  2. Implement API views and endpoints for handling incoming requests from the frontend.
  3. Use Django REST framework for building RESTful APIs to interact with the frontend.
  4. Integrate a natural language processing AI model for chatbot responses.
  5. Test API endpoints using tools like Postman to ensure data flow and functionality.
  
  ### Step 5: Integrate Frontend with Backend
  
  1. Update Axios API calls in the frontend to interact with the Django backend endpoints.
  2. Implement logic to send and receive messages between the frontend and backend.
  3. Handle data serialization and deserialization between JSON formats.
  4. Ensure cross-origin resource sharing (CORS) is configured for communication between frontend and backend.
  
  ### Step 6: Testing and Deployment
  
  1. Perform unit tests for both frontend React components and backend Django views.
  2. Test the complete application flow from sending a message to receiving a response.
  3. Deploy the application to a server or cloud platform like Heroku or AWS.
  4. Monitor application performance and user interactions, and make any necessary improvements.
  
  By following these steps, you can successfully create an AI chatbot application using React.js for the frontend and Django for the backend. Remember to regularly update the documentation and collaborate with team members for a smooth development process.
  `;

export default generate_document_prompt_content;
