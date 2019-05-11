
class Object:
    """
    Abstract object
    """
    PREFIX = "<object {classes} {styles}>"
    POSTFIX = "</object>"
    def __init__(self, *classes, **styles):
        self.classes = ' '.join(classes)
        self.styles = ' '.join(["{}={}".format(k,v) for k, v in styles.items()])

    @property
    def prefix(self):
        _return_prefix = self.PREFIX
        if '{' in self.PREFIX:
            _return_prefix = self.PREFIX.format(
                classes='class="{}"'.format(self.classes) if self.classes else "",
                styles='style="{}"'.format(self.styles) if self.styles else ""
            )

        return _return_prefix

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
    PREFIX = "<container {classes} {styles}>"
    POSTFIX = "</container>"
    def __init__(self, *classes, **styles):
        super().__init__(*classes, **styles)
        self.children = []

    def add_child(self, obj):
        self.children.append(obj)

    def __iter__(self):
        return iter(self.children)

    @property
    def content(self):
        return "Content of container"
