#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""

import os
import sys
import logging

def main():
    """Run administrative tasks."""
    logging.basicConfig(level=logging.INFO)
    try:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cardie.settings_development')
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        logging.error("Couldn't import Django. Are you sure it's installed and "
                      "available on your PYTHONPATH environment variable? Did you "
                      "forget to activate a virtual environment?")
        raise
    try:
        execute_from_command_line(sys.argv)
    except Exception as exc:
        logging.error("An error occurred: %s", exc)
        sys.exit(1)

if __name__ == '__main__':
    main()