class SafeDict(dict):
    def __missing__(self, key):
        return '{' + key + '}'


class Object:
    """
    Abstract object
    """
    PREFIX = "<object {id} {properties}>"
    POSTFIX = "</object>"
    def __init__(self, _id, _properties):
        self._id = _id
        self.properties = _properties

    def get_properties(self):
        return ""

    @property
    def prefix(self):
        return self.PREFIX.format_map(
            SafeDict(
                id='id="{}"'.format(self._id) if self._id else "",
                properties='style="{}"'.format(self.get_properties()) if self.properties else ""
            )
        )

    @property
    def content(self):
        return ""

    @property
    def postfix(self):
        return self.POSTFIX

    def render(self):
        return self.prefix + self.content + self.postfix


class Container(Object):
    """
    Abstract container e.g. html's div
    """
    PREFIX = "<container {id} {properties}>"
    POSTFIX = "</container>"
    def __init__(self, *classes, **styles):
        super().__init__(*classes, **styles)
        self.children = []

    def get_properties(self):
        return ""

    def add_child(self, obj):
        self.children.append(obj)

    def __iter__(self):
        return iter(self.children)

    @property
    def content(self):
        return "Content of container"
