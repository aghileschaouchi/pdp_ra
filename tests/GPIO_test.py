"""
This program test if the gpio port work correctly.
You have to set the pinout number linked to gpio.
if the pinout is valid your led will blink.
"""

import RPi.GPIO as GPIO
import time


pinOutNumber = input('Choose the GPIO port to test: ') #The set value must be an integer

blinkInterval = 0.5  # interval time in second to make the led blinking


#set GPIO on pin numbering
GPIO.setmode(GPIO.BOARD)
GPIO.setup(pinOutNumber, GPIO.OUT)

try:
    while True: #loop until keyboard interruption
        GPIO.output(pinOutNumber, GPIO.HIGH) #Set the logical state of GPIO to True 
        time.sleep(blinkInterval) #sleep for 1/2 seconde
        GPIO.output(pinOutNumber, GPIO.LOW) #Set the logical state of GPIO to False
        time.sleep(blinkInterval) #another sleep
        print "Gpio ",pinOutNumber," is working"


except KeyboardInterrupt:
    print "test has been interrupted"

except:
    print "Gpio",pinOutNumber,"isn't working"

finally:
    GPIO.cleanup() #clean all GPIO ports before exiting the program 
