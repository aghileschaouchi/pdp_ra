# Import package
import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO
# Define Variables
# If the Broker "broker.hivemq.com" doesn't work, use "test.mosquitto.org" instead
MQTT_HOST = "broker.hivemq.com"
MQTT_PORT = 1883
MQTT_KEEPALIVE_INTERVAL = 45
MQTT_TOPIC = "pdp_ra/lamp/"
MQTT_MSG = "ON/OFF Lamp"

# Define on connect event function
# We shall subscribe to our Topic in this function
def on_connect(mosq, obj, rc):
    mqttc.subscribe(MQTT_TOPIC, 0)

# Define on_message event function. 
# This function will be invoked every time,
# a new message arrives for the subscribed topic 
def on_message(mosq, obj, msg):
	print "Topic: " + str(msg.topic)
	print "QoS: " + str(msg.qos)
	print "Payload: " + str(msg.payload)
	GPIO.setmode(GPIO.BOARD)
	GPIO.setup(11, GPIO.OUT)
	if(msg.payload == "ON"):
		GPIO.output(11,1)
	else:
		GPIO.output(11,0)
def on_subscribe(mosq, obj, mid, granted_qos):
    print("Subscribed to Topic: " + 
	MQTT_MSG + " with QoS: " + str(granted_qos))

# Initiate MQTT Client
mqttc = mqtt.Client()

# Assign event callbacks
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_subscribe = on_subscribe

# Connect with MQTT Broker
mqttc.connect(MQTT_HOST, MQTT_PORT, MQTT_KEEPALIVE_INTERVAL)

# Continue monitoring the incoming messages for subscribed topic
mqttc.loop_forever()
