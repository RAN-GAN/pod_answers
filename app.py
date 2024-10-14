from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# List to store questions and their corresponding code answers
questions_and_answers = []

@app.route('/')
def index():
    return render_template('index.html', questions_and_answers=questions_and_answers)

@app.route('/add_answer', methods=['GET', 'POST'])
def add_answer():
    if request.method == 'POST':
        question = request.form.get('question')
        language = request.form.get('language')
        code_answer = request.form.get('code_answer')
        if question and language and code_answer:
            questions_and_answers.append({
                "question": question,
                "language": language,
                "code": code_answer
            })
            return redirect(url_for('index'))  # Redirect to index after adding
    return render_template('add_answer.html')

if __name__ == '__main__':
    app.run(debug=True)
