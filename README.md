DISCLAIMER: Since this interacts with the PoGo servers to fetch data / perform evovlves/releases/renames, it is possible to be banned. If you are not comfortable with this possibility, please do not use this tool
============

PokeyPy Manager
============

PokeyPy Manager is a tool which allows you to manage your Pokemon in Pokemon Go. It utilizes https://github.com/rubenvereecken/pokemongo-api to gather information and to perform management actions
such as releasing/evolving/renaming Pokemon.



Features
--------

- View all your Pokemon, including their IVs and CP level
- Rename Pokemon to include IV in name
- See stats for your trainer, including capture rate and distance walked
- Batch release and evolve Pokemon

Requirements
------------

- [Python 2.7](https://www.python.org/downloads/release/python-2712/)


Instructions
------------
- Install Python 2.7 from the link above
- Open Command Prompt/Terminal/equivalent
- Navigate to the root of the PokeyPySnipe directory
- Run ```pip install -r requirements.txt```
- Duplicate ```config.ini.example``` and rename it to ```config.ini```, edit it with your options
- Run ```python mgr.py``` or ````launch.bat```` (running launch.bat will auto-open a browser after 10 sec. skip next step)
- Open http://127.0.0.1:5100 in your browser  

Building and running with Docker
------------
Build the image using `docker build` from the main directory. It will spit out something like: 

```
Sending build context to Docker daemon 15.89 MB
Step 1 : FROM jfloff/alpine-python:2.7-onbuild
# Executing 2 build triggers...
Step 1 : COPY ./requirements.txt /tmp/requirements.txt
 ---> Using cache
Step 1 : RUN pip install -r /tmp/requirements.txt
 ---> Using cache
 ---> 01b3cdd3921d
Step 2 : ENV WORKING_DIR /usr/local/app
 ---> Using cache
 ---> a9f9bf8594f6
Step 3 : EXPOSE 5100
 ---> Using cache
 ---> 7b8b9a9059d3
Step 4 : COPY ./pogo $WORKING_DIR
 ---> Using cache
 ---> c63afc518007
Step 5 : CMD /bin/bash -c "cp /usr/local/config/config.ini $WORKING_DIR && cd $WORKING_DIR && python mgr.py"
 ---> Using cache
 ---> f36749163edb
Successfully built f36749163edb
```            

The hash at the end of the "successfully built" line is the docker image that was built. You can tag this to make it easier to use, or you can run with that hash.

To run it, go to a directory where you have a config.ini file created. Then execute: 

`docker run --rm -v $(PWD):/usr/local/config -p5100:5100 <hash of image you just built>`

You can then go to http://localhost:5100 to view the PokeyPyManager

Troubleshooting
---------------
- On Windows, you may need to copy requirements.txt to ```C:/python27/scripts``` to be able to run ```pip install```
- On Windows, you may receive the error ```failed to build xxhash```. If this happens, install the Microsoft Visual C++ Compiler for Python 2.7 from https://www.microsoft.com/en-us/download/details.aspx?id=44266

--------------


Thanks to https://github.com/rubenvereecken/pokemongo-api for providing the API used by PokeyPy Manager, and to all the developers who worked on the Unknown6 solution - PokeyPy Manager uses the encrypt dll/so files from http://pgoapi.com.


Here's a screenshot of it in action:

<img src="http://i.imgur.com/rL1yd5D.png">
