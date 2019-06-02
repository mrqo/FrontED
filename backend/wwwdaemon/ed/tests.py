from django.test import TestCase
from .renderer.parser import HTMLParser

JSONS = """{
    "content": [
        {
            "content": [
                {
                    "content": [],
                    "id": "button@6",
                    "meta": {
                        "type": "button"
                    },
                    "parent": "~content~0",
                    "properties": {
                        "bgColor": "#ffffff",
                        "borderColor": "#44cc44",
                        "borderRadius": 3,
                        "height": 60,
                        "name": "Button",
                        "shadowBlur": 5,
                        "shadowColor": "#aaaaaa",
                        "shadowOffsetX": 5,
                        "shadowOffsetY": 5,
                        "strokeWidth": 3,
                        "text": "Button",
                        "textColor": "#000000",
                        "textSize": 13,
                        "visible": true,
                        "width": 120,
                        "x": -61,
                        "y": -108
                    }
                },
                {
                    "content": [
                        {
                            "content": [],
                            "id": "label@10",
                            "meta": {
                                "type": "label"
                            },
                            "parent": "~content~0~content~1",
                            "properties": {
                                "bgColor": "#000000",
                                "height": 60,
                                "name": "Label",
                                "text": "test",
                                "textSize": 13,
                                "visible": true,
                                "width": 120,
                                "x": -95,
                                "y": 90
                            }
                        },
                        {
                            "content": [],
                            "id": "image@12",
                            "meta": {
                                "type": "image"
                            },
                            "parent": "~content~0~content~1",
                            "properties": {
                                "height": 60,
                                "name": "Image",
                                "src": "source",
                                "visible": true,
                                "width": 120,
                                "x": 65,
                                "y": 93
                            }
                        }
                    ],
                    "id": "container@8",
                    "meta": {
                        "type": "container"
                    },
                    "parent": "~content~0",
                    "properties": {
                        "height": 60,
                        "layoutType": "Free",
                        "name": "Container",
                        "visible": true,
                        "width": 120,
                        "x": 0,
                        "y": 0
                    }
                }
            ],
            "id": "container@4",
            "meta": {
                "type": "container"
            },
            "parent": "~",
            "properties": {
                "height": 60,
                "layoutType": "Free",
                "name": "Container",
                "visible": true,
                "width": 120,
                "x": -92,
                "y": -204
            }
        }
    ],
    "id": "2",
    "meta": {
        "type": "unknown"
    },
    "properties": {
        "height": 60,
        "name": "undefined_name",
        "visible": true,
        "width": 120,
        "x": 0,
        "y": 0
    }
}"""

EXPECTED = """<html>
 <header>
  <link href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css" rel="stylesheet"/>
 </header>
 <body id="2" style="">
  <div id="container@4" style="">
   <button id="button@6" style="" type="button">
    Button
   </button>
   <div id="container@8" style="">
    test
    <img id="image@12" src="source" style=""/>
   </div>
  </div>
 </body>
</html>"""


class TestParser(TestCase):
    def test_first_json(self):
        import json
        _json = json.loads(JSONS)
        parser = HTMLParser(_json)
        self.assertEqual(
            parser.parse(),
            EXPECTED
        )
