import json

from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import View
from rest_framework import generics, mixins

from ed.renderer.run import main as render_source
from ed.serializers import ProjectRenderSerializer, ProjectSerializer


class ProjectList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):

    serializer_class = ProjectSerializer
    filterset_fields = ('id', 'name', 'source')

    def get_queryset(self):
        return self.request.user.projects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ProjectDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    serializer_class = ProjectSerializer
    filterset_fields = ('id', 'name', 'source')

    def get_queryset(self):
        return self.request.user.projects.all()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class ProjectRender(mixins.RetrieveModelMixin,
                    generics.GenericAPIView):
    serializer_class = ProjectRenderSerializer

    def get_queryset(self):
        return self.request.user.projects.all()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class ProjectPreview(View):
    def get(self, request, project_id, project_format):
        if project_format.lower() != 'html':
            return HttpResponse("Other formats than html not accepted")
        # FIXME: handle not logged in users and bad id
        obj = self.request.user.projects.get(pk=project_id)
        source = json.loads(obj.source)
        source = render_source(source, 'html')
        return HttpResponse(source)
