from setuptools import setup

PACKAGE_NAME = "autoban_troll"

setup(
    # metadata
    name=PACKAGE_NAME,
    # options
    packages=[PACKAGE_NAME],
    include_package_data=True,
    zip_safe=False,
    python_requires=">=3.9",
    install_requires=["torch", "pytorch_lightning"],
    extras_require={
        "dev": [
            "pytest>=3",
            "black",
            "flake8",
            "isort",
            "pylint",
            "autopep8",
        ],
    },
    dependency_links=["https://download.pytorch.org/whl/nightly/cpu"],
    entry_points="""
        [console_scripts]
        {app}={pkg}:main
    """.format(
        app=PACKAGE_NAME.replace("_", "-"), pkg=PACKAGE_NAME
    ),
)
