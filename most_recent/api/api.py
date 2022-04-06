import flask
from flask import request, jsonify

from apify_client import ApifyClient
import csv
import os
import json
from backEnd import predict

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''


# A route to return all of the available entries in our catalog.
@app.route('/api/sendURL', methods=['GET'])
def api_all():
    if 'api_url' in request.args:
        api_url = str(request.args['api_url'])
        print("received url, start fetching comments")
    else:
        return "Error: No url field provided. Please specify an url."

    client = ApifyClient("apify_api_rM9VBaqLfbBYFURfsehjpWUxvBj1lJ2uWZ3v")

    # Prepare the actor input
    run_input = {
        "directUrls": [
            f"https://www.instagram.com/p/{api_url}/",
        ],
        "resultsLimit": 10,
    }

    # Run the actor and wait for it to finish
    run = client.actor("zuzka/instagram-comment-scraper").call(run_input=run_input)

    # Fetch and print actor results from the run's dataset (if there are any)
    data = []
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        comment_info = {}
        comment_info['comment_id'] = item['id']
        comment_info['post_id'] = item['postId']
        comment_info['comment_content'] = item['text'].replace("\n", ". ")
        comment_info['commenter_username'] = item['ownerUsername']
        comment_info['commenter_pic_url'] = item['ownerProfilePicUrl']
        comment_info['timestamp'] = item['timestamp']
        data.append(comment_info)
    csv_header = ['comment_id', 'post_id', 'comment_content',
              'commenter_username', 'commenter_pic_url','timestamp']

    with open(os.path.join(os.path.dirname(__file__), 'backEnd/data/comments.csv'), 'w', encoding='utf-8', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=csv_header)
        writer.writeheader()
        writer.writerows(data)
    predict.main()
    with open(os.path.join(os.path.dirname(__file__), 'backEnd/out_test.csv'), 'r', newline="", encoding='utf-8') as file_obj:
        result = []
        reader = csv.DictReader(file_obj, delimiter=',')
        for line in reader:
            result.append(dict(line))
    return jsonify(result)

    # @app.route('/api/sendURL', methods=['GET'])
    #     def api_all():

app.run()