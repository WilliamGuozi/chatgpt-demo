
### build

```bash
docker build -t chatgpt .
```


### run
```bash
docker run -d -e OPENAI_API_KEY="sk-xx" --network host chatgpt:latest 
```