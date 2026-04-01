from fastapi import FastAPI, Request
import logging
import time
import random

app = FastAPI()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | %(levelname)s | %(message)s'
)

logger = logging.getLogger("fastapi-demo")


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()

    response = await call_next(request)

    process_time = time.time() - start_time

    logger.info(
        f"method={request.method} path={request.url.path} status_code={response.status_code} duration={process_time:.4f}s"
    )

    return response


@app.get("/")
def root():
    logger.info("Root endpoint called")
    return {"message": "FastAPI OpenObserve Demo Running"}


@app.get("/health")
def health():
    logger.info("Health check called")
    return {"status": "ok"}


@app.get("/random")
def random_number():
    num = random.randint(1, 100)
    logger.info(f"Generated random number: {num}")
    return {"random_number": num}


@app.get("/error")
def error():
    logger.error("Intentional error endpoint called!")
    raise Exception("This is an intentional error for OpenObserve testing")


@app.get("/slow")
def slow():
    delay = random.randint(2, 5)
    logger.warning(f"Slow endpoint called, sleeping for {delay} seconds")
    time.sleep(delay)
    return {"message": f"Response delayed by {delay} seconds"}