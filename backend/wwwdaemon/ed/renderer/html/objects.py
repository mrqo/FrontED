from ed.renderer.abstract import Container as AbstractContainer, Object

# Root in FrontEd
class Unknown(AbstractContainer):
    # Body
    PREFIX = """<html><header>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css">
    </header>
    <body {id} {properties}>"""
    POSTFIX = "</body></html>"
    def __init__(self, _id, properties):
        super().__init__(_id, properties)

    @property
    def content(self):
        return "\n".join([child.render() for child in self.children])

    def render(self):
        """
        return prefix + content + postfix
        """
        return "{prefix}\n{content}\n{postfix}".format(
            prefix=self.prefix,
            content=self.content,
            postfix=self.postfix
        )


class Container(Unknown):
    PREFIX = "<div {id} {properties}>"
    POSTFIX = "</div>"


class Image(Object):
    PREFIX = '<img src="{src}" {id} {properties}>'
    POSTFIX = '</img>'
    def __init__(self, _id, properties):
        super().__init__(_id, properties)
        self.src = properties["src"]

    @property
    def prefix(self):
        # FIXME: self.src
        return super().prefix.format(src=self.src)


class Label(Object):
    # easy to make simillar text formatting with help of inheritance
    PREFIX = ''
    POSTFIX = ''
    def __init__(self, _id, properties):
        super().__init__(_id, properties)
        self.text = properties["text"]

    @property
    def content(self):
        return self.text


class Button(Object):
    PREFIX = '<button type="button" {id} {properties}>'
    POSTFIX = '</button>'
    def __init__(self, _id, properties):
        super().__init__(_id, properties)
        self.text = properties["text"]

    @property
    def content(self):
        return self.text
