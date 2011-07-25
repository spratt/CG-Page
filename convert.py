#!/usr/bin/python
from sys import argv
from datetime import datetime
# open file
if len(argv) < 2:
    exit()
print argv[1]
with open(argv[1],'r+') as file:
    dailyTotal=0
    line=file.readline()
    while line != '':
        # find next occurence of network going down
        while not 'external went down' in line and line != '':
            line=file.readline()
        # check to see if we've reached EOF
        if line == '':
            break
        # otherwise must have found an outage
        # parse datetime
        begin=datetime.strptime(line[0:line.rindex(':')],"%a %b %d %H:%M:%S %Z %Y")
        # find following occurence of network going up
        while not 'external came up' in line and line != '':
            line=file.readline()
        # check to see if we've reached EOF
        if line == '':
            break
        # otherwise must have found the corresponding uppage
        # parse datetime
        end=datetime.strptime(line[0:line.rindex(':')],"%a %b %d %H:%M:%S %Z %Y")
        # calculate delta
        delta=end-begin
        # add to total
        dailyTotal += delta.seconds
        # move to next line
        line=file.readline()
    # finally, write total to end of file
    file.write(str('Total downtime today: ' + str(dailyTotal) + ' seconds\n'))
