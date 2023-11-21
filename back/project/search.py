from elasticsearch import Elasticsearch

es = Elasticsearch("http://localhost:9200")
print("Введите по чему искать:")
fi = input()
response = es.search(index="final_index4", body={
    "query": {
        "multi_match": {
            "query": fi,
            "fields": ["Title", "Paragraph1", "Paragraph2", "Player_img", "Paragraph3", "Author"],
            "fuzziness": "AUTO"
        }
    },
    "size": 10
})

articlesAmount = response['hits']['total']['value']
print("Кол-во найденых документов:")
print(articlesAmount)

titles = []
for hit in response['hits']['hits']:
    tit1 = []
    for field in ["Title", "Time", "Paragraph1", "Paragraph2", "Player_img", "Paragraph3", "Author"]:
        data = hit['_source'].get(field)
        if data:
            tit1.append(data)
    titles.append(tit1)

titles_dict = {i: title for i, title in enumerate(titles)}

for i, article in titles_dict.items():
    print(f'Документ {i}\n', article)
