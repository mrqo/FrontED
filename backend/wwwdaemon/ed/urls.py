from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from ed import views

urlpatterns = [
    path('projects/', views.ProjectList.as_view()),
    path('projects/<int:pk>/', views.ProjectDetail.as_view()),
    path('projects/render/<int:pk>/', views.ProjectRender.as_view()),
    path('projects/preview/<int:project_id>/<slug:project_format>/', views.ProjectPreview.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
