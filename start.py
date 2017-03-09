from flask import Flask
from etherpad_lite import EtherpadLiteClient
from flask import render_template
from flask import request
import json

app = Flask(__name__)

@app.route("/")
def index():
	return render_template('index.html')

@app.route("/getpadusercount")
def getPadUsersCount(userCount = None):
	c = EtherpadLiteClient(base_params={'apikey':'8ca139f10b904bf9420718c4977c4f9e2a06fca26a20c81d337e2a08c3bb478a'})
	# c = EtherpadLiteClient(base_params={'apikey':'555ddf5d51cba5e38e93d538742a02f7d1b2ea968ca4dcccb983f31c954d632b'})
	padList = c.listAllPads()
	userCount = {}

	for ID in padList['padIDs']:
		userCount[ID] = c.padUsersCount(padID=ID)['padUsersCount']
	
	return json.dumps(userCount)

@app.route("/setText")
def pasteText(text=None):
	a = request.args.get('a')
	c = EtherpadLiteClient(base_params={'apikey':'8ca139f10b904bf9420718c4977c4f9e2a06fca26a20c81d337e2a08c3bb478a'})
	padList = c.listAllPads()
	c.appendText(padID=padList['padIDs'][0], text=a)
	return json.dumps('test')

if __name__ == "__main__":
    app.run(debug = True)

