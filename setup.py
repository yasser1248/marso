from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in marso/__init__.py
from marso import __version__ as version

setup(
	name="marso",
	version=version,
	description="marso",
	author="basel waheed",
	author_email="baselwaheed66@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
