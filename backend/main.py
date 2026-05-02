from fastapi import FastAPI
from pydantic import BaseModel

VALID_EMAIL = "test@gmail.com"
VALID_PASSWORD = "12345"

app = FastAPI()

class LoginForm(BaseModel):
    email: str
    password: str

@app.post("/auth", status_code=200)
async def root(form: LoginForm):
    if (form.email == VALID_EMAIL and form.password == VALID_PASSWORD):
        return {"status": "ok"}
    raise HTTPExecption(
        status_code=status.HTTP_401_UNAUTHRIZED,
        detail="Invalid email or password"
    )
