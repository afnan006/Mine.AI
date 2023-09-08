from flask import Flask, render_template, request
import requests

app = Flask(__name__)

# Replace these with your own RapidAPI key and host
RAPIDAPI_KEY = "28f2b50bbfmshd5a6c62ccc8b858p1f9df4jsne119368256b2"
RAPIDAPI_HOST = "chatgpt-api8.p.rapidapi.com"

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        user_input = request.form["user_input"]
        payload = [{"content": user_input, "role": "user"}]

        headers = {
            "content-type": "application/json",
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": RAPIDAPI_HOST
        }

        response = requests.post("https://chatgpt-api8.p.rapidapi.com/", json=payload, headers=headers)
        response_json = response.json()

        return render_template("index.html", user_input=user_input, response=response_json)

    return render_template("index.html", user_input=None, response=None)

if __name__ == "__main__":
    app.run(debug=True)