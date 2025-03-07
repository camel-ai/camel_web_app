from pydantic import BaseModel, Field

class Human(BaseModel):
    apiKey: str
    timeout: str
    level: str
    email: bool
    browser: bool
    slack: bool
    fileSystemAccess: str
    externalAPICall: str
