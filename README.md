
### build

```bash
docker build -t chatgpt .
```


### run
```buildoutcfg
docker run -d -e OPENAI_API_KEY="sk-xx" --network host chatgpt:latest 
```
