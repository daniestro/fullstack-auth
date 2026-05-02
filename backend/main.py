from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class LoginForm(BaseModel):
    email: str
    password: str

@app.post("/auth", status_code=200)
async def root(form: LoginForm):
    return {"status": "authenticate"}
