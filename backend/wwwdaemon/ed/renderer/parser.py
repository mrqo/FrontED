from importlib import import_module
from inspect import getargspec
from bs4 import BeautifulSoup
from . import abstract


class Parser:
    def __init__(self, json_to_parse):
        """
        json_to_parse: json from front
        """
        self.content = json_to_parse

    def parse(self):
        pass


class HTMLParser(Parser):
    def __init__(self, json_to_parse):
        super().__init__(json_to_parse)
        self.import_cache = {}

    def parse(self):
        # json to objects and then render first object (root) :)
        soup = BeautifulSoup(self.json_to_obj(self.content).render(), 'html.parser')
        return str(soup.prettify())

    def json_to_obj(self, json):
        """
            Transfer json to objects
            `Recursive`
        """
        item = json
        cls = self.get_cls_or_none(item)
        if cls:
            # defined in html, Object or Container
            _id = item["id"]
            _properties = item["properties"]

            if issubclass(cls, abstract.Container):
                children = item['content']
                obj = cls(_id, _properties)
                for child in children:
                    obj.add_child(self.json_to_obj(child))
                return obj
            elif issubclass(cls, abstract.Object):
                obj = cls(_id, _properties)
                return obj
            else:
                print(cls)
                raise Exception("NOT DEFINED")
        else:
            print('There could be a problem with', json)
            return None

    def get_cls_or_none(self, item):
        name = item["meta"]["type"]
        if name in self.import_cache:
            return self.import_cache[name]
        try:
            self.import_cache[name] = getattr(
                import_module("ed.renderer.html.objects"), name.capitalize()
            )
        except Exception as E:
            print(E.__class__, str(E))
            self.import_cache[name] = None

        return self.import_cache[name]
