from ed.renderer.abstract import Container as AbstractContainer, Object

# Root in FrontEd
class Unknown(AbstractContainer):
    # Body
    # <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css">
    PREFIX = """<html><header>
    </header>
    <body {id} {properties}>"""
    POSTFIX = "</body></html>"
    def __init__(self, _id, properties):
        super().__init__(_id, properties)
        self.x, self.y = properties.get("x", None), properties.get("y", None)
        if self.x is not None:
            self.x = int(self.x)
        if self.y is not None:
            self.y = int(self.y)

    @property
    def content(self):
        return ""

    @property
    def children_rendered(self):
        return "\n".join([child.render() for child in self.children])

    def render(self):
        """
        return prefix + content + postfix
        """
        # RealShit all divs are empty xD
        return "{prefix}\n{content}\n{postfix}\n{children}".format(
            prefix=self.prefix,
            content=self.content,
            postfix=self.postfix,
            children=self.children_rendered
        )

# DIV!
class Container(Unknown):
    PREFIX = "<div {id} {style}>"
    POSTFIX = "</div>"

    def __init__(self, _id, properties):
        super().__init__(_id, properties)
        self._id = _id
        self.properties = properties

        self.propertiesMapper = {
            "style": {
                "bgColor": "background-color: {value}",
                "borderRadius": "border-radius: {value}px",
                "contentVerAlignment": "vertical-align: {value}",
                "contentHorAligment": "text-align: {value}",
                "height": "height: {value}px",
                "width": "width: {value}px"
            }
        }

    def get_styles(self, *args, **kwargs):
        _styles = []
        styles = self.propertiesMapper["style"]

        for key, value in self.properties.items():
            if key in styles:
                _styles.append(styles[key].format(**{"value": value}))
        ########

        # border
        border = self.properties.get("strokeWidth", 0)
        borderColor = self.properties.get("borderColor", "#FFFFFF")
        if border:
            _styles.append("border: {value}px solid {color}".format(
                value=border,
                color=borderColor
            ))

        # shadow
        shadowOffsetX = self.properties.get("shadowOffsetX", 0)
        shadowOffsetY = self.properties.get("shadowOffsetY", 0)
        shadowBlur = self.properties.get("shadowBlur", 0)
        shadowColor = self.properties.get("shadowColor", "#000000")
        if shadowOffsetX or shadowOffsetY:
            _styles.append("box-shadow: {}px {}px {}px {}".format(
                shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor
            ))

        # absolute
        if self.x is not None or self.y is not None:
            _styles.append("position: absolute; left: {}px; top: {}px".format(self.x or 0, self.y or 0))

        return ";".join(_styles)

    @property
    def prefix(self):
        return self.PREFIX.format(
            id='id="{}"'.format(self._id) if self._id else "",
            style='style="{}"'.format(self.get_styles()),
        )


# IMAGE!
class Image(Unknown):
    PREFIX = '<div {id} {divStyle}><img src="{src}" {style}>'
    POSTFIX = '</div>'
    def __init__(self, _id, properties):
        super().__init__(_id, properties)
        self._id = _id
        self.src = properties.pop("src", "")

        self.propertiesMapper = {
            "style": {
                "height": "height: {value}px",
                "width": "width: {value}px"
            },
            "div-style": {
                "borderRadius": "border-radius: {value}px",
                "contentVerAlignment": "vertical-align: {value}",
            }
        }


    def get_styles(self, default_style="style"):
        styles = self.propertiesMapper.get(default_style, {})
        _styles = []
        for key, value in self.properties.items():
            if key in styles:
                _styles.append(styles[key].format(**{"value": value}))

        if default_style == "div-style":
            #border
            border = self.properties.get("strokeWidth", 0)
            borderColor = self.properties.get("borderColor", "#FFFFFF")
            if border:
                _styles.append("border: {value}px solid {color}".format(
                    value=border,
                    color=borderColor
                ))
            # absolute
            if self.x is not None or self.y is not None:
                _styles.append("position: absolute; left: {}px; top: {}px".format(self.x or 0, self.y or 0))

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
class Label(Unknown):
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
                "height": "height: {value}px",
                "width": "width: {value}px"
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
            # absolute
            if self.x is not None or self.y is not None:
                _styles.append("position: absolute; left: {}px; top: {}px".format(self.x or 0, self.y or 0))

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
class Button(Unknown):
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
            # shadow
            shadowOffsetX = self.properties.get("shadowOffsetX", 0)
            shadowOffsetY = self.properties.get("shadowOffsetY", 0)
            shadowBlur = self.properties.get("shadowBlur", 0)
            shadowColor = self.properties.get("shadowColor", "#000000")
            if shadowOffsetX or shadowOffsetY:
                _styles.append("box-shadow: {}px {}px {}px {}".format(
                    shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor
                ))
        elif default_style == "div-style":
            # absolute
            if self.x is not None or self.y is not None:
                _styles.append("position: absolute; left: {}px; top: {}px".format(self.x or 0, self.y or 0))

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
