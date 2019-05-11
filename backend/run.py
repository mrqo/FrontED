import sys

from parser import *
import html

# FIXME: not smart enough :(((((
MODULE_MAPPING = {
    'html': html
}

def main(text_to_parse, module):
    parser = Parser(text_to_parse. MODULE_MAPPING[module])
    return parser.parse()

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
