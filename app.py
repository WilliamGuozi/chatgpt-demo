from flask import Flask, request, jsonify, render_template
import openai
import os

app = Flask(__name__)

# 设置OpenAI API密钥
openai.api_key = os.getenv("OPENAI_API_KEY")
# 设置默认的模型ID
model_engine = "text-davinci-002"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat.js")
def js():
    return render_template("chat.js")


@app.route("/chat", methods=["POST"])
def chat():
    # 从POST请求中获取用户输入
    data = request.json
    user_input = data["prompt"]

    # 使用OpenAI API发送请求并获得响应
    response = openai.Completion.create(
        engine=model_engine,
        prompt=user_input,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.7,
    )
    return response

    # # 从OpenAI API响应中获取模型输出
    # model_output = response.choices[0].text.strip()
    #
    # # 将模型输出作为JSON格式的响应返回给用户
    # return jsonify({"output": model_output})


if __name__ == "__main__":
    # from waitress import serve
    # serve(app, host="0.0.0.0", port=8080)
    app.run(debug=True, host='0.0.0.0', port=8000)
