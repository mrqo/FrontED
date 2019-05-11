from importlib import import_module
from inspect import getargspec
import abstract


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
        return self.json_to_obj(self.content).render()

    def json_to_obj(self, json):
        """
            Transfer json to objects
            `Recursive`
        """
        for item, values in json.items():
            cls = self.get_cls_or_none(item)

            if cls:
                # defined in html, Object or Container
                classes = values.pop('classes', [])
                styles = values.pop('styles', {})
                # args from Cont/Obj's constructor (except self) - are required.
                required_args = getargspec(cls.__init__)[0][1:]
                cls_args = {arg: values[arg] for arg in required_args}
                kwargs = dict(cls_args, **styles)

                if issubclass(cls, abstract.Container):
                    children = values.pop('children', [])
                    obj = cls(*classes, **kwargs)
                    for child in children:
                        obj.add_child(self.json_to_obj(child))
                    return obj

                elif issubclass(cls, abstract.Object):
                    obj = cls(*classes, **kwargs)
                    return obj
                else:
                    print(cls)
                    raise Exception("NOT DEFINED")

            else:
                print('There could be a problem with', item, values)
        return None

    def get_cls_or_none(self, item):
        if item in self.import_cache:
            return self.import_cache[item]
        try:
            self.import_cache[item] = getattr(
                import_module("html.objects"), item.capitalize()
            )
        except Exception as E:
            print(E.__class__, str(E))
            self.import_cache[item] = None

        return self.import_cache[item]
