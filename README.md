Есть 2 варианта запуска:\

##I с помощью фронта и питона\

Шаг 1: запустить docker-compose в папке /back командой docker-compose up --build;\

Шаг 2: загрузить библиотеку elasticsearch на проект с питоном в папке /back;\

Шаг 3: установить node.js и в корневой папке написать nmp i;\

Шаг 4: запустить файл main.py\

Шаг 5: с помощью Node.js запустить фронт с помощью npm start\

Итог: по адресу http://localhost:9200 лежит докер с эластиком, а на http://localhost:3000 лежит фронт\

##Примечание, если вы решили запускать данный проект через данный способ, то в докере необходимо добавить в пути \
/usr/share/elasticsearch/config/elasticsearch.yml след строки:\

http.cors.allow-origin: "*"\

http.cors.enabled: true\

http.cors.allow-credentials: true\

http.cors.allow-methods: OPTIONS, POST\

http.cors.allow-headers: X-Requested-With, X-Auth-Token, Content-Type, Content-Length, Authorization, Access-Control-Allow-Headers, Accept\

##Это CORS.\


##II с помощью только Python\

Выполняем шаг 1,2,4 из 1 пункта, но вместо запуска фронта запускаем файл search.py\
