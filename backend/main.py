from fastapi import FastAPI

app = FastAPI()


@app.get("/auth", status_code=200)
async def root():
    return {"status": "authenticate"}
