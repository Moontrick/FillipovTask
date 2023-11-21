import json
from elasticsearch import Elasticsearch
es = Elasticsearch("http://localhost:9200")


index_name = 'final_index4'
mapping = {
    "mappings": {
        "properties": {
            "Title": {
                      "type": "text",
                      "index": "true",
                      "search_analyzer": "my_custom_analyzer",
                      "analyzer": "my_custom_analyzer"
                      },
            "Time": {"type": "text"},
            "Paragraph1": {
                      "type": "text",
                      "index": "true",
                      "search_analyzer": "my_custom_analyzer",
                      "analyzer": "my_custom_analyzer"
            },
            "Paragraph2": {
                          "type": "text",
                          "index": "true",
                          "search_analyzer": "my_custom_analyzer",
                          "analyzer": "my_custom_analyzer"
            },
            "Player_img": {
                          "type": "text",
                          "index": "true",
                          "search_analyzer": "my_custom_analyzer",
                          "analyzer": "my_custom_analyzer"
            },
            "Paragraph3": {
                      "type": "text",
                      "index": "true",
                      "search_analyzer": "my_custom_analyzer",
                      "analyzer": "my_custom_analyzer"
            },
            "Author": {
                      "type": "text",
                      "index": "true",
                      "search_analyzer": "my_custom_analyzer",
                      "analyzer": "my_custom_analyzer"
            },
        }
    },
    "settings": {
        "analysis": {
            "analyzer": {
                "my_custom_analyzer": {
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": ["lowercase", "my_stemmer_filter", "my_synonym_filter"]
                }
            },
            "filter": {
                "my_stemmer_filter": {"type": "stemmer", "name": "russian"},
                "my_synonym_filter": {"type": "synonym", "synonyms_path": '/usr/share/elasticsearch/data/synonyms.txt'}
            }
        }
    }
}

es.indices.create(index=index_name, body=mapping)
def index_data(document):
    try:
        es.index(index=index_name, body=document)
        print(document)
    except Exception as e:
        print(e)

file_path = 'output.json'

with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)
    for document in data:
        index_data(document)

