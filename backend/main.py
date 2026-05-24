from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    question: str
    style: str

@app.get("/")
def home():
    return {"message": "Human-AI Backend Running"}

@app.post("/ask-ai")
def ask_ai(data: QuestionRequest):
    question = data.question

    if data.style == "simple":
        response = (
            f"AI can help with this by giving quick, clear guidance about: {question}"
        )

    elif data.style == "detailed":
        response = (
            f"Artificial Intelligence can support this topic by analyzing the user's request, "
            f"identifying relevant patterns, and presenting structured guidance. For the question "
            f"'{question}', an AI system could provide explanations, examples, recommendations, "
            f"and accessibility-friendly support to improve understanding."
        )

    else:
        response = (
            f"Think of AI like a helpful assistant. For your question, '{question}', "
            f"it can explain things in a friendly way, reduce confusion, and guide you step by step."
        )

    return {"response": response}