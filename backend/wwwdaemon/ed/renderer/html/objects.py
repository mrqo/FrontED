from ed.renderer.abstract import Container, Object


class Body(Container):
    PREFIX = "<body {classes} {styles}>"
    POSTFIX = "</body>"
    def __init__(self, *classes, **styles):
        super().__init__(*classes, **styles)

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


class Div(Body):
    PREFIX = "<div {classes} {styles}>"
    POSTFIX = "</div>"


class Image(Object):
    PREFIX = '<img src="{src}" {classes} {styles}>'
    POSTFIX = '</img>'
    def __init__(self, src, *classes, **styles):
        super().__init__(*classes, **styles)
        self.src = src

    @property
    def prefix(self):
        return super().prefix().format(src=self.src)


class Text(Object):
    # easy to make simillar text formatting with help of inheritance
    PREFIX = ''
    POSTFIX = ''
    def __init__(self, text, *classes, **styles):
        super().__init__(*classes, **styles)
        self.text = text

    @property
    def content(self):
        return self.text


class Button(Object):
    PREFIX = '<button type="button" {classes} {styles}>'
    POSTFIX = '</button>'
    def __init__(self, text, *classes, **styles):
        super().__init__()
        self.text = text

    @property
    def content(self):
        return self.text
