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


# DIV!
class Container(Unknown):
    PREFIX = "<div {id} {properties}>"
    POSTFIX = "</div>"


# IMAGE!
class Image(Container):
    PREFIX = '<div {id} {divStyle}><img src="{src}" {style}>'
    POSTFIX = '</div>'
    def __init__(self, _id, properties):
        super().__init__(_id, properties)
        self._id = _id
        self.src = properties.pop("src", "")

        self.propertiesMapper = {
            "style": {
            },
            "div-style": {
                "borderRadius": "border-radius: {value}px",
                "contentVerAlignment": "vertical-align: {value}",
                "height": "height: {value}px",
                "width": "width: {value}px"
            }
        }


    def get_styles(self, default_style="style"):
        styles = self.propertiesMapper.get(default_style, {})
        _styles = []
        for key, value in self.properties.items():
            if key in styles:
                _styles.append(styles[key].format(**{"value": value}))

        if default_style == "div_style":
            #border
            border = self.properties.get("strokeWidth", 0)
            borderColor = self.properties.get("borderColor", "#FFFFFF")
            if border:
                _styles.append("border: {value}px solid {color}".format(
                    value=border,
                    color=borderColor
                ))

        return ";".join(_styles)

    @property
    def prefix(self):
        return super().prefix.format(
            id='id="{}"'.format(self._id) if self._id else "",
            src=self.src,
            divStyle='style="{}"'.format(self.get_styles("div-style")),
            style='style="{}"'.format(self.get_styles()),
        )

    @property
    def content(self):
        return "</img>" + super().content


# Label/Text !
class Label(Container):
    # easy to make simillar text formatting with help of inheritance
    PREFIX = '<div {id} {divStyle}><font {style}>'
    POSTFIX = '</div>'
    def __init__(self, _id, properties):
        super().__init__(_id, properties)
        self._id = _id
        self.properties = properties
        self.text = properties["text"]
        self.propertiesMapper = {
            "style": {
                "fontFamily": "fony-family: '{value}'",
                "bgColor": "background-color: {value}",
                "contentHorAligment": "text-align: {value}",
                "textColor": "color:{value}",
                "textSize": "font-size:{value}px",
            },
            "div-style": {
                "borderColor": "border-color: {value}",
                "borderRadius": "border-radius: {value}px",
                "strokeWidth" :"border: {value}px solid",
                "contentVerAlignment": "vertical-align: {value}",
            }
        }

    def get_styles(self, default_style="style"):
        styles = self.propertiesMapper.get(default_style, {})
        _styles = []
        for key, value in self.properties.items():
            if key in styles:
                _styles.append(styles[key].format(**{"value": value}))

        if default_style == "style":
            # shadow
            shadowOffsetX = self.properties.get("shadowOffsetX", 0)
            shadowOffsetY = self.properties.get("shadowOffsetY", 0)
            shadowBlur = self.properties.get("shadowBlur", 0)
            shadowColor = self.properties.get("shadowColor", "#000000")
            _styles.append("text-shadow: {}px {}px {}px {}".format(
                shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor
            ))
        elif default_style == "div-style":
            #border
            border = self.properties.get("strokeWidth", 0)
            borderColor = self.properties.get("borderColor", "#FFFFFF")
            if border:
                _styles.append("border: {value}px solid {color}".format(
                    value=border,
                    color=borderColor
                ))

        return ";".join(_styles)

    @property
    def prefix(self):
        return self.PREFIX.format(
            id='id="{}"'.format(self._id) if self._id else "",
            divStyle='style="{}"'.format(self.get_styles("div-style")),
            style='style="{}"'.format(self.get_styles()),
        )

    @property
    def content(self):
        return self.text + "</font>" + super().content


# Button!
class Button(Container):
    PREFIX = '<div {id} {divStyle}><button type="button" {style}>'
    POSTFIX = '</div>'
    def __init__(self, _id, properties):
        super().__init__(_id, properties)
        self.text = properties["text"]

        self.propertiesMapper = {
            "style": {
                "fontFamily": "fony-family: '{value}'",
                "bgColor": "background-color: {value}",
                "contentHorAligment": "text-align: {value}",
                "textColor": "color:{value}",
                "textSize": "font-size:{value}px",
                "height": "height: {value}px",
                "width": "width: {value}px",
                "borderRadius": "border-radius: {value}px",
            },
            "div-style": {
                "contentVerAlignment": "vertical-align: {value}",
            }
        }

    def get_styles(self, default_style="style"):
        styles = self.propertiesMapper.get(default_style, {})
        _styles = []
        for key, value in self.properties.items():
            if key in styles:
                _styles.append(styles[key].format(**{"value": value}))

        if default_style == "style":
            #border
            border = self.properties.get("strokeWidth", 0)
            borderColor = self.properties.get("borderColor", "#FFFFFF")
            if border:
                _styles.append("border: {value}px solid {color}".format(
                    value=border,
                    color=borderColor
                ))
            shadowOffsetX = self.properties.get("shadowOffsetX", 0)
            shadowOffsetY = self.properties.get("shadowOffsetY", 0)
            shadowBlur = self.properties.get("shadowBlur", 0)
            shadowColor = self.properties.get("shadowColor", "#000000")
            if shadowOffsetX or shadowOffsetY:
                _styles.append("box-shadow: {}px {}px {}px {}".format(
                    shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor
                ))
        elif default_style == "div-style":
            # shadow
            pass

        return ";".join(_styles)

    @property
    def prefix(self):
        return self.PREFIX.format(
            id='id="{}"'.format(self._id) if self._id else "",
            divStyle='style="{}"'.format(self.get_styles("div-style")),
            style='style="{}"'.format(self.get_styles()),
        )

    @property
    def content(self):
        return self.text + "</button>" + super().content
