# chatbot
Gpt chatbot with qdrant and apis for adding context

Steps:
1 Copy .env.example and create a .env in packages/chatbot-context
2 Similarly copy .env.example and create .env in packages/chatbot.
3 Then run docker compose up (which will have the containers running in your machine)
4 Import the postman collection.json inside /docs folder
5 Create a project using the create project api given in the postman
collection
6 Now you can list your projects using the list projects api
7 Then copy the project id of the project you want to scrape the 
data for context
8 THen use the apis upload,github_upload,upload_csv,upload_pdf,upload_youtube_url,upload_audio to supply context via request body or 
form data.
9 You can the see the vectors uploaded at http://localhost:6333
10 Go to packages/chatbot and replace NEXT_PUBLIC_PROJECT_ID with your project_id created newly 
11 Then go to http://localhost:3000 and  ask questions to your chatbot 