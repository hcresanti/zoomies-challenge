from flask import Flask
import urllib.request, json

api = Flask(__name__)
api.debug = False

@api.route('/dogs')
def all_dogs():
    url = "https://dog.ceo/api/breeds/list/all"
    
    response = urllib.request.urlopen(url)
    data = response.read()
    dict = json.loads(data)

    print(data)

    return dict

@api.route('/dogs/<name>')
def fetch_dog(name):
    url = "https://dog.ceo/api/breed/" + name + "/images"

    response = urllib.request.urlopen(url)
    data = response.read()
    dict = json.loads(data)

    print(data)

    return dict