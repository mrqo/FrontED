import sys

from .parser import HTMLParser
from . import html


MODULE_MAPPING = {
    'html': HTMLParser
}

def main(json_to_parse, module):
    """
    :json_to_parse param: OrderedDict object
    :module param: string (key) from MODULE_MAPPING
    """
    parser = MODULE_MAPPING[module](json_to_parse)
    return parser.parse()


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
