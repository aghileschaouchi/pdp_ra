# Import the PAHO package, an implementation of MQTT in python
import paho.mqtt.client as mqtt

# Define the broker that we will subscribe to
mqttBroker = "test.mosquitto.org"
# Which port we will connect to in the broker
mqttPort = 1883
mqttKeepAliveInterval = 45
# Name of the topic that we will subscribe to
mqttTopic = "testTopic"


# Define on_connect event Handler
def on_connect(mosq, obj, rc):
	#Subscribe to a the Topic
	mqttc.subscribe(mqttTopic, 0)

# Define on_subscribe event Handler
def on_subscribe(mosq, obj, mid, granted_qos):
    print "Subscribed to MQTT Topic"

# Define on_message event Handler
def on_message(mosq, obj, msg):
	print msg.payload

# Initiate MQTT Client
mqttc = mqtt.Client()

# Register Event Handlers
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_subscribe = on_subscribe

# Connect with MQTT Broker
mqttc.connect(mqttBroker, mqttPort, mqttKeepAliveInterval )

# Continue the network loop
mqttc.loop_forever()
