from rest_framework import serializers

from ed.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=128)
    source = serializers.CharField()

    def create(self, validated_data):
        return Project.objects.create(owner=self.context['request'].user, **validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.source = validated_data.get('source', instance.source)
        instance.save()
        return instance

    class Meta:
        model = Project
        fields = ('id', 'name', 'source')
