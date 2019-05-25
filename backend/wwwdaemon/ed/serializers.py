import json

from rest_framework import serializers

from ed.models import Project
from ed.renderer.run import main as render_source
import re


class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=128)
    source = serializers.CharField()

#    def validate_source(self, source, **kwargs):
#        try:
#            json.loads(source)
#        except Exception as Ex:
#            print(str(Ex))
#            m = re.search(r'\(char (\d+)\)', str(Ex))
#            char_count = int(m.group(1))
#            # FIX JSON HERE : https://jsonlint.com/
#            print(
#                (source[:char_count] + '<HERE>' + source[char_count:]).replace('{', '\n{\n').replace('}', '\n}\n')
#            )
#            return False
#
#        return True

    def create(self, validated_data):
        try:
            json.loads(validated_data.get('source'))
        except:
            print("Use: https://jsonlint.com/ to repair json!")
        return Project.objects.create(owner=self.context['request'].user, **validated_data)

    def update(self, instance, validated_data):
        try:
            json.loads(validated_data.get('source'))
        except:
            print("Use: https://jsonlint.com/ to repair json!")
        instance.name = validated_data.get('name', instance.name)
        instance.source = validated_data.get('source', instance.source)
        instance.save()
        return instance

    class Meta:
        model = Project
        fields = ('id', 'name', 'source')


class ProjectRenderSerializer(ProjectSerializer):
    result = serializers.SerializerMethodField()

    def get_result(self, obj):
        default_format = 'html'
        module = self.context['request'].GET.get('format', default_format)
        # FIXME: exceptions!
        source = json.loads(obj.source)
        source = render_source(source, module)
        return source

    class Meta:
        model = Project
        fields = ('result',)
