# 📄 Interview AI Bot

A lightweight AI-powered resume analyzer built with Angular, Node.js, and a locally hosted LLaMA 3.2 model via Ollama.

## 🚀 Features

- Upload your resume (PDF)
- Extracts text from the resume
- Generate a concise summary
- Rate the resume on a scale of 1 to 5
- Generate a 10-question interview questionnaire tailored to the resume
- Powered by **LLaMA 3.2** running **locally** via Ollama (no cloud/OpenAI APIs)

## 🧠 Tech Stack

- **Frontend**: Angular
- **Backend**: Node.js + Express
- **AI Model**: Ollama (LLaMA 3.2)
- **PDF Parsing**: pdf-parse
- **File Upload**: multer

## 🛠️ Setup Instructions

### 1. Install and Run LLaMA 3.2 via Ollama (on macOS)

```bash
brew install ollama
ollama run llama3.2
