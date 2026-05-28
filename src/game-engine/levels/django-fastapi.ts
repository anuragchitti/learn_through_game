import { LevelDefinition } from "../types";

export const djangoFastapiLevels: LevelDefinition[] = [
  // ─── Level 1: Django vs FastAPI Overview ───────────────────────────────────
  {
    id: "django-fastapi-1",
    courseId: "django-fastapi",
    number: 1,
    title: "Django vs FastAPI — Choose Your Weapon",
    description: "Two powerful Python web frameworks. Django is batteries-included; FastAPI is lightning-fast and async-first.",
    concept: "Django vs FastAPI Overview",
    conceptExplanation:
      "Python has two dominant web frameworks for building APIs and web apps:\n\n" +
      "Django (2005):\n" +
      "• Full-stack, 'batteries-included' framework\n" +
      "• Built-in ORM, admin panel, auth system, migrations\n" +
      "• Follows the MTV pattern (Model-Template-View)\n" +
      "• Best for: content-heavy apps, rapid prototyping, teams that want conventions\n\n" +
      "FastAPI (2018):\n" +
      "• Micro-framework focused on API performance\n" +
      "• Async-first (ASGI), built on Starlette + Pydantic\n" +
      "• Auto-generates OpenAPI/Swagger docs\n" +
      "• Best for: high-throughput APIs, microservices, ML model serving\n\n" +
      "Key differences:\n" +
      "• Speed: FastAPI is ~3× faster than Django REST Framework\n" +
      "• Learning curve: Django is steeper but more feature-rich\n" +
      "• Async: FastAPI native, Django added it in 3.1+\n" +
      "• Docs: FastAPI auto-generates them; Django needs drf-spectacular",
    codeExample: `# Django hello-world view (views.py)
from django.http import JsonResponse

def hello(request):
    return JsonResponse({"message": "Hello from Django!"})

# urls.py
from django.urls import path
from . import views
urlpatterns = [path("hello/", views.hello)]


# FastAPI hello-world (main.py)
from fastapi import FastAPI

app = FastAPI()

@app.get("/hello")
def hello():
    return {"message": "Hello from FastAPI!"}

# Run with: uvicorn main:app --reload`,
    starterCode: `// Navigate the landscape of Python web frameworks
const frameworks = [
  { name: "Django",   dir: "right" },
  { name: "FastAPI",  dir: "right" },
  { name: "Compare",  dir: "right" },
];

for (const fw of frameworks) {
  hero.move(fw.dir);
}
hero.move("down");
hero.move("down");
hero.move("right");
`,
    solutionCode: `const frameworks = [
  { name: "Django",   dir: "right" },
  { name: "FastAPI",  dir: "right" },
  { name: "Compare",  dir: "right" },
];

for (const fw of frameworks) {
  hero.move(fw.dir);
}
hero.move("down");
hero.move("down");
hero.move("right");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "wall",  "wall",  "gem",   "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Move right×3 to grab gems, then down×2, then right to reach the exit.",
    tip: "Choose Django when you need an admin panel out of the box. Choose FastAPI when raw API performance and auto-docs matter.",
  },

  // ─── Level 2: Django Models & ORM ─────────────────────────────────────────
  {
    id: "django-fastapi-2",
    courseId: "django-fastapi",
    number: 2,
    title: "Django Models & ORM",
    description: "Django's ORM maps Python classes to database tables — no raw SQL needed.",
    concept: "Django Models & ORM",
    conceptExplanation:
      "Django's Object-Relational Mapper (ORM) lets you define database schemas as Python classes.\n\n" +
      "A Model class:\n" +
      "• Inherits from django.db.models.Model\n" +
      "• Each class attribute = a database column\n" +
      "• Django auto-creates/manages the table via migrations\n\n" +
      "Field types:\n" +
      "• CharField(max_length=N) — VARCHAR\n" +
      "• TextField() — unlimited text\n" +
      "• IntegerField() — integer\n" +
      "• BooleanField() — true/false\n" +
      "• DateTimeField(auto_now_add=True) — timestamp\n" +
      "• ForeignKey(Model, on_delete=CASCADE) — foreign key\n\n" +
      "QuerySet API:\n" +
      "• Model.objects.all() — fetch every row\n" +
      "• Model.objects.filter(field=value) — WHERE clause\n" +
      "• Model.objects.get(pk=1) — single row or 404\n" +
      "• Model.objects.create(field=value) — INSERT\n" +
      "• instance.save() — UPDATE\n" +
      "• instance.delete() — DELETE",
    codeExample: `# models.py
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=300)
    author = models.ForeignKey(
        Author, on_delete=models.CASCADE, related_name="books"
    )
    published = models.BooleanField(default=False)
    pages = models.IntegerField()

# Shell / view usage
author = Author.objects.create(name="Ada", email="ada@example.com")
books = Book.objects.filter(author=author, published=True)
book = Book.objects.get(pk=42)
book.published = True
book.save()`,
    starterCode: `// Define models and traverse the ORM query path
const ormSteps = [
  { step: "CharField",   dir: "right" },
  { step: "ForeignKey",  dir: "right" },
  { step: "filter()",    dir: "right" },
  { step: "save()",      dir: "down" },
  { step: "delete()",    dir: "right" },
];

for (const s of ormSteps) {
  hero.move(s.dir);
}
hero.move("down");
hero.move("right");
hero.move("right");
`,
    solutionCode: `const ormSteps = [
  { step: "CharField",   dir: "right" },
  { step: "ForeignKey",  dir: "right" },
  { step: "filter()",    dir: "right" },
  { step: "save()",      dir: "down" },
  { step: "delete()",    dir: "right" },
];

for (const s of ormSteps) {
  hero.move(s.dir);
}
hero.move("down");
hero.move("right");
hero.move("right");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Collect 3 gems going right, navigate down twice, then collect 3 more gems right to the exit.",
    tip: "Run `python manage.py makemigrations && python manage.py migrate` after every model change to sync your database schema.",
  },

  // ─── Level 3: Django Views & URLs ─────────────────────────────────────────
  {
    id: "django-fastapi-3",
    courseId: "django-fastapi",
    number: 3,
    title: "Django Views & URLs",
    description: "Views handle HTTP requests; the URLconf maps paths to views.",
    concept: "Django Views & URL Routing",
    conceptExplanation:
      "Django's request-response cycle:\n" +
      "1. Browser sends an HTTP request\n" +
      "2. Django matches the URL against urlpatterns\n" +
      "3. The matched view function is called with the request\n" +
      "4. View returns an HttpResponse\n\n" +
      "Function-Based Views (FBV):\n" +
      "• Simple Python functions that accept request and return response\n" +
      "• Use @require_http_methods(['GET','POST']) decorator\n\n" +
      "Class-Based Views (CBV):\n" +
      "• Inherit from View (or generic views like ListView, DetailView)\n" +
      "• Override get(), post(), put(), delete() methods\n" +
      "• More reusable but more indirection\n\n" +
      "URL patterns:\n" +
      "• path('articles/', views.list) — exact match\n" +
      "• path('articles/<int:pk>/', views.detail) — capture parameter\n" +
      "• re_path(r'^legacy/(?P<slug>[\\w-]+)/$', views.legacy) — regex",
    codeExample: `# views.py
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Article
import json

# Function-Based View
def article_list(request):
    if request.method == "GET":
        articles = list(Article.objects.values("id", "title"))
        return JsonResponse(articles, safe=False)

# Class-Based View
@method_decorator(csrf_exempt, name="dispatch")
class ArticleDetail(View):
    def get(self, request, pk):
        try:
            a = Article.objects.get(pk=pk)
            return JsonResponse({"id": a.id, "title": a.title})
        except Article.DoesNotExist:
            return JsonResponse({"error": "Not found"}, status=404)

    def delete(self, request, pk):
        Article.objects.filter(pk=pk).delete()
        return JsonResponse({}, status=204)

# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("articles/",        views.article_list),
    path("articles/<int:pk>/", views.ArticleDetail.as_view()),
]`,
    starterCode: `// Wire up views to URL patterns
const routes = [
  { path: "GET /articles/",     dir: "right" },
  { path: "POST /articles/",    dir: "right" },
  { path: "GET /articles/<pk>", dir: "down"  },
  { path: "DELETE /<pk>",       dir: "right" },
];

for (const r of routes) {
  hero.move(r.dir);
}
hero.move("right");
hero.move("right");
hero.move("down");
hero.move("right");
`,
    solutionCode: `const routes = [
  { path: "GET /articles/",     dir: "right" },
  { path: "POST /articles/",    dir: "right" },
  { path: "GET /articles/<pk>", dir: "down"  },
  { path: "DELETE /<pk>",       dir: "right" },
];

for (const r of routes) {
  hero.move(r.dir);
}
hero.move("right");
hero.move("right");
hero.move("down");
hero.move("right");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "wall",  "wall"],
      ["wall",  "wall",  "wall",  "empty", "wall",  "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "wall",  "wall",  "gem",   "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×2 (gems), down, right×3 (gems), down, right to reach exit gem and door.",
    tip: "Prefer Class-Based Views for standard CRUD — Django's generic views (ListView, CreateView) give you most logic for free.",
  },

  // ─── Level 4: Django REST Framework ───────────────────────────────────────
  {
    id: "django-fastapi-4",
    courseId: "django-fastapi",
    number: 4,
    title: "Django REST Framework",
    description: "DRF adds serializers, viewsets, and routers to turn Django models into a full REST API.",
    concept: "Django REST Framework (DRF)",
    conceptExplanation:
      "Django REST Framework is the de-facto standard for building REST APIs with Django.\n\n" +
      "Core components:\n\n" +
      "Serializers:\n" +
      "• Convert model instances <-> JSON\n" +
      "• Validate incoming data (like Django forms)\n" +
      "• ModelSerializer auto-generates fields from a model\n\n" +
      "ViewSets:\n" +
      "• ModelViewSet provides list/create/retrieve/update/destroy\n" +
      "• ReadOnlyModelViewSet for GET-only APIs\n" +
      "• Override individual actions as needed\n\n" +
      "Routers:\n" +
      "• DefaultRouter auto-generates URL patterns from a ViewSet\n" +
      "• Registers <prefix>/ and <prefix>/<pk>/ automatically\n\n" +
      "Permissions & Authentication:\n" +
      "• IsAuthenticated, IsAdminUser, AllowAny\n" +
      "• TokenAuthentication, SessionAuthentication, JWT (via simplejwt)",
    codeExample: `# serializers.py
from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "title", "body", "author", "created_at"]
        read_only_fields = ["id", "created_at"]

# views.py
from rest_framework import viewsets, permissions
from .models import Article
from .serializers import ArticleSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by("-created_at")
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

# urls.py
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet

router = DefaultRouter()
router.register(r"articles", ArticleViewSet)
urlpatterns = router.urls
# Auto-creates: GET/POST /articles/  and  GET/PUT/PATCH/DELETE /articles/<pk>/`,
    starterCode: `// DRF: serializer → viewset → router pipeline
const pipeline = [
  { step: "Serializer",  dir: "right" },
  { step: "ViewSet",     dir: "right" },
  { step: "Router",      dir: "right" },
  { step: "Permission",  dir: "down"  },
  { step: "Response",    dir: "right" },
];

for (const p of pipeline) {
  hero.move(p.dir);
}
hero.move("down");
hero.move("right");
`,
    solutionCode: `const pipeline = [
  { step: "Serializer",  dir: "right" },
  { step: "ViewSet",     dir: "right" },
  { step: "Router",      dir: "right" },
  { step: "Permission",  dir: "down"  },
  { step: "Response",    dir: "right" },
];

for (const p of pipeline) {
  hero.move(p.dir);
}
hero.move("down");
hero.move("right");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "wall",  "wall",  "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "wall",  "wall",  "gem",   "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3, down, right, down, right to exit.",
    tip: "A single ModelViewSet + DefaultRouter replaces 5+ URL patterns and views. Use it for standard CRUD; override only what differs.",
  },

  // ─── Level 5: FastAPI Basics ───────────────────────────────────────────────
  {
    id: "django-fastapi-5",
    courseId: "django-fastapi",
    number: 5,
    title: "FastAPI Basics",
    description: "FastAPI uses Python type hints to auto-validate requests and generate Swagger docs.",
    concept: "FastAPI Fundamentals",
    conceptExplanation:
      "FastAPI is built on two pillars:\n" +
      "• Starlette — ASGI web toolkit (routing, middleware, WebSockets)\n" +
      "• Pydantic — data validation via Python type hints\n\n" +
      "Defining endpoints:\n" +
      "• @app.get('/path') — GET handler\n" +
      "• @app.post('/path') — POST handler\n" +
      "• @app.put('/path/{id}') — PUT handler\n" +
      "• @app.delete('/path/{id}') — DELETE handler\n\n" +
      "Path & query parameters:\n" +
      "• Path param: /items/{item_id} → def get(item_id: int)\n" +
      "• Query param: /items?skip=0&limit=10 → def get(skip: int = 0, limit: int = 10)\n\n" +
      "Response model:\n" +
      "• @app.get('/items', response_model=List[Item]) — controls output shape\n\n" +
      "Auto-generated docs:\n" +
      "• Swagger UI: http://localhost:8000/docs\n" +
      "• ReDoc:       http://localhost:8000/redoc",
    codeExample: `# main.py
from fastapi import FastAPI, HTTPException
from typing import List

app = FastAPI(title="My API", version="1.0.0")

# In-memory store (use a DB in production)
items: dict[int, dict] = {}
next_id = 1

@app.get("/items", response_model=List[dict])
def list_items(skip: int = 0, limit: int = 10):
    return list(items.values())[skip : skip + limit]

@app.get("/items/{item_id}")
def get_item(item_id: int):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]

@app.post("/items", status_code=201)
def create_item(name: str, price: float):
    global next_id
    items[next_id] = {"id": next_id, "name": name, "price": price}
    next_id += 1
    return items[next_id - 1]

# Run: uvicorn main:app --reload`,
    starterCode: `// FastAPI: decorators + type hints = auto-validated API
const endpoints = [
  { method: "GET /items",      dir: "right" },
  { method: "POST /items",     dir: "right" },
  { method: "GET /items/{id}", dir: "right" },
];

for (const ep of endpoints) {
  hero.move(ep.dir);
}
hero.move("down");
hero.move("down");
hero.move("right");
hero.move("right");
`,
    solutionCode: `const endpoints = [
  { method: "GET /items",      dir: "right" },
  { method: "POST /items",     dir: "right" },
  { method: "GET /items/{id}", dir: "right" },
];

for (const ep of endpoints) {
  hero.move(ep.dir);
}
hero.move("down");
hero.move("down");
hero.move("right");
hero.move("right");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "wall",  "gem",   "gem",   "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3 (gems), down×2, right×2 (gems) to reach exit.",
    tip: "FastAPI validates path and query parameters automatically. If a client sends a string where you declared int, FastAPI returns a 422 Unprocessable Entity — no manual checks needed.",
  },

  // ─── Level 6: FastAPI Pydantic Models ─────────────────────────────────────
  {
    id: "django-fastapi-6",
    courseId: "django-fastapi",
    number: 6,
    title: "FastAPI & Pydantic Models",
    description: "Pydantic BaseModel defines request/response schemas with full validation.",
    concept: "Pydantic Models for Request & Response",
    conceptExplanation:
      "Pydantic is FastAPI's validation engine. You define data shapes as Python classes.\n\n" +
      "BaseModel basics:\n" +
      "• Inherit from pydantic.BaseModel\n" +
      "• Use Python type hints for fields: str, int, float, bool, list, dict\n" +
      "• Optional[str] = None — optional field with default None\n" +
      "• Field(gt=0) — add constraints (greater-than, min_length, regex...)\n\n" +
      "Request body:\n" +
      "• Declare a Pydantic model as a parameter → FastAPI reads JSON body\n" +
      "• Access validated data as Python attributes: item.name, item.price\n\n" +
      "Response model:\n" +
      "• @app.post('/items', response_model=ItemOut) — strip sensitive fields\n\n" +
      "Nested models & validators:\n" +
      "• Models can contain other models\n" +
      "• @validator('field') — custom validation logic\n" +
      "• model_validator(mode='after') — cross-field validation (v2)",
    codeExample: `from fastapi import FastAPI
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime

app = FastAPI()

class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8)
    age: Optional[int] = Field(None, ge=0, le=150)

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}  # Pydantic v2

class UserDB(UserCreate):
    id: int
    hashed_password: str
    created_at: datetime

@app.post("/users", response_model=UserOut, status_code=201)
def create_user(user: UserCreate):
    # password is validated; response strips it via UserOut
    db_user = UserDB(
        **user.model_dump(),
        id=1,
        hashed_password="hashed_" + user.password,
        created_at=datetime.utcnow(),
    )
    return db_user`,
    starterCode: `// Pydantic: type-safe request/response pipeline
const models = [
  { name: "UserCreate",  dir: "right" },
  { name: "validators",  dir: "right" },
  { name: "UserOut",     dir: "down"  },
  { name: "response",    dir: "right" },
  { name: "strip",       dir: "right" },
];

for (const m of models) {
  hero.move(m.dir);
}
hero.move("down");
hero.move("left");
hero.move("left");
`,
    solutionCode: `const models = [
  { name: "UserCreate",  dir: "right" },
  { name: "validators",  dir: "right" },
  { name: "UserOut",     dir: "down"  },
  { name: "response",    dir: "right" },
  { name: "strip",       dir: "right" },
];

for (const m of models) {
  hero.move(m.dir);
}
hero.move("down");
hero.move("left");
hero.move("left");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "gem",   "gem",   "wall"],
      ["wall",  "exit",  "gem",   "empty", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×2 (gems), down, right, right (gems), down, left×2 (gem then exit).",
    tip: "Use separate schemas for Create/Update/Out — never expose hashed passwords or internal IDs in the response model.",
  },

  // ─── Level 7: FastAPI Async & Dependency Injection ────────────────────────
  {
    id: "django-fastapi-7",
    courseId: "django-fastapi",
    number: 7,
    title: "FastAPI Async & Dependencies",
    description: "async/await lets FastAPI handle thousands of concurrent requests; Depends() manages shared resources.",
    concept: "Async Endpoints & Dependency Injection",
    conceptExplanation:
      "FastAPI supports both sync and async route handlers.\n\n" +
      "When to use async:\n" +
      "• Calling an async database library (SQLAlchemy async, Motor, asyncpg)\n" +
      "• Making HTTP calls with httpx or aiohttp\n" +
      "• Any I/O-bound operation that supports await\n" +
      "• If you use a synchronous ORM (e.g. Django ORM) → use sync def\n\n" +
      "Dependency Injection with Depends():\n" +
      "• A 'dependency' is any callable FastAPI can call before your handler\n" +
      "• Common uses: DB session, auth token, pagination params\n" +
      "• Dependencies can depend on other dependencies (tree structure)\n" +
      "• yield-based dependencies act like context managers (auto cleanup)\n\n" +
      "DB session pattern:\n" +
      "• Create session → yield to handler → close session (even on error)",
    codeExample: `from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+asyncpg://user:pass@localhost/db"
engine = create_async_engine(DATABASE_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession)

app = FastAPI()

# Dependency: provides a DB session per request
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session  # session is closed after handler returns

# Another dependency: extract & validate current user
async def get_current_user(token: str, db: AsyncSession = Depends(get_db)):
    user = await db.execute(...)  # lookup token
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user

# Route handler uses both dependencies
@app.get("/me")
async def read_me(current_user=Depends(get_current_user)):
    return {"username": current_user.username}`,
    starterCode: `// Async + DI: compose dependencies like building blocks
const deps = [
  { name: "get_db",           dir: "right" },
  { name: "get_current_user", dir: "right" },
  { name: "yield session",    dir: "right" },
  { name: "route handler",    dir: "down"  },
  { name: "await response",   dir: "right" },
  { name: "cleanup",          dir: "right" },
];

for (const d of deps) {
  hero.move(d.dir);
}
hero.move("down");
`,
    solutionCode: `const deps = [
  { name: "get_db",           dir: "right" },
  { name: "get_current_user", dir: "right" },
  { name: "yield session",    dir: "right" },
  { name: "route handler",    dir: "down"  },
  { name: "await response",   dir: "right" },
  { name: "cleanup",          dir: "right" },
];

for (const d of deps) {
  hero.move(d.dir);
}
hero.move("down");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "wall",  "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3 (gems), down, left×2, down, right×3 (gems), down to exit.",
    tip: "Use async def only for I/O-bound work with async libraries. Mixing sync blocking calls inside async def will block FastAPI's event loop.",
  },

  // ─── Level 8: Authentication with JWT ─────────────────────────────────────
  {
    id: "django-fastapi-8",
    courseId: "django-fastapi",
    number: 8,
    title: "Authentication with JWT",
    description: "JSON Web Tokens let APIs authenticate stateless requests — no server-side sessions needed.",
    concept: "JWT Authentication in Django & FastAPI",
    conceptExplanation:
      "JWT (JSON Web Token) is the standard for stateless API authentication.\n\n" +
      "JWT structure (three Base64-encoded parts separated by dots):\n" +
      "• Header — algorithm (HS256, RS256)\n" +
      "• Payload — claims: sub (user id), exp (expiry), custom data\n" +
      "• Signature — HMAC of header+payload with secret key\n\n" +
      "Flow:\n" +
      "1. Client sends credentials to POST /auth/login\n" +
      "2. Server validates → issues access_token (short-lived) + refresh_token\n" +
      "3. Client attaches token: Authorization: Bearer <token>\n" +
      "4. Server verifies signature + expiry on every request — no DB lookup\n\n" +
      "Django (simplejwt):\n" +
      "• pip install djangorestframework-simplejwt\n" +
      "• TokenObtainPairView, TokenRefreshView out-of-the-box\n\n" +
      "FastAPI (python-jose + passlib):\n" +
      "• pip install python-jose[cryptography] passlib[bcrypt]\n" +
      "• Create token with jose.jwt.encode(); verify with jose.jwt.decode()",
    codeExample: `# FastAPI JWT implementation
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

SECRET_KEY = "super-secret-change-in-prod"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def create_access_token(data: dict) -> str:
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    user_id: int = payload.get("sub")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user_id`,
    starterCode: `// JWT flow: login → sign → attach → verify
const flow = [
  { step: "POST /login",   dir: "right" },
  { step: "bcrypt verify", dir: "right" },
  { step: "jwt.encode",    dir: "right" },
  { step: "Bearer token",  dir: "down"  },
  { step: "jwt.decode",    dir: "right" },
  { step: "get_user",      dir: "right" },
];

for (const f of flow) {
  hero.move(f.dir);
}
hero.move("down");
`,
    solutionCode: `const flow = [
  { step: "POST /login",   dir: "right" },
  { step: "bcrypt verify", dir: "right" },
  { step: "jwt.encode",    dir: "right" },
  { step: "Bearer token",  dir: "down"  },
  { step: "jwt.decode",    dir: "right" },
  { step: "get_user",      dir: "right" },
];

for (const f of flow) {
  hero.move(f.dir);
}
hero.move("down");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "wall",  "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3 (gems), down, left×2, down, right×3 (gems), down to exit.",
    tip: "Never store the JWT secret in source code. Use environment variables and rotate secrets if compromised. Set short expiry (15-30 min) on access tokens.",
  },

  // ─── Level 9: Testing Django/FastAPI Apps ─────────────────────────────────
  {
    id: "django-fastapi-9",
    courseId: "django-fastapi",
    number: 9,
    title: "Testing Django & FastAPI Apps",
    description: "Both frameworks provide test clients so you can assert HTTP responses without a running server.",
    concept: "API Testing with pytest",
    conceptExplanation:
      "Testing strategy for API backends:\n\n" +
      "Unit tests — test individual functions/models in isolation\n" +
      "Integration tests — test endpoints including DB interaction\n" +
      "E2E tests — test full stack (not covered here)\n\n" +
      "Django:\n" +
      "• Use TestCase from django.test — wraps each test in a transaction\n" +
      "• self.client is a built-in test HTTP client\n" +
      "• APITestCase from rest_framework.test for DRF response helpers\n" +
      "• pytest-django: @pytest.mark.django_db decorator for DB access\n\n" +
      "FastAPI:\n" +
      "• TestClient from starlette.testclient (wraps requests library)\n" +
      "• Override dependencies in tests: app.dependency_overrides[get_db] = ...\n" +
      "• Use pytest fixtures for client, DB setup/teardown\n" +
      "• httpx.AsyncClient for testing async endpoints properly\n\n" +
      "Key assertions:\n" +
      "• assert response.status_code == 200\n" +
      "• assert response.json()['field'] == expected",
    codeExample: `# FastAPI tests with pytest
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app, get_db
from database import Base

# Use an in-memory SQLite DB for tests
SQLALCHEMY_TEST_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_TEST_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

client = TestClient(app)

def test_create_item():
    resp = client.post("/items", json={"name": "Widget", "price": 9.99})
    assert resp.status_code == 201
    data = resp.json()
    assert data["name"] == "Widget"
    assert "id" in data

def test_get_missing_item():
    resp = client.get("/items/9999")
    assert resp.status_code == 404`,
    starterCode: `// Test pyramid: unit → integration → e2e
const tests = [
  { name: "override_db",   dir: "right" },
  { name: "test_create",   dir: "right" },
  { name: "assert_201",    dir: "right" },
  { name: "test_list",     dir: "down"  },
  { name: "assert_200",    dir: "right" },
  { name: "teardown",      dir: "right" },
];

for (const t of tests) {
  hero.move(t.dir);
}
hero.move("down");
`,
    solutionCode: `const tests = [
  { name: "override_db",   dir: "right" },
  { name: "test_create",   dir: "right" },
  { name: "assert_201",    dir: "right" },
  { name: "test_list",     dir: "down"  },
  { name: "assert_200",    dir: "right" },
  { name: "teardown",      dir: "right" },
];

for (const t of tests) {
  hero.move(t.dir);
}
hero.move("down");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "wall",  "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3 (gems), down, left×2, down, right×3 (gems), down to exit.",
    tip: "Always override the real database dependency in tests. Never run tests against a production database.",
  },

  // ─── Level 10: Grand Finale — Build a Complete API ────────────────────────
  {
    id: "django-fastapi-10",
    courseId: "django-fastapi",
    number: 10,
    title: "Grand Finale: Build a Complete API",
    description: "Combine models, serializers, auth, and tests to ship a production-ready API.",
    concept: "Full-Stack API: Models + Auth + CRUD + Tests",
    conceptExplanation:
      "A production-ready API brings together every concept from this course:\n\n" +
      "Project structure (FastAPI):\n" +
      "app/\n" +
      "  main.py          # FastAPI app, middleware, routers\n" +
      "  database.py      # engine, session factory, Base\n" +
      "  models.py        # SQLAlchemy ORM models\n" +
      "  schemas.py       # Pydantic request/response models\n" +
      "  routers/\n" +
      "    auth.py        # /auth/login, /auth/register\n" +
      "    items.py       # CRUD /items\n" +
      "  deps.py          # get_db, get_current_user\n" +
      "tests/\n" +
      "  conftest.py      # shared fixtures\n" +
      "  test_items.py    # endpoint tests\n\n" +
      "Production checklist:\n" +
      "• Environment variables via python-dotenv / pydantic BaseSettings\n" +
      "• Alembic migrations for schema versioning\n" +
      "• Structured logging (structlog or loguru)\n" +
      "• CORS middleware configured per environment\n" +
      "• Rate limiting (slowapi for FastAPI)\n" +
      "• Health-check endpoint GET /healthz\n" +
      "• Docker + docker-compose for local dev\n" +
      "• CI pipeline: lint (ruff) + type-check (mypy) + pytest",
    codeExample: `# app/main.py — production-ready FastAPI app
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .database import engine, Base
from .routers import auth, items

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables (use Alembic in production)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown: close connections
    await engine.dispose()

app = FastAPI(
    title="My Production API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://myapp.com"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(items.router, prefix="/items", tags=["items"])

@app.get("/healthz")
async def health():
    return {"status": "ok"}

# app/routers/items.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from .. import crud, schemas
from ..deps import get_db, get_current_user

router = APIRouter()

@router.get("/", response_model=list[schemas.ItemOut])
async def list_items(skip: int = 0, limit: int = 20,
                     db: AsyncSession = Depends(get_db)):
    return await crud.get_items(db, skip=skip, limit=limit)

@router.post("/", response_model=schemas.ItemOut, status_code=201)
async def create_item(item: schemas.ItemCreate,
                      db: AsyncSession = Depends(get_db),
                      user=Depends(get_current_user)):
    return await crud.create_item(db, item, owner_id=user.id)`,
    starterCode: `// The full API journey: every gem is a milestone
const milestones = [
  { name: "Models",      dir: "right" },
  { name: "Schemas",     dir: "right" },
  { name: "Auth",        dir: "right" },
  { name: "CRUD router", dir: "down"  },
  { name: "Middleware",  dir: "right" },
  { name: "Tests",       dir: "right" },
];

for (const m of milestones) {
  hero.move(m.dir);
}
hero.move("down");
hero.move("right");
hero.move("right");
`,
    solutionCode: `const milestones = [
  { name: "Models",      dir: "right" },
  { name: "Schemas",     dir: "right" },
  { name: "Auth",        dir: "right" },
  { name: "CRUD router", dir: "down"  },
  { name: "Middleware",  dir: "right" },
  { name: "Tests",       dir: "right" },
];

for (const m of milestones) {
  hero.move(m.dir);
}
hero.move("down");
hero.move("right");
hero.move("right");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "empty", "empty", "wall"],
      ["wall",  "wall",  "wall",  "gem",   "gem",   "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 8 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3 (gems), down, left×2, down, right×3 (gems), down, right×2 (gems), right to exit.",
    tip: "Ship your first version fast, then iterate. A working API with 80% coverage beats a perfect one that ships never.",
  },
];
