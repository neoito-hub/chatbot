# Chatbot

GPT chatbot with Qdrant and APIs for adding context

## Steps:

1. Copy `.env.example` and create a `.env` in `packages/chatbot-context`.
2. Similarly, copy `.env.example` and create a `.env` in `packages/chatbot`.
3. Then run `docker-compose up` (which will have the containers running on your machine).
4. Import the Postman `collection.json` inside the `/docs` folder.
5. Create a project using the "create project" API given in the Postman collection.
6. Now you can list your projects using the "list projects" API.
7. Then copy the project ID of the project you want to scrape the data for context.
8. Use the APIs `upload`, `github_upload`, `upload_csv`, `upload_pdf`, `upload_youtube_url`, `upload_audio` to supply context via request body or form data.
9. You can then see the vectors uploaded at [http://localhost:6333](http://localhost:6333).
10. Go to `packages/chatbot` and replace `NEXT_PUBLIC_PROJECT_ID` with your newly created project ID.
11. Then go to [http://localhost:3000](http://localhost:3000) and ask questions to your chatbot.
