FROM jfloff/alpine-python:2.7-onbuild

# to build this image, run:
#  docker build --rm=true -t jfloff/app .

# to run this - go to a directory that has your config.ini and execute: 
# docker run --rm -it -v $(PWD):/usr/local/config  ryebrye/pokepymanager:latest
                                        
ENV WORKING_DIR /usr/local/app
EXPOSE 5100                   

COPY ./pogo $WORKING_DIR          

# for a flask server    
CMD /bin/bash -c "cp /usr/local/config/config.ini $WORKING_DIR && cd $WORKING_DIR && python mgr.py" 