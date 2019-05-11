from unittest import TestCase, main
from parser import HTMLParser

JSONS = [
    {
        'body': {
            'children': [
                {
                    'div': {
                        'styles': {
                            'width': '100%'
                        },
                        'children': [
                            {
                                'text': {
                                    'text': 'test-text'
                                },
                            },
                            {
                                'text': {
                                    'text': 'test-text2'
                                }
                            }
                        ]
                    }
                },
                {
                    'text': {
                        'text': 'test-text3',
                        'styles': {
                            'color': 'red'
                        }
                    }
                }
            ],
            'styles': {
                'width': '100%'
            },
            'classes': ['test-class'],
        }
    }
]


class TestParser(TestCase):
    def test_first_json(self):
        parser = HTMLParser(JSONS[0])
        self.assertEqual(
            parser.parse(),
            """<body class="test-class" style="width=100%">
<div  style="width=100%">
test-text
test-text2
</div>
test-text3
</body>"""
        )


if __name__ == '__main__':
    main()
