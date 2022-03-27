from apify_client import ApifyClient
import csv
import config
import os

# Initialize the ApifyClient with your API token
client = ApifyClient(config.api_token)

# Prepare the actor input
run_input = {
    "directUrls": [
        "https://www.instagram.com/p/CbihreevAfa/",
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
    data.append(comment_info)

print(data)

csv_header = ['comment_id', 'post_id', 'comment_content',
              'commenter_username', 'commenter_pic_url']

with open(os.path.join(os.path.dirname(__file__), 'comments.csv'), 'w', encoding='utf-8', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=csv_header)
    writer.writeheader()
    writer.writerows(data)
