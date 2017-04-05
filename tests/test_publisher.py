# Import the PAHO package, an implementation of MQTT in python
import paho.mqtt.client as mqtt

# Define the broker that we will subscribe to
mqttBroker = "test.mosquitto.org"
# Which port we will connect to in the broker
mqttPort = 1883
mqttKeepAliveInterval = 45
# Name of the topic that we will subscribe to
mqttTopic = "testTopic"
# Message to send
mqttMsg = "test"


# Define on_connect event Handler
def on_connect(mosq, obj, rc):
	print "Connected to MQTT Broker"

# Define on_publish event Handler
def on_publish(client, userdata, mid):
	print "Message Published..."

# Initiate MQTT Client
mqttc = mqtt.Client()

# Register Event Handlers
mqttc.on_publish = on_publish
mqttc.on_connect = on_connect

# Connect with MQTT Broker
mqttc.connect(mqttBroker, mqttPort, mqttKeepAliveInterval) 

# Publish message to MQTT Topic 
mqttc.publish(mqttTopic,mqttMsg)

# Disconnect from MQTT_Broker
mqttc.disconnect()
